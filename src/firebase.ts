import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  signInWithRedirect,
  signInWithCredential,
  getRedirectResult,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseAppletConfig from '../firebase-applet-config.json';

// Lectura prioritaria de variables de entorno Vite (import.meta.env.VITE_...) con fallback a firebase-applet-config.json
const env = (import.meta as any)?.env || {};

const getEnvOrConfig = (envKey: string, jsonFallback?: string): string => {
  const envVal = env[envKey];
  if (typeof envVal === 'string' && envVal.trim() !== '') {
    return envVal.trim();
  }
  return jsonFallback ? jsonFallback.trim() : '';
};

const apiKey = getEnvOrConfig('VITE_FIREBASE_API_KEY', firebaseAppletConfig.apiKey);

// Determinación del authDomain estándar de Firebase
const authDomain = getEnvOrConfig('VITE_FIREBASE_AUTH_DOMAIN', firebaseAppletConfig.authDomain) || 'eastern-deck-8pthm.firebaseapp.com';

const projectId = getEnvOrConfig('VITE_FIREBASE_PROJECT_ID', firebaseAppletConfig.projectId);
const appId = getEnvOrConfig('VITE_FIREBASE_APP_ID', firebaseAppletConfig.appId);
const firestoreDatabaseId = getEnvOrConfig('VITE_FIREBASE_DATABASE_ID', firebaseAppletConfig.firestoreDatabaseId) || '(default)';
const storageBucket = getEnvOrConfig('VITE_FIREBASE_STORAGE_BUCKET', firebaseAppletConfig.storageBucket);
const messagingSenderId = getEnvOrConfig('VITE_FIREBASE_MESSAGING_SENDER_ID', firebaseAppletConfig.messagingSenderId);

// Validación de diagnóstico para detectar variables faltantes y evaluar almacenamiento
if (typeof window !== 'undefined') {
  const isLocalStorageAvailable = (() => {
    try {
      localStorage.setItem('__test_ls__', '1');
      localStorage.removeItem('__test_ls__');
      return true;
    } catch (e) {
      return false;
    }
  })();

  const isIndexedDBAvailable = typeof window.indexedDB !== 'undefined';

  console.log('[AUTH DIAGNOSTIC STORAGE]', {
    effectiveAuthDomain: authDomain,
    currentHost: window.location.host,
    origin: window.location.origin,
    localStorageAvailable: isLocalStorageAvailable,
    indexedDBAvailable: isIndexedDBAvailable
  });
}

// Validación de diagnóstico para detectar variables faltantes y evitar errores silenciosos
const missingVars: string[] = [];
if (!apiKey) missingVars.push('VITE_FIREBASE_API_KEY / apiKey');
if (!projectId) missingVars.push('VITE_FIREBASE_PROJECT_ID / projectId');
if (!appId) missingVars.push('VITE_FIREBASE_APP_ID / appId');

if (missingVars.length > 0) {
  console.warn(
    `[Firebase Config Warning]: No se detectaron las siguientes variables de entorno o parámetros de configuración: ${missingVars.join(
      ', '
    )}. Verifica tus variables VITE_* en el entorno o en el archivo firebase-applet-config.json.`
  );
}

export const effectiveFirebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  appId,
  firestoreDatabaseId,
  storageBucket,
  messagingSenderId
};

// Unificación de la inicialización de la app de Firebase
const app = !getApps().length ? initializeApp(effectiveFirebaseConfig) : getApp();

export const auth = getAuth(app);

if (typeof window !== 'undefined') {
  console.log('[AUTH DOMAIN REAL]', {
    windowOrigin: window.location.origin,
    windowHost: window.location.host,
    authConfigAuthDomain: auth.config.authDomain,
    authConfigApiKey: auth.config.apiKey,
    authConfigProjectId: (auth.config as any).projectId || effectiveFirebaseConfig.projectId
  });
}

// Configuración explícita de persistencia local antes de cualquier operación de login
console.log('[AUTH TRACE PERSISTENCE] iniciando');
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('[AUTH TRACE PERSISTENCE] completada');
  })
  .catch((err) => {
    console.warn('[AUTH TRACE PERSISTENCE] INFO:', err?.code || err?.name, err?.message || String(err));
  });

export const db = (() => {
  try {
    return getFirestore(app, effectiveFirebaseConfig.firestoreDatabaseId || '(default)');
  } catch (err) {
    console.warn('[Firestore Init Notice]:', err);
    return null as any;
  }
})();

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const oAuthClientId = firebaseAppletConfig.oAuthClientId;

export {
  signOut,
  signInWithPopup,
  signInWithRedirect,
  signInWithCredential,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
};
export type { User };
