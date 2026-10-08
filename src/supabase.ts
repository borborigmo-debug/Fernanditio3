import { createClient } from '@supabase/supabase-js';

// URL del proyecto Supabase proporcionado por el usuario
export const SUPABASE_URL = (import.meta as any)?.env?.VITE_SUPABASE_URL || 'https://bdtkdyzmpbijvwwsbxpa.supabase.co';

// Clave anon pública de Supabase
export const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdGtkeXptcGJpanZ3d3NieHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMjY1NDksImV4cCI6MjEwNjYwMjU0OX0.qIpWI_Nw5Lya1IU6F09IYDUvjiR6-68_uHvp0ZcPU9E';

export const getSupabaseKey = (): string => {
  const envKey = (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim() !== '') {
    return envKey.trim();
  }
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('fernanditio_supabase_anon_key');
    if (localKey && localKey.trim() !== '') {
      return localKey.trim();
    }
  }
  return DEFAULT_SUPABASE_ANON_KEY;
};

export const setSupabaseKey = (key: string) => {
  if (typeof window !== 'undefined') {
    if (key && key.trim() !== '') {
      localStorage.setItem('fernanditio_supabase_anon_key', key.trim());
    } else {
      localStorage.removeItem('fernanditio_supabase_anon_key');
    }
  }
};

let supabaseClientInstance: ReturnType<typeof createClient> | null = null;

export const getSupabaseClient = () => {
  const key = getSupabaseKey();
  if (!key) return null;
  if (!supabaseClientInstance) {
    try {
      supabaseClientInstance = createClient(SUPABASE_URL, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        }
      });
    } catch (err) {
      console.warn('[Supabase Client Init Error]:', err);
      return null;
    }
  }
  return supabaseClientInstance;
};
