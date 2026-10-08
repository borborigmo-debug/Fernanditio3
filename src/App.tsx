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
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            id="btnCloudStatusIndicator"
            className="btn-cloud-compact"
            onClick={(e) => {
              if ((window as any).app && typeof (window as any).app.alternarPopoverNube === 'function') {
                (window as any).app.alternarPopoverNube(e);
              }
            }}
            title={status.user.email || 'borborigmo@gmail.com'}
            aria-label={status.user.email || 'borborigmo@gmail.com'}
          >
            <div className="relative flex items-center justify-center">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
              </svg>
              <span className="absolute -bottom-[2px] -right-[2px] w-[7px] h-[7px] rounded-full bg-emerald-500 border border-white"></span>
            </div>
          </button>

          <button
            type="button"
            id="btnCloudHeaderLogout"
            className="btn-cloud-compact btn-logout"
            onClick={handleLogout}
            title="cerrar sesión"
            aria-label="cerrar sesión"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>,
        headerTarget
      )}
    </>
  );
}
