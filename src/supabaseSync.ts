import { getSupabaseClient, setSupabaseKey, SUPABASE_URL } from './supabase';

export interface SupabaseSyncStatus {
  connected: boolean;
  hasKey: boolean;
  projectUrl: string;
  lastSyncedAt?: string;
  errorMsg?: string;
}

class SupabaseSyncManager {
  private listeners: ((status: SupabaseSyncStatus) => void)[] = [];
  public status: SupabaseSyncStatus = {
    connected: false,
    hasKey: false,
    projectUrl: SUPABASE_URL
  };

  constructor() {
    this.checkStatus();
  }

  public onStatusChange(fn: (status: SupabaseSyncStatus) => void) {
    this.listeners.push(fn);
    fn(this.status);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.status));
  }

  public async configureKey(key: string): Promise<boolean> {
    setSupabaseKey(key);
    return await this.checkStatus();
  }

  public async checkStatus(): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) {
      this.status = {
        connected: false,
        hasKey: false,
        projectUrl: SUPABASE_URL,
        errorMsg: 'Clave pública "anon" de Supabase no configurada.'
      };
      this.notify();
      return false;
    }

    try {
      const { data, error } = await client.from('cuadernos_sync').select('profesor_id').limit(1);
      if (error && error.code !== 'PGRST116') {
        console.warn('[Supabase Connection Notice]:', error.message);
        this.status = {
          connected: true,
          hasKey: true,
          projectUrl: SUPABASE_URL,
          errorMsg: error.message
        };
        this.notify();
        return true;
      }

      this.status = {
        connected: true,
        hasKey: true,
        projectUrl: SUPABASE_URL,
        lastSyncedAt: this.status.lastSyncedAt || 'Conectado a PostgreSQL',
        errorMsg: undefined
      };
      this.notify();
      return true;
    } catch (err: any) {
      console.warn('[Supabase Exception]:', err?.message || String(err));
      this.status = {
        connected: false,
        hasKey: true,
        projectUrl: SUPABASE_URL,
        errorMsg: err?.message || 'Error de conexión con Supabase.'
      };
      this.notify();
      return false;
    }
  }

  /**
   * Guarda de manera directa e instantánea una calificación individual en la tabla 'calificaciones' de Supabase.
   */
  public async saveGrade(
    grupoId: string,
    alumnoId: string,
    actividadId: string,
    nota: number | null | undefined
  ): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      // 1. Asegurar que la actividad existe en la tabla 'actividades' para satisfacer la clave foránea
      const { data: actRow } = await (client.from('actividades') as any)
        .select('id')
        .eq('id', actividadId)
        .limit(1);

      if (!actRow || actRow.length === 0) {
        await (client.from('actividades') as any).upsert({
          id: actividadId,
          grupo_id: grupoId,
          nombre: 'Actividad Evaluada',
          evaluacion_periodo: 'eval1',
          tipo: 'Actividad',
          fecha_creacion: new Date().toISOString().slice(0, 10)
        });
      }

      // 2. Si la nota es nula o indefinida, borrar de la tabla calificaciones
      if (nota === null || nota === undefined || isNaN(Number(nota))) {
        const { error: delErr } = await (client.from('calificaciones') as any)
          .delete()
          .eq('alumno_id', alumnoId)
          .eq('actividad_id', actividadId);

        if (delErr) {
          console.warn('[Supabase Grade Delete Notice]:', delErr.message);
        }
      } else {
        // 3. Upsert atómico en la tabla calificaciones
        const { error: upsertErr } = await (client.from('calificaciones') as any)
          .upsert({
            grupo_id: grupoId,
            alumno_id: alumnoId,
            actividad_id: actividadId,
            nota: Number(nota),
            updated_at: new Date().toISOString()
          }, { onConflict: 'alumno_id,actividad_id' });

        if (upsertErr) {
          console.warn('[Supabase Grade Upsert Notice]:', upsertErr.message);
          return false;
        }
      }

      this.status.lastSyncedAt = new Date().toLocaleTimeString();
      this.notify();
      return true;
    } catch (err: any) {
      console.warn('[Supabase Save Grade Exception]:', err?.message || String(err));
      return false;
    }
  }

  /**
   * Guarda de manera directa e instantánea un alumno en la tabla 'alumnos'.
   */
  public async saveStudent(
    grupoId: string,
    student: { id: string; nombre: string; orden?: number }
  ): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { error } = await (client.from('alumnos') as any).upsert({
        id: student.id,
        grupo_id: grupoId,
        nombre: student.nombre,
        orden: Number(student.orden) || 1
      });
      if (error) {
        console.warn('[Supabase Save Student Notice]:', error.message);
        return false;
      }
      this.status.lastSyncedAt = new Date().toLocaleTimeString();
      this.notify();
      return true;
    } catch (err) {
      console.warn('[Supabase Save Student Exception]:', err);
      return false;
    }
  }

  /**
   * Elimina un alumno de la tabla 'alumnos' (ON DELETE CASCADE elimina sus calificaciones).
   */
  public async deleteStudent(alumnoId: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      await (client.from('alumnos') as any).delete().eq('id', alumnoId);
      this.status.lastSyncedAt = new Date().toLocaleTimeString();
      this.notify();
      return true;
    } catch (err) {
      console.warn('[Supabase Delete Student Exception]:', err);
      return false;
    }
  }

  /**
   * Guarda de manera directa un grupo en la tabla 'grupos'.
   */
  public async saveGroup(
    group: { id: string; nombre: string; oculto?: boolean },
    profesorId: string = 'docente_borborigmo_gmail_com'
  ): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      await (client.from('profesores') as any).upsert({
        id: profesorId,
        email: 'borborigmo@gmail.com',
        nombre: 'Profesor Fernanditio',
        updated_at: new Date().toISOString()
      });

      const { error } = await (client.from('grupos') as any).upsert({
        id: group.id,
        profesor_id: profesorId,
        nombre: group.nombre,
        oculto: !!group.oculto,
        updated_at: new Date().toISOString()
      });

      if (error) {
        console.warn('[Supabase Save Group Notice]:', error.message);
        return false;
      }
      this.status.lastSyncedAt = new Date().toLocaleTimeString();
      this.notify();
      return true;
    } catch (err) {
      console.warn('[Supabase Save Group Exception]:', err);
      return false;
    }
  }

  /**
   * Elimina un grupo de la tabla 'grupos' (ON DELETE CASCADE elimina alumnos, notas, etc.).
   */
  public async deleteGroup(grupoId: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      await (client.from('grupos') as any).delete().eq('id', grupoId);
      this.status.lastSyncedAt = new Date().toLocaleTimeString();
      this.notify();
      return true;
    } catch (err) {
      console.warn('[Supabase Delete Group Exception]:', err);
      return false;
    }
  }

  public async syncNotebookToSupabase(
    profesorId: string = 'docente_borborigmo_gmail_com',
    notebookData: any
  ): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      // 1. Asegurar que el registro de profesor existe primero (para cumplir claves foráneas)
      await (client.from('profesores') as any).upsert({
        id: profesorId,
        email: 'borborigmo@gmail.com',
        nombre: 'Profesor Fernanditio',
        updated_at: new Date().toISOString()
      });

      // 2. Guardar copia sincronizada en cuadernos_sync
      const { error: syncErr } = await (client.from('cuadernos_sync') as any)
        .upsert({
          profesor_id: profesorId,
          data: notebookData,
          version: notebookData.version || 1,
          updated_at: new Date().toISOString()
        });

      if (syncErr) {
        console.warn('[Supabase Sync Info]:', syncErr?.message || String(syncErr));
      }

      // 3. Poblar las tablas relacionales garantizando await
      await this.seedRelationalDataToSupabase(profesorId, notebookData);

      this.status.lastSyncedAt = new Date().toLocaleTimeString();
      this.status.errorMsg = undefined;
      this.notify();
      return true;
    } catch (err: any) {
      console.warn('[Supabase Sync Exception]:', err?.message || String(err));
      this.status.errorMsg = err?.message || 'Error al guardar en Supabase';
      this.notify();
      return false;
    }
  }

  public async clearSupabaseData(profesorId: string = 'docente_borborigmo_gmail_com'): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
      const { data: gruposData } = await (client.from('grupos') as any)
        .select('id')
        .eq('profesor_id', profesorId);

      const grupoIds = (gruposData || []).map((g: any) => g.id);

      if (grupoIds.length > 0) {
        await (client.from('calificaciones') as any).delete().in('grupo_id', grupoIds);
        await (client.from('diario_clase') as any).delete().in('grupo_id', grupoIds);
        await (client.from('actividades') as any).delete().in('grupo_id', grupoIds);
        await (client.from('rubricas') as any).delete().in('grupo_id', grupoIds);
        await (client.from('secciones') as any).delete().in('grupo_id', grupoIds);
        await (client.from('alumnos') as any).delete().in('grupo_id', grupoIds);
      }

      await (client.from('grupos') as any).delete().eq('profesor_id', profesorId);
      await (client.from('cuadernos_sync') as any).delete().eq('profesor_id', profesorId);

      return true;
    } catch (err) {
      console.warn('[Supabase Clear Warning]:', err);
      return false;
    }
  }

  public async seedRelationalDataToSupabase(
    profesorId: string,
    notebookData: any,
    clearExisting: boolean = false
  ): Promise<{ success: boolean; message: string }> {
    const client = getSupabaseClient();
    if (!client) {
      return { success: false, message: 'Clave de Supabase no configurada.' };
    }

    try {
      if (clearExisting) {
        await this.clearSupabaseData(profesorId);
      }

      // 1. Profesor
      const { error: profErr } = await (client.from('profesores') as any).upsert({
        id: profesorId,
        email: 'borborigmo@gmail.com',
        nombre: 'Profesor Fernanditio',
        updated_at: new Date().toISOString()
      });
      if (profErr) {
        console.warn('[Supabase Notice Profesor]:', profErr.message);
      }

      // 2. Cuaderno sync
      const { error: syncDocErr } = await (client.from('cuadernos_sync') as any).upsert({
        profesor_id: profesorId,
        data: notebookData,
        version: notebookData.version || 1289,
        updated_at: new Date().toISOString()
      });
      if (syncDocErr) {
        console.warn('[Supabase Notice Cuaderno Sync]:', syncDocErr.message);
      }

      const grupos = notebookData.grupos || [];
      for (const g of grupos) {
        // Guardar Grupo
        const { error: grpErr } = await (client.from('grupos') as any).upsert({
          id: g.id,
          profesor_id: profesorId,
          nombre: g.nombre,
          oculto: !!g.oculto,
          updated_at: new Date().toISOString()
        });
        if (grpErr) {
          console.warn('[Supabase Notice Grupo]:', grpErr.message);
        }

        // Alumnos
        if (Array.isArray(g.alumnos) && g.alumnos.length > 0) {
          const alumnosPayload = g.alumnos.map((a: any) => ({
            id: a.id,
            grupo_id: g.id,
            nombre: a.nombre,
            orden: Number(a.orden) || 1
          }));
          const { error: aluErr } = await (client.from('alumnos') as any).upsert(alumnosPayload);
          if (aluErr) {
            console.warn('[Supabase Notice Alumnos]:', aluErr.message);
          }
        }

        // Secciones
        if (Array.isArray(g.secciones) && g.secciones.length > 0) {
          const seccionesPayload = g.secciones.map((sec: any) => ({
            id: sec.id,
            grupo_id: g.id,
            nombre: sec.nombre,
            color: sec.color || '#2563eb',
            ponderacion: sec.ponderacion || 0,
            oculto: !!sec.oculto
          }));
          await (client.from('secciones') as any).upsert(seccionesPayload);
        }

        // Rúbricas
        if (Array.isArray(g.rubricas) && g.rubricas.length > 0) {
          const rubricasPayload = g.rubricas.map((rub: any) => ({
            id: rub.id,
            grupo_id: g.id,
            titulo: rub.titulo,
            tipo: rub.tipo || 'Actividad',
            descripcion: rub.descripcion || '',
            fecha_creacion: (rub.fechaCreacion && typeof rub.fechaCreacion === 'string' && rub.fechaCreacion.length >= 10)
              ? rub.fechaCreacion.slice(0, 10)
              : new Date().toISOString().slice(0, 10),
            items: rub.items || rub.aspectos || []
          }));
          await (client.from('rubricas') as any).upsert(rubricasPayload);
        }

        // Actividades y Calificaciones
        if (g.evaluaciones && typeof g.evaluaciones === 'object') {
          for (const evKey of Object.keys(g.evaluaciones)) {
            const ev = g.evaluaciones[evKey];
            if (!ev) continue;

            const existingActMap = new Set<string>();

            // Guardar Actividades declaradas
            if (Array.isArray(ev.actividades) && ev.actividades.length > 0) {
              const actividadesPayload = ev.actividades.map((act: any) => {
                existingActMap.add(act.id);
                return {
                  id: act.id,
                  grupo_id: g.id,
                  evaluacion_periodo: evKey,
                  nombre: act.nombre || 'Actividad',
                  tipo: act.tipo || 'Actividad',
                  seccion_id: act.seccionId || null,
                  metodo: act.metodo || 'rubrica',
                  rubrica_id: act.rubricaId || null,
                  fecha_creacion: (act.fechaCreacion && typeof act.fechaCreacion === 'string' && act.fechaCreacion.length >= 10)
                    ? act.fechaCreacion.slice(0, 10)
                    : new Date().toISOString().slice(0, 10)
                };
              });
              await (client.from('actividades') as any).upsert(actividadesPayload);
            }

            // Guardar Calificaciones y asegurar actividades referenciadas
            if (ev.calificaciones && typeof ev.calificaciones === 'object') {
              const missingActividades: any[] = [];
              const califsPayload: any[] = [];

              for (const actId of Object.keys(ev.calificaciones)) {
                if (!existingActMap.has(actId)) {
                  missingActividades.push({
                    id: actId,
                    grupo_id: g.id,
                    evaluacion_periodo: evKey,
                    nombre: 'Actividad Evaluada',
                    tipo: 'Actividad',
                    fecha_creacion: new Date().toISOString().slice(0, 10)
                  });
                  existingActMap.add(actId);
                }

                const mapAlu = ev.calificaciones[actId] || {};
                for (const aluId of Object.keys(mapAlu)) {
                  const nota = mapAlu[aluId];
                  if (nota != null && !isNaN(Number(nota))) {
                    califsPayload.push({
                      grupo_id: g.id,
                      alumno_id: aluId,
                      actividad_id: actId,
                      nota: Number(nota),
                      updated_at: new Date().toISOString()
                    });
                  }
                }
              }

              if (missingActividades.length > 0) {
                await (client.from('actividades') as any).upsert(missingActividades);
              }

              if (califsPayload.length > 0) {
                // Upsert en lotes de 50 para máxima robustez
                for (let i = 0; i < califsPayload.length; i += 50) {
                  const chunk = califsPayload.slice(i, i + 50);
                  const { error: calErr } = await (client.from('calificaciones') as any)
                    .upsert(chunk, { onConflict: 'alumno_id,actividad_id' });
                  if (calErr) {
                    console.warn('[Supabase Calificaciones Batch Notice]:', calErr.message);
                  }
                }
              }
            }
          }
        }

        // Diario de Clase
        if (Array.isArray(g.diarioClase) && g.diarioClase.length > 0) {
          const diarioPayload = g.diarioClase.map((evt: any) => ({
            id: evt.id,
            grupo_id: g.id,
            fecha: (evt.fecha && typeof evt.fecha === 'string' && evt.fecha.length >= 10)
              ? evt.fecha.slice(0, 10)
              : new Date().toISOString().slice(0, 10),
            descripcion: evt.descripcion || ''
          }));
          await (client.from('diario_clase') as any).upsert(diarioPayload);
        }
      }

      this.status.lastSyncedAt = new Date().toLocaleTimeString();
      this.status.errorMsg = undefined;
      this.notify();

      return { success: true, message: 'Todos los datos se han sincronizado con Supabase.' };
    } catch (err: any) {
      console.warn('[Supabase Seed Relational Warning]:', err?.message || String(err));
      let errMsg = err?.message || 'Error durante la sincronización a Supabase.';
      this.status.errorMsg = errMsg;
      this.notify();
      return { success: false, message: errMsg };
    }
  }

  public async fetchNotebookFromSupabase(
    profesorId: string = 'docente_borborigmo_gmail_com'
  ): Promise<any> {
    const client = getSupabaseClient();
    if (!client) return { grupos: [] };

    try {
      // 1. Consultar directamente las tablas relacionales de Supabase
      const { data: dbGrupos, error: gErr } = await (client.from('grupos') as any)
        .select('*');

      if (!gErr && Array.isArray(dbGrupos)) {
        const grupoIds = dbGrupos.map((g: any) => g.id);
        let dbAlumnos: any[] = [];
        let dbCalifs: any[] = [];

        if (grupoIds.length > 0) {
          const [aluRes, calRes] = await Promise.all([
            (client.from('alumnos') as any)
              .select('*')
              .in('grupo_id', grupoIds)
              .order('orden', { ascending: true }),
            (client.from('calificaciones') as any)
              .select('*')
              .in('grupo_id', grupoIds)
          ]);

          if (Array.isArray(aluRes.data)) {
            dbAlumnos = aluRes.data;
          }
          if (Array.isArray(calRes.data)) {
            dbCalifs = calRes.data;
          }
        }

        // Consultar copia en cuadernos_sync como plantilla complementaria
        let baseNotebook: any = null;
        try {
          const { data: syncData } = await (client.from('cuadernos_sync') as any)
            .select('data')
            .single();

          if (syncData && syncData.data) {
            baseNotebook = syncData.data;
          }
        } catch (e) {}

        // Si no existen grupos en Supabase
        if (dbGrupos.length === 0) {
          return {
            grupos: [],
            version: Date.now(),
            updatedAt: new Date().toISOString()
          };
        }

        // Reconstruir grupos sincronizados exactamente con la tabla relacional de alumnos y calificaciones de Supabase
        const reconstructedGrupos = dbGrupos.map((g: any) => {
          const baseG = (baseNotebook && Array.isArray(baseNotebook.grupos))
            ? JSON.parse(JSON.stringify(baseNotebook.grupos.find((bg: any) => bg.id === g.id) || {}))
            : {};

          const matchingAlumnos = dbAlumnos
            .filter((a: any) => a.grupo_id === g.id)
            .map((a: any) => ({
              id: a.id,
              nombre: a.nombre,
              orden: a.orden || 1
            }));

          // Reconciliar calificaciones de la tabla calificaciones de Supabase
          const groupCalifs = dbCalifs.filter((c: any) => c.grupo_id === g.id);
          if (groupCalifs.length > 0) {
            if (!baseG.evaluaciones) {
              baseG.evaluaciones = { eval1: { actividades: [], calificaciones: {} } };
            }
            // Insertar o actualizar notas desde la base de datos
            for (const c of groupCalifs) {
              let foundInEval = false;
              for (const evK of Object.keys(baseG.evaluaciones)) {
                const evObj = baseG.evaluaciones[evK];
                if (evObj && evObj.actividades && evObj.actividades.some((a: any) => a.id === c.actividad_id)) {
                  if (!evObj.calificaciones) evObj.calificaciones = {};
                  if (!evObj.calificaciones[c.actividad_id]) evObj.calificaciones[c.actividad_id] = {};
                  evObj.calificaciones[c.actividad_id][c.alumno_id] = c.nota;
                  foundInEval = true;
                  break;
                }
              }
              // Si la actividad no estaba en ninguna evaluacion registrada, poner en eval1 por defecto
              if (!foundInEval) {
                if (!baseG.evaluaciones.eval1) baseG.evaluaciones.eval1 = { actividades: [], calificaciones: {} };
                if (!baseG.evaluaciones.eval1.calificaciones) baseG.evaluaciones.eval1.calificaciones = {};
                if (!baseG.evaluaciones.eval1.calificaciones[c.actividad_id]) baseG.evaluaciones.eval1.calificaciones[c.actividad_id] = {};
                baseG.evaluaciones.eval1.calificaciones[c.actividad_id][c.alumno_id] = c.nota;
              }
            }
          }

          return {
            ...baseG,
            id: g.id,
            nombre: g.nombre,
            oculto: !!g.oculto,
            alumnos: matchingAlumnos
          };
        });

        return {
          ...(baseNotebook || {}),
          grupos: reconstructedGrupos,
          updatedAt: new Date().toISOString()
        };
      }

      // Fallback a cuadernos_sync si las tablas relacionales aún no han sido creadas
      const { data: syncDoc, error: syncErr } = await (client.from('cuadernos_sync') as any)
        .select('data, version, updated_at')
        .single();

      if (!syncErr && syncDoc && syncDoc.data) {
        return syncDoc.data;
      }

      return { grupos: [] };
    } catch (err) {
      console.warn('[Supabase Fetch Warning]:', err instanceof Error ? err.message : String(err));
      return { grupos: [] };
    }
  }
}

export const supabaseSync = new SupabaseSyncManager();

if (typeof window !== 'undefined') {
  (window as any).supabaseSync = supabaseSync;
}
