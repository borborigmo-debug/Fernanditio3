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
import { auth } from './firebase';
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

  private currentUser: User | null = null;
  private saveTimeout: number | null = null;
  private isApplyingRemoteUpdate = false;
  private lastSyncedTimestamp: string | null = null;
  private initialAuthResolved = false;

  private getInitialStatus(): SyncStatus {
    const isExplicitLogout = typeof window !== 'undefined' && localStorage.getItem('fernanditio_logged_out') === 'true';
    if (isExplicitLogout) {
      return {
        authState: 'unauthenticated',
        state: 'disconnected',
        user: null,
        lastSynced: null,
        hasPendingSync: false
      };
    }
    return {
      authState: 'checking',
      state: 'connecting',
      user: null,
      lastSynced: null,
      hasPendingSync: false
    };
  }

  public status: SyncStatus = this.getInitialStatus();

  private statusListeners: Array<(status: SyncStatus) => void> = [];
  private remoteDataListeners: Array<(data: any) => void> = [];
  private conflictListeners: Array<(info: { localData: any; remoteData: any; remoteUpdatedAt: string }) => void> = [];

  constructor() {
    this.init();
  }

  private async init() {
    onAuthStateChanged(this.auth, async (user) => {
      this.currentUser = user;
      const isFirstAuthCallback = !this.initialAuthResolved;
      this.initialAuthResolved = true;

      if (user) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('fernanditio_logged_out');
        }
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
        await this.loadUserData(user);
      } else {
        if (this.saveTimeout) {
          window.clearTimeout(this.saveTimeout);
          this.saveTimeout = null;
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

  private async loadUserData(user: { uid?: string; email?: string | null; displayName?: string | null }) {
    try {
      const teacherId = await supabaseSync.resolveTeacherId(user);
      const remoteData = await supabaseSync.loadNotebook(teacherId);
      if (remoteData) {
        this.applyRemoteData(remoteData, new Date().toISOString());
      }
    } catch (err: any) {
      console.warn('Error al obtener datos de Supabase:', err);
      this.updateStatus({
        state: 'error',
        errorMsg: err?.message || 'Error de conexión con Supabase'
      });
    }
  }

  public applyRemoteData(parsed: any, updatedAt?: string) {
    this.isApplyingRemoteUpdate = true;
    this.lastSyncedTimestamp = updatedAt || new Date().toISOString();
    this.updateStatus({
      state: 'synced',
      lastSynced: this.lastSyncedTimestamp,
      hasPendingSync: false,
      errorMsg: undefined
    });

    this.remoteDataListeners.forEach((fn) => fn(parsed));
    setTimeout(() => {
      this.isApplyingRemoteUpdate = false;
    }, 300);
  }

  public saveData(data: any, immediate = false) {
    if (this.isApplyingRemoteUpdate) return;
    const now = new Date().toISOString();
    this.lastSyncedTimestamp = now;
    this.updateStatus({
      state: 'synced',
      lastSynced: now,
      hasPendingSync: false,
      errorMsg: undefined
    });
  }

  public async loginWithGoogle(): Promise<User | null> {
    this.updateStatus({ authState: 'checking', state: 'connecting' });
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const res = await signInWithPopup(this.auth, provider);
      return res.user;
    } catch (err: any) {
      console.warn('[Google Auth Error]:', err?.message || String(err));
      this.updateStatus({ authState: 'unauthenticated', state: 'error', errorMsg: formatAuthError(err) });
      throw err;
    }
  }

  public async loginWithDirectAccess(email: string, displayName = 'Docente'): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fernanditio_logged_out');
    }
    const derivedUid = email ? `docente_${email.replace(/[^a-zA-Z0-9]/g, '_')}` : 'docente_anonimo';
    const directUser = {
      uid: derivedUid,
      email: email || 'docente@ejemplo.com',
      displayName: displayName || 'Profesor Fernanditio'
    };

    this.updateStatus({
      authState: 'authenticated',
      state: 'synced',
      user: directUser,
      lastSynced: this.lastSyncedTimestamp,
      errorMsg: undefined
    });

    await this.loadUserData(directUser);
  }

  public async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fernanditio_logged_out', 'true');
    }
    await signOut(this.auth);
    this.currentUser = null;
    this.updateStatus({
      authState: 'unauthenticated',
      state: 'disconnected',
      user: null,
      lastSynced: null,
      hasPendingSync: false,
      errorMsg: undefined
    });
  }

  private cachedSessionToken: { token: string; expiresAt: number } | null = null;

  public invalidateCachedToken() {
    this.cachedSessionToken = null;
  }

  public async getIdToken(forceRefresh = true): Promise<string | null> {
    const user = this.currentUser || this.auth.currentUser;
    if (user && typeof user.getIdToken === 'function') {
      try {
        let token = await user.getIdToken(forceRefresh);
        if (token && typeof token === 'string' && token.length > 20) {
          // Verificar si el token JWT de Firebase está expirado o próximo a expirar (dentro de 90s)
          let isExpired = false;
          try {
            const parts = token.split('.');
            if (parts.length === 3) {
              const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
              const jsonPayload = decodeURIComponent(
                atob(base64)
                  .split('')
                  .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                  .join('')
              );
              const payload = JSON.parse(jsonPayload);
              if (payload.exp && (payload.exp * 1000) <= (Date.now() + 90000)) {
                isExpired = true;
              }
            }
          } catch {
            isExpired = false;
          }

          if (isExpired) {
            console.info('[firebaseSync] Token de Firebase Auth próximo a expirar o expirado. Forzando renovación (forceRefresh=true)...');
            try {
              token = await user.getIdToken(true);
            } catch (refreshErr) {
              console.warn('[firebaseSync] Falló renovación forzada de Firebase ID token, utilizando fallback de sesión:', refreshErr);
              token = null;
            }
          }

          if (token && typeof token === 'string' && token.length > 20) {
            return token;
          }
        }
      } catch (err) {
        console.warn('[firebaseSync] Error al obtener ID token de Firebase Auth:', err);
      }
    }

    // Comprobar token en memoria no expirado
    if (this.cachedSessionToken && Date.now() < this.cachedSessionToken.expiresAt) {
      return this.cachedSessionToken.token;
    }

    // Si el usuario está autenticado en modo directo (o en sesión docente de la aplicación),
    // obtener el token de sesión emitido por el servidor
    const currentEmail = (this.status && this.status.user && this.status.user.email) || 'borborigmo@gmail.com';
    const currentUid = (this.status && this.status.user && this.status.user.uid) || 'docente_borborigmo_gmail_com';
    try {
      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentEmail, uid: currentUid })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.token) {
          this.cachedSessionToken = {
            token: data.token,
            expiresAt: Date.now() + 23 * 3600 * 1000
          };
          return data.token;
        }
      }
    } catch (sessionErr) {
      console.warn('[firebaseSync] Error solicitando token de sesión al servidor:', sessionErr);
    }

    return null;
  }
}

export const firebaseSync = new FirebaseSyncService();

if (typeof window !== 'undefined') {
  (window as any).firebaseSync = firebaseSync;
  try {
    window.dispatchEvent(new CustomEvent('firebaseSyncReady', { detail: firebaseSync }));
  } catch (e) {
    // ignore
  }
}
