import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bdtkdyzmpbijvwwsbxpa.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdGtkeXptcGJpanZ3d3NieHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMjY1NDksImV4cCI6MjEwNjYwMjU0OX0.qIpWI_Nw5Lya1IU6F09IYDUvjiR6-68_uHvp0ZcPU9E';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const fullGruposDataset = [
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

async function seedCompleteSupabase() {
  console.log('=== SEMBRANDO 4 GRUPOS Y 86 ALUMNOS EN SUPABASE ===');

  const profesorId = 'docente_borborigmo_gmail_com';

  // 1. Profesor
  await (supabase.from('profesores') as any).upsert({
    id: profesorId,
    email: 'borborigmo@gmail.com',
    nombre: 'Profesor Fernanditio',
    updated_at: new Date().toISOString()
  });

  // 2. Cuaderno Sync
  await (supabase.from('cuadernos_sync') as any).upsert({
    profesor_id: profesorId,
    data: { grupoActivoId: fullGruposDataset[0].id, grupos: fullGruposDataset },
    version: 1289,
    updated_at: new Date().toISOString()
  });

  let totalAlumnos = 0;

  for (const g of fullGruposDataset) {
    console.log(`Insertando Grupo: ${g.nombre}...`);
    await (supabase.from('grupos') as any).upsert({
      id: g.id,
      profesor_id: profesorId,
      nombre: g.nombre,
      oculto: g.oculto,
      updated_at: new Date().toISOString()
    });

    const alumnosPayload = g.alumnos.map((a) => ({
      id: a.id,
      grupo_id: g.id,
      nombre: a.nombre,
      orden: a.orden
    }));

    const { error: aluErr } = await (supabase.from('alumnos') as any).upsert(alumnosPayload);
    if (aluErr) {
      console.error(`Error al insertar alumnos de ${g.nombre}:`, aluErr.message);
    } else {
      totalAlumnos += alumnosPayload.length;
    }
  }

  console.log('\n=== VERIFICACIÓN DE TABLAS EN SUPABASE ===');
  const { data: profs } = await (supabase.from('profesores') as any).select('*');
  const { data: grps } = await (supabase.from('grupos') as any).select('*');
  const { data: alus } = await (supabase.from('alumnos') as any).select('*');
  const { data: csync } = await (supabase.from('cuadernos_sync') as any).select('*');

  console.log(`- Profesores en Supabase: ${profs ? profs.length : 0}`);
  console.log(`- Grupos en Supabase: ${grps ? grps.length : 0}`);
  console.log(`- Alumnos en Supabase: ${alus ? alus.length : 0}`);
  console.log(`- Copias en cuadernos_sync: ${csync ? csync.length : 0}`);
  console.log('==========================================');
}

seedCompleteSupabase();
