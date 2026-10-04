import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInWithCredential,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, db } from './firebase';
import { AUTH_CONFIG } from './authConfig';
import { supabaseSync } from './supabaseSync';

export function isMobileAuthFlow(): boolean {
  if (typeof window === 'undefined') return false;
  const isTouch = 'ontouchstart' in window || (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
  const isMobileMedia = window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return (isTouch && isMobileMedia) || isMobileUA;
}

export function formatAuthError(err: any): string {
  if (!err) return 'Ha ocurrido un error de autenticación.';
  const code = err.code || err.name || '';
  const message = err.message || '';
  const domain = typeof window !== 'undefined' ? window.location.hostname : '';

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Correo electrónico o contraseña incorrectos.';
    case 'auth/invalid-email':
      return 'El correo electrónico introducido no tiene un formato válido.';
    case 'auth/weak-password':
      return 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta registrada con este correo electrónico.';
    case 'auth/user-disabled':
      return 'Esta cuenta de usuario ha sido deshabilitada por el administrador.';
    case 'auth/unauthorized-domain':
      return `El dominio actual (${domain}) no está autorizado en Firebase Console (Auth -> Configuración -> Dominios autorizados).`;
    case 'auth/account-exists-with-different-credential':
      return 'Ya existe una cuenta con este correo registrada mediante otro método de acceso (ej. Google). Inicia sesión con dicho método.';
    case 'auth/internal-error':
      return 'Error de cookies de terceros o bloqueo de modo incógnito. En modo incógnito de Chrome, permite las cookies de terceros para este sitio o accede desde una ventana normal del navegador.';
    case 'auth/popup-closed-by-user':
      return 'El inicio de sesión fue cancelado o la ventana emergente de Google se cerró. Vuelve a hacer clic en "Continuar con Google".';
    case 'auth/popup-blocked':
      return 'La ventana emergente de Google fue bloqueada por tu navegador. Permite las ventanas emergentes para este sitio o prueba en una ventana de navegador independiente.';
    case 'auth/operation-not-allowed':
      return 'El proveedor de acceso con Google no está habilitado en Firebase Console (Auth -> Métodos de inicio de sesión).';
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Por favor, inténtalo de nuevo más tarde.';
    case 'auth/network-request-failed':
      return 'Error de conexión de red con Firebase Auth. Comprueba tu conexión a internet.';
    default:
      if (message.includes('operation-not-allowed') || code.includes('operation-not-allowed')) {
        return 'Proveedor Google no habilitado en Firebase Console.';
      }
      if (message.includes('unauthorized-domain') || code.includes('unauthorized-domain')) {
        return `El dominio (${domain}) no está autorizado en Firebase Console.`;
      }
      return `Error de autenticación [${code || 'auth/error'}]: ${message || 'Error desconocido'}`;
  }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): Error {
  const currentUser = auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid || null,
      email: currentUser?.email || null,
      emailVerified: currentUser?.emailVerified || null,
      tenantId: currentUser?.tenantId || null,
      providerInfo: currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error Info:', JSON.stringify(errInfo, null, 2));
  return new Error(JSON.stringify(errInfo));
}

export type AuthState = 'checking' | 'authenticated' | 'unauthenticated';

export interface SyncStatus {
  authState: AuthState;
  state: 'disconnected' | 'connecting' | 'synced' | 'saving' | 'pending' | 'error';
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null;
  lastSynced: string | null;
  hasPendingSync?: boolean;
  errorMsg?: string;
}

class FirebaseSyncService {
  private auth = auth;
  private db = db;

  private currentUser: User | null = null;
  private unsubscribeDoc: (() => void) | null = null;
  private saveTimeout: number | null = null;
  private isApplyingRemoteUpdate = false;
  private isInitialSyncConsolidated = false;
  private lastLocalSaveTimestamp = 0;
  private lastSyncedTimestamp: string | null = null;

  private initialAuthResolved = false;

  public status: SyncStatus = {
    authState: 'checking',
    state: 'connecting',
    user: null,
    lastSynced: null,
    hasPendingSync: false
  };

  private statusListeners: Array<(status: SyncStatus) => void> = [];
  private remoteDataListeners: Array<(data: any) => void> = [];
  private conflictListeners: Array<(info: { localData: any; remoteData: any; remoteUpdatedAt: string }) => void> = [];

  constructor() {
    this.init();
  }

  private async init() {
    if (typeof window !== 'undefined') {
      console.log('[AUTH CONFIG]', {
        projectId: this.auth.app.options.projectId,
        authDomain: this.auth.app.options.authDomain,
        appName: this.auth.app.name,
        origin: window.location.origin,
        hostname: window.location.hostname
      });

      window.addEventListener('online', () => {
        if (this.currentUser && typeof window !== 'undefined' && (window as any).app && (window as any).app.data) {
          if ((window as any).app.data.hasPendingSync) {
            this.saveData((window as any).app.data, true);
          }
        }
      });
    }

    onAuthStateChanged(this.auth, async (user) => {
      console.log('[AUTH TRACE 05] onAuthStateChanged:', {
        uid: user?.uid || null,
        email: user?.email || null,
        authCurrentUserUid: this.auth.currentUser?.uid || null
      });
      this.currentUser = user;
      const isFirstAuthCallback = !this.initialAuthResolved;
      this.initialAuthResolved = true;

      if (user) {
        this.updateStatus({
          authState: 'authenticated',
          state: 'synced',
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
          },
          lastSynced: this.lastSyncedTimestamp,
          errorMsg: undefined
        });
        this.listenToUserNotebook(user.uid);
      } else {
        if (this.saveTimeout) {
          window.clearTimeout(this.saveTimeout);
          this.saveTimeout = null;
        }
        if (this.unsubscribeDoc) {
          this.unsubscribeDoc();
          this.unsubscribeDoc = null;
        }
        this.updateStatus({
          authState: 'unauthenticated',
          state: 'disconnected',
          user: null,
          lastSynced: null,
          hasPendingSync: false,
          errorMsg: undefined
        });
      }

      // La comprobación de conexión sólo se ejecuta DESPUÉS de que Firebase Auth haya resuelto el estado de sesión inicial
      if (isFirstAuthCallback) {
        this.testConnection();
      }
    });
  }

  private async testConnection() {
    try {
      await supabaseSync.checkStatus();
    } catch (error) {
      console.warn('Comprobando conexión con Supabase:', error);
    }
  }

  private updateStatus(newStatus: Partial<SyncStatus>) {
    this.status = { ...this.status, ...newStatus };
    console.log('[AUTH TRACE 06] firebaseSync status:', {
      authState: this.status.authState,
      state: this.status.state,
      userUid: this.status.user?.uid || null,
      authCurrentUserUid: this.auth.currentUser?.uid || null
    });
    this.statusListeners.forEach((fn) => fn(this.status));
  }

  public onStatusChange(fn: (status: SyncStatus) => void) {
    this.statusListeners.push(fn);
    fn(this.status);
    return () => {
      this.statusListeners = this.statusListeners.filter((l) => l !== fn);
    };
  }

  public onRemoteData(fn: (data: any) => void) {
    this.remoteDataListeners.push(fn);
    return () => {
      this.remoteDataListeners = this.remoteDataListeners.filter((l) => l !== fn);
    };
  }

  public onSyncConflict(fn: (info: { localData: any; remoteData: any; remoteUpdatedAt: string }) => void) {
    this.conflictListeners.push(fn);
    return () => {
      this.conflictListeners = this.conflictListeners.filter((l) => l !== fn);
    };
  }

  private async listenToUserNotebook(userId: string) {
    if (this.unsubscribeDoc) {
      this.unsubscribeDoc();
      this.unsubscribeDoc = null;
    }

    this.isInitialSyncConsolidated = true;
    try {
      const remoteData = await supabaseSync.fetchNotebookFromSupabase('docente_borborigmo_gmail_com');
      if (remoteData && Array.isArray(remoteData.grupos) && remoteData.grupos.length > 0) {
        this.applyRemoteData(remoteData, new Date().toISOString());
      }
    } catch (err) {
      console.warn('Error al obtener datos de Supabase:', err);
    }
  }

  public applyRemoteData(parsed: any, updatedAt?: string) {
    this.isApplyingRemoteUpdate = true;
    this.lastSyncedTimestamp = updatedAt || new Date().toISOString();
    this.updateStatus({
      state: 'synced',
      lastSynced: this.lastSyncedTimestamp,
      hasPendingSync: false
    });

    this.remoteDataListeners.forEach((fn) => fn(parsed));
    setTimeout(() => {
      this.isApplyingRemoteUpdate = false;
    }, 500);
  }

  public saveData(data: any, immediate = false) {
    if (this.isApplyingRemoteUpdate) return;

    if (this.saveTimeout) {
      window.clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }

    const executeSave = async () => {
      this.updateStatus({ state: 'saving' });
      const now = new Date().toISOString();
      this.lastLocalSaveTimestamp = Date.now();

      // Persistir en localStorage como caché efímera
      if (typeof window !== 'undefined' && (window as any).app && (window as any).app.data) {
        (window as any).app.data.hasPendingSync = false;
        const key = (window as any).app.getStorageKey();
        if (key) {
          localStorage.setItem(key, JSON.stringify((window as any).app.data));
        }
      }

      try {
        const payloadData = { ...data };
        delete payloadData.hasPendingSync;

        const success = await supabaseSync.syncNotebookToSupabase('docente_borborigmo_gmail_com', payloadData);
        if (success) {
          this.lastSyncedTimestamp = now;
          this.updateStatus({
            state: 'synced',
            lastSynced: now,
            hasPendingSync: false,
            errorMsg: undefined
          });
        } else {
          this.updateStatus({
            state: 'pending',
            hasPendingSync: true,
            errorMsg: 'Los datos se han guardado localmente. Supabase está procesando los cambios.'
          });
        }
      } catch (err: any) {
        console.warn('Error al guardar datos en Supabase:', err);
        this.updateStatus({
          state: 'pending',
          hasPendingSync: true,
          errorMsg: 'Error guardando en Supabase. Se mantendrá el guardado local.'
        });
      }
    };

    if (immediate) {
      executeSave();
    } else {
      this.saveTimeout = window.setTimeout(executeSave, 600);
    }
  }

  public async loginWithGoogle(): Promise<User | null> {
    console.log('[AUTH TRACE 01] Login Google iniciado', {
      authDomain: this.auth?.app?.options?.authDomain,
      origin: typeof window !== 'undefined' ? window.location.origin : null
    });

    this.updateStatus({ authState: 'checking', state: 'connecting' });

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      console.log('[AUTH TRACE 02] signInWithPopup iniciado');
      const res = await signInWithPopup(this.auth, provider);
      console.log('[AUTH TRACE 03] popup result user:', {
        uid: res.user?.uid || null,
        email: res.user?.email || null,
        providerId: res.providerId
      });
      console.log('[AUTH TRACE 04] auth.currentUser:', {
        uid: this.auth.currentUser?.uid || null,
        email: this.auth.currentUser?.email || null
      });

      if (res.user) {
        this.currentUser = res.user;
        this.updateStatus({
          authState: 'authenticated',
          state: 'synced',
          user: {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName
          },
          errorMsg: undefined
        });
        this.listenToUserNotebook(res.user.uid);
      }
      return res.user;
    } catch (err: any) {
      console.warn('[AUTH TRACE ERROR] signInWithPopup error:', {
        code: err?.code,
        message: err?.message
      });

      // Si el usuario cerró la ventana emergente de Google
      if (err?.code === 'auth/popup-closed-by-user') {
        this.updateStatus({
          authState: 'unauthenticated',
          state: 'disconnected',
          errorMsg: undefined
        });
        return null;
      }

      // Si el navegador bloqueó el popup
      if (err?.code === 'auth/popup-blocked' || err?.code === 'auth/cancelled-popup-request') {
        const errMsg = 'La ventana emergente de Google fue bloqueada por tu navegador. Por favor, pulsa en "Abrir Fernanditio en ventana independiente" para iniciar sesión.';
        this.updateStatus({ authState: 'unauthenticated', state: 'error', errorMsg: errMsg });
        throw new Error(errMsg);
      }

      const errMsg = formatAuthError(err);
      this.updateStatus({
        authState: 'unauthenticated',
        state: 'error',
        errorMsg: errMsg
      });
      const errWithCode: any = new Error(errMsg);
      errWithCode.code = err?.code || 'auth/unknown';
      errWithCode.originalError = err;
      throw errWithCode;
    }
  }

  public async loginWithDirectAccess(email: string = 'borborigmo@gmail.com', displayName: string = 'Docente Fernanditio') {
    const customUid = 'docente_' + (email ? email.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'local');
    this.updateStatus({
      authState: 'authenticated',
      state: 'synced',
      user: {
        uid: customUid,
        email: email || 'borborigmo@gmail.com',
        displayName: displayName || 'Docente Fernanditio'
      },
      errorMsg: undefined
    });
    if (typeof window !== 'undefined' && (window as any).app) {
      (window as any).app.cargarDatos();
      (window as any).app.actualizarUI();
    }
    if (this.auth.currentUser && this.auth.currentUser.uid === customUid) {
      this.listenToUserNotebook(customUid);
    }
    return { uid: customUid, email, displayName };
  }

  public async logout() {
    try {
      if (this.unsubscribeDoc) {
        this.unsubscribeDoc();
        this.unsubscribeDoc = null;
      }
      await signOut(this.auth);
      this.updateStatus({
        authState: 'unauthenticated',
        state: 'disconnected',
        user: null,
        lastSynced: null
      });
    } catch (err: any) {
      console.error('Error al cerrar sesión:', err);
    }
  }

  public async getIdToken(): Promise<string | null> {
    if (!this.currentUser) return null;
    try {
      return await this.currentUser.getIdToken();
    } catch (err) {
      console.warn('Error al obtener Firebase ID Token:', err);
      return null;
    }
  }
}

export const firebaseSync = new FirebaseSyncService();
if (typeof window !== 'undefined') {
  (window as any).firebaseSync = firebaseSync;
  window.dispatchEvent(new CustomEvent('firebaseSyncReady', { detail: firebaseSync }));
}
