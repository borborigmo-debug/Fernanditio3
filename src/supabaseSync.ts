import { getSupabaseClient, setSupabaseKey, SUPABASE_URL } from './supabase';

export interface SupabaseSyncStatus {
  connected: boolean;
  hasKey: boolean;
  projectUrl: string;
  lastSyncedAt?: string;
  errorMsg?: string;
  activeTeacherId?: string;
}

class SupabaseSyncManager {
  private listeners: ((status: SupabaseSyncStatus) => void)[] = [];
  private pendingLoadPromise: Map<string, Promise<any>> = new Map();
  private queue: Promise<any> = Promise.resolve();
  private loadedTeachers = new Set<string>();
  private mutationCounter = 0;

  public isSyncing = false;
  public isLoading = false;

  public recordMutation(): void {
    this.mutationCounter++;
  }

  public getMutationCount(): number {
    return this.mutationCounter;
  }

  public status: SupabaseSyncStatus = {
    connected: false,
    hasKey: false,
    projectUrl: SUPABASE_URL,
    activeTeacherId: undefined
  };

  public markTeacherLoaded(profesorId?: string) {
    const tid = profesorId || this.status.activeTeacherId;
    if (tid) this.loadedTeachers.add(tid);
  }

  public isTeacherLoaded(profesorId?: string): boolean {
    const tid = profesorId || this.status.activeTeacherId;
    return tid ? this.loadedTeachers.has(tid) : false;
  }

  public isBusy(): boolean {
    return this.isSyncing || this.isLoading;
  }

  private enqueue<T>(task: () => Promise<T>): Promise<T> {
    const res = this.queue.then(
      () => task(),
      () => task()
    );
    this.queue = res.catch(() => {});
    return res;
  }

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
      const { error } = await (client.from('grupos') as any).select('id').limit(1);
      if (error && error.code !== 'PGRST116') {
        console.warn('[Supabase Connection Notice]:', error.message);
        this.status = {
          connected: false,
          hasKey: true,
          projectUrl: SUPABASE_URL,
          errorMsg: error.message
        };
        this.notify();
        return false;
      }

      this.status = {
        connected: true,
        hasKey: true,
        projectUrl: SUPABASE_URL,
        lastSyncedAt: this.status.lastSyncedAt || new Date().toLocaleTimeString(),
        errorMsg: undefined,
        activeTeacherId: this.status.activeTeacherId
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

  private async _ensureTeacherId(providedId?: string): Promise<string> {
    if (providedId && providedId !== 'docente_anonimo' && providedId.startsWith('docente_')) {
      this.status.activeTeacherId = providedId;
      return providedId;
    }
    if (this.status.activeTeacherId && this.status.activeTeacherId.startsWith('docente_')) {
      return this.status.activeTeacherId;
    }
    return await this._resolveTeacherIdDirect();
  }

  /**
   * Resuelve el identificador del profesor autenticado en la tabla 'profesores'.
   * Garantiza un único origen de verdad y estabilidad durante toda la sesión.
   */
  private async _resolveTeacherIdDirect(user?: { uid?: string; email?: string | null; displayName?: string | null }): Promise<string> {
    const client = getSupabaseClient();
    if (!client) throw new Error('Cliente Supabase no inicializado');

    let currentUser = user;
    if (!currentUser || (!currentUser.uid && !currentUser.email)) {
      if (typeof window !== 'undefined' && (window as any).firebaseSync && (window as any).firebaseSync.status?.user) {
        currentUser = (window as any).firebaseSync.status.user;
      }
    }

    if (!currentUser || (!currentUser.uid && !currentUser.email)) {
      if (typeof window !== 'undefined' && (window as any).firebaseAuthCurrentUserUid) {
        const uid = (window as any).firebaseAuthCurrentUserUid;
        if (this.status.activeTeacherId && this.status.activeTeacherId.startsWith('docente_')) {
          return this.status.activeTeacherId;
        }
        this.status.activeTeacherId = uid;
        return uid;
      }
      if (this.status.activeTeacherId) {
        return this.status.activeTeacherId;
      }
      throw new Error('Usuario no autenticado en Supabase/Firebase');
    }

    const emailCandidate = currentUser.email ? `docente_${currentUser.email.replace(/[^a-zA-Z0-9]/g, '_')}` : '';
    const candidateId = emailCandidate || currentUser.uid || '';
    if (!candidateId) throw new Error('No se pudo determinar el ID del docente autenticado.');

    // 1. Buscar por id docente histórico basado en email
    if (emailCandidate) {
      const { data: existingByDocenteId } = await (client.from('profesores') as any).select('id').eq('id', emailCandidate).maybeSingle();
      if (existingByDocenteId && (existingByDocenteId as any).id) {
        this.status.activeTeacherId = (existingByDocenteId as any).id;
        return (existingByDocenteId as any).id;
      }
    }

    // 2. Si no se encontró por ID directo pero hay email, buscar por email en la tabla 'profesores'
    if (currentUser.email) {
      const { data: existingByEmail } = await (client.from('profesores') as any).select('id').eq('email', currentUser.email).maybeSingle();
      if (existingByEmail && (existingByEmail as any).id) {
        this.status.activeTeacherId = (existingByEmail as any).id;
        return (existingByEmail as any).id;
      }
    }

    // 3. Buscar por uid directo si existiera
    if (currentUser.uid) {
      const { data: existingById } = await (client.from('profesores') as any).select('id').eq('id', currentUser.uid).maybeSingle();
      if (existingById && (existingById as any).id) {
        this.status.activeTeacherId = (existingById as any).id;
        return (existingById as any).id;
      }
    }

    // 4. Si no existe en la tabla, usar candidateId
    this.status.activeTeacherId = candidateId;
    return candidateId;
  }

  public async resolveTeacherId(user?: { uid?: string; email?: string | null; displayName?: string | null }): Promise<string> {
    return this.enqueue(async () => {
      return await this._resolveTeacherIdDirect(user);
    });
  }

  /**
   * Carga canónica y exclusiva de datos desde las tablas relacionales de Supabase.
   * Utiliza exclusión mutua y caché de Promesas para evitar carreras de lectura/escritura.
   */
  public async loadNotebook(profesorId: string, forceOverride = false): Promise<any> {
    const startMutationCount = this.mutationCounter;
    const activeProfesorId = await this._ensureTeacherId(profesorId);
    if (this.pendingLoadPromise.has(activeProfesorId)) {
      return await this.pendingLoadPromise.get(activeProfesorId);
    }

    const loadTask = this.enqueue(async () => {
      this.isLoading = true;
      try {
        const client = getSupabaseClient();
        if (!client) throw new Error('No hay conexión con Supabase.');

        // 1. Consultar grupos del profesor exclusivamente
        const { data: dbGrupos, error: errGrupos } = await (client.from('grupos') as any)
          .select('*')
          .eq('profesor_id', activeProfesorId)
          .order('nombre', { ascending: true });

        if (errGrupos) {
          throw new Error(`Error al consultar grupos en Supabase: ${errGrupos.message}`);
        }

        if (!forceOverride && this.mutationCounter > startMutationCount) {
          console.warn('[SupabaseSyncManager] Notice: Carga remota ignorada porque se produjeron modificaciones locales posteriores.');
          return null;
        }

        this.loadedTeachers.add(activeProfesorId);

        if (!dbGrupos || dbGrupos.length === 0) {
          this.status.lastSyncedAt = new Date().toLocaleTimeString();
          this.notify();
          return {
            grupos: [],
            premios: [],
            plantillasRubricas: [],
            version: 1,
            updatedAt: new Date().toISOString()
          };
        }

        const groupIds = (dbGrupos as any[]).map((g: any) => g.id);

        // 2. Consultar entidades relacionadas exclusivamente para los grupos de este profesor
        const [alumnosRes, seccionesRes, rubricasRes, actividadesRes, calificacionesRes, diarioRes, criteriosRes, backupRes] = await Promise.all([
          (client.from('alumnos') as any).select('*').in('grupo_id', groupIds).order('orden', { ascending: true }),
          (client.from('secciones') as any).select('*').in('grupo_id', groupIds),
          (client.from('rubricas') as any).select('*').in('grupo_id', groupIds),
          (client.from('actividades') as any).select('*').in('grupo_id', groupIds),
          (client.from('calificaciones') as any).select('*').in('grupo_id', groupIds),
          (client.from('diario_clase') as any).select('*').in('grupo_id', groupIds).order('fecha', { ascending: false }),
          (client.from('criterios') as any).select('*').in('grupo_id', groupIds),
          (client.from('cuadernos_sync') as any).select('data').eq('profesor_id', activeProfesorId).maybeSingle()
        ]);

      if (alumnosRes.error) throw new Error(`Error al leer alumnos: ${alumnosRes.error.message}`);
      if (seccionesRes.error) throw new Error(`Error al leer secciones: ${seccionesRes.error.message}`);
      if (rubricasRes.error) throw new Error(`Error al leer rúbricas: ${rubricasRes.error.message}`);
      if (actividadesRes.error) throw new Error(`Error al leer actividades: ${actividadesRes.error.message}`);
      if (calificacionesRes.error) throw new Error(`Error al leer calificaciones: ${calificacionesRes.error.message}`);
      if (diarioRes.error) throw new Error(`Error al leer diario de clase: ${diarioRes.error.message}`);

      const dbAlumnos: any[] = alumnosRes.data || [];
      const dbSecciones: any[] = seccionesRes.data || [];
      const dbRubricas: any[] = rubricasRes.data || [];
      const dbActividades: any[] = actividadesRes.data || [];
      const dbCalificaciones: any[] = calificacionesRes.data || [];
      const dbDiario: any[] = diarioRes.data || [];
      const dbCriterios: any[] = criteriosRes.data || [];

      const backupData = (backupRes && backupRes.data && (backupRes.data as any).data) ? (backupRes.data as any).data : null;
      const backupGroupsMap = new Map<string, any>();
      if (backupData && Array.isArray(backupData.grupos)) {
        backupData.grupos.forEach((bg: any) => {
          if (bg && bg.id) backupGroupsMap.set(bg.id, bg);
        });
      }

      const notebookGrupos: any[] = [];

      for (const g of (dbGrupos as any[])) {
        const gId = g.id;
        const meta = backupGroupsMap.get(gId) || {};

        const groupAlumnos = dbAlumnos
          .filter((a: any) => a.grupo_id === gId)
          .map((a: any, idx: number) => ({
            id: a.id,
            nombre: a.nombre,
            orden: Number(a.orden) || (idx + 1)
          }));

        const metaSecs = Array.isArray(meta.secciones) ? meta.secciones : [];
        const groupSecciones = dbSecciones
          .filter((s: any) => s.grupo_id === gId)
          .map((s: any) => {
            const metaSec = metaSecs.find((ms: any) => ms && ms.id === s.id);
            return {
              id: s.id,
              nombre: s.nombre,
              color: s.color || '#2563eb',
              ponderacion: Number(s.ponderacion) || 0,
              oculto: !!s.oculto,
              criterios: Array.isArray(s.criterios) ? s.criterios : (metaSec && Array.isArray(metaSec.criterios) ? metaSec.criterios : [])
            };
          });

        const groupRubricas = dbRubricas
          .filter((r: any) => r.grupo_id === gId)
          .map((r: any) => ({
            id: r.id,
            titulo: r.titulo,
            tipo: r.tipo || 'Actividad',
            descripcion: r.descripcion || '',
            fechaCreacion: r.fecha_creacion || new Date().toISOString().slice(0, 10),
            origenGrupoId: gId,
            esCompartida: true,
            items: Array.isArray(r.items) ? r.items : []
          }));

        const groupActividades = dbActividades.filter((a: any) => a.grupo_id === gId);
        const groupCalificaciones = dbCalificaciones.filter((c: any) => c.grupo_id === gId);

        const groupRelCriterios = dbCriterios
          .filter((c: any) => c.grupo_id === gId)
          .map((c: any) => ({
            codigo: c.codigo,
            descripcion: c.descripcion || '',
            ponderacion: Number(c.ponderacion) || 0
          }));

        const groupCriterios = groupRelCriterios.length > 0 ? groupRelCriterios : (Array.isArray(meta.criterios) ? meta.criterios : []);

        const evaluaciones: Record<string, any> = {
          eval1: { actividades: [], calificaciones: {}, calificacionesRubricas: {} },
          eval2: { actividades: [], calificaciones: {}, calificacionesRubricas: {} },
          eval3: { actividades: [], calificaciones: {}, calificacionesRubricas: {} },
          final: { actividades: [], calificaciones: {}, calificacionesRubricas: {} }
        };

        if (meta.evaluaciones && typeof meta.evaluaciones === 'object') {
          for (const evKey of ['eval1', 'eval2', 'eval3', 'final']) {
            if (meta.evaluaciones[evKey] && meta.evaluaciones[evKey].calificacionesRubricas) {
              evaluaciones[evKey].calificacionesRubricas = meta.evaluaciones[evKey].calificacionesRubricas;
            }
          }
        }

        for (const act of groupActividades) {
          const evPeriod = (act.evaluacion_periodo && evaluaciones[act.evaluacion_periodo])
            ? act.evaluacion_periodo
            : 'eval1';
          
          evaluaciones[evPeriod].actividades.push({
            id: act.id,
            nombre: act.nombre || 'Actividad',
            tipo: act.tipo || 'Actividad',
            seccionId: act.seccion_id || null,
            metodo: act.metodo || 'rubrica',
            rubricaId: act.rubrica_id || null,
            fechaCreacion: act.fecha_creacion || new Date().toISOString().slice(0, 10),
            criterios: []
          });
        }

        for (const cal of groupCalificaciones) {
          const actId = cal.actividad_id;
          const aluId = cal.alumno_id;
          const nota = Number(cal.nota);

          const targetAct = groupActividades.find((a: any) => a.id === actId);
          const evPeriod = targetAct && targetAct.evaluacion_periodo && evaluaciones[targetAct.evaluacion_periodo]
            ? targetAct.evaluacion_periodo
            : 'eval1';

          if (!evaluaciones[evPeriod].calificaciones[actId]) {
            evaluaciones[evPeriod].calificaciones[actId] = {};
          }
          evaluaciones[evPeriod].calificaciones[actId][aluId] = nota;
        }

        const groupDiario = dbDiario
          .filter((d: any) => d.grupo_id === gId)
          .map((d: any) => ({
            id: d.id,
            fecha: d.fecha,
            descripcion: d.descripcion || ''
          }));

        notebookGrupos.push({
          id: gId,
          nombre: g.nombre,
          oculto: !!g.oculto,
          alumnos: groupAlumnos,
          secciones: groupSecciones,
          rubricas: groupRubricas,
          evaluaciones,
          diarioClase: groupDiario,
          criterios: groupCriterios,
          incidencias: Array.isArray(meta.incidencias) ? meta.incidencias : [],
          incidenciasConfig: meta.incidenciasConfig || { vencimiento: '30d' },
          periodosEvaluacion: meta.periodosEvaluacion || undefined,
          linkedGroupIds: Array.isArray(meta.linkedGroupIds) ? meta.linkedGroupIds : []
        });
      }

      if (!forceOverride && this.mutationCounter > startMutationCount) {
        console.warn('[SupabaseSyncManager] Notice: Carga remota ignorada porque se produjeron modificaciones locales posteriores por el usuario.');
        return null;
      }

      this.status.lastSyncedAt = new Date().toLocaleTimeString();
      this.status.connected = true;
      this.status.errorMsg = undefined;
      this.notify();

      return {
        grupos: notebookGrupos,
        premios: (backupData && Array.isArray(backupData.premios)) ? backupData.premios : [],
        plantillasRubricas: (backupData && Array.isArray(backupData.plantillasRubricas)) ? backupData.plantillasRubricas : [],
        grupoActivoId: notebookGrupos[0]?.id || null,
        version: (backupData && backupData.version) ? backupData.version : 1,
        updatedAt: new Date().toISOString()
      };
      } finally {
        this.isLoading = false;
      }
    });

    this.pendingLoadPromise.set(activeProfesorId, loadTask);
    try {
      const res = await loadTask;
      return res;
    } finally {
      this.pendingLoadPromise.delete(activeProfesorId);
    }
  }

  // ==========================================
  // HELPER MÉTODOS DE ESCRITURA DIRECTA
  // ==========================================

  private async _deleteGroupDirect(client: any, groupId: string): Promise<void> {
    await (client.from('calificaciones') as any).delete().eq('grupo_id', groupId);
    await (client.from('actividades') as any).delete().eq('grupo_id', groupId);
    await (client.from('alumnos') as any).delete().eq('grupo_id', groupId);
    await (client.from('secciones') as any).delete().eq('grupo_id', groupId);
    await (client.from('rubricas') as any).delete().eq('grupo_id', groupId);
    await (client.from('diario_clase') as any).delete().eq('grupo_id', groupId);

    const { error } = await (client.from('grupos') as any).delete().eq('id', groupId);
    if (error) throw new Error(`Error al eliminar grupo en Supabase: ${error.message}`);
  }

  private async _deleteStudentDirect(client: any, studentId: string): Promise<void> {
    await (client.from('calificaciones') as any).delete().eq('alumno_id', studentId);
    const { error } = await (client.from('alumnos') as any).delete().eq('id', studentId);
    if (error) throw new Error(`Error al eliminar alumno en Supabase: ${error.message}`);
  }

  private async _deleteSectionDirect(client: any, sectionId: string): Promise<void> {
    const { error } = await (client.from('secciones') as any).delete().eq('id', sectionId);
    if (error) throw new Error(`Error al eliminar sección en Supabase: ${error.message}`);
  }

  private async _deleteRubricDirect(client: any, rubricId: string): Promise<void> {
    const { error } = await (client.from('rubricas') as any).delete().eq('id', rubricId);
    if (error) throw new Error(`Error al eliminar rúbrica en Supabase: ${error.message}`);
  }

  private async _deleteActivityDirect(client: any, activityId: string): Promise<void> {
    await (client.from('calificaciones') as any).delete().eq('actividad_id', activityId);
    const { error } = await (client.from('actividades') as any).delete().eq('id', activityId);
    if (error) throw new Error(`Error al eliminar actividad en Supabase: ${error.message}`);
  }

  private async _deleteDiaryEntryDirect(client: any, entryId: string): Promise<void> {
    const { error } = await (client.from('diario_clase') as any).delete().eq('id', entryId);
    if (error) throw new Error(`Error al eliminar entrada de diario en Supabase: ${error.message}`);
  }

  private async _deleteCriterionDirect(client: any, groupId: string, codigo: string): Promise<void> {
    const { error } = await (client.from('criterios') as any).delete().eq('grupo_id', groupId).eq('codigo', codigo);
    if (error) {
      throw new Error(`Error al eliminar criterio en Supabase: ${error.message}`);
    }
  }

  private async _saveCriterionDirect(client: any, groupId: string, criterion: { codigo: string; descripcion: string; ponderacion?: number }): Promise<void> {
    const { error: delError } = await (client.from('criterios') as any).delete().eq('grupo_id', groupId).eq('codigo', criterion.codigo);
    if (delError) {
      throw new Error(`Error al eliminar criterio anterior en Supabase: ${delError.message}`);
    }

    const { error } = await (client.from('criterios') as any).insert({
      grupo_id: groupId,
      codigo: criterion.codigo,
      descripcion: criterion.descripcion || '',
      ponderacion: Number(criterion.ponderacion) || 0
    });

    if (error) {
      throw new Error(`Error al guardar criterio en Supabase: ${error.message}`);
    }
  }

  private async _saveMetadataDirect(client: any, profesorId: string, notebookData: any): Promise<void> {
    const { error } = await (client.from('cuadernos_sync') as any).upsert({
      profesor_id: profesorId,
      data: notebookData,
      version: notebookData.version || 1,
      updated_at: new Date().toISOString()
    });

    if (error) {
      throw new Error(`Error al guardar metadatos en Supabase: ${error.message}`);
    }
  }

  // ==========================================
  // OPERACIONES CRUD ATÓMICAS Y SERIALIZADAS
  // ==========================================

  public async saveGroup(arg1: any, arg2?: any): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');

      let group = arg1;
      let profesorId: string | undefined = undefined;
      if (typeof arg1 === 'string' && arg2) {
        profesorId = arg1;
        group = arg2;
      }

      const activeTeacherId = await this._ensureTeacherId(profesorId);

      const { error } = await (client.from('grupos') as any).upsert({
        id: group.id,
        profesor_id: activeTeacherId,
        nombre: group.nombre,
        oculto: !!group.oculto,
        updated_at: new Date().toISOString()
      });

      if (error) throw new Error(`Error al guardar grupo en Supabase: ${error.message}`);
    });
  }

  public async deleteGroup(groupId: string): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');
      await this._deleteGroupDirect(client, groupId);
    });
  }

  public async saveMetadata(profesorId: string, notebookData: any): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');
      const activeTeacherId = await this._ensureTeacherId(profesorId);
      await this._saveMetadataDirect(client, activeTeacherId, notebookData);
    });
  }

  public async saveStudent(groupId: string, student: { id: string; nombre: string; orden?: number }): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');

      const { error } = await (client.from('alumnos') as any).upsert({
        id: student.id,
        grupo_id: groupId,
        nombre: student.nombre.trim(),
        orden: Number(student.orden) || 1
      });

      if (error) throw new Error(`Error al guardar alumno en Supabase: ${error.message}`);
    });
  }

  public async deleteStudent(studentId: string): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');
      await this._deleteStudentDirect(client, studentId);
    });
  }

  public async saveSection(groupId: string, section: { id: string; nombre: string; color?: string; ponderacion?: number; oculto?: boolean; criterios?: any[] }): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');

      const { error } = await (client.from('secciones') as any).upsert({
        id: section.id,
        grupo_id: groupId,
        nombre: section.nombre,
        color: section.color || '#2563eb',
        ponderacion: Number(section.ponderacion) || 0,
        oculto: !!section.oculto
      });

      if (error) throw new Error(`Error al guardar sección en Supabase: ${error.message}`);
    });
  }

  public async deleteSection(sectionId: string): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');
      await this._deleteSectionDirect(client, sectionId);
    });
  }

  public async saveRubric(groupId: string, rubric: { id: string; titulo: string; tipo?: string; descripcion?: string; fechaCreacion?: string; items?: any[]; aspectos?: any[] }): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');

      const { error } = await (client.from('rubricas') as any).upsert({
        id: rubric.id,
        grupo_id: groupId,
        titulo: rubric.titulo,
        tipo: rubric.tipo || 'Actividad',
        descripcion: rubric.descripcion || '',
        fecha_creacion: rubric.fechaCreacion || new Date().toISOString().slice(0, 10),
        items: Array.isArray(rubric.items) ? rubric.items : (Array.isArray(rubric.aspectos) ? rubric.aspectos : [])
      });

      if (error) throw new Error(`Error al guardar rúbrica en Supabase: ${error.message}`);
    });
  }

  public async deleteRubric(rubricId: string): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');
      await this._deleteRubricDirect(client, rubricId);
    });
  }

  public async saveActivity(groupId: string, evalPeriod: string, activity: { id: string; nombre: string; tipo?: string; seccionId?: string | null; metodo?: string; rubricaId?: string | null; fechaCreacion?: string }): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');

      const { error } = await (client.from('actividades') as any).upsert({
        id: activity.id,
        grupo_id: groupId,
        evaluacion_periodo: evalPeriod,
        nombre: activity.nombre || 'Actividad',
        tipo: activity.tipo || 'Actividad',
        seccion_id: activity.seccionId || null,
        metodo: activity.metodo || 'rubrica',
        rubrica_id: activity.rubricaId || null,
        fecha_creacion: activity.fechaCreacion || new Date().toISOString().slice(0, 10)
      });

      if (error) throw new Error(`Error al guardar actividad en Supabase: ${error.message}`);
    });
  }

  public async deleteActivity(activityId: string): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');
      await this._deleteActivityDirect(client, activityId);
    });
  }

  public async saveGrade(
    groupId: string,
    studentId: string,
    activityId: string,
    grade: number | null | undefined
  ): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');

      if (grade == null || isNaN(Number(grade))) {
        await (client.from('calificaciones') as any).delete().eq('alumno_id', studentId).eq('actividad_id', activityId);
        return;
      }

      const { error } = await (client.from('calificaciones') as any).upsert({
        grupo_id: groupId,
        alumno_id: studentId,
        actividad_id: activityId,
        nota: Number(grade),
        updated_at: new Date().toISOString()
      }, { onConflict: 'alumno_id,actividad_id' });

      if (error) throw new Error(`Error al guardar calificación en Supabase: ${error.message}`);
    });
  }

  public async saveCriterion(groupId: string, criterion: { codigo: string; descripcion: string; ponderacion?: number }): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');
      await this._saveCriterionDirect(client, groupId, criterion);
    });
  }

  public async deleteCriterion(groupId: string, codigo: string): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');
      await this._deleteCriterionDirect(client, groupId, codigo);
    });
  }

  public async saveRubricEvaluation(groupId: string, evalKey: string, rubricId: string, studentId: string, itemScores: Record<string, any>, fullNotebookData: any): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');

      const profesorId = await this._ensureTeacherId();
      await this._saveMetadataDirect(client, profesorId, fullNotebookData);
    });
  }

  public async saveDiaryEntry(groupId: string, entry: { id: string; fecha: string; descripcion: string }): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');

      const { error } = await (client.from('diario_clase') as any).upsert({
        id: entry.id,
        grupo_id: groupId,
        fecha: entry.fecha || new Date().toISOString().slice(0, 10),
        descripcion: entry.descripcion || ''
      });

      if (error) throw new Error(`Error al guardar entrada de diario en Supabase: ${error.message}`);
    });
  }

  public async deleteDiaryEntry(entryId: string): Promise<void> {
    this.recordMutation();
    return this.enqueue(async () => {
      const client = getSupabaseClient();
      if (!client) throw new Error('Cliente Supabase no disponible');
      await this._deleteDiaryEntryDirect(client, entryId);
    });
  }

  public async syncNotebookToSupabase(profesorId: string, notebookData: any): Promise<boolean> {
    this.recordMutation();
    return this.enqueue(async () => {
      this.isSyncing = true;
      try {
        const client = getSupabaseClient();
        if (!client) throw new Error('Cliente Supabase no disponible');

        const activeProfesorId = await this._ensureTeacherId(profesorId);

        if (!notebookData || !Array.isArray(notebookData.grupos)) return false;

        const isInitialized =
          notebookData?.isInitialized === true ||
          notebookData?.isLoaded === true ||
          this.loadedTeachers.has(activeProfesorId);

        if (notebookData.grupos.length === 0 && !isInitialized) {
          console.warn('[Supabase Sync Guard] Sincronización abortada: el cuaderno local está vacío y no ha sido inicializado/cargado formalmente.');
          return false;
        }

        if (notebookData.grupos.length > 0) {
          this.loadedTeachers.add(activeProfesorId);
        }

        // 1. Guardar copia consolidada en cuadernos_sync
        await this._saveMetadataDirect(client, activeProfesorId, notebookData);

        // 2. RECONCILIACIÓN DE GRUPOS DEL PROFESOR:
        // Solo reconciliar grupos si el estado local está formalmente cargado/inicializado o contiene grupos.
        const { data: currentDbGroups, error: errGroups } = await (client.from('grupos') as any)
          .select('id')
          .eq('profesor_id', activeProfesorId);

        if (errGroups) {
          throw new Error(`Error al leer grupos de Supabase durante reconciliación: ${errGroups.message}`);
        }

        const localGroupIds = new Set(notebookData.grupos.map((g: any) => g.id));
        const dbGroupIds = (currentDbGroups || []).map((g: any) => g.id);

        for (const dbGId of dbGroupIds) {
          if (!localGroupIds.has(dbGId)) {
            await this._deleteGroupDirect(client, dbGId);
          }
        }

        // 3. RECONCILIACIÓN DE SUB-ENTIDADES POR CADA GRUPO LOCAL
        for (const g of notebookData.grupos) {
          const gId = g.id;

          await (client.from('grupos') as any).upsert({
            id: gId,
            profesor_id: activeProfesorId,
            nombre: g.nombre,
            oculto: !!g.oculto,
            updated_at: new Date().toISOString()
          });

          // --- ALUMNOS ---
          const localStudents = Array.isArray(g.alumnos) ? g.alumnos : [];
          const localStudentIds = new Set(localStudents.map((a: any) => a.id));

          const { data: dbAlumnos, error: errAlumnos } = await (client.from('alumnos') as any).select('id').eq('grupo_id', gId);
          if (errAlumnos) {
            throw new Error(`Error al leer alumnos de Supabase para reconciliación (grupo ${gId}): ${errAlumnos.message}`);
          }
          if (dbAlumnos && dbAlumnos.length > 0) {
            for (const dba of dbAlumnos) {
              if (!localStudentIds.has(dba.id)) {
                await this._deleteStudentDirect(client, dba.id);
              }
            }
          }

          if (localStudents.length > 0) {
            const aluPayload = localStudents.map((a: any, idx: number) => ({
              id: a.id,
              grupo_id: gId,
              nombre: String(a.nombre).trim(),
              orden: Number(a.orden) || (idx + 1)
            }));
            await (client.from('alumnos') as any).upsert(aluPayload);
          }

          // --- SECCIONES ---
          const localSections = Array.isArray(g.secciones) ? g.secciones : [];
          const localSectionIds = new Set(localSections.map((s: any) => s.id));

          const { data: dbSecciones, error: errSecciones } = await (client.from('secciones') as any).select('id').eq('grupo_id', gId);
          if (errSecciones) {
            throw new Error(`Error al leer secciones de Supabase para reconciliación (grupo ${gId}): ${errSecciones.message}`);
          }
          if (dbSecciones && dbSecciones.length > 0) {
            for (const dbs of dbSecciones) {
              if (!localSectionIds.has(dbs.id)) {
                await this._deleteSectionDirect(client, dbs.id);
              }
            }
          }

          if (localSections.length > 0) {
            const secPayload = localSections.map((s: any) => ({
              id: s.id,
              grupo_id: gId,
              nombre: s.nombre,
              color: s.color || '#2563eb',
              ponderacion: Number(s.ponderacion) || 0,
              oculto: !!s.oculto
            }));
            await (client.from('secciones') as any).upsert(secPayload);
          }

          // --- RÚBRICAS ---
          const localRubrics = Array.isArray(g.rubricas) ? g.rubricas : [];
          const localRubricIds = new Set(localRubrics.map((r: any) => r.id));

          const { data: dbRubricas, error: errRubricas } = await (client.from('rubricas') as any).select('id').eq('grupo_id', gId);
          if (errRubricas) {
            throw new Error(`Error al leer rúbricas de Supabase para reconciliación (grupo ${gId}): ${errRubricas.message}`);
          }
          if (dbRubricas && dbRubricas.length > 0) {
            for (const dbr of dbRubricas) {
              if (!localRubricIds.has(dbr.id)) {
                await this._deleteRubricDirect(client, dbr.id);
              }
            }
          }

          if (localRubrics.length > 0) {
            const rubPayload = localRubrics.map((r: any) => ({
              id: r.id,
              grupo_id: gId,
              titulo: r.titulo,
              tipo: r.tipo || 'Actividad',
              descripcion: r.descripcion || '',
              fecha_creacion: r.fechaCreacion || new Date().toISOString().slice(0, 10),
              items: Array.isArray(r.items) ? r.items : (Array.isArray(r.aspectos) ? r.aspectos : [])
            }));
            await (client.from('rubricas') as any).upsert(rubPayload);
          }

          // --- ACTIVIDADES Y CALIFICACIONES ---
          const localActivities: any[] = [];
          const localGrades: any[] = [];

          if (g.evaluaciones && typeof g.evaluaciones === 'object') {
            for (const evKey of Object.keys(g.evaluaciones)) {
              const ev = g.evaluaciones[evKey];
              if (!ev) continue;

              if (Array.isArray(ev.actividades)) {
                ev.actividades.forEach((act: any) => {
                  localActivities.push({
                    id: act.id,
                    grupo_id: gId,
                    evaluacion_periodo: evKey,
                    nombre: act.nombre || 'Actividad',
                    tipo: act.tipo || 'Actividad',
                    seccion_id: act.seccionId || null,
                    metodo: act.metodo || 'rubrica',
                    rubrica_id: act.rubricaId || null,
                    fecha_creacion: act.fechaCreacion || new Date().toISOString().slice(0, 10)
                  });
                });
              }

              if (ev.calificaciones && typeof ev.calificaciones === 'object') {
                for (const actId of Object.keys(ev.calificaciones)) {
                  const mapAlu = ev.calificaciones[actId] || {};
                  for (const aluId of Object.keys(mapAlu)) {
                    const nota = mapAlu[aluId];
                    if (nota != null && !isNaN(Number(nota))) {
                      localGrades.push({
                        grupo_id: gId,
                        alumno_id: aluId,
                        actividad_id: actId,
                        nota: Number(nota),
                        updated_at: new Date().toISOString()
                      });
                    }
                  }
                }
              }
            }
          }

          const localActivityIds = new Set(localActivities.map((a: any) => a.id));
          const { data: dbActividades, error: errActividades } = await (client.from('actividades') as any).select('id').eq('grupo_id', gId);
          if (errActividades) {
            throw new Error(`Error al leer actividades de Supabase para reconciliación (grupo ${gId}): ${errActividades.message}`);
          }
          if (dbActividades && dbActividades.length > 0) {
            for (const dba of dbActividades) {
              if (!localActivityIds.has(dba.id)) {
                await this._deleteActivityDirect(client, dba.id);
              }
            }
          }

          if (localActivities.length > 0) {
            await (client.from('actividades') as any).upsert(localActivities);
          }

          const localGradeKeys = new Set(localGrades.map((c: any) => `${c.alumno_id}_${c.actividad_id}`));
          const { data: dbCalificaciones, error: errCalificaciones } = await (client.from('calificaciones') as any).select('id, alumno_id, actividad_id').eq('grupo_id', gId);
          if (errCalificaciones) {
            throw new Error(`Error al leer calificaciones de Supabase para reconciliación (grupo ${gId}): ${errCalificaciones.message}`);
          }
          if (dbCalificaciones && dbCalificaciones.length > 0) {
            for (const dbc of dbCalificaciones) {
              const key = `${dbc.alumno_id}_${dbc.actividad_id}`;
              if (!localGradeKeys.has(key)) {
                await (client.from('calificaciones') as any).delete().eq('id', dbc.id);
              }
            }
          }

          if (localGrades.length > 0) {
            for (let i = 0; i < localGrades.length; i += 50) {
              const chunk = localGrades.slice(i, i + 50);
              await (client.from('calificaciones') as any).upsert(chunk, { onConflict: 'alumno_id,actividad_id' });
            }
          }

          // --- DIARIO DE CLASE ---
          const localDiario = Array.isArray(g.diarioClase) ? g.diarioClase : [];
          const localDiarioIds = new Set(localDiario.map((d: any) => d.id));

          const { data: dbDiario, error: errDiario } = await (client.from('diario_clase') as any).select('id').eq('grupo_id', gId);
          if (errDiario) {
            throw new Error(`Error al leer diario de clase de Supabase para reconciliación (grupo ${gId}): ${errDiario.message}`);
          }
          if (dbDiario && dbDiario.length > 0) {
            for (const dbd of dbDiario) {
              if (!localDiarioIds.has(dbd.id)) {
                await this._deleteDiaryEntryDirect(client, dbd.id);
              }
            }
          }

          if (localDiario.length > 0) {
            const diarioPayload = localDiario.map((d: any) => ({
              id: d.id,
              grupo_id: gId,
              fecha: d.fecha || new Date().toISOString().slice(0, 10),
              descripcion: d.descripcion || ''
            }));
            await (client.from('diario_clase') as any).upsert(diarioPayload);
          }

          // --- CRITERIOS LOMLOE ---
          const localCriterios = Array.isArray(g.criterios) ? g.criterios : [];
          const localCriterioCodes = new Set(localCriterios.map((c: any) => c.codigo));

          const { data: dbCriterios, error: errCriterios } = await (client.from('criterios') as any).select('codigo').eq('grupo_id', gId);
          if (errCriterios) {
            throw new Error(`Error al leer criterios LOMLOE de Supabase para reconciliación (grupo ${gId}): ${errCriterios.message}`);
          }
          if (dbCriterios && dbCriterios.length > 0) {
            for (const dbc of dbCriterios) {
              if (!localCriterioCodes.has(dbc.codigo)) {
                await this._deleteCriterionDirect(client, gId, dbc.codigo);
              }
            }
          }

          for (const crit of localCriterios) {
            await this._saveCriterionDirect(client, gId, crit);
          }
        }

        this.status.lastSyncedAt = new Date().toLocaleTimeString();
        this.status.connected = true;
        this.status.errorMsg = undefined;
        this.notify();
        return true;
      } catch (err: any) {
        console.error('[Supabase Sync Error]:', err);
        this.status.errorMsg = err.message || 'Error al sincronizar con Supabase';
        this.notify();
        return false;
      } finally {
        this.isSyncing = false;
      }
    });
  }

  public async fetchNotebookFromSupabase(profesorId: string): Promise<any> {
    return await this.loadNotebook(profesorId);
  }
}

export const supabaseSync = new SupabaseSyncManager();
