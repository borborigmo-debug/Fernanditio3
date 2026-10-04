-- ==============================================================================
-- ESQUEMA DE BASE DE DATOS RELACIONAL PARA FERNANDITIO EN SUPABASE
-- Proyecto: https://supabase.com/dashboard/project/bdtkdyzmpbijvwwsbxpa
-- Copia y ejecuta este script en: SQL Editor -> New Query en tu consola de Supabase
-- ==============================================================================

-- 1. Profesores / Cuadernos
CREATE TABLE IF NOT EXISTS profesores (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Grupos / Cursos
CREATE TABLE IF NOT EXISTS grupos (
  id TEXT PRIMARY KEY,
  profesor_id TEXT REFERENCES profesores(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  oculto BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Alumnos
CREATE TABLE IF NOT EXISTS alumnos (
  id TEXT PRIMARY KEY,
  grupo_id TEXT REFERENCES grupos(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  orden INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Criterios de Evaluación LOMLOE
CREATE TABLE IF NOT EXISTS criterios (
  id SERIAL PRIMARY KEY,
  grupo_id TEXT REFERENCES grupos(id) ON DELETE CASCADE,
  codigo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  ponderacion NUMERIC DEFAULT 0
);

-- 5. Secciones de Evaluación
CREATE TABLE IF NOT EXISTS secciones (
  id TEXT PRIMARY KEY,
  grupo_id TEXT REFERENCES grupos(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  color TEXT DEFAULT '#2563eb',
  ponderacion NUMERIC DEFAULT 0,
  oculto BOOLEAN DEFAULT FALSE
);

-- 6. Rúbricas
CREATE TABLE IF NOT EXISTS rubricas (
  id TEXT PRIMARY KEY,
  grupo_id TEXT REFERENCES grupos(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  tipo TEXT DEFAULT 'Actividad',
  descripcion TEXT,
  fecha_creacion DATE DEFAULT CURRENT_DATE,
  items JSONB DEFAULT '[]'::jsonb
);

-- 7. Actividades Evaluables
CREATE TABLE IF NOT EXISTS actividades (
  id TEXT PRIMARY KEY,
  grupo_id TEXT REFERENCES grupos(id) ON DELETE CASCADE,
  evaluacion_periodo TEXT DEFAULT 'eval1',
  nombre TEXT NOT NULL,
  tipo TEXT DEFAULT 'Actividad',
  seccion_id TEXT,
  metodo TEXT DEFAULT 'rubrica',
  rubrica_id TEXT,
  fecha_creacion DATE DEFAULT CURRENT_DATE
);

-- 8. Calificaciones (Fila a fila por alumno y actividad)
CREATE TABLE IF NOT EXISTS calificaciones (
  id SERIAL PRIMARY KEY,
  grupo_id TEXT REFERENCES grupos(id) ON DELETE CASCADE,
  alumno_id TEXT REFERENCES alumnos(id) ON DELETE CASCADE,
  actividad_id TEXT REFERENCES actividades(id) ON DELETE CASCADE,
  nota NUMERIC NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (alumno_id, actividad_id)
);

-- 9. Diario de Clase
CREATE TABLE IF NOT EXISTS diario_clase (
  id TEXT PRIMARY KEY,
  grupo_id TEXT REFERENCES grupos(id) ON DELETE CASCADE,
  fecha DATE NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Cuaderno Sync Backup (Sincronización híbrida de respaldo)
CREATE TABLE IF NOT EXISTS cuadernos_sync (
  profesor_id TEXT PRIMARY KEY REFERENCES profesores(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  version INT DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Políticas de Seguridad RLS (Row Level Security) permitiendo acceso público/anon para la API
ALTER TABLE profesores ENABLE ROW LEVEL SECURITY;
ALTER TABLE grupos ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumnos ENABLE ROW LEVEL SECURITY;
ALTER TABLE criterios ENABLE ROW LEVEL SECURITY;
ALTER TABLE secciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE rubricas ENABLE ROW LEVEL SECURITY;
ALTER TABLE actividades ENABLE ROW LEVEL SECURITY;
ALTER TABLE calificaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE diario_clase ENABLE ROW LEVEL SECURITY;
ALTER TABLE cuadernos_sync ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura y escritura a todos los usuarios autorizados" ON profesores FOR ALL USING (true);
CREATE POLICY "Permitir lectura y escritura a todos los grupos" ON grupos FOR ALL USING (true);
CREATE POLICY "Permitir lectura y escritura a todos los alumnos" ON alumnos FOR ALL USING (true);
CREATE POLICY "Permitir lectura y escritura a criterios" ON criterios FOR ALL USING (true);
CREATE POLICY "Permitir lectura y escritura a secciones" ON secciones FOR ALL USING (true);
CREATE POLICY "Permitir lectura y escritura a rubricas" ON rubricas FOR ALL USING (true);
CREATE POLICY "Permitir lectura y escritura a actividades" ON actividades FOR ALL USING (true);
CREATE POLICY "Permitir lectura y escritura a calificaciones" ON calificaciones FOR ALL USING (true);
CREATE POLICY "Permitir lectura y escritura a diario_clase" ON diario_clase FOR ALL USING (true);
CREATE POLICY "Permitir lectura y escritura a cuadernos_sync" ON cuadernos_sync FOR ALL USING (true);
