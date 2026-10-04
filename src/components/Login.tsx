import React, { useState, useEffect } from 'react';
import { firebaseSync } from '../firebaseSync';
import { getSupabaseKey, setSupabaseKey, SUPABASE_URL } from '../supabase';
import { supabaseSync } from '../supabaseSync';
import userDataset from '../userDataset.json';

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSupabaseConfig, setShowSupabaseConfig] = useState(false);
  const [supabaseKey, setSupabaseKeyInput] = useState(getSupabaseKey());
  const [supabaseStatusMsg, setSupabaseStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    console.log('[AUTH TRACE 08] Login mounted');
    return () => {
      console.log('[AUTH TRACE 09] Login unmounted');
    };
  }, []);

  const handleSaveSupabaseKey = async () => {
    if (!supabaseKey.trim()) {
      setError('Por favor introduce tu clave de API anon de Supabase.');
      return;
    }
    setLoading(true);
    setError(null);
    setSupabaseStatusMsg('Conectando y migrando datos del cuaderno a Supabase...');
    try {
      setSupabaseKey(supabaseKey.trim());
      const notebookData = (window as any).app?.data || userDataset;
      const seedResult = await supabaseSync.seedRelationalDataToSupabase('docente_borborigmo_gmail_com', notebookData);
      setSupabaseStatusMsg(seedResult.message);
      if (seedResult.success) {
        setTimeout(() => {
          handleDirectLogin();
        }, 1200);
      }
    } catch (e: any) {
      setError(e?.message || 'Error al conectar/sincronizar con Supabase');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await firebaseSync.loginWithGoogle();
    } catch (err: any) {
      console.error('[Google Auth Error]:', err?.message || String(err));
      const msg = err?.message || 'Error al conectar con Google Authentication.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await firebaseSync.loginWithDirectAccess('borborigmo@gmail.com', 'Profesor Fernanditio');
    } catch (err: any) {
      console.error('[Direct Access Error]:', err?.message || String(err));
      setError('Error al acceder en modo directo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-3 sm:p-6 font-sans overflow-y-auto">
      <div className="w-full max-w-md bg-slate-900/95 border border-emerald-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl text-center flex flex-col items-center relative overflow-y-auto max-h-[95vh] backdrop-blur-2xl my-auto">
        {/* Glow effects */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative mb-3 p-2.5 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl shadow-inner">
          <img
            src="/icon.png"
            alt="FernanDiTio Logo"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-xl drop-shadow-md"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/Fernanditio.svg';
            }}
          />
        </div>

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-0.5">
          FernanDiTio
        </h1>
        <p className="text-emerald-400 text-xs sm:text-sm font-bold mb-1.5">
          Cuaderno Docente por Criterios LOMLOE
        </p>

        <p className="text-[11px] sm:text-xs text-slate-300 max-w-xs mb-4 leading-relaxed">
          Acceso exclusivo para profesorado. Inicia sesión con tu cuenta oficial de Google para acceder a tu cuaderno de evaluación.
        </p>

        {/* Error notification banner */}
        {error && (
          <div className="w-full mb-4 p-3.5 bg-red-950/90 border border-red-500/60 rounded-2xl text-red-200 text-xs text-left leading-relaxed flex items-start gap-2.5 shadow-lg animate-fadeIn">
            <span className="text-base leading-none flex-shrink-0 mt-0.5">⚠️</span>
            <div className="flex-1 font-medium">{error}</div>
          </div>
        )}

        {/* Exclusive Google Auth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3.5 px-5 bg-white hover:bg-slate-100 active:scale-[0.98] text-slate-900 font-extrabold rounded-2xl shadow-xl border border-slate-200 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base tracking-wide mb-3"
        >
          {loading ? (
            <div className="flex items-center gap-2.5 text-slate-800 font-bold text-sm">
              <svg className="animate-spin h-5 w-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Conectando...
            </div>
          ) : (
            <>
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continuar con Google</span>
            </>
          )}
        </button>

        {/* Direct Access Teacher Button */}
        <button
          type="button"
          onClick={handleDirectLogin}
          disabled={loading}
          className="w-full py-3.5 px-5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-extrabold rounded-2xl shadow-xl border border-emerald-400/40 transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer text-sm sm:text-base tracking-wide"
        >
          <span>📝</span>
          <span>Acceder directamente a mi Cuaderno Docente</span>
        </button>

        {/* Supabase PostgreSQL Project Option */}
        <div className="mt-3.5 w-full p-3 bg-slate-900 border border-teal-500/50 rounded-2xl text-left text-xs text-slate-200 shadow-lg">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-teal-400 flex items-center gap-1.5 text-xs">
              <span>⚡</span> Supabase PostgreSQL (<code className="text-[10px] text-teal-200 bg-teal-950/80 px-1.5 py-0.5 rounded">bdtkdyzmpbijvwwsbxpa</code>)
            </span>
            <button
              type="button"
              onClick={() => setShowSupabaseConfig(!showSupabaseConfig)}
              className="text-[10px] text-emerald-400 hover:text-emerald-300 underline font-bold cursor-pointer"
            >
              {showSupabaseConfig ? 'Ocultar' : 'Configurar Clave API'}
            </button>
          </div>

          {showSupabaseConfig ? (
            <div className="mt-2.5 space-y-2 border-t border-slate-800 pt-2.5">
              <p className="text-[11px] text-slate-300 leading-snug">
                Pega tu clave pública <code className="text-teal-300">anon</code> (la encuentras en <em>Project Settings ➔ API</em> de tu dashboard de Supabase):
              </p>
              <input
                type="password"
                value={supabaseKey}
                onChange={(e) => setSupabaseKeyInput(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6Ik..."
                className="w-full px-3 py-2 bg-slate-950 border border-teal-500/40 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-teal-400 font-mono placeholder:text-slate-600"
              />
              <button
                type="button"
                onClick={handleSaveSupabaseKey}
                disabled={loading}
                className="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs shadow transition-all cursor-pointer"
              >
                Conectar con Supabase
              </button>
            </div>
          ) : (
            <p className="text-[10px] text-slate-400 leading-snug">
              Proyecto conectado: <span className="text-teal-300 font-mono">https://bdtkdyzmpbijvwwsbxpa.supabase.co</span>
            </p>
          )}

          {supabaseStatusMsg && (
            <p className="mt-2 text-[10px] text-teal-300 font-medium leading-snug bg-teal-950/60 p-1.5 rounded-lg border border-teal-500/30">
              {supabaseStatusMsg}
            </p>
          )}
        </div>

        {/* Security & Data Isolation Footnote */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 w-full text-center">
          <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs mx-auto">
            🔒 <strong className="text-emerald-400">Aislamiento y almacenamiento único:</strong> Tus datos se gestionan, leen y escriben exclusivamente en Supabase PostgreSQL.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
