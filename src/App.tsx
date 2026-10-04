import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { auth } from './firebase';
import { firebaseSync, SyncStatus } from './firebaseSync';
import Login from './components/Login';

let traceSequence = 0;

export default function App() {
  const [status, setStatus] = useState<SyncStatus>(firebaseSync.status);
  const [headerTarget, setHeaderTarget] = useState<HTMLElement | null>(null);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const currentHref = typeof window !== 'undefined' ? window.location.href : '';
  const currentTimestamp = new Date().toISOString();

  useEffect(() => {
    traceSequence++;
    console.log(`[AUTH REAL ${String(traceSequence).padStart(2, '0')}] App montado`, {
      authState: status.authState,
      userUid: status.user?.uid || null,
      firebaseStatus: status.state,
      authCurrentUser: auth.currentUser ? auth.currentUser.uid : null,
      pathname: currentPath,
      location: currentHref,
      timestamp: currentTimestamp
    });

    const unsubscribe = firebaseSync.onStatusChange((newStatus) => {
      traceSequence++;
      console.log(`[AUTH REAL ${String(traceSequence).padStart(2, '0')}] Status change callback`, {
        authState: newStatus.authState,
        userUid: newStatus.user?.uid || null,
        firebaseStatus: newStatus.state,
        authCurrentUser: auth.currentUser ? auth.currentUser.uid : null,
        timestamp: new Date().toISOString()
      });

      setStatus(newStatus);

      const splash = document.getElementById('splashScreen');

      if (newStatus.authState === 'authenticated' && newStatus.user) {
        (window as any).firebaseAuthCurrentUserUid = newStatus.user.uid;
        document.body.classList.remove('user-unauthenticated');
        if (splash) {
          splash.style.opacity = '0';
          splash.style.pointerEvents = 'none';
          splash.style.display = 'none';
        }

        setTimeout(() => {
          const syncHeader = document.getElementById('cloudSyncHeader');
          if (syncHeader) {
            setHeaderTarget(syncHeader);
          }

          if ((window as any).app) {
            if (typeof (window as any).app.actualizarUI === 'function') {
              (window as any).app.actualizarUI();
            }
            if (typeof (window as any).app.renderizarSelectGrupos === 'function') {
              (window as any).app.renderizarSelectGrupos();
            }
          }
        }, 100);
      } else if (newStatus.authState === 'unauthenticated') {
        delete (window as any).firebaseAuthCurrentUserUid;
        document.body.classList.add('user-unauthenticated');
        if (splash) {
          splash.style.opacity = '0';
          splash.style.pointerEvents = 'none';
          splash.style.display = 'none';
        }
      }
    });

    return () => {
      traceSequence++;
      console.log(`[AUTH REAL ${String(traceSequence).padStart(2, '0')}] App desmontado`, {
        timestamp: new Date().toISOString()
      });
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (status.authState !== 'authenticated' || !status.user) return;

    const findHeader = () => {
      const syncHeader = document.getElementById('cloudSyncHeader');
      if (syncHeader) {
        setHeaderTarget(syncHeader);
      }
    };

    findHeader();
    const timer = setTimeout(findHeader, 250);
    return () => clearTimeout(timer);
  }, [status.authState, status.user]);

  const handleLogout = async () => {
    traceSequence++;
    console.log(`[AUTH REAL ${String(traceSequence).padStart(2, '0')}] handleLogout invocado por usuario`, {
      timestamp: new Date().toISOString()
    });
    delete (window as any).firebaseAuthCurrentUserUid;
    document.body.classList.add('user-unauthenticated');
    await firebaseSync.logout();
  };

  // 1. Estado "checking": Verificando sesión en FernanDiTio...
  if (status.authState === 'checking') {
    traceSequence++;
    console.log(`[AUTH REAL ${String(traceSequence).padStart(2, '0')}] MOSTRANDO CHECKING / VERIFICANDO SESIÓN`, {
      authState: status.authState,
      userUid: status.user?.uid || null,
      firebaseStatus: status.state,
      authCurrentUser: auth.currentUser ? auth.currentUser.uid : null,
      pathname: currentPath,
      location: currentHref,
      timestamp: currentTimestamp
    });
    return (
      <div className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-slate-950 text-white font-sans p-4">
        <div className="flex flex-col items-center gap-4 bg-slate-900 border border-emerald-500/30 p-8 rounded-3xl shadow-2xl backdrop-blur-xl max-w-sm w-full text-center">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin"></div>
          <p className="text-base font-bold text-emerald-200">Verificando sesión en FernanDiTio…</p>
        </div>
      </div>
    );
  }

  // 2. Estado "unauthenticated": Mostrar Login
  if (status.authState === 'unauthenticated' || !status.user) {
    traceSequence++;
    console.log(`[AUTH REAL ${String(traceSequence).padStart(2, '0')}] [AUTH REAL] MOSTRANDO LOGIN`, {
      authState: status.authState,
      userUid: status.user?.uid || null,
      firebaseStatus: status.state,
      authCurrentUser: auth.currentUser ? auth.currentUser.uid : null,
      pathname: currentPath,
      location: currentHref,
      timestamp: currentTimestamp
    });
    return <Login />;
  }

  // 3. Estado "authenticated": Aplicación Fernanditio
  traceSequence++;
  console.log(`[AUTH REAL ${String(traceSequence).padStart(2, '0')}] [AUTH REAL] MOSTRANDO APP`, {
    authState: status.authState,
    userUid: status.user?.uid || null,
    firebaseStatus: status.state,
    authCurrentUser: auth.currentUser ? auth.currentUser.uid : null,
    pathname: currentPath,
    location: currentHref,
    timestamp: currentTimestamp
  });

  return (
    <>
      {headerTarget && createPortal(
        <div className="flex items-center gap-2.5 bg-slate-800/90 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-xs text-slate-100 shadow-md backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="truncate max-w-[160px] font-semibold">{status.user.email || 'Docente'}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-2.5 py-1 rounded-lg transition text-[11px] font-medium cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>,
        headerTarget
      )}
    </>
  );
}
