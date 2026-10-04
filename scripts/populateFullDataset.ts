import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://bdtkdyzmpbijvwwsbxpa.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdGtkeXptcGJpanZ3d3NieHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMjY1NDksImV4cCI6MjEwNjYwMjU0OX0.qIpWI_Nw5Lya1IU6F09IYDUvjiR6-68_uHvp0ZcPU9E';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const SECCIONES = [
  { id: "sec-1", nombre: "Exámenes y Pruebas escritas", color: "#e11d48", ponderacion: 40 },
  { id: "sec-2", nombre: "Actividades y Trabajo diario", color: "#2563eb", ponderacion: 20 },
  { id: "sec-3", nombre: "Proyectos y Rúbricas", color: "#7c3aed", ponderacion: 20 },
  { id: "sec-4", nombre: "Lectura y Expresión oral", color: "#059669", ponderacion: 10 },
  { id: "sec-5", nombre: "Ortografía y Presentación", color: "#ea580c", ponderacion: 10 }
];

const CRITERIOS = [
  { codigo: "1.1", descripcion: "Diversidad lingüística y dialectal", ponderacion: 5 },
  { codigo: "1.2", descripcion: "Prejuicios y estereotipos lingüísticos", ponderacion: 5 },
  { codigo: "2.1", descripcion: "Comprensión de textos orales", ponderacion: 10 },
  { codigo: "3.1", descripcion: "Producción e interacción oral", ponderacion: 10 },
  { codigo: "4.1", descripcion: "Comprensión de textos escritos", ponderacion: 15 },
  { codigo: "5.1", descripcion: "Planificación y redacción escrita", ponderacion: 15 },
  { codigo: "5.2", descripcion: "Normas ortográficas y gramaticales", ponderacion: 10 },
  { codigo: "6.1", descripcion: "Búsqueda y tratamiento de información", ponderacion: 10 },
  { codigo: "7.1", descripcion: "Itinerario lector y lectura autónoma", ponderacion: 10 },
  { codigo: "8.1", descripcion: "Análisis e interpretación de obras literarias", ponderacion: 10 }
];

const RUBRICAS = [
  {
    id: "rub-ex-1",
    titulo: "Examen 1º Trimestre: Sintaxis y Ortografía",
    tipo: "examen",
    descripcion: "Prueba escrita objetiva de análisis sintáctico, léxico y reglas ortográficas",
    fechaCreacion: "2025-10-15",
    items: [
      { order: 1, numActividad: "1", title: "Análisis sintáctico de oraciones compuestas", criterio: "5.1; 5.2", maxScore: 3.5 },
      { order: 2, numActividad: "2", title: "Identificación de categorías gramaticales", criterio: "9.1", maxScore: 2.5 },
      { order: 3, numActividad: "3", title: "Dictado y aplicación de reglas de acentuación", criterio: "5.2", maxScore: 2.0 },
      { order: 4, numActividad: "4", title: "Comprensión lectora y resumen", criterio: "4.1", maxScore: 2.0 }
    ]
  },
  {
    id: "rub-proj-1",
    titulo: "Proyecto de Exposición Oral y Lectura",
    tipo: "trabajos",
    descripcion: "Presentación en grupo sobre una obra del itinerario lector",
    fechaCreacion: "2025-11-10",
    items: [
      { order: 1, numActividad: "1", title: "Claridad y fluidez de la exposición oral", criterio: "3.1", maxScore: 3.0 },
      { order: 2, numActividad: "2", title: "Rigor en el análisis literario de la obra", criterio: "7.1; 8.1", maxScore: 4.0 },
      { order: 3, numActividad: "3", title: "Uso de soporte multimodal y presentación", criterio: "6.1", maxScore: 3.0 }
    ]
  }
];

const ACTIVIDADES = [
  { id: "act-1", nombre: "Examen 1º Trimestre: Sintaxis", tipo: "Examen", seccionId: "sec-1", metodo: "rubrica", rubricaId: "rub-ex-1", fechaCreacion: "2025-10-15" },
  { id: "act-2", nombre: "Control de Lectura y Comprensión", tipo: "Actividad", seccionId: "sec-4", metodo: "directa", rubricaId: null, fechaCreacion: "2025-10-28" },
  { id: "act-3", nombre: "Proyecto Exposición Oral Literaria", tipo: "Proyecto", seccionId: "sec-3", metodo: "rubrica", rubricaId: "rub-proj-1", fechaCreacion: "2025-11-10" },
  { id: "act-4", nombre: "Prueba de Ortografía y Acentuación", tipo: "Examen", seccionId: "sec-5", metodo: "directa", rubricaId: null, fechaCreacion: "2025-11-25" }
];

const GRUPOS = [
  {
    id: "grupo-1789659508269",
    nombre: "2ºESO C",
    oculto: false,
    alumnos: [
      { id: "alu-2eso-1", nombre: "CAMARA, NAYE", orden: 1 },
      { id: "alu-2eso-2", nombre: "CASTAÑO, NOELIA", orden: 2 },
      { id: "alu-2eso-3", nombre: "DE MIGUEL, ARIADNA", orden: 3 },
      { id: "alu-2eso-4", nombre: "ESTIRADO, DAVID", orden: 4 },
      { id: "alu-2eso-5", nombre: "FERNANDES, JHADE", orden: 5 },
      { id: "alu-2eso-6", nombre: "GARCÍA, DANIELA", orden: 6 },
      { id: "alu-2eso-7", nombre: "GARCILLÁN, MARIO", orden: 7 },
      { id: "alu-2eso-8", nombre: "GONZÁLEZ, VERA", orden: 8 },
      { id: "alu-2eso-9", nombre: "HERRANZ, PABLO", orden: 9 },
      { id: "alu-2eso-10", nombre: "JIMENEZ, NAYMA", orden: 10 },
      { id: "alu-2eso-11", nombre: "LEÓN, VALENTINA", orden: 11 },
      { id: "alu-2eso-12", nombre: "LODEIRO, JAVIER", orden: 12 },
      { id: "alu-2eso-13", nombre: "MAAI, HANA", orden: 13 },
      { id: "alu-2eso-14", nombre: "MARTÍN, CARLOS", orden: 14 },
      { id: "alu-2eso-15", nombre: "NAULA, LUCAS", orden: 15 },
      { id: "alu-2eso-16", nombre: "OLIVARES, JOSÉ JULIÁN", orden: 16 },
      { id: "alu-2eso-17", nombre: "PONCE, MÍA", orden: 17 },
      { id: "alu-2eso-18", nombre: "QUINTERO, JORGE", orden: 18 },
      { id: "alu-2eso-19", nombre: "RODRIGO, KEVIN", orden: 19 },
      { id: "alu-2eso-20", nombre: "SAID, YASMINE", orden: 20 },
      { id: "alu-2eso-21", nombre: "TEJERO, ÁNGEL", orden: 21 }
    ]
  },
  {
    id: "grupo-1789678716510",
    nombre: "3ºESO C",
    oculto: false,
    alumnos: [
      { id: "alu-3eso-c-1", nombre: "ALONSO, SOFÍA", orden: 1 },
      { id: "alu-3eso-c-2", nombre: "ÁLVAREZ, LUCAS", orden: 2 },
      { id: "alu-3eso-c-3", nombre: "BENÍTEZ, MATEO", orden: 3 },
      { id: "alu-3eso-c-4", nombre: "BLANCO, ELENA", orden: 4 },
      { id: "alu-3eso-c-5", nombre: "CANO, ADRIÁN", orden: 5 },
      { id: "alu-3eso-c-6", nombre: "CASTRO, VALERIA", orden: 6 },
      { id: "alu-3eso-c-7", nombre: "DELGADO, HUGO", orden: 7 },
      { id: "alu-3eso-c-8", nombre: "DÍAZ, MARTINA", orden: 8 },
      { id: "alu-3eso-c-9", nombre: "DOMÍNGUEZ, LEO", orden: 9 },
      { id: "alu-3eso-c-10", nombre: "ESPINOSA, SARA", orden: 10 },
      { id: "alu-3eso-c-11", nombre: "FERNÁNDEZ, DANIEL", orden: 11 },
      { id: "alu-3eso-c-12", nombre: "GARCÍA, ALBA", orden: 12 },
      { id: "alu-3eso-c-13", nombre: "GÓMEZ, ALEJANDRO", orden: 13 },
      { id: "alu-3eso-c-14", nombre: "GUTIÉRREZ, CARLA", orden: 14 },
      { id: "alu-3eso-c-15", nombre: "HERNÁNDEZ, PABLO", orden: 15 },
      { id: "alu-3eso-c-16", nombre: "IGLESIAS, LUCÍA", orden: 16 },
      { id: "alu-3eso-c-17", nombre: "LÓPEZ, MANUEL", orden: 17 },
      { id: "alu-3eso-c-18", nombre: "MARÍN, IRENE", orden: 18 },
      { id: "alu-3eso-c-19", nombre: "MARTÍN, ALVARO", orden: 19 },
      { id: "alu-3eso-c-20", nombre: "MARTÍNEZ, INÉS", orden: 20 },
      { id: "alu-3eso-c-21", nombre: "MEDINA, MARCOS", orden: 21 },
      { id: "alu-3eso-c-22", nombre: "MOLINA, CARMEN", orden: 22 },
      { id: "alu-3eso-c-23", nombre: "NAVARRO, DAVID", orden: 23 }
    ]
  },
  {
    id: "grupo-1789678758976",
    nombre: "3ºESO E",
    oculto: false,
    alumnos: [
      { id: "alu-3eso-e-1", nombre: "ORTEGA, DIEGO", orden: 1 },
      { id: "alu-3eso-e-2", nombre: "ORTIZ, CLARA", orden: 2 },
      { id: "alu-3eso-e-3", nombre: "PARRA, JAVIER", orden: 3 },
      { id: "alu-3eso-e-4", nombre: "PÉREZ, NOA", orden: 4 },
      { id: "alu-3eso-e-5", nombre: "RAMÍREZ, IVÁN", orden: 5 },
      { id: "alu-3eso-e-6", nombre: "RAMOS, LAURA", orden: 6 },
      { id: "alu-3eso-e-7", nombre: "REYES, MARIO", orden: 7 },
      { id: "alu-3eso-e-8", nombre: "RÍOS, ANA", orden: 8 },
      { id: "alu-3eso-e-9", nombre: "RODRÍGUEZ, GONZALO", orden: 9 },
      { id: "alu-3eso-e-10", nombre: "ROMERO, ALICIA", orden: 10 },
      { id: "alu-3eso-e-11", nombre: "RUBIO, NICOLÁS", orden: 11 },
      { id: "alu-3eso-e-12", nombre: "RUIZ, EVA", orden: 12 },
      { id: "alu-3eso-e-13", nombre: "SÁENZ, AITOR", orden: 13 },
      { id: "alu-3eso-e-14", nombre: "SÁNCHEZ, VEGA", orden: 14 },
      { id: "alu-3eso-e-15", nombre: "SANTOS, SERGIO", orden: 15 },
      { id: "alu-3eso-e-16", nombre: "SANZ, MARÍA", orden: 16 },
      { id: "alu-3eso-e-17", nombre: "SERRANO, JORGE", orden: 17 },
      { id: "alu-3eso-e-18", nombre: "SOLER, NEREA", orden: 18 },
      { id: "alu-3eso-e-19", nombre: "SOTO, RAÚL", orden: 19 },
      { id: "alu-3eso-e-20", nombre: "TORRES, ROCÍO", orden: 20 },
      { id: "alu-3eso-e-21", nombre: "VARGAS, SAMUEL", orden: 21 },
      { id: "alu-3eso-e-22", nombre: "VÁZQUEZ, LUNA", orden: 22 },
      { id: "alu-3eso-e-23", nombre: "VEGA, HÉCTOR", orden: 23 }
    ]
  },
  {
    id: "grupo-1789678795899",
    nombre: "Bach 2º",
    oculto: false,
    alumnos: [
      { id: "alu-bach2-1", nombre: "AGUILAR, RODRIGO", orden: 1 },
      { id: "alu-bach2-2", nombre: "CABALLERO, NEREA", orden: 2 },
      { id: "alu-bach2-3", nombre: "CAMPOS, ADRIÁN", orden: 3 },
      { id: "alu-bach2-4", nombre: "CARRASCO, DIANA", orden: 4 },
      { id: "alu-bach2-5", nombre: "CORTEZ, MARCOS", orden: 5 },
      { id: "alu-bach2-6", nombre: "FERRER, BEATRIZ", orden: 6 },
      { id: "alu-bach2-7", nombre: "FUENTES, DANIEL", orden: 7 },
      { id: "alu-bach2-8", nombre: "GIL, CELIA", orden: 8 },
      { id: "alu-bach2-9", nombre: "GIMÉNEZ, ÓSCAR", orden: 9 },
      { id: "alu-bach2-10", nombre: "HERRERO, MÓNICA", orden: 10 },
      { id: "alu-bach2-11", nombre: "LARA, GUILLEM", orden: 11 },
      { id: "alu-bach2-12", nombre: "LEÓN, PATRICIA", orden: 12 },
      { id: "alu-bach2-13", nombre: "MÉNDEZ, RUBÉN", orden: 13 },
      { id: "alu-bach2-14", nombre: "MONTERO, NATALIA", orden: 14 },
      { id: "alu-bach2-15", nombre: "MOYA, CRISTIAN", orden: 15 },
      { id: "alu-bach2-16", nombre: "NIETO, SILVIA", orden: 16 },
      { id: "alu-bach2-17", nombre: "PASTOR, VÍCTOR", orden: 17 },
      { id: "alu-bach2-18", nombre: "PRIETO, SANDRA", orden: 18 },
      { id: "alu-bach2-19", nombre: "SANTANA, JOEL", orden: 19 }
    ]
  }
];

// Generar calificaciones realistas por alumno para cada actividad (entre 5.5 y 10.0)
function generateCalificacionesForGroup(alumnos: any[]) {
  const califs: Record<string, Record<string, number>> = {};
  ACTIVIDADES.forEach((act) => {
    califs[act.id] = {};
    alumnos.forEach((alu, idx) => {
      // Nota determinista basada en el índice del alumno para ser consistente
      const baseScore = 6.0 + ((idx * 3.7 + act.nombre.length) % 4.1);
      const rounded = Math.min(10.0, Math.max(4.5, Math.round(baseScore * 10) / 10));
      califs[act.id][alu.id] = rounded;
    });
  });
  return califs;
}

const DIARIO_CLASE = [
  { id: "dia-1", fecha: "2025-10-02", descripcion: "Explicación de los sintagmas y la estructura de la oración simple. Tareas página 42." },
  { id: "dia-2", fecha: "2025-10-15", descripcion: "Realización del Examen del 1º Trimestre. Buena actitud general del grupo." },
  { id: "dia-3", fecha: "2025-11-10", descripcion: "Presentación de los proyectos de exposición oral. Gran nivel en el uso de apoyo multimodal." }
];

async function seedFullDatasetToSupabase() {
  console.log('=== POBLANDO DATOS COMPLETOS (EXÁMENES, ACTIVIDADES Y CALIFICACIONES) EN SUPABASE ===');

  const profesorId = 'docente_borborigmo_gmail_com';

  // 1. Profesor
  await (supabase.from('profesores') as any).upsert({
    id: profesorId,
    email: 'borborigmo@gmail.com',
    nombre: 'Profesor Fernanditio',
    updated_at: new Date().toISOString()
  });

  let totalAlumnos = 0;
  let totalActividades = 0;
  let totalCalificaciones = 0;

  const gruposDataForJson: any[] = [];

  for (const g of GRUPOS) {
    console.log(`\n▶ Procesando Grupo: ${g.nombre}...`);

    // Insertar Grupo
    await (supabase.from('grupos') as any).upsert({
      id: g.id,
      profesor_id: profesorId,
      nombre: g.nombre,
      oculto: g.oculto,
      updated_at: new Date().toISOString()
    });

    // Insertar Alumnos
    const alumnosPayload = g.alumnos.map((a) => ({
      id: a.id,
      grupo_id: g.id,
      nombre: a.nombre,
      orden: a.orden
    }));
    await (supabase.from('alumnos') as any).upsert(alumnosPayload);
    totalAlumnos += alumnosPayload.length;

    // Insertar Secciones
    const seccionesPayload = SECCIONES.map((s) => ({
      id: `${g.id}-${s.id}`,
      grupo_id: g.id,
      nombre: s.nombre,
      color: s.color,
      ponderacion: s.ponderacion,
      oculto: false
    }));
    await (supabase.from('secciones') as any).upsert(seccionesPayload);

    // Insertar Criterios
    const criteriosPayload = CRITERIOS.map((c) => ({
      grupo_id: g.id,
      codigo: c.codigo,
      descripcion: c.descripcion,
      ponderacion: c.ponderacion
    }));
    await (supabase.from('criterios') as any).upsert(criteriosPayload);

    // Insertar Rúbricas
    const rubricasPayload = RUBRICAS.map((r) => ({
      id: `${g.id}-${r.id}`,
      grupo_id: g.id,
      titulo: r.titulo,
      tipo: r.tipo,
      descripcion: r.descripcion,
      fecha_creacion: r.fechaCreacion,
      items: r.items
    }));
    await (supabase.from('rubricas') as any).upsert(rubricasPayload);

    // Insertar Actividades (Exámenes, Rúbricas, Tareas)
    const actividadesPayload = ACTIVIDADES.map((act) => ({
      id: `${g.id}-${act.id}`,
      grupo_id: g.id,
      evaluacion_periodo: "eval1",
      nombre: act.nombre,
      tipo: act.tipo,
      seccion_id: `${g.id}-${act.seccionId}`,
      metodo: act.metodo,
      rubrica_id: act.rubricaId ? `${g.id}-${act.rubricaId}` : null,
      fecha_creacion: act.fechaCreacion
    }));
    await (supabase.from('actividades') as any).upsert(actividadesPayload);
    totalActividades += actividadesPayload.length;

    // Insertar Calificaciones (Fila por fila)
    const califsMap = generateCalificacionesForGroup(g.alumnos);
    const califsPayload: any[] = [];

    for (const act of ACTIVIDADES) {
      const actFullId = `${g.id}-${act.id}`;
      for (const alu of g.alumnos) {
        const nota = califsMap[act.id][alu.id];
        califsPayload.push({
          grupo_id: g.id,
          alumno_id: alu.id,
          actividad_id: actFullId,
          nota: nota,
          updated_at: new Date().toISOString()
        });
      }
    }

    const { error: calErr } = await (supabase.from('calificaciones') as any).upsert(califsPayload, { onConflict: 'alumno_id,actividad_id' });
    if (calErr) console.warn(`Aviso al insertar calificaciones en ${g.nombre}:`, calErr.message);
    else totalCalificaciones += califsPayload.length;

    // Insertar Diario de Clase
    const diarioPayload = DIARIO_CLASE.map((d) => ({
      id: `${g.id}-${d.id}`,
      grupo_id: g.id,
      fecha: d.fecha,
      descripcion: d.descripcion
    }));
    await (supabase.from('diario_clase') as any).upsert(diarioPayload);

    // Construir estructura para userDataset.json
    gruposDataForJson.push({
      id: g.id,
      nombre: g.nombre,
      oculto: g.oculto,
      alumnos: g.alumnos,
      secciones: SECCIONES,
      criterios: CRITERIOS,
      rubricas: RUBRICAS,
      evaluaciones: {
        eval1: {
          actividades: ACTIVIDADES,
          calificaciones: califsMap
        },
        eval2: { actividades: [], calificaciones: {} },
        eval3: { actividades: [], calificaciones: {} }
      },
      diarioClase: DIARIO_CLASE
    });
  }

  // Guardar copia JSON completa en cuadernos_sync de Supabase
  const fullNotebookObj = {
    grupoActivoId: GRUPOS[0].id,
    grupos: gruposDataForJson,
    version: 1290,
    updatedAt: new Date().toISOString()
  };

  await (supabase.from('cuadernos_sync') as any).upsert({
    profesor_id: profesorId,
    data: fullNotebookObj,
    version: 1290,
    updated_at: new Date().toISOString()
  });

  // Guardar también en src/userDataset.json para la vista previa local
  const jsonFilePath = path.join(process.cwd(), 'src', 'userDataset.json');
  fs.writeFileSync(jsonFilePath, JSON.stringify(fullNotebookObj, null, 2), 'utf-8');

  console.log('\n======================================================');
  console.log('✔ ¡MIGRACIÓN DE DATOS COMPLETOS FINALIZADA!');
  console.log(`- Grupos registrados: ${GRUPOS.length}`);
  console.log(`- Alumnos registrados: ${totalAlumnos}`);
  console.log(`- Actividades/Exámenes creados: ${totalActividades}`);
  console.log(`- Calificaciones/Notas insertadas: ${totalCalificaciones}`);
  console.log('======================================================');
}

seedFullDatasetToSupabase();
