import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

(window as any).Cropper = Cropper;
(window as any).XLSX = XLSX;

export type RubricType = 'actividad' | 'examen' | 'trabajo' | 'personalizada';

export interface RubricLevel {
  id?: string;
  nombre?: string;
  desc: string;
  puntos: number;
}

export interface UnifiedRubricItem {
  id: string;
  order: number;
  orderLabel?: string; // Identificador jerárquico (ej. "1", "2.a", "2.b", "2.c", "3")
  numActividad?: string; // Identificador jerárquico equivalente para la columna Actividad
  title: string;
  titulo?: string;
  criterio?: string; // Código de criterio individual o concatenado (ej. "1.1")
  criterios: string[]; // Identificadores de criterios (ej. ["1.1", "1.2"])
  criterioText?: string; // Texto legible de criterios
  peso?: number; // Peso opcional (% o ponderación relativa)
  maxScore?: number; // Puntuación máxima opcional (ej. 10 para examen o peso por pregunta)
  apartado?: string; // Sección o bloque al que pertenece
  niveles?: RubricLevel[]; // Niveles de logro opcionales si es formato rúbrica
  isOrtografia?: boolean; // Indica si es ítem adicional para evaluar ortografía (Criterio 5.1 / 5.3)
  isExtra?: boolean; // Indica si puntúa aparte del 100% principal de la rúbrica
}

export interface UnifiedRubric {
  id: string;
  nombre: string;
  tipo: RubricType;
  descripcion?: string;
  fechaCreacion: string;
  fechaModificacion?: string;
  version?: number;
  apartados?: string[];
  items: UnifiedRubricItem[];
  criteriosAsociados?: string[];
  pesoTotal?: number;
}

export interface ParseResult {
  rubrica?: UnifiedRubric;
  titulo: string;
  tipo: RubricType;
  items: UnifiedRubricItem[];
  apartados?: string[];
  warnings: string[];
  error?: string;
  totalMaxExamen?: number;
  criteriosDetectados?: string[];
  criteriosNoEncontrados?: string[];
  elementosSinCriterio?: number;
}

export interface ValidationResult {
  esValida: boolean;
  errores: string[];
  advertencias: string[];
  criteriosDetectados?: string[];
  criteriosMissing?: string[];
  itemsSinCriterio?: number;
}

/**
 * Normaliza textos para comparación de encabezados
 */
function normalizeHeader(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Normaliza tipos conceptuales legacy ('actividades' -> 'actividad', 'trabajos' -> 'trabajo')
 */
export function normalizeRubricType(rawTipo: string): RubricType {
  const norm = (rawTipo || '').toLowerCase().trim();
  if (norm.includes('exam') || norm.includes('control') || norm.includes('prueba') || norm === 'examen' || norm === 'examenes') return 'examen';
  if (norm.includes('trabaj') || norm.includes('proyecto') || norm === 'trabajo' || norm === 'trabajos') return 'trabajo';
  if (norm.includes('personal') || norm === 'rubrica' || norm === 'manual') return 'personalizada';
  return 'actividad';
}

/**
 * Normaliza códigos de criterio tolerando pequeñas diferencias (ej. "1,1", " 1.1 ", "1.1.", "CE 1.1")
 */
export function normalizeCriterionCode(raw: string): string {
  if (!raw) return '';
  let str = String(raw).trim();
  if (str.startsWith('"') && str.endsWith('"')) {
    str = str.slice(1, -1).trim();
  }
  if (str.includes(' - ') || str.includes(' – ') || str.includes('—')) {
    str = str.split(/ - | – |—/)[0].trim();
  }
  str = str.replace(/^(CE|C\.E\.|CE\.|Criterio|Criterio\s+de\s+evaluaci[oó]n)\s*/i, '').trim();
  str = str.replace(/(\d+),(\d+)/g, '$1.$2');
  str = str.replace(/\.$/, '');
  return str.trim();
}

/**
 * Extrae uno o varios códigos de criterio (ej. "1.1; 2.3", "CE 9.4" -> ["9.4"], "9.4 – Texto" -> ["9.4"])
 */
export function cleanCriterioCodes(raw: string): string[] {
  if (!raw) return [];
  let text = String(raw).trim();

  // Ignorar expresamente valores indeterminados
  const normLower = text.toLowerCase();
  if (normLower === 'unknown' || normLower === 'desconocido' || normLower === 'null' || normLower === 'undefined' || normLower === 'n/a' || normLower === 'sin criterio') {
    return [];
  }

  // 1. Quitar comillas envueltas
  if (text.startsWith('"') && text.endsWith('"')) {
    text = text.slice(1, -1).trim();
  }
  if (!text) return [];

  // Dividir por ';' o comas si vienen múltiples criterios especificados
  const parts = text.split(/[;,]/).map(p => p.trim()).filter(Boolean);
  const result: string[] = [];

  for (const part of parts) {
    let sub = part;
    const subLower = sub.toLowerCase();
    if (subLower === 'unknown' || subLower === 'desconocido' || subLower === 'null' || subLower === 'undefined' || subLower === 'n/a') {
      continue;
    }
    // Si viene con guión/tira de descripción ("9.4 – Formular...", "9.4 - Desc..."), tomar la parte del código
    if (sub.includes(' - ') || sub.includes(' – ') || sub.includes('—')) {
      sub = sub.split(/ - | – |—/)[0].trim();
    }
    // Quitar prefijos habituales (CE, C.E., Criterio, etc.)
    sub = sub.replace(/^(CE|C\.E\.|CE\.|Criterio|Criterio\s+de\s+evaluaci[oó]n)\s*/i, '').trim();
    // Normalizar comas entre dígitos a puntos (ej. 1,1 -> 1.1)
    sub = sub.replace(/(\d+),(\d+)/g, '$1.$2');

    // Buscar patrones numéricos de criterios (ej. 9.4, 8.1, 5.3, 10.1, 2)
    const matches = sub.match(/(\d+\.\d+|\d+)/g);
    if (matches && matches.length > 0) {
      matches.forEach(m => {
        const clean = m.replace(/\.$/, '');
        if (clean && !result.includes(clean)) result.push(clean);
      });
    } else {
      const norm = normalizeCriterionCode(sub);
      if (norm && norm.toLowerCase() !== 'unknown' && !result.includes(norm)) result.push(norm);
    }
  }

  return result;
}

/**
 * Parsea texto pegado (CSV simplificado con ';', tabulaciones, etc.) y genera la Rúbrica Unificada
 */
export function parseRubricText(rawText: string, rawTipo: string, customTitle?: string): ParseResult {
  const tipo = normalizeRubricType(rawTipo);
  const warnings: string[] = [];
  const items: UnifiedRubricItem[] = [];

  if (!rawText || !rawText.trim()) {
    return {
      tipo,
      titulo: customTitle || 'Rúbrica Importada',
      items: [],
      apartados: [],
      warnings: ['No se ha introducido ningún texto para importar.']
    };
  }

  // 1. Dividir líneas e ignorar vacías
  const lines = rawText
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  if (lines.length === 0) {
    return {
      tipo,
      titulo: customTitle || 'Rúbrica Importada',
      items: [],
      apartados: [],
      warnings: ['El texto no contiene ninguna línea con contenido.']
    };
  }

  // 2. Detectar delimitador
  let delimiter = ';';
  const textSample = lines.slice(0, 10).join('\n');
  if (textSample.includes(';')) {
    delimiter = ';';
  } else if (textSample.includes('\t')) {
    delimiter = '\t';
  } else if (textSample.includes('|')) {
    delimiter = '|';
  } else if (textSample.includes(',')) {
    delimiter = ',';
  }

  let orderCounter = 1;
  const detectedTitle = customTitle || (tipo === 'examen' ? 'Examen Importado' : (tipo === 'trabajo' ? 'Rúbrica de Trabajo' : 'Rúbrica de Actividades'));

  lines.forEach((line, index) => {
    let cleanLine = line;
    if (cleanLine.startsWith('"') && cleanLine.endsWith('"')) {
      cleanLine = cleanLine.slice(1, -1).trim();
    }

    const rawTokens = cleanLine.split(delimiter).map(t => {
      let trimmed = t.trim();
      if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        trimmed = trimmed.slice(1, -1).trim();
      }
      return trimmed;
    });

    if (rawTokens.length === 0) return;

    // Detectar si la primera línea es una cabecera
    const normToken0 = normalizeHeader(rawTokens[0] || '');
    const normToken1 = normalizeHeader(rawTokens[1] || '');
    const normToken2 = normalizeHeader(rawTokens[2] || '');

    const isHeaderRow =
      normToken0.includes('nº') || normToken0.includes('num') || normToken0.includes('orden') || normToken0.includes('item') ||
      normToken1.includes('actividad') || normToken1.includes('pregunta') || normToken1.includes('descripcion') || normToken1.includes('titulo') ||
      normToken2.includes('criterio') || normToken2.includes('ce') || normToken2.includes('evaluacion');

    if (isHeaderRow && index === 0) {
      return;
    }

    let orderNum = orderCounter;
    let titleText = '';
    let criterioRaw = '';
    let pesoOrScore = 10;

    if (rawTokens.length === 1) {
      warnings.push(`Línea ${index + 1}: No se detectó separador "${delimiter}". Se interpreta como descripción de actividad.`);
      titleText = rawTokens[0];
    } else if (rawTokens.length === 2) {
      const firstIsNum = /^\d+$/.test(rawTokens[0]);
      if (firstIsNum) {
        orderNum = parseInt(rawTokens[0], 10) || orderCounter;
        titleText = rawTokens[1];
      } else {
        titleText = rawTokens[0];
        criterioRaw = rawTokens[1];
      }
    } else {
      const firstIsNum = /^\d+$/.test(rawTokens[0]);
      if (firstIsNum) {
        orderNum = parseInt(rawTokens[0], 10) || orderCounter;
        titleText = rawTokens[1];
        criterioRaw = rawTokens[2];
        if (rawTokens[3]) {
          const parsed = parseFloat(rawTokens[3].replace(',', '.'));
          if (!isNaN(parsed)) pesoOrScore = parsed;
        }
      } else {
        titleText = rawTokens[0];
        criterioRaw = rawTokens[1];
        if (rawTokens[2]) {
          const parsed = parseFloat(rawTokens[2].replace(',', '.'));
          if (!isNaN(parsed)) pesoOrScore = parsed;
        }
      }
    }

    const crits = cleanCriterioCodes(criterioRaw);

    if (!titleText && !criterioRaw) {
      warnings.push(`Línea ${index + 1}: No se pudo interpretar el contenido "${line}".`);
      return;
    }

    items.push({
      id: `item-${Date.now()}-${index + 1}`,
      order: orderNum,
      title: titleText || `Actividad ${orderNum}`,
      criterios: crits,
      criterioText: crits.join(', '),
      peso: tipo === 'examen' ? 10 : (pesoOrScore || 10),
      maxScore: tipo === 'examen' ? (pesoOrScore > 0 ? pesoOrScore : 1) : 1
    });

    orderCounter++;
  });

  return finalizeParseResult(detectedTitle, items, ['General'], tipo, warnings);
}

/**
 * Parsea archivos Word (.docx), Excel (.xlsx/.xls) o JSON y produce el MODELO UNIFICADO DE RÚBRICA.
 */
export async function parseRubricFile(file: File, rawTipo: string): Promise<ParseResult> {
  const tipo = normalizeRubricType(rawTipo);
  const fileName = file.name;
  const ext = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
  const titleWithoutExt = fileName.replace(/\.[^/.]+$/, '');

  if (ext === '.json') {
    return parseJsonFile(file, tipo, titleWithoutExt);
  } else if (ext === '.docx') {
    return parseWordDocx(file, tipo, titleWithoutExt);
  } else if (ext === '.xlsx' || ext === '.xls') {
    return parseExcelFile(file, tipo, titleWithoutExt);
  } else {
    return {
      tipo,
      titulo: titleWithoutExt,
      items: [],
      apartados: [],
      warnings: [],
      error: 'Formato de archivo no soportado. Selecciona Word (.docx), Excel (.xlsx) o JSON (.json).'
    };
  }
}

async function parseJsonFile(file: File, tipo: RubricType, defaultTitle: string): Promise<ParseResult> {
  try {
    const text = await file.text();
    const json = JSON.parse(text);
    const rubrica = migrarOConvertirRubricaUnificada(json, tipo, defaultTitle);
    const warnings: string[] = [];
    const val = validarRubrica(rubrica, []);
    warnings.push(...val.advertencias);

    return {
      rubrica,
      titulo: rubrica.nombre,
      tipo: rubrica.tipo,
      items: rubrica.items,
      apartados: rubrica.apartados,
      warnings
    };
  } catch (err: any) {
    return {
      tipo,
      titulo: defaultTitle,
      items: [],
      warnings: [],
      error: `Error al leer archivo JSON: ${err.message || err}`
    };
  }
}

async function parseWordDocx(file: File, tipo: RubricType, defaultTitle: string): Promise<ParseResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const table = doc.querySelector('table');

    if (!table) {
      return {
        tipo,
        titulo: defaultTitle,
        items: [],
        apartados: [],
        warnings: [],
        error: 'No se encontró ninguna tabla en el documento Word. La rúbrica debe estar estructurada en una tabla.'
      };
    }

    const rows = Array.from(table.querySelectorAll('tr'));
    if (rows.length < 2) {
      return {
        tipo,
        titulo: defaultTitle,
        items: [],
        apartados: [],
        warnings: [],
        error: 'La tabla del documento Word no contiene suficientes filas.'
      };
    }

    let headerRowIdx = 0;
    let colIdxMap = { order: -1, title: -1, criterio: -1, peso: -1, apartado: -1, maxScore: -1 };

    for (let r = 0; r < Math.min(rows.length, 3); r++) {
      const cells = Array.from(rows[r].querySelectorAll('th, td')).map(c => normalizeHeader(c.textContent || ''));
      const map = mapHeaderColumns(cells);
      if (map.criterio !== -1 && (map.title !== -1 || map.order !== -1)) {
        headerRowIdx = r;
        colIdxMap = map;
        break;
      }
    }

    if (colIdxMap.criterio === -1) {
      const firstRowCells = Array.from(rows[0].querySelectorAll('th, td'));
      if (firstRowCells.length >= 3) {
        colIdxMap = { order: 0, title: 1, criterio: 2, peso: -1, apartado: -1, maxScore: 3 };
        headerRowIdx = 0;
      }
    }

    const items: UnifiedRubricItem[] = [];
    const apartadosSet = new Set<string>();
    const warnings: string[] = [];
    let currentApartado = 'General';
    let orderCounter = 1;

    for (let r = headerRowIdx + 1; r < rows.length; r++) {
      const cells = Array.from(rows[r].querySelectorAll('td, th')).map(c => (c.textContent || '').trim());
      if (cells.length === 0 || cells.every(c => c === '')) continue;

      if (cells.length === 1 || (cells.length > 1 && cells.slice(1).every(c => c === ''))) {
        const text = cells[0].trim();
        if (text && !text.toLowerCase().startsWith('total')) {
          currentApartado = text;
          apartadosSet.add(currentApartado);
          continue;
        }
      }

      const rawOrder = colIdxMap.order !== -1 && cells[colIdxMap.order] ? cells[colIdxMap.order] : '';
      const rawTitle = colIdxMap.title !== -1 && cells[colIdxMap.title] ? cells[colIdxMap.title] : (cells[0] || `Ítem ${orderCounter}`);
      const rawCriterio = colIdxMap.criterio !== -1 && cells[colIdxMap.criterio] ? cells[colIdxMap.criterio] : '';
      const rawPeso = colIdxMap.peso !== -1 && cells[colIdxMap.peso] ? cells[colIdxMap.peso] : '';
      const rawApartado = colIdxMap.apartado !== -1 && cells[colIdxMap.apartado] ? cells[colIdxMap.apartado] : currentApartado;
      const rawMax = colIdxMap.maxScore !== -1 && cells[colIdxMap.maxScore] ? cells[colIdxMap.maxScore] : '';

      if (rawTitle.toLowerCase().includes('total') || rawTitle.toLowerCase().includes('suma')) {
        continue;
      }

      const criteriosCodes = cleanCriterioCodes(rawCriterio);
      const itemApartado = rawApartado || currentApartado || 'General';
      apartadosSet.add(itemApartado);

      let parsedOrder = parseInt(rawOrder.replace(/\D/g, ''), 10);
      if (isNaN(parsedOrder) || parsedOrder <= 0) {
        parsedOrder = orderCounter;
      }

      let maxScoreParsed: number | undefined = undefined;
      if (rawMax) {
        const p = parseFloat(rawMax.replace(',', '.'));
        if (!isNaN(p)) maxScoreParsed = p;
      }

      let pesoParsed: number | undefined = undefined;
      if (rawPeso) {
        const p = parseFloat(rawPeso.replace('%', '').replace(',', '.'));
        if (!isNaN(p)) pesoParsed = p;
      }

      items.push({
        id: `rub-item-${Date.now()}-${orderCounter}`,
        order: parsedOrder,
        title: rawTitle || `Pregunta ${orderCounter}`,
        criterios: criteriosCodes,
        criterioText: criteriosCodes.join(', '),
        peso: pesoParsed,
        apartado: itemApartado,
        maxScore: maxScoreParsed
      });

      orderCounter++;
    }

    return finalizeParseResult(defaultTitle, items, Array.from(apartadosSet), tipo, warnings);
  } catch (err: any) {
    return {
      tipo,
      titulo: defaultTitle,
      items: [],
      apartados: [],
      warnings: [],
      error: `Error al leer archivo Word: ${err.message || err}`
    };
  }
}

async function parseExcelFile(file: File, tipo: RubricType, defaultTitle: string): Promise<ParseResult> {
  try {
    if (!file) {
      return { tipo, titulo: defaultTitle, items: [], warnings: [], error: 'No se ha seleccionado ningún archivo.' };
    }

    if (file.size > 25 * 1024 * 1024) {
      return {
        tipo,
        titulo: defaultTitle,
        items: [],
        warnings: [],
        error: 'El archivo Excel excede el tamaño máximo permitido de 25 MB.'
      };
    }

    const fileNameLower = (file.name || '').toLowerCase();
    if (!fileNameLower.endsWith('.xlsx') && !fileNameLower.endsWith('.xls') && !fileNameLower.endsWith('.csv')) {
      return {
        tipo,
        titulo: defaultTitle,
        items: [],
        warnings: [],
        error: 'El formato de archivo no es válido. Debe ser un archivo Excel (.xlsx, .xls) o CSV (.csv).'
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      return { tipo, titulo: defaultTitle, items: [], warnings: [], error: 'El archivo Excel está vacío.' };
    }

    let workbook: XLSX.WorkBook;
    try {
      workbook = XLSX.read(arrayBuffer, { type: 'array' });
    } catch (readErr: any) {
      return {
        tipo,
        titulo: defaultTitle,
        items: [],
        warnings: [],
        error: `Error al decodificar la hoja de cálculo: ${readErr?.message || readErr}`
      };
    }

    if (!workbook || !Array.isArray(workbook.SheetNames) || workbook.SheetNames.length === 0) {
      return {
        tipo,
        titulo: defaultTitle,
        items: [],
        warnings: [],
        error: 'El archivo Excel no contiene ninguna hoja válida.'
      };
    }

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      return { tipo, titulo: defaultTitle, items: [], warnings: [], error: 'No se pudo acceder al contenido de la hoja de Excel.' };
    }

    const rawRows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    if (!rawRows || !Array.isArray(rawRows) || rawRows.length < 2) {
      return {
        tipo,
        titulo: defaultTitle,
        items: [],
        apartados: [],
        warnings: [],
        error: 'La hoja de Excel no contiene suficientes datos para construir la rúbrica.'
      };
    }

    // Limitar filas a procesar por seguridad (máximo 2000 filas)
    const safeRows = rawRows.slice(0, 2000);

    let headerRowIdx = 0;
    let colIdxMap = { order: -1, title: -1, criterio: -1, peso: -1, apartado: -1, maxScore: -1 };

    for (let r = 0; r < Math.min(safeRows.length, 5); r++) {
      const row = safeRows[r] || [];
      const cells = row.map(c => normalizeHeader(String(c || '')));
      const map = mapHeaderColumns(cells);
      if (map.criterio !== -1 && (map.title !== -1 || map.order !== -1)) {
        headerRowIdx = r;
        colIdxMap = map;
        break;
      }
    }

    if (colIdxMap.criterio === -1) {
      colIdxMap = { order: 0, title: 1, criterio: 2, peso: -1, apartado: -1, maxScore: 3 };
      headerRowIdx = 0;
    }

    const items: UnifiedRubricItem[] = [];
    const apartadosSet = new Set<string>();
    const warnings: string[] = [];
    let currentApartado = 'General';
    let orderCounter = 1;

    for (let r = headerRowIdx + 1; r < safeRows.length; r++) {
      const row = safeRows[r] || [];
      if (row.length === 0 || row.every(c => c === undefined || c === null || String(c).trim() === '')) {
        continue;
      }

      const cells = row.map(c => String(c !== undefined && c !== null ? c : '').trim());

      const rawOrder = colIdxMap.order !== -1 && cells[colIdxMap.order] ? cells[colIdxMap.order] : '';
      const rawTitle = colIdxMap.title !== -1 && cells[colIdxMap.title] ? cells[colIdxMap.title] : (cells[0] || `Ítem ${orderCounter}`);
      const rawCriterio = colIdxMap.criterio !== -1 && cells[colIdxMap.criterio] ? cells[colIdxMap.criterio] : '';
      const rawPeso = colIdxMap.peso !== -1 && cells[colIdxMap.peso] ? cells[colIdxMap.peso] : '';
      const rawApartado = colIdxMap.apartado !== -1 && cells[colIdxMap.apartado] ? cells[colIdxMap.apartado] : currentApartado;
      const rawMax = colIdxMap.maxScore !== -1 && cells[colIdxMap.maxScore] ? cells[colIdxMap.maxScore] : '';

      if (rawTitle.toLowerCase().includes('total') || rawTitle.toLowerCase().includes('suma')) {
        continue;
      }

      const criteriosCodes = cleanCriterioCodes(rawCriterio);
      const itemApartado = rawApartado || currentApartado || 'General';
      apartadosSet.add(itemApartado);

      let parsedOrder = parseInt(rawOrder.replace(/\D/g, ''), 10);
      if (isNaN(parsedOrder) || parsedOrder <= 0) {
        parsedOrder = orderCounter;
      }

      let maxScoreParsed: number | undefined = undefined;
      if (rawMax) {
        const p = parseFloat(rawMax.replace(',', '.'));
        if (!isNaN(p)) maxScoreParsed = p;
      }

      let pesoParsed: number | undefined = undefined;
      if (rawPeso) {
        const p = parseFloat(rawPeso.replace('%', '').replace(',', '.'));
        if (!isNaN(p)) pesoParsed = p;
      }

      items.push({
        id: `rub-item-${Date.now()}-${orderCounter}`,
        order: parsedOrder,
        title: rawTitle || `Pregunta ${orderCounter}`,
        criterios: criteriosCodes,
        criterioText: criteriosCodes.join(', '),
        peso: pesoParsed,
        apartado: itemApartado,
        maxScore: maxScoreParsed
      });

      orderCounter++;
    }

    return finalizeParseResult(defaultTitle, items, Array.from(apartadosSet), tipo, warnings);
  } catch (err: any) {
    return {
      tipo,
      titulo: defaultTitle,
      items: [],
      apartados: [],
      warnings: [],
      error: `Error al leer archivo Excel: ${err.message || err}`
    };
  }
}

function mapHeaderColumns(cells: string[]) {
  const map = { order: -1, title: -1, criterio: -1, peso: -1, apartado: -1, maxScore: -1 };
  cells.forEach((cell, idx) => {
    if (cell.includes('nº') || cell.includes('num') || cell.includes('orden') || cell.includes('posicion') || cell === 'n' || cell === 'no') {
      map.order = idx;
    } else if (cell.includes('actividad') || cell.includes('pregunta') || cell.includes('item') || cell.includes('titulo') || cell.includes('descripcion') || cell.includes('nombre') || cell.includes('aspecto')) {
      map.title = idx;
    } else if (cell.includes('criterio') || cell.includes('crit') || cell.includes('evaluacion') || cell.includes('ce')) {
      map.criterio = idx;
    } else if (cell.includes('peso') || cell.includes('ponderacion') || cell.includes('%') || cell.includes('porcentaje')) {
      map.peso = idx;
    } else if (cell.includes('apartado') || cell.includes('seccion') || cell.includes('bloque') || cell.includes('modulo')) {
      map.apartado = idx;
    } else if (cell.includes('max') || cell.includes('puntuacion') || cell.includes('puntos') || cell.includes('nota max') || cell.includes('maxima')) {
      map.maxScore = idx;
    }
  });

  if (map.title === -1 && map.order !== -1 && cells.length > 1) {
    map.title = map.order === 0 ? 1 : 0;
  }
  return map;
}

/**
 * Normaliza y preserva la estructura jerárquica de actividades y epígrafes (ej. 1, 2.a, 2.b, 2.c, 3).
 */
export function normalizarJerarquiaActividades<T extends UnifiedRubricItem>(
  rawItems: T[]
): T[] {
  if (!rawItems || rawItems.length === 0) return [];

  let parentActivityNum = 0;
  let hasAnyExplicitStructure = false;

  const parsedItems = rawItems.map((item, index) => {
    let rawTitle = (item.titulo || item.title || '').trim();
    let numAct = String(item.numActividad || item.orderLabel || '').trim();
    let cleanTitle = rawTitle;

    if (!numAct && rawTitle) {
      const matchCombo = rawTitle.match(/^(?:Actividad|Pregunta|Ejercicio|Ítem|Apartado)?\s*(\d+[\.\-_][a-z0-9]+)[\.\)\s:-]*\s*(.*)/i);
      if (matchCombo) {
        numAct = matchCombo[1].toLowerCase();
        if (matchCombo[2]) cleanTitle = matchCombo[2];
      } else {
        const matchNumOnly = rawTitle.match(/^(?:Actividad|Pregunta|Ejercicio|Ítem)?\s*(\d+)[\.\)\s:-]+\s*(.*)/i);
        if (matchNumOnly) {
          numAct = matchNumOnly[1];
          if (matchNumOnly[2]) cleanTitle = matchNumOnly[2];
        } else {
          const matchLetterOnly = rawTitle.match(/^([a-z])[\.\)\s:-]+\s*(.*)/i);
          if (matchLetterOnly) {
            numAct = matchLetterOnly[1].toLowerCase();
            if (matchLetterOnly[2]) cleanTitle = matchLetterOnly[2];
          }
        }
      }
    }

    if (numAct) hasAnyExplicitStructure = true;

    return {
      item,
      cleanTitle: cleanTitle || rawTitle,
      numAct,
      originalOrder: item.order || index + 1
    };
  });

  return parsedItems.map((entry, index) => {
    let resolvedNum = entry.numAct;

    if (/^\d+$/.test(resolvedNum)) {
      parentActivityNum = parseInt(resolvedNum, 10);
    } else if (/^(\d+)[\.\-_]([a-z0-9]+)$/i.test(resolvedNum)) {
      const match = resolvedNum.match(/^(\d+)[\.\-_]([a-z0-9]+)$/i);
      if (match) {
        parentActivityNum = parseInt(match[1], 10);
        resolvedNum = `${match[1]}.${match[2].toLowerCase()}`;
      }
    } else if (/^[a-z]$/i.test(resolvedNum)) {
      const letter = resolvedNum.toLowerCase();
      if (parentActivityNum > 0) {
        resolvedNum = `${parentActivityNum}.${letter}`;
      } else {
        parentActivityNum = 1;
        resolvedNum = `1.${letter}`;
      }
    }

    if (!resolvedNum) {
      if (hasAnyExplicitStructure && parentActivityNum > 0) {
        resolvedNum = `${parentActivityNum}`;
      } else {
        resolvedNum = `${entry.originalOrder}`;
      }
    }

    return {
      ...entry.item,
      title: entry.cleanTitle,
      titulo: entry.cleanTitle,
      numActividad: resolvedNum,
      orderLabel: resolvedNum,
      order: entry.originalOrder
    };
  });
}

function finalizeParseResult(titulo: string, rawItems: UnifiedRubricItem[], apartados: string[], tipo: RubricType, warnings: string[]): ParseResult {
  const items = normalizarJerarquiaActividades(rawItems);
  let totalMaxExamen = 0;
  if (tipo === 'examen') {
    // Si hay ítems sin maxScore o no suman 10, repartir proporcional o equitativamente
    const unassigned = items.filter(it => it.maxScore === undefined || it.maxScore === null || isNaN(it.maxScore) || it.maxScore <= 0);
    if (unassigned.length > 0 && items.length > 0) {
      const assignedSum = items.filter(it => it.maxScore !== undefined && it.maxScore !== null && !isNaN(it.maxScore) && it.maxScore > 0)
        .reduce((sum, it) => sum + (it.maxScore || 0), 0);
      const remaining = Math.max(0, 10 - assignedSum);
      const perItem = Math.round((remaining / unassigned.length) * 100) / 100;
      unassigned.forEach((it, idx) => {
        it.maxScore = (idx === unassigned.length - 1 && assignedSum === 0)
          ? Math.round((10 - perItem * (unassigned.length - 1)) * 100) / 100
          : perItem;
      });
    }
    totalMaxExamen = items.reduce((sum, item) => sum + (item.maxScore || 0), 0);
    totalMaxExamen = Math.round(totalMaxExamen * 100) / 100;

    if (totalMaxExamen > 0 && Math.abs(totalMaxExamen - 10) > 0.001) {
      warnings.push(`La suma de las puntuaciones máximas del examen es ${totalMaxExamen} puntos.`);
    }
  }

  const allCriterios = new Set<string>();
  let elementosSinCriterio = 0;

  items.forEach(item => {
    if (!item.criterios || item.criterios.length === 0) {
      elementosSinCriterio++;
    } else {
      item.criterios.forEach(c => allCriterios.add(c));
    }
  });

  const rubrica: UnifiedRubric = {
    id: `rub-${Date.now()}`,
    nombre: titulo,
    tipo,
    descripcion: `Rúbrica de ${tipo}`,
    fechaCreacion: new Date().toISOString(),
    fechaModificacion: new Date().toISOString(),
    version: 1,
    apartados,
    items,
    criteriosAsociados: Array.from(allCriterios)
  };

  return {
    rubrica,
    titulo,
    tipo,
    items,
    apartados,
    warnings,
    totalMaxExamen,
    criteriosDetectados: Array.from(allCriterios),
    elementosSinCriterio
  };
}

/**
 * Valida una Rúbrica Unificada y retorna Errores y Advertencias
 */
export function validarRubrica(rubrica: UnifiedRubric, criteriosExistentesCodigos: string[] = []): ValidationResult {
  const errores: string[] = [];
  const advertencias: string[] = [];
  const criteriosDetectadosSet = new Set<string>();
  const criteriosMissingSet = new Set<string>();
  let itemsSinCriterio = 0;

  if (!rubrica) {
    errores.push('La rúbrica no existe o es nula.');
    return {
      esValida: false,
      errores,
      advertencias,
      criteriosDetectados: [],
      criteriosMissing: [],
      itemsSinCriterio: 0
    };
  }

  if (!rubrica.nombre || !rubrica.nombre.trim()) {
    errores.push('La rúbrica o actividad debe tener un nombre.');
  }

  if (!rubrica.items || rubrica.items.length === 0) {
    errores.push('La rúbrica no contiene ningún ítem o actividad.');
    return {
      esValida: false,
      errores,
      advertencias,
      criteriosDetectados: [],
      criteriosMissing: [],
      itemsSinCriterio: 0
    };
  }

  const orderSet = new Set<number>();
  let sumaPesos = 0;
  let tienePesosConfigurados = false;

  rubrica.items.forEach((item, index) => {
    if (!item.title || !item.title.trim()) {
      advertencias.push(`El ítem #${index + 1} no tiene un título definido.`);
    }

    if (orderSet.has(item.order)) {
      advertencias.push(`Número de orden duplicado: ${item.order} en ítem "${item.title}".`);
    } else {
      orderSet.add(item.order);
    }

    if (!item.criterios || item.criterios.length === 0) {
      itemsSinCriterio++;
      advertencias.push(`El ítem #${item.order} ("${item.title}") no tiene ningún criterio de evaluación asociado.`);
    } else {
      const normExistentes = criteriosExistentesCodigos.map(c => normalizeCriterionCode(c));
      item.criterios.forEach(crit => {
        const cleanCrit = normalizeCriterionCode(crit);
        criteriosDetectadosSet.add(cleanCrit);
        if (criteriosExistentesCodigos.length > 0 && !normExistentes.includes(cleanCrit)) {
          criteriosMissingSet.add(cleanCrit);
          advertencias.push(`El criterio ${cleanCrit} no existe entre los criterios cargados para este curso y materia (ítem #${item.order}).`);
        }
      });
    }

    if (item.peso !== undefined && item.peso !== null && !isNaN(item.peso)) {
      if (item.peso < 0) {
        errores.push(`El peso del ítem #${item.order} ("${item.title}") no puede ser negativo.`);
      }
      sumaPesos += item.peso;
      tienePesosConfigurados = true;
    }

    if (item.maxScore !== undefined && item.maxScore !== null && item.maxScore < 0) {
      errores.push(`La puntuación máxima del ítem #${item.order} ("${item.title}") no puede ser negativa.`);
    }
  });

  if (tienePesosConfigurados && Math.abs(sumaPesos - 100) > 0.01 && sumaPesos > 0) {
    advertencias.push(`La suma de los pesos de los ítems es ${sumaPesos}% (se recomienda que sume 100%).`);
  }

  return {
    esValida: errores.length === 0,
    errores,
    advertencias,
    criteriosDetectados: Array.from(criteriosDetectadosSet),
    criteriosMissing: Array.from(criteriosMissingSet),
    itemsSinCriterio
  };
}

/**
 * Convierte cualquier estructura de rúbrica legacy al MODELO UNIFICADO DE RÚBRICA.
 */
export function migrarOConvertirRubricaUnificada(raw: any, defaultTipo: RubricType = 'actividad', defaultNombre = 'Rúbrica'): UnifiedRubric {
  if (!raw || typeof raw !== 'object') {
    return {
      id: `rub-${Date.now()}`,
      nombre: defaultNombre,
      tipo: defaultTipo,
      fechaCreacion: new Date().toISOString(),
      items: []
    };
  }

  const tipoNorm = normalizeRubricType((defaultTipo && defaultTipo !== 'actividad') ? defaultTipo : (raw.tipo || defaultTipo));
  const nombre = raw.nombre || raw.titulo || defaultNombre;

  let items: UnifiedRubricItem[] = [];

  // Si viene del modelo antiguo con aspectos
  if (Array.isArray(raw.aspectos) && raw.aspectos.length > 0) {
    items = raw.aspectos.map((asp: any, idx: number) => {
      const critList = cleanCriterioCodes(asp.criterio || (Array.isArray(asp.criterios) ? asp.criterios.join(',') : ''));
      return {
        id: asp.id || `item-asp-${idx + 1}-${Date.now()}`,
        order: idx + 1,
        title: asp.nombre || asp.titulo || `Aspecto ${idx + 1}`,
        criterios: critList,
        criterioText: critList.join(', '),
        peso: Number(asp.peso) || undefined,
        niveles: Array.isArray(asp.niveles) ? asp.niveles : [
          { desc: 'Insuficiente', puntos: 2.5 },
          { desc: 'Suficiente', puntos: 5.0 },
          { desc: 'Notable', puntos: 7.5 },
          { desc: 'Sobresaliente', puntos: 10.0 }
        ]
      };
    });
  } else if (Array.isArray(raw.items) && raw.items.length > 0) {
    items = raw.items.map((it: any, idx: number) => {
      let crits: string[] = [];
      if (Array.isArray(it.criterios)) {
        crits = it.criterios;
      } else if (it.criterio) {
        crits = cleanCriterioCodes(String(it.criterio));
      }
      return {
        id: it.id || `item-${idx + 1}-${Date.now()}`,
        order: Number(it.order) || (idx + 1),
        title: it.title || it.nombre || `Ítem ${idx + 1}`,
        criterios: crits,
        criterioText: crits.join(', '),
        peso: it.peso !== undefined ? Number(it.peso) : undefined,
        maxScore: it.maxScore !== undefined ? Number(it.maxScore) : undefined,
        apartado: it.apartado || 'General',
        niveles: Array.isArray(it.niveles) ? it.niveles : undefined
      };
    });
  }

  const allCrits = new Set<string>();
  items.forEach(it => (it.criterios || []).forEach(c => allCrits.add(c)));

  return {
    id: raw.id || `rub-${Date.now()}`,
    nombre,
    tipo: tipoNorm,
    descripcion: raw.descripcion || `Rúbrica de ${tipoNorm}`,
    fechaCreacion: raw.fechaCreacion || new Date().toISOString(),
    fechaModificacion: new Date().toISOString(),
    version: raw.version || 1,
    apartados: raw.apartados || Array.from(new Set(items.map(i => i.apartado || 'General'))),
    items,
    criteriosAsociados: Array.from(allCrits)
  };
}

/**
 * Recibe un array de puntuaciones de ítems por alumno y calcula las notas por criterio con soporte para MEDIA PONDERADA (pesos) o media simple.
 */
export function calculateCriterionAveragesFromRubric(
  rubricaItems: UnifiedRubricItem[],
  tipo: RubricType | string,
  itemScores: Record<string, number>
): { itemConverted: Record<string, number>; criterionAverages: Record<string, number>; overallGrade: number | null } {
  const itemConverted: Record<string, number> = {};
  const criterionScoresMap: Record<string, Array<{ score: number; weight: number }>> = {};
  const tipoNorm = normalizeRubricType(tipo);

  rubricaItems.forEach(item => {
    const rawVal = itemScores[item.id];
    if (rawVal === undefined || rawVal === null || isNaN(rawVal)) {
      return;
    }

    let convertedVal = 0;
    const isOrtItem = item.isOrtografia || item.isExtra || item.titulo === 'Ortografía' || (item.id && String(item.id).startsWith('item-ortografia'));
    if (isOrtItem) {
      convertedVal = Number(rawVal); // Siempre con escala directa (0, 3, 6, 10)
    } else if (tipoNorm === 'examen') {
      const maxP = item.maxScore && item.maxScore > 0 ? item.maxScore : 10;
      convertedVal = (rawVal / maxP) * 10;
    } else {
      convertedVal = Number(rawVal);
    }

    convertedVal = Math.max(0, Math.min(10, convertedVal));
    itemConverted[item.id] = Math.round(convertedVal * 100) / 100;

    const itemWeight = (item.peso !== undefined && item.peso > 0) ? item.peso : 1;

    const critsToUse = (item.criterios && item.criterios.length > 0) ? item.criterios : (item.criterio ? [item.criterio] : []);
    critsToUse.forEach(crit => {
      const cleanCrit = normalizeCriterionCode(crit) || crit;
      if (!criterionScoresMap[cleanCrit]) {
        criterionScoresMap[cleanCrit] = [];
      }
      criterionScoresMap[cleanCrit].push({ score: convertedVal, weight: itemWeight });
      if (crit && crit !== cleanCrit) {
        if (!criterionScoresMap[crit]) {
          criterionScoresMap[crit] = [];
        }
        criterionScoresMap[crit].push({ score: convertedVal, weight: itemWeight });
      }
    });
  });

  const criterionAverages: Record<string, number> = {};
  for (const crit in criterionScoresMap) {
    const entries = criterionScoresMap[crit];
    if (entries.length > 0) {
      const sumWeighted = entries.reduce((acc, e) => acc + (e.score * e.weight), 0);
      const sumWeights = entries.reduce((acc, e) => acc + e.weight, 0);
      const avg = sumWeights > 0 ? sumWeighted / sumWeights : 0;
      criterionAverages[crit] = Math.round(avg * 100) / 100;
    }
  }

  // overallGrade calcula la media de los ítems principales (excluyendo ítems extras / ortografía que puntúan aparte)
  const mainConvertedItems = rubricaItems
    .filter(it => !it.isOrtografia && !it.isExtra && it.titulo !== 'Ortografía' && !(it.id && String(it.id).startsWith('item-ortografia')))
    .map(it => itemConverted[it.id])
    .filter(val => val !== undefined && val !== null);

  let overallGrade: number | null = null;
  if (mainConvertedItems.length > 0) {
    const sumAll = mainConvertedItems.reduce((acc, val) => acc + val, 0);
    overallGrade = Math.round((sumAll / mainConvertedItems.length) * 100) / 100;
  } else {
    const allConverted = Object.values(itemConverted);
    if (allConverted.length > 0) {
      const sumAll = allConverted.reduce((acc, val) => acc + val, 0);
      overallGrade = Math.round((sumAll / allConverted.length) * 100) / 100;
    }
  }

  return { itemConverted, criterionAverages, overallGrade };
}

export function exportTableToExcel(tableId: string, filename: string = 'Resultados.xlsx') {
  const table = document.getElementById(tableId);
  if (!table) {
    alert("No se encontró la tabla de resultados para exportar.");
    return;
  }
  const wb = XLSX.utils.table_to_book(table, { raw: false, sheet: "Resultados" });
  const ws = wb.Sheets["Resultados"];
  if (ws) {
    ws['!cols'] = [{ wch: 32 }];
  }
  const finalName = filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`;
  XLSX.writeFile(wb, finalName);
}

export function parseGeminiRubricResult(geminiJson: any, rawTipo: string, defaultTitle?: string): ParseResult {
  const tipo = normalizeRubricType(rawTipo);
  const detectedTitle = geminiJson.titleRubric || geminiJson.title || defaultTitle || (tipo === 'examen' ? 'Examen Importado con IA' : (tipo === 'trabajo' ? 'Rúbrica de Trabajo con IA' : 'Rúbrica de Actividades con IA'));
  const rawItems = Array.isArray(geminiJson.items) ? geminiJson.items : [];
  const items: UnifiedRubricItem[] = [];
  const warnings: string[] = [];

  rawItems.forEach((it: any, index: number) => {
    const orderNum = typeof it.order === 'number' && it.order > 0 ? it.order : (index + 1);
    const titleText = (it.title || it.descripcion || it.nombre || it.titulo || '').trim();
    if (!titleText) return;

    const rawCritVal = it.criterio || it.criterios || it.criterioId || it.criteria || it.criteriaId || it.criterio_id || it.code || it.codigo || '';
    const crits = cleanCriterioCodes(String(rawCritVal));

    let maxScoreParsed: number | undefined = undefined;
    if (it.maxScore !== undefined && it.maxScore !== null) {
      const p = parseFloat(String(it.maxScore).replace(',', '.'));
      if (!isNaN(p) && p > 0) {
        maxScoreParsed = p;
      }
    }

    let pesoParsed: number | undefined = undefined;
    if (it.peso !== undefined && it.peso !== null) {
      const p = parseFloat(String(it.peso).replace('%', '').replace(',', '.'));
      if (!isNaN(p) && p > 0) {
        pesoParsed = p;
      }
    }

    const primaryCritStr = crits.length > 0 ? crits.join('; ') : normalizeCriterionCode(String(rawCritVal));

    const numActLabel = (it.numActividad || it.orderLabel || '').trim();
    const itemApartado = (it.apartado || it.seccion || it.bloque || 'General').trim() || 'General';

    items.push({
      id: `rub-item-ai-${Date.now()}-${index + 1}`,
      order: orderNum,
      numActividad: numActLabel || undefined,
      orderLabel: numActLabel || undefined,
      title: titleText,
      criterio: primaryCritStr,
      criterios: crits.length > 0 ? crits : (primaryCritStr ? [primaryCritStr] : []),
      criterioText: primaryCritStr,
      peso: pesoParsed || (tipo === 'examen' ? 10 : 10),
      apartado: itemApartado,
      maxScore: maxScoreParsed || (tipo === 'examen' ? (maxScoreParsed || 1) : undefined),
      niveles: Array.isArray(it.niveles) ? it.niveles : (it.descriptores ? [{ desc: String(it.descriptores), puntos: maxScoreParsed || 10 }] : undefined)
    });
  });

  if (items.length === 0) {
    return {
      tipo,
      titulo: detectedTitle,
      items: [],
      apartados: [],
      warnings: [],
      error: 'Gemini no ha podido identificar actividades estructuradas en el documento o imagen proporcionado.'
    };
  }

  const detectedApartados = Array.from(new Set(items.map(i => i.apartado || 'General')));

  return finalizeParseResult(detectedTitle, items, detectedApartados.length > 0 ? detectedApartados : ['General'], tipo, warnings);
}

// Exponer en window para integración con EvaluacionApp en index.html
if (typeof window !== 'undefined') {
  (window as any).rubricEngine = {
    parseRubricFile,
    parseRubricText,
    parseGeminiRubricResult,
    normalizarJerarquiaActividades,
    validarRubrica,
    migrarOConvertirRubricaUnificada,
    calculateCriterionAveragesFromRubric,
    cleanCriterioCodes,
    normalizeCriterionCode,
    normalizeRubricType,
    exportTableToExcel
  };
}
