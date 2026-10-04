import USER_DATASET from './userDataset.json';

    /**
     * Cuaderno de Evaluación por Criterios - ESO Lengua Castellana y Literatura
     * Almacenamiento exclusivo en localStorage, sin frameworks externos.
     */
    const STORAGE_KEY = "cuaderno_evaluacion_lengua_v1";

    // 12 Secciones Oficiales
    const SECCIONES_DEFAULT = [
      { id: "sec-1", nombre: "Actividades y actitud", color: "#2563eb", ponderacion: 10, criterios: ["1.1", "3.2"] },
      { id: "sec-2", nombre: "Lenguas de España y variedades del español", color: "#7c3aed", ponderacion: 5, criterios: ["1.1", "1.2"] },
      { id: "sec-3", nombre: "Comprensión oral", color: "#0891b2", ponderacion: 10, criterios: ["2.1", "2.2"] },
      { id: "sec-4", nombre: "Expresión oral", color: "#059669", ponderacion: 10, criterios: ["3.1", "3.2"] },
      { id: "sec-5", nombre: "Comprensión escrita", color: "#d97706", ponderacion: 10, criterios: ["4.1", "4.2"] },
      { id: "sec-6", nombre: "Expresión escrita", color: "#db2777", ponderacion: 15, criterios: ["5.1", "5.2"] },
      { id: "sec-7", nombre: "Situación de Aprendizaje", color: "#4f46e5", ponderacion: 15, criterios: ["6.1", "10.1"] },
      { id: "sec-8", nombre: "Lectura", color: "#0d9488", ponderacion: 10, criterios: ["7.1"] },
      { id: "sec-9", nombre: "Literatura", color: "#c026d3", ponderacion: 5, criterios: ["8.1"] },
      { id: "sec-10", nombre: "Conocimiento de la lengua", color: "#ea580c", ponderacion: 10, criterios: ["9.1"] },
      { id: "sec-11", nombre: "Ortografía", color: "#e11d48", ponderacion: 5, criterios: ["5.2", "9.1"] },
      { id: "sec-12", nombre: "Otras", color: "#475569", ponderacion: 5, criterios: [] }
    ];

    // Criterios oficiales ESO Lengua Castellana y Literatura (BOCyL LOMLOE)
    const CRITERIOS_DEFAULT = [
      { codigo: "1.1", descripcion: "Reconocer y valorar la diversidad lingüística y dialectal de España y del mundo.", ponderacion: 5 },
      { codigo: "1.2", descripcion: "Identificar prejuicios y estereotipos lingüísticos adoptando una actitud de respeto.", ponderacion: 5 },
      { codigo: "2.1", descripcion: "Comprender e interpretar textos orales y multimodales identificando la información relevante.", ponderacion: 10 },
      { codigo: "2.2", descripcion: "Valorar críticamente el contenido y la forma de textos orales sencillos.", ponderacion: 5 },
      { codigo: "3.1", descripcion: "Planificar y producir textos orales y multimodales con fluidez, coherencia y adecuación.", ponderacion: 10 },
      { codigo: "3.2", descripcion: "Participar de manera activa y dialogante en situaciones comunicativas respetando turnos.", ponderacion: 10 },
      { codigo: "4.1", descripcion: "Comprender e interpretar textos escritos reconociendo la intención del emisor y estructura.", ponderacion: 10 },
      { codigo: "4.2", descripcion: "Valorar críticamente la información y forma de textos escritos diversos.", ponderacion: 5 },
      { codigo: "5.1", descripcion: "Planificar y redactar textos escritos con corrección gramatical, coherencia y adecuación.", ponderacion: 15 },
      { codigo: "5.2", descripcion: "Aplicar normas ortográficas y de puntuación con rigor en la expresión escrita.", ponderacion: 10 },
      { codigo: "6.1", descripcion: "Buscar, seleccionar y contrastar información procedente de diferentes fuentes de forma guiada.", ponderacion: 5 },
      { codigo: "7.1", descripcion: "Leer obras literarias adecuadas a su edad de manera autónoma y reflexiva.", ponderacion: 5 },
      { codigo: "8.1", descripcion: "Comprender e interpretar obras literarias identificando temas, recursos y elementos básicos.", ponderacion: 5 },
      { codigo: "9.1", descripcion: "Formular generalizaciones sobre el funcionamiento de la lengua y aplicar el metalenguaje.", ponderacion: 5 }
    ];

    // Reglas de Premios y Avisos por defecto
    const PREMIOS_DEFAULT = [
      {
        id: "premio-1",
        titulo: "Tareas hechas 3 días seguidos (10 pts)",
        tipo: "premio",
        puntuacion: 10,
        diasConsecutivos: 3,
        mensaje: "¡Premio! Tres días seguidos con las tareas hechas!",
        activo: true
      },
      {
        id: "premio-2",
        titulo: "Sin hacer tareas 3 días seguidos (0 pts)",
        tipo: "advertencia",
        puntuacion: 0,
        diasConsecutivos: 3,
        mensaje: "Vaya, lo sentimos, tres días seguidos, sin hacer las tareas, has ganado una llamada a tutores legales",
        activo: true
      }
    ];

    // Rúbrica ejemplo precargada
    const RUBRICAS_DEFAULT = [
      {
        id: "rub-1",
        titulo: "Expresión Oral y Exposición",
        descripcion: "Rúbrica para valorar exposiciones orales individuales y grupales",
        fechaCreacion: "2025-09-15",
        aspectos: [
          {
            nombre: "Claridad y estructura",
            peso: 35,
            niveles: [
              { desc: "Desordenado, sin introducción ni conclusión", puntos: 2.5 },
              { desc: "Estructura básica pero con dudas", puntos: 5.0 },
              { desc: "Buena organización y orden claro", puntos: 7.5 },
              { desc: "Estructura excelente, transiciones fluidas", puntos: 10.0 }
            ]
          },
          {
            nombre: "Fluidez y pronunciación",
            peso: 35,
            niveles: [
              { desc: "Lectura continua o muletillas constantes", puntos: 2.5 },
              { desc: "Poco fluido, tono monótono", puntos: 5.0 },
              { desc: "Fluidez adecuada y buen volumen", puntos: 7.5 },
              { desc: "Voz expresiva, modulación perfecta y sin muletillas", puntos: 10.0 }
            ]
          },
          {
            nombre: "Uso del lenguaje",
            peso: 30,
            niveles: [
              { desc: "Vocabulario pobre o inadecuado", puntos: 2.5 },
              { desc: "Vocabulario básico aceptable", puntos: 5.0 },
              { desc: "Léxico preciso y variado", puntos: 7.5 },
              { desc: "Rico, culto y adecuado al contexto", puntos: 10.0 }
            ]
          }
        ]
      }
    ];

    // Alumnos ejemplo
    const ALUMNOS_DEFAULT = [
      { id: "alu-1", nombre: "Álvarez Santos, Lucía", orden: 1 },
      { id: "alu-2", nombre: "Blanco Domínguez, Marcos", orden: 2 },
      { id: "alu-3", nombre: "Cano Fernández, Daniela", orden: 3 },
      { id: "alu-4", nombre: "Díaz Gómez, Alejandro", orden: 4 },
      { id: "alu-5", nombre: "García Martínez, Elena", orden: 5 },
      { id: "alu-6", nombre: "López Rodríguez, Hugo", orden: 6 }
    ];

    // Actividades iniciales ejemplo
    const ACTIVIDADES_DEFAULT = [
      {
        id: "act-1",
        seccionId: "sec-1",
        nombre: "Participación y cuaderno",
        metodo: "caritas",
        criterios: ["1.1", "3.2"],
        fechaCreacion: "2025-09-15"
      },
      {
        id: "act-2",
        seccionId: "sec-6",
        nombre: "Redacción descriptiva",
        metodo: "numerica",
        criterios: ["5.1", "5.2"],
        fechaCreacion: "2025-10-02"
      },
      {
        id: "act-3",
        seccionId: "sec-4",
        nombre: "Exposición oral mitología",
        metodo: "rubrica",
        rubricaId: "rub-1",
        criterios: ["3.1", "3.2"],
        fechaCreacion: "2025-10-24"
      }
    ];

    const CALIFICACIONES_DEFAULT = {
      "act-1": { "alu-1": 10, "alu-2": 5, "alu-3": 10, "alu-4": 0, "alu-5": 10, "alu-6": 5 },
      "act-2": { "alu-1": 8.5, "alu-2": 4.5, "alu-3": 9.0, "alu-4": 3.0, "alu-5": 7.5, "alu-6": 6.0 },
      "act-3": { "alu-1": 9.0, "alu-2": 5.0, "alu-3": 8.5, "alu-4": 4.0, "alu-5": 9.5, "alu-6": 7.0 }
    };

    class EvaluacionApp {
      constructor() {
        this.data = null;
        this.grupoActivo = null;
        this.evaluacionActiva = "eval1"; // eval1 | eval2 | eval3 | final
        this.vistaActiva = "cuaderno"; // cuaderno | resultados | configuracion
        this.subConfigActiva = "cursos";
        this.activeGearMenu = null;
        this.rubricaEvaluando = null; // { actividadId, alumnoId, selecciones: [] }
        this.actividadesSeleccionadas = new Set();
        this.alumnoCuadernoSeleccionadoId = null;
        this.filtroSeccionNumero = "";
        this.filtroAlumnoResultados = "";
        this.filtroFechaActividades = "";
        this.mostrarOcultas = false;
        this.anchosColumnas = {};
        this.cloudStatus = { state: 'connecting', user: null, lastSynced: null };
        this.popoverNubeAbierto = false;
        this.autoSiguienteAlumno = localStorage.getItem("autoSiguienteAlumno") === "true";
        this.soloPendientes = localStorage.getItem("soloPendientes") === "true";
        this.modoAlumnoAleatorio = localStorage.getItem("modoAlumnoAleatorio") === "true";
        this.cropperInstancia = null;
        this.fotoOriginalCapturada = null;
        this.chatbotAbierto = false;
        this.chatbotHistorial = [];
        this.chatbotCargado = false;
        try {
          localStorage.removeItem("modoVistaResultados");
          localStorage.removeItem("modoVistaCuaderno");
        } catch (e) {}
        this.cargarAnchosColumnas();
      }

      cargarAnchosColumnas() {
        try {
          const raw = localStorage.getItem("cuaderno_col_widths");
          if (raw) this.anchosColumnas = JSON.parse(raw);
        } catch (e) {
          this.anchosColumnas = {};
        }
      }

      guardarAnchosColumnas() {
        try {
          localStorage.setItem("cuaderno_col_widths", JSON.stringify(this.anchosColumnas));
        } catch (e) {}
      }

      normalizarTipoActividad(tipoRaw, titulo) {
        const str = String(tipoRaw || '').trim().toLowerCase();
        if (str.includes("exam") || str.includes("control") || str.includes("prueba")) return "Examen";
        if (str.includes("trabaj") || str.includes("proyecto")) return "Trabajo";
        if (titulo) {
          const tStr = String(titulo).trim().toLowerCase();
          if (tStr.includes("exam") || tStr.includes("control") || tStr.includes("prueba")) return "Examen";
          if (tStr.includes("trabaj") || tStr.includes("proyecto")) return "Trabajo";
        }
        return "Actividad";
      }

      isTipoExamen(tipo, titulo) {
        if (!tipo && !titulo) return false;
        const s = String(tipo || "").toLowerCase().trim();
        if (s.includes("exam") || s.includes("control") || s.includes("prueba")) return true;
        if (titulo) {
          const t = String(titulo).toLowerCase().trim();
          if (t.includes("exam") || t.includes("control") || t.includes("prueba")) return true;
        }
        return false;
      }

      isTipoTrabajo(tipo, titulo) {
        if (!tipo && !titulo) return false;
        const s = String(tipo || "").toLowerCase().trim();
        if (s.includes("trabaj") || s.includes("proyecto")) return true;
        if (titulo) {
          const t = String(titulo).toLowerCase().trim();
          if (t.includes("trabaj") || t.includes("proyecto")) return true;
        }
        return false;
      }

      isTipoActividad(tipo, titulo) {
        return !this.isTipoExamen(tipo, titulo) && !this.isTipoTrabajo(tipo, titulo);
      }

      getTipoActividad(act) {
        if (!act) return "Actividad";
        if (act.tipo) {
          const norm = this.normalizarTipoActividad(act.tipo, act.nombre);
          if (norm) return norm;
        }
        if (act.rubricaId && this.grupoActivo && this.grupoActivo.rubricas) {
          const rub = this.grupoActivo.rubricas.find(r => r.id === act.rubricaId);
          if (rub && rub.tipo) {
            return this.normalizarTipoActividad(rub.tipo, rub.titulo || rub.nombre);
          }
        }
        return "Actividad";
      }

      normalizarTiposActividadesYRubricas() {
        if (!this.grupoActivo) return;
        if (this.grupoActivo.rubricas) {
          this.grupoActivo.rubricas.forEach(r => {
            if (r) {
              r.tipo = this.normalizarTipoActividad(r.tipo, r.titulo || r.nombre);
            }
          });
        }
        if (!this.grupoActivo.evaluaciones) {
          this.grupoActivo.evaluaciones = {
            eval1: { actividades: [], calificaciones: {}, observaciones: {} },
            eval2: { actividades: [], calificaciones: {}, observaciones: {} },
            eval3: { actividades: [], calificaciones: {}, observaciones: {} },
            final: { actividades: [], calificaciones: {}, observaciones: {} }
          };
        }
        ["eval1", "eval2", "eval3", "final"].forEach(evKey => {
          const ev = this.grupoActivo.evaluaciones[evKey];
          if (ev && ev.actividades) {
            ev.actividades.forEach(act => {
              if (act) {
                act.tipo = this.getTipoActividad(act);
              }
            });
          }
        });
      }

      iniciarResizeColumna(e, th, colKey) {
        e.preventDefault();
        e.stopPropagation();
        const startX = e.pageX;
        const startWidth = th.offsetWidth;
        const resizer = th.querySelector(".col-resizer");
        if (resizer) resizer.classList.add("resizing");
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";

        const table = th.closest("table") || document.getElementById("tablaCuaderno");

        // 1. Columna de Alumnos
        if (colKey === "col-alumnos") {
          const onMouseMove = (moveEvent) => {
            const dx = moveEvent.pageX - startX;
            const container = document.getElementById("cuadernoTableContainer") || document.getElementById("containerTablaResultados");
            const containerW = container ? container.clientWidth : window.innerWidth;
            const minW = 100;
            const maxW = Math.max(100, containerW - 140);
            const newWidth = Math.min(maxW, Math.max(minW, startWidth + dx));

            const thAlu1 = document.getElementById("thAlu1");
            const thAlu2 = document.getElementById("thAlu2");
            if (thAlu1) { thAlu1.style.width = `${newWidth}px`; thAlu1.style.minWidth = `${newWidth}px`; thAlu1.style.maxWidth = `${maxW}px`; }
            if (thAlu2) { thAlu2.style.width = `${newWidth}px`; thAlu2.style.minWidth = `${newWidth}px`; thAlu2.style.maxWidth = `${maxW}px`; }

            if (table) {
              const cells = table.querySelectorAll("tbody tr td.td-alu-nombre");
              cells.forEach(td => {
                td.style.width = `${newWidth}px`;
                td.style.minWidth = `${newWidth}px`;
                td.style.maxWidth = `${maxW}px`;
              });
            }

            const t1 = document.getElementById("tablaCuaderno");
            const t2 = document.getElementById("tablaResultados");
            if (t1) t1.style.setProperty("--col-alumnos-width", `${newWidth}px`);
            if (t2) t2.style.setProperty("--col-alumnos-width", `${newWidth}px`);
          };

          const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
            if (resizer) resizer.classList.remove("resizing");
            const thAlu2 = document.getElementById("thAlu2");
            if (thAlu2) {
              const finalW = `${thAlu2.offsetWidth}px`;
              this.anchosColumnas["col-alumnos"] = finalW;
              this.guardarAnchosColumnas();
            }
          };

          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
          return;
        }

        // 2. Columna de cabecera de sección desplegada (ajusta proporcionalmente todas sus actividades)
        if (colKey && colKey.startsWith("sec-group-")) {
          const secId = colKey.replace("sec-group-", "");
          const trActHeader = table ? table.querySelector("#trActividadesHeader") : document.getElementById("trActividadesHeader");
          if (!trActHeader) return;

          const actThs = [];
          Array.from(trActHeader.children).forEach((child) => {
            const r = child.querySelector(".col-resizer");
            if (r && r.onmousedown) {
              const fnStr = r.onmousedown.toString();
              const match = fnStr.match(/act-([a-zA-Z0-9_-]+)/);
              if (match && match[1]) {
                const actId = match[1];
                const actObj = (this.actividadesEvaluacionActual || []).find(a => String(a.id) === String(actId));
                if (actObj && String(actObj.seccionId) === String(secId)) {
                  actThs.push({ id: actId, th: child, startW: child.offsetWidth });
                }
              }
            }
          });

          if (actThs.length === 0) return;

          const totalStartW = actThs.reduce((sum, item) => sum + item.startW, 0);

          const onMouseMove = (moveEvent) => {
            const dx = moveEvent.pageX - startX;
            const minTotalW = actThs.length * 40;
            const newTotalW = Math.max(minTotalW, totalStartW + dx);
            const actualDx = newTotalW - totalStartW;
            const perActAdd = actualDx / actThs.length;

            actThs.forEach(item => {
              const itemNewW = Math.max(40, Math.round(item.startW + perActAdd));
              item.th.style.width = `${itemNewW}px`;
              item.th.style.minWidth = `${itemNewW}px`;

              const colIdx = Array.from(trActHeader.children).indexOf(item.th);
              if (colIdx >= 0 && table) {
                const cells = table.querySelectorAll(`tbody tr td:nth-child(${colIdx + 1})`);
                cells.forEach(td => {
                  td.style.width = `${itemNewW}px`;
                  td.style.minWidth = `${itemNewW}px`;
                });
              }
            });
          };

          const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
            if (resizer) resizer.classList.remove("resizing");

            actThs.forEach(item => {
              const finalW = `${item.th.offsetWidth}px`;
              this.anchosColumnas[`act-${item.id}`] = finalW;
            });
            this.guardarAnchosColumnas();
          };

          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
          return;
        }

        // 3. Actividad individual (act-), sección plegada (sec-plegada-) o sección vacía (sec-empty-)
        const trActHeader = table ? table.querySelector("#trActividadesHeader") : document.getElementById("trActividadesHeader");
        let targetTh = th;
        if (trActHeader && th.parentNode !== trActHeader) {
          const found = Array.from(trActHeader.children).find(child => {
            const r = child.querySelector(".col-resizer");
            return r && r.onmousedown && r.onmousedown.toString().includes(colKey);
          });
          if (found) targetTh = found;
        }

        let colIndex = -1;
        if (trActHeader && targetTh) {
          colIndex = Array.from(trActHeader.children).indexOf(targetTh);
        } else if (targetTh && targetTh.parentNode) {
          colIndex = Array.from(targetTh.parentNode.children).indexOf(targetTh);
        }

        let minW = 40;
        let maxW = 1000;
        if (colKey && colKey.startsWith("sec-plegada-")) {
          minW = 36;
          maxW = 350;
        } else if (colKey && (colKey.startsWith("act-") || colKey.startsWith("sec-empty-"))) {
          minW = 50;
          maxW = 800;
        }

        const onMouseMove = (moveEvent) => {
          const dx = moveEvent.pageX - startX;
          const newWidth = Math.min(maxW, Math.max(minW, startWidth + dx));

          targetTh.style.width = `${newWidth}px`;
          targetTh.style.minWidth = `${newWidth}px`;
          if (colKey && colKey.startsWith("sec-plegada-")) {
            targetTh.style.maxWidth = `${newWidth}px`;
          }

          if (th !== targetTh) {
            th.style.width = `${newWidth}px`;
            th.style.minWidth = `${newWidth}px`;
            if (colKey && colKey.startsWith("sec-plegada-")) {
              th.style.maxWidth = `${newWidth}px`;
            }
          }

          if (table && colIndex >= 0) {
            const cells = table.querySelectorAll(`tbody tr td:nth-child(${colIndex + 1})`);
            cells.forEach(td => {
              td.style.width = `${newWidth}px`;
              td.style.minWidth = `${newWidth}px`;
              if (colKey && colKey.startsWith("sec-plegada-")) {
                td.style.maxWidth = `${newWidth}px`;
              }
            });
          }
        };

        const onMouseUp = () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
          document.body.style.cursor = "";
          document.body.style.userSelect = "";
          if (resizer) resizer.classList.remove("resizing");

          if (colKey) {
            const finalW = `${targetTh.offsetWidth}px`;
            this.anchosColumnas[colKey] = finalW;
            this.guardarAnchosColumnas();
          }
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      }

      formatearFecha(fechaStr) {
        if (!fechaStr) return "";
        try {
          if (fechaStr.includes("-")) {
            const parts = fechaStr.split("-");
            if (parts.length === 3) {
              const [y, m, d] = parts;
              const yy = y.length === 4 ? y.slice(2) : y;
              return `${d}/${m}/${yy}`;
            }
          }
          return fechaStr;
        } catch (e) {
          return fechaStr;
        }
      }

      escapeHtml(str) {
        if (str === null || str === undefined) return "";
        return String(str)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      }

      // OWASP A03: Protección contra Inyección de Fórmulas CSV / Hojas de Cálculo
      sanitizeCsvField(val) {
        if (val === null || val === undefined) return "";
        let str = String(val);
        // Si comienza con =, +, -, @, tabulación o salto, prefijar con comilla simple
        if (/^[=\+\-@\t\r]/.test(str)) {
          str = "'" + str;
        }
        return str.replace(/"/g, '""');
      }

      recalcularPonderacionesSecciones() {
        if (!this.grupoActivo || !this.grupoActivo.secciones) return;
        const critMap = {};
        (this.grupoActivo.criterios || []).forEach(c => {
          critMap[c.codigo] = Number(c.ponderacion || 0);
        });
        (this.grupoActivo.secciones || []).forEach(sec => {
          if (sec.criterios && sec.criterios.length > 0) {
            sec.ponderacion = sec.criterios.reduce((sum, cod) => sum + (critMap[cod] || 0), 0);
          } else {
            sec.ponderacion = 0;
          }
        });
      }

      ocultarSplashScreen() {
        const splash = document.getElementById("splashScreen");
        if (splash) {
          splash.style.opacity = "0";
          splash.style.pointerEvents = "none";
          setTimeout(() => {
            splash.style.display = "none";
          }, 400);
        }
      }

      consolidarInicializacion(uid) {
        this._initializationCompleted = true;
        window.firebaseAuthCurrentUserUid = uid;
        this.cargarDatos();
        try {
          this.actualizarUI();
        } catch (err) {
          console.error("❌ Error en la inicialización de la interfaz:", err);
        } finally {
          this.ocultarSplashScreen();
        }
      }

      init() {
        this.configurarEventosGlobales();
        this.initNavegacionHistoria();

        window.addEventListener("beforeunload", () => {
          this.guardarDatos(true);
        });

        window.addEventListener("online", () => {
          if (this.data && this.data.hasPendingSync && window.firebaseSync) {
            window.firebaseSync.saveData(this.data, true);
          }
        });

        this.conectarFirebaseSync();
        this.conectarSupabaseSync();

        // Fallback defensivo: Si tras 1.5 segundos no se ha resuelto el estado de inicialización,
        // consolidar el arranque con el usuario disponible o el modo temporal.
        setTimeout(() => {
          if (!this._initializationCompleted) {
            const fallbackUid = (window.firebaseSync && window.firebaseSync.status && window.firebaseSync.status.user)
              ? window.firebaseSync.status.user.uid
              : window.firebaseAuthCurrentUserUid;
            if (fallbackUid) {
              this.consolidarInicializacion(fallbackUid);
            }
          }
        }, 1500);
      }

      ordenarCriterios(criterios) {
        if (!Array.isArray(criterios)) return;
        criterios.sort((a, b) => {
          const codA = (a && a.codigo != null) ? String(a.codigo).trim() : "";
          const codB = (b && b.codigo != null) ? String(b.codigo).trim() : "";
          return codA.localeCompare(codB, undefined, { numeric: true, sensitivity: "base" });
        });
      }

      getStorageKey() {
        const syncUser = (window.firebaseSync && window.firebaseSync.status) ? window.firebaseSync.status.user : null;
        const uid = syncUser && syncUser.uid ? syncUser.uid : (window.firebaseAuthCurrentUserUid || null);
        return uid ? `fernanditio_cuaderno_${uid}` : null;
      }

      cargarDatos() {
        const storageKey = this.getStorageKey();
        let raw = storageKey ? localStorage.getItem(storageKey) : null;

        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (parsed && Array.isArray(parsed.grupos)) {
              this.data = parsed;
            } else {
              this.crearEstructuraBase();
            }
          } catch (e) {
            console.error("Error al leer datos locales, inicializando por defecto", e);
            this.crearEstructuraBase();
          }
        }

        if (!raw) {
          this.crearEstructuraBase();
        }

        if (!this.data.premios || !Array.isArray(this.data.premios) || this.data.premios.length === 0) {
          this.data.premios = JSON.parse(JSON.stringify(PREMIOS_DEFAULT));
        }

        if (!this.data.version) this.data.version = 1;
        if (!this.data.updatedAt) this.data.updatedAt = this.data.lastModified || new Date().toISOString();
        if (!this.data.plantillasRubricas || !Array.isArray(this.data.plantillasRubricas)) {
          this.data.plantillasRubricas = [];
        }

        // Asegurar que todas las actividades dispongan de fecha de creación y los criterios estén ordenados
        if (this.data && this.data.grupos) {
          const validGroupIds = new Set(this.data.grupos.map(g => g.id));

          this.data.grupos.forEach(g => {
            if (!Array.isArray(g.linkedGroupIds)) {
              g.linkedGroupIds = [];
            } else {
              // Limpiar IDs de grupos inválidos o autoreferenciales
              g.linkedGroupIds = g.linkedGroupIds.filter(id => validGroupIds.has(id) && id !== g.id);
            }

            if (!g.incidenciasConfig) g.incidenciasConfig = { vencimiento: "30d" };
            if (!g.incidencias || !Array.isArray(g.incidencias)) g.incidencias = [];

            if (g.criterios) {
              this.ordenarCriterios(g.criterios);
            }
            if (g.rubricas) {
              g.rubricas.forEach(rub => {
                if (!rub.templateId) {
                  rub.templateId = "tmpl-" + rub.id;
                  rub.templateVersion = 1;
                  rub.origenGrupoId = g.id;
                  rub.esCompartida = !!rub.esCompartida;
                } else {
                  if (rub.templateVersion == null) rub.templateVersion = 1;
                  if (!rub.origenGrupoId) rub.origenGrupoId = g.id;
                }

                if (!rub.fechaCreacion) {
                  if (rub.fecha) {
                    rub.fechaCreacion = rub.fecha;
                  } else if (rub.id && rub.id.startsWith("rub-") && !isNaN(Number(rub.id.split("-")[1]))) {
                    const ts = Number(rub.id.split("-")[1]);
                    if (ts > 1000000000) {
                      rub.fechaCreacion = new Date(ts).toISOString().split("T")[0];
                    } else {
                      rub.fechaCreacion = new Date().toISOString().split("T")[0];
                    }
                  } else {
                    rub.fechaCreacion = new Date().toISOString().split("T")[0];
                  }
                }

                // Si la rúbrica es compartida y aún no está en plantillasRubricas, registrarla
                if (rub.esCompartida && !this.data.plantillasRubricas.some(t => t.id === rub.templateId)) {
                  this.data.plantillasRubricas.push({
                    id: rub.templateId,
                    sourceGroupId: rub.origenGrupoId || g.id,
                    titulo: rub.titulo,
                    tipo: rub.tipo,
                    descripcion: rub.descripcion || "",
                    fechaCreacion: rub.fechaCreacion || new Date().toISOString().split("T")[0],
                    version: rub.templateVersion || 1,
                    compartida: true,
                    items: JSON.parse(JSON.stringify(rub.items || rub.aspectos || [])),
                    apartados: rub.apartados ? [...rub.apartados] : []
                  });
                }
              });
            }
            if (g.evaluaciones) {
              Object.values(g.evaluaciones).forEach(ev => {
                (ev.actividades || []).forEach(act => {
                  if (!act.fechaCreacion) {
                    if (act.fecha) {
                      act.fechaCreacion = act.fecha;
                    } else if (act.id && act.id.startsWith("act-") && !isNaN(Number(act.id.replace("act-", "")))) {
                      const d = new Date(Number(act.id.replace("act-", "")));
                      act.fechaCreacion = d.toISOString().split("T")[0];
                    } else {
                      act.fechaCreacion = new Date().toISOString().split("T")[0];
                    }
                  }
                });
              });
            }
          });
        }

        // Grupo activo
        const visibleGroups = (this.data && Array.isArray(this.data.grupos)) ? this.data.grupos.filter(g => !g.oculto) : [];
        if (visibleGroups.length > 0) {
          this.grupoActivo = this.data.grupos.find(g => g.id === this.data.grupoActivoId && !g.oculto) || visibleGroups[0];
          this.data.grupoActivoId = this.grupoActivo ? this.grupoActivo.id : null;
        } else if (this.data && Array.isArray(this.data.grupos) && this.data.grupos.length > 0) {
          this.grupoActivo = this.data.grupos[0];
          this.data.grupoActivoId = this.grupoActivo ? this.grupoActivo.id : null;
        } else {
          this.grupoActivo = null;
          if (this.data) this.data.grupoActivoId = null;
        }

        if (this.grupoActivo && !this.grupoActivo.alumnos) {
          this.grupoActivo.alumnos = [];
        }

        // Recalcular pesos de secciones según suma de sus criterios automáticamente
        this.recalcularPonderacionesSecciones();

        // Por defecto, las columnas de secciones sin evaluar aparecen plegadas; las que ya se hayan evaluado se despliegan
        if (this.grupoActivo && this.grupoActivo.secciones) {
          this.seccionesPlegadas = new Set();
          this.grupoActivo.secciones.forEach(sec => {
            if (!this.seccionTieneEvaluaciones(sec.id)) {
              this.seccionesPlegadas.add(sec.id);
            }
          });
        }

        // Sanear e independizar la estructura de todas las entidades garantizando IDs únicos y estables
        this.sanearEstructuraEIds();
      }

      sanearEstructuraEIds() {
        if (!this.data || !Array.isArray(this.data.grupos)) return;

        let huboCambios = false;
        const setGrupoIds = new Set();

        this.data.grupos.forEach((grupo, gIndex) => {
          // 1. Grupos IDs
          if (!grupo.id || setGrupoIds.has(grupo.id)) {
            const uuid = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : (Date.now() + "-g-" + gIndex + "-" + Math.random().toString(36).substring(2, 9));
            grupo.id = "grupo-" + uuid;
            huboCambios = true;
          }
          setGrupoIds.add(grupo.id);

          // 2. Alumnos IDs
          if (!grupo.alumnos || !Array.isArray(grupo.alumnos)) {
            grupo.alumnos = [];
          } else {
            const setAluIds = new Set();
            grupo.alumnos.forEach((alu, index) => {
              const idValido = alu && alu.id && typeof alu.id === "string" && alu.id.trim() !== "";
              if (!idValido || setAluIds.has(alu.id)) {
                const oldId = alu ? alu.id : null;
                const uuid = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : (Date.now() + "-a-" + index + "-" + Math.random().toString(36).substring(2, 9));
                const newId = "alu-" + uuid;

                if (alu) {
                  alu.id = newId;
                } else {
                  alu = { id: newId, nombre: `Alumno ${index + 1}`, orden: index + 1 };
                  grupo.alumnos[index] = alu;
                }
                huboCambios = true;

                if (oldId && grupo.evaluaciones) {
                  ["eval1", "eval2", "eval3", "final"].forEach(evKey => {
                    const ev = grupo.evaluaciones[evKey];
                    if (ev && ev.calificaciones) {
                      for (const actId in ev.calificaciones) {
                        if (ev.calificaciones[actId] && Object.prototype.hasOwnProperty.call(ev.calificaciones[actId], oldId)) {
                          ev.calificaciones[actId][newId] = ev.calificaciones[actId][oldId];
                          delete ev.calificaciones[actId][oldId];
                        }
                      }
                    }
                    if (ev && ev.calificacionesRubricas) {
                      for (const rubId in ev.calificacionesRubricas) {
                        if (ev.calificacionesRubricas[rubId] && Object.prototype.hasOwnProperty.call(ev.calificacionesRubricas[rubId], oldId)) {
                          ev.calificacionesRubricas[rubId][newId] = ev.calificacionesRubricas[rubId][oldId];
                          delete ev.calificacionesRubricas[rubId][oldId];
                        }
                      }
                    }
                  });

                  if (grupo.incidencias && Array.isArray(grupo.incidencias)) {
                    grupo.incidencias.forEach(inc => {
                      if (inc.alumnoId === oldId) inc.alumnoId = newId;
                    });
                  }
                }
              }

              setAluIds.add(alu.id);

              if (typeof alu.orden !== "number" || isNaN(alu.orden) || alu.orden < 1) {
                alu.orden = index + 1;
                huboCambios = true;
              }
            });
          }

          // 3. Secciones IDs
          if (grupo.secciones && Array.isArray(grupo.secciones)) {
            const setSecIds = new Set();
            grupo.secciones.forEach((sec, sIdx) => {
              if (!sec.id || setSecIds.has(sec.id)) {
                const uuid = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : (Date.now() + "-s-" + sIdx + "-" + Math.random().toString(36).substring(2, 9));
                sec.id = "sec-" + uuid;
                huboCambios = true;
              }
              setSecIds.add(sec.id);
            });
          }

          // 4. Rúbricas IDs
          if (grupo.rubricas && Array.isArray(grupo.rubricas)) {
            const setRubIds = new Set();
            grupo.rubricas.forEach((rub, rIdx) => {
              if (!rub.id || setRubIds.has(rub.id)) {
                const uuid = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : (Date.now() + "-r-" + rIdx + "-" + Math.random().toString(36).substring(2, 9));
                rub.id = "rub-" + uuid;
                huboCambios = true;
              }
              setRubIds.add(rub.id);
            });
          }

          // 5. Actividades IDs
          if (grupo.evaluaciones) {
            ["eval1", "eval2", "eval3", "final"].forEach(evKey => {
              const ev = grupo.evaluaciones[evKey];
              if (ev && ev.actividades && Array.isArray(ev.actividades)) {
                const setActIds = new Set();
                ev.actividades.forEach((act, acIdx) => {
                  if (!act.id || setActIds.has(act.id)) {
                    const uuid = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : (Date.now() + "-act-" + acIdx + "-" + Math.random().toString(36).substring(2, 9));
                    const oldActId = act.id;
                    act.id = "act-" + uuid;
                    huboCambios = true;

                    if (oldActId && ev.calificaciones && Object.prototype.hasOwnProperty.call(ev.calificaciones, oldActId)) {
                      ev.calificaciones[act.id] = ev.calificaciones[oldActId];
                      delete ev.calificaciones[oldActId];
                    }
                  }
                  setActIds.add(act.id);
                });
              }
            });
          }
        });

        if (huboCambios) {
          this.guardarDatos();
        }
      }

      crearEstructuraBase() {
        this.data = JSON.parse(JSON.stringify(USER_DATASET));
        this.guardarDatos();
      }

      guardarDatos(immediate = false) {
        if (this.data) {
          const now = new Date().toISOString();
          this.data.lastModified = now;
          this.data.updatedAt = now;
          this.data.version = (this.data.version || 0) + 1;
          this.data.hasPendingSync = true;
        }
        const storageKey = this.getStorageKey();
        if (storageKey) {
          localStorage.setItem(storageKey, JSON.stringify(this.data));
          if (this.grupoActivo && this.grupoActivo.id) {
            const syncUser = (window.firebaseSync && window.firebaseSync.status) ? window.firebaseSync.status.user : null;
            const uid = syncUser && syncUser.uid ? syncUser.uid : (window.firebaseAuthCurrentUserUid || null);
            if (uid) {
              try {
                localStorage.setItem(`fernanditio_${uid}_group_${this.grupoActivo.id}`, JSON.stringify(this.grupoActivo));
              } catch (e) {}
            }
          }
        }
        if (window.supabaseSync) {
          if (this._supabaseSyncDebounceTimer) {
            clearTimeout(this._supabaseSyncDebounceTimer);
            this._supabaseSyncDebounceTimer = null;
          }

          if (immediate) {
            window.supabaseSync.syncNotebookToSupabase('docente_borborigmo_gmail_com', this.data).catch((e) => {
              console.warn('[Supabase Sync Warning]:', e);
            });
          } else {
            this._supabaseSyncDebounceTimer = setTimeout(() => {
              window.supabaseSync.syncNotebookToSupabase('docente_borborigmo_gmail_com', this.data).catch((e) => {
                console.warn('[Supabase Debounced Sync Warning]:', e);
              });
            }, 600);
          }
        }
      }

      guardarCambiosManual() {
        this.guardarDatos();
        this.mostrarToast("💾 Cambios guardados correctamente en este dispositivo y la nube.");
      }

      triggerTopMenuReveal() {
        if (!document.body.classList.contains("scrolled-actividades")) return;

        document.body.classList.add("header-revealed");

        if (this.topMenuTimer) {
          clearTimeout(this.topMenuTimer);
        }

        this.topMenuTimer = setTimeout(() => {
          document.body.classList.remove("header-revealed");
          this.topMenuTimer = null;
        }, 5000);
      }

      configurarEventosGlobales() {
        // Auto-selección y eliminación de texto/número por defecto al enfocar y comenzar a escribir en cualquier campo
        document.addEventListener("focusin", (e) => {
          const el = e.target;
          if (!el || !(el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;

          el.dataset.justFocused = "true";
          el.dataset.shouldClearOnType = "true";

          if (typeof el.select === "function") {
            try {
              el.select();
            } catch (err) {}
          }
        }, true);

        document.addEventListener("click", (e) => {
          const el = e.target;
          if (!el || !(el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
          if (el.dataset.justFocused === "true") {
            delete el.dataset.justFocused;
            if (typeof el.select === "function") {
              try {
                el.select();
              } catch (err) {}
            }
          } else {
            const menu = document.getElementById("gearDropdownMenu");
            if (menu && !menu.contains(e.target) && !e.target.classList.contains("gear-btn")) {
              menu.classList.remove("show");
            }
            const moreMenu = document.getElementById("mobileMoreMenu");
            const btnMas = document.getElementById("btnMobileMas");
            if (moreMenu && moreMenu.classList.contains("open")) {
              if (!moreMenu.contains(e.target) && (!btnMas || !btnMas.contains(e.target))) {
                this.cerrarMobileMasMenu();
              }
            }
          }
        });

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            this.cerrarMobileMasMenu();
          }
          const el = e.target;
          if (!el || !(el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;

          const isNavKey = ["Tab", "Enter", "Escape", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Backspace", "Delete"].includes(e.key) || e.ctrlKey || e.altKey || e.metaKey;

          if (el.dataset.shouldClearOnType === "true" && !isNavKey && e.key && e.key.length === 1) {
            const val = el.value;
            const isFullySelected = (el.selectionStart === 0 && el.selectionEnd === val.length && val.length > 0);

            if (!isFullySelected) {
              if (val === "0" || val === "0.0" || el.type === "number") {
                el.value = "";
              }
            }
            delete el.dataset.shouldClearOnType;
          }
        }, true);

        document.addEventListener("input", (e) => {
          const el = e.target;
          if (!el || !(el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;

          if (el.type === "number" && /^0[0-9]+$/.test(el.value)) {
            el.value = el.value.replace(/^0+/, "");
          }
        }, true);

        // Eventos para bloqueo de fila de actividades y revelado del menú superior por 5s al aproximar cursor al borde superior
        const handleScroll = () => {
          if (this.vistaActiva !== "cuaderno") {
            document.body.classList.remove("scrolled-actividades", "header-revealed");
            if (this.topMenuTimer) {
              clearTimeout(this.topMenuTimer);
              this.topMenuTimer = null;
            }
            return;
          }

          const container = document.getElementById("cuadernoTableContainer");
          const scrollTop = (container ? container.scrollTop : 0) || (window.scrollY || window.pageYOffset || 0);

          if (scrollTop > 20) {
            document.body.classList.add("scrolled-actividades");
          } else {
            document.body.classList.remove("scrolled-actividades", "header-revealed");
            if (this.topMenuTimer) {
              clearTimeout(this.topMenuTimer);
              this.topMenuTimer = null;
            }
          }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        document.addEventListener("DOMContentLoaded", () => {
          const container = document.getElementById("cuadernoTableContainer");
          if (container) {
            container.addEventListener("scroll", handleScroll, { passive: true });
          }
        });

        // Detección de movimiento del ratón en la zona superior (top 20px)
        window.addEventListener("mousemove", (e) => {
          if (this.vistaActiva !== "cuaderno" || !document.body.classList.contains("scrolled-actividades")) return;

          if (e.clientY <= 20) {
            this.triggerTopMenuReveal();
          }
        });

        const trigger = document.getElementById("topHoverTrigger");
        if (trigger) {
          trigger.addEventListener("mouseenter", () => this.triggerTopMenuReveal());
          trigger.addEventListener("touchstart", () => this.triggerTopMenuReveal(), { passive: true });
        }

        const headerEl = document.querySelector("header");
        const evalBarEl = document.querySelector(".eval-selector-bar");
        [headerEl, evalBarEl].forEach(el => {
          if (el) {
            el.addEventListener("mouseenter", () => this.triggerTopMenuReveal());
            el.addEventListener("mousemove", () => this.triggerTopMenuReveal());
          }
        });

        // Recalcular responsive cuando el viewport cambia de tamaño u orientación
        window.addEventListener("resize", () => {
          if (this.vistaActiva === "cuaderno") {
            this.actualizarUI();
          }
        }, { passive: true });

        if (window.visualViewport) {
          window.visualViewport.addEventListener("resize", () => {
            if (this.vistaActiva === "cuaderno") {
              this.actualizarUI();
            }
          }, { passive: true });
        }
      }

      // --- NAVEGACIÓN Y HISTORIA (BOTÓN ATRÁS MÓVIL) ---
      initNavegacionHistoria() {
        if (typeof window !== "undefined" && window.history) {
          try {
            window.history.replaceState({ type: "view", view: "cuaderno", isRoot: true }, "");
            window.history.pushState({ type: "view", view: "cuaderno" }, "");
          } catch (e) {}
          window.addEventListener("popstate", (e) => this.manejarBotonAtras(e));
        }
      }

      manejarBotonAtras(e) {
        if (this.permitirSalir) {
          return;
        }

        if (this.isClosingModalProgrammatically) {
          this.isClosingModalProgrammatically = false;
          return;
        }

        // 1. Si hay modal(es) abierto(s), cerrar el modal de nivel superior primero
        const openModals = Array.from(document.querySelectorAll(".modal-overlay.open"));
        if (openModals.length > 0) {
          const topModal = openModals[openModals.length - 1];
          if (topModal) {
            this.cerrarModal(topModal.id, true);
            return;
          }
        }

        // 2. Si no estamos en la vista 'cuaderno' ("Actividades"), ir a 'cuaderno'
        if (this.vistaActiva !== "cuaderno") {
          this.cambiarVista("cuaderno", false);
          return;
        }

        // 3. Estamos en la vista 'cuaderno' ("Actividades") sin modales abiertos y se aprieta 'Atrás'.
        // Volver a empujar el estado para evitar salir directamente sin confirmar y mostrar el aviso
        try {
          window.history.pushState({ type: "view", view: "cuaderno" }, "");
        } catch (err) {}

        this.mostrarConfirmacionSalirApp();
      }

      mostrarConfirmacionSalirApp() {
        this.abrirModal("modalSalirApp", false);
      }

      confirmarSalirApp() {
        this.permitirSalir = true;
        this.cerrarModal("modalSalirApp", true);
        if (typeof window !== "undefined" && window.history && window.history.length > 1) {
          window.history.go(-2);
        } else {
          try {
            window.close();
          } catch (e) {}
        }
      }

      // --- NAVEGACIÓN Y VISTAS ---
      cambiarVista(vista, pushState = true) {
        if (pushState && vista !== this.vistaActiva && typeof window !== "undefined" && window.history) {
          try {
            window.history.pushState({ type: "view", view: vista }, "");
          } catch (e) {}
        }
        this.vistaActiva = vista;
        document.body.classList.remove("scrolled-actividades", "header-revealed");
        if (this.topMenuTimer) {
          clearTimeout(this.topMenuTimer);
          this.topMenuTimer = null;
        }
        const trigger = document.getElementById("topHoverTrigger");
        if (trigger) trigger.style.display = "none";

        const btnCuaderno = document.getElementById("btnViewCuaderno");
        const btnRubricas = document.getElementById("btnViewRubricas");
        const btnResultados = document.getElementById("btnViewResultados");
        const btnConfig = document.getElementById("btnHeaderConfig");

        const btnMobileCuaderno = document.getElementById("btnMobileCuaderno");
        const btnMobileFiltro = document.getElementById("btnMobileFiltro");
        const btnMobileRubricas = document.getElementById("btnMobileRubricas");
        const btnMobileConfig = document.getElementById("btnMobileConfig");
        const btnMobileMas = document.getElementById("btnMobileMas");

        if (btnCuaderno) btnCuaderno.classList.remove("active");
        if (btnRubricas) btnRubricas.classList.remove("active");
        if (btnResultados) btnResultados.classList.remove("active");
        if (btnConfig) btnConfig.classList.remove("active");

        if (btnMobileCuaderno) btnMobileCuaderno.classList.remove("active");
        if (btnMobileFiltro) btnMobileFiltro.classList.remove("active");
        if (btnMobileRubricas) btnMobileRubricas.classList.remove("active");
        if (btnMobileConfig) btnMobileConfig.classList.remove("active");
        if (btnMobileMas) btnMobileMas.classList.remove("active");

        const itemMoreResultados = document.getElementById("btnMoreResultados");
        const tagMoreResultados = document.getElementById("tagMoreResultadosActive");
        if (itemMoreResultados) itemMoreResultados.classList.remove("active");
        if (tagMoreResultados) tagMoreResultados.style.display = "none";

        document.querySelectorAll(".view-panel").forEach(p => p.classList.remove("active"));

        const tabFinal = document.getElementById("tabFinal");
        const wrapCuaderno = document.getElementById("evalDropdownWrapCuaderno");
        const tabsResultados = document.getElementById("evalTabsResultados");

        if (vista === "cuaderno") {
          if (btnCuaderno) btnCuaderno.classList.add("active");
          if (btnMobileCuaderno) btnMobileCuaderno.classList.add("active");
          document.getElementById("vistaCuaderno").classList.add("active");
          document.getElementById("cuadernoQuickActions").style.display = "flex";
          if (wrapCuaderno) wrapCuaderno.style.display = "inline-flex";
          if (tabsResultados) tabsResultados.style.display = "none";
          if (tabFinal) tabFinal.style.display = "none";

          if (this.evaluacionActiva === "final") {
            this.cambiarEvaluacion("eval1");
          } else {
            const sel = document.getElementById("selectEvaluacionCuaderno");
            if (sel) sel.value = this.evaluacionActiva;
            this.renderizarCuaderno();
          }
        } else if (vista === "rubricas") {
          if (btnRubricas) btnRubricas.classList.add("active");
          if (btnMobileRubricas) btnMobileRubricas.classList.add("active");
          document.getElementById("vistaRubricas").classList.add("active");
          document.getElementById("cuadernoQuickActions").style.display = "none";
          if (wrapCuaderno) wrapCuaderno.style.display = "none";
          if (tabsResultados) tabsResultados.style.display = "none";
          if (tabFinal) tabFinal.style.display = "none";
          this.renderizarRubricasView();
        } else if (vista === "resultados") {
          if (btnResultados) btnResultados.classList.add("active");
          if (btnMobileMas) btnMobileMas.classList.add("active");
          if (itemMoreResultados) itemMoreResultados.classList.add("active");
          if (tagMoreResultados) tagMoreResultados.style.display = "inline-block";
          document.getElementById("vistaResultados").classList.add("active");
          document.getElementById("cuadernoQuickActions").style.display = "none";
          if (wrapCuaderno) wrapCuaderno.style.display = "none";
          if (tabsResultados) tabsResultados.style.display = "inline-flex";
          if (tabFinal) {
            tabFinal.style.display = "inline-flex";
            tabFinal.textContent = "Final";
          }
          this.renderizarResultados();
        } else if (vista === "configuracion") {
          if (btnConfig) btnConfig.classList.add("active");
          if (btnMobileConfig) btnMobileConfig.classList.add("active");
          document.getElementById("vistaConfiguracion").classList.add("active");
          document.getElementById("cuadernoQuickActions").style.display = "none";
          if (wrapCuaderno) wrapCuaderno.style.display = "none";
          if (tabsResultados) tabsResultados.style.display = "none";
          if (tabFinal) tabFinal.style.display = "none";
          this.renderizarConfiguracion();
        }
      }

      // --- MENÚ EMERGENTE MÁS OPCIONES (MÓVIL) ---
      toggleMobileMasMenu(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        const menu = document.getElementById("mobileMoreMenu");
        const backdrop = document.getElementById("mobileMoreBackdrop");
        if (!menu) return;

        if (menu.classList.contains("open")) {
          this.cerrarMobileMasMenu();
        } else {
          menu.classList.add("open");
          if (backdrop) backdrop.classList.add("open");

          const itemResultados = document.getElementById("btnMoreResultados");
          const tagResultados = document.getElementById("tagMoreResultadosActive");
          if (itemResultados) {
            if (this.vistaActiva === "resultados") {
              itemResultados.classList.add("active");
              if (tagResultados) tagResultados.style.display = "inline-block";
            } else {
              itemResultados.classList.remove("active");
              if (tagResultados) tagResultados.style.display = "none";
            }
          }
        }
      }

      cerrarMobileMasMenu() {
        const menu = document.getElementById("mobileMoreMenu");
        const backdrop = document.getElementById("mobileMoreBackdrop");
        if (menu) menu.classList.remove("open");
        if (backdrop) backdrop.classList.remove("open");
      }

      seleccionarMasOpcion(opcion) {
        this.cerrarMobileMasMenu();
        if (opcion === "resultados") {
          this.cambiarVista("resultados");
        } else if (opcion === "diario") {
          this.abrirModalDiarioClase();
        } else if (opcion === "exportar") {
          if (this.vistaActiva === "resultados") {
            this.exportarResultadosExcel();
          } else {
            this.exportarCSV();
          }
        } else if (opcion === "guardar") {
          this.guardarCambiosManual();
        } else if (opcion === "asistente") {
          this.alternarChatbot();
        }
      }

      // --- SISTEMA DE RÚBRICAS INTEGRADO ---
      renderizarRubricasView() {
        if (!this.grupoActivo) return;
        const rubricas = this.grupoActivo.rubricas || [];
        const countSpan = document.getElementById("countRubricasGrupo");
        if (countSpan) countSpan.textContent = rubricas.length;

        const countHeader = document.getElementById("countCatalogoBtnHeader");
        if (countHeader) countHeader.textContent = rubricas.length;

        const container = document.getElementById("listaRubricasSeccionPrincipal");
        if (!container) return;
        container.innerHTML = "";

        if (rubricas.length === 0) {
          container.innerHTML = `
            <div style="background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 24px; text-align: center; color: var(--text-muted);">
              <p style="font-size: 0.95rem; font-weight: 600; margin-bottom: 6px;">No hay ninguna rúbrica guardada en este curso.</p>
              <p style="font-size: 0.8rem;">Utiliza alguno de los 4 botones inferiores para gestionar o crear una rúbrica de Actividades, Examen o Trabajo.</p>
            </div>
          `;
          return;
        }

        // Mostrar únicamente las 3 más recientes en el panel principal
        const rubricasOrdenadas = [...rubricas].reverse();
        const ultimas3 = rubricasOrdenadas.slice(0, 3);

        ultimas3.forEach(rub => {
          const card = document.createElement("div");
          card.style.background = "#ffffff";
          card.style.border = "1px solid var(--border)";
          card.style.borderRadius = "10px";
          card.style.padding = "14px 18px";
          card.style.display = "flex";
          card.style.justifyContent = "space-between";
          card.style.alignItems = "center";
          card.style.flexWrap = "wrap";
          card.style.gap = "12px";

          const normType = this.normalizarTipoActividad(rub.tipo);
          let tipoBadge = "";
          if (normType === "Examen") {
            tipoBadge = `<span style="background: #fce7f3; color: #9d174d; border: 1px solid #fbcfe8; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">💯 EXAMEN</span>`;
          } else if (normType === "Trabajo") {
            tipoBadge = `<span style="background: #ffedd5; color: #9a3412; border: 1px solid #fed7aa; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">📊 TRABAJO</span>`;
          } else {
            tipoBadge = `<span style="background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">📝 ACTIVIDAD</span>`;
          }

          const itemsCount = rub.items ? rub.items.length : (rub.aspectos ? rub.aspectos.length : 0);
          const distinctCrit = rub.items ? Array.from(new Set(rub.items.map(i => i.criterio).filter(Boolean))).join(", ") : "";
          const fechaStr = rub.fechaCreacion || rub.fecha || "";
          const fechaFmt = fechaStr ? this.formatearFecha(fechaStr.split("T")[0]) : "";

          card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 240px;">
              <input type="checkbox" class="chk-rubrica" value="${rub.id}" onchange="app.actualizarContadorRubricasSeleccionadas()" style="width: 18px; height: 18px; cursor: pointer; accent-color: #ef4444;" />
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                  <strong style="font-size: 1rem; color: var(--text);">${this.escapeHtml(rub.titulo)}</strong>
                  ${tipoBadge}
                  ${rub.esCompartida ? `<span style="background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 2px 7px; border-radius: 4px; font-size: 0.73rem; font-weight: 700;">🔗 Compartida (v${rub.templateVersion || 1})</span>` : ''}
                  ${fechaFmt ? `<span style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">📅 Creada: ${fechaFmt}</span>` : ''}
                </div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">
                  ${itemsCount} ítems/preguntas ${distinctCrit ? `• Criterios: [${distinctCrit}]` : ""}
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm" onclick="app.abrirEvaluarRubrica('${rub.id}')">
                📊 Evaluar
              </button>
              <button class="btn btn-secondary btn-sm" onclick="app.modalEditRubrica('${rub.id}')">
                ✏️ Editar
              </button>
              <button class="btn btn-danger btn-sm" onclick="app.solicitarEliminarRubrica('${rub.id}')">
                🗑️ Eliminar
              </button>
            </div>
          `;
          container.appendChild(card);
        });

        // Si hay más de 3 rúbricas, mostrar banner directo al Catálogo
        if (rubricas.length > 3) {
          const catalogBanner = document.createElement("div");
          catalogBanner.style.background = "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)";
          catalogBanner.style.border = "1.5px solid #93c5fd";
          catalogBanner.style.borderRadius = "10px";
          catalogBanner.style.padding = "16px";
          catalogBanner.style.textAlign = "center";
          catalogBanner.style.marginTop = "6px";
          catalogBanner.style.boxShadow = "0 2px 8px rgba(37, 99, 235, 0.08)";
          catalogBanner.innerHTML = `
            <div style="font-size: 0.92rem; font-weight: 700; color: #1e40af; margin-bottom: 4px;">
              📁 Mostrando las 3 rúbricas más recientes (${rubricas.length - 3} rúbricas anteriores ocultas)
            </div>
            <div style="font-size: 0.8rem; color: #3b82f6; margin-bottom: 12px;">
              Las rúbricas realizadas anteriores se guardan en el catálogo para mantener el panel ágil.
            </div>
            <button class="btn btn-primary" onclick="app.abrirModalCatalogoRubricas()" style="font-weight: 800; background: linear-gradient(135deg, #1e40af, #2563eb); border: none; padding: 9px 22px; border-radius: 8px; font-size: 0.9rem; cursor: pointer; box-shadow: 0 4px 10px -2px rgba(30,64,175,0.3);">
              📖 Abrir Catálogo Completo de Rúbricas (${rubricas.length})
            </button>
          `;
          container.appendChild(catalogBanner);
        } else {
          const catalogBanner = document.createElement("div");
          catalogBanner.style.textAlign = "center";
          catalogBanner.style.marginTop = "8px";
          catalogBanner.innerHTML = `
            <button class="btn btn-secondary btn-sm" onclick="app.abrirModalCatalogoRubricas()" style="font-weight: 700; font-size: 0.82rem; padding: 6px 14px;">
              📖 Consultar Catálogo Completo (${rubricas.length})
            </button>
          `;
          container.appendChild(catalogBanner);
        }

        // Mostrar plantillas compartidas de grupos vinculados listas para usar
        const linkedGroupIds = this.grupoActivo.linkedGroupIds || [];
        const plantillasDisponibles = (this.data.plantillasRubricas || []).filter(tmpl => {
          if (!tmpl.compartida) return false;
          if (!linkedGroupIds.includes(tmpl.sourceGroupId)) return false;
          const alreadyApplied = (this.grupoActivo.rubricas || []).some(r => r.templateId === tmpl.id);
          return !alreadyApplied;
        });

        if (plantillasDisponibles.length > 0) {
          const sharedSection = document.createElement("div");
          sharedSection.style.marginTop = "20px";
          sharedSection.style.background = "#f0fdf4";
          sharedSection.style.border = "1.5px solid #86efac";
          sharedSection.style.borderRadius = "12px";
          sharedSection.style.padding = "16px 18px";
          sharedSection.style.boxShadow = "0 2px 8px rgba(22, 163, 74, 0.08)";

          let sharedHtml = `
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
              <div>
                <h4 style="margin: 0; font-size: 0.96rem; font-weight: 800; color: #15803d; display: flex; align-items: center; gap: 6px;">
                  <span>📥</span> Rúbricas compartidas de grupos vinculados (${plantillasDisponibles.length})
                </h4>
                <div style="font-size: 0.78rem; color: #166534;">
                  Plantillas disponibles para <strong>${this.grupoActivo.nombre}</strong>. Calificaciones, alumnos y notas 100% aislados.
                </div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
          `;

          plantillasDisponibles.forEach(tmpl => {
            const sourceGrp = (this.data.grupos || []).find(g => g.id === tmpl.sourceGroupId);
            const sourceName = sourceGrp ? sourceGrp.nombre : "Grupo vinculado";
            const itemsCount = tmpl.items ? tmpl.items.length : 0;
            const normType = this.normalizarTipoActividad(tmpl.tipo);

            let tBadge = "";
            if (normType === "Examen") {
              tBadge = `<span style="background: #fce7f3; color: #9d174d; border: 1px solid #fbcfe8; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">💯 EXAMEN</span>`;
            } else if (normType === "Trabajo") {
              tBadge = `<span style="background: #ffedd5; color: #9a3412; border: 1px solid #fed7aa; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">📊 TRABAJO</span>`;
            } else {
              tBadge = `<span style="background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">📝 ACTIVIDAD</span>`;
            }

            sharedHtml += `
              <div style="background: #ffffff; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                    <strong style="color: #0f172a; font-size: 0.95rem;">${tmpl.titulo}</strong>
                    ${tBadge}
                    <span style="font-size: 0.75rem; background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; padding: 2px 6px; border-radius: 4px; font-weight: 600;">📍 Origen: ${sourceName}</span>
                    <span style="font-size: 0.75rem; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 4px; font-weight: 600;">v${tmpl.version || 1}</span>
                  </div>
                  <div style="font-size: 0.78rem; color: #64748b;">
                    ${itemsCount} ítems/preguntas definidas
                  </div>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  <button class="btn btn-secondary btn-sm" onclick="app.previsualizarPlantillaCompartida('${tmpl.id}')" style="font-size: 0.8rem;">
                    👁️ Previsualizar
                  </button>
                  <button class="btn btn-success btn-sm" onclick="app.instanciarRubricaCompartida('${tmpl.id}')" style="font-size: 0.8rem; background: #16a34a; border-color: #15803d; color: #ffffff; font-weight: 700;">
                    📥 Usar en este grupo
                  </button>
                  <button class="btn btn-primary btn-sm" onclick="app.instanciarRubricaCompartida('${tmpl.id}', true)" style="font-size: 0.8rem; font-weight: 700;">
                    📊 Evaluar
                  </button>
                </div>
              </div>
            `;
          });

          sharedHtml += `</div></div>`;
          sharedSection.innerHTML = sharedHtml;
          container.appendChild(sharedSection);
        }

        this.actualizarContadorRubricasSeleccionadas();
      }

      abrirModalCatalogoRubricas() {
        if (!this.grupoActivo) return;
        this.filtroTipoCatalogo = 'todos';
        
        const inputSearch = document.getElementById("searchCatalogoRubricasInput");
        if (inputSearch) inputSearch.value = "";

        const buttons = document.querySelectorAll(".filter-btn-cat");
        buttons.forEach(btn => {
          if (btn.getAttribute("data-type") === "todos") {
            btn.classList.add("btn-primary", "active");
            btn.classList.remove("btn-secondary");
          } else {
            btn.classList.remove("btn-primary", "active");
            btn.classList.add("btn-secondary");
          }
        });

        this.renderizarCatalogoRubricas();
        this.abrirModal("modalCatalogoRubricas");
      }

      setFiltroTipoCatalogo(tipo, btnEl) {
        this.filtroTipoCatalogo = tipo || 'todos';
        const buttons = document.querySelectorAll(".filter-btn-cat");
        buttons.forEach(b => {
          b.classList.remove("btn-primary", "active");
          b.classList.add("btn-secondary");
        });
        if (btnEl) {
          btnEl.classList.add("btn-primary", "active");
          btnEl.classList.remove("btn-secondary");
        }
        this.renderizarCatalogoRubricas();
      }

      filtrarCatalogoRubricas() {
        this.renderizarCatalogoRubricas();
      }

      renderizarCatalogoRubricas() {
        if (!this.grupoActivo) return;
        const rubricas = this.grupoActivo.rubricas || [];
        const container = document.getElementById("contenedorListaCatalogoRubricas");
        if (!container) return;

        container.innerHTML = "";

        const badgeTotal = document.getElementById("badgeTotalCatalogo");
        if (badgeTotal) badgeTotal.textContent = `${rubricas.length} rúbricas`;

        const searchVal = (document.getElementById("searchCatalogoRubricasInput")?.value || "").toLowerCase().trim();
        const tipoFiltro = this.filtroTipoCatalogo || "todos";

        let filtradas = rubricas.filter(rub => {
          if (tipoFiltro !== "todos") {
            const normType = this.normalizarTipoActividad(rub.tipo);
            if (tipoFiltro === "actividad" && normType !== "Actividad") return false;
            if (tipoFiltro === "examen" && normType !== "Examen") return false;
            if (tipoFiltro === "trabajos" && normType !== "Trabajo") return false;
          }
          if (searchVal) {
            const inTitulo = (rub.titulo || "").toLowerCase().includes(searchVal);
            const inItems = rub.items ? rub.items.some(i => (i.title || "").toLowerCase().includes(searchVal) || (i.criterio || "").toLowerCase().includes(searchVal)) : false;
            return inTitulo || inItems;
          }
          return true;
        });

        const infoSpan = document.getElementById("infoResultadosCatalogo");
        if (infoSpan) {
          infoSpan.textContent = `Mostrando ${filtradas.length} de ${rubricas.length} rúbricas`;
        }

        if (filtradas.length === 0) {
          container.innerHTML = `
            <div style="background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 24px; text-align: center; color: var(--text-muted);">
              <p style="font-size: 0.92rem; font-weight: 600; margin: 0;">No se encontraron rúbricas que coincidan con la búsqueda.</p>
            </div>
          `;
          return;
        }

        const filtradasOrdenadas = [...filtradas].reverse();

        filtradasOrdenadas.forEach(rub => {
          const card = document.createElement("div");
          card.style.background = "#ffffff";
          card.style.border = "1px solid #e2e8f0";
          card.style.borderRadius = "10px";
          card.style.padding = "14px 18px";
          card.style.display = "flex";
          card.style.justifyContent = "space-between";
          card.style.alignItems = "center";
          card.style.flexWrap = "wrap";
          card.style.gap = "12px";

          const normType = this.normalizarTipoActividad(rub.tipo);
          let tipoBadge = "";
          if (normType === "Examen") {
            tipoBadge = `<span style="background: #fce7f3; color: #9d174d; border: 1px solid #fbcfe8; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">💯 EXAMEN</span>`;
          } else if (normType === "Trabajo") {
            tipoBadge = `<span style="background: #ffedd5; color: #9a3412; border: 1px solid #fed7aa; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">📊 TRABAJO</span>`;
          } else {
            tipoBadge = `<span style="background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">📝 ACTIVIDAD</span>`;
          }

          const itemsCount = rub.items ? rub.items.length : (rub.aspectos ? rub.aspectos.length : 0);
          const distinctCrit = rub.items ? Array.from(new Set(rub.items.map(i => i.criterio).filter(Boolean))).join(", ") : "";

          card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 240px;">
              <input type="checkbox" class="chk-rubrica" value="${rub.id}" onchange="app.actualizarContadorRubricasSeleccionadas()" style="width: 18px; height: 18px; cursor: pointer; accent-color: #ef4444;" />
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                  <strong style="font-size: 0.98rem; color: var(--text);">${this.escapeHtml(rub.titulo)}</strong>
                  ${tipoBadge}
                  ${rub.esCompartida ? `<span style="background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 2px 7px; border-radius: 4px; font-size: 0.73rem; font-weight: 700;">🔗 Compartida (v${rub.templateVersion || 1})</span>` : ''}
                </div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">
                  ${itemsCount} ítems/preguntas ${distinctCrit ? `• Criterios: [${distinctCrit}]` : ""}
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm" onclick="app.cerrarModal('modalCatalogoRubricas'); app.abrirEvaluarRubrica('${rub.id}')">
                📊 Evaluar
              </button>
              <button class="btn btn-secondary btn-sm" onclick="app.modalEditRubrica('${rub.id}')">
                ✏️ Editar
              </button>
              <button class="btn btn-danger btn-sm" onclick="app.solicitarEliminarRubrica('${rub.id}')">
                🗑️ Eliminar
              </button>
            </div>
          `;
          container.appendChild(card);
        });

        // Mostrar también en el catálogo las plantillas compartidas disponibles de grupos vinculados
        const linkedGroupIds = this.grupoActivo.linkedGroupIds || [];
        const plantillasDisponibles = (this.data.plantillasRubricas || []).filter(tmpl => {
          if (!tmpl.compartida) return false;
          if (!linkedGroupIds.includes(tmpl.sourceGroupId)) return false;
          const alreadyApplied = (this.grupoActivo.rubricas || []).some(r => r.templateId === tmpl.id);
          if (alreadyApplied) return false;

          if (tipoFiltro !== "todos") {
            const normType = this.normalizarTipoActividad(tmpl.tipo);
            if (tipoFiltro === "actividad" && normType !== "Actividad") return false;
            if (tipoFiltro === "examen" && normType !== "Examen") return false;
            if (tipoFiltro === "trabajos" && normType !== "Trabajo") return false;
          }
          if (searchVal) {
            const inTitulo = (tmpl.titulo || "").toLowerCase().includes(searchVal);
            const inItems = tmpl.items ? tmpl.items.some(i => (i.title || i.titulo || "").toLowerCase().includes(searchVal) || (i.criterio || "").toLowerCase().includes(searchVal)) : false;
            return inTitulo || inItems;
          }
          return true;
        });

        if (plantillasDisponibles.length > 0) {
          const sep = document.createElement("div");
          sep.style.marginTop = "20px";
          sep.style.marginBottom = "8px";
          sep.innerHTML = `
            <div style="font-weight: 800; font-size: 0.9rem; color: #15803d; display: flex; align-items: center; gap: 6px;">
              <span>📥</span> Plantillas compartidas disponibles de grupos vinculados (${plantillasDisponibles.length})
            </div>
            <div style="font-size: 0.78rem; color: #166534; margin-top: 2px;">
              Puedes previsualizarlas o integrarlas en este grupo con un solo clic.
            </div>
          `;
          container.appendChild(sep);

          plantillasDisponibles.forEach(tmpl => {
            const card = document.createElement("div");
            card.style.background = "#f0fdf4";
            card.style.border = "1.5px solid #86efac";
            card.style.borderRadius = "10px";
            card.style.padding = "14px 18px";
            card.style.display = "flex";
            card.style.justifyContent = "space-between";
            card.style.alignItems = "center";
            card.style.flexWrap = "wrap";
            card.style.gap = "12px";
            card.style.marginBottom = "10px";

            const normType = this.normalizarTipoActividad(tmpl.tipo);
            let tipoBadge = "";
            if (normType === "Examen") {
              tipoBadge = `<span style="background: #fce7f3; color: #9d174d; border: 1px solid #fbcfe8; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">💯 EXAMEN</span>`;
            } else if (normType === "Trabajo") {
              tipoBadge = `<span style="background: #ffedd5; color: #9a3412; border: 1px solid #fed7aa; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">📊 TRABAJO</span>`;
            } else {
              tipoBadge = `<span style="background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">📝 ACTIVIDAD</span>`;
            }

            const sourceGrp = (this.data.grupos || []).find(g => g.id === tmpl.sourceGroupId);
            const sourceName = sourceGrp ? sourceGrp.nombre : "Grupo vinculado";
            const itemsCount = tmpl.items ? tmpl.items.length : 0;

            card.innerHTML = `
              <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 240px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                    <strong style="font-size: 0.98rem; color: #0f172a;">${tmpl.titulo}</strong>
                    ${tipoBadge}
                    <span style="font-size: 0.75rem; background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; padding: 2px 6px; border-radius: 4px; font-weight: 600;">📍 Origen: ${sourceName}</span>
                    <span style="font-size: 0.75rem; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 4px; font-weight: 600;">v${tmpl.version || 1}</span>
                  </div>
                  <div style="font-size: 0.8rem; color: #64748b;">
                    ${itemsCount} ítems/preguntas definidas
                  </div>
                </div>
              </div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button class="btn btn-secondary btn-sm" onclick="app.cerrarModal('modalCatalogoRubricas'); app.previsualizarPlantillaCompartida('${tmpl.id}')">
                  👁️ Previsualizar
                </button>
                <button class="btn btn-success btn-sm" onclick="app.cerrarModal('modalCatalogoRubricas'); app.instanciarRubricaCompartida('${tmpl.id}')" style="background: #16a34a; border-color: #15803d; color: #ffffff; font-weight: 700;">
                  📥 Usar en este grupo
                </button>
                <button class="btn btn-primary btn-sm" onclick="app.cerrarModal('modalCatalogoRubricas'); app.instanciarRubricaCompartida('${tmpl.id}', true)">
                  📊 Evaluar
                </button>
              </div>
            `;
            container.appendChild(card);
          });
        }
      }

      // --- SISTEMA DE DIARIO DE CLASE ---
      abrirModalDiarioClase() {
        if (!this.grupoActivo) {
          this.mostrarToast("⚠️ Selecciona un grupo de alumnos primero.");
          return;
        }
        if (!this.grupoActivo.diarioClase) {
          this.grupoActivo.diarioClase = [];
        }

        // Si está completamente vacío, autocargar las fechas de las actividades del curso
        if (this.grupoActivo.diarioClase.length === 0) {
          this.importarFechasActividadesEnDiario(true);
        }

        this.renderizarDiarioClase();
        this.abrirModal("modalDiarioClase");

        // Desplazar la lista al final para mostrar los últimos eventos asignados
        setTimeout(() => {
          const cont = document.getElementById("contenedorListaDiarioClase");
          if (cont) {
            cont.scrollTop = cont.scrollHeight;
          }
        }, 120);
      }

      obtenerActividadesPorFecha(fechaStr) {
        if (!this.grupoActivo || !this.grupoActivo.evaluaciones || !fechaStr) return [];
        const res = [];
        ["eval1", "eval2", "eval3"].forEach(evKey => {
          const ev = this.grupoActivo.evaluaciones[evKey];
          if (ev && ev.actividades) {
            ev.actividades.forEach(act => {
              const actFecha = act.fechaCreacion || act.fecha || "";
              if (actFecha === fechaStr) {
                res.push({ evKey, act });
              }
            });
          }
        });
        return res;
      }

      importarFechasActividadesEnDiario(silent = false) {
        if (!this.grupoActivo) return;
        if (!this.grupoActivo.diarioClase) this.grupoActivo.diarioClase = [];

        // Obtener todas las fechas únicas de actividades del curso
        const fechasSet = new Set();
        ["eval1", "eval2", "eval3"].forEach(evKey => {
          const ev = this.grupoActivo.evaluaciones ? this.grupoActivo.evaluaciones[evKey] : null;
          if (ev && ev.actividades) {
            ev.actividades.forEach(act => {
              const f = act.fechaCreacion || act.fecha || "";
              if (f) fechasSet.add(f);
            });
          }
        });

        const fechasList = Array.from(fechasSet).sort();
        let agregados = 0;

        fechasList.forEach(f => {
          const existe = this.grupoActivo.diarioClase.some(evt => evt.fecha === f);
          if (!existe) {
            const acts = this.obtenerActividadesPorFecha(f);
            let descSugerida = "";
            if (acts.length > 0) {
              const nombres = Array.from(new Set(acts.map(a => a.act.nombre).filter(Boolean)));
              if (nombres.length === 1) {
                descSugerida = nombres[0];
              }
            }
            this.grupoActivo.diarioClase.push({
              id: "evt-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
              fecha: f,
              descripcion: descSugerida,
              creadoEn: new Date().toISOString()
            });
            agregados++;
          }
        });

        this.grupoActivo.diarioClase.sort((a, b) => (a.fecha || "").localeCompare(b.fecha || ""));
        this.guardarDatos();
        this.renderizarDiarioClase();

        if (!silent) {
          if (agregados > 0) {
            this.mostrarToast(`⚡ Se añadieron ${agregados} nueva(s) fecha(s) de actividades al diario.`);
          } else {
            this.mostrarToast("ℹ️ Todas las fechas de las actividades ya estaban en el diario.");
          }
        }
      }

      renderizarDiarioClase() {
        if (!this.grupoActivo) return;
        const diario = this.grupoActivo.diarioClase || [];
        const container = document.getElementById("contenedorListaDiarioClase");
        if (!container) return;

        container.innerHTML = "";

        const badgeTotal = document.getElementById("badgeTotalDiario");
        if (badgeTotal) badgeTotal.textContent = `${diario.length} eventos`;

        const footerInfo = document.getElementById("infoDiarioFooter");
        if (footerInfo) footerInfo.textContent = `Total: ${diario.length} entradas registradas en el diario`;

        if (diario.length === 0) {
          container.innerHTML = `
            <div style="background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 28px; text-align: center; color: var(--text-muted);">
              <p style="font-size: 0.98rem; font-weight: 700; margin-bottom: 6px; color: #334155;">No hay ningún evento registrado en el diario de este curso.</p>
              <p style="font-size: 0.82rem; margin-bottom: 14px;">Haz clic en el botón superior para crear una entrada manualmente o autocargar las fechas registradas en las actividades.</p>
              <button class="btn btn-primary btn-sm" onclick="app.agregarNuevoEventoDiario()" style="font-weight: 700;">➕ Crear Primer Evento</button>
            </div>
          `;
          return;
        }

        diario.forEach((evt) => {
          const card = document.createElement("div");
          card.style.background = "#ffffff";
          card.style.border = "1px solid #cbd5e1";
          card.style.borderRadius = "10px";
          card.style.padding = "12px 16px";
          card.style.display = "flex";
          card.style.alignItems = "center";
          card.style.gap = "14px";
          card.style.flexWrap = "wrap";
          card.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";

          const matches = this.obtenerActividadesPorFecha(evt.fecha);
          const countActs = matches.length;

          card.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 4px; min-width: 155px;">
              <label style="font-size: 0.75rem; font-weight: 800; color: #475569; text-transform: uppercase;">📅 Fecha Evento:</label>
              <input type="date" value="${evt.fecha || ''}" class="form-control" onchange="app.actualizarFechaEventoDiario('${evt.id}', this.value)" style="font-weight: 700; font-size: 0.88rem; padding: 6px 10px; border: 1.5px solid #cbd5e1; border-radius: 6px; background: #f8fafc; color: #0f172a;" title="Fecha del evento" />
              <span style="font-size: 0.72rem; color: #64748b; font-weight: 600;">
                ${countActs > 0 ? `🎯 ${countActs} actividad(es)` : "⚠️ Sin actividades"}
              </span>
            </div>

            <div style="flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: 4px;">
              <label style="font-size: 0.75rem; font-weight: 800; color: #475569; text-transform: uppercase;">📝 Descripción / Tema de la Sesión:</label>
              <textarea class="form-control" rows="2" placeholder="Escribe la descripción del evento o tema tratado..." style="width: 100%; font-size: 0.88rem; padding: 6px 10px; border: 1.5px solid #cbd5e1; border-radius: 6px; resize: vertical;" onchange="app.actualizarDescripcionEventoDiario('${evt.id}', this.value)">${evt.descripcion || ''}</textarea>
            </div>

            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; justify-content: flex-end;">
              <button class="btn btn-primary btn-sm" onclick="app.asignarDescripcionDiarioAActividades('${evt.id}')" style="font-weight: 800; background: linear-gradient(135deg, #059669, #10b981); border: none; padding: 8px 14px; border-radius: 6px; color: white; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; box-shadow: 0 2px 4px rgba(16,185,129,0.2);" title="Asignar este texto a las actividades que comparten la fecha ${evt.fecha}">
                📌 Asignar a actividades (${countActs})
              </button>
              <button class="btn btn-danger btn-sm" onclick="app.eliminarEventoDiario('${evt.id}')" style="padding: 8px 10px; border-radius: 6px;" title="Eliminar este evento del diario">
                🗑️
              </button>
            </div>
          `;
          container.appendChild(card);
        });
      }

      agregarNuevoEventoDiario() {
        if (!this.grupoActivo) return;
        if (!this.grupoActivo.diarioClase) this.grupoActivo.diarioClase = [];

        let fechaDef = new Date().toISOString().split("T")[0];
        if (this.grupoActivo.diarioClase.length > 0) {
          const ultFecha = this.grupoActivo.diarioClase[this.grupoActivo.diarioClase.length - 1].fecha;
          if (ultFecha) fechaDef = ultFecha;
        }

        const nuevoEvt = {
          id: "evt-" + Date.now(),
          fecha: fechaDef,
          descripcion: "",
          creadoEn: new Date().toISOString()
        };

        this.grupoActivo.diarioClase.push(nuevoEvt);
        this.guardarDatos();
        this.renderizarDiarioClase();

        setTimeout(() => {
          const cont = document.getElementById("contenedorListaDiarioClase");
          if (cont) {
            cont.scrollTop = cont.scrollHeight;
            const textareas = cont.querySelectorAll("textarea");
            if (textareas.length > 0) {
              const lastTa = textareas[textareas.length - 1];
              lastTa.focus();
            }
          }
        }, 100);
      }

      actualizarFechaEventoDiario(id, nuevaFecha) {
        if (!this.grupoActivo || !this.grupoActivo.diarioClase) return;
        const evt = this.grupoActivo.diarioClase.find(e => e.id === id);
        if (evt) {
          evt.fecha = nuevaFecha;
          this.grupoActivo.diarioClase.sort((a, b) => (a.fecha || "").localeCompare(b.fecha || ""));
          this.guardarDatos();
          this.renderizarDiarioClase();
        }
      }

      actualizarDescripcionEventoDiario(id, nuevaDesc) {
        if (!this.grupoActivo || !this.grupoActivo.diarioClase) return;
        const evt = this.grupoActivo.diarioClase.find(e => e.id === id);
        if (evt) {
          evt.descripcion = nuevaDesc;
          this.guardarDatos();
        }
      }

      asignarDescripcionDiarioAActividades(id) {
        if (!this.grupoActivo || !this.grupoActivo.diarioClase) return;
        const evt = this.grupoActivo.diarioClase.find(e => e.id === id);
        if (!evt) return;

        const desc = (evt.descripcion || "").trim();
        if (!desc) {
          this.mostrarToast("⚠️ Escribe primero una descripción en el evento antes de asignarla.");
          return;
        }

        const fechaTarget = evt.fecha;
        if (!fechaTarget) {
          this.mostrarToast("⚠️ Selecciona una fecha para el evento.");
          return;
        }

        const matches = this.obtenerActividadesPorFecha(fechaTarget);
        if (matches.length === 0) {
          const fechaDisp = this.formatearFecha ? this.formatearFecha(fechaTarget) : fechaTarget;
          this.mostrarToast(`⚠️ No hay actividades registradas con la fecha ${fechaDisp}.`);
          return;
        }

        matches.forEach(item => {
          item.act.nombre = desc;
        });

        this.guardarDatos();
        this.renderizarDiarioClase();

        if (this.vistaActiva === "calificaciones") {
          this.renderizarTablaCalificaciones();
        } else if (this.vistaActiva === "actividades") {
          this.renderizarEvaluaciones();
        }

        const fechaDisp = this.formatearFecha ? this.formatearFecha(fechaTarget) : fechaTarget;
        this.mostrarToast(`✅ Se asignó la descripción "${desc}" a ${matches.length} actividad(es) del ${fechaDisp}.`);
      }

      eliminarEventoDiario(id) {
        if (!this.grupoActivo || !this.grupoActivo.diarioClase) return;
        this.mostrarConfirmacion(
          "¿Estás seguro de que deseas eliminar este evento del diario de clase?",
          () => {
            this.grupoActivo.diarioClase = this.grupoActivo.diarioClase.filter(e => e.id !== id);
            this.guardarDatos();
            this.renderizarDiarioClase();
            this.actualizarUI();
            this.mostrarToast("🗑️ Evento eliminado del diario.");
          }
        );
      }

      abrirVentanaRubricaTipo(rawTipo) {
        if (!this.grupoActivo) {
          this.mostrarToast("⚠️ Selecciona un grupo de alumnos primero.");
          return;
        }

        const normTipo = this.isTipoExamen(rawTipo) ? "examen" : (this.isTipoTrabajo(rawTipo) ? "trabajos" : "actividades");
        this.tipoRubricaVentanaActiva = normTipo;

        const titleEl = document.getElementById("ventanaRubricaHeaderTitulo");
        const subEl = document.getElementById("ventanaRubricaHeaderSub");
        const bannerEl = document.getElementById("ventanaRubricaReglasBanner");

        if (normTipo === "examen") {
          if (titleEl) titleEl.innerHTML = `💯 RÚBRICA DE EXAMEN`;
          if (subEl) subEl.textContent = `Gestión de evaluaciones tipo Examen o Prueba escrita`;
          if (bannerEl) {
            bannerEl.style.background = "#fdf2f8";
            bannerEl.style.border = "1.5px solid #fbcfe8";
            bannerEl.style.color = "#831843";
            bannerEl.innerHTML = `
              <div style="font-weight: 800; font-size: 0.9rem; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                <span>💯</span> <span>Reglas de Ponderación y Calificación de Examen:</span>
              </div>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.83rem; display: flex; flex-direction: column; gap: 3px;">
                <li><strong>Puntuación variable:</strong> Cada pregunta/ítem puede tener un valor o puntuación máxima diferente (ej. P1=1.5 pts, P2=2.5 pts...).</li>
                <li><strong>Calificación directa:</strong> Entrada numérica directa por pregunta con navegación rápida.</li>
                <li><strong>Criterios de Evaluación:</strong> Cada pregunta se vincula con uno o varios criterios de evaluación.</li>
              </ul>
            `;
          }
        } else if (normTipo === "trabajos") {
          if (titleEl) titleEl.innerHTML = `📊 RÚBRICA DE TRABAJO`;
          if (subEl) subEl.textContent = `Gestión de evaluaciones tipo Trabajo o Proyecto`;
          if (bannerEl) {
            bannerEl.style.background = "#fff7ed";
            bannerEl.style.border = "1.5px solid #fed7aa";
            bannerEl.style.color = "#7c2d12";
            bannerEl.innerHTML = `
              <div style="font-weight: 800; font-size: 0.9rem; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                <span>📊</span> <span>Reglas de Ponderación y Calificación de Trabajo:</span>
              </div>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.83rem; display: flex; flex-direction: column; gap: 3px;">
                <li><strong>Ponderación por aspecto:</strong> Los aspectos pueden tener pesos o porcentajes diferentes (ej. Presentación 20%, Contenido 50%).</li>
                <li><strong>Calificación por botones:</strong> Cada ítem se califica exclusivamente mediante 4 botones: <strong>0, 3, 6 y 10</strong>.</li>
                <li><strong>Criterios de Evaluación:</strong> Se relacionan directamente con los criterios de evaluación del curso.</li>
              </ul>
            `;
          }
        } else {
          if (titleEl) titleEl.innerHTML = `📝 RÚBRICA DE ACTIVIDADES`;
          if (subEl) subEl.textContent = `Gestión de evaluaciones tipo Actividades de clase o cuaderno`;
          if (bannerEl) {
            bannerEl.style.background = "#eff6ff";
            bannerEl.style.border = "1.5px solid #bfdbfe";
            bannerEl.style.color = "#1e3a8a";
            bannerEl.innerHTML = `
              <div style="font-weight: 800; font-size: 0.9rem; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                <span>📝</span> <span>Reglas de Ponderación y Calificación de Actividades:</span>
              </div>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.83rem; display: flex; flex-direction: column; gap: 3px;">
                <li><strong>Ponderación equitativa:</strong> Todas las actividades tienen exactamente el mismo peso.</li>
                <li><strong>Calificación por botones:</strong> Cada actividad se califica exclusivamente mediante 4 botones: <strong>0, 3, 6 y 10</strong>.</li>
                <li><strong>Criterios de Evaluación:</strong> Cada actividad se vincula con uno o varios criterios de evaluación.</li>
              </ul>
            `;
          }
        }

        this.renderizarListaVentanaRubricaTipo();
        this.abrirModal("modalVentanaRubricaTipo");
      }

      renderizarListaVentanaRubricaTipo() {
        if (!this.grupoActivo || !this.tipoRubricaVentanaActiva) return;
        const targetTipo = this.tipoRubricaVentanaActiva;
        const allRubricas = this.grupoActivo.rubricas || [];

        const filtradas = allRubricas.filter(rub => {
          const norm = this.isTipoExamen(rub.tipo, rub.titulo) ? "examen" : (this.isTipoTrabajo(rub.tipo, rub.titulo) ? "trabajos" : "actividades");
          return norm === targetTipo;
        });

        const countSpan = document.getElementById("ventanaRubricaCount");
        if (countSpan) countSpan.textContent = filtradas.length;

        const container = document.getElementById("ventanaRubricaListaItems");
        if (!container) return;
        container.innerHTML = "";

        if (filtradas.length === 0) {
          container.innerHTML = `
            <div style="background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 24px; text-align: center; color: var(--text-muted);">
              <p style="font-size: 0.92rem; font-weight: 600; margin-bottom: 6px;">No hay rúbricas guardadas de este tipo en el curso actual.</p>
              <p style="font-size: 0.8rem; margin: 0;">Utiliza los botones superiores para importar o crear una nueva rúbrica.</p>
            </div>
          `;
          return;
        }

        const ordenadas = [...filtradas].reverse();

        ordenadas.forEach(rub => {
          const card = document.createElement("div");
          card.style.background = "#ffffff";
          card.style.border = "1px solid #cbd5e1";
          card.style.borderRadius = "8px";
          card.style.padding = "12px 16px";
          card.style.display = "flex";
          card.style.justifyContent = "space-between";
          card.style.alignItems = "center";
          card.style.flexWrap = "wrap";
          card.style.gap = "10px";

          const itemsCount = rub.items ? rub.items.length : (rub.aspectos ? rub.aspectos.length : 0);
          const distinctCrit = rub.items ? Array.from(new Set(rub.items.map(i => i.criterio).filter(Boolean))).join(", ") : "";
          const fechaStr = rub.fechaCreacion || rub.fecha || "";
          const fechaFmt = fechaStr ? (this.formatearFecha ? this.formatearFecha(fechaStr.split("T")[0]) : fechaStr.split("T")[0]) : "";

          card.innerHTML = `
            <div style="flex: 1; min-width: 220px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 3px;">
                <strong style="font-size: 0.96rem; color: #0f172a;">${this.escapeHtml(rub.titulo)}</strong>
                ${fechaFmt ? `<span style="font-size: 0.73rem; background: #f1f5f9; color: #475569; padding: 2px 6px; border-radius: 4px;">📅 ${fechaFmt}</span>` : ''}
              </div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">
                ${itemsCount} ítems/preguntas ${distinctCrit ? `• Criterios: [${distinctCrit}]` : ""}
              </div>
            </div>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm" onclick="app.cerrarModal('modalVentanaRubricaTipo'); app.abrirEvaluarRubrica('${rub.id}')">
                📊 Evaluar
              </button>
              <button class="btn btn-secondary btn-sm" onclick="app.modalEditRubrica('${rub.id}')">
                ✏️ Editar
              </button>
              <button class="btn btn-danger btn-sm" onclick="app.solicitarEliminarRubrica('${rub.id}')">
                🗑️
              </button>
            </div>
          `;
          container.appendChild(card);
        });
      }

      ejecutarAccionRubricaTipo(accion) {
        const tipo = this.tipoRubricaVentanaActiva || "actividades";
        this.cerrarModal("modalVentanaRubricaTipo");

        if (accion === "texto") {
          this.abrirImportadorRubrica(tipo);
          this.cambiarTabImportMetodo("texto");
        } else if (accion === "foto") {
          this.abrirImportadorRubrica(tipo);
          this.abrirCapturaFotoRubrica("camara");
        } else if (accion === "ia") {
          this.abrirModalGeminiEngineRubrica(tipo);
        } else if (accion === "manual") {
          this.abrirModalCrearRubricaPaso1ConTipo(tipo);
        }
      }

      abrirModalGeminiEngineRubrica(rawTipo) {
        if (!this.grupoActivo) {
          this.mostrarToast("⚠️ Selecciona un grupo de alumnos primero.");
          return;
        }

        const normTipo = this.isTipoExamen(rawTipo) ? "examen" : (this.isTipoTrabajo(rawTipo) ? "trabajos" : "actividades");
        this.tipoRubricaVentanaActiva = normTipo;
        this.importandoRubricaTipo = normTipo;

        const cursoBadge = document.getElementById("geminiEngineCursoBadge");
        const tipoBadge = document.getElementById("geminiEngineTipoBadge");
        const criteriosBadge = document.getElementById("geminiEngineCriteriosBadge");
        const promptInput = document.getElementById("geminiEnginePromptInput");

        const grupoNom = this.grupoActivo.nombre || "Grupo sin nombre";
        const critCount = (this.grupoActivo.criterios || []).length;

        if (cursoBadge) cursoBadge.textContent = `📚 Curso: ${grupoNom}`;
        if (tipoBadge) {
          if (normTipo === "examen") tipoBadge.textContent = "💯 Tipo: Examen (Nota sobre 10)";
          else if (normTipo === "trabajos") tipoBadge.textContent = "📊 Tipo: Trabajo (0, 3, 6, 10)";
          else tipoBadge.textContent = "📝 Tipo: Actividades (0, 3, 6, 10)";
        }
        if (criteriosBadge) criteriosBadge.textContent = `📋 Criterios LOMLOE: ${critCount} dispon.`;

        if (promptInput) {
          promptInput.value = "";
          if (normTipo === "examen") {
            promptInput.placeholder = "Ej: Crear un examen de 5 preguntas sobre la unidad de Sintaxis y Ortografía. Pregunta 1 y 2 sobre análisis sintáctico de oraciones simples, pregunta 3 sobre acentuación de diptongos e hiatos, pregunta 4 sobre vocabulario y pregunta 5 sobre redacción corta.";
          } else if (normTipo === "trabajos") {
            promptInput.placeholder = "Ej: Trabajo en equipo de investigación sobre la Generación del 27. Evaluar aspectos como estructura y presentación, contenido histórico, análisis de autores, trabajo colaborativo y exposición oral.";
          } else {
            promptInput.placeholder = "Ej: Tarea de cuaderno sobre análisis de un poema de Lorca. Incluir actividades de identificación de figuras literarias, métrica, tema principal y opinión personal del alumno.";
          }
        }

        this.abrirModal("modalGeminiEngineRubrica");
      }

      async generarRubricaConGeminiPrompt() {
        if (this.isProcessingAI) {
          this.mostrarNotificacionToast("⌛ Ya hay una generación de rúbrica en curso. Por favor, espera...", 3000);
          return;
        }

        const promptInput = document.getElementById("geminiEnginePromptInput");
        const textPrompt = promptInput ? promptInput.value.trim() : "";

        if (!textPrompt) {
          alert("Por favor, introduce las instrucciones o detalles sobre la actividad, examen o trabajo que pretendes realizar.");
          return;
        }

        this.isProcessingAI = true;

        const normTipo = this.tipoRubricaVentanaActiva || "actividades";
        this.importandoRubricaTipo = normTipo;

        this.mostrarNotificacionToast("🤖 Gemini Engine está diseñando tu propuesta de rúbrica...", 5000);
        this.mostrarWindowsLoading({
          titulo: "Generando Rúbrica con IA...",
          mensaje: "Gemini está procesando tus instrucciones...",
          subtitulo: "Creando la propuesta y vinculando preguntas con los criterios oficiales del curso."
        });

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000);

        try {
          let criteriosCurso = (this.grupoActivo && Array.isArray(this.grupoActivo.criterios) && this.grupoActivo.criterios.length > 0)
            ? this.grupoActivo.criterios.map(c => ({ codigo: c.codigo, descripcion: c.descripcion || `Criterio ${c.codigo}` }))
            : [];

          if (criteriosCurso.length === 0 && this.data && Array.isArray(this.data.grupos)) {
            for (const g of this.data.grupos) {
              if (Array.isArray(g.criterios) && g.criterios.length > 0) {
                criteriosCurso = g.criterios.map(c => ({ codigo: c.codigo, descripcion: c.descripcion || `Criterio ${c.codigo}` }));
                break;
              }
            }
          }

          const cursoInfo = this.grupoActivo 
            ? `${this.grupoActivo.nombre || ''} - ${this.grupoActivo.curso || ''} ${this.grupoActivo.materia || ''}`.trim()
            : "";

          const res = await fetch("/api/gemini/parse-rubric", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
              text: textPrompt,
              isPromptGeneration: true,
              tipo: normTipo,
              criteriosCurso: criteriosCurso,
              cursoInfo: cursoInfo
            })
          });

          clearTimeout(timeoutId);

          const data = await res.json();
          if (!res.ok || data.error) {
            throw new Error(data.error || "Error al comunicarse con Gemini Engine.");
          }

          if (!window.rubricEngine || !window.rubricEngine.parseGeminiRubricResult) {
            throw new Error("El motor de rúbricas no está listo.");
          }

          const titleDefault = data.result?.titleRubric || `Rúbrica de ${normTipo.toUpperCase()} (Gemini)`;

          const parseResult = window.rubricEngine.parseGeminiRubricResult(
            data.result,
            normTipo,
            titleDefault
          );

          if (parseResult.error) {
            alert(parseResult.error);
            return;
          }

          this.cerrarModal("modalGeminiEngineRubrica");
          this.abrirPreviewImportRubrica(parseResult);
        } catch (err) {
          console.error("Error al generar rúbrica con Gemini Engine:", err);
          const rawErr = String(err?.message || err);
          let userMsg = rawErr;
          if (err?.name === "AbortError") {
            userMsg = "No se ha podido conectar con el asistente de IA (tiempo de espera agotado). Inténtalo de nuevo.";
          } else if (rawErr.includes("Failed to fetch") || rawErr.includes("NetworkError")) {
            userMsg = "No se pudo conectar con el servidor para comunicarse con Gemini Engine. Por favor, comprueba tu conexión y vuelve a intentarlo.";
          }
          alert(`Aviso de Gemini Engine: ${userMsg}`);
        } finally {
          this.isProcessingAI = false;
          this.ocultarWindowsLoading();
        }
      }

      abrirModalCrearRubricaPaso1ConTipo(tipo) {
        this.manualRubricaTipo = tipo;
        this.abrirModalCrearRubricaPaso1();
        const selTipo = document.getElementById("manualRubricaTipoSelect");
        if (selTipo) selTipo.value = tipo;
      }

      abrirImportadorRubrica(tipo) {
        this.importandoRubricaTipo = tipo || 'examen';
        this.fotoCapturadaActual = null;
        this.selectedRubricaFile = null;
        
        // Reset campos
        const inputArchivo = document.getElementById("inputRubricaArchivo");
        if (inputArchivo) inputArchivo.value = "";
        
        const inputTitulo = document.getElementById("inputRubricaTituloPegado");
        if (inputTitulo) inputTitulo.value = "";

        const textarea = document.getElementById("textareaRubricaTexto");
        if (textarea) textarea.value = "";

        const lblInfo = document.getElementById("lblRubricaArchivoInfo");
        if (lblInfo) {
          lblInfo.textContent = "";
          lblInfo.style.display = "none";
        }

        const boxAcciones = document.getElementById("boxAccionesArchivo");
        if (boxAcciones) boxAcciones.style.display = "none";

        this.seleccionarTipoRubricaImport(this.importandoRubricaTipo);
        this.cambiarTabImportMetodo('archivo');

        this.abrirModal("modalImportarRubrica");
      }

      seleccionarTipoRubricaImport(tipo) {
        this.importandoRubricaTipo = (this.isTipoExamen(tipo)) ? "examen" : (this.isTipoTrabajo(tipo) ? "trabajos" : "actividades");
        const btnAct = document.getElementById("btnTipoRubActividades");
        const btnExa = document.getElementById("btnTipoRubExamen");
        const btnTra = document.getElementById("btnTipoRubTrabajo");

        const btnActiveStyle = "border: 2px solid #3b82f6; background: #eff6ff; color: #1e40af; font-weight: 700; border-radius: 8px; padding: 10px; cursor: pointer;";
        const btnInactiveStyle = "border: 1px solid #cbd5e1; background: #ffffff; color: #334155; font-weight: 600; border-radius: 8px; padding: 10px; cursor: pointer;";

        if (btnAct) btnAct.style.cssText = (!this.isTipoExamen(tipo) && !this.isTipoTrabajo(tipo)) ? btnActiveStyle : btnInactiveStyle;
        if (btnExa) btnExa.style.cssText = (this.isTipoExamen(tipo)) ? btnActiveStyle : btnInactiveStyle;
        if (btnTra) btnTra.style.cssText = (this.isTipoTrabajo(tipo)) ? btnActiveStyle : btnInactiveStyle;

        const tituloEl = document.getElementById("modalImportRubricaTitulo");
        if (tituloEl) {
          if (this.isTipoExamen(tipo)) {
            tituloEl.textContent = "📥 Importar Rúbrica de Examen";
          } else if (this.isTipoTrabajo(tipo)) {
            tituloEl.textContent = "📥 Importar Rúbrica de Trabajo (S/A/B/SB)";
          } else {
            tituloEl.textContent = "📥 Importar Rúbrica de Actividades";
          }
        }
      }

      cambiarTabImportMetodo(metodo) {
        const secTexto = document.getElementById("secImportTexto");
        const secArchivo = document.getElementById("secImportArchivo");
        const btnOptArchivo = document.getElementById("btnOptImportArchivo");

        if (metodo === 'texto') {
          if (secTexto) secTexto.style.display = "block";
          if (secArchivo) secArchivo.style.display = "none";
          if (btnOptArchivo) {
            btnOptArchivo.style.border = "1px solid #cbd5e1";
            btnOptArchivo.style.background = "#ffffff";
          }
        } else {
          if (secTexto) secTexto.style.display = "none";
          if (secArchivo) secArchivo.style.display = "block";
          if (btnOptArchivo) {
            btnOptArchivo.style.border = "2px solid #3b82f6";
            btnOptArchivo.style.background = "#eff6ff";
          }
        }
      }

      esAvisoCamaraDesactivado() {
        return localStorage.getItem("fernanditio_camera_permission_notice_disabled") === "true" ||
               localStorage.getItem("omitirPermisoCamara") === "true";
      }

      abrirCapturaFotoRubrica(origen = 'camara') {
        if (origen === 'galeria') {
          const inputG = document.getElementById("inputFotoGaleria");
          if (inputG) {
            inputG.value = "";
            inputG.click();
          }
        } else {
          if (this.esAvisoCamaraDesactivado()) {
            this.solicitarPermisoYCamara();
          } else {
            const chk = document.getElementById("chkNoMostrarPermisoCamara");
            if (chk) chk.checked = false;
            this.abrirModal("modalPermisoCamara");
          }
        }
      }

      confirmarPermisoCamara() {
        const chk = document.getElementById("chkNoMostrarPermisoCamara");
        if (chk && chk.checked) {
          localStorage.setItem("fernanditio_camera_permission_notice_disabled", "true");
          localStorage.setItem("omitirPermisoCamara", "true");
        }
        this.cerrarModal("modalPermisoCamara");
        this.solicitarPermisoYCamara();
      }

      mostrarModalErrorCamara(opciones = {}) {
        const modal = document.getElementById("modalErrorCamara");
        if (!modal) return;

        const tituloEl = document.getElementById("modalErrorCamaraTitulo");
        const msgEl = document.getElementById("modalErrorCamaraMensaje");
        const pasosEl = document.getElementById("modalErrorCamaraPasos");

        if (tituloEl && opciones.titulo) tituloEl.innerHTML = `<span>📷</span> ${opciones.titulo}`;
        if (msgEl && opciones.mensaje) msgEl.textContent = opciones.mensaje;

        if (pasosEl && Array.isArray(opciones.instrucciones)) {
          pasosEl.innerHTML = opciones.instrucciones.map(p => `<li>${p}</li>`).join("");
        }

        this.abrirModal("modalErrorCamara");
      }

      async solicitarPermisoYCamara() {
        // La cámara se inicializa ÚNICAMENTE como consecuencia de una acción explícita del usuario.
        // No realizamos solicitudes preventivas a getUserMedia() al iniciar o en segundo plano.
        try {
          this.detenerYLiberarCamara();
          this.ejecutarCapturaCamara();
        } catch (err) {
          console.warn("Excepción al ejecutar captura de cámara:", err);
          this.mostrarModalErrorCamara({
            titulo: "Acceso a la cámara no disponible",
            mensaje: "No se pudo abrir la cámara en tu navegador o dispositivo.",
            instrucciones: [
              "Verifica que tu navegador o dispositivo permita el acceso a la cámara.",
              "También puedes pulsar abajo en 'Seleccionar foto de Galería' para usar una foto guardada."
            ]
          });
        }
      }

      detenerYLiberarCamara() {
        if (this.currentCameraStream) {
          try {
            if (typeof this.currentCameraStream.getTracks === "function") {
              this.currentCameraStream.getTracks().forEach(track => track.stop());
            }
          } catch (e) {
            console.warn("Error al detener y liberar las pistas de la cámara:", e);
          }
          this.currentCameraStream = null;
        }
      }

      ejecutarCapturaCamara() {
        const inputC = document.getElementById("inputFotoCamara");
        if (inputC) {
          inputC.value = "";
          inputC.click();
        }
      }

      restablecerPermisoCamara() {
        localStorage.removeItem("fernanditio_camera_permission_notice_disabled");
        localStorage.removeItem("omitirPermisoCamara");
        this.mostrarNotificacionToast("📷 Ventana de permiso reactivada correctamente.", 3000);
      }

      actualizarUIConfigCamara() {
        const chk = document.getElementById("chkConfigMostrarAvisoCamara");
        if (chk) {
          chk.checked = !this.esAvisoCamaraDesactivado();
        }
      }

      toggleMostrarAvisoCamaraConfig(mostrarAviso) {
        if (mostrarAviso) {
          localStorage.removeItem("fernanditio_camera_permission_notice_disabled");
          localStorage.removeItem("omitirPermisoCamara");
          this.mostrarNotificacionToast("📷 El aviso de acceso a la cámara se mostrará de nuevo antes de fotografiar.", 3500);
        } else {
          localStorage.setItem("fernanditio_camera_permission_notice_disabled", "true");
          localStorage.setItem("omitirPermisoCamara", "true");
          this.mostrarNotificacionToast("📷 El aviso de acceso a la cámara ha sido desactivado.", 3500);
        }
      }

      async optimizarImagenParaIA(dataUrlOrFile, maxDimension = 1600, quality = 0.82) {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            try {
              let width = img.width;
              let height = img.height;

              if (width > maxDimension || height > maxDimension) {
                if (width > height) {
                  height = Math.round((height * maxDimension) / width);
                  width = maxDimension;
                } else {
                  width = Math.round((width * maxDimension) / height);
                  height = maxDimension;
                }
              }

              const canvas = document.createElement("canvas");
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext("2d");
              if (!ctx) {
                resolve({ dataUrl: typeof dataUrlOrFile === "string" ? dataUrlOrFile : null, mimeType: "image/jpeg" });
                return;
              }

              ctx.fillStyle = "#ffffff";
              ctx.fillRect(0, 0, width, height);
              ctx.drawImage(img, 0, 0, width, height);

              const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
              resolve({ dataUrl: compressedDataUrl, mimeType: "image/jpeg" });
            } catch (err) {
              console.warn("Fallo al optimizar imagen con canvas:", err);
              resolve({ dataUrl: typeof dataUrlOrFile === "string" ? dataUrlOrFile : null, mimeType: "image/jpeg" });
            }
          };

          img.onerror = () => {
            resolve({ dataUrl: typeof dataUrlOrFile === "string" ? dataUrlOrFile : null, mimeType: "image/jpeg" });
          };

          if (typeof dataUrlOrFile === "string") {
            img.src = dataUrlOrFile;
          } else if (dataUrlOrFile instanceof Blob || dataUrlOrFile instanceof File) {
            const reader = new FileReader();
            reader.onload = (e) => { img.src = e.target.result; };
            reader.onerror = () => resolve({ dataUrl: null, mimeType: "image/jpeg" });
            reader.readAsDataURL(dataUrlOrFile);
          } else {
            resolve({ dataUrl: null, mimeType: "image/jpeg" });
          }
        });
      }

      abrirModalPreviewFoto(dataUrl, fileName = "Fotografía") {
        this.fotoOriginalCapturada = dataUrl;
        this.fotoCapturadaActual = {
          dataUrl: dataUrl,
          mimeType: "image/jpeg",
          fileName: fileName
        };

        const imgEl = document.getElementById("imgPreviewFotoTomada");
        if (imgEl) {
          imgEl.src = dataUrl;
        }

        const msg = document.getElementById("msgEstadoRecorte");
        if (msg) {
          msg.innerHTML = "💡 La función de recorte está activa por defecto. Puedes encuadrar arrastrando las esquinas y pulsar <strong>«Aceptar foto»</strong>.";
          msg.style.color = "#166534";
        }

        const sel = document.getElementById("selectProporcionRecorte");
        if (sel) sel.value = "libre";

        this.abrirModal("modalPreviewFotoRubrica");

        // Inicializar la función de recorte por defecto
        setTimeout(() => {
          this.iniciarCropperFoto();
        }, 120);
      }

      iniciarCropperFoto() {
        if (this.cropperInstancia) {
          try {
            this.cropperInstancia.destroy();
          } catch (e) {}
          this.cropperInstancia = null;
        }

        const imgEl = document.getElementById("imgPreviewFotoTomada");
        if (!imgEl) return;

        const setup = () => {
          if (!window.Cropper) {
            console.warn("Cropper aún no está disponible en window, reintentando...");
            setTimeout(() => this.iniciarCropperFoto(), 200);
            return;
          }
          try {
            if (this.cropperInstancia) {
              this.cropperInstancia.destroy();
            }
            this.cropperInstancia = new window.Cropper(imgEl, {
              viewMode: 1,
              dragMode: 'crop',
              aspectRatio: NaN,
              autoCropArea: 0.95,
              restore: false,
              guides: true,
              center: true,
              highlight: true,
              cropBoxMovable: true,
              cropBoxResizable: true,
              toggleDragModeOnDblclick: true,
              responsive: true,
              checkOrientation: true,
              ready: () => {
                const sel = document.getElementById("selectProporcionRecorte");
                if (sel) sel.value = "libre";
              }
            });
          } catch (err) {
            console.error("Error al instanciar Cropper:", err);
          }
        };

        if (imgEl.complete && imgEl.naturalWidth > 0) {
          setup();
        } else {
          imgEl.onload = () => setup();
        }
      }

      aplicarRecorteFotoManual() {
        if (!this.cropperInstancia) {
          this.mostrarNotificacionToast("⚠️ El recortador aún no está listo.", 2000);
          return;
        }
        try {
          const croppedCanvas = this.cropperInstancia.getCroppedCanvas({
            maxWidth: 2400,
            maxHeight: 2400,
            imageSmoothingQuality: "high"
          });
          if (!croppedCanvas) return;

          const newUrl = croppedCanvas.toDataURL("image/jpeg", 0.90);
          this.fotoCapturadaActual.dataUrl = newUrl;

          // Reemplazar en cropper con la nueva versión recortada
          this.cropperInstancia.replace(newUrl);

          const msg = document.getElementById("msgEstadoRecorte");
          if (msg) {
            msg.innerHTML = "✅ <strong>Recorte aplicado con éxito.</strong> Puedes volver a recortar o pulsar <strong>«Aceptar foto»</strong>.";
            msg.style.color = "#059669";
          }
          this.mostrarNotificacionToast("✂️ Recorte aplicado.", 2000);
        } catch (e) {
          console.error("Error al aplicar recorte:", e);
        }
      }

      restablecerFotoOriginal() {
        if (!this.fotoOriginalCapturada) return;
        this.fotoCapturadaActual.dataUrl = this.fotoOriginalCapturada;

        const imgEl = document.getElementById("imgPreviewFotoTomada");
        if (imgEl) {
          if (this.cropperInstancia) {
            this.cropperInstancia.replace(this.fotoOriginalCapturada);
            this.cropperInstancia.reset();
          } else {
            imgEl.src = this.fotoOriginalCapturada;
            this.iniciarCropperFoto();
          }
        }

        const sel = document.getElementById("selectProporcionRecorte");
        if (sel) sel.value = "libre";

        const msg = document.getElementById("msgEstadoRecorte");
        if (msg) {
          msg.innerHTML = "🔄 <strong>Imagen restablecida al original.</strong> Lista para encuadrar y pulsar <strong>«Aceptar foto»</strong>.";
          msg.style.color = "#166534";
        }
        this.mostrarNotificacionToast("🔄 Imagen original restablecida.", 2000);
      }

      girarFoto(deg) {
        if (this.cropperInstancia) {
          this.cropperInstancia.rotate(deg);
        }
      }

      zoomFoto(ratio) {
        if (this.cropperInstancia) {
          this.cropperInstancia.zoom(ratio);
        }
      }

      cambiarProporcionRecorte(valor) {
        if (!this.cropperInstancia) return;
        if (valor === "libre") {
          this.cropperInstancia.setAspectRatio(NaN);
        } else if (valor === "1") {
          this.cropperInstancia.setAspectRatio(1);
        } else if (valor === "4/3") {
          this.cropperInstancia.setAspectRatio(4 / 3);
        } else if (valor === "16/9") {
          this.cropperInstancia.setAspectRatio(16 / 9);
        }
      }

      cerrarModalPreviewFoto() {
        if (this.cropperInstancia) {
          try {
            this.cropperInstancia.destroy();
          } catch (e) {}
          this.cropperInstancia = null;
        }
        this.detenerYLiberarCamara();
        this.cerrarModal("modalPreviewFotoRubrica");
      }

      async onFotoCapturada(event) {
        this.detenerYLiberarCamara();
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        this.mostrarNotificacionToast("📷 Preparando fotografía para comprobación y recorte...", 2000);

        try {
          const optimizado = await this.optimizarImagenParaIA(file, 2000, 0.90);
          const dataUrl = optimizado.dataUrl;
          if (!dataUrl) {
            alert("No se pudo cargar la imagen seleccionada.");
            return;
          }

          this.abrirModalPreviewFoto(dataUrl, file.name);
        } catch (e) {
          console.error("Error al procesar la foto tomada:", e);
          alert("Error al cargar la fotografía.");
        }
      }

      mostrarWindowsLoading(opciones = {}) {
        const modal = document.getElementById("modalWindowsLoading");
        if (!modal) return;

        const heading = document.getElementById("win3MainHeading");
        const msg = document.getElementById("win3MainMsg");
        const subMsg = document.getElementById("win3SubMsg");
        const statusText = document.getElementById("win3StatusText");
        const percentSpan = document.getElementById("win3ProgressPercent");
        const track = document.getElementById("win3ProgressTrack");

        if (heading) heading.textContent = opciones.titulo || "Loading...";
        if (msg) msg.textContent = opciones.mensaje || "Fernanditio está procesando la rúbrica con Inteligencia Artificial...";
        if (subMsg) subMsg.textContent = opciones.subtitulo || "Por favor, espere mientras se analizan los criterios y actividades.";

        if (percentSpan) percentSpan.textContent = "0%";
        if (statusText) statusText.textContent = "Iniciando Fernanditio AI Engine...";
        if (track) track.innerHTML = "";

        if (this._win3LoadingInterval) {
          clearInterval(this._win3LoadingInterval);
          this._win3LoadingInterval = null;
        }

        modal.classList.add("open");

        const pasos = [
          { p: 14, t: "Preparando documento y conectando con el motor IA..." },
          { p: 32, t: "Analizando estructura del examen y enunciados..." },
          { p: 52, t: "Detectando preguntas y puntuaciones máximas..." },
          { p: 72, t: "Cruzando datos con criterios de evaluación del curso..." },
          { p: 88, t: "Asignando criterios pedagógicos oficiales..." },
          { p: 95, t: "Construyendo rúbrica unificada de Fernanditio..." }
        ];

        let currentPercent = 4;
        let stepIdx = 0;
        const totalBlocks = 24;

        const updateTrack = (pct) => {
          if (!track) return;
          const blocksToFill = Math.min(totalBlocks, Math.max(0, Math.round((pct / 100) * totalBlocks)));
          track.innerHTML = "";
          for (let i = 0; i < blocksToFill; i++) {
            const b = document.createElement("div");
            b.className = "win3-progress-block";
            track.appendChild(b);
          }
          if (percentSpan) percentSpan.textContent = `${pct}%`;
        };

        updateTrack(currentPercent);

        this._win3LoadingInterval = setInterval(() => {
          if (stepIdx < pasos.length) {
            const nextStep = pasos[stepIdx];
            if (currentPercent < nextStep.p) {
              currentPercent += Math.floor(Math.random() * 3) + 2;
              if (currentPercent > nextStep.p) currentPercent = nextStep.p;
            } else {
              if (statusText) statusText.textContent = nextStep.t;
              stepIdx++;
            }
          } else {
            if (currentPercent < 94) {
              currentPercent += 1;
            }
          }
          updateTrack(currentPercent);
        }, 180);
      }

      ocultarWindowsLoading() {
        if (this._win3LoadingInterval) {
          clearInterval(this._win3LoadingInterval);
          this._win3LoadingInterval = null;
        }
        const track = document.getElementById("win3ProgressTrack");
        const percentSpan = document.getElementById("win3ProgressPercent");
        const statusText = document.getElementById("win3StatusText");
        if (track && percentSpan) {
          percentSpan.textContent = "100%";
          if (statusText) statusText.textContent = "¡Rúbrica procesada con éxito!";
          track.innerHTML = "";
          for (let i = 0; i < 24; i++) {
            const b = document.createElement("div");
            b.className = "win3-progress-block";
            track.appendChild(b);
          }
        }

        setTimeout(() => {
          const modal = document.getElementById("modalWindowsLoading");
          if (modal) {
            modal.classList.remove("open");
          }
        }, 320);
      }

      logDiagnosticoRubricaIA(info) {
        const {
          categoria = "GEMINI_API_ERROR",
          fase,
          httpCode,
          geminiCode,
          fullMessage,
          model,
          endpoint,
          imageSizeBytes,
          mimeType,
          peticionEnviada,
          geminiRespondioOk,
          falloEnInterpretacion,
          rawResult,
          parseError
        } = info;

        const styleMap = {
          SUCCESS: "color: #065f46; background: #ecfdf5; border: 1px solid #a7f3d0;",
          CAMERA_PERMISSION_ERROR: "color: #92400e; background: #fffbeb; border: 1px solid #fde68a;",
          CAMERA_CAPTURE_ERROR: "color: #991b1b; background: #fef2f2; border: 1px solid #fecaca;",
          GEMINI_API_ERROR: "color: #991b1b; background: #fef2f2; border: 1px solid #fecaca;",
          RUBRIC_PARSE_ERROR: "color: #5b21b6; background: #f5f3ff; border: 1px solid #ddd6fe;"
        };

        const badgeStyle = styleMap[categoria] || "color: #1e40af; background: #eff6ff;";

        console.group(`%c📊 [DIAGNÓSTICO TÉCNICO RÚBRICA IA - ${categoria}]`, `${badgeStyle} font-weight: bold; font-size: 13px; padding: 4px 8px; border-radius: 4px;`);
        console.info(`🏷️ 1. Categoría de Diagnóstico: %c${categoria}`, "font-weight: bold; color: #2563eb;");
        console.info(`📌 2. Fase del flujo: %c${fase}`, "font-weight: bold; color: #1e293b;");
        console.info(`🌐 3. Endpoint utilizado:`, endpoint || "/api/gemini/parse-rubric");
        console.info(`🤖 4. Modelo de Gemini:`, model || "gemini-3.8-flash");
        console.info(`📡 5. Código HTTP devuelto:`, httpCode || "N/A");
        console.info(`⚠️ 6. Código de error de Gemini/API:`, geminiCode || "N/A");
        console.info(`🖼️ 7. Formato MIME de imagen:`, mimeType || "N/A");
        console.info(`📏 8. Tamaño de imagen enviado:`, imageSizeBytes ? `${(imageSizeBytes / 1024).toFixed(2)} KB (${imageSizeBytes} bytes)` : "N/A");
        console.info(`📤 9. ¿Petición llegó a enviarse al servidor?:`, peticionEnviada ? "SÍ (Enviada)" : "NO");
        console.info(`📥 10. ¿Gemini respondió correctamente?:`, geminiRespondioOk ? "SÍ" : "NO");
        console.info(`🧩 11. ¿Fallo al interpretar la respuesta?:`, falloEnInterpretacion ? "SÍ (Error en parser Fernanditio)" : "NO");
        if (fullMessage) console.error(`💬 Mensaje completo / Diagnóstico:`, fullMessage);
        if (parseError) console.error(`🔍 Detalle error parseador Fernanditio:`, parseError);
        if (rawResult) console.info(`📦 Respuesta de Gemini recibida:`, rawResult);
        console.groupEnd();
      }

      async procesarFotoConfirmadaIA() {
        if (this.isProcessingAI) {
          this.mostrarNotificacionToast("⌛ Ya hay un análisis con IA en curso. Por favor, espera...", 3000);
          return;
        }

        if (!this.fotoCapturadaActual || !this.fotoCapturadaActual.dataUrl) {
          alert("No se ha seleccionado ninguna fotografía.");
          return;
        }

        this.isProcessingAI = true;

        // Si la función de recorte está activa, extraer automáticamente el recorte actual
        if (this.cropperInstancia) {
          try {
            const croppedCanvas = this.cropperInstancia.getCroppedCanvas({
              maxWidth: 2400,
              maxHeight: 2400,
              imageSmoothingQuality: "high"
            });
            if (croppedCanvas) {
              this.fotoCapturadaActual.dataUrl = croppedCanvas.toDataURL("image/jpeg", 0.90);
            }
          } catch (e) {
            console.warn("No se pudo obtener canvas recortado, usando imagen actual:", e);
          }
        }

        const btnsConfirm = [
          document.getElementById("btnProcesarFotoConfirmada"),
          document.getElementById("btnProcesarFotoConfirmadaHeader")
        ].filter(Boolean);

        btnsConfirm.forEach(btn => {
          btn.disabled = true;
          btn.innerHTML = "<span>⌛</span> <span>Analizando con Gemini IA...</span>";
        });

        this.mostrarNotificacionToast("🤖 Analizando la fotografía de la rúbrica con Gemini...", 4000);
        this.mostrarWindowsLoading({
          titulo: "Loading...",
          mensaje: "Fernanditio está procesando la fotografía con IA...",
          subtitulo: "Analizando preguntas y asignando criterios oficiales del curso."
        });

        const mimeType = this.fotoCapturadaActual.mimeType || "image/jpeg";
        const dataUrl = this.fotoCapturadaActual.dataUrl;
        const imageSizeBytes = Math.round((dataUrl.length * 3) / 4);
        const endpoint = "/api/gemini/parse-rubric";

        let res = null;
        let resText = "";
        let data = null;
        let peticionEnviada = false;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000);

        try {
          // Extraer criterios oficiales del curso activo para presentárselos a Gemini
          let criteriosCurso = (this.grupoActivo && Array.isArray(this.grupoActivo.criterios) && this.grupoActivo.criterios.length > 0)
            ? this.grupoActivo.criterios.map(c => ({ codigo: c.codigo, descripcion: c.descripcion || `Criterio ${c.codigo}` }))
            : [];

          if (criteriosCurso.length === 0 && this.data && Array.isArray(this.data.grupos)) {
            for (const g of this.data.grupos) {
              if (Array.isArray(g.criterios) && g.criterios.length > 0) {
                criteriosCurso = g.criterios.map(c => ({ codigo: c.codigo, descripcion: c.descripcion || `Criterio ${c.codigo}` }));
                break;
              }
            }
          }

          const cursoInfo = this.grupoActivo 
            ? `${this.grupoActivo.nombre || ''} - ${this.grupoActivo.curso || ''} ${this.grupoActivo.materia || ''}`.trim()
            : "";

          peticionEnviada = true;
          const reqHeaders = { "Content-Type": "application/json" };
          if (window.firebaseSync && typeof window.firebaseSync.getIdToken === "function") {
            const idToken = await window.firebaseSync.getIdToken();
            if (idToken) {
              reqHeaders["Authorization"] = `Bearer ${idToken}`;
            }
          }

          res = await fetch(endpoint, {
            method: "POST",
            headers: reqHeaders,
            signal: controller.signal,
            body: JSON.stringify({
              fileData: dataUrl,
              mimeType: mimeType,
              tipo: this.importandoRubricaTipo,
              criteriosCurso: criteriosCurso,
              cursoInfo: cursoInfo
            })
          });

          clearTimeout(timeoutId);

          resText = await res.text();
          try {
            data = JSON.parse(resText);
          } catch (jsonErr) {
            data = { error: `Respuesta no JSON del servidor (HTTP ${res.status}): ${resText.substring(0, 200)}` };
          }

          if (!res.ok || !data.success || data.error) {
            const errDetails = data.details || {};
            const errMessage = data.error || errDetails.fullMessage || "Error desconocido devuelto por el servidor.";

            this.logDiagnosticoRubricaIA({
              categoria: "GEMINI_API_ERROR",
              fase: "Fase 6-7: Envío a Gemini API / Respuesta del Servidor",
              httpCode: res.status,
              geminiCode: errDetails.geminiCode || (res.status === 413 ? "PAYLOAD_TOO_LARGE" : `HTTP_${res.status}`),
              fullMessage: errMessage,
              model: errDetails.modelAttempted || "gemini-3.8-flash",
              endpoint: endpoint,
              imageSizeBytes: imageSizeBytes,
              mimeType: mimeType,
              peticionEnviada: true,
              geminiRespondioOk: false,
              falloEnInterpretacion: false
            });

            let userMsg = errMessage;
            if (res.status === 413) {
              userMsg = "La fotografía es demasiado grande para ser procesada. Intenta recortarla o sacar una foto de menor resolución.";
            } else if (res.status === 429) {
              userMsg = "Se ha alcanzado el límite de peticiones de IA. Espera unos segundos e inténtalo de nuevo.";
            } else if (res.status === 503) {
              userMsg = "Los servidores de IA están experimentando alta demanda. Por favor reintenta en unos segundos.";
            }
            alert(`Aviso de Rúbrica IA (HTTP ${res.status}): ${userMsg}\n\n(Consulta la consola F12 para el diagnóstico técnico completo)`);
            return;
          }

          const modelUsed = data.meta?.modelUsed || "gemini-3.8-flash";

          if (!window.rubricEngine || !window.rubricEngine.parseGeminiRubricResult) {
            throw new Error("El motor de rúbricas no está listo.");
          }

          const parseResult = window.rubricEngine.parseGeminiRubricResult(
            data.result,
            this.importandoRubricaTipo,
            "Rúbrica de " + (this.fotoCapturadaActual.fileName || "Fotografía")
          );

          if (parseResult.error) {
            this.logDiagnosticoRubricaIA({
              categoria: "RUBRIC_PARSE_ERROR",
              fase: "Fase 8-9: Interpretación y conversión de la respuesta en Fernanditio",
              httpCode: res.status,
              geminiCode: "PARSE_RESULT_ERROR",
              fullMessage: parseResult.error,
              model: modelUsed,
              endpoint: endpoint,
              imageSizeBytes: imageSizeBytes,
              mimeType: mimeType,
              peticionEnviada: true,
              geminiRespondioOk: true,
              falloEnInterpretacion: true,
              rawResult: data.result,
              parseError: parseResult.error
            });

            alert(`Aviso de Rúbrica IA (Fallo de Estructuración): ${parseResult.error}\n\n(Consulta la consola F12 para el diagnóstico completo)`);
            return;
          }

          this.logDiagnosticoRubricaIA({
            categoria: "SUCCESS",
            fase: "ÉXITO COMPLETO - Rúbrica generada e interpretada",
            httpCode: 200,
            geminiCode: "SUCCESS",
            fullMessage: "Rúbrica procesada e interpretada correctamente.",
            model: modelUsed,
            endpoint: endpoint,
            imageSizeBytes: imageSizeBytes,
            mimeType: mimeType,
            peticionEnviada: true,
            geminiRespondioOk: true,
            falloEnInterpretacion: false,
            rawResult: data.result
          });

          this.cerrarModalPreviewFoto();
          this.cerrarModal("modalImportarRubrica");
          this.abrirPreviewImportRubrica(parseResult);
        } catch (err) {
          const rawErr = String(err?.message || err);
          const isFetchNetworkError = peticionEnviada && (rawErr.includes("Failed to fetch") || rawErr.includes("NetworkError") || !navigator.onLine);

          this.logDiagnosticoRubricaIA({
            categoria: isFetchNetworkError ? "GEMINI_API_ERROR" : "CAMERA_CAPTURE_ERROR",
            fase: isFetchNetworkError ? "Fase 6: Conexión cliente-servidor (Error de Red)" : "Error en procesamiento local de imagen",
            httpCode: res ? res.status : "N/A",
            geminiCode: isFetchNetworkError ? "NETWORK_ERROR" : "CLIENT_EXCEPTION",
            fullMessage: rawErr,
            model: "gemini-3.8-flash",
            endpoint: endpoint,
            imageSizeBytes: imageSizeBytes,
            mimeType: mimeType,
            peticionEnviada: peticionEnviada,
            geminiRespondioOk: false,
            falloEnInterpretacion: false
          });

          let userMsg = rawErr;
          if (isFetchNetworkError) {
            userMsg = "No se pudo conectar con el servidor web para procesar la fotografía. Comprueba tu conexión a Internet.";
          } else {
            userMsg = `Error al procesar la fotografía: ${rawErr}`;
          }
          alert(`Aviso de Rúbrica IA: ${userMsg}\n\n(Consulta la consola F12 para el diagnóstico técnico completo)`);
        } finally {
          this.isProcessingAI = false;
          this.ocultarWindowsLoading();
          btnsConfirm.forEach(btn => {
            btn.disabled = false;
            btn.innerHTML = '<span style="font-size: 1.1rem;">✅</span> <span>Aceptar foto</span>';
          });
        }
      }

      onArchivoSeleccionado(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        this.selectedRubricaFile = file;

        const lblInfo = document.getElementById("lblRubricaArchivoInfo");
        const boxAcciones = document.getElementById("boxAccionesArchivo");

        if (lblInfo) {
          lblInfo.textContent = `📄 Archivo seleccionado: ${file.name} (${Math.round(file.size / 1024)} KB)`;
          lblInfo.style.display = "block";
        }

        if (boxAcciones) {
          boxAcciones.style.display = "flex";
        }
      }

      async procesarArchivoRubricaEstandar() {
        let file = this.selectedRubricaFile;
        if (!file) {
          const input = document.getElementById("inputRubricaArchivo");
          if (input && input.files && input.files[0]) {
            file = input.files[0];
          }
        }

        if (!file) {
          alert("Por favor, selecciona primero un archivo.");
          return;
        }

        try {
          if (!window.rubricEngine || !window.rubricEngine.parseRubricFile) {
            alert("El motor de rúbricas se está cargando. Por favor, reintenta en un momento.");
            return;
          }

          const result = await window.rubricEngine.parseRubricFile(file, this.importandoRubricaTipo);

          if (result.error) {
            alert(result.error);
            return;
          }

          this.cerrarModal("modalImportarRubrica");
          this.abrirPreviewImportRubrica(result);
        } catch (err) {
          console.error("Error al procesar el archivo:", err);
          alert(`Error al procesar el archivo: ${err.message || err}`);
        }
      }

      async procesarArchivoRubricaIA() {
        if (this.isProcessingAI) {
          this.mostrarNotificacionToast("⌛ Ya hay un análisis con IA en curso. Por favor, espera...", 3000);
          return;
        }

        let file = this.selectedRubricaFile;
        if (!file) {
          const input = document.getElementById("inputRubricaArchivo");
          if (input && input.files && input.files[0]) {
            file = input.files[0];
          }
        }

        if (!file) {
          alert("Por favor, selecciona primero un archivo o imagen.");
          return;
        }

        // Validación 1: Tamaño máximo de archivo (15 MB)
        const MAX_FILE_SIZE = 15 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE) {
          alert("El archivo seleccionado es demasiado grande (máximo 15 MB). Por favor, selecciona un archivo de menor tamaño.");
          return;
        }

        // Validación 2: Extensión compatible
        const fileNameLower = file.name.toLowerCase();
        const allowedExtensions = [".docx", ".doc", ".xlsx", ".xls", ".pdf", ".png", ".jpg", ".jpeg", ".webp", ".txt", ".json", ".csv"];
        const hasValidExt = allowedExtensions.some(ext => fileNameLower.endsWith(ext));
        if (!hasValidExt) {
          alert("Este tipo de archivo no es compatible. Por favor, selecciona un archivo Word (.docx), Excel (.xlsx), PDF (.pdf), texto o imagen.");
          return;
        }

        this.isProcessingAI = true;

        this.mostrarNotificacionToast("🤖 Analizando archivo de rúbrica con Gemini...", 4000);
        this.mostrarWindowsLoading({
          titulo: "Loading...",
          mensaje: `Fernanditio está procesando "${file.name}" con IA...`,
          subtitulo: "Extrayendo enunciados y vinculando criterios de evaluación oficiales."
        });

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000);

        try {
          let fileData = null;
          let textContent = null;
          const isImage = file.type.startsWith("image/") || fileNameLower.match(/\.(png|jpg|jpeg|webp)$/i);

          if (isImage) {
            const opt = await this.optimizarImagenParaIA(file, 1400, 0.78);
            fileData = opt.dataUrl;
          } else if (fileNameLower.endsWith(".json") || fileNameLower.endsWith(".txt") || fileNameLower.endsWith(".csv")) {
            textContent = await file.text();
            fileData = null;
          } else if (fileNameLower.endsWith(".docx")) {
            // Extracción nativa de texto/tablas Word en el cliente para máxima precisión
            try {
              if (window.mammoth) {
                const arrayBuffer = await file.arrayBuffer();
                const resMammoth = await window.mammoth.extractRawText({ arrayBuffer });
                if (resMammoth && resMammoth.value && resMammoth.value.trim().length > 20) {
                  textContent = resMammoth.value.trim();
                }
              }
            } catch (mErr) {
              console.warn("Extracción de texto Word fallida en cliente, enviando archivo Base64:", mErr);
            }
            if (!textContent) {
              fileData = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
              });
            }
          } else if (fileNameLower.endsWith(".xlsx") || fileNameLower.endsWith(".xls")) {
            // Extracción nativa de Excel a CSV en el cliente
            try {
              if (window.XLSX) {
                const arrayBuffer = await file.arrayBuffer();
                const wb = window.XLSX.read(arrayBuffer, { type: "array" });
                if (wb && wb.SheetNames && wb.SheetNames.length > 0) {
                  const sheet = wb.Sheets[wb.SheetNames[0]];
                  const csvText = window.XLSX.utils.sheet_to_csv(sheet);
                  if (csvText && csvText.trim().length > 10) {
                    textContent = csvText.trim();
                  }
                }
              }
            } catch (xErr) {
              console.warn("Extracción de texto Excel fallida en cliente, enviando archivo Base64:", xErr);
            }
            if (!textContent) {
              fileData = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
              });
            }
          } else {
            fileData = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target.result);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
          }

          let criteriosCurso = (this.grupoActivo && Array.isArray(this.grupoActivo.criterios) && this.grupoActivo.criterios.length > 0)
            ? this.grupoActivo.criterios.map(c => ({ codigo: c.codigo, descripcion: c.descripcion || `Criterio ${c.codigo}` }))
            : [];

          if (criteriosCurso.length === 0 && this.data && Array.isArray(this.data.grupos)) {
            for (const g of this.data.grupos) {
              if (Array.isArray(g.criterios) && g.criterios.length > 0) {
                criteriosCurso = g.criterios.map(c => ({ codigo: c.codigo, descripcion: c.descripcion || `Criterio ${c.codigo}` }));
                break;
              }
            }
          }

          const cursoInfo = this.grupoActivo 
            ? `${this.grupoActivo.nombre || ''} - ${this.grupoActivo.curso || ''} ${this.grupoActivo.materia || ''}`.trim()
            : "";

          let peticionEnviada = false;
          let res = null;
          const mime = file.type || (isImage ? "image/jpeg" : "application/pdf");
          const sizeBytes = file.size || 0;
          const endpoint = "/api/gemini/parse-rubric";

          peticionEnviada = true;
          res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
              fileData: fileData,
              mimeType: mime,
              text: textContent,
              tipo: this.importandoRubricaTipo,
              criteriosCurso: criteriosCurso,
              cursoInfo: cursoInfo
            })
          });

          clearTimeout(timeoutId);

          const resText = await res.text();
          let data = null;
          try {
            data = JSON.parse(resText);
          } catch (e) {
            data = { error: `Respuesta no JSON del servidor (HTTP ${res.status}): ${resText.substring(0, 200)}` };
          }

          if (!res.ok || !data.success || data.error) {
            const errDetails = data.details || {};
            const errMessage = data.error || errDetails.fullMessage || "Error desconocido devuelto por el servidor.";

            this.logDiagnosticoRubricaIA({
              categoria: "GEMINI_API_ERROR",
              fase: "Fase 6-7: Envío a Gemini API / Respuesta del Servidor (Archivo)",
              httpCode: res.status,
              geminiCode: errDetails.geminiCode || (res.status === 413 ? "PAYLOAD_TOO_LARGE" : `HTTP_${res.status}`),
              fullMessage: errMessage,
              model: errDetails.modelAttempted || "gemini-3.8-flash",
              endpoint: endpoint,
              imageSizeBytes: sizeBytes,
              mimeType: mime,
              peticionEnviada: true,
              geminiRespondioOk: false,
              falloEnInterpretacion: false
            });

            let userMsg = errMessage;
            if (res.status === 413) {
              userMsg = "El archivo es demasiado grande para ser procesado. Intenta subir un archivo de menor tamaño.";
            } else if (res.status === 429) {
              userMsg = "Se ha alcanzado el límite de peticiones de IA. Espera unos segundos e inténtalo de nuevo.";
            } else if (res.status === 503) {
              userMsg = "Los servidores de IA están experimentando alta demanda. Por favor reintenta en unos segundos.";
            }
            alert(`Aviso de Rúbrica IA (HTTP ${res.status}): ${userMsg}\n\n(Consulta la consola F12 para el diagnóstico técnico completo)`);
            return;
          }

          const modelUsed = data.meta?.modelUsed || "gemini-3.8-flash";

          const parseResult = window.rubricEngine.parseGeminiRubricResult(
            data.result,
            this.importandoRubricaTipo,
            "Rúbrica de " + file.name
          );

          if (parseResult.error) {
            this.logDiagnosticoRubricaIA({
              categoria: "RUBRIC_PARSE_ERROR",
              fase: "Fase 8-9: Interpretación y conversión de la respuesta (Archivo)",
              httpCode: res.status,
              geminiCode: "PARSE_RESULT_ERROR",
              fullMessage: parseResult.error,
              model: modelUsed,
              endpoint: endpoint,
              imageSizeBytes: sizeBytes,
              mimeType: mime,
              peticionEnviada: true,
              geminiRespondioOk: true,
              falloEnInterpretacion: true,
              rawResult: data.result,
              parseError: parseResult.error
            });

            alert(`Aviso de Rúbrica IA (Fallo de Estructuración): ${parseResult.error}\n\n(Consulta la consola F12 para el diagnóstico completo)`);
            return;
          }

          this.logDiagnosticoRubricaIA({
            categoria: "SUCCESS",
            fase: "ÉXITO COMPLETO - Rúbrica de archivo generada e interpretada",
            httpCode: 200,
            geminiCode: "SUCCESS",
            fullMessage: "Rúbrica procesada e interpretada correctamente.",
            model: modelUsed,
            endpoint: endpoint,
            imageSizeBytes: sizeBytes,
            mimeType: mime,
            peticionEnviada: true,
            geminiRespondioOk: true,
            falloEnInterpretacion: false,
            rawResult: data.result
          });

          this.cerrarModal("modalImportarRubrica");
          this.abrirPreviewImportRubrica(parseResult);
        } catch (err) {
          console.error("Error al procesar el archivo con Gemini:", err);
          const rawErr = String(err?.message || err);
          let userMsg = rawErr;
          if (err?.name === "AbortError") {
            userMsg = "No se ha podido conectar con el asistente de IA (tiempo de espera agotado). Inténtalo de nuevo.";
          } else if (rawErr.includes("Failed to fetch") || rawErr.includes("NetworkError")) {
            userMsg = "No se pudo conectar con el servidor para procesar el archivo. Por favor, comprueba tu conexión y vuelve a intentarlo.";
          }
          alert(`Aviso de Rúbrica IA: ${userMsg}\n\n(Consulta la consola F12 para el diagnóstico técnico completo)`);
        } finally {
          this.isProcessingAI = false;
          this.ocultarWindowsLoading();
        }
      }

      procesarBotonRubricaIA() {
        if (this.fotoCapturadaActual && this.fotoCapturadaActual.dataUrl) {
          this.abrirModalPreviewFoto(this.fotoCapturadaActual.dataUrl, this.fotoCapturadaActual.fileName);
        } else if (this.selectedRubricaFile) {
          const file = this.selectedRubricaFile;
          const isImage = file.type.startsWith("image/") || /\.(png|jpg|jpeg|webp)$/i.test(file.name);
          if (isImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const res = e.target && e.target.result;
              if (res) this.abrirModalPreviewFoto(res, file.name);
            };
            reader.readAsDataURL(file);
            return;
          }
          this.procesarArchivoRubricaIA();
        } else {
          this.mostrarNotificacionToast("📷 Elige sacar una foto o seleccionar un archivo para analizar con IA.", 3500);
          this.abrirImportadorRubrica(this.tipoRubricaVentanaActiva || 'actividades');
        }
      }

      async procesarTextoPegadoRubrica() {
        const textarea = document.getElementById("textareaRubricaTexto");
        const text = textarea ? textarea.value : "";
        if (!text || !text.trim()) {
          alert("Por favor, pegue el texto de la rúbrica antes de continuar.");
          return;
        }

        const inputTitulo = document.getElementById("inputRubricaTituloPegado");
        const customTitle = inputTitulo ? inputTitulo.value.trim() : "";

        try {
          if (!window.rubricEngine || !window.rubricEngine.parseRubricText) {
            alert("El motor de rúbricas se está cargando. Por favor, reintenta en un momento.");
            return;
          }

          const result = await window.rubricEngine.parseRubricText(text, this.importandoRubricaTipo, customTitle);

          if (result.error) {
            alert(result.error);
            return;
          }

          this.cerrarModal("modalImportarRubrica");
          this.abrirPreviewImportRubrica(result);
        } catch (err) {
          console.error("Error al procesar el texto de la rúbrica:", err);
          alert(`Error al procesar el texto: ${err.message || err}`);
        }
      }

      async procesarArchivoRubrica(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        try {
          if (!window.rubricEngine || !window.rubricEngine.parseRubricFile) {
            alert("El motor de rúbricas se está cargando. Por favor, reintenta en un momento.");
            return;
          }

          const result = await window.rubricEngine.parseRubricFile(file, this.importandoRubricaTipo);

          if (result.error) {
            alert(result.error);
            return;
          }

          this.cerrarModal("modalImportarRubrica");
          this.cerrarModal("modalImportarRubricaArchivo");
          this.abrirPreviewImportRubrica(result);
        } catch (err) {
          console.error("Error al procesar archivo de rúbrica:", err);
          alert(`Error al procesar el archivo: ${err.message || err}`);
        }
      }

      abrirPreviewImportRubrica(parseResult) {
        if (!parseResult) return;

        // Respetar prioritariamente el tipo seleccionado por el usuario en el importador
        if (this.isTipoExamen(this.importandoRubricaTipo) || this.isTipoExamen(parseResult.tipo) || this.isTipoExamen(parseResult.titulo)) {
          parseResult.tipo = "examen";
          if (parseResult.rubrica) parseResult.rubrica.tipo = "examen";
        } else if (this.isTipoTrabajo(this.importandoRubricaTipo) || this.isTipoTrabajo(parseResult.tipo)) {
          parseResult.tipo = "trabajos";
          if (parseResult.rubrica) parseResult.rubrica.tipo = "trabajos";
        } else {
          parseResult.tipo = "actividades";
          if (parseResult.rubrica) parseResult.rubrica.tipo = "actividades";
        }

        // Normalizar estructura jerárquica de actividades y epígrafes
        if (window.rubricEngine && window.rubricEngine.normalizarJerarquiaActividades && Array.isArray(parseResult.items)) {
          parseResult.items = window.rubricEngine.normalizarJerarquiaActividades(parseResult.items);
        }

        // Si es examen, asegurar que los ítems tienen puntuación máxima asignada y suman 10 pts
        if (this.isTipoExamen(parseResult.tipo) && Array.isArray(parseResult.items) && parseResult.items.length > 0) {
          const itemsConPuntos = parseResult.items.filter(it => it.maxScore !== undefined && it.maxScore !== null && !isNaN(Number(it.maxScore)) && Number(it.maxScore) > 0);
          if (itemsConPuntos.length === 0) {
            const count = parseResult.items.length;
            const perItem = Math.round((10 / count) * 100) / 100;
            parseResult.items.forEach((it, idx) => {
              it.maxScore = idx === count - 1 ? Math.round((10 - perItem * (count - 1)) * 100) / 100 : perItem;
            });
          }
        }

        this.currentRubricaPreview = parseResult;
        const tituloInput = document.getElementById("previewRubricaTituloInput");
        if (tituloInput) tituloInput.value = parseResult.titulo || parseResult.title || (this.isTipoExamen(parseResult.tipo) ? "Rúbrica de Examen" : "Nueva Rúbrica Importada");

        const badge = document.getElementById("previewRubricaTipoBadge");
        if (badge) {
          if (this.isTipoExamen(parseResult.tipo)) {
            badge.style.background = "#fce7f3";
            badge.style.color = "#9d174d";
            badge.textContent = "💯 Rúbrica de Examen";
          } else if (this.isTipoTrabajo(parseResult.tipo)) {
            badge.style.background = "#ffedd5";
            badge.style.color = "#9a3412";
            badge.textContent = "📊 Rúbrica de Trabajo (S / A / B / SB)";
          } else {
            badge.style.background = "#dbeafe";
            badge.style.color = "#1e40af";
            badge.textContent = "📝 Rúbrica de Actividades";
          }
        }

        const thMaxScore = document.getElementById("thPreviewMaxScore");
        if (thMaxScore) {
          thMaxScore.style.display = this.isTipoExamen(parseResult.tipo) ? "table-cell" : "none";
        }

        // Población de datalist de criterios
        const dl = document.getElementById("dlCriteriosGrupo");
        if (dl) {
          dl.innerHTML = "";
          if (this.grupoActivo && this.grupoActivo.criterios) {
            this.grupoActivo.criterios.forEach(crit => {
              const opt = document.createElement("option");
              opt.value = crit.codigo;
              opt.textContent = `${crit.codigo} - ${(crit.descripcion || '').substring(0, 50)}...`;
              dl.appendChild(opt);
            });
          }
        }

        this.actualizarLabelsDisponibilidadUI();
        const rPrivImport = document.getElementById("importRubDispPrivada");
        if (rPrivImport) rPrivImport.checked = true;

        this.renderTablaPreviewItems();
        this.abrirModal("modalPreviewImportRubrica");
      }

      renderTablaPreviewItems() {
        if (!this.currentRubricaPreview) return;
        const tbody = document.getElementById("previewRubricaTbody");
        if (!tbody) return;
        tbody.innerHTML = "";

        const items = this.currentRubricaPreview.items || [];
        const isExamen = this.isTipoExamen(this.currentRubricaPreview.tipo);
        const grupoCriteriosCodes = (this.grupoActivo && this.grupoActivo.criterios) ? this.grupoActivo.criterios.map(c => String(c.codigo).trim()) : [];

        // Ejecutar validación unificada
        let validation = { esValida: true, errores: [], advertencias: [], itemsSinCriterio: 0, criteriosDetectados: [], criteriosMissing: [] };
        if (window.rubricEngine && window.rubricEngine.validarRubrica) {
          validation = window.rubricEngine.validarRubrica(this.currentRubricaPreview, grupoCriteriosCodes);
        }

        // Actualizar métricas
        const mItems = document.getElementById("metricItemsCount");
        const mCrit = document.getElementById("metricCriteriosCount");
        const mSinCrit = document.getElementById("metricSinCriterioCount");
        const mMissing = document.getElementById("metricCriteriosMissingCount");

        if (mItems) mItems.textContent = items.length;
        if (mCrit) mCrit.textContent = (validation.criteriosDetectados || []).length;
        if (mSinCrit) mSinCrit.textContent = validation.itemsSinCriterio || 0;
        if (mMissing) mMissing.textContent = (validation.criteriosMissing || []).length;

        items.forEach((item, idx) => {
          const tr = document.createElement("tr");
          let rawCritVal = (item.criterio !== undefined && item.criterio !== null && String(item.criterio).trim() !== '')
            ? String(item.criterio)
            : ((item.criterios && item.criterios.length > 0) ? item.criterios.join('; ') : '');
          rawCritVal = rawCritVal.trim();

          const normFunc = (window.rubricEngine && window.rubricEngine.normalizeCriterionCode) 
            ? window.rubricEngine.normalizeCriterionCode 
            : (s => String(s || '').trim());
          const cleanFunc = (window.rubricEngine && window.rubricEngine.cleanCriterioCodes)
            ? window.rubricEngine.cleanCriterioCodes
            : (s => String(s || '').split(/[;,]/).map(x => x.trim()).filter(Boolean));

          const itemCodes = cleanFunc(rawCritVal);
          const matchedCourseCodes = [];
          const missingCourseCodes = [];

          itemCodes.forEach(code => {
            const norm = normFunc(code);
            const found = (this.grupoActivo && this.grupoActivo.criterios)
              ? this.grupoActivo.criterios.find(c => normFunc(c.codigo) === norm)
              : null;
            if (found) {
              matchedCourseCodes.push(found.codigo);
            } else {
              missingCourseCodes.push(code);
            }
          });

          const isCritValid = itemCodes.length > 0 && missingCourseCodes.length === 0;
          const displayCritCode = itemCodes.length > 0 ? itemCodes.join('; ') : rawCritVal;

          const safeDisplayCritCode = this.escapeHtml(displayCritCode);
          const safeMatched = matchedCourseCodes.map(c => this.escapeHtml(c)).join('; ');
          const safeMissing = missingCourseCodes.map(c => this.escapeHtml(c)).join('; ');

          let estadoBadge = '';
          if (itemCodes.length === 0) {
            estadoBadge = `<span style="background: #fff7ed; color: #c2410c; border: 1px solid #fed7aa; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; display: inline-block;">⚠️ Sin Criterio</span>`;
          } else if (isCritValid || (this.grupoActivo && this.grupoActivo.criterios && this.grupoActivo.criterios.length === 0)) {
            estadoBadge = `<span style="background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; display: inline-block;" title="Criterio(s) oficial(es) del curso">✓ Apto (${safeDisplayCritCode})</span>`;
          } else if (matchedCourseCodes.length > 0 && missingCourseCodes.length > 0) {
            estadoBadge = `<span style="background: #fefce8; color: #854d0e; border: 1px solid #fef08a; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; display: inline-block;" title="Algunos criterios son nuevos">${safeMatched} (Nuevo: ${safeMissing})</span>`;
          } else {
            estadoBadge = `<span style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; display: inline-block;" title="Se integrará automáticamente al confirmar">ℹ️ Nuevo (${safeDisplayCritCode})</span>`;
          }

          const actNumVal = item.numActividad || item.orderLabel || item.order || (idx + 1);
          const safeActNum = this.escapeHtml(actNumVal);
          const safeTitle = this.escapeHtml(item.titulo || item.title || '');

          tr.innerHTML = `
            <td style="text-align: center; width: 85px;">
              <input type="text" class="form-control" style="font-size: 0.82rem; padding: 4px 4px; font-weight: 800; text-align: center; color: #1e40af; background: #eff6ff; width: 100%; box-sizing: border-box;" value="${safeActNum}" onchange="app.updatePreviewItemField(${idx}, 'numActividad', this.value)" title="Número de actividad del libro (ej. 1, 2.a, 2.b, 3)" placeholder="Nº Act" />
            </td>
            <td>
              <input type="text" class="form-control" style="font-size: 0.82rem; padding: 4px 6px;" value="${safeTitle}" onchange="app.updatePreviewItemField(${idx}, 'titulo', this.value)" />
            </td>
            <td>
              <input type="text" list="dlCriteriosGrupo" class="form-control ${itemCodes.length === 0 ? 'border-warning' : (!isCritValid && grupoCriteriosCodes.length > 0 ? 'border-info' : '')}" style="font-size: 0.82rem; padding: 4px 6px; font-weight: 700; text-align: center; ${itemCodes.length === 0 ? 'background:#fff7ed;' : ''}" value="${safeDisplayCritCode}" onchange="app.updatePreviewItemField(${idx}, 'criterio', this.value)" placeholder="Ej. 1.1; 2.3" />
            </td>
            <td style="text-align: center;">
              ${estadoBadge}
            </td>
            <td style="text-align: center;">
              <input type="number" step="1" min="0" max="100" class="form-control" style="font-size: 0.82rem; padding: 4px 6px; text-align: center;" value="${item.peso || 10}" onchange="app.updatePreviewItemField(${idx}, 'peso', parseFloat(this.value) || 0)" />
            </td>
            ${isExamen ? `
              <td style="text-align: center;">
                <input type="number" step="0.1" min="0" max="10" class="form-control" style="font-size: 0.82rem; padding: 4px 6px; text-align: center; font-weight: 700;" value="${item.maxScore || 1}" onchange="app.updatePreviewItemField(${idx}, 'maxScore', parseFloat(this.value) || 0)" />
              </td>
            ` : ""}
            <td style="text-align: center;">
              <button class="btn btn-danger btn-sm" style="padding: 2px 6px;" onclick="app.eliminarFilaPreview(${idx})" title="Eliminar fila">&times;</button>
            </td>
          `;
          tbody.appendChild(tr);
        });

        this.actualizarSumatorioPreviewExamen(validation);
      }

      updatePreviewItemField(idx, field, val) {
        if (!this.currentRubricaPreview || !this.currentRubricaPreview.items[idx]) return;
        if (field === 'numActividad') {
          this.currentRubricaPreview.items[idx].numActividad = val;
          this.currentRubricaPreview.items[idx].orderLabel = val;
        } else if (field === 'criterio') {
          const trimmedVal = String(val).trim();
          const cleanCodes = (window.rubricEngine && window.rubricEngine.cleanCriterioCodes)
            ? window.rubricEngine.cleanCriterioCodes(trimmedVal)
            : trimmedVal.split(/[;,]/).map(s => s.trim()).filter(Boolean);
          const formatted = cleanCodes.length > 0 ? cleanCodes.join('; ') : trimmedVal;
          this.currentRubricaPreview.items[idx].criterio = formatted;
          this.currentRubricaPreview.items[idx].criterios = cleanCodes;
          this.currentRubricaPreview.items[idx].criterioText = formatted;
        } else {
          this.currentRubricaPreview.items[idx][field] = val;
        }
        this.renderTablaPreviewItems();
      }

      obtenerCriterioOrtografiaCodigo() {
        let fullText = "";
        if (this.grupoActivo) {
          fullText += ` ${this.grupoActivo.nombre || ""} ${this.grupoActivo.curso || ""} ${this.grupoActivo.materia || ""}`;
        }
        if (this.currentRubricaPreview && this.currentRubricaPreview.titulo) {
          fullText += ` ${this.currentRubricaPreview.titulo}`;
        }
        if (this.manualRubricaTitulo) {
          fullText += ` ${this.manualRubricaTitulo}`;
        }

        const textLower = fullText.toLowerCase();

        // 3º ESO y 2º Bach (Bach2º) -> Criterio 5.2
        const esTerceroEso = /3\s*º?\s*eso/i.test(textLower) || /tercero\s*eso/i.test(textLower) || /\b3\s*º\b/i.test(textLower);
        const esSegundoBach = /2\s*º?\s*bach/i.test(textLower) || /bach\s*2\s*º?/i.test(textLower) || /segundo\s*bach/i.test(textLower) || /2\s*bach/i.test(textLower);

        // 2º ESO -> Criterio 5.3
        const esSegundoEso = /2\s*º?\s*eso/i.test(textLower) || /segundo\s*eso/i.test(textLower) || (/\b2\s*º\b/i.test(textLower) && !esSegundoBach);

        const criteriosGrupo = (this.grupoActivo && Array.isArray(this.grupoActivo.criterios)) ? this.grupoActivo.criterios : [];
        const tiene52 = criteriosGrupo.some(c => String(c.codigo).trim() === "5.2");
        const tiene53 = criteriosGrupo.some(c => String(c.codigo).trim() === "5.3");
        const tiene51 = criteriosGrupo.some(c => String(c.codigo).trim() === "5.1");

        if (esTerceroEso || esSegundoBach) {
          return "5.2";
        }
        if (esSegundoEso) {
          return "5.3";
        }

        if (tiene52 && !tiene51 && !tiene53) {
          return "5.2";
        }
        if (tiene53 && !tiene51 && !tiene52) {
          return "5.3";
        }

        return "5.1";
      }

      agregarOrtografiaEnPreview() {
        if (!this.currentRubricaPreview) return;
        if (!this.currentRubricaPreview.items) this.currentRubricaPreview.items = [];

        const yaExiste = this.currentRubricaPreview.items.some(it => it.isOrtografia || it.titulo === "Ortografía" || (it.id && String(it.id).startsWith("item-ortografia")));
        if (yaExiste) {
          this.mostrarToast("⚠️ La rúbrica ya contiene el ítem de Ortografía.");
          return;
        }

        const critCodigo = this.obtenerCriterioOrtografiaCodigo();
        const newOrder = (this.currentRubricaPreview.items.length > 0) ? Math.max(...this.currentRubricaPreview.items.map(i => i.order || 0)) + 1 : 1;
        this.currentRubricaPreview.items.push({
          id: "item-ortografia-" + Date.now(),
          order: newOrder,
          titulo: "Ortografía",
          criterio: critCodigo,
          criterios: [critCodigo],
          isOrtografia: true,
          isExtra: true,
          maxScore: 10,
          peso: 0
        });

        this.renderTablaPreviewItems();
        this.mostrarToast(`✍️ Ítem 'Ortografía' (Criterio ${critCodigo}) añadido al final de la rúbrica.`);
      }

      agregarFilaManualEnPreview() {
        if (!this.currentRubricaPreview) return;
        const newOrder = (this.currentRubricaPreview.items.length > 0) ? Math.max(...this.currentRubricaPreview.items.map(i => i.order || 0)) + 1 : 1;
        this.currentRubricaPreview.items.push({
          id: `item-${Date.now()}-${Math.floor(Math.random()*1000)}`,
          order: newOrder,
          titulo: `Pregunta / Actividad ${newOrder}`,
          criterio: "1.1",
          peso: 10,
          maxScore: 1
        });
        this.renderTablaPreviewItems();
      }

      eliminarFilaPreview(idx) {
        if (!this.currentRubricaPreview) return;
        this.currentRubricaPreview.items.splice(idx, 1);
        this.renderTablaPreviewItems();
      }

      actualizarSumatorioPreviewExamen(validation) {
        if (!this.currentRubricaPreview) return;
        const isExamen = this.isTipoExamen(this.currentRubricaPreview.tipo);
        const footerSum = document.getElementById("previewFooterSumIndicator");
        const warningsBox = document.getElementById("previewRubricaWarningsContainer");
        const btnConfirmar = document.getElementById("btnConfirmarImportacionRubrica");

        let htmlWarnings = "";
        const warningsList = (validation && validation.advertencias) ? validation.advertencias : ((validation && validation.warnings) ? validation.warnings : []);
        const errorsList = (validation && validation.errores) ? validation.errores : ((validation && validation.errors) ? validation.errors : []);

        if (warningsList.length > 0) {
          htmlWarnings += `<div class="alert-box alert-warning" style="margin-bottom: 10px; font-size: 0.82rem;">`;
          warningsList.forEach(w => {
            htmlWarnings += `<div>⚠️ ${w}</div>`;
          });
          htmlWarnings += `</div>`;
        }
        if (errorsList.length > 0) {
          htmlWarnings += `<div class="alert-box alert-danger" style="margin-bottom: 10px; font-size: 0.82rem;">`;
          errorsList.forEach(e => {
            htmlWarnings += `<div>❌ ${e}</div>`;
          });
          htmlWarnings += `</div>`;
        }

        if (warningsBox) warningsBox.innerHTML = htmlWarnings;

        if (isExamen) {
          const mainItems = (this.currentRubricaPreview.items || []).filter(it => !it.isOrtografia && !it.isExtra);
          const sum = mainItems.reduce((acc, it) => acc + (Number(it.maxScore) || 0), 0);
          const diff = Math.abs(sum - 10);

          if (diff < 0.01) {
            if (footerSum) footerSum.innerHTML = `<span style="color: #16a34a;">✅ Suma total de puntuaciones máximas de examen: <strong>10 / 10 pts</strong></span>`;
          } else {
            if (footerSum) footerSum.innerHTML = `<span style="color: #dc2626;">⚠️ Suma total de preguntas de examen: <strong>${sum.toFixed(2)} / 10 pts</strong> (Debe ser exactamente 10)</span>`;
          }
        } else {
          if (footerSum) footerSum.innerHTML = `<span style="color: #64748b;">Ítems listados: <strong>${this.currentRubricaPreview.items.length}</strong></span>`;
        }
      }

      confirmarImportacionRubrica() {
        if (!this.currentRubricaPreview) return;

        const tituloInput = document.getElementById("previewRubricaTituloInput");
        const titulo = tituloInput ? tituloInput.value.trim() : "";
        if (!titulo) {
          alert("Por favor, introduce un título para la rúbrica.");
          return;
        }

        const items = this.currentRubricaPreview.items || [];
        if (items.length === 0) {
          alert("La rúbrica debe contener al menos un ítem o pregunta.");
          return;
        }

        const isExamen = this.isTipoExamen(this.currentRubricaPreview.tipo) || this.isTipoExamen(this.importandoRubricaTipo);
        if (isExamen) {
          const mainItems = items.filter(it => !it.isOrtografia && !it.isExtra);
          let sum = mainItems.reduce((acc, it) => acc + (Number(it.maxScore) || 0), 0);
          if (sum <= 0) {
            const count = mainItems.length || 1;
            const perItem = Math.round((10 / count) * 100) / 100;
            mainItems.forEach((it, idx) => {
              it.maxScore = idx === count - 1 ? Math.round((10 - perItem * (count - 1)) * 100) / 100 : perItem;
            });
            sum = 10;
          } else if (Math.abs(sum - 10) > 0.01) {
            alert(`No se puede guardar el examen. La suma de puntuaciones máximas de las preguntas es ${sum.toFixed(2)} pts y debe ser exactamente 10 pts.`);
            return;
          }
        }

        const normFunc = (window.rubricEngine && window.rubricEngine.normalizeCriterionCode) 
          ? window.rubricEngine.normalizeCriterionCode 
          : (s => String(s || '').trim());
        const cleanFunc = (window.rubricEngine && window.rubricEngine.cleanCriterioCodes) 
          ? window.rubricEngine.cleanCriterioCodes 
          : (s => [String(s || '').trim()].filter(Boolean));

        const cursoCriterios = (this.grupoActivo && this.grupoActivo.criterios) ? this.grupoActivo.criterios : [];

        const rawTipo = (isExamen ? "examen" : null) || this.importandoRubricaTipo || (this.currentRubricaPreview && this.currentRubricaPreview.tipo) || "Actividad";
        const normTipo = this.normalizarTipoActividad(rawTipo, titulo);

        const radioCompartida = document.getElementById("importRubDispCompartida");
        const esCompartida = radioCompartida ? radioCompartida.checked : false;

        const nuevaRub = {
          id: "rub-" + Date.now() + "-" + Math.floor(Math.random() * 10000),
          titulo: titulo,
          tipo: normTipo,
          descripcion: `Rúbrica de ${normTipo} importada`,
          fechaCreacion: new Date().toISOString().split("T")[0],
          origenGrupoId: this.grupoActivo.id,
          esCompartida: esCompartida,
          items: items.map((it, index) => {
            const rawCrit = (it.criterio || it.criterioText || (Array.isArray(it.criterios) ? it.criterios.join('; ') : "") || "").trim();
            const extractedCodes = cleanFunc(rawCrit);

            const canonicalCodes = extractedCodes.map(code => {
              const matched = cursoCriterios.find(c => normFunc(c.codigo) === normFunc(code));
              return matched ? matched.codigo : normFunc(code);
            }).filter(Boolean);

            const finalCritStr = canonicalCodes.length > 0 ? canonicalCodes.join('; ') : (rawCrit ? normFunc(rawCrit) : '');
            const numActLabel = String(it.numActividad || it.orderLabel || it.order || (index + 1));

            return {
              id: it.id || `item-${index + 1}`,
              order: it.order || index + 1,
              orderLabel: numActLabel,
              numActividad: numActLabel,
              titulo: it.titulo || it.title || `Actividad ${numActLabel}`,
              title: it.titulo || it.title || `Actividad ${numActLabel}`,
              criterio: finalCritStr,
              criterios: canonicalCodes.length > 0 ? canonicalCodes : (finalCritStr ? [finalCritStr] : []),
              peso: isExamen ? 10 : (Number(it.peso) || 10),
              maxScore: isExamen ? (Number(it.maxScore) || 1) : undefined
            };
          })
        };

        // Crear/registrar plantilla
        this.crearOActualizarPlantilla(nuevaRub, this.grupoActivo.id, esCompartida);

        if (!this.grupoActivo.rubricas) this.grupoActivo.rubricas = [];
        this.grupoActivo.rubricas.push(nuevaRub);

        // Garantizar persistencia actualizando el grupo en este.data.grupos
        if (this.data && this.data.grupos) {
          const gIdx = this.data.grupos.findIndex(g => g.id === this.grupoActivo.id);
          if (gIdx !== -1) {
            this.data.grupos[gIdx] = this.grupoActivo;
          }
        }

        // Integrar criterios y secciones automáticamente en Fernanditio
        this.crearOActualizarSeccionesYColumnasParaRubrica(nuevaRub);

        this.guardarDatos();
        this.cerrarModal("modalPreviewImportRubrica");
        this.renderizarRubricasView();
        if (this.vistaActiva === "cuaderno") {
          this.renderizarCuaderno();
        }
        this.mostrarToast("✅ Rúbrica importada e integrada correctamente en Fernanditio.");
      }

      // --- MÉTODOS DE MAPA DE EVALUACIÓN Y REVISIÓN DE EVIDENCIAS ---
      abrirMapaEvaluacion() {
        if (!this.grupoActivo) return;
        this.cambiarTabMapaEvaluacion('actToCrit');
        this.abrirModal("modalMapaEvaluacion");
      }

      cambiarTabMapaEvaluacion(tab) {
        const btnActToCrit = document.getElementById("tabMapaActToCrit");
        const btnCritToAct = document.getElementById("tabMapaCritToAct");
        const vistaActToCrit = document.getElementById("vistaMapaActToCrit");
        const vistaCritToAct = document.getElementById("vistaMapaCritToAct");

        if (tab === 'actToCrit') {
          if (btnActToCrit) btnActToCrit.classList.add("active");
          if (btnCritToAct) btnCritToAct.classList.remove("active");
          if (vistaActToCrit) vistaActToCrit.style.display = "block";
          if (vistaCritToAct) vistaCritToAct.style.display = "none";
          this.renderizarMapaActividadACriterios();
        } else {
          if (btnCritToAct) btnCritToAct.classList.add("active");
          if (btnActToCrit) btnActToCrit.classList.remove("active");
          if (vistaCritToAct) vistaCritToAct.style.display = "block";
          if (vistaActToCrit) vistaActToCrit.style.display = "none";

          // Poblar selector de criterios
          const select = document.getElementById("selectCritMapaEvaluacion");
          if (select) {
            select.innerHTML = "";
            (this.grupoActivo.criterios || []).forEach(c => {
              const opt = document.createElement("option");
              opt.value = c.codigo;
              opt.textContent = `${c.codigo} - ${c.descripcion || ''}`;
              select.appendChild(opt);
            });
            if (this.grupoActivo.criterios && this.grupoActivo.criterios.length > 0) {
              this.renderizarMapaCriterioAActividades(this.grupoActivo.criterios[0].codigo);
            }
          }
        }
      }

      renderizarMapaActividadACriterios() {
        const tbody = document.getElementById("tablaMapaActToCritBody");
        if (!tbody || !this.grupoActivo) return;
        tbody.innerHTML = "";

        const evalKey = this.evaluacionActiva || "eval1";
        const evalData = (this.grupoActivo.evaluaciones && this.grupoActivo.evaluaciones[evalKey]) || { actividades: [], calificaciones: {} };
        const actividades = evalData.actividades || [];
        const secciones = this.grupoActivo.secciones || [];

        if (actividades.length === 0) {
          tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">No hay actividades registradas en la evaluación actual.</td></tr>`;
          return;
        }

        actividades.forEach(act => {
          const tr = document.createElement("tr");
          const sec = secciones.find(s => s.id === act.seccionId);
          const crits = act.criterios || [];
          const rub = act.rubricaId ? (this.grupoActivo.rubricas || []).find(r => r.id === act.rubricaId) : null;

          const tipoNorm = this.getTipoActividad(act);
          let tipoBadge = `<span style="background:#dbeafe; color:#1e40af; padding:3px 8px; border-radius:6px; font-weight:700; font-size:0.75rem;">ACTIVIDAD</span>`;
          if (tipoNorm === "Examen") {
            tipoBadge = `<span style="background:#fce7f3; color:#9d174d; padding:3px 8px; border-radius:6px; font-weight:700; font-size:0.75rem;">EXAMEN</span>`;
          } else if (tipoNorm === "Trabajo") {
            tipoBadge = `<span style="background:#ffedd5; color:#9a3412; padding:3px 8px; border-radius:6px; font-weight:700; font-size:0.75rem;">TRABAJO</span>`;
          }

          // Contar notas registradas para esta actividad
          let notasCount = 0;
          const califsAct = evalData.calificaciones ? evalData.calificaciones[act.id] : null;
          if (califsAct) {
            notasCount = Object.values(califsAct).filter(v => v !== undefined && v !== null && v !== "").length;
          }

          const critsBadges = crits.map(c => `<span style="background:#f1f5f9; color:#1e293b; border:1px solid #cbd5e1; padding:2px 6px; border-radius:4px; font-weight:700; font-size:0.75rem; margin-right:4px;">${c}</span>`).join("");

          tr.innerHTML = `
            <td>${tipoBadge}</td>
            <td><strong>${this.escapeHtml(act.nombre)}</strong></td>
            <td>${sec ? this.escapeHtml(sec.nombre) : '-'}</td>
            <td>${critsBadges || '<span style="color:var(--text-muted); font-size:0.8rem;">Sin criterio</span>'}</td>
            <td style="text-align: center; font-weight: 700;">${notasCount} / ${(this.grupoActivo.alumnos || []).length}</td>
          `;
          tbody.appendChild(tr);
        });
      }

      renderizarMapaCriterioAActividades(critCode) {
        const container = document.getElementById("detalleMapaCritToActContainer");
        if (!container || !this.grupoActivo) return;

        const evalKey = this.evaluacionActiva || "eval1";
        const evalData = (this.grupoActivo.evaluaciones && this.grupoActivo.evaluaciones[evalKey]) || { actividades: [] };
        const actividades = (evalData.actividades || []).filter(a => a.criterios && a.criterios.includes(critCode));
        const cObj = (this.grupoActivo.criterios || []).find(c => c.codigo === critCode);

        let html = `
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px 16px; margin-bottom:14px;">
            <div style="font-size:0.8rem; color:#64748b; font-weight:700;">CRITERIO DE EVALUACIÓN</div>
            <div style="font-size:1.1rem; font-weight:800; color:#1e293b;">${this.escapeHtml(critCode)} — ${cObj ? this.escapeHtml(cObj.descripcion) : 'Sin descripción'}</div>
            <div style="font-size:0.82rem; color:var(--primary); font-weight:700; margin-top:4px;">Ponderación en el curso: ${cObj ? cObj.ponderacion : 0}%</div>
          </div>
        `;

        if (actividades.length === 0) {
          html += `<div class="alert-box alert-warning">⚠️ Este criterio no está asociado a ninguna actividad o evaluación en el periodo actual.</div>`;
        } else {
          html += `
            <h5 style="font-size:0.9rem; font-weight:700; margin-bottom:8px;">Actividades que alimentan este criterio (${actividades.length}):</h5>
            <div style="display:flex; flex-direction:column; gap:8px;">
          `;
          actividades.forEach(act => {
            const rub = act.rubricaId ? (this.grupoActivo.rubricas || []).find(r => r.id === act.rubricaId) : null;
            html += `
              <div style="background:#ffffff; border:1px solid var(--border); border-radius:8px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <strong>${this.escapeHtml(act.nombre)}</strong>
                  <div style="font-size:0.78rem; color:var(--text-muted);">${rub ? `Evaluado mediante Rúbrica (${this.escapeHtml(rub.titulo)})` : 'Calificación Directa'}</div>
                </div>
                <span style="background:#eff6ff; color:#1e40af; font-weight:700; font-size:0.8rem; padding:4px 8px; border-radius:6px;">Evidencia Activa</span>
              </div>
            `;
          });
          html += `</div>`;
        }

        container.innerHTML = html;
      }

      abrirRevisionEvidencias() {
        if (!this.grupoActivo) return;
        const evalKey = this.evaluacionActiva || "eval1";
        const evalData = (this.grupoActivo.evaluaciones && this.grupoActivo.evaluaciones[evalKey]) || { actividades: [] };
        const actividades = evalData.actividades || [];
        const criterios = this.grupoActivo.criterios || [];

        const critMapCount = {};
        criterios.forEach(c => { critMapCount[c.codigo] = 0; });

        actividades.forEach(act => {
          (act.criterios || []).forEach(c => {
            if (critMapCount[c] !== undefined) {
              critMapCount[c]++;
            } else {
              critMapCount[c] = 1;
            }
          });
        });

        let totalCrit = criterios.length;
        let optEvid = 0;
        let oneEvid = 0;
        let zeroEvid = 0;

        criterios.forEach(c => {
          const cnt = critMapCount[c.codigo] || 0;
          if (cnt >= 2) optEvid++;
          else if (cnt === 1) oneEvid++;
          else zeroEvid++;
        });

        const statsGrid = document.getElementById("revisionEvidenciasStats");
        if (statsGrid) {
          statsGrid.innerHTML = `
            <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px; text-align:center;">
              <div style="font-size:0.75rem; color:#64748b; font-weight:600;">TOTAL CRITERIOS</div>
              <div style="font-size:1.3rem; font-weight:800; color:#1e293b;">${totalCrit}</div>
            </div>
            <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:10px; text-align:center;">
              <div style="font-size:0.75rem; color:#166534; font-weight:600;">🟢 CON 2+ EVIDENCIAS</div>
              <div style="font-size:1.3rem; font-weight:800; color:#15803d;">${optEvid}</div>
            </div>
            <div style="background:#fff7ed; border:1px solid #fed7aa; border-radius:8px; padding:10px; text-align:center;">
              <div style="font-size:0.75rem; color:#9a3412; font-weight:600;">🟡 1 SOLA EVIDENCIA</div>
              <div style="font-size:1.3rem; font-weight:800; color:#c2410c;">${oneEvid}</div>
            </div>
            <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px; text-align:center;">
              <div style="font-size:0.75rem; color:#991b1b; font-weight:600;">🔴 SIN EVIDENCIAS</div>
              <div style="font-size:1.3rem; font-weight:800; color:#dc2626;">${zeroEvid}</div>
            </div>
          `;
        }

        const listado = document.getElementById("revisionEvidenciasListado");
        if (listado) {
          listado.innerHTML = "";
          criterios.forEach(c => {
            const cnt = critMapCount[c.codigo] || 0;
            const item = document.createElement("div");
            item.style.padding = "10px 14px";
            item.style.borderRadius = "8px";
            item.style.display = "flex";
            item.style.justifyContent = "space-between";
            item.style.alignItems = "center";

            if (cnt >= 2) {
              item.style.background = "#f0fdf4";
              item.style.border = "1px solid #bbf7d0";
              item.innerHTML = `
                <div>
                  <strong style="color:#15803d;">🟢 [${c.codigo}]</strong> <span style="font-size:0.85rem; color:#1e293b;">${c.descripcion}</span>
                </div>
                <span style="font-size:0.8rem; font-weight:700; color:#15803d; background:#dcfce7; padding:3px 8px; border-radius:4px;">${cnt} evidencias</span>
              `;
            } else if (cnt === 1) {
              item.style.background = "#fff7ed";
              item.style.border = "1px solid #fed7aa";
              item.innerHTML = `
                <div>
                  <strong style="color:#c2410c;">⚠️ 🟡 [${c.codigo}]</strong> <span style="font-size:0.85rem; color:#1e293b;">${c.descripcion}</span>
                </div>
                <span style="font-size:0.8rem; font-weight:700; color:#c2410c; background:#ffedd5; padding:3px 8px; border-radius:4px;">1 evidencia</span>
              `;
            } else {
              item.style.background = "#fef2f2";
              item.style.border = "1px solid #fecaca";
              item.innerHTML = `
                <div>
                  <strong style="color:#dc2626;">⚠️ 🔴 [${c.codigo}]</strong> <span style="font-size:0.85rem; color:#1e293b;">${c.descripcion}</span>
                </div>
                <span style="font-size:0.8rem; font-weight:700; color:#dc2626; background:#fee2e2; padding:3px 8px; border-radius:4px;">0 evidencias</span>
              `;
            }
            listado.appendChild(item);
          });
        }

        this.abrirModal("modalRevisionEvidencias");
      }

      crearOActualizarSeccionesYColumnasParaRubrica(rubrica) {
        if (!this.grupoActivo) return;

        if (!this.grupoActivo.criterios) this.grupoActivo.criterios = [];
        if (!this.grupoActivo.secciones) this.grupoActivo.secciones = [];

        const normFunc = (window.rubricEngine && window.rubricEngine.normalizeCriterionCode) 
          ? window.rubricEngine.normalizeCriterionCode 
          : (s => String(s || '').trim());

        const items = rubrica.items || [];
        const cleanFunc = (window.rubricEngine && window.rubricEngine.cleanCriterioCodes) 
          ? window.rubricEngine.cleanCriterioCodes 
          : (s => String(s || '').split(/[;,]/).map(x => x.trim()).filter(Boolean));

        const rawDistinctCriteria = Array.from(new Set(items.flatMap(i => {
          if (Array.isArray(i.criterios) && i.criterios.length > 0) {
            return i.criterios.flatMap(c => cleanFunc(c));
          }
          if (i.criterio) return cleanFunc(i.criterio);
          return [];
        }).filter(Boolean)));

        // Buscar las correspondencias e integrar automáticamente nuevos criterios en este grupo/curso si no existen
        const matchedCourseCriteriaCodes = [];
        rawDistinctCriteria.forEach(critCode => {
          const norm = normFunc(critCode) || critCode;
          let found = this.grupoActivo.criterios.find(c => normFunc(c.codigo) === norm);
          
          if (!found && norm) {
            found = {
              codigo: norm,
              descripcion: `Criterio ${norm} (Extraído de Rúbrica)`,
              ponderacion: 10
            };
            this.grupoActivo.criterios.push(found);
          }

          if (found && !matchedCourseCriteriaCodes.includes(found.codigo)) {
            matchedCourseCriteriaCodes.push(found.codigo);
          }
        });

        const criteriaToUse = matchedCourseCriteriaCodes.length > 0 ? matchedCourseCriteriaCodes : (this.grupoActivo.criterios.map(c => c.codigo).slice(0, 1));
        if (criteriaToUse.length === 0) return;

        // 2. Mapear criterios a secciones en Fernanditio
        const colores = ["#2563eb", "#7c3aed", "#0891b2", "#059669", "#d97706", "#db2777", "#4f46e5", "#ea580c"];
        let secIndex = this.grupoActivo.secciones.length;
        const seccionCritMap = new Map(); // seccionId -> Set of criteria for this rubric

        criteriaToUse.forEach(critCode => {
          let sec = this.grupoActivo.secciones.find(s => s.criterios && s.criterios.includes(critCode));
          if (!sec) {
            sec = {
              id: "sec-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
              nombre: `Sección Criterio ${critCode}`,
              color: colores[secIndex % colores.length],
              ponderacion: 10,
              criterios: [critCode],
              oculto: false
            };
            this.grupoActivo.secciones.push(sec);
            secIndex++;
          } else {
            sec.oculto = false;
          }

          if (!seccionCritMap.has(sec.id)) {
            seccionCritMap.set(sec.id, new Set());
          }
          seccionCritMap.get(sec.id).add(critCode);
        });

        // 3. Crear automáticamente la columna (actividad) en la sección correspondiente del Cuaderno
        const evalKey = this.evaluacionActiva || "eval1";
        if (!this.grupoActivo.evaluaciones) this.grupoActivo.evaluaciones = {};
        if (!this.grupoActivo.evaluaciones[evalKey]) {
          this.grupoActivo.evaluaciones[evalKey] = { actividades: [], calificaciones: {}, observaciones: {} };
        }
        const evalData = this.grupoActivo.evaluaciones[evalKey];
        if (!evalData.actividades) evalData.actividades = [];

        seccionCritMap.forEach((critsSet, secId) => {
          const critsArray = Array.from(critsSet);
          let existingAct = evalData.actividades.find(a => a.rubricaId === rubrica.id && a.seccionId === secId);
          const actTipo = this.normalizarTipoActividad(rubrica.tipo);
          if (!existingAct) {
            const nuevaAct = {
              id: "act-rub-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
              nombre: rubrica.titulo,
              tipo: actTipo,
              seccionId: secId,
              metodo: "rubrica",
              rubricaId: rubrica.id,
              criterios: critsArray,
              fechaCreacion: new Date().toISOString().split("T")[0]
            };
            evalData.actividades.push(nuevaAct);
          } else {
            existingAct.criterios = critsArray;
            existingAct.nombre = rubrica.titulo;
            existingAct.tipo = actTipo;
          }
        });

        this.recalcularPonderacionesSecciones();
      }

      actualizarLabelsDisponibilidadUI() {
        if (!this.grupoActivo) return;
        const linkedIds = this.grupoActivo.linkedGroupIds || [];
        const linkedNombres = (this.data.grupos || [])
          .filter(g => linkedIds.includes(g.id))
          .map(g => g.nombre);

        const suffix = linkedNombres.length > 0 
          ? ` (${linkedNombres.join(", ")})` 
          : ` (Sin grupos vinculados actualmente)`;

        const lblManual = document.getElementById("lblManualRubDispCompartida");
        if (lblManual) {
          lblManual.textContent = `🔗 Compartir con grupos vinculados${suffix}`;
        }
        const lblImport = document.getElementById("lblImportRubDispCompartida");
        if (lblImport) {
          lblImport.textContent = `🔗 Compartir con grupos vinculados${suffix}`;
        }
        const lblEdit = document.getElementById("lblEditRubDispCompartida");
        if (lblEdit) {
          lblEdit.textContent = `🔗 Compartir con grupos vinculados${suffix}`;
        }
      }

      crearOActualizarPlantilla(rubrica, sourceGroupId, compartida = true) {
        if (!this.data.plantillasRubricas) this.data.plantillasRubricas = [];
        const templateId = rubrica.templateId || ("tmpl-" + (rubrica.id || Date.now()));
        rubrica.templateId = templateId;
        rubrica.origenGrupoId = rubrica.origenGrupoId || sourceGroupId;
        rubrica.esCompartida = !!compartida;

        let tmpl = this.data.plantillasRubricas.find(t => t.id === templateId);

        if (!tmpl) {
          tmpl = {
            id: templateId,
            sourceGroupId: sourceGroupId,
            titulo: rubrica.titulo,
            tipo: rubrica.tipo,
            descripcion: rubrica.descripcion || "",
            fechaCreacion: rubrica.fechaCreacion || new Date().toISOString().split("T")[0],
            version: rubrica.templateVersion || 1,
            compartida: !!compartida,
            items: JSON.parse(JSON.stringify(rubrica.items || rubrica.aspectos || [])),
            apartados: rubrica.apartados ? [...rubrica.apartados] : []
          };
          rubrica.templateVersion = tmpl.version;
          this.data.plantillasRubricas.push(tmpl);
        } else {
          // Si la rúbrica ya tiene calificaciones en algún grupo, versionamos la plantilla
          const tieneCalificaciones = this.plantillaTieneCalificaciones(templateId);
          if (tieneCalificaciones) {
            if (!tmpl.historialVersiones) tmpl.historialVersiones = [];
            tmpl.historialVersiones.push({
              version: tmpl.version || 1,
              titulo: tmpl.titulo,
              tipo: tmpl.tipo,
              items: JSON.parse(JSON.stringify(tmpl.items || [])),
              fecha: new Date().toISOString()
            });
            tmpl.version = (tmpl.version || 1) + 1;
          }
          tmpl.titulo = rubrica.titulo;
          tmpl.tipo = rubrica.tipo;
          tmpl.descripcion = rubrica.descripcion || tmpl.descripcion;
          tmpl.compartida = !!compartida;
          tmpl.items = JSON.parse(JSON.stringify(rubrica.items || rubrica.aspectos || []));
          if (rubrica.apartados) tmpl.apartados = [...rubrica.apartados];
          rubrica.templateVersion = tmpl.version;
        }

        return tmpl;
      }

      plantillaTieneCalificaciones(templateId) {
        if (!templateId || !this.data || !this.data.grupos) return false;
        for (const g of this.data.grupos) {
          const inst = (g.rubricas || []).find(r => r.templateId === templateId);
          if (!inst) continue;
          if (!g.evaluaciones) continue;
          for (const evKey of Object.keys(g.evaluaciones)) {
            const evData = g.evaluaciones[evKey];
            if (!evData) continue;
            if (evData.calificacionesRubricas && evData.calificacionesRubricas[inst.id]) {
              const scoresMap = evData.calificacionesRubricas[inst.id];
              for (const aluId of Object.keys(scoresMap)) {
                if (scoresMap[aluId] && Object.keys(scoresMap[aluId]).length > 0) {
                  return true;
                }
              }
            }
            if (evData.actividades && evData.calificaciones) {
              const acts = evData.actividades.filter(a => a.rubricaId === inst.id);
              for (const act of acts) {
                const actCalifs = evData.calificaciones[act.id];
                if (actCalifs) {
                  for (const aluId of Object.keys(actCalifs)) {
                    if (actCalifs[aluId] != null && actCalifs[aluId] !== "") return true;
                  }
                }
              }
            }
          }
        }
        return false;
      }

      instanciarRubricaCompartida(templateId, abrirParaEvaluar = false, alumnoId = null) {
        if (!this.grupoActivo) {
          this.mostrarToast("⚠️ Selecciona un grupo primero.");
          return null;
        }
        if (!this.data.plantillasRubricas) this.data.plantillasRubricas = [];
        const tmpl = this.data.plantillasRubricas.find(t => t.id === templateId);
        if (!tmpl) {
          alert("Plantilla de rúbrica no encontrada.");
          return null;
        }

        if (!this.grupoActivo.rubricas) this.grupoActivo.rubricas = [];
        let existingInst = this.grupoActivo.rubricas.find(r => r.templateId === templateId);
        if (existingInst) {
          if (abrirParaEvaluar) {
            this.abrirEvaluarRubrica(existingInst.id, alumnoId);
          } else {
            this.mostrarToast(`ℹ️ La rúbrica "${tmpl.titulo}" ya está activa en ${this.grupoActivo.nombre}.`);
          }
          return existingInst;
        }

        const sourceGrp = (this.data.grupos || []).find(g => g.id === tmpl.sourceGroupId);
        const sourceName = sourceGrp ? sourceGrp.nombre : "Grupo vinculado";

        const nuevaInst = {
          id: "rub-" + Date.now() + "-" + Math.floor(Math.random() * 10000),
          templateId: tmpl.id,
          templateVersion: tmpl.version || 1,
          origenGrupoId: tmpl.sourceGroupId,
          titulo: tmpl.titulo,
          tipo: tmpl.tipo,
          descripcion: tmpl.descripcion || `Rúbrica compartida desde ${sourceName}`,
          fechaCreacion: new Date().toISOString().split("T")[0],
          esCompartida: true,
          items: JSON.parse(JSON.stringify(tmpl.items || []))
        };

        this.grupoActivo.rubricas.push(nuevaInst);

        // Integrar criterios y secciones de forma totalmente aislada en el grupo actual
        this.crearOActualizarSeccionesYColumnasParaRubrica(nuevaInst);

        this.guardarDatos();
        this.renderizarRubricasView();
        if (this.vistaActiva === "cuaderno") {
          this.renderizarCuaderno();
        }

        this.mostrarToast(`✅ Rúbrica compartida "${tmpl.titulo}" integrada en ${this.grupoActivo.nombre}. Calificaciones 100% aisladas.`);

        if (abrirParaEvaluar) {
          this.abrirEvaluarRubrica(nuevaInst.id, alumnoId);
        }
        return nuevaInst;
      }

      previsualizarPlantillaCompartida(templateId) {
        const tmpl = (this.data.plantillasRubricas || []).find(t => t.id === templateId);
        if (!tmpl) return;
        const sourceGrp = (this.data.grupos || []).find(g => g.id === tmpl.sourceGroupId);
        const sourceName = sourceGrp ? sourceGrp.nombre : "Grupo vinculado";

        const headerTit = document.getElementById("previewTemplateHeaderTitulo");
        if (headerTit) {
          headerTit.innerHTML = `<span>👁️</span> ${tmpl.titulo} <span style="font-size:0.75rem; background:rgba(255,255,255,0.25); padding:2px 8px; border-radius:4px; font-weight:700; margin-left:8px;">${tmpl.tipo.toUpperCase()} • v${tmpl.version || 1}</span>`;
        }
        const subhead = document.getElementById("previewTemplateSubhead");
        if (subhead) {
          subhead.textContent = `Compartida desde: ${sourceName} • Al aplicarla en ${this.grupoActivo.nombre}, sus calificaciones serán totalmente independientes.`;
        }

        const bodyCont = document.getElementById("previewTemplateBodyContenido");
        if (bodyCont) {
          const items = tmpl.items || [];
          const isExamen = this.isTipoExamen(tmpl.tipo);
          let html = `
            <div style="margin-bottom: 14px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
              <span style="font-size: 0.85rem; color: #475569;"><strong>${items.length}</strong> ítems/preguntas definidas</span>
              <span style="font-size: 0.85rem; color: #475569;">• Creada: <strong>${tmpl.fechaCreacion || '-'}</strong></span>
              <span style="font-size: 0.85rem; color: #475569;">• Versión: <strong>v${tmpl.version || 1}</strong></span>
              <span style="font-size: 0.85rem; color: #15803d; font-weight: 700;">• Origen: ${sourceName}</span>
            </div>
            <div class="table-container" style="max-height: 420px; overflow-y: auto;">
              <table class="cuaderno-table" style="width: 100%;">
                <thead>
                  <tr style="background: #f1f5f9;">
                    <th style="width: 60px; text-align: center;">Nº</th>
                    <th>Actividad / Descriptor</th>
                    <th style="width: 140px; text-align: center;">Criterio(s)</th>
                    ${isExamen ? '<th style="width: 90px; text-align: center;">Ptos. Máx</th>' : ''}
                  </tr>
                </thead>
                <tbody>
          `;
          items.forEach((it, idx) => {
            const numLabel = it.numActividad || it.orderLabel || it.order || (idx + 1);
            const crits = Array.isArray(it.criterios) && it.criterios.length > 0 ? it.criterios.join('; ') : (it.criterio || '-');
            html += `
              <tr>
                <td style="text-align: center; font-weight: 700; color: #64748b;">${numLabel}</td>
                <td><strong style="color: #0f172a;">${it.titulo || it.title || ''}</strong></td>
                <td style="text-align: center;"><span class="badge badge-criterio" style="background:#eff6ff; color:#1e40af; border:1px solid #bfdbfe; font-weight:700;">${crits}</span></td>
                ${isExamen ? `<td style="text-align: center; font-weight: 700; color: #9d174d;">${it.maxScore !== undefined ? it.maxScore : '-'}</td>` : ''}
              </tr>
            `;
          });
          html += `</tbody></table></div>`;
          bodyCont.innerHTML = html;
        }

        const btnAplicar = document.getElementById("btnPreviewTemplateAplicar");
        if (btnAplicar) {
          btnAplicar.onclick = () => {
            this.cerrarModal("modalPreviewTemplateRubrica");
            this.instanciarRubricaCompartida(tmpl.id);
          };
        }

        this.abrirModal("modalPreviewTemplateRubrica");
      }

      abrirModalCrearRubricaPaso1() {
        const tituloInput = document.getElementById("manualRubricaTitulo");
        if (tituloInput) tituloInput.value = "";

        const targetTipo = this.manualRubricaTipo || this.tipoRubricaVentanaActiva || "actividades";
        const selectTipo = document.getElementById("manualRubricaTipo");
        if (selectTipo) selectTipo.value = targetTipo;

        this.actualizarLabelsDisponibilidadUI();
        const rPriv = document.getElementById("manualRubDispPrivada");
        if (rPriv) rPriv.checked = true;

        this.itemsManualRubrica = [
          { id: `item-1`, order: 1, titulo: "Pregunta / Actividad 1", criterio: "1.1", maxScore: 5 },
          { id: `item-2`, order: 2, titulo: "Pregunta / Actividad 2", criterio: "2.1", maxScore: 5 }
        ];

        this.actualizarFormularioCrearManual(targetTipo);
        this.abrirModal("modalCrearRubricaManual");
      }

      actualizarFormularioCrearManual(tipo) {
        this.manualRubricaTipo = tipo;
        const thMaxScore = document.getElementById("thManualMaxScore");
        if (thMaxScore) {
          thMaxScore.style.display = this.isTipoExamen(tipo) ? "table-cell" : "none";
        }
        this.renderTablaManualCreacion();
      }

      renderTablaManualCreacion() {
        const tbody = document.getElementById("manualRubricaTbody");
        if (!tbody) return;
        tbody.innerHTML = "";

        const items = this.itemsManualRubrica || [];
        const isExamen = this.isTipoExamen(this.manualRubricaTipo);

        items.forEach((item, idx) => {
          const actNumVal = item.numActividad || item.orderLabel || item.order || (idx + 1);
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td style="text-align: center; width: 85px;">
              <input type="text" class="form-control" style="font-size: 0.82rem; padding: 4px 4px; font-weight: 800; text-align: center; color: #1e40af; background: #eff6ff; width: 100%; box-sizing: border-box;" value="${actNumVal}" onchange="app.updateManualItemField(${idx}, 'numActividad', this.value)" title="Número de actividad del libro (ej. 1, 2.a, 2.b, 3)" placeholder="Nº Act" />
            </td>
            <td>
              <input type="text" class="form-control" style="font-size: 0.82rem; padding: 4px 6px;" value="${(item.titulo || '').replace(/"/g, '&quot;')}" onchange="app.updateManualItemField(${idx}, 'titulo', this.value)" />
            </td>
            <td>
              <input type="text" class="form-control" style="font-size: 0.82rem; padding: 4px 6px; font-weight: 700; text-align: center;" value="${item.criterio || ''}" onchange="app.updateManualItemField(${idx}, 'criterio', this.value)" />
            </td>
            ${isExamen ? `
              <td style="text-align: center;">
                <input type="number" step="0.1" min="0" max="10" class="form-control" style="font-size: 0.82rem; padding: 4px 6px; text-align: center; font-weight: 700;" value="${item.maxScore || 1}" onchange="app.updateManualItemField(${idx}, 'maxScore', parseFloat(this.value) || 0)" />
              </td>
            ` : ""}
            <td style="text-align: center;">
              <button class="btn btn-danger btn-sm" style="padding: 2px 6px;" onclick="app.eliminarFilaManual(${idx})">&times;</button>
            </td>
          `;
          tbody.appendChild(tr);
        });

        this.actualizarSumatorioManualExamen();
      }

      updateManualItemField(idx, field, val) {
        if (!this.itemsManualRubrica || !this.itemsManualRubrica[idx]) return;
        if (field === "numActividad") {
          this.itemsManualRubrica[idx].numActividad = val;
          this.itemsManualRubrica[idx].orderLabel = val;
        } else {
          this.itemsManualRubrica[idx][field] = val;
        }
        if (field === "maxScore") {
          this.actualizarSumatorioManualExamen();
        }
      }

      agregarOrtografiaEnCreacionManual() {
        if (!this.itemsManualRubrica) this.itemsManualRubrica = [];

        const yaExiste = this.itemsManualRubrica.some(it => it.isOrtografia || it.titulo === "Ortografía" || (it.id && String(it.id).startsWith("item-ortografia")));
        if (yaExiste) {
          this.mostrarToast("⚠️ La rúbrica ya contiene el ítem de Ortografía.");
          return;
        }

        const critCodigo = this.obtenerCriterioOrtografiaCodigo();
        const newOrder = (this.itemsManualRubrica.length > 0) ? Math.max(...this.itemsManualRubrica.map(i => i.order || 0)) + 1 : 1;
        this.itemsManualRubrica.push({
          id: "item-ortografia-" + Date.now(),
          order: newOrder,
          titulo: "Ortografía",
          criterio: critCodigo,
          criterios: [critCodigo],
          isOrtografia: true,
          isExtra: true,
          maxScore: 10
        });

        this.renderTablaManualCreacion();
        this.mostrarToast(`✍️ Ítem 'Ortografía' (Criterio ${critCodigo}) añadido.`);
      }

      agregarYEvaluarOrtografiaEnEvaluacion() {
        if (!this.evaluandoRubricaActual || !this.evaluandoRubricaActual.rubrica) return;
        const rub = this.evaluandoRubricaActual.rubrica;
        if (!rub.items) rub.items = [];

        let ortItem = rub.items.find(it => it.isOrtografia || it.titulo === "Ortografía" || (it.id && String(it.id).startsWith("item-ortografia")));
        if (!ortItem) {
          const critCodigo = this.obtenerCriterioOrtografiaCodigo();
          const newOrder = rub.items.length + 1;
          ortItem = {
            id: "item-ortografia-" + Date.now(),
            order: newOrder,
            titulo: "Ortografía",
            criterio: critCodigo,
            criterios: [critCodigo],
            isOrtografia: true,
            isExtra: true,
            maxScore: 10
          };
          rub.items.push(ortItem);

          // Generar columna para la sección correspondiente en el cuaderno
          this.crearOActualizarSeccionesYColumnasParaRubrica(rub);
          this.guardarDatos();
          this.mostrarToast(`✍️ Ítem 'Ortografía' (Criterio ${critCodigo}) añadido al final de la rúbrica.`);
        } else {
          this.mostrarToast("✍️ Evaluando ítem 'Ortografía'.");
        }

        this.renderizarContenidoEvaluacionAlumno();
      }

      agregarFilaManualCreacion() {
        const newOrder = (this.itemsManualRubrica.length > 0) ? Math.max(...this.itemsManualRubrica.map(i => i.order || 0)) + 1 : 1;
        this.itemsManualRubrica.push({
          id: `item-${Date.now()}-${Math.floor(Math.random()*1000)}`,
          order: newOrder,
          titulo: `Pregunta ${newOrder}`,
          criterio: "1.1",
          maxScore: 1
        });
        this.renderTablaManualCreacion();
      }

      eliminarFilaManual(idx) {
        this.itemsManualRubrica.splice(idx, 1);
        this.renderTablaManualCreacion();
      }

      actualizarSumatorioManualExamen() {
        const isExamen = this.isTipoExamen(this.manualRubricaTipo);
        const footerSum = document.getElementById("manualFooterSumIndicator");
        if (!isExamen) {
          if (footerSum) footerSum.innerHTML = "";
          return;
        }

        const mainItems = (this.itemsManualRubrica || []).filter(it => !it.isOrtografia && !it.isExtra);
        const sum = mainItems.reduce((acc, it) => acc + (Number(it.maxScore) || 0), 0);
        const diff = Math.abs(sum - 10);

        if (diff < 0.01) {
          if (footerSum) footerSum.innerHTML = `<span style="color: #16a34a;">✅ Suma total de puntuaciones máximas de examen: <strong>10 / 10 pts</strong></span>`;
        } else {
          if (footerSum) footerSum.innerHTML = `<span style="color: #dc2626;">⚠️ Suma total de preguntas de examen: <strong>${sum.toFixed(2)} / 10 pts</strong> (Debe ser exactamente 10)</span>`;
        }
      }

      guardarRubricaManual() {
        const tituloInput = document.getElementById("manualRubricaTitulo");
        const titulo = tituloInput ? tituloInput.value.trim() : "";
        if (!titulo) {
          alert("Debes indicar un título para la rúbrica.");
          return;
        }

        const items = this.itemsManualRubrica || [];
        if (items.length === 0) {
          alert("Debes definir al menos un ítem.");
          return;
        }

        const isExamen = this.isTipoExamen(this.manualRubricaTipo);
        if (isExamen) {
          const sum = items.reduce((acc, it) => acc + (Number(it.maxScore) || 0), 0);
          if (Math.abs(sum - 10) > 0.01) {
            alert(`No se puede guardar. La suma de puntuaciones máximas es ${sum.toFixed(2)} pts y debe ser exactamente 10 pts.`);
            return;
          }
        }

        const normTipo = this.normalizarTipoActividad(this.manualRubricaTipo || "Actividad", titulo);
        const radioCompartida = document.getElementById("manualRubDispCompartida");
        const esCompartida = radioCompartida ? radioCompartida.checked : false;

        const nuevaRub = {
          id: "rub-" + Date.now(),
          titulo: titulo,
          tipo: normTipo,
          descripcion: `Rúbrica de ${normTipo} creada manualmente`,
          fechaCreacion: new Date().toISOString().split("T")[0],
          origenGrupoId: this.grupoActivo.id,
          esCompartida: esCompartida,
          items: items.map((it, idx) => {
            const numActLabel = String(it.numActividad || it.orderLabel || it.order || (idx + 1));
            return {
              id: it.id || `item-${idx+1}`,
              order: it.order || idx + 1,
              orderLabel: numActLabel,
              numActividad: numActLabel,
              titulo: it.titulo,
              title: it.titulo,
              criterio: (it.criterio || "").trim(),
              maxScore: it.maxScore
            };
          })
        };

        // Crear/registrar plantilla si es compartida
        this.crearOActualizarPlantilla(nuevaRub, this.grupoActivo.id, esCompartida);

        if (!this.grupoActivo.rubricas) this.grupoActivo.rubricas = [];
        this.grupoActivo.rubricas.push(nuevaRub);

        // Garantizar persistencia actualizando el grupo en este.data.grupos
        if (this.data && this.data.grupos) {
          const gIdx = this.data.grupos.findIndex(g => g.id === this.grupoActivo.id);
          if (gIdx !== -1) {
            this.data.grupos[gIdx] = this.grupoActivo;
          }
        }

        this.crearOActualizarSeccionesYColumnasParaRubrica(nuevaRub);
        this.guardarDatos();
        this.cerrarModal("modalCrearRubricaManual");
        this.renderizarRubricasView();
        if (this.vistaActiva === "cuaderno") {
          this.renderizarCuaderno();
        }
        this.mostrarToast("✅ Rúbrica creada e integrada correctamente en Fernanditio.");
      }

      abrirCalificarRubrica(act, alu) {
        if (act && act.rubricaId) {
          this.abrirEvaluarRubrica(act.rubricaId, alu ? alu.id : null);
        } else if (this.grupoActivo && this.grupoActivo.rubricas && this.grupoActivo.rubricas.length > 0) {
          this.abrirEvaluarRubrica(this.grupoActivo.rubricas[0].id, alu ? alu.id : null);
        } else {
          alert("No hay ninguna rúbrica asociada a esta actividad.");
        }
      }

      abrirEvaluarRubrica(rubricaId, alumnoId = null) {
        if (!this.grupoActivo) return;
        const rub = (this.grupoActivo.rubricas || []).find(r => r.id === rubricaId);
        if (!rub) {
          alert("Rúbrica no encontrada.");
          return;
        }

        const alumnos = this.grupoActivo.alumnos || [];
        if (alumnos.length === 0) {
          alert("No hay alumnos matriculados en este grupo para evaluar.");
          return;
        }

        // Determinar alumno a evaluar: priorizar el alumno especificado o el alumno actualmente seleccionado en el cuaderno
        let targetAlumnoId = alumnoId;
        if (!targetAlumnoId && this.alumnoCuadernoSeleccionadoId && alumnos.some(a => a.id === this.alumnoCuadernoSeleccionadoId)) {
          targetAlumnoId = this.alumnoCuadernoSeleccionadoId;
        }
        if (!targetAlumnoId) {
          targetAlumnoId = alumnos[0].id;
        }

        // Marcar y aislar estrictamente a este alumno
        this.seleccionarAlumnoCuaderno(targetAlumnoId);

        const evalData = this.grupoActivo.evaluaciones[this.evaluacionActiva];
        if (!evalData.calificacionesRubricas) evalData.calificacionesRubricas = {};
        if (!evalData.calificacionesRubricas[rubricaId]) evalData.calificacionesRubricas[rubricaId] = {};

        this.evaluandoRubricaActual = {
          rubrica: rub,
          modoMultiple: false,
          alumnoId: targetAlumnoId,
          alumnosSeleccionados: new Set([targetAlumnoId]),
          itemScores: { ...(evalData.calificacionesRubricas[rubricaId][targetAlumnoId] || {}) }
        };

        const titleHeader = document.getElementById("evalRubricaHeaderTitulo");
        if (titleHeader) titleHeader.textContent = `📋 Rúbrica: ${rub.titulo}`;

        const subHeader = document.getElementById("evalRubricaHeaderSub");
        if (subHeader) {
          let tStr = "Actividades (0 / 5 / 10)";
          let badgeBg = "#2563eb"; // blue
          if (this.isTipoExamen(rub.tipo, rub.titulo)) {
            tStr = "Examen (Nota numérica con Enter)";
            badgeBg = "#7c3aed"; // violet
          } else if (this.isTipoTrabajo(rub.tipo, rub.titulo)) {
            tStr = "Trabajo (0 / 3 / 6 / 10)";
            badgeBg = "#059669"; // emerald
          }
          subHeader.innerHTML = `
            <div style="display: inline-flex; align-items: center; gap: 8px; margin-top: 4px; flex-wrap: wrap;">
              <span style="background: ${badgeBg}; color: #ffffff; padding: 3px 10px; border-radius: 6px; font-weight: 800; font-size: 0.84rem; letter-spacing: 0.3px; box-shadow: 0 2px 4px rgba(0,0,0,0.18); display: inline-flex; align-items: center; gap: 5px; border: 1px solid rgba(255,255,255,0.25);">
                🏷️ Tipo de Rúbrica: ${tStr}
              </span>
              <span style="font-weight: 700; color: #1e40af; font-size: 0.82rem; background: #dbeafe; padding: 3px 8px; border-radius: 5px; border: 1px solid #bfdbfe;">
                • Evaluación: ${this.evaluacionActiva.toUpperCase()}
              </span>
            </div>
          `;
        }

        const helperBar = document.getElementById("evalRubricaExamenHelperBar");
        if (helperBar) {
          helperBar.style.display = this.isTipoExamen(rub.tipo, rub.titulo) ? "flex" : "none";
        }

        this.actualizarUISelectorAlumnosRubrica();
        this.renderizarContenidoEvaluacionAlumno();
        this.abrirModal("modalEvaluarRubrica");
      }

      setModoSeleccionAlumnoRubrica(esMultiple) {
        if (!this.evaluandoRubricaActual) return;
        this.evaluandoRubricaActual.modoMultiple = esMultiple;

        if (esMultiple && this.evaluandoRubricaActual.alumnosSeleccionados.size === 0 && this.evaluandoRubricaActual.alumnoId) {
          this.evaluandoRubricaActual.alumnosSeleccionados.add(this.evaluandoRubricaActual.alumnoId);
        }

        this.actualizarUISelectorAlumnosRubrica();
      }

      seleccionarTodosAlumnosRubrica(seleccionarTodos) {
        if (!this.evaluandoRubricaActual || !this.grupoActivo) return;
        const alumnos = this.grupoActivo.alumnos || [];
        if (seleccionarTodos) {
          this.evaluandoRubricaActual.alumnosSeleccionados = new Set(alumnos.map(a => a.id));
        } else {
          this.evaluandoRubricaActual.alumnosSeleccionados.clear();
        }
        this.actualizarUISelectorAlumnosRubrica();
      }

      actualizarResumenSeleccionAlumnosRubrica() {
        if (!this.evaluandoRubricaActual) return;
        const seleccionados = this.evaluandoRubricaActual.alumnosSeleccionados || new Set();
        const btnGuardar = document.getElementById("btnGuardarCalificacionRubricaModal");
        if (btnGuardar && this.evaluandoRubricaActual.modoMultiple) {
          btnGuardar.textContent = `💾 Guardar Calificación (${seleccionados.size} Alumno${seleccionados.size === 1 ? '' : 's'})`;
        }
        const hdrNombre = document.getElementById("evalRubricaHeaderAlumnoNombre");
        const hdrBadge = document.getElementById("evalRubricaHeaderAlumnoBadge");
        const destNombre = document.getElementById("evalRubricaDestacadoNombre");
        const destEstado = document.getElementById("evalRubricaDestacadoEstado");
        const totalAlu = this.grupoActivo && this.grupoActivo.alumnos ? this.grupoActivo.alumnos.length : 0;

        if (hdrNombre) hdrNombre.textContent = `👥 Selección Múltiple (${seleccionados.size})`;
        if (hdrBadge) hdrBadge.textContent = `${seleccionados.size} de ${totalAlu} alums.`;
        if (destNombre) destNombre.textContent = `${seleccionados.size} alumno(s) seleccionados`;
        if (destEstado) destEstado.textContent = `${seleccionados.size} / ${totalAlu} alums.`;
      }

      toggleAlumnoRubricaSeleccion(aluId, chequeado) {
        if (!this.evaluandoRubricaActual) return;
        if (chequeado) {
          this.evaluandoRubricaActual.alumnosSeleccionados.add(aluId);
        } else {
          this.evaluandoRubricaActual.alumnosSeleccionados.delete(aluId);
        }

        const chk = document.getElementById(`chk_eval_alu_${aluId}`);
        if (chk) chk.checked = !!chequeado;

        const lbl = document.getElementById(`lbl_eval_alu_${aluId}`);
        if (lbl) {
          lbl.style.background = chequeado ? '#dbeafe' : '#f8fafc';
          lbl.style.borderColor = chequeado ? '#93c5fd' : '#cbd5e1';
          lbl.style.fontWeight = chequeado ? '700' : '500';
          lbl.style.color = chequeado ? '#1e40af' : '#334155';
        }

        this.actualizarResumenSeleccionAlumnosRubrica();
      }

      toggleAutoSiguienteAlumno(valor) {
        this.autoSiguienteAlumno = !!valor;
        localStorage.setItem("autoSiguienteAlumno", this.autoSiguienteAlumno ? "true" : "false");
        this.actualizarUISelectorAlumnosRubrica();
      }

      toggleSoloPendientes(valor) {
        this.soloPendientes = !!valor;
        localStorage.setItem("soloPendientes", this.soloPendientes ? "true" : "false");
        this.actualizarUISelectorAlumnosRubrica();
      }

      alumnoTieneEvaluacionRubrica(rubricaId, alumnoId) {
        if (!this.grupoActivo) return false;
        const evalKey = this.evaluacionActiva;
        const evalData = this.grupoActivo.evaluaciones ? this.grupoActivo.evaluaciones[evalKey] : null;
        if (!evalData) return false;

        const scores = evalData.calificacionesRubricas && evalData.calificacionesRubricas[rubricaId] ? evalData.calificacionesRubricas[rubricaId][alumnoId] : null;
        if (scores && typeof scores === "object") {
          const keys = Object.keys(scores);
          if (keys.length > 0) {
            const tienePuntuacion = keys.some(k => scores[k] !== undefined && scores[k] !== null && scores[k] !== "");
            if (tienePuntuacion) return true;
          }
        }

        const rubActs = (evalData.actividades || []).filter(a => a.rubricaId === rubricaId);
        if (rubActs.length > 0 && evalData.calificaciones) {
          const tieneNotaAct = rubActs.some(act => {
            const v = evalData.calificaciones[act.id] ? evalData.calificaciones[act.id][alumnoId] : undefined;
            return v !== undefined && v !== null && v !== "";
          });
          if (tieneNotaAct) return true;
        }

        return false;
      }

      actualizarUIModoAlumnoAleatorio() {
        const activo = !!this.modoAlumnoAleatorio;

        const btnRubrica = document.getElementById("btnAlumnoAleatorio");
        if (btnRubrica) {
          if (activo) {
            btnRubrica.classList.add("active");
            btnRubrica.innerHTML = "🎲 Aleatorio: ON ✓";
            btnRubrica.title = "Modo Alumno Aleatorio ACTIVADO. Haz clic para desactivarlo.";
          } else {
            btnRubrica.classList.remove("active");
            btnRubrica.innerHTML = "🎲 Aleatorio";
            btnRubrica.title = "Activar modo Alumno Aleatorio";
          }
        }

        const btnsCuaderno = document.querySelectorAll(".btn-alumno-aleatorio");
        btnsCuaderno.forEach(btn => {
          if (activo) {
            btn.classList.add("active");
            btn.innerHTML = "🎲 Aleatorio: ON ✓";
            btn.title = "Modo Alumno Aleatorio ACTIVADO. Haz clic para desactivarlo.";
          } else {
            btn.classList.remove("active");
            btn.innerHTML = "🎲 Alumno aleatorio";
            btn.title = "Activar modo Alumno Aleatorio";
          }
        });
      }

      toggleModoAlumnoAleatorio() {
        this.modoAlumnoAleatorio = !this.modoAlumnoAleatorio;
        localStorage.setItem("modoAlumnoAleatorio", this.modoAlumnoAleatorio ? "true" : "false");

        this.actualizarUIModoAlumnoAleatorio();

        if (this.modoAlumnoAleatorio) {
          this.ejecutarSeleccionAlumnoAleatorio(true);
        } else {
          this.mostrarToast("🎲 Modo Alumno Aleatorio DESACTIVADO");
        }
      }

      ejecutarSeleccionAlumnoAleatorio(esActivacionManual = false) {
        const modalRubrica = document.getElementById("modalEvaluarRubrica");
        const modalAbierto = modalRubrica && modalRubrica.classList.contains("open") && this.evaluandoRubricaActual;

        if (modalAbierto) {
          this.seleccionarAlumnoAleatorioRubricaInterno(esActivacionManual);
        } else {
          this.seleccionarAlumnoAleatorioCuadernoInterno(esActivacionManual);
        }
      }

      seleccionarAlumnoAleatorioRubricaInterno(esActivacion = false) {
        if (!this.evaluandoRubricaActual || !this.grupoActivo) return;

        if (this.evaluandoRubricaActual.modoMultiple) {
          this.setModoSeleccionAlumnoRubrica(false);
        }

        const alumnos = this.grupoActivo.alumnos || [];
        if (alumnos.length === 0) return;

        const rubId = this.evaluandoRubricaActual.rubrica.id;
        const pendientes = alumnos.filter(a => !this.alumnoTieneEvaluacionRubrica(rubId, a.id));
        let candidatos = [...alumnos];

        if (this.soloPendientes || pendientes.length > 0) {
          if (pendientes.length === 0 && this.soloPendientes) {
            this.mostrarToast("🎉 Todos los alumnos del grupo ya están evaluados.", 3500);
            this.cerrarModal("modalEvaluarRubrica");
            return;
          }
          if (pendientes.length > 0) {
            candidatos = pendientes;
          }
        }

        if (candidatos.length > 1 && this.evaluandoRubricaActual.alumnoId) {
          const sinActual = candidatos.filter(a => a.id !== this.evaluandoRubricaActual.alumnoId);
          if (sinActual.length > 0) candidatos = sinActual;
        }

        const randomIdx = Math.floor(Math.random() * candidatos.length);
        const elegido = candidatos[randomIdx];

        if (elegido) {
          this.cargarEvaluacionRubricaAlumno(elegido.id);
          const select = document.getElementById("evalRubricaAlumnoSelect");
          if (select) {
            select.value = elegido.id;
          }
          const tieneNota = this.alumnoTieneEvaluacionRubrica(rubId, elegido.id);
          const msgPrefix = esActivacion ? "🎲 Modo Alumno Aleatorio ACTIVADO." : "🎲 Alumno aleatorio cargado:";
          this.mostrarToast(`${msgPrefix} ${elegido.nombre} (${tieneNota ? '✅ Evaluado' : '⏳ Pendiente'})`);
        }
      }

      seleccionarAlumnoAleatorioCuadernoInterno(esActivacion = false) {
        if (!this.grupoActivo || !this.grupoActivo.alumnos || this.grupoActivo.alumnos.length === 0) {
          alert("No hay alumnos matriculados en este grupo para seleccionar.");
          return;
        }
        const alumnos = this.grupoActivo.alumnos;
        const randomAlu = alumnos[Math.floor(Math.random() * alumnos.length)];

        this.seleccionarAlumnoCuaderno(randomAlu.id);

        const row = document.getElementById(`row-alumno-${randomAlu.id}`);
        if (row) {
          row.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        const msgPrefix = esActivacion ? "🎲 Modo Alumno Aleatorio ACTIVADO." : "🎲 Alumno seleccionado al azar:";
        this.mostrarToast(`${msgPrefix} ${randomAlu.nombre}`);
      }

      seleccionarAlumnoAleatorioRubrica() {
        this.toggleModoAlumnoAleatorio();
      }

      actualizarUISelectorAlumnosRubrica() {
        if (!this.evaluandoRubricaActual || !this.grupoActivo) return;
        const esMultiple = !!this.evaluandoRubricaActual.modoMultiple;
        const alumnos = this.grupoActivo.alumnos || [];
        const seleccionados = this.evaluandoRubricaActual.alumnosSeleccionados || new Set();
        const rubId = this.evaluandoRubricaActual.rubrica.id;

        const btnUnico = document.getElementById("btnRubricaModoUnico");
        const btnMultiple = document.getElementById("btnRubricaModoMultiple");
        const contUnico = document.getElementById("contenedorRubricaAlumnoUnico");
        const contMultiple = document.getElementById("contenedorRubricaAlumnosMultiple");
        const btnGuardar = document.getElementById("btnGuardarRubricaAlumno");
        const chkAuto = document.getElementById("chkAutoSiguienteAlumno");
        const chkPend = document.getElementById("chkSoloPendientes");
        const lblPend = document.getElementById("lblSoloPendientesContainer");

        if (chkAuto) chkAuto.checked = !!this.autoSiguienteAlumno;
        if (chkPend) chkPend.checked = !!this.soloPendientes;
        if (lblPend) {
          lblPend.style.opacity = this.autoSiguienteAlumno ? "1" : "0.55";
          lblPend.style.pointerEvents = this.autoSiguienteAlumno ? "auto" : "none";
        }

        if (btnUnico && btnMultiple) {
          if (esMultiple) {
            btnUnico.className = "btn btn-sm btn-secondary";
            btnMultiple.className = "btn btn-sm btn-primary active";
          } else {
            btnMultiple.className = "btn btn-sm btn-secondary";
            btnUnico.className = "btn btn-sm btn-primary active";
          }
        }

        if (contUnico) contUnico.style.display = esMultiple ? "none" : "flex";
        if (contMultiple) contMultiple.style.display = esMultiple ? "flex" : "none";

        if (esMultiple) {
          const grid = document.getElementById("evalRubricaGridAlumnosMultiple");
          if (grid) {
            grid.innerHTML = "";
            grid.style.display = "flex";
            grid.style.flexDirection = "column";
            grid.style.gap = "4px";

            // Mantener un orden estable correlativo de lista (1 a N) sin saltos visuales durante la selección
            const alumnosOrdenados = alumnos.slice().sort((a, b) => (a.orden || 0) - (b.orden || 0));

            alumnosOrdenados.forEach((alu, index) => {
              const isChecked = seleccionados.has(alu.id);
              const tieneNota = this.alumnoTieneEvaluacionRubrica(rubId, alu.id);
              const numDisplay = alu.orden || (index + 1);
              const lbl = document.createElement("label");
              lbl.id = `lbl_eval_alu_${alu.id}`;
              lbl.style.cssText = `display: flex; align-items: center; gap: 8px; background: ${isChecked ? '#dbeafe' : '#f8fafc'}; border: 1px solid ${isChecked ? '#93c5fd' : '#cbd5e1'}; padding: 3px 8px; border-radius: 5px; font-size: 0.8rem; font-weight: ${isChecked ? '700' : '500'}; color: ${isChecked ? '#1e40af' : '#334155'}; cursor: pointer; user-select: none; width: 100%; transition: background 0.1s ease;`;
              lbl.innerHTML = `
                <input type="checkbox" id="chk_eval_alu_${alu.id}" value="${alu.id}" ${isChecked ? "checked" : ""} onchange="app.toggleAlumnoRubricaSeleccion('${alu.id}', this.checked)" style="cursor: pointer; width: 15px; height: 15px; accent-color: #2563eb;" />
                <span style="font-weight: 800; color: #64748b; font-size: 0.78rem; min-width: 24px;">${numDisplay}.</span>
                <span style="flex: 1;">${this.escapeHtml(alu.nombre)}</span>
                <span style="font-size: 0.72rem; padding: 1px 6px; border-radius: 4px; font-weight: 700; ${tieneNota ? 'background: #dcfce7; color: #166534;' : 'background: #fef3c7; color: #92400e;'}">${tieneNota ? '✅ Evaluado' : '⏳ Pendiente'}</span>
              `;
              grid.appendChild(lbl);
            });
          }
        } else {
          const select = document.getElementById("evalRubricaAlumnoSelect");
          if (select) {
            select.innerHTML = "";
            // Mantener estricto orden correlativo de clase (1 a N) sin mezclar ni alterar posiciones
            alumnos.forEach((alu, index) => {
              const numDisplay = alu.orden || (index + 1);
              const tieneNota = this.alumnoTieneEvaluacionRubrica(rubId, alu.id);
              const opt = document.createElement("option");
              opt.value = alu.id;
              opt.textContent = `${numDisplay}. ${alu.nombre} ${tieneNota ? '✅ (Evaluado)' : '⏳ (Pendiente)'}`;
              select.appendChild(opt);
            });

            select.value = this.evaluandoRubricaActual.alumnoId;
          }
        }

        if (btnGuardar) {
          if (esMultiple) {
            btnGuardar.textContent = `💾 Guardar Calificación (${seleccionados.size} Alumno${seleccionados.size === 1 ? '' : 's'})`;
          } else {
            const currentAlu = alumnos.find(a => a.id === this.evaluandoRubricaActual.alumnoId);
            const name = currentAlu ? currentAlu.nombre : "Alumno";
            if (this.autoSiguienteAlumno) {
              btnGuardar.textContent = `💾 Guardar y Avanzar ➡️ (${name})`;
            } else {
              btnGuardar.textContent = `💾 Guardar Calificación de ${name}`;
            }
          }
        }

        // Actualizar visualmente la tarjeta del alumno SIEMPRE VISIBLE en el header y el banner destacado
        const hdrNombre = document.getElementById("evalRubricaHeaderAlumnoNombre");
        const hdrBadge = document.getElementById("evalRubricaHeaderAlumnoBadge");
        const hdrSub = document.getElementById("evalRubricaHeaderAlumnoSub");
        const hdrNavBtns = document.getElementById("evalRubricaHeaderNavBtns");

        const destNum = document.getElementById("evalRubricaDestacadoNum");
        const destNombre = document.getElementById("evalRubricaDestacadoNombre");
        const destEstado = document.getElementById("evalRubricaDestacadoEstado");

        if (esMultiple) {
          if (hdrNombre) hdrNombre.textContent = `👥 Selección Múltiple (${seleccionados.size})`;
          if (hdrBadge) {
            hdrBadge.textContent = `${seleccionados.size} de ${alumnos.length} alums.`;
            hdrBadge.style.background = "#ffffff";
            hdrBadge.style.color = "#1e40af";
          }
          if (hdrSub) hdrSub.textContent = "Aplicando la misma calificación grupal";
          if (hdrNavBtns) hdrNavBtns.style.display = "none";

          if (destNombre) destNombre.textContent = `${seleccionados.size} alumno(s) seleccionados`;
          if (destNum) destNum.textContent = "👥";
          if (destEstado) {
            destEstado.textContent = `${seleccionados.size} / ${alumnos.length} alums.`;
            destEstado.style.background = "#dbeafe";
            destEstado.style.color = "#1e40af";
          }
        } else {
          const aluIdx = alumnos.findIndex(a => String(a.id) === String(this.evaluandoRubricaActual.alumnoId));
          const currentAlu = aluIdx !== -1 ? alumnos[aluIdx] : (alumnos.length > 0 ? alumnos[0] : null);
          if (currentAlu && aluIdx === -1) {
            this.evaluandoRubricaActual.alumnoId = currentAlu.id;
          }
          const realIdx = currentAlu ? alumnos.findIndex(a => String(a.id) === String(currentAlu.id)) : 0;
          const name = currentAlu ? currentAlu.nombre : "Sin alumno seleccionado";
          const order = currentAlu ? (currentAlu.orden || (realIdx + 1)) : "-";
          const tieneNota = currentAlu ? this.alumnoTieneEvaluacionRubrica(rubId, currentAlu.id) : false;

          if (hdrNombre) {
            hdrNombre.textContent = name;
            hdrNombre.title = `Evaluando alumno: ${name}`;
          }
          if (hdrBadge) {
            hdrBadge.textContent = tieneNota ? "✅ Evaluado" : "⏳ Pendiente";
            hdrBadge.style.background = tieneNota ? "#dcfce7" : "#fef3c7";
            hdrBadge.style.color = tieneNota ? "#166534" : "#92400e";
          }
          if (hdrSub) hdrSub.textContent = `n.º ${order} (${realIdx + 1} de ${alumnos.length})`;
          if (hdrNavBtns) hdrNavBtns.style.display = "inline-flex";

          if (destNombre) destNombre.textContent = name;
          if (destNum) destNum.textContent = `#${order}`;
          if (destEstado) {
            destEstado.textContent = tieneNota ? "✅ Evaluado" : "⏳ Pendiente";
            destEstado.style.background = tieneNota ? "#dcfce7" : "#fef3c7";
            destEstado.style.color = tieneNota ? "#166534" : "#92400e";
            destEstado.style.border = tieneNota ? "1px solid #86efac" : "1px solid #fde68a";
          }
        }

        this.actualizarUIModoAlumnoAleatorio();
      }

      cargarEvaluacionRubricaAlumno(alumnoId) {
        if (!this.evaluandoRubricaActual) return;
        this.evaluandoRubricaActual.alumnoId = alumnoId;
        this.evaluandoRubricaActual.modoMultiple = false;
        this.evaluandoRubricaActual.alumnosSeleccionados = new Set([alumnoId]);
        this.seleccionarAlumnoCuaderno(alumnoId);

        const evalData = this.grupoActivo.evaluaciones[this.evaluacionActiva];
        const rubId = this.evaluandoRubricaActual.rubrica.id;
        if (!evalData.calificacionesRubricas) evalData.calificacionesRubricas = {};
        if (!evalData.calificacionesRubricas[rubId]) evalData.calificacionesRubricas[rubId] = {};

        this.evaluandoRubricaActual.itemScores = { ...(evalData.calificacionesRubricas[rubId][alumnoId] || {}) };
        this.actualizarUISelectorAlumnosRubrica();
        this.renderizarContenidoEvaluacionAlumno();
      }

      navegarAlumnoRubrica(dir) {
        if (!this.grupoActivo || !this.evaluandoRubricaActual) return;
        const alumnos = this.grupoActivo.alumnos || [];
        const currentIdx = alumnos.findIndex(a => a.id === this.evaluandoRubricaActual.alumnoId);
        if (currentIdx === -1) return;

        const rubId = this.evaluandoRubricaActual.rubrica.id;

        if (dir > 0 && this.modoAlumnoAleatorio) {
          this.seleccionarAlumnoAleatorioRubricaInterno(false);
          return;
        }

        if (dir > 0 && this.autoSiguienteAlumno && this.soloPendientes) {
          let nextAlu = null;
          for (let i = currentIdx + 1; i < alumnos.length; i++) {
            if (!this.alumnoTieneEvaluacionRubrica(rubId, alumnos[i].id)) {
              nextAlu = alumnos[i];
              break;
            }
          }
          if (!nextAlu) {
            for (let i = 0; i < currentIdx; i++) {
              if (!this.alumnoTieneEvaluacionRubrica(rubId, alumnos[i].id)) {
                nextAlu = alumnos[i];
                break;
              }
            }
          }
          if (nextAlu) {
            const select = document.getElementById("evalRubricaAlumnoSelect");
            if (select) select.value = nextAlu.id;
            this.cargarEvaluacionRubricaAlumno(nextAlu.id);
            return;
          } else {
            this.mostrarToast("ℹ️ Todos los alumnos del grupo ya están evaluados.");
            return;
          }
        }

        let nextIdx = currentIdx + dir;
        if (nextIdx < 0) nextIdx = alumnos.length - 1;
        if (nextIdx >= alumnos.length) nextIdx = 0;

        const nextAlu = alumnos[nextIdx];
        const select = document.getElementById("evalRubricaAlumnoSelect");
        if (select) select.value = nextAlu.id;
        this.cargarEvaluacionRubricaAlumno(nextAlu.id);
      }

      renderizarContenidoEvaluacionAlumno() {
        if (!this.evaluandoRubricaActual) return;
        const { rubrica, itemScores } = this.evaluandoRubricaActual;
        const container = document.getElementById("evalRubricaBodyItems");
        if (!container) return;
        container.innerHTML = "";

        const items = rubrica.items || [];
        if (items.length === 0) {
          container.innerHTML = `<div style="padding: 12px; text-align: center; color: #64748b;">No hay ítems configurados en esta rúbrica.</div>`;
          return;
        }

        // Encabezado tipo tabla ultra-compacto
        const headerTable = document.createElement("div");
        headerTable.className = "rubrica-eval-header-table";
        headerTable.style.cssText = "display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 4px 10px; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px 6px 0 0; font-weight: 800; font-size: 0.78rem; color: #475569;";
        headerTable.innerHTML = `
          <span class="header-col-act" style="min-width: 58px; text-align: center;">Actividad</span>
          <span class="header-col-calif" style="min-width: 190px; text-align: center;">Calificación</span>
          <span class="header-col-desc" style="flex: 1; min-width: 80px;">Descripción</span>
          <span class="header-col-crit" style="min-width: 44px; text-align: center;">Criterio</span>
        `;

        const listContainer = document.createElement("div");
        listContainer.style.cssText = "border: 1px solid #cbd5e1; border-top: none; border-radius: 0 0 6px 6px; overflow: hidden;";

        items.forEach((it, idx) => {
          const itemRow = document.createElement("div");
          itemRow.className = "rubrica-item-eval-row";

          const currentVal = itemScores[it.id];

          let evalControl = "";
          const isOrtItem = it.isOrtografia || it.titulo === "Ortografía" || (it.id && String(it.id).startsWith("item-ortografia"));

          if (isOrtItem) {
            const strVal = String(currentVal !== undefined && currentVal !== null ? currentVal : "");
            evalControl = `
              <div style="display: flex; gap: 3px;">
                <button type="button" class="btn-rubrica-compact val-0 ${strVal === "0" ? "active" : ""}" onclick="app.updateRubricItemScore('${it.id}', 0)" title="Insuficiente (0)">0</button>
                <button type="button" class="btn-rubrica-compact val-3 ${strVal === "3" ? "active" : ""}" onclick="app.updateRubricItemScore('${it.id}', 3)" title="Regular (3)">3</button>
                <button type="button" class="btn-rubrica-compact val-6 ${strVal === "6" ? "active" : ""}" onclick="app.updateRubricItemScore('${it.id}', 6)" title="Notable (6)">6</button>
                <button type="button" class="btn-rubrica-compact val-10 ${strVal === "10" ? "active" : ""}" onclick="app.updateRubricItemScore('${it.id}', 10)" title="Excelente (10)">10</button>
              </div>
            `;
          } else if (this.isTipoExamen(rubrica.tipo, rubrica.titulo)) {
            const maxS = Number(it.maxScore) || 1;
            const valNum = (currentVal !== undefined && currentVal !== null && currentVal !== "") ? currentVal : "";
            const converted = (valNum !== "" && !isNaN(Number(valNum))) ? ((Number(valNum) / maxS) * 10) : null;

            evalControl = `
              <div style="display: flex; align-items: center; gap: 4px;">
                <input
                  type="text"
                  inputmode="decimal"
                  id="inputExamenItem-${idx}"
                  class="input-examen-score"
                  data-idx="${idx}"
                  data-item-id="${it.id}"
                  data-max="${maxS}"
                  value="${valNum}"
                  placeholder="0 - ${maxS}"
                  onclick="this.select()"
                  onfocus="this.select()"
                  oninput="app.handleExamenItemInput(this, '${it.id}', ${maxS})"
                  onkeydown="app.handleExamenItemKeydown(event, this, ${idx})"
                  onblur="app.handleExamenItemBlur(this, '${it.id}', ${maxS})"
                />
                <span style="font-size: 0.74rem; font-weight: 700; color: #64748b;">/ ${maxS}</span>
                <span id="convertedBadge-${it.id}" style="background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; padding: 1px 5px; border-radius: 4px; font-weight: 800; font-size: 0.72rem; display: ${converted !== null ? 'inline-block' : 'none'};">
                  ${converted !== null ? `=${converted.toFixed(1)}` : ""}
                </span>
              </div>
            `;
          } else if (this.isTipoTrabajo(rubrica.tipo, rubrica.titulo)) {
            const strVal = String(currentVal !== undefined && currentVal !== null ? currentVal : "");
            evalControl = `
              <div style="display: flex; gap: 4px;">
                <button type="button" class="btn-rubrica-trabajo val-s ${strVal === "0" ? "active" : ""}" onclick="app.updateRubricItemScore('${it.id}', 0)" title="Insuficiente / Suficiente Bajo (S = 0)">S (0)</button>
                <button type="button" class="btn-rubrica-trabajo val-a ${strVal === "5" ? "active" : ""}" onclick="app.updateRubricItemScore('${it.id}', 5)" title="Aceptable (A = 5)">A (5)</button>
                <button type="button" class="btn-rubrica-trabajo val-b ${strVal === "7" ? "active" : ""}" onclick="app.updateRubricItemScore('${it.id}', 7)" title="Bueno (B = 7)">B (7)</button>
                <button type="button" class="btn-rubrica-trabajo val-sb ${strVal === "10" ? "active" : ""}" onclick="app.updateRubricItemScore('${it.id}', 10)" title="Sobresaliente (SB = 10)">SB (10)</button>
              </div>
            `;
          } else {
            const strVal = String(currentVal !== undefined && currentVal !== null ? currentVal : "");
            evalControl = `
              <div style="display: flex; gap: 4px; align-items: center;">
                <button type="button" class="btn-rubrica-compact face-selected-10 ${strVal === "10" ? "active" : ""}" onclick="app.updateRubricItemScore('${it.id}', 10)" title="Sobresaliente / Excelente (10 pts)" style="padding: 4px 10px; font-weight: 800; font-size: 0.84rem; cursor: pointer; border-radius: 6px;">😃 10</button>
                <button type="button" class="btn-rubrica-compact face-selected-5 ${strVal === "5" ? "active" : ""}" onclick="app.updateRubricItemScore('${it.id}', 5)" title="Aceptable / Regular (5 pts)" style="padding: 4px 10px; font-weight: 800; font-size: 0.84rem; cursor: pointer; border-radius: 6px;">😐 5</button>
                <button type="button" class="btn-rubrica-compact face-selected-0 ${strVal === "0" ? "active" : ""}" onclick="app.updateRubricItemScore('${it.id}', 0)" title="Insuficiente / Cero (0 pts)" style="padding: 4px 10px; font-weight: 800; font-size: 0.84rem; cursor: pointer; border-radius: 6px;">😢 0</button>
              </div>
            `;
          }

          const actLabel = String(it.numActividad || it.orderLabel || (it.order !== undefined ? it.order : (idx + 1)));
          const critStr = (it.criterio || "").trim();
          const critBadgeStyle = isOrtItem 
            ? "background: #fdf2f8; color: #be185d; border: 1px solid #fbcfe8; padding: 1px 6px; border-radius: 4px; font-weight: 800; font-size: 0.73rem; white-space: nowrap; flex-shrink: 0; min-width: 44px; text-align: center;"
            : "background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 1px 6px; border-radius: 4px; font-weight: 700; font-size: 0.73rem; white-space: nowrap; flex-shrink: 0; min-width: 44px; text-align: center;";

          const safeActLabel = this.escapeHtml(actLabel);
          const safeItemTitle = this.escapeHtml(it.titulo || 'Actividad ' + actLabel);
          const safeCritStr = this.escapeHtml(critStr || '-');

          itemRow.innerHTML = `
            <span class="rubrica-item-num" style="font-weight: 800; font-size: 0.82rem; color: #1e40af; background: #dbeafe; border: 1px solid #bfdbfe; padding: 3px 6px; border-radius: 6px; min-width: 58px; text-align: center; flex-shrink: 0;" title="Actividad ${safeActLabel}">${safeActLabel}</span>
            <div class="rubrica-item-control" style="flex-shrink: 0; min-width: 215px; display: flex; justify-content: center;">${evalControl}</div>
            <span class="rubrica-item-desc" style="flex: 1; min-width: 80px; font-size: 0.78rem; font-weight: 600; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${safeItemTitle}">${safeItemTitle}</span>
            <span class="rubrica-item-crit" style="${critBadgeStyle}">${safeCritStr}</span>
          `;
          listContainer.appendChild(itemRow);
        });

        container.appendChild(headerTable);
        container.appendChild(listContainer);

        this.recalcularResumenCriteriosEval();

        // En modo Examen, enfocar automáticamente el primer input y seleccionarlo para escribir al instante
        if (this.isTipoExamen(rubrica.tipo, rubrica.titulo)) {
          setTimeout(() => {
            const firstInp = document.getElementById("inputExamenItem-0");
            if (firstInp && document.activeElement !== firstInp && (!document.activeElement || !document.activeElement.classList || !document.activeElement.classList.contains("input-examen-score"))) {
              firstInp.focus();
              firstInp.select();
            }
          }, 60);
        }
      }

      handleExamenItemInput(inputEl, itemId, maxS) {
        if (!this.evaluandoRubricaActual) return;
        const raw = inputEl.value;
        const clean = raw.replace(",", ".").trim();
        const convertedBadge = document.getElementById("convertedBadge-" + itemId);

        if (clean === "") {
          delete this.evaluandoRubricaActual.itemScores[itemId];
          if (convertedBadge) convertedBadge.style.display = "none";
        } else {
          const num = parseFloat(clean);
          if (!isNaN(num)) {
            this.evaluandoRubricaActual.itemScores[itemId] = num;
            if (convertedBadge) {
              const converted = ((num / (maxS || 1)) * 10);
              convertedBadge.textContent = `=${converted.toFixed(1)}`;
              convertedBadge.style.display = "inline-block";
            }
          }
        }
        this.recalcularResumenCriteriosEval();
      }

      handleExamenItemBlur(inputEl, itemId, maxS) {
        if (!this.evaluandoRubricaActual) return;
        const raw = inputEl.value;
        const clean = raw.replace(",", ".").trim();
        const convertedBadge = document.getElementById("convertedBadge-" + itemId);

        if (clean === "") {
          delete this.evaluandoRubricaActual.itemScores[itemId];
          if (convertedBadge) convertedBadge.style.display = "none";
        } else {
          let num = parseFloat(clean);
          if (!isNaN(num)) {
            num = Math.max(0, Math.min(maxS, num));
            this.evaluandoRubricaActual.itemScores[itemId] = num;
            inputEl.value = num;
            if (convertedBadge) {
              const converted = ((num / (maxS || 1)) * 10);
              convertedBadge.textContent = `=${converted.toFixed(1)}`;
              convertedBadge.style.display = "inline-block";
            }
          }
        }
        this.recalcularResumenCriteriosEval();
      }

      handleExamenItemKeydown(event, inputEl, idx) {
        if (event.key === "Enter") {
          event.preventDefault();
          const maxS = parseFloat(inputEl.getAttribute("data-max") || "1");
          const itemId = inputEl.getAttribute("data-item-id");
          this.handleExamenItemBlur(inputEl, itemId, maxS);

          const nextInput = document.getElementById(`inputExamenItem-${idx + 1}`);
          if (nextInput) {
            nextInput.focus();
            nextInput.select();
          } else {
            // Última pregunta del examen: guardar nota y avanzar automáticamente al siguiente alumno
            this.guardarYPasarSiguienteAlumnoExamen();
          }
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          const nextInput = document.getElementById(`inputExamenItem-${idx + 1}`);
          if (nextInput) {
            nextInput.focus();
            nextInput.select();
          }
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          const prevInput = document.getElementById(`inputExamenItem-${idx - 1}`);
          if (prevInput) {
            prevInput.focus();
            prevInput.select();
          }
        }
      }

      guardarYPasarSiguienteAlumnoExamen() {
        if (!this.evaluandoRubricaActual || !this.grupoActivo) return;
        const { alumnoId } = this.evaluandoRubricaActual;
        const alumnos = this.grupoActivo.alumnos || [];
        const currentIdx = alumnos.findIndex(a => a.id === alumnoId);
        const currentAlu = alumnos[currentIdx];
        const currentNombre = currentAlu ? currentAlu.nombre : "Alumno";

        // Guardar calificación del examen para este alumno
        this.guardarEvaluacionRubricaAlumnoInterno(true);

        if (currentIdx !== -1 && currentIdx + 1 < alumnos.length) {
          const nextAlu = alumnos[currentIdx + 1];
          this.cargarEvaluacionRubricaAlumno(nextAlu.id);
          const select = document.getElementById("evalRubricaAlumnoSelect");
          if (select) select.value = nextAlu.id;

          this.mostrarToast(`💾 Guardado ${currentNombre}. Evaluando ahora: ${nextAlu.nombre}`);
          setTimeout(() => {
            const firstInp = document.getElementById("inputExamenItem-0");
            if (firstInp) {
              firstInp.focus();
              firstInp.select();
            }
          }, 80);
        } else {
          this.mostrarToast(`🎉 ¡Has completado la calificación de todos los alumnos de este grupo!`, 4000);
          const btnGuardar = document.getElementById("btnGuardarRubricaAlumno");
          if (btnGuardar) btnGuardar.focus();
        }
      }

      guardarEvaluacionRubricaAlumnoInterno(silencioso = false) {
        if (!this.evaluandoRubricaActual || !this.grupoActivo) return;

        const { rubrica, modoMultiple, alumnoId, alumnosSeleccionados, itemScores } = this.evaluandoRubricaActual;
        const evalKey = this.evaluacionActiva;
        const evalData = this.grupoActivo.evaluaciones[evalKey];

        if (!evalData.calificacionesRubricas) evalData.calificacionesRubricas = {};
        if (!evalData.calificacionesRubricas[rubrica.id]) evalData.calificacionesRubricas[rubrica.id] = {};

        const summary = window.rubricEngine.calculateCriterionAveragesFromRubric(
          rubrica.items || [],
          rubrica.tipo,
          itemScores
        );

        if (!evalData.actividades) evalData.actividades = [];
        let rubActs = evalData.actividades.filter(a => a.rubricaId === rubrica.id);

        if (rubActs.length === 0) {
          this.crearOActualizarSeccionesYColumnasParaRubrica(rubrica);
          rubActs = evalData.actividades.filter(a => a.rubricaId === rubrica.id);
        }

        if (!evalData.calificaciones) evalData.calificaciones = {};

        const rawTargetIds = modoMultiple ? Array.from(alumnosSeleccionados || []) : [alumnoId];
        const validGroupStudentIds = new Set((this.grupoActivo.alumnos || []).map(a => a.id));
        const targetIds = rawTargetIds.filter(id => validGroupStudentIds.has(id));

        targetIds.forEach(tId => {
          const hasAnyScore = itemScores && Object.keys(itemScores).some(k => itemScores[k] !== undefined && itemScores[k] !== null && itemScores[k] !== "");

          if (hasAnyScore) {
            evalData.calificacionesRubricas[rubrica.id][tId] = { ...itemScores };
          } else {
            if (evalData.calificacionesRubricas[rubrica.id][tId]) {
              delete evalData.calificacionesRubricas[rubrica.id][tId];
            }
          }

          rubActs.forEach(act => {
            if (!evalData.calificaciones[act.id]) evalData.calificaciones[act.id] = {};
            const actCrits = act.criterios || [];
            const normFunc = window.rubricEngine?.normalizeCriterionCode;
            const relevantAverages = actCrits.map(c => {
              if (summary.criterionAverages[c] !== undefined) return summary.criterionAverages[c];
              if (normFunc) {
                const normC = normFunc(c);
                if (summary.criterionAverages[normC] !== undefined) return summary.criterionAverages[normC];
              }
              return undefined;
            }).filter(v => v !== undefined && v !== null);

            if (relevantAverages.length > 0) {
              const gradeVal = relevantAverages.reduce((a, b) => a + b, 0) / relevantAverages.length;
              evalData.calificaciones[act.id][tId] = Math.round(gradeVal * 100) / 100;
            } else if (actCrits.length === 0 && summary.overallGrade !== null) {
              evalData.calificaciones[act.id][tId] = Math.round(summary.overallGrade * 100) / 100;
            } else {
              delete evalData.calificaciones[act.id][tId];
            }
          });
        });

        // Desplegar automáticamente las columnas/secciones evaluadas
        this.desplegarSeccionesPorRubrica(rubActs);

        this.guardarDatos();

        if (this.vistaActiva === "cuaderno") {
          this.renderizarCuaderno();
        } else if (this.vistaActiva === "resultados") {
          this.renderizarResultados();
        }
      }

      updateRubricItemScore(itemId, val) {
        if (!this.evaluandoRubricaActual) return;
        if (!this.evaluandoRubricaActual.itemScores) {
          this.evaluandoRubricaActual.itemScores = {};
        }
        const currentVal = this.evaluandoRubricaActual.itemScores[itemId];
        if (currentVal !== undefined && currentVal !== null && currentVal !== "" && String(currentVal) === String(val)) {
          // Segundo clic en la misma calificación: deseleccionar / anular nota
          delete this.evaluandoRubricaActual.itemScores[itemId];
        } else {
          this.evaluandoRubricaActual.itemScores[itemId] = val;
        }
        this.renderizarContenidoEvaluacionAlumno();
      }

      anularLimpiarEvaluacionRubricaAlumno() {
        if (!this.evaluandoRubricaActual) return;
        this.evaluandoRubricaActual.itemScores = {};
        this.renderizarContenidoEvaluacionAlumno();
        this.guardarEvaluacionRubricaAlumnoInterno(true);
        this.mostrarToast("🧹 Calificación anulada. El alumno permanece en estado Pendiente de evaluar.");
      }

      ponerCeroTodasActividadesRubrica() {
        if (!this.evaluandoRubricaActual || !this.evaluandoRubricaActual.rubrica) return;
        const items = this.evaluandoRubricaActual.rubrica.items || [];
        if (items.length === 0) return;
        items.forEach(it => {
          this.evaluandoRubricaActual.itemScores[it.id] = 0;
        });
        this.renderizarContenidoEvaluacionAlumno();
        this.mostrarToast("⭕ Se ha asignado una nota de 0 a todas las actividades de la rúbrica.");
      }

      recalcularResumenCriteriosEval() {
        if (!this.evaluandoRubricaActual) return;
        const { rubrica, itemScores } = this.evaluandoRubricaActual;

        const resBox = document.getElementById("evalRubricaResumenCriterios");
        const globalBox = document.getElementById("evalRubricaNotaGlobal");

        if (!window.rubricEngine || !window.rubricEngine.calculateCriterionAveragesFromRubric) {
          if (resBox) resBox.textContent = "Calculando...";
          return;
        }

        const summary = window.rubricEngine.calculateCriterionAveragesFromRubric(
          rubrica.items || [],
          rubrica.tipo,
          itemScores
        );

        if (resBox) {
          resBox.innerHTML = "";
          const critCodes = Object.keys(summary.criterionAverages);

          if (critCodes.length === 0) {
            resBox.innerHTML = `<span style="font-size: 0.8rem; color: var(--text-muted);">Selecciona puntuaciones para calcular los promedios.</span>`;
          } else {
            critCodes.forEach(code => {
              const avg = summary.criterionAverages[code];
              const chip = document.createElement("div");
              chip.style.background = "#ffffff";
              chip.style.border = "1px solid #cbd5e1";
              chip.style.padding = "4px 8px";
              chip.style.borderRadius = "6px";
              chip.style.fontSize = "0.78rem";
              chip.style.display = "flex";
              chip.style.alignItems = "center";
              chip.style.gap = "6px";
              chip.innerHTML = `
                <strong style="color: var(--primary);">Crit. ${code}:</strong>
                <span style="font-weight: 800; color: ${avg >= 5 ? '#16a34a' : '#dc2626'};">${avg !== null ? avg.toFixed(2) : "-"}</span>
              `;
              resBox.appendChild(chip);
            });
          }
        }

        if (globalBox) {
          if (summary.overallGrade !== null) {
            globalBox.textContent = `${summary.overallGrade.toFixed(2)} / 10`;
            globalBox.style.color = summary.overallGrade >= 5 ? "#16a34a" : "#dc2626";
          } else {
            globalBox.textContent = "-";
          }
        }
      }

      guardarEvaluacionRubricaAlumno() {
        if (!this.evaluandoRubricaActual || !this.grupoActivo) return;

        const { rubrica, modoMultiple, alumnoId, alumnosSeleccionados } = this.evaluandoRubricaActual;
        const rawTargetIds = modoMultiple ? Array.from(alumnosSeleccionados || []) : [alumnoId];
        const validGroupStudentIds = new Set((this.grupoActivo.alumnos || []).map(a => a.id));
        const targetIds = rawTargetIds.filter(id => validGroupStudentIds.has(id));

        if (targetIds.length === 0) {
          alert("Por favor, selecciona al menos un alumno para aplicar la calificación.");
          return;
        }

        this.guardarEvaluacionRubricaAlumnoInterno(false);

        // --- EXCEPCIÓN REGLA DE VENTANAS: La ventana de evaluación por rúbrica NO se cierra al evaluar a un alumno ---
        // Siempre se pasa al siguiente alumno (o alumno aleatorio / pendiente) sin cerrar la ventana.
        if (!modoMultiple) {
          const alumnos = this.grupoActivo.alumnos || [];
          const currentIdx = alumnos.findIndex(a => a.id === alumnoId);

          if (currentIdx !== -1) {
            if (this.modoAlumnoAleatorio) {
              const aluObj = alumnos.find(a => a.id === alumnoId);
              const aluNombre = aluObj ? aluObj.nombre : "Alumno";
              this.mostrarToast(`💾 Calificación de ${aluNombre} guardada. Cargando alumno aleatorio...`);
              this.seleccionarAlumnoAleatorioRubricaInterno(false);
              return;
            } else if (this.soloPendientes) {
              // Buscar el primer alumno sin evaluar a partir de currentIdx + 1
              let nextAlu = null;
              for (let i = currentIdx + 1; i < alumnos.length; i++) {
                if (!this.alumnoTieneEvaluacionRubrica(rubrica.id, alumnos[i].id)) {
                  nextAlu = alumnos[i];
                  break;
                }
              }

              // Si no se encuentra más adelante en la lista, buscar si queda algún pendiente antes
              if (!nextAlu) {
                for (let i = 0; i < currentIdx; i++) {
                  if (!this.alumnoTieneEvaluacionRubrica(rubrica.id, alumnos[i].id)) {
                    nextAlu = alumnos[i];
                    break;
                  }
                }
              }

              if (nextAlu) {
                const aluObj = alumnos.find(a => a.id === alumnoId);
                const aluNombre = aluObj ? aluObj.nombre : "Alumno";
                this.mostrarToast(`💾 Nota de ${aluNombre} guardada. Cargando siguiente pendiente: ${nextAlu.nombre}`);
                this.cargarEvaluacionRubricaAlumno(nextAlu.id);
                return;
              } else {
                // Si no quedan más alumnos pendientes por evaluar
                this.mostrarToast(`🎉 Se ha completado la evaluación del grupo. Todos los alumnos están evaluados.`, 4000);
                this.cargarEvaluacionRubricaAlumno(alumnoId);
                return;
              }
            } else {
              // Avanzar en orden estricto al alumno inmediatamente posterior
              const nextIdx = currentIdx + 1;
              if (nextIdx < alumnos.length) {
                const nextAlu = alumnos[nextIdx];
                const aluObj = alumnos.find(a => a.id === alumnoId);
                const aluNombre = aluObj ? aluObj.nombre : "Alumno";
                this.mostrarToast(`💾 Nota de ${aluNombre} guardada. Cargando siguiente: ${nextAlu.nombre}`);
                this.cargarEvaluacionRubricaAlumno(nextAlu.id);
                return;
              } else {
                // Se alcanzó el final de la lista
                this.mostrarToast(`🎉 Se ha completado la evaluación del grupo (final de lista).`, 4000);
                this.cargarEvaluacionRubricaAlumno(alumnoId);
                return;
              }
            }
          }
        }

        if (modoMultiple) {
          this.mostrarToast(`💾 Calificación guardada con éxito para ${targetIds.length} alumno(s).`);
          this.cargarEvaluacionRubricaAlumno(alumnoId);
        }
      }

      solicitarEliminarRubrica(rubricaId) {
        if (!this.grupoActivo || !this.grupoActivo.rubricas) return;
        const rub = this.grupoActivo.rubricas.find(r => r.id === rubricaId);
        if (!rub) return;

        this.mostrarConfirmacion(
          `¿Estás seguro de que deseas eliminar la rúbrica <strong>"${rub.titulo}"</strong>?`,
          () => {
            this.grupoActivo.rubricas = this.grupoActivo.rubricas.filter(r => r.id !== rubricaId);
            this.guardarDatos();
            this.renderizarRubricasView();
            const modalCat = document.getElementById("modalCatalogoRubricas");
            if (modalCat && modalCat.style.display !== "none") {
              this.renderizarCatalogoRubricas();
            }
            this.actualizarUI();
            this.mostrarToast("🗑️ Rúbrica eliminada.");
          }
        );
      }

      abrirModalIconoEscritorio() {
        this.abrirModal("modalIconoEscritorio");
      }

      instalarAppEscritorio() {
        if (window.deferredPwaPrompt) {
          window.deferredPwaPrompt.prompt();
          window.deferredPwaPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
              this.mostrarToast("¡Aplicación instalada con éxito en tu ordenador!");
              this.cerrarModal("modalIconoEscritorio");
            }
            window.deferredPwaPrompt = null;
          });
        } else {
          alert("Sigue las instrucciones en pantalla para instalarla desde el menú de tu navegador.");
        }
      }

      cambiarEvaluacion(evalKey) {
        if (this.vistaActiva === "cuaderno" && evalKey === "final") {
          evalKey = "eval1";
        }
        this.evaluacionActiva = evalKey;

        const selCuaderno = document.getElementById("selectEvaluacionCuaderno");
        if (selCuaderno && evalKey !== "final") {
          selCuaderno.value = evalKey;
        }

        document.querySelectorAll(".eval-tab").forEach(b => b.classList.remove("active"));
        const tab1 = document.getElementById("tabEval1");
        const tab2 = document.getElementById("tabEval2");
        const tab3 = document.getElementById("tabEval3");
        if (evalKey === "eval1" && tab1) tab1.classList.add("active");
        if (evalKey === "eval2" && tab2) tab2.classList.add("active");
        if (evalKey === "eval3" && tab3) tab3.classList.add("active");
        if (evalKey === "final") {
          const tabFinal = document.getElementById("tabFinal");
          if (tabFinal) {
            tabFinal.classList.add("active");
            tabFinal.textContent = "Final";
          }
        }

        if (this.grupoActivo && this.grupoActivo.secciones) {
          this.seccionesPlegadas = new Set();
          this.grupoActivo.secciones.forEach(sec => {
            if (!this.seccionTieneEvaluaciones(sec.id, evalKey)) {
              this.seccionesPlegadas.add(sec.id);
            }
          });
        }

        if (this.vistaActiva === "cuaderno") {
          this.renderizarCuaderno();
        } else if (this.vistaActiva === "resultados") {
          this.renderizarResultados();
        }
      }

      cambiarGrupo(grupoId) {
        const found = this.data.grupos.find(g => g.id === grupoId);
        if (found) {
          this.grupoActivo = found;
          this.data.grupoActivoId = found.id;
          // Limpiar de forma absoluta los estados de selección para aislar completamente entre grupos
          this.alumnoCuadernoSeleccionadoId = null;
          this.evaluandoRubricaActual = null;
          this.diarioAlumnosSelIds = null;

          if (this.grupoActivo.secciones) {
            this.seccionesPlegadas = new Set();
            this.grupoActivo.secciones.forEach(sec => {
              if (!this.seccionTieneEvaluaciones(sec.id, this.evaluacionActiva)) {
                this.seccionesPlegadas.add(sec.id);
              }
            });
          }
          this.guardarDatos();
          this.actualizarUI();
        }
      }

      actualizarUI() {
        if (this._updateUIRaf) {
          cancelAnimationFrame(this._updateUIRaf);
        }
        this._updateUIRaf = requestAnimationFrame(() => {
          this._updateUIRaf = null;
          this.ejecutarActualizarUI();
        });
      }

      ejecutarActualizarUI() {
        try {
          // Garantizar que si hay grupos en data pero grupoActivo es nulo, se seleccione el grupo activo por defecto
          if (!this.grupoActivo && this.data && Array.isArray(this.data.grupos) && this.data.grupos.length > 0) {
            const visibleGroups = this.data.grupos.filter(g => !g.oculto);
            this.grupoActivo = visibleGroups.length > 0 ? visibleGroups[0] : this.data.grupos[0];
            if (this.grupoActivo) {
              this.data.grupoActivoId = this.grupoActivo.id;
            }
          }

          if (this.grupoActivo && !this.grupoActivo.evaluaciones) {
            this.grupoActivo.evaluaciones = {
              eval1: { actividades: [], calificaciones: {}, observaciones: {} },
              eval2: { actividades: [], calificaciones: {}, observaciones: {} },
              eval3: { actividades: [], calificaciones: {}, observaciones: {} },
              final: { actividades: [], calificaciones: {}, observaciones: {} }
            };
          }

          this.normalizarTiposActividadesYRubricas();
          this.renderizarSelectGrupos();
          const wrapCuaderno = document.getElementById("evalDropdownWrapCuaderno") || document.getElementById("evalSelectorCuadernoWrap");
          const tabsResultados = document.getElementById("evalTabsResultados");
          const selCuaderno = document.getElementById("selectEvaluacionCuaderno");
          if (selCuaderno && this.evaluacionActiva !== "final") {
            selCuaderno.value = this.evaluacionActiva;
          }
          if (wrapCuaderno) {
            wrapCuaderno.style.display = (this.vistaActiva === "cuaderno") ? "inline-flex" : "none";
          }
          if (tabsResultados) {
            tabsResultados.style.display = (this.vistaActiva === "resultados") ? "inline-flex" : "none";
          }
          const tabFinal = document.getElementById("tabFinal");
          if (tabFinal) {
            tabFinal.style.display = (this.vistaActiva === "resultados") ? "inline-flex" : "none";
            tabFinal.textContent = "Final";
          }

          const btnIcono = document.getElementById("btnCrearIconoHeader");
          if (btnIcono) {
            btnIcono.style.display = (this.vistaActiva === "configuracion") ? "inline-flex" : "none";
          }

          // Cambiar color del menú superior dinámicamente según el grupo activo
          const header = document.querySelector("header");
          if (header && this.data && this.data.grupos) {
            const paletaHeader = [
              "linear-gradient(145deg, #18372a 0%, #1e4534 100%)", // Verde Bosque
              "linear-gradient(145deg, #1e3a8a 0%, #1d4ed8 100%)", // Azul Real
              "linear-gradient(145deg, #581c87 0%, #6d28d9 100%)", // Púrpura Intenso
              "linear-gradient(145deg, #831843 0%, #be185d 100%)", // Rosa Borgoña
              "linear-gradient(145deg, #7c2d12 0%, #c2410c 100%)", // Terracota
              "linear-gradient(145deg, #134e4a 0%, #0f766e 100%)", // Verde Azulado
              "linear-gradient(145deg, #312e81 0%, #4338ca 100%)", // Índigo
              "linear-gradient(145deg, #701a75 0%, #a21caf 100%)"  // Violeta
            ];
            const idx = Math.max(0, this.data.grupos.findIndex(g => g.id === (this.grupoActivo ? this.grupoActivo.id : "")));
            header.style.background = paletaHeader[idx % paletaHeader.length];
          }

          if (this.vistaActiva === "cuaderno") this.renderizarCuaderno();
          if (this.vistaActiva === "resultados") this.renderizarResultados();
          if (this.vistaActiva === "configuracion") this.renderizarConfiguracion();
        } catch (err) {
          console.error("❌ Error durante el renderizado de la interfaz (actualizarUI):", err);
        } finally {
          this.ocultarSplashScreen();
        }
      }

      renderizarSelectGrupos() {
        const sel = document.getElementById("groupSelect");
        if (!sel) return;
        sel.innerHTML = "";
        if (!this.data || !Array.isArray(this.data.grupos)) return;
        this.data.grupos.forEach(g => {
          const opt = document.createElement("option");
          opt.value = g.id;
          opt.textContent = g.nombre + (g.oculto ? " (Oculto)" : "");
          if (g.id === this.data.grupoActivoId) opt.selected = true;
          sel.appendChild(opt);
        });
      }

      // --- PÁGINA 1: CUADERNO DE ACTIVIDADES Y CALIFICACIONES ---
      aplicarAnchoColumna(th, colKey, defaultWidth) {
        let w = (this.anchosColumnas && this.anchosColumnas[colKey]) ? this.anchosColumnas[colKey] : defaultWidth;

        if (colKey === "col-alumnos") {
          const container = document.getElementById("cuadernoTableContainer") || document.getElementById("containerTablaResultados");
          const containerW = container ? container.clientWidth : window.innerWidth;
          const isMobile = (window.innerWidth <= 768) ||
                           (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) ||
                           (window.visualViewport && window.visualViewport.width <= 768) ||
                           (document.documentElement && document.documentElement.clientWidth <= 768);
          let numericW = parseInt(w, 10);
          if (isMobile) {
            numericW = Math.max(180, isNaN(numericW) ? 200 : numericW);
            w = `${numericW}px`;
            th.style.width = w;
            th.style.minWidth = "180px";
            th.style.maxWidth = "none";
          } else {
            const maxAllowed = Math.max(170, containerW - 140);
            if (isNaN(numericW) || numericW > maxAllowed) {
              numericW = Math.min(210, maxAllowed);
              w = `${numericW}px`;
            }
            th.style.width = w;
            th.style.minWidth = "170px";
            th.style.maxWidth = `${maxAllowed}px`;
          }

          const t1 = document.getElementById("tablaCuaderno");
          const t2 = document.getElementById("tablaResultados");
          if (t1) t1.style.setProperty("--col-alumnos-width", w);
          if (t2) t2.style.setProperty("--col-alumnos-width", w);
        } else if (w) {
          th.style.width = w;
          th.style.minWidth = w;
          if (colKey && colKey.startsWith("sec-plegada-")) {
            th.style.maxWidth = w;
          }
        }
      }

      obtenerColorIntensificado(colorHex, porcentaje) {
        const pct = Math.max(0, Math.min(100, Number(porcentaje) || 0));
        // Menor intensidad al 1% (~0.18 opacidad), mayor intensidad al 100% (1.0 opacidad)
        const alpha = 0.18 + (pct / 100) * 0.82;

        if (colorHex && typeof colorHex === "string" && colorHex.startsWith("#")) {
          let hex = colorHex.replace("#", "");
          if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
          const r = parseInt(hex.substring(0, 2), 16) || 0;
          const g = parseInt(hex.substring(2, 4), 16) || 0;
          const b = parseInt(hex.substring(4, 6), 16) || 0;
          return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
        }
        return colorHex || "rgba(37, 99, 235, 0.5)";
      }

      renderizarCuaderno() {
        const containerTabla = document.getElementById("cuadernoTableContainer");
        const emptyMsg = document.getElementById("cuadernoVacio");

        if (!this.grupoActivo) {
          if (emptyMsg) {
            emptyMsg.style.display = "block";
            emptyMsg.innerHTML = `
              <div style="background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 32px; text-align: center; color: var(--text-muted); max-width: 480px; margin: 40px auto;">
                <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; color: var(--text);">No hay ningún grupo seleccionado</p>
                <p style="font-size: 0.85rem; margin-bottom: 16px;">Selecciona o crea un grupo desde la cabecera para acceder al cuaderno.</p>
              </div>
            `;
          }
          if (containerTabla) containerTabla.style.display = "none";
          return;
        }

        if (!this.grupoActivo.evaluaciones) {
          this.grupoActivo.evaluaciones = {
            eval1: { actividades: [], calificaciones: {}, observaciones: {} },
            eval2: { actividades: [], calificaciones: {}, observaciones: {} },
            eval3: { actividades: [], calificaciones: {}, observaciones: {} },
            final: { actividades: [], calificaciones: {}, observaciones: {} }
          };
        }

        const prevScrollLeft = containerTabla ? containerTabla.scrollLeft : 0;
        const prevScrollTop = containerTabla ? containerTabla.scrollTop : 0;
        const prevWindowX = window.scrollX || window.pageXOffset || 0;
        const prevWindowY = window.scrollY || window.pageYOffset || 0;

        if (!this.seccionesPlegadas && this.grupoActivo && this.grupoActivo.secciones) {
          this.seccionesPlegadas = new Set();
          this.grupoActivo.secciones.forEach(sec => {
            if (!this.seccionTieneEvaluaciones(sec.id)) {
              this.seccionesPlegadas.add(sec.id);
            }
          });
        }

        const thead = document.getElementById("tablaCuadernoHead");
        const tbody = document.getElementById("tablaCuadernoBody");

        if (thead) thead.innerHTML = "";
        if (tbody) tbody.innerHTML = "";
        if (containerTabla) containerTabla.style.display = "block";

        if (this.evaluacionActiva === "final") {
          this.cambiarEvaluacion("eval1");
          return;
        }

        const evalData = (this.grupoActivo.evaluaciones && this.grupoActivo.evaluaciones[this.evaluacionActiva]) || { actividades: [], calificaciones: {} };
        if (emptyMsg) emptyMsg.style.display = "none";

        // Comprobar si hay actividades ocultas en esta evaluación
        const totalOcultas = (evalData.actividades || []).filter(a => a.oculta).length;
        const btnOcultas = document.getElementById("btnToggleOcultas");
        if (btnOcultas) {
          if (totalOcultas > 0) {
            btnOcultas.style.display = "inline-flex";
            btnOcultas.textContent = this.mostrarOcultas ? "👁️ Ocultar no visibles" : `👁️ Ver ocultas (${totalOcultas})`;
          } else {
            btnOcultas.style.display = "none";
          }
        }

        this.actualizarBarraSeleccion();

        // Fila 1 cabecera: Columna N.º (Fija) + Columna Alumnos (Superior) + Todas las Secciones propuestas
        const trSec = document.createElement("tr");
        trSec.id = "trSeccionesHeader";

        const thNum1 = document.createElement("th");
        thNum1.className = "th-num-sticky";
        thNum1.textContent = "";
        trSec.appendChild(thNum1);

        const thAlu1 = document.createElement("th");
        thAlu1.id = "thAlu1";
        thAlu1.style.position = "sticky";
        thAlu1.style.top = "0";
        thAlu1.style.zIndex = "28";
        thAlu1.style.background = "#f8fafc";
        thAlu1.style.padding = "6px 8px";
        thAlu1.style.verticalAlign = "middle";
        this.aplicarAnchoColumna(thAlu1, "col-alumnos", "200px");

        const numAlumnos = this.grupoActivo.alumnos ? this.grupoActivo.alumnos.length : 0;

        thAlu1.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 4px; justify-content: center; width: 100%;">
            <div style="display: flex; justify-content: center; align-items: center; gap: 4px; flex-wrap: wrap;">
              <button class="btn btn-secondary btn-xs" onclick="app.plegarTodasSecciones()" title="Plegar todas las secciones" style="font-size: 0.7rem; padding: 2px 6px; white-space: nowrap;">
                📁 Plegar
              </button>
              <button class="btn btn-secondary btn-xs" onclick="app.desplegarTodasSecciones()" title="Desplegar todas las secciones" style="font-size: 0.7rem; padding: 2px 6px; white-space: nowrap;">
                📂 Desplegar
              </button>
            </div>
          </div>
        `;

        const resizerAlu = document.createElement("div");
        resizerAlu.className = "col-resizer";
        resizerAlu.title = "Arrastra para ajustar el ancho de la columna de alumnos";
        resizerAlu.onmousedown = (e) => this.iniciarResizeColumna(e, thAlu1, "col-alumnos");
        thAlu1.appendChild(resizerAlu);
        trSec.appendChild(thAlu1);

        const secciones = this.grupoActivo.secciones || [];
        let actividades = [];

        if (this.filtroDiarioActividadesIds && Array.isArray(this.filtroDiarioActividadesIds) && this.filtroDiarioActividadesIds.length > 0) {
          Object.keys(this.grupoActivo.evaluaciones || {}).forEach(evKey => {
            const evObj = this.grupoActivo.evaluaciones[evKey];
            if (evObj && evObj.actividades) {
              evObj.actividades.forEach(a => {
                if (this.filtroDiarioActividadesIds.includes(a.id)) {
                  actividades.push({ ...a, _evKey: evKey });
                }
              });
            }
          });
        } else {
          actividades = evalData.actividades || [];
        }

        let seccionesVisibles = secciones;

        const getSecActs = (secId) => {
          return actividades.filter(a => {
            if (!this.mostrarOcultas && a.oculta) return false;
            if (a.seccionId !== secId) return false;
            if (this.filtroDiarioActividadesIds && Array.isArray(this.filtroDiarioActividadesIds)) {
              if (!this.filtroDiarioActividadesIds.includes(a.id)) return false;
            }
            if (this.filtroRubricaActividadesIds && this.filtroRubricaActividadesIds instanceof Set && this.filtroRubricaActividadesIds.size > 0) {
              if (!this.filtroRubricaActividadesIds.has(a.id)) return false;
            }
            return true;
          });
        };

        // Si hay un filtro de columnas seleccionado desde el Diario o Rúbrica, filtrar seccionesVisibles para que SOLO se muestren las secciones con actividades coincidentes
        if (this.filtroDiarioActividadesIds && Array.isArray(this.filtroDiarioActividadesIds) && this.filtroDiarioActividadesIds.length > 0) {
          seccionesVisibles = seccionesVisibles.filter(sec => getSecActs(sec.id).length > 0);
        } else if (this.filtroRubricaActividadesIds && this.filtroRubricaActividadesIds instanceof Set && this.filtroRubricaActividadesIds.size > 0) {
          seccionesVisibles = seccionesVisibles.filter(sec => getSecActs(sec.id).length > 0);
        }

        const btnLimpiarDiario = document.getElementById("btnLimpiarFiltroDiario");
        if (btnLimpiarDiario) {
          btnLimpiarDiario.style.display = (this.filtroDiarioActividadesIds && this.filtroDiarioActividadesIds.length > 0) ? "inline-flex" : "none";
        }

        const btnLimpiarRubrica = document.getElementById("btnLimpiarFiltroRubrica");
        if (btnLimpiarRubrica) {
          btnLimpiarRubrica.style.display = (this.filtroRubricaActividadesIds && this.filtroRubricaActividadesIds.size > 0) ? "inline-flex" : "none";
        }

        // Filtro por número o criterio de sección si estuviera activo
        const numFiltroRaw = (this.filtroSeccionNumero || "").trim();
        if (numFiltroRaw) {
          const fLower = numFiltroRaw.toLowerCase();
          seccionesVisibles = seccionesVisibles.filter((sec, secIdx) => {
            const numCrit = String(this.obtenerNumeroCriterioSeccion(sec, secIdx) || "").toLowerCase();
            const numSec = String(this.obtenerNumeroSeccion(sec, secIdx) || "");
            const nomSec = (sec.nombre || "").toLowerCase();
            return numCrit.includes(fLower) || numSec.includes(fLower) || nomSec.includes(fLower);
          });
        }

        // Cada sección propuesta en Configuración aparece siempre en las evaluaciones 1, 2 y 3
        if (seccionesVisibles.length === 0) {
          const thNoSec = document.createElement("th");
          thNoSec.style.padding = "10px";
          thNoSec.style.textAlign = "center";
          thNoSec.style.color = "#dc2626";
          thNoSec.style.background = "#fef2f2";
          thNoSec.style.fontSize = "0.85rem";
          if (numFiltroRaw) {
            thNoSec.textContent = `No hay secciones coincidentes con "${numFiltroRaw}"`;
          } else if (this.filtroDiarioActividadesIds && this.filtroDiarioActividadesIds.length > 0) {
            thNoSec.textContent = "No hay secciones con actividades coincidentes con el filtro del Diario.";
          } else {
            thNoSec.textContent = "No hay secciones disponibles en esta evaluación.";
          }
          trSec.appendChild(thNoSec);
        } else {
          seccionesVisibles.forEach((sec, secIdx) => {
            const secActs = getSecActs(sec.id);
            const esPlegada = this.seccionesPlegadas && this.seccionesPlegadas.has(sec.id);
            const span = (esPlegada || secActs.length === 0) ? 1 : (1 + secActs.length);

            const bgIntenso = this.obtenerColorIntensificado(sec.color, sec.ponderacion);
            const textColor = (Number(sec.ponderacion) || 0) < 40 ? "#0f172a" : "#ffffff";

            const thSec = document.createElement("th");
            thSec.colSpan = span;
            thSec.className = "sec-group-th" + (esPlegada ? " sec-th-plegada" : "");
            thSec.style.backgroundColor = bgIntenso;
            thSec.style.color = textColor;
            thSec.style.position = "sticky";
            thSec.style.top = "0";
            thSec.style.zIndex = "28";

            if (esPlegada) {
              const numCriterio = this.obtenerNumeroCriterioSeccion(sec, secIdx);
              const secNombreEscaped = this.escapeHtml(sec.nombre);
              this.aplicarAnchoColumna(thSec, `sec-plegada-${sec.id}`, "56px");
              thSec.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; padding: 2px 0;">
                  <span style="font-weight: 800; font-size: 0.76rem; line-height: 1.15; color: ${textColor}; text-align: center; white-space: normal; word-break: break-word;" title="${secNombreEscaped} (Criterio: ${numCriterio})">
                    ${numCriterio}
                  </span>
                  <button class="btn-sec-fold-icon" onclick="app.toggleSeccionPlegada('${sec.id}')" title="Desplegar sección ${secNombreEscaped}">
                    📂
                  </button>
                </div>
              `;
              const resizerSec = document.createElement("div");
              resizerSec.className = "col-resizer";
              resizerSec.title = "Arrastra para ajustar el ancho de la sección plegada";
              resizerSec.onmousedown = (e) => this.iniciarResizeColumna(e, thSec, `sec-plegada-${sec.id}`);
              thSec.appendChild(resizerSec);
            } else if (secActs.length === 0) {
              const secNombreEscaped = this.escapeHtml(sec.nombre);
              this.aplicarAnchoColumna(thSec, `sec-empty-${sec.id}`, "168px");
              thSec.innerHTML = `
                <div class="sec-header-content">
                  <div class="sec-title-wrap" title="${secNombreEscaped}" style="color: ${textColor};">
                    ${secNombreEscaped}
                  </div>
                  <div class="sec-weight-badge" title="Ponderación calculada automáticamente según criterios" style="background: rgba(255,255,255,0.25); color: ${textColor};">${sec.ponderacion}%</div>
                  <div style="display: flex; gap: 4px; align-items: center;">
                    <button class="btn-sec-fold" onclick="app.toggleSeccionPlegada('${sec.id}')" title="Plegar sección">
                      📁 Plegar
                    </button>
                    <button class="btn-sec-add-act" onclick="app.abrirModalNuevaActividad('${sec.id}')" title="Crear nueva actividad en ${secNombreEscaped}">
                      <span class="big-plus">+</span> Nueva actividad
                    </button>
                  </div>
                </div>
              `;
              const resizerSec = document.createElement("div");
              resizerSec.className = "col-resizer";
              resizerSec.title = "Arrastra para ajustar el ancho de la sección";
              resizerSec.onmousedown = (e) => this.iniciarResizeColumna(e, thSec, `sec-empty-${sec.id}`);
              thSec.appendChild(resizerSec);
            } else {
              const secNombreEscaped = this.escapeHtml(sec.nombre);
              thSec.innerHTML = `
                <div class="sec-header-content">
                  <div class="sec-title-wrap" title="${secNombreEscaped}" style="color: ${textColor};">
                    ${secNombreEscaped}
                  </div>
                  <div class="sec-weight-badge" title="Ponderación calculada automáticamente según criterios" style="background: rgba(255,255,255,0.25); color: ${textColor};">${sec.ponderacion}%</div>
                  <div style="display: flex; gap: 4px; align-items: center;">
                    <button class="btn-sec-fold" onclick="app.toggleSeccionPlegada('${sec.id}')" title="Plegar sección">
                      📁 Plegar
                    </button>
                    <button class="btn-sec-add-act" onclick="app.abrirModalNuevaActividad('${sec.id}')" title="Crear nueva actividad en ${secNombreEscaped}">
                      <span class="big-plus">+</span> Nueva actividad
                    </button>
                  </div>
                </div>
              `;
              const resizerSec = document.createElement("div");
              resizerSec.className = "col-resizer";
              resizerSec.title = "Arrastra para ajustar el ancho de toda la sección";
              resizerSec.onmousedown = (e) => this.iniciarResizeColumna(e, thSec, `sec-group-${sec.id}`);
              thSec.appendChild(resizerSec);
            }
            trSec.appendChild(thSec);
          });
        }
        thead.appendChild(trSec);

        // Fila 2 cabecera: Columna N.º (Fija) + Columna Alumnos (Inferior) + Actividades individuales o celda de sección plegada / vacía
        const trAct = document.createElement("tr");
        trAct.id = "trActividadesHeader";

        const thNum2 = document.createElement("th");
        thNum2.id = "thNum2";
        thNum2.className = "th-num-sticky";
        thNum2.innerHTML = `
          <div class="th-num-diagonal-wrap" title="Haz clic en el N.º de cualquier alumno para ver o registrar sus sanciones (indicado por el cuadrado naranja 🟧)">
            <div class="num-top-left">N.º</div>
            <div class="badge-bottom-right">🟧</div>
          </div>
        `;
        trAct.appendChild(thNum2);

        const thAlu2 = document.createElement("th");
        thAlu2.id = "thAlu2";
        thAlu2.style.position = "sticky";
        thAlu2.style.zIndex = "26";
        thAlu2.style.background = "#f8fafc";
        thAlu2.style.padding = "6px 8px";
        thAlu2.style.verticalAlign = "middle";
        this.aplicarAnchoColumna(thAlu2, "col-alumnos", "200px");

        thAlu2.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; justify-content: center; width: 100%;">
            <div style="font-weight: 700; color: #1e293b; font-size: 0.82rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
              Alumnos (${numAlumnos})
            </div>
            <button class="btn-alumno-aleatorio" onclick="app.seleccionarAlumnoAleatorio()" title="Seleccionar alumno al azar" style="font-size: 0.72rem; padding: 2px 6px; white-space: nowrap;">
              🎲 Alumno aleatorio
            </button>
          </div>
        `;
        const resizerAlu2 = document.createElement("div");
        resizerAlu2.className = "col-resizer";
        resizerAlu2.title = "Arrastra para ajustar el ancho de la columna de alumnos";
        resizerAlu2.onmousedown = (e) => this.iniciarResizeColumna(e, thAlu2, "col-alumnos");
        thAlu2.appendChild(resizerAlu2);
        trAct.appendChild(thAlu2);

        if (seccionesVisibles.length === 0) {
          const thNoAct = document.createElement("th");
          thNoAct.style.padding = "8px";
          thNoAct.style.background = "#fef2f2";
          trAct.appendChild(thNoAct);
        } else {
          seccionesVisibles.forEach((sec, secIdx) => {
            const secActs = getSecActs(sec.id);
            const esPlegada = this.seccionesPlegadas && this.seccionesPlegadas.has(sec.id);
            const bgIntenso = this.obtenerColorIntensificado(sec.color, sec.ponderacion);

            if (esPlegada) {
              const thPlegada = document.createElement("th");
              thPlegada.className = "act-header-th sec-empty-th sec-th-plegada";
              thPlegada.style.borderTop = `4px solid ${bgIntenso}`;
              this.aplicarAnchoColumna(thPlegada, `sec-plegada-${sec.id}`, "56px");

              const resizer = document.createElement("div");
              resizer.className = "col-resizer";
              resizer.title = "Arrastra para ajustar el ancho";
              resizer.onmousedown = (e) => this.iniciarResizeColumna(e, thPlegada, `sec-plegada-${sec.id}`);
              thPlegada.appendChild(resizer);

              const numCriterio = this.obtenerNumeroCriterioSeccion(sec, secIdx);

              const secNombreEscaped = this.escapeHtml(sec.nombre);
              thPlegada.innerHTML += `
                <div style="font-size: 0.76rem; font-weight: 800; color: #475569; text-align: center; white-space: normal; word-break: break-word;" title="${secNombreEscaped} (Criterio: ${numCriterio})">${numCriterio}</div>
              `;
              trAct.appendChild(thPlegada);
            } else if (secActs.length > 0) {
              const thSecMedia = document.createElement("th");
              thSecMedia.className = "act-header-th sec-media-header-th";
              thSecMedia.style.borderTop = `4px solid ${bgIntenso}`;
              thSecMedia.style.background = "#f8fafc";
              thSecMedia.style.verticalAlign = "middle";
              this.aplicarAnchoColumna(thSecMedia, `sec-media-${sec.id}`, "88px");

              const resizerMedia = document.createElement("div");
              resizerMedia.className = "col-resizer";
              resizerMedia.title = "Arrastra para ajustar el ancho de la media de sección";
              resizerMedia.onmousedown = (e) => this.iniciarResizeColumna(e, thSecMedia, `sec-media-${sec.id}`);
              thSecMedia.appendChild(resizerMedia);

              const secNombreEscaped = this.escapeHtml(sec.nombre);
              thSecMedia.innerHTML += `
                <div style="font-size: 0.76rem; font-weight: 800; color: #1e293b; text-align: center; display: flex; flex-direction: column; gap: 2px; align-items: center; justify-content: center; padding: 2px 0;">
                  <span title="Media ponderada de la sección ${secNombreEscaped}">📊 Media</span>
                  <span class="badge" style="background: #e2e8f0; color: #334155; font-size: 0.68rem; padding: 1px 4px;">${sec.ponderacion}%</span>
                </div>
              `;
              trAct.appendChild(thSecMedia);

              secActs.forEach(act => {
                const th = document.createElement("th");
                const isSelected = this.actividadesSeleccionadas.has(act.id);
                th.className = "act-header-th" + (isSelected ? " act-selected" : "");
                th.style.borderTop = `4px solid ${bgIntenso}`;
                this.aplicarAnchoColumna(th, `act-${act.id}`, "168px");

                const resizer = document.createElement("div");
                resizer.className = "col-resizer";
                resizer.title = "Arrastra para ajustar el ancho de la actividad";
                resizer.onmousedown = (e) => this.iniciarResizeColumna(e, th, `act-${act.id}`);
                th.appendChild(resizer);

                let metodoBadge = `<span class="badge">Numérica</span>`;
                if (act.metodo === "caritas") metodoBadge = `<span class="badge" style="background: #fef08a; color: #854d0e;">Caritas</span>`;
                if (act.metodo === "rubrica") metodoBadge = `<span class="badge" style="background: #e0e7ff; color: #3730a3;">📋 Rúbrica</span>`;

                const tipoNorm = this.getTipoActividad(act);
                let tipoBadgeHeader = `<span class="badge" style="background: #dbeafe; color: #1e40af; font-weight: 700;">Actividad</span>`;
                if (tipoNorm === "Examen") {
                  tipoBadgeHeader = `<span class="badge" style="background: #fce7f3; color: #9d174d; font-weight: 700;">Examen</span>`;
                } else if (tipoNorm === "Trabajo") {
                  tipoBadgeHeader = `<span class="badge" style="background: #ffedd5; color: #9a3412; font-weight: 700;">Trabajo</span>`;
                }

                const critStr = (act.criterios && act.criterios.length > 0) ? act.criterios.join(", ") : "Sin criterio";
                const ocultaTag = act.oculta ? `<span class="badge" style="background: #fee2e2; color: #991b1b; font-size: 0.68rem;">Oculta</span>` : "";
                const fechaRaw = act.fechaCreacion || act.fecha || "";
                const fechaDisplay = this.formatearFecha(fechaRaw);
                const actNombreEscaped = this.escapeHtml(act.nombre);

                th.innerHTML += `
                  <div class="act-title">
                    <div style="display: flex; align-items: center; gap: 4px; overflow: hidden;">
                      <button class="btn-act-select ${isSelected ? 'selected' : ''}" onclick="app.toggleSeleccionActividad('${act.id}', event)" title="${isSelected ? 'Deseleccionar actividad' : 'Seleccionar actividad'}">
                        ${isSelected ? '✓' : '☐'}
                      </button>
                      <span title="${actNombreEscaped}" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${actNombreEscaped}</span>
                    </div>
                    <button class="gear-btn" onclick="app.abrirMenuActividad(event, '${act.id}', '${act.seccionId}')" title="Ajustes de la actividad">⚙️</button>
                  </div>
                  <div class="act-meta">
                    <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
                      <button class="badge badge-modo-clickable" onclick="app.cambiarModoActividadRapido('${act.id}')" title="Haz clic para alternar modo de calificación">
                        ${metodoBadge}
                      </button>
                      ${tipoBadgeHeader}
                      ${ocultaTag}
                    </div>
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px; font-size: 0.72rem; color: #475569; margin-top: 2px;">
                      <div title="Criterios evaluados: ${critStr}" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; text-align: left;">
                        🎯 ${critStr}
                      </div>
                      ${fechaDisplay ? `
                        <div title="Fecha de realización: ${fechaDisplay}" style="white-space: nowrap; font-size: 0.69rem; color: #475569; font-weight: 600; display: inline-flex; align-items: center; gap: 2px; padding: 1px 4px; background: #f8fafc; border-radius: 4px; border: 1px solid #e2e8f0;">
                          <span>📅</span><span>${fechaDisplay}</span>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `;
                trAct.appendChild(th);
              });
            } else {
              // Sección sin actividades en esta evaluación -> mostrar número y descripción de sus criterios
              const thEmpty = document.createElement("th");
              thEmpty.className = "act-header-th sec-empty-th";
              thEmpty.style.borderTop = `3px solid ${sec.color}`;
              this.aplicarAnchoColumna(thEmpty, `sec-empty-${sec.id}`, "168px");

              const resizer = document.createElement("div");
              resizer.className = "col-resizer";
              resizer.title = "Arrastra para ajustar el ancho";
              resizer.onmousedown = (e) => this.iniciarResizeColumna(e, thEmpty, `sec-empty-${sec.id}`);
              thEmpty.appendChild(resizer);

              let critListHtml = "";
              if (sec.criterios && sec.criterios.length > 0) {
                critListHtml = sec.criterios.map(cod => {
                  const cObj = (this.grupoActivo.criterios || []).find(c => String(c.codigo) === String(cod));
                  const desc = cObj ? cObj.descripcion : "";
                  return `<div style="line-height: 1.25; margin-bottom: 4px;" title="Criterio ${cod}: ${desc}">
                    <span style="font-weight: 700; color: #1e293b; background: #e2e8f0; padding: 1px 4px; border-radius: 3px; font-size: 0.7rem; display: inline-block;">CE ${cod}</span>
                    <span style="font-size: 0.72rem; color: #475569; display: inline;"> ${desc}</span>
                  </div>`;
                }).join("");
              } else {
                critListHtml = `<div style="font-size: 0.72rem; color: #94a3b8; font-style: italic;">Sin criterios asignados</div>`;
              }

              thEmpty.innerHTML += `
                <div style="padding: 4px 6px; text-align: left; display: flex; flex-direction: column; gap: 2px;">
                  ${critListHtml}
                </div>
              `;
              trAct.appendChild(thEmpty);
            }
          });
        }
        thead.appendChild(trAct);

        // Bloqueo dinámico de encabezados de actividades: calcula la altura real de trSec para fijar trAct justo debajo
        requestAnimationFrame(() => {
          const hSec = trSec.offsetHeight || 66;
          const tableHead = document.getElementById("tablaCuadernoHead");
          if (tableHead) tableHead.style.setProperty("--h-sec", `${hSec}px`);

          trAct.querySelectorAll("th").forEach(th => {
            th.style.position = "sticky";
            th.style.top = `${hSec}px`;
            if (th.classList.contains("th-num-sticky")) {
              th.style.zIndex = "55";
            } else {
              th.style.zIndex = "26";
            }
            th.style.background = "#f8fafc";
          });

          const container = document.getElementById("cuadernoTableContainer");
          if (container && !container.dataset.scrollListenerAttached) {
            container.dataset.scrollListenerAttached = "true";
            container.addEventListener("scroll", () => {
              if (this.vistaActiva === "cuaderno") {
                if (container.scrollTop > 20) {
                  document.body.classList.add("scrolled-actividades");
                } else {
                  document.body.classList.remove("scrolled-actividades", "header-revealed");
                  if (this.topMenuTimer) {
                    clearTimeout(this.topMenuTimer);
                    this.topMenuTimer = null;
                  }
                }
              }
            }, { passive: true });
          }
        });

        // Filas de Alumnos y Calificaciones
        const alumnos = (this.grupoActivo.alumnos || []).slice().sort((a,b) => a.orden - b.orden);
        const califs = evalData.calificaciones || {};

        alumnos.forEach((alu, index) => {
          const tr = document.createElement("tr");
          tr.id = `row-alumno-${alu.id}`;
          if (this.alumnoCuadernoSeleccionadoId === alu.id) {
            tr.classList.add("row-alumno-selected");
          }

          // Al hacer clic en cualquier celda o lugar de la fila, se selecciona el alumno y se colorea toda la fila en amarillo
          tr.onclick = (e) => {
            this.seleccionarAlumnoCuaderno(alu.id);
          };

          // 1. Columna Número Fija (sticky left) - Clic abre la ventana de sanciones
          const tdNum = document.createElement("td");
          tdNum.className = "td-num-sticky";
          tdNum.title = `N.º ${index + 1}: Haz clic aquí para ver/registrar sanciones o conducta de ${this.escapeHtml(alu.nombre)}`;
          tdNum.textContent = `${index + 1}.`;
          tdNum.onclick = (e) => {
            e.stopPropagation();
            this.seleccionarAlumnoCuaderno(alu.id);
            this.abrirIncidenciasAlumnoModal(alu.id);
          };
          tr.appendChild(tdNum);

          // 2. Columna Nombre Alumno (Desaparece al hacer scroll horizontal) - Clic solo selecciona al alumno
          const tdAlu = document.createElement("td");
          tdAlu.className = "td-alu-nombre";
          tdAlu.title = `${index + 1}. ${alu.nombre}`;
          
          const premiosAlu = this.obtenerPremiosAlumno(alu.id);
          let badgesHtml = "";
          if (premiosAlu && premiosAlu.length > 0) {
            premiosAlu.forEach(p => {
              const icon = p.tipo === "premio" ? "🏆" : "⚠️";
              const bg = p.tipo === "premio" ? "#dcfce7" : "#fee2e2";
              const col = p.tipo === "premio" ? "#166534" : "#991b1b";
              const titleText = this.escapeHtml(p.mensaje);
              badgesHtml += `<span onclick="event.stopPropagation(); app.verPremiosAlumnoModal('${alu.id}')" title="${titleText}" style="cursor: pointer; font-size: 0.78rem; background: ${bg}; color: ${col}; padding: 1px 5px; border-radius: 10px; margin-left: 2px; font-weight: 800; border: 1px solid ${p.tipo === 'premio' ? '#86efac' : '#fca5a5'}; flex-shrink: 0;">${icon}</span>`;
            });
          }

          const compBadgeHtml = this.obtenerBadgeComportamientoHtml(alu.id);

          tdAlu.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 6px;">
              <span class="alu-nombre-text" title="Haz clic para seleccionar a ${this.escapeHtml(alu.nombre)}">${this.escapeHtml(alu.nombre)}</span>
              <div style="display: flex; gap: 3px; flex-shrink: 0; align-items: center;">
                ${compBadgeHtml}
                ${badgesHtml}
              </div>
            </div>
          `;
          this.aplicarAnchoColumna(tdAlu, "col-alumnos", "200px");
          tr.appendChild(tdAlu);

          if (seccionesVisibles.length === 0) {
            const tdEmpty = document.createElement("td");
            tdEmpty.style.background = "#fafafa";
            tdEmpty.style.textAlign = "center";
            tdEmpty.style.color = "#cbd5e1";
            tdEmpty.textContent = "—";
            tr.appendChild(tdEmpty);
          } else {
            seccionesVisibles.forEach(sec => {
              const secActs = getSecActs(sec.id);
              const esPlegada = this.seccionesPlegadas && this.seccionesPlegadas.has(sec.id);

              if (esPlegada) {
                const tdPlegada = document.createElement("td");
                tdPlegada.className = "sec-th-plegada";
                tdPlegada.style.textAlign = "center";
                tdPlegada.style.verticalAlign = "middle";
                tdPlegada.style.background = "#f8fafc";
                tdPlegada.style.cursor = "pointer";
                tdPlegada.onclick = () => this.toggleSeccionPlegada(sec.id);
                this.aplicarAnchoColumna(tdPlegada, `sec-plegada-${sec.id}`, "56px");
                
                const notasValidas = [];
                secActs.forEach(act => {
                  const evKeyAct = act._evKey || this.evaluacionActiva;
                  const evalObjAct = (this.grupoActivo.evaluaciones && this.grupoActivo.evaluaciones[evKeyAct]) ? this.grupoActivo.evaluaciones[evKeyAct] : evalData;
                  const califsAct = evalObjAct.calificaciones || {};
                  const nota = califsAct[act.id] ? califsAct[act.id][alu.id] : undefined;
                  if (nota !== undefined && nota !== null && nota !== "" && !isNaN(nota)) {
                    notasValidas.push(Number(nota));
                  }
                });

                if (notasValidas.length > 0) {
                  const mediaSec = notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length;
                  const colorCls = this.obtenerClaseColorNota(mediaSec);
                  tdPlegada.innerHTML = `<span class="grade-badge ${colorCls}" style="font-weight: 800; font-size: 0.84rem; padding: 2px 6px; border-radius: 4px; border: 1px solid; display: inline-block;" title="Media de ${notasValidas.length} actividades en ${sec.nombre}">${mediaSec.toFixed(1)}</span>`;
                } else {
                  tdPlegada.innerHTML = `<span style="color: #cbd5e1; font-weight: 600;">—</span>`;
                }
                tr.appendChild(tdPlegada);
              } else if (secActs.length > 0) {
                const tdSecMedia = document.createElement("td");
                tdSecMedia.className = "td-sec-media";
                tdSecMedia.style.textAlign = "center";
                tdSecMedia.style.verticalAlign = "middle";
                tdSecMedia.style.background = "#f8fafc";
                this.aplicarAnchoColumna(tdSecMedia, `sec-media-${sec.id}`, "88px");

                const allSecActs = (evalData.actividades || []).filter(a => a.seccionId === sec.id && (!a.oculta || this.mostrarOcultas));
                const notasValidas = [];
                allSecActs.forEach(act => {
                  const evKeyAct = act._evKey || this.evaluacionActiva;
                  const evalObjAct = (this.grupoActivo.evaluaciones && this.grupoActivo.evaluaciones[evKeyAct]) ? this.grupoActivo.evaluaciones[evKeyAct] : evalData;
                  const califsAct = evalObjAct.calificaciones || {};
                  const nota = califsAct[act.id] ? califsAct[act.id][alu.id] : undefined;
                  if (nota !== undefined && nota !== null && nota !== "" && !isNaN(nota)) {
                    notasValidas.push(Number(nota));
                  }
                });

                if (notasValidas.length > 0) {
                  const mediaSec = notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length;
                  const colorCls = this.obtenerClaseColorNota(mediaSec);
                  tdSecMedia.innerHTML = `<span class="grade-badge ${colorCls}" style="font-weight: 800; font-size: 0.84rem; padding: 2px 6px; border-radius: 4px; border: 1px solid; display: inline-block;" title="Media de ${notasValidas.length} actividades evaluadas en ${sec.nombre}">${mediaSec.toFixed(1)}</span>`;
                } else {
                  tdSecMedia.innerHTML = `<span style="color: #cbd5e1; font-weight: 600;">—</span>`;
                }
                tr.appendChild(tdSecMedia);

                secActs.forEach(act => {
                  const td = document.createElement("td");
                  this.aplicarAnchoColumna(td, `act-${act.id}`, "168px");
                  const evKeyAct = act._evKey || this.evaluacionActiva;
                  const evalObjAct = (this.grupoActivo.evaluaciones && this.grupoActivo.evaluaciones[evKeyAct]) ? this.grupoActivo.evaluaciones[evKeyAct] : evalData;
                  const califsAct = evalObjAct.calificaciones || {};
                  const nota = califsAct[act.id] ? califsAct[act.id][alu.id] : undefined;
                  td.appendChild(this.crearControlCalificacion(act, alu, nota));
                  tr.appendChild(td);
                });
              } else {
                const tdEmpty = document.createElement("td");
                tdEmpty.className = "td-sec-empty";
                this.aplicarAnchoColumna(tdEmpty, `sec-empty-${sec.id}`, "168px");
                tdEmpty.innerHTML = `<span style="color: #cbd5e1; font-weight: 600;">—</span>`;
                tr.appendChild(tdEmpty);
              }
            });
          }

          tbody.appendChild(tr);
        });

        if (containerTabla) {
          containerTabla.scrollLeft = prevScrollLeft;
          containerTabla.scrollTop = prevScrollTop;
        }
        window.scrollTo(prevWindowX, prevWindowY);

        if (this.nextFocusCell) {
          const target = this.nextFocusCell;
          this.nextFocusCell = null;
          requestAnimationFrame(() => {
            const el = document.querySelector(`input[data-act-id="${target.actId}"][data-alu-id="${target.aluId}"]`);
            if (el) {
              this.seleccionarAlumnoCuaderno(target.aluId);
              if (typeof el.focus === "function") {
                el.focus({ preventScroll: true });
              }
              if (typeof el.select === "function") el.select();
              if (containerTabla) {
                containerTabla.scrollLeft = prevScrollLeft;
                containerTabla.scrollTop = prevScrollTop;
              }
              window.scrollTo(prevWindowX, prevWindowY);
            }
          });
        }

        this.actualizarUIModoAlumnoAleatorio();
      }

      // --- MÉTODOS DE FILTRADO HORIZONTAL DE SECCIÓN ---
      obtenerNumeroCriterioSeccion(sec, idx) {
        if (!sec) return String(idx + 1);
        if (sec.criterios && Array.isArray(sec.criterios) && sec.criterios.length > 0) {
          return sec.criterios.join(", ");
        }
        const matchCrit = (sec.nombre || "").match(/criterio\s*([\d\.]+)/i);
        if (matchCrit) return matchCrit[1];
        const matchNum = (sec.nombre || "").match(/^(\d+(\.\d+)?)/);
        if (matchNum) return matchNum[1];
        return String(this.obtenerNumeroSeccion(sec, idx));
      }

      obtenerNumeroSeccion(sec, idx) {
        if (!sec) return idx + 1;
        if (sec.id) {
          const match = sec.id.match(/\d+/);
          if (match) {
            return parseInt(match[0], 10);
          }
        }
        return idx + 1;
      }

      filtrarSeccionPorNumero(valor) {
        this.filtroSeccionNumero = (valor !== null && valor !== undefined) ? String(valor).trim() : "";
        this.renderizarCuaderno();
      }

      limpiarFiltroSeccion() {
        this.filtroSeccionNumero = "";
        const input = document.getElementById("inputFiltroSeccionNum");
        if (input) input.value = "";
        this.renderizarCuaderno();
      }

      filtrarActividadesPorFecha(valor) {
        this.filtroFechaActividades = (valor !== null && valor !== undefined) ? String(valor).trim() : "";
        this.renderizarCuaderno();
      }

      limpiarFiltroFecha() {
        this.filtroFechaActividades = "";
        const input = document.getElementById("inputFiltroFechaActividades");
        if (input) input.value = "";
        this.renderizarCuaderno();
      }

      filtrarResultadosPorAlumno(valor) {
        this.filtroAlumnoResultados = (valor !== null && valor !== undefined) ? String(valor).trim() : "";
        this.renderizarResultados();
      }

      limpiarFiltroAlumnoResultados() {
        this.filtroAlumnoResultados = "";
        const input = document.getElementById("inputFiltroAlumnoResultados");
        if (input) input.value = "";
        this.renderizarResultados();
      }

      // --- MÉTODOS DE SELECCIÓN Y GESTIÓN RÁPIDA DE ACTIVIDADES Y ALUMNOS ---
      seleccionarAlumnoCuaderno(aluId) {
        if (aluId === null || aluId === undefined) {
          this.alumnoCuadernoSeleccionadoId = null;
        } else {
          this.alumnoCuadernoSeleccionadoId = String(aluId);
        }

        const targetId = this.alumnoCuadernoSeleccionadoId;

        const tbodyCuaderno = document.getElementById("tablaCuadernoBody");
        if (tbodyCuaderno) {
          tbodyCuaderno.querySelectorAll("tr").forEach(tr => {
            if (targetId && tr.id === `row-alumno-${targetId}`) {
              tr.classList.add("row-alumno-selected");
            } else {
              tr.classList.remove("row-alumno-selected");
            }
          });
        }
        const tbodyResultados = document.getElementById("tablaResultadosBody");
        if (tbodyResultados) {
          tbodyResultados.querySelectorAll("tr").forEach(tr => {
            if (targetId && tr.id === `row-res-alumno-${targetId}`) {
              tr.classList.add("row-alumno-selected");
            } else {
              tr.classList.remove("row-alumno-selected");
            }
          });
        }
      }

      seleccionarAlumnoAleatorio() {
        this.toggleModoAlumnoAleatorio();
      }

      plegarTodasSecciones() {
        if (!this.grupoActivo || !this.grupoActivo.secciones) return;
        if (!this.seccionesPlegadas) this.seccionesPlegadas = new Set();
        this.grupoActivo.secciones.forEach(sec => this.seccionesPlegadas.add(sec.id));
        this.renderizarCuaderno();
      }

      desplegarTodasSecciones() {
        if (!this.seccionesPlegadas) this.seccionesPlegadas = new Set();
        this.seccionesPlegadas.clear();
        this.renderizarCuaderno();
      }

      toggleSeccionPlegada(secId) {
        if (!this.seccionesPlegadas) this.seccionesPlegadas = new Set();
        if (this.seccionesPlegadas.has(secId)) {
          this.seccionesPlegadas.delete(secId);
        } else {
          this.seccionesPlegadas.add(secId);
        }
        this.renderizarCuaderno();
      }

      seccionTieneEvaluaciones(secId, evalKey = null) {
        if (!this.grupoActivo) return false;
        const evKeyToUse = evalKey || this.evaluacionActiva || "eval1";
        const evalData = this.grupoActivo.evaluaciones ? this.grupoActivo.evaluaciones[evKeyToUse] : null;
        if (!evalData || !evalData.actividades || !evalData.calificaciones) return false;
        const secActs = evalData.actividades.filter(a => a.seccionId === secId);
        if (secActs.length === 0) return false;
        return secActs.some(act => {
          const c = evalData.calificaciones[act.id];
          if (!c) return false;
          return Object.values(c).some(v => v !== undefined && v !== null && v !== "" && !isNaN(v));
        });
      }

      desplegarSeccionPorActividad(actividadId) {
        if (!this.grupoActivo) return;
        if (!this.seccionesPlegadas) {
          this.seccionesPlegadas = new Set(this.grupoActivo.secciones ? this.grupoActivo.secciones.map(s => s.id) : []);
        }
        let secId = null;
        if (this.grupoActivo.evaluaciones) {
          for (const evKey of Object.keys(this.grupoActivo.evaluaciones)) {
            const ev = this.grupoActivo.evaluaciones[evKey];
            const found = (ev && ev.actividades) ? ev.actividades.find(a => a.id === actividadId) : null;
            if (found && found.seccionId) {
              secId = found.seccionId;
              break;
            }
          }
        }
        if (secId && this.seccionesPlegadas) {
          this.seccionesPlegadas.delete(secId);
        }
      }

      desplegarSeccionesPorRubrica(rubActs) {
        if (!rubActs || !Array.isArray(rubActs) || !this.grupoActivo) return;
        const targetActIds = new Set(rubActs.map(a => a.id));
        this.filtroRubricaActividadesIds = targetActIds;

        if (!this.seccionesPlegadas) {
          this.seccionesPlegadas = new Set(this.grupoActivo.secciones ? this.grupoActivo.secciones.map(s => s.id) : []);
        }
        rubActs.forEach(act => {
          if (act.seccionId && this.seccionesPlegadas) {
            this.seccionesPlegadas.delete(act.seccionId);
          }
        });
      }

      limpiarFiltroRubricaColumnas() {
        this.filtroRubricaActividadesIds = null;
        this.renderizarCuaderno();
        this.mostrarToast("📋 Mostrando todas las columnas del cuaderno.");
      }

      toggleSeleccionActividad(actId, event) {
        if (event) event.stopPropagation();
        if (this.actividadesSeleccionadas.has(actId)) {
          this.actividadesSeleccionadas.delete(actId);
        } else {
          this.actividadesSeleccionadas.add(actId);
        }
        this.actualizarBarraSeleccion();
        this.renderizarCuaderno();
      }

      deseleccionarTodasActividades() {
        this.actividadesSeleccionadas.clear();
        this.actualizarBarraSeleccion();
        this.renderizarCuaderno();
      }

      actualizarBarraSeleccion() {
        const barra = document.getElementById("barraAccionesActividades");
        const contador = document.getElementById("contadorSeleccionadas");
        if (!barra) return;

        if (this.actividadesSeleccionadas.size > 0) {
          barra.style.display = "flex";
          if (contador) contador.textContent = this.actividadesSeleccionadas.size;
        } else {
          barra.style.display = "none";
        }
      }

      solicitarEliminarActividadesSeleccionadas() {
        if (this.actividadesSeleccionadas.size === 0) return;
        const count = this.actividadesSeleccionadas.size;
        this.mostrarConfirmacion(
          `¿Deseas eliminar las <strong>${count} actividades</strong> seleccionadas?<br><br>Se borrarán también todas las calificaciones asociadas de forma permanente.`,
          () => {
            const evalData = this.grupoActivo.evaluaciones[this.evaluacionActiva];
            if (evalData && evalData.actividades) {
              this.actividadesSeleccionadas.forEach(actId => {
                evalData.actividades = evalData.actividades.filter(a => a.id !== actId);
                if (evalData.calificaciones && evalData.calificaciones[actId]) {
                  delete evalData.calificaciones[actId];
                }
              });
            }
            this.actividadesSeleccionadas.clear();
            this.guardarDatos();
            this.renderizarCuaderno();
            this.actualizarUI();
          }
        );
      }

      alternarOcultarActividadesSeleccionadas() {
        if (this.actividadesSeleccionadas.size === 0) return;
        const evalData = this.grupoActivo.evaluaciones[this.evaluacionActiva];
        if (!evalData || !evalData.actividades) return;

        this.actividadesSeleccionadas.forEach(actId => {
          const act = evalData.actividades.find(a => a.id === actId);
          if (act) {
            act.oculta = !act.oculta;
          }
        });

        this.actividadesSeleccionadas.clear();
        this.guardarDatos();
        this.renderizarCuaderno();
      }

      cambiarModoActividadesSeleccionadas(nuevoMetodo) {
        if (this.actividadesSeleccionadas.size === 0) return;
        const evalData = this.grupoActivo.evaluaciones[this.evaluacionActiva];
        if (!evalData || !evalData.actividades) return;

        this.actividadesSeleccionadas.forEach(actId => {
          const act = evalData.actividades.find(a => a.id === actId);
          if (act) {
            act.metodo = nuevoMetodo;
            if (nuevoMetodo === "rubrica" && !act.rubricaId && this.grupoActivo.rubricas && this.grupoActivo.rubricas.length > 0) {
              act.rubricaId = this.grupoActivo.rubricas[0].id;
            }
          }
        });

        this.guardarDatos();
        this.renderizarCuaderno();
      }

      cambiarModoActividadRapido(actId) {
        const evalData = this.grupoActivo.evaluaciones[this.evaluacionActiva];
        if (!evalData || !evalData.actividades) return;
        const act = evalData.actividades.find(a => a.id === actId);
        if (!act) return;

        const ordenModos = ["numerica", "caritas", "rubrica"];
        const curIdx = ordenModos.indexOf(act.metodo);
        const nextModo = ordenModos[(curIdx + 1) % ordenModos.length];
        act.metodo = nextModo;

        if (nextModo === "rubrica" && !act.rubricaId && this.grupoActivo.rubricas && this.grupoActivo.rubricas.length > 0) {
          act.rubricaId = this.grupoActivo.rubricas[0].id;
        }

        this.guardarDatos();
        this.renderizarCuaderno();
      }

      obtenerClaseColorNota(val) {
        if (val === undefined || val === null || val === "" || isNaN(Number(val))) return "";
        const n = Number(val);
        if (n < 3) return "grade-val-0";
        if (n < 5) return "grade-val-3";
        if (n < 6) return "grade-val-5";
        if (n < 8.5) return "grade-val-6";
        return "grade-val-10";
      }

      toggleMostrarOcultas() {
        this.mostrarOcultas = !this.mostrarOcultas;
        this.renderizarCuaderno();
      }

      crearControlCalificacion(act, alu, valor) {
        const wrap = document.createElement("div");

        // MÉTODO: SISTEMA DE CARITAS
        if (act.metodo === "caritas") {
          if (valor !== undefined && valor !== null && valor !== "") {
            // Ya calificado: mostrar solo la carita seleccionada con su puntuación (10, 5, 0)
            const v = Number(valor);
            let faceClass = "face-selected-10";
            let faceEmoji = "😁";
            if (v === 5) { faceClass = "face-selected-5"; faceEmoji = "😐"; }
            if (v === 0) { faceClass = "face-selected-0"; faceEmoji = "🙁"; }

            const selBtn = document.createElement("button");
            selBtn.className = faceClass;
            selBtn.title = "Haz clic para borrar la calificación";
            selBtn.innerHTML = `${faceEmoji} ${v}`;
            selBtn.onclick = (e) => {
              e.stopPropagation();
              this.seleccionarAlumnoCuaderno(alu.id);
              this.guardarCalificacion(act.id, alu.id, undefined);
            };
            wrap.appendChild(selBtn);
          } else {
            // Sin calificar: mostrar las 3 caritas (10, 5, 0)
            const box = document.createElement("div");
            box.className = "faces-container";

            const btn10 = document.createElement("button");
            btn10.className = "face-btn";
            btn10.title = "10 puntos";
            btn10.innerHTML = "😁 10";
            btn10.onclick = (e) => {
              e.stopPropagation();
              this.seleccionarAlumnoCuaderno(alu.id);
              this.guardarCalificacion(act.id, alu.id, 10);
            };

            const btn5 = document.createElement("button");
            btn5.className = "face-btn";
            btn5.title = "5 puntos";
            btn5.innerHTML = "😐 5";
            btn5.onclick = (e) => {
              e.stopPropagation();
              this.seleccionarAlumnoCuaderno(alu.id);
              this.guardarCalificacion(act.id, alu.id, 5);
            };

            const btn0 = document.createElement("button");
            btn0.className = "face-btn";
            btn0.title = "0 puntos";
            btn0.innerHTML = "🙁 0";
            btn0.onclick = (e) => {
              e.stopPropagation();
              this.seleccionarAlumnoCuaderno(alu.id);
              this.guardarCalificacion(act.id, alu.id, 0);
            };

            box.appendChild(btn10);
            box.appendChild(btn5);
            box.appendChild(btn0);
            wrap.appendChild(box);
          }
          return wrap;
        }

        // MÉTODO: RÚBRICA
        if (act.metodo === "rubrica") {
          const btn = document.createElement("button");
          if (valor !== undefined && valor !== null && valor !== "") {
            const num = Number(valor).toFixed(1);
            const colorClass = this.obtenerClaseColorNota(valor);
            btn.className = `rubric-btn ${colorClass}`;
            btn.innerHTML = `📋 <strong>${num}</strong>/10`;
            btn.title = `Evaluado con rúbrica: ${num}/10 (Haz clic para modificar)`;
          } else {
            // Botón evaluar unevaluated: cuadrado con únicamente el icono
            btn.className = "rubric-btn rubric-btn-square";
            btn.title = "Evaluar con rúbrica";
            btn.innerHTML = `📋`;
          }
          btn.onclick = (e) => {
            e.stopPropagation();
            this.seleccionarAlumnoCuaderno(alu.id);
            this.abrirCalificarRubrica(act, alu);
          };
          wrap.appendChild(btn);
          return wrap;
        }

        // MÉTODO: CALIFICACIÓN NUMÉRICA
        const input = document.createElement("input");
        input.type = "number";
        input.step = "0.1";
        input.min = "0";
        input.max = "10";
        input.className = "grade-input";
        input.dataset.actId = act.id;
        input.dataset.aluId = alu.id;

        const updateInputColor = () => {
          const v = input.value;
          input.classList.remove("grade-val-0", "grade-val-3", "grade-val-5", "grade-val-6", "grade-val-10", "grade-low");
          if (v !== "" && !isNaN(Number(v))) {
            const cls = this.obtenerClaseColorNota(v);
            if (cls) input.classList.add(cls);
          }
        };

        if (valor !== undefined && valor !== null && valor !== "") {
          input.value = valor;
          updateInputColor();
        }

        input.oninput = () => {
          updateInputColor();
        };

        input.onfocus = () => {
          this.seleccionarAlumnoCuaderno(alu.id);
          if (typeof input.select === "function") input.select();
        };

        input.onclick = (e) => {
          e.stopPropagation();
          this.seleccionarAlumnoCuaderno(alu.id);
        };

        const commitVal = (advance = true) => {
          let val = input.value;
          if (val === "") {
            this.guardarCalificacion(act.id, alu.id, undefined, advance);
          } else {
            let n = parseFloat(val);
            if (isNaN(n)) n = 0;
            if (n < 0) n = 0;
            if (n > 10) n = 10;
            input.value = n;
            updateInputColor();
            this.guardarCalificacion(act.id, alu.id, n, advance);
          }
        };

        input.onkeydown = (e) => {
          if (e.key === "Enter" || e.key === "ArrowDown") {
            e.preventDefault();
            commitVal(true);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const alumnos = (this.grupoActivo.alumnos || []).slice().sort((a,b) => a.orden - b.orden);
            const idx = alumnos.findIndex(a => a.id === alu.id);
            if (idx > 0) {
              this.nextFocusCell = { actId: act.id, aluId: alumnos[idx - 1].id };
            }
            commitVal(false);
          }
        };

        input.onchange = () => {
          commitVal(true);
        };

        wrap.appendChild(input);
        return wrap;
      }

      guardarCalificacion(actividadId, alumnoId, valor, autoAvanzar = false) {
        let evalKeyToUse = this.evaluacionActiva;
        if (this.grupoActivo && this.grupoActivo.evaluaciones) {
          for (const key of Object.keys(this.grupoActivo.evaluaciones)) {
            const ev = this.grupoActivo.evaluaciones[key];
            if (ev && ev.actividades && ev.actividades.some(a => a.id === actividadId)) {
              evalKeyToUse = key;
              break;
            }
          }
        }
        const evalData = this.grupoActivo.evaluaciones[evalKeyToUse];
        if (!evalData) return;
        if (!evalData.calificaciones) evalData.calificaciones = {};
        if (!evalData.calificaciones[actividadId]) evalData.calificaciones[actividadId] = {};

        if (valor === undefined) {
          delete evalData.calificaciones[actividadId][alumnoId];
        } else {
          evalData.calificaciones[actividadId][alumnoId] = valor;
          // Desplegar automáticamente la columna/sección que se ha evaluado
          this.desplegarSeccionPorActividad(actividadId);
        }

        if (autoAvanzar) {
          const alumnos = (this.grupoActivo.alumnos || []).slice().sort((a,b) => a.orden - b.orden);
          const idx = alumnos.findIndex(a => a.id === alumnoId);
          if (idx !== -1 && idx + 1 < alumnos.length) {
            const nextAluId = alumnos[idx + 1].id;
            this.nextFocusCell = { actId: actividadId, aluId: nextAluId };
            this.alumnoCuadernoSeleccionadoId = nextAluId;
          } else {
            this.alumnoCuadernoSeleccionadoId = alumnoId;
          }
        } else {
          this.alumnoCuadernoSeleccionadoId = alumnoId;
        }

        // Sincronización directa, atómica e instantánea con la tabla 'calificaciones' de Supabase
        if (window.supabaseSync && this.grupoActivo && this.grupoActivo.id) {
          window.supabaseSync.saveGrade(this.grupoActivo.id, alumnoId, actividadId, valor);
        }

        this.guardarDatos();
        this.renderizarCuaderno();
        this.comprobarPremiosRealTime(alumnoId);
      }

      // Menú desplegable en el botón ⚙️ de la actividad
      abrirMenuActividad(e, actividadId, seccionId) {
        e.stopPropagation();
        const menu = document.getElementById("gearDropdownMenu");
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();

        menu.style.top = `${rect.bottom + window.scrollY + 4}px`;
        menu.style.left = `${Math.min(rect.left + window.scrollX, window.innerWidth - 180)}px`;
        menu.classList.add("show");

        document.getElementById("gearEditAct").onclick = () => {
          menu.classList.remove("show");
          this.abrirModalEditarActividad(actividadId);
        };

        const changeModeBtn = document.getElementById("gearChangeMode");
        if (changeModeBtn) {
          changeModeBtn.onclick = () => {
            menu.classList.remove("show");
            this.cambiarModoActividadRapido(actividadId);
          };
        }

        const hideBtn = document.getElementById("gearHideAct");
        if (hideBtn) {
          const evalData = this.grupoActivo.evaluaciones[this.evaluacionActiva];
          const act = (evalData.actividades || []).find(a => a.id === actividadId);
          hideBtn.textContent = act && act.oculta ? "👁️ Mostrar actividad" : "👁️ Ocultar actividad";
          hideBtn.onclick = () => {
            menu.classList.remove("show");
            if (act) {
              act.oculta = !act.oculta;
              this.guardarDatos();
              this.renderizarCuaderno();
            }
          };
        }

        document.getElementById("gearColorSec").onclick = () => {
          menu.classList.remove("show");
          this.abrirModalEditarSeccion(seccionId);
        };

        document.getElementById("gearDeleteAct").onclick = () => {
          menu.classList.remove("show");
          this.solicitarEliminarActividad(actividadId);
        };
      }

      // --- LÓGICA MATEMÁTICA DE CÁLCULO POR CRITERIOS ---
      /**
       * Calcula la nota obtenida por un alumno en un criterio para una evaluación dada.
       * 1. Identifica actividades que evalúan el criterio.
       * 2. Calcula la media de calificaciones del alumno dentro de cada sección (aritmética si hay varias).
       * 3. Si una actividad está en 'Otras', se traslada la nota con su peso.
       * 4. Aplica ponderación de las secciones utilizadas.
       */
      calcularNotaCriterioAlumnoEnEval(criterioCodigo, alumnoId, evalKey, grupoTarget = this.grupoActivo) {
        const grupo = grupoTarget || this.grupoActivo;
        if (!grupo || !grupo.evaluaciones) return null;
        const evalData = grupo.evaluaciones[evalKey];
        if (!evalData || !evalData.actividades) return null;

        const califs = evalData.calificaciones || {};
        const seccionesMap = {};
        (grupo.secciones || []).forEach(s => { seccionesMap[s.id] = s; });

        // Agrupar actividades evaluadas por sección para este criterio
        const actPorSeccion = {};
        let hayCalificacion = false;

        evalData.actividades.forEach(act => {
          const normFunc = window.rubricEngine?.normalizeCriterionCode;
          const targetNorm = normFunc ? normFunc(criterioCodigo) : criterioCodigo;
          const matchCrit = act.criterios && act.criterios.some(c => c === criterioCodigo || (normFunc && normFunc(c) === targetNorm));

          if (matchCrit) {
            const nota = califs[act.id] ? califs[act.id][alumnoId] : undefined;
            if (nota !== undefined && nota !== null && nota !== "" && !isNaN(nota)) {
              hayCalificacion = true;
              if (!actPorSeccion[act.seccionId]) actPorSeccion[act.seccionId] = [];
              actPorSeccion[act.seccionId].push(Number(nota));
            }
          }
        });

        if (!hayCalificacion) return null;

        // Para cada sección, media aritmética de sus actividades
        let sumaPonderada = 0;
        let sumaPesos = 0;

        for (const secId in actPorSeccion) {
          const notas = actPorSeccion[secId];
          const mediaSec = notas.reduce((acc, n) => acc + n, 0) / notas.length;
          const sec = seccionesMap[secId] || { ponderacion: 10 };
          const peso = Number(sec.ponderacion) > 0 ? Number(sec.ponderacion) : 10;

          sumaPonderada += mediaSec * peso;
          sumaPesos += peso;
        }

        if (sumaPesos === 0) return null;
        return sumaPonderada / sumaPesos;
      }

      /**
       * Calcula la nota final de un criterio en 'Resultado Final':
       * Media aritmética del criterio utilizando las evaluaciones en las que tenga calificación.
       */
      calcularNotaCriterioAlumnoFinal(criterioCodigo, alumnoId, grupoTarget = this.grupoActivo) {
        const evals = ["eval1", "eval2", "eval3"];
        let notas = [];

        evals.forEach(evKey => {
          const n = this.calcularNotaCriterioAlumnoEnEval(criterioCodigo, alumnoId, evKey, grupoTarget);
          if (n !== null) notas.push(n);
        });

        if (notas.length === 0) return null;
        return notas.reduce((a, b) => a + b, 0) / notas.length;
      }

      /**
       * Calcula la media ponderada del conjunto de todos los criterios para un alumno.
       */
      calcularNotaFinalGlobalAlumno(alumnoId, evalKey, grupoTarget = this.grupoActivo) {
        const grupo = grupoTarget || this.grupoActivo;
        if (!grupo) return null;
        const criterios = grupo.criterios || [];
        let sumaPond = 0;
        let sumaPesos = 0;

        criterios.forEach(crit => {
          let nota = null;
          if (evalKey === "final") {
            nota = this.calcularNotaCriterioAlumnoFinal(crit.codigo, alumnoId, grupo);
          } else {
            nota = this.calcularNotaCriterioAlumnoEnEval(crit.codigo, alumnoId, evalKey, grupo);
          }

          if (nota !== null) {
            const peso = (crit.ponderacion && Number(crit.ponderacion) > 0) ? Number(crit.ponderacion) : 10;
            sumaPond += nota * peso;
            sumaPesos += peso;
          }
        });

        if (sumaPesos === 0) return null;
        return sumaPond / sumaPesos;
      }

      // --- PÁGINA 2: RESULTADOS ---
      renderizarResultados() {
        const thead = document.getElementById("tablaResultadosHead");
        const tbody = document.getElementById("tablaResultadosBody");
        const containerTabla = document.getElementById("containerTablaResultados");

        if (thead) thead.innerHTML = "";
        if (tbody) tbody.innerHTML = "";
        if (containerTabla) containerTabla.style.display = "block";

        const titulo = document.getElementById("resultadosTitulo");
        let evalNombre = "Evaluación 1";
        if (this.evaluacionActiva === "eval2") evalNombre = "Evaluación 2";
        if (this.evaluacionActiva === "eval3") evalNombre = "Evaluación 3";
        if (this.evaluacionActiva === "final") evalNombre = "Final (Media de las Evaluaciones)";
        if (titulo) titulo.textContent = `Calificación por Criterios de Evaluación — ${evalNombre}`;

        const criterios = this.grupoActivo ? (this.grupoActivo.criterios || []) : [];
        const alumnosAll = this.grupoActivo ? ((this.grupoActivo.alumnos || []).slice().sort((a,b) => a.orden - b.orden)) : [];

        // Filtro por Alumno
        const txtFiltro = (this.filtroAlumnoResultados || "").toLowerCase().trim();
        let alumnos = alumnosAll;
        if (txtFiltro !== "") {
          alumnos = alumnosAll.filter((alu, idx) => {
            const nom = (alu.nombre || "").toLowerCase();
            const ordStr = String(idx + 1);
            const ordOriginalStr = String(alu.orden || "");
            return nom.includes(txtFiltro) || ordStr === txtFiltro || ordOriginalStr === txtFiltro;
          });
        }

        // Actualizar controles UI del filtro de alumno
        const inputFiltro = document.getElementById("inputFiltroAlumnoResultados");
        if (inputFiltro && document.activeElement !== inputFiltro) {
          inputFiltro.value = this.filtroAlumnoResultados || "";
        }

        const btnLimpiar = document.getElementById("btnLimpiarFiltroAlumnoResultados");
        if (btnLimpiar) {
          btnLimpiar.style.display = txtFiltro !== "" ? "inline-flex" : "none";
        }

        const badgeInfo = document.getElementById("badgeFiltroAlumnoResultadosInfo");
        if (badgeInfo) {
          if (txtFiltro !== "") {
            badgeInfo.style.display = "inline-block";
            badgeInfo.innerHTML = `Mostrando ${alumnos.length} de ${alumnosAll.length} alumnos`;
          } else {
            badgeInfo.style.display = "none";
            badgeInfo.innerHTML = "";
          }
        }

        const cantTxt = document.getElementById("cantAlumnosFiltradosTxt");
        if (cantTxt) {
          cantTxt.textContent = txtFiltro !== ""
            ? `Filtrados: ${alumnos.length} de ${alumnosAll.length} alumnos`
            : `${alumnosAll.length} alumnos en total`;
        }

        const selectAlumno = document.getElementById("selectFiltroAlumnoResultados");
        if (selectAlumno) {
          selectAlumno.innerHTML = `<option value="">-- Todos los alumnos (${alumnosAll.length}) --</option>`;
          alumnosAll.forEach((alu, idx) => {
            const opt = document.createElement("option");
            opt.value = alu.nombre;
            opt.textContent = `${idx + 1}. ${alu.nombre}`;
            if (txtFiltro && (alu.nombre.toLowerCase().includes(txtFiltro) || String(idx + 1) === txtFiltro || alu.nombre.toLowerCase() === txtFiltro)) {
              opt.selected = true;
            }
            selectAlumno.appendChild(opt);
          });
        }

        // 1. Cabecera Tabla
        const trHead = document.createElement("tr");
        const thAlu = document.createElement("th");
        thAlu.textContent = "Alumnos (" + alumnos.length + (alumnos.length !== alumnosAll.length ? " / " + alumnosAll.length : "") + ")";
        thAlu.style.position = "sticky";
        thAlu.style.top = "0";
        thAlu.style.left = "0";
        thAlu.style.zIndex = "45";
        thAlu.style.background = "#f8fafc";
        trHead.appendChild(thAlu);

        criterios.forEach(crit => {
          const th = document.createElement("th");
          th.title = `${crit.codigo}: ${crit.descripcion} (${crit.ponderacion || 0}%)`;
          th.style.position = "sticky";
          th.style.top = "0";
          th.style.zIndex = "28";
          th.style.background = "#f8fafc";
          th.innerHTML = `<div><strong>${crit.codigo}</strong></div><div style="font-size: 0.7rem; color: #64748b;">${crit.ponderacion || 0}%</div>`;
          trHead.appendChild(th);
        });

        const thFinal = document.createElement("th");
        thFinal.className = "nota-final-col";
        thFinal.style.position = "sticky";
        thFinal.style.top = "0";
        thFinal.style.zIndex = "28";
        thFinal.innerHTML = `<div><strong>MEDIA GLOBAL</strong></div><div style="font-size: 0.7rem;">Ponderada</div>`;
        trHead.appendChild(thFinal);
        if (thead) thead.appendChild(trHead);

        // Mensaje si no hay alumnos que coincidan
        if (alumnos.length === 0) {
          const trEmpty = document.createElement("tr");
          const tdEmpty = document.createElement("td");
          tdEmpty.colSpan = criterios.length + 2;
          tdEmpty.style.padding = "24px";
          tdEmpty.style.textAlign = "center";
          tdEmpty.style.color = "#dc2626";
          tdEmpty.style.background = "#fef2f2";
          tdEmpty.style.fontWeight = "600";
          tdEmpty.textContent = `No se encontraron alumnos coincidentes con "${this.filtroAlumnoResultados}"`;
          trEmpty.appendChild(tdEmpty);
          if (tbody) tbody.appendChild(trEmpty);
          return;
        }

        // 2. Filas de Resultados (Tabla)
        alumnos.forEach((alu) => {
          const originalIndex = alumnosAll.findIndex(a => a.id === alu.id);
          const displayOrder = originalIndex !== -1 ? originalIndex + 1 : alu.orden;

          // --- TABLA ---
          const tr = document.createElement("tr");
          tr.id = `row-res-alumno-${alu.id}`;
          if (this.alumnoCuadernoSeleccionadoId === alu.id) {
            tr.classList.add("row-alumno-selected");
          }
          tr.onclick = () => {
            this.seleccionarAlumnoCuaderno(alu.id);
          };
          const tdAlu = document.createElement("td");
          tdAlu.innerHTML = `<strong>${displayOrder}.</strong> ${this.escapeHtml(alu.nombre)}`;
          tr.appendChild(tdAlu);

          const critScoresMap = {};

          criterios.forEach(crit => {
            const td = document.createElement("td");
            let nota = null;
            if (this.evaluacionActiva === "final") {
              nota = this.calcularNotaCriterioAlumnoFinal(crit.codigo, alu.id);
            } else {
              nota = this.calcularNotaCriterioAlumnoEnEval(crit.codigo, alu.id, this.evaluacionActiva);
            }

            if (nota !== null) {
              const val = Number(nota.toFixed(2));
              critScoresMap[crit.codigo] = val;
              td.textContent = val.toFixed(2);
              const cls = this.obtenerClaseColorNota(val);
              if (cls) td.className = cls;
            } else {
              critScoresMap[crit.codigo] = null;
              td.innerHTML = `<span style="color: #94a3b8;">-</span>`;
            }
            tr.appendChild(td);
          });

          // Columna Nota Final
          const tdFinal = document.createElement("td");
          tdFinal.className = "nota-final-col";
          const notaFinal = this.calcularNotaFinalGlobalAlumno(alu.id, this.evaluacionActiva);
          let finalVal = null;
          if (notaFinal !== null) {
            finalVal = Number(notaFinal.toFixed(2));
            tdFinal.textContent = finalVal.toFixed(2);
            const cls = this.obtenerClaseColorNota(finalVal);
            if (cls) tdFinal.classList.add(cls);
          } else {
            tdFinal.innerHTML = `<span style="color: #94a3b8;">-</span>`;
          }
          tr.appendChild(tdFinal);
          if (tbody) tbody.appendChild(tr);
        });
      }

      // --- GESTIÓN DE MODALES Y FORMULARIOS ---
      abrirModal(modalId, pushState = true) {
        if (pushState && typeof window !== "undefined" && window.history) {
          try {
            window.history.pushState({ type: "modal", modalId: modalId }, "");
          } catch (e) {}
        }
        const m = document.getElementById(modalId);
        if (m) {
          m.classList.add("open");
          document.body.style.overflow = "hidden";
          document.body.classList.add("modal-open");
          setTimeout(() => {
            let inputToFocus = null;
            if (modalId === "modalActividad") {
              inputToFocus = document.getElementById("actNombre");
            } else if (modalId === "modalEditRubrica") {
              inputToFocus = document.getElementById("editRubTitulo");
            } else if (modalId === "modalImportarRubrica") {
              inputToFocus = document.getElementById("inputRubricaTituloPegado");
            } else if (modalId === "modalPreviewImportRubrica") {
              inputToFocus = document.getElementById("previewRubricaTituloInput");
            } else if (modalId === "modalCrearRubricaManual") {
              inputToFocus = document.getElementById("manualRubricaTitulo");
            } else if (modalId === "modalAlumno") {
              inputToFocus = document.getElementById("alumnoNombre");
            } else if (modalId === "modalSeccion") {
              inputToFocus = document.getElementById("secNombre");
            } else if (modalId === "modalCriterio") {
              inputToFocus = document.getElementById("critCodigo");
            }

            if (inputToFocus) {
              inputToFocus.focus();
              if (typeof inputToFocus.select === 'function') {
                inputToFocus.select();
              }
            }
          }, 60);
        }
      }

      cerrarModal(modalId, isPopState = false) {
        if (modalId === "modalPreviewFotoRubrica" && this.cropperInstancia) {
          try {
            this.cropperInstancia.destroy();
          } catch (e) {}
          this.cropperInstancia = null;
        }
        const m = document.getElementById(modalId);
        if (m) m.classList.remove("open");
        const remainingOpen = document.querySelectorAll(".modal-overlay.open");
        if (remainingOpen.length === 0) {
          document.body.style.overflow = "";
          document.body.classList.remove("modal-open");
        }

        if (!isPopState && typeof window !== "undefined" && window.history && window.history.state && window.history.state.type === "modal") {
          this.isClosingModalProgrammatically = true;
          try {
            window.history.back();
          } catch (e) {}
        }
      }

      // REGLA FUNDAMENTAL DE SEGURIDAD: Confirmación personalizada
      mostrarConfirmacion(mensaje, callbackConfirmar, textoBoton = "Aceptar") {
        const modalesPrevios = Array.from(document.querySelectorAll(".modal-overlay.open"))
          .map(el => el.id)
          .filter(id => id && id !== "modalConfirmacion");

        document.getElementById("modalConfirmacionTexto").innerHTML = mensaje;
        const btn = document.getElementById("btnConfirmarAccion");
        btn.textContent = textoBoton || "Aceptar";
        btn.onclick = () => {
          this.cerrarModal("modalConfirmacion");
          modalesPrevios.forEach(modalId => {
            this.cerrarModal(modalId);
          });
          callbackConfirmar();
        };
        this.abrirModal("modalConfirmacion");
      }

      // Prompt personalizado para solicitar texto sin usar window.prompt (evita bloqueos iframe)
      mostrarPrompt(titulo, mensaje, valorInicial, callbackOk) {
        document.getElementById("modalInputPromptTitulo").textContent = titulo || "Introduce los datos";
        document.getElementById("modalInputPromptMensaje").textContent = mensaje || "";
        const campo = document.getElementById("modalInputPromptCampo");
        campo.value = valorInicial || "";

        const submitFn = () => {
          const val = campo.value.trim();
          if (val) {
            this.cerrarModal("modalInputPrompt");
            callbackOk(val);
          }
        };

        campo.onkeydown = (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submitFn();
          }
        };

        document.getElementById("btnInputPromptAceptar").onclick = submitFn;
        this.abrirModal("modalInputPrompt");
        setTimeout(() => {
          campo.focus();
          campo.select();
        }, 100);
      }

      // --- MODAL ACTIVIDAD ---
      abrirModalNuevaActividad(seccionIdPrevia) {
        if (this.evaluacionActiva === "final") {
          alert("No puedes añadir actividades en la vista de Resultado Final. Selecciona Evaluación 1, 2 o 3.");
          return;
        }
        document.getElementById("modalActividadTitulo").textContent = "Nueva Actividad";
        document.getElementById("actividadIdEdit").value = "";
        document.getElementById("actNombre").value = "";
        const selectTipo = document.getElementById("actTipo");
        if (selectTipo) selectTipo.value = "Actividad";
        const fInputNew = document.getElementById("actFecha");
        if (fInputNew) fInputNew.value = new Date().toISOString().split("T")[0];

        // Poblar secciones
        const secSel = document.getElementById("actSeccion");
        secSel.innerHTML = "";
        (this.grupoActivo.secciones || []).forEach(s => {
          const opt = document.createElement("option");
          opt.value = s.id;
          opt.textContent = `${s.nombre} (${s.ponderacion}%)`;
          if (seccionIdPrevia && s.id === seccionIdPrevia) opt.selected = true;
          secSel.appendChild(opt);
        });

        const targetSecId = secSel.value;
        this.onCambioSeccionActividad(targetSecId);

        // Si es la sección "Actividades y actitud", método por defecto es caritas
        const secActual = this.grupoActivo.secciones.find(s => s.id === targetSecId);
        if (secActual && secActual.nombre.toLowerCase().includes("actividades y actitud")) {
          document.getElementById("actMetodo").value = "caritas";
        } else {
          document.getElementById("actMetodo").value = "numerica";
        }
        this.onCambioMetodo(document.getElementById("actMetodo").value);

        this.abrirModal("modalActividad");
      }

      abrirModalEditarActividad(actividadId) {
        const evalData = this.grupoActivo.evaluaciones[this.evaluacionActiva];
        const act = (evalData.actividades || []).find(a => a.id === actividadId);
        if (!act) return;

        document.getElementById("modalActividadTitulo").textContent = "Editar Actividad";
        document.getElementById("actividadIdEdit").value = act.id;
        document.getElementById("actNombre").value = act.nombre;
        const selectTipo = document.getElementById("actTipo");
        if (selectTipo) selectTipo.value = act.tipo || "Actividad";
        const fInputEdit = document.getElementById("actFecha");
        if (fInputEdit) fInputEdit.value = act.fechaCreacion || act.fecha || new Date().toISOString().split("T")[0];

        const secSel = document.getElementById("actSeccion");
        secSel.innerHTML = "";
        (this.grupoActivo.secciones || []).forEach(s => {
          const opt = document.createElement("option");
          opt.value = s.id;
          opt.textContent = `${s.nombre} (${s.ponderacion}%)`;
          if (s.id === act.seccionId) opt.selected = true;
          secSel.appendChild(opt);
        });

        document.getElementById("actMetodo").value = act.metodo;
        this.onCambioMetodo(act.metodo);
        if (act.rubricaId) {
          document.getElementById("actRubricaId").value = act.rubricaId;
        }

        this.renderizarCheckboxesCriterios(act.criterios || []);
        this.abrirModal("modalActividad");
      }

      onCambioSeccionActividad(seccionId) {
        const sec = this.grupoActivo.secciones.find(s => s.id === seccionId);
        if (sec) {
          // Si es "Actividades y actitud" y es una nueva actividad, por defecto caritas
          if (!document.getElementById("actividadIdEdit").value && sec.nombre.toLowerCase().includes("actividades y actitud")) {
            document.getElementById("actMetodo").value = "caritas";
            this.onCambioMetodo("caritas");
          }
          this.renderizarCheckboxesCriterios(sec.criterios || []);
        }
      }

      onCambioRubricaSeleccionada(rubricaId) {
        if (!rubricaId || !this.grupoActivo) return;
        const rub = (this.grupoActivo.rubricas || []).find(r => r.id === rubricaId);
        if (rub && rub.tipo) {
          const norm = this.normalizarTipoActividad(rub.tipo);
          const selectTipo = document.getElementById("actTipo");
          if (selectTipo) selectTipo.value = norm;
        }
      }

      onCambioMetodo(metodo) {
        const wrap = document.getElementById("wrapRubricaSelect");
        if (metodo === "rubrica") {
          wrap.style.display = "block";
          const sel = document.getElementById("actRubricaId");
          sel.innerHTML = "";
          const rubs = this.grupoActivo.rubricas || [];
          if (rubs.length === 0) {
            sel.innerHTML = "<option value=''>No hay rúbricas creadas (ve a Configuración)</option>";
          } else {
            rubs.forEach(r => {
              const opt = document.createElement("option");
              opt.value = r.id;
              opt.textContent = `${r.titulo} (${this.normalizarTipoActividad(r.tipo)})`;
              sel.appendChild(opt);
            });
            if (sel.value) {
              this.onCambioRubricaSeleccionada(sel.value);
            }
          }
        } else {
          wrap.style.display = "none";
        }
      }

      renderizarCheckboxesCriterios(seleccionados = []) {
        const box = document.getElementById("criteriosCheckboxes");
        box.innerHTML = "";
        const criterios = this.grupoActivo.criterios || [];

        criterios.forEach(crit => {
          const label = document.createElement("label");
          label.style.display = "flex";
          label.style.alignItems = "center";
          label.style.gap = "6px";
          label.style.marginBottom = "4px";
          label.style.fontSize = "0.82rem";

          const chk = document.createElement("input");
          chk.type = "checkbox";
          chk.value = crit.codigo;
          if (seleccionados.includes(crit.codigo)) chk.checked = true;

          label.appendChild(chk);
          label.appendChild(document.createTextNode(`${crit.codigo} - ${crit.descripcion.substring(0, 50)}...`));
          box.appendChild(label);
        });
      }

      guardarActividad() {
        const id = document.getElementById("actividadIdEdit").value;
        const nombre = document.getElementById("actNombre").value.trim();
        const seccionId = document.getElementById("actSeccion").value;
        const metodo = document.getElementById("actMetodo").value;
        const rubricaId = (metodo === "rubrica") ? document.getElementById("actRubricaId").value : undefined;
        const tipoSelect = document.getElementById("actTipo");
        let finalTipo = (tipoSelect && tipoSelect.value) ? tipoSelect.value : "Actividad";
        if (metodo === "rubrica" && rubricaId) {
          finalTipo = this.getTipoActividad({ rubricaId, tipo: finalTipo });
        } else {
          finalTipo = this.normalizarTipoActividad(finalTipo);
        }

        if (!nombre) {
          alert("Debes indicar un nombre para la actividad.");
          return;
        }

        const chks = document.querySelectorAll("#criteriosCheckboxes input[type='checkbox']:checked");
        const criterios = Array.from(chks).map(c => c.value);

        const evalData = this.grupoActivo.evaluaciones[this.evaluacionActiva];
        if (!evalData.actividades) evalData.actividades = [];

        const fInput = document.getElementById("actFecha");
        const fechaCreacion = (fInput && fInput.value) ? fInput.value : new Date().toISOString().split("T")[0];

        if (id) {
          const act = evalData.actividades.find(a => a.id === id);
          if (act) {
            act.nombre = nombre;
            act.tipo = finalTipo;
            act.seccionId = seccionId;
            act.metodo = metodo;
            act.rubricaId = rubricaId;
            act.criterios = criterios;
            act.fechaCreacion = fechaCreacion;
          }
        } else {
          const newAct = {
            id: "act-" + Date.now(),
            nombre,
            tipo: finalTipo,
            seccionId,
            metodo,
            rubricaId,
            criterios,
            fechaCreacion
          };
          evalData.actividades.push(newAct);
        }

        this.guardarDatos();
        this.cerrarModal("modalActividad");
        this.renderizarCuaderno();
      }

      // ==========================================
      // DIARIO DE ACTIVIDADES Y BÚSQUEDA
      // ==========================================
      
      togglePillDiario(pillId) {
        const btn = document.getElementById(pillId);
        if (btn) {
          btn.classList.toggle("active");
        }
      }

      abrirModalDiarioFiltros() {
        if (!this.grupoActivo) {
          this.mostrarToast("⚠️ Selecciona un grupo de alumnos primero.");
          return;
        }

        // Asegurar que los botones de Periodo y Tipo aparezcan desmarcados (en blanco)
        ["pillEv_eval1", "pillEv_eval2", "pillEv_eval3", "pillEv_final", "pillTipo_Actividad", "pillTipo_Examen", "pillTipo_Trabajo"].forEach(id => {
          const btn = document.getElementById(id);
          if (btn) btn.classList.remove("active");
        });

        // Actualizar resúmenes visuales
        this.actualizarResumenSeccionesDiario();
        this.actualizarResumenAlumnosDiario();

        this.abrirModal("modalDiarioFiltros");
      }

      actualizarResumenSeccionesDiario() {
        const el = document.getElementById("diarioSeccionesResumen");
        if (!el || !this.grupoActivo) return;
        const total = (this.grupoActivo.secciones || []).length;
        if (!this.diarioSeccionesSelIds || this.diarioSeccionesSelIds.length === total) {
          el.textContent = `Todas las secciones (${total})`;
          el.style.color = "#2563eb";
        } else {
          el.textContent = `${this.diarioSeccionesSelIds.length} de ${total} secciones seleccionadas`;
          el.style.color = "#d97706";
        }
      }

      actualizarResumenAlumnosDiario() {
        const el = document.getElementById("diarioAlumnosResumen");
        if (!el || !this.grupoActivo) return;
        const total = (this.grupoActivo.alumnos || []).length;
        if (!this.diarioAlumnosSelIds || this.diarioAlumnosSelIds.length === total) {
          el.textContent = `Todos los alumnos (${total})`;
          el.style.color = "#2563eb";
        } else {
          el.textContent = `${this.diarioAlumnosSelIds.length} de ${total} alumnos seleccionados`;
          el.style.color = "#d97706";
        }
      }

      // 4. Sub-modal Secciones
      abrirModalDiarioSecciones() {
        if (!this.grupoActivo) return;
        const container = document.getElementById("contenedorListaSeccionesDiario");
        if (!container) return;
        container.innerHTML = "";

        const secciones = this.grupoActivo.secciones || [];
        const idsActivos = this.diarioSeccionesSelIds || secciones.map(s => s.id);

        secciones.forEach(sec => {
          const lbl = document.createElement("label");
          lbl.style.cssText = "display: flex; align-items: center; gap: 8px; font-size: 0.88rem; cursor: pointer; padding: 4px; border-radius: 4px;";
          
          const chk = document.createElement("input");
          chk.type = "checkbox";
          chk.value = sec.id;
          chk.className = "chk-diario-sec";
          chk.checked = idsActivos.includes(sec.id);

          const badgeColor = document.createElement("span");
          badgeColor.style.cssText = `width: 12px; height: 12px; border-radius: 3px; background: ${sec.color || '#3b82f6'}; display: inline-block;`;

          lbl.appendChild(chk);
          lbl.appendChild(badgeColor);
          lbl.appendChild(document.createTextNode(`${sec.nombre} (${sec.ponderacion}%)`));
          container.appendChild(lbl);
        });

        this.abrirModal("modalDiarioSecciones");
      }

      seleccionarTodasSeccionesDiario(marcar) {
        document.querySelectorAll("#contenedorListaSeccionesDiario .chk-diario-sec").forEach(chk => {
          chk.checked = marcar;
        });
      }

      confirmarSeleccionSeccionesDiario() {
        const chks = document.querySelectorAll("#contenedorListaSeccionesDiario .chk-diario-sec:checked");
        const totalSecs = (this.grupoActivo.secciones || []).length;
        const selectedIds = Array.from(chks).map(c => c.value);

        if (selectedIds.length === 0) {
          this.mostrarToast("⚠️ Selecciona al menos una sección.");
          return;
        }

        if (selectedIds.length === totalSecs) {
          this.diarioSeccionesSelIds = null;
        } else {
          this.diarioSeccionesSelIds = selectedIds;
        }

        this.actualizarResumenSeccionesDiario();
        this.cerrarModal("modalDiarioSecciones");
      }

      // 5. Sub-modal Alumnos
      abrirModalDiarioAlumnos() {
        if (!this.grupoActivo) return;
        const container = document.getElementById("contenedorListaAlumnosDiario");
        if (!container) return;
        container.innerHTML = "";

        const alumnos = this.grupoActivo.alumnos || [];
        const idsActivos = this.diarioAlumnosSelIds || alumnos.map(a => a.id);

        alumnos.forEach((alu, index) => {
          const lbl = document.createElement("label");
          lbl.className = "item-alu-diario";
          lbl.dataset.nombre = (alu.apellidos + " " + alu.nombre).toLowerCase();
          lbl.style.cssText = "display: flex; align-items: center; gap: 8px; font-size: 0.88rem; cursor: pointer; padding: 4px; border-radius: 4px;";
          
          const chk = document.createElement("input");
          chk.type = "checkbox";
          chk.value = alu.id;
          chk.className = "chk-diario-alu";
          chk.checked = idsActivos.includes(alu.id);

          const num = document.createElement("span");
          num.style.cssText = "font-weight: 700; color: #64748b; font-size: 0.78rem; width: 22px;";
          num.textContent = `${index + 1}.`;

          lbl.appendChild(chk);
          lbl.appendChild(num);
          lbl.appendChild(document.createTextNode(`${alu.apellidos}, ${alu.nombre}`));
          container.appendChild(lbl);
        });

        const inputBusq = document.getElementById("inputBuscarAlumnoModalDiario");
        if (inputBusq) inputBusq.value = "";

        this.abrirModal("modalDiarioAlumnos");
      }

      filtrarListaAlumnosModalDiario(query) {
        const q = (query || "").toLowerCase().trim();
        document.querySelectorAll("#contenedorListaAlumnosDiario .item-alu-diario").forEach(lbl => {
          const match = !q || (lbl.dataset.nombre || "").includes(q);
          lbl.style.display = match ? "flex" : "none";
        });
      }

      seleccionarTodosAlumnosDiario(marcar) {
        document.querySelectorAll("#contenedorListaAlumnosDiario .chk-diario-alu").forEach(chk => {
          if (chk.closest('.item-alu-diario').style.display !== "none") {
            chk.checked = marcar;
          }
        });
      }

      confirmarSeleccionAlumnosDiario() {
        const chks = document.querySelectorAll("#contenedorListaAlumnosDiario .chk-diario-alu:checked");
        const totalAlus = (this.grupoActivo.alumnos || []).length;
        const selectedIds = Array.from(chks).map(c => c.value);

        if (selectedIds.length === 0) {
          this.mostrarToast("⚠️ Selecciona al menos un alumno.");
          return;
        }

        if (selectedIds.length === totalAlus) {
          this.diarioAlumnosSelIds = null;
        } else {
          this.diarioAlumnosSelIds = selectedIds;
        }

        this.actualizarResumenAlumnosDiario();
        this.cerrarModal("modalDiarioAlumnos");
      }

      // 6. BUSCAR EN EL DIARIO
      ejecutarBusquedaDiario() {
        if (!this.grupoActivo) return;

        // 1. Periodos seleccionados
        const evs = [];
        if (document.getElementById("pillEv_eval1")?.classList.contains("active")) evs.push("eval1");
        if (document.getElementById("pillEv_eval2")?.classList.contains("active")) evs.push("eval2");
        if (document.getElementById("pillEv_eval3")?.classList.contains("active")) evs.push("eval3");
        const finalSelected = document.getElementById("pillEv_final")?.classList.contains("active");
        if (finalSelected) evs.push("final");

        // Si todos están desmarcados, quiere decir que se seleccionan todos.
        // Si en 1. se selecciona Final, se aplica el mismo filtro que si no se selecciona ninguna, puesto que "Final" incluye Ev 1, Ev 2 y Ev.3.
        const evsFinales = (evs.length === 0 || finalSelected) ? ["eval1", "eval2", "eval3", "final"] : evs;

        // 2. Tipos seleccionados
        const tipos = [];
        if (document.getElementById("pillTipo_Actividad")?.classList.contains("active")) tipos.push("Actividad");
        if (document.getElementById("pillTipo_Examen")?.classList.contains("active")) tipos.push("Examen");
        if (document.getElementById("pillTipo_Trabajo")?.classList.contains("active")) tipos.push("Trabajo");
        // Si todos están desmarcados, quiere decir que se seleccionan todos:
        const tiposFinales = tipos.length === 0 ? ["Actividad", "Examen", "Trabajo"] : tipos;

        // 3. Fechas
        const fechaDesdeVal = (document.getElementById("diarioFechaDesde")?.value || "").trim();
        const fechaHastaVal = (document.getElementById("diarioFechaHasta")?.value || "").trim();

        let modoFecha = "todos";
        if (fechaDesdeVal && fechaHastaVal) {
          modoFecha = "rango";
        } else if (fechaDesdeVal || fechaHastaVal) {
          modoFecha = "exacta";
        } else {
          modoFecha = "default";
        }

        const fechaExacta = fechaDesdeVal || fechaHastaVal;
        const fechaMinDefault = "2025-09-15";

        // 4. Secciones
        const seccionesAll = this.grupoActivo.secciones || [];
        const secIdsPermitidos = this.diarioSeccionesSelIds || seccionesAll.map(s => s.id);

        // 5. Alumnos
        const alumnosAll = this.grupoActivo.alumnos || [];
        const aluIdsPermitidos = this.diarioAlumnosSelIds || alumnosAll.map(a => a.id);
        const alumnosFiltrados = alumnosAll.filter(a => aluIdsPermitidos.includes(a.id));

        // Recopilar actividades evaluadas en los periodos seleccionados
        const actividadesEncontradas = [];
        const evNombres = { eval1: "1º Ev", eval2: "2º Ev", eval3: "3º Ev", final: "Final" };
        const evKeysAProcesar = ["eval1", "eval2", "eval3", "final"].filter(k => evsFinales.includes(k));

        evKeysAProcesar.forEach(evKey => {
          const evalObj = this.grupoActivo.evaluaciones ? this.grupoActivo.evaluaciones[evKey] : null;
          if (!evalObj || !evalObj.actividades) return;

          evalObj.actividades.forEach(act => {
            if (act.oculta) return;

            // Filtrar Sección
            if (!secIdsPermitidos.includes(act.seccionId)) return;

            // Filtrar Tipo (Actividad, Examen, Trabajo)
            const tipoAct = this.getTipoActividad ? this.getTipoActividad(act) : (act.tipo || "Actividad");
            if (!tiposFinales.includes(tipoAct)) return;

            // Filtrar Fecha
            const fAct = (act.fechaCreacion || act.fecha || "").split("T")[0];

            if (modoFecha === "exacta") {
              if (fAct !== fechaExacta) return;
            } else if (modoFecha === "rango") {
              if (fAct < fechaDesdeVal || fAct > fechaHastaVal) return;
            } else if (modoFecha === "default") {
              if (fAct && fAct < fechaMinDefault) return;
            }

            const sec = seccionesAll.find(s => s.id === act.seccionId);

            actividadesEncontradas.push({
              act,
              evKey,
              evNombre: evNombres[evKey] || evKey,
              seccionNombre: sec ? sec.nombre : "General",
              seccionColor: sec ? sec.color : "#3b82f6",
              fecha: fAct || "Sin fecha",
              calificaciones: evalObj.calificaciones ? (evalObj.calificaciones[act.id] || {}) : {}
            });
          });
        });

        // Ordenar en estricto ORDEN CRONOLÓGICO
        actividadesEncontradas.sort((a, b) => (a.fecha || "").localeCompare(b.fecha || ""));

        // Renderizar los resultados
        this.renderizarResultadosDiarioCronologico(actividadesEncontradas, alumnosFiltrados, {
          evsFinales,
          tiposFinales,
          fechaDesdeVal,
          fechaHastaVal,
          modoFecha,
          totalSecs: secIdsPermitidos.length,
          totalAlus: alumnosFiltrados.length
        });

        this.cerrarModal("modalDiarioFiltros");
        this.abrirModal("modalDiarioResultados");
      }

      renderizarResultadosDiarioCronologico(items, alumnos, infoFiltro) {
        const container = document.getElementById("diarioResultadosContenido");
        const subtitulo = document.getElementById("diarioResultadosSubtitulo");
        if (!container) return;

        container.innerHTML = "";
        this.diarioUltimaBusqueda = { items, alumnos, infoFiltro };
        if (!this.diarioSeleccionadas) {
          this.diarioSeleccionadas = new Set();
        }

        let descFecha = "Todas las fechas";
        if (infoFiltro.modoFecha === "exacta") descFecha = `Fecha concreta: ${this.formatearFecha(infoFiltro.fechaDesdeVal || infoFiltro.fechaHastaVal)}`;
        else if (infoFiltro.modoFecha === "rango") descFecha = `Rango: ${this.formatearFecha(infoFiltro.fechaDesdeVal)} a ${this.formatearFecha(infoFiltro.fechaHastaVal)}`;
        else if (infoFiltro.modoFecha === "default") descFecha = `Desde 15/09/2025`;

        if (subtitulo) {
          subtitulo.textContent = `${items.length} evaluación(es) encontradas | ${descFecha} | ${infoFiltro.totalSecs} Sección(es) | ${infoFiltro.totalAlus} Alumno(s)`;
        }

        if (items.length === 0) {
          container.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: #64748b;">
              <div style="font-size: 2.5rem; margin-bottom: 10px;">🔍</div>
              <h4 style="font-weight: 800; color: #334155; margin-bottom: 6px;">No se encontraron evaluaciones</h4>
              <p style="font-size: 0.85rem; margin: 0;">No hay actividades, exámenes o trabajos evaluados que coincidan con la combinación de filtros seleccionada.</p>
            </div>
          `;
          return;
        }

        // Toolbar minimalista de selección múltiple
        const countSel = this.diarioSeleccionadas.size;
        const todasSeleccionadas = items.length > 0 && items.every(i => this.diarioSeleccionadas.has(`${i.evKey}___${i.act.id}`));

        const toolbar = document.createElement("div");
        toolbar.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 7px 12px; border-radius: 8px; border: 1px solid #cbd5e1; gap: 8px; flex-wrap: wrap; position: sticky; top: 0; z-index: 10; box-shadow: 0 1px 3px rgba(0,0,0,0.04); margin-bottom: 2px;";

        toolbar.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <label style="display: flex; align-items: center; gap: 6px; font-weight: 700; font-size: 0.82rem; color: #1e293b; cursor: pointer; user-select: none;">
              <input type="checkbox" id="chkDiarioSeleccionarTodas" ${todasSeleccionadas ? 'checked' : ''} onchange="app.toggleSeleccionarTodasDiario(this.checked)" style="width: 16px; height: 16px; cursor: pointer; accent-color: #2563eb;" />
              <span>Seleccionar todas (${items.length})</span>
            </label>
            <span id="badgeDiarioSeleccionadasCount" style="font-size: 0.76rem; font-weight: 700; color: #2563eb; background: #eff6ff; padding: 2px 8px; border-radius: 10px; border: 1px solid #bfdbfe; ${countSel > 0 ? 'display: inline-block;' : 'display: none;'}">
              ${countSel} seleccionada(s)
            </span>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button type="button" class="btn btn-danger btn-xs" id="btnEliminarSeleccionadasDiario"
                    onclick="app.solicitarEliminarMúltipleDiario()"
                    style="font-weight: 700; font-size: 0.78rem; padding: 4px 10px; border-radius: 6px; transition: all 0.2s; ${countSel > 0 ? 'opacity: 1; cursor: pointer;' : 'opacity: 0.5; cursor: not-allowed;'}"
                    ${countSel > 0 ? '' : 'disabled'}>
              🗑️ Eliminar (${countSel})
            </button>
          </div>
        `;

        container.appendChild(toolbar);

        items.forEach((item, idx) => {
          const act = item.act;
          const itemKey = `${item.evKey}___${act.id}`;
          const isChecked = this.diarioSeleccionadas.has(itemKey);

          const card = document.createElement("div");
          card.className = "item-diario-row";
          card.id = `diarioItemRow_${itemKey}`;
          card.style.cssText = `background: ${isChecked ? '#f0f9ff' : '#ffffff'}; border: 1px solid ${isChecked ? '#3b82f6' : '#cbd5e1'}; border-radius: 8px; padding: 6px 12px; display: flex; flex-direction: column; gap: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); transition: background 0.15s ease, border-color 0.15s ease;`;

          const safeNombre = (act.nombre || "").replace(/"/g, '&quot;');
          const safeNombreJs = (act.nombre || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '&quot;');

          // Extraer SOLO el número del criterio (eliminando cualquier texto para máxima compacidad)
          let numCriterio = "";
          if (act.criterios && act.criterios.length > 0) {
            const nums = act.criterios.map(c => {
              const m = String(c).match(/\d+(\.\d+)*/);
              return m ? m[0] : "";
            }).filter(Boolean);
            if (nums.length > 0) numCriterio = nums.join(", ");
          }
          if (!numCriterio && item.seccionNombre) {
            const mCrit = item.seccionNombre.match(/criterio\s*([\d\.]+)/i);
            if (mCrit) numCriterio = mCrit[1];
            else {
              const mNum = item.seccionNombre.match(/^(\d+(\.\d+)?)/);
              if (mNum) numCriterio = mNum[1];
              else {
                const mAny = item.seccionNombre.match(/\d+(\.\d+)*/);
                if (mAny) numCriterio = mAny[0];
              }
            }
          }
          if (!numCriterio && this.grupoActivo && this.grupoActivo.secciones) {
            const sec = this.grupoActivo.secciones.find(s => s.id === act.seccionId);
            if (sec) {
              const idxSec = this.grupoActivo.secciones.indexOf(sec);
              numCriterio = this.obtenerNumeroCriterioSeccion(sec, idxSec);
              const mSec = String(numCriterio).match(/\d+(\.\d+)*/);
              if (mSec) numCriterio = mSec[0];
            }
          }

          const badgeCriterioNum = numCriterio
            ? `<span style="font-weight: 800; font-size: 0.76rem; background: ${item.seccionColor}18; color: ${item.seccionColor}; border: 1px solid ${item.seccionColor}35; padding: 1px 6px; border-radius: 4px; white-space: nowrap;" title="Criterio ${numCriterio} (${(item.seccionNombre || '').replace(/"/g, '&quot;')})">${numCriterio}</span>`
            : '';

          card.innerHTML = `
            <!-- Línea 1: Metadatos imprescindibles (Fecha, Criterio solo número, Tipo/Eval y Eliminar) -->
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; line-height: 1.2;">
              <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; min-width: 0;">
                <input type="checkbox" class="chk-item-diario"
                       ${isChecked ? 'checked' : ''}
                       onchange="app.toggleSeleccionItemDiario('${itemKey}', this.checked)"
                       style="width: 16px; height: 16px; cursor: pointer; accent-color: #2563eb; margin: 0;"
                       title="Seleccionar esta actividad" />
                <span style="font-weight: 800; font-size: 0.78rem; background: #1e293b; color: #ffffff; padding: 1px 7px; border-radius: 4px; white-space: nowrap;">
                  📅 ${this.formatearFecha(item.fecha)}
                </span>
                ${badgeCriterioNum}
                <span style="font-weight: 600; font-size: 0.74rem; color: #475569; background: #f1f5f9; border: 1px solid #e2e8f0; padding: 1px 5px; border-radius: 4px; white-space: nowrap;">
                  ${act.tipo || 'Actividad'} • ${item.evNombre}
                </span>
              </div>
              <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                <button type="button" class="btn btn-danger btn-xs"
                        style="font-weight: 700; padding: 2px 7px; font-size: 0.74rem; background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; border-radius: 4px; cursor: pointer;"
                        onclick="app.solicitarEliminarActividadDesdeDiario('${item.evKey}', '${act.id}', '${safeNombreJs}')"
                        title="Eliminar esta actividad">
                  🗑️
                </button>
              </div>
            </div>

            <!-- Línea 2: Campo del nombre editable -->
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 0.76rem; font-weight: 700; color: #64748b; user-select: none;" title="Nombre de la actividad">✏️</span>
              <input type="text"
                     class="form-control input-diario-act-nombre"
                     value="${safeNombre}"
                     placeholder="Nombre de la actividad..."
                     onchange="app.actualizarNombreActividadDesdeDiario('${item.evKey}', '${act.id}', this.value)"
                     style="flex: 1; min-width: 0; padding: 2px 8px; font-size: 0.85rem; font-weight: 700; color: #0f172a; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 5px; outline: none; transition: border-color 0.15s ease, box-shadow 0.15s ease;"
                     onfocus="this.style.borderColor='#2563eb'; this.style.boxShadow='0 0 0 2px rgba(37,99,235,0.1)'"
                     onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='none'" />
            </div>
          `;

          container.appendChild(card);
        });
      }

      toggleSeleccionItemDiario(itemKey, checked) {
        if (!this.diarioSeleccionadas) this.diarioSeleccionadas = new Set();
        if (checked) {
          this.diarioSeleccionadas.add(itemKey);
        } else {
          this.diarioSeleccionadas.delete(itemKey);
        }
        const card = document.getElementById(`diarioItemRow_${itemKey}`);
        if (card) {
          card.style.background = checked ? "#f0f9ff" : "#ffffff";
          card.style.borderColor = checked ? "#3b82f6" : "#cbd5e1";
        }
        this.actualizarBarraAccionesDiario();
      }

      toggleSeleccionarTodasDiario(checked) {
        if (!this.diarioSeleccionadas) this.diarioSeleccionadas = new Set();
        if (!this.diarioUltimaBusqueda || !this.diarioUltimaBusqueda.items) return;

        if (checked) {
          this.diarioUltimaBusqueda.items.forEach(i => {
            this.diarioSeleccionadas.add(`${i.evKey}___${i.act.id}`);
          });
        } else {
          this.diarioSeleccionadas.clear();
        }

        const checkboxes = document.querySelectorAll("#diarioResultadosContenido .chk-item-diario");
        checkboxes.forEach(chk => {
          chk.checked = checked;
          const parentCard = chk.closest(".item-diario-row");
          if (parentCard) {
            parentCard.style.background = checked ? "#f0f9ff" : "#ffffff";
            parentCard.style.borderColor = checked ? "#3b82f6" : "#cbd5e1";
          }
        });

        this.actualizarBarraAccionesDiario();
      }

      actualizarBarraAccionesDiario() {
        if (!this.diarioSeleccionadas) this.diarioSeleccionadas = new Set();
        const count = this.diarioSeleccionadas.size;
        const totalItems = (this.diarioUltimaBusqueda && this.diarioUltimaBusqueda.items) ? this.diarioUltimaBusqueda.items.length : 0;

        const badge = document.getElementById("badgeDiarioSeleccionadasCount");
        if (badge) {
          badge.textContent = `${count} seleccionada(s)`;
          badge.style.display = count > 0 ? "inline-block" : "none";
        }

        const btnDel = document.getElementById("btnEliminarSeleccionadasDiario");
        if (btnDel) {
          btnDel.textContent = `🗑️ Eliminar seleccionadas (${count})`;
          if (count > 0) {
            btnDel.disabled = false;
            btnDel.style.opacity = "1";
            btnDel.style.cursor = "pointer";
          } else {
            btnDel.disabled = true;
            btnDel.style.opacity = "0.5";
            btnDel.style.cursor = "not-allowed";
          }
        }

        const chkTodas = document.getElementById("chkDiarioSeleccionarTodas");
        if (chkTodas) {
          chkTodas.checked = totalItems > 0 && count === totalItems;
        }
      }

      solicitarEliminarMúltipleDiario() {
        if (!this.diarioSeleccionadas) return;
        const keys = Array.from(this.diarioSeleccionadas);
        if (keys.length === 0) {
          this.mostrarToast("⚠️ No has seleccionado ninguna actividad para eliminar.");
          return;
        }

        this.mostrarConfirmacion(
          `¿Estás seguro de que deseas eliminar definitivamente las <strong>${keys.length} actividades seleccionadas</strong>?<br><br>Se borrarán también todas sus calificaciones asociadas y esta acción no se podrá deshacer.`,
          () => {
            if (!this.grupoActivo || !this.grupoActivo.evaluaciones) return;

            keys.forEach(key => {
              const parts = key.split("___");
              const evKey = parts[0];
              const actId = parts[1];

              const evalObj = this.grupoActivo.evaluaciones[evKey];
              if (evalObj) {
                evalObj.actividades = (evalObj.actividades || []).filter(a => a.id !== actId);
                if (evalObj.calificaciones && evalObj.calificaciones[actId]) {
                  delete evalObj.calificaciones[actId];
                }
              }
            });

            this.diarioSeleccionadas.clear();
            this.guardarDatos();
            this.renderizarCuaderno();
            this.actualizarUI();

            if (this.diarioUltimaBusqueda && this.diarioUltimaBusqueda.items) {
              this.diarioUltimaBusqueda.items = this.diarioUltimaBusqueda.items.filter(i => {
                const k = `${i.evKey}___${i.act.id}`;
                return !keys.includes(k);
              });

              this.renderizarResultadosDiarioCronologico(
                this.diarioUltimaBusqueda.items,
                this.diarioUltimaBusqueda.alumnos,
                this.diarioUltimaBusqueda.infoFiltro
              );
            }

            this.mostrarToast(`🗑️ Se han eliminado ${keys.length} actividades correctamente.`);
          }
        );
      }

      actualizarNombreActividadDesdeDiario(evKey, actId, nuevoNombre) {
        const nombreLimpio = (nuevoNombre || "").trim();
        if (!nombreLimpio) {
          this.mostrarToast("⚠️ El nombre de la actividad no puede estar vacío.");
          return;
        }
        if (!this.grupoActivo || !this.grupoActivo.evaluaciones) return;
        const evalObj = this.grupoActivo.evaluaciones[evKey];
        if (!evalObj || !evalObj.actividades) return;

        const act = evalObj.actividades.find(a => a.id === actId);
        if (act) {
          act.nombre = nombreLimpio;
          this.guardarDatos();
          this.renderizarCuaderno();
          this.mostrarToast(`✅ Nombre actualizado a "${nombreLimpio}"`);

          if (this.diarioUltimaBusqueda && this.diarioUltimaBusqueda.items) {
            const item = this.diarioUltimaBusqueda.items.find(i => i.act.id === actId && i.evKey === evKey);
            if (item) {
              item.act.nombre = nombreLimpio;
            }
          }
        }
      }

      solicitarEliminarActividadDesdeDiario(evKey, actId, actNombre) {
        this.mostrarConfirmacion(
          `¿Estás seguro de que deseas eliminar definitivamente la actividad <strong>"${actNombre}"</strong>?<br><br>Se borrarán también todas sus calificaciones asociadas.`,
          () => {
            if (!this.grupoActivo || !this.grupoActivo.evaluaciones) return;
            const evalObj = this.grupoActivo.evaluaciones[evKey];
            if (!evalObj) return;

            evalObj.actividades = (evalObj.actividades || []).filter(a => a.id !== actId);
            if (evalObj.calificaciones && evalObj.calificaciones[actId]) {
              delete evalObj.calificaciones[actId];
            }

            if (this.diarioSeleccionadas) {
              this.diarioSeleccionadas.delete(`${evKey}___${actId}`);
            }

            this.guardarDatos();
            this.renderizarCuaderno();
            this.actualizarUI();

            if (this.diarioUltimaBusqueda) {
              this.diarioUltimaBusqueda.items = this.diarioUltimaBusqueda.items.filter(i => !(i.act.id === actId && i.evKey === evKey));
              this.renderizarResultadosDiarioCronologico(
                this.diarioUltimaBusqueda.items,
                this.diarioUltimaBusqueda.alumnos,
                this.diarioUltimaBusqueda.infoFiltro
              );
            }

            this.mostrarToast(`🗑️ Actividad "${actNombre}" eliminada.`);
          }
        );
      }

      verActividadesDiarioEnTabla() {
        if (!this.diarioUltimaBusqueda || !this.diarioUltimaBusqueda.items) return;
        const { items } = this.diarioUltimaBusqueda;

        if (items.length === 0) {
          this.mostrarToast("⚠️ No hay actividades para mostrar en la tabla.");
          return;
        }

        const actIds = items.map(i => i.act.id);
        this.filtroDiarioActividadesIds = actIds;
        this.filtroFechaActividades = "";

        this.renderizarCuaderno();
        this.cerrarModal("modalDiarioResultados");
        this.mostrarToast(`📋 Mostrando las ${actIds.length} columnas seleccionadas en formato tabla.`);
      }

      limpiarFiltroDiarioColumnas() {
        this.filtroDiarioActividadesIds = null;
        this.renderizarCuaderno();
        this.mostrarToast("📋 Mostrando todas las columnas del cuaderno.");
      }

      imprimirDiarioResultados() {
        if (!this.diarioUltimaBusqueda) return;
        window.print();
      }

      exportarDiarioExcel() {
        if (!this.diarioUltimaBusqueda) return;
        const { items, alumnos } = this.diarioUltimaBusqueda;

        let csv = "Fecha;Tipo;Periodo;Sección;Actividad;Alumno;Nota\n";

        items.forEach(item => {
          const act = item.act;
          alumnos.forEach(alu => {
            const nota = item.calificaciones[alu.id] || "";
            csv += `"${this.sanitizeCsvField(item.fecha)}";"${this.sanitizeCsvField(act.tipo || 'Actividad')}";"${this.sanitizeCsvField(item.evNombre)}";"${this.sanitizeCsvField(item.seccionNombre)}";"${this.sanitizeCsvField(act.nombre)}";"${this.sanitizeCsvField(alu.apellidos + ', ' + alu.nombre)}";"${this.sanitizeCsvField(nota)}"\n`;
          });
        });

        const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const gNombreClean = (this.grupoActivo.nombre || "Grupo").replace(/[^a-zA-Z0-9_\-]/g, "_");
        a.download = `Diario_Actividades_${gNombreClean}_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }

      aplicarFiltroDiarioAlCuadernoPrincipal() {
        this.verActividadesDiarioEnTabla();
      }

      solicitarEliminarActividad(actividadId) {
        const evalData = this.grupoActivo.evaluaciones[this.evaluacionActiva];
        const act = evalData.actividades.find(a => a.id === actividadId);
        if (!act) return;

        this.mostrarConfirmacion(
          `¿Estás seguro de que deseas eliminar la actividad <strong>"${this.escapeHtml(act.nombre)}"</strong>?<br><br>Se borrarán también todas las calificaciones registradas en ella.`,
          () => {
            evalData.actividades = evalData.actividades.filter(a => a.id !== actividadId);
            if (evalData.calificaciones && evalData.calificaciones[actividadId]) {
              delete evalData.calificaciones[actividadId];
            }
            this.guardarDatos();
            this.renderizarCuaderno();
            this.actualizarUI();
          }
        );
      }

      // --- EVALUACIÓN CON RÚBRICA ---
      abrirCalificarRubrica(act, alu) {
        if (!this.grupoActivo) return;

        let rub = null;
        if (act && act.rubricaId) {
          rub = (this.grupoActivo.rubricas || []).find(r => r.id === act.rubricaId);
        }

        // Si la actividad no tiene rubricaId o no se encontró por ID, intentar buscar por coincidencia de título
        if (!rub && act && act.nombre) {
          rub = (this.grupoActivo.rubricas || []).find(r => r.titulo === act.nombre || (r.titulo && r.titulo.toLowerCase() === act.nombre.toLowerCase()));
          if (rub && act) {
            act.rubricaId = rub.id;
            this.guardarDatos();
          }
        }

        // Si aún no hay rúbrica y solo existe 1 rúbrica en el grupo
        if (!rub && this.grupoActivo.rubricas && this.grupoActivo.rubricas.length === 1) {
          rub = this.grupoActivo.rubricas[0];
          if (act) {
            act.rubricaId = rub.id;
            this.guardarDatos();
          }
        }

        if (!rub) {
          alert("Esta actividad no tiene una rúbrica asociada.");
          return;
        }

        const alumnoId = alu ? alu.id : null;
        this.abrirEvaluarRubrica(rub.id, alumnoId);
      }

      actualizarNotaRubricaCalculada() {
        if (!this.rubricaEvaluando) return;
        const rub = this.rubricaEvaluando.rubrica;
        let suma = 0;
        let pesoTotal = 0;

        (rub.aspectos || []).forEach((asp, aIdx) => {
          const nIdx = this.rubricaEvaluando.selecciones[aIdx];
          if (nIdx !== undefined) {
            const puntos = asp.niveles[nIdx].puntos;
            suma += (puntos * asp.peso);
            pesoTotal += asp.peso;
          }
        });

        const nota = pesoTotal > 0 ? (suma / pesoTotal) : 0;
        document.getElementById("rubricaNotaCalculada").textContent = nota.toFixed(2);
      }

      guardarNotaRubrica() {
        if (!this.rubricaEvaluando) return;
        const nota = parseFloat(document.getElementById("rubricaNotaCalculada").textContent);
        this.guardarCalificacion(this.rubricaEvaluando.actividadId, this.rubricaEvaluando.alumnoId, nota);
        this.cerrarModal("modalCalificarRubrica");
      }

      // --- CONFIGURACIÓN DE SECCIONES ---
      abrirModalEditarSeccion(seccionId) {
        const sec = this.grupoActivo.secciones.find(s => s.id === seccionId);
        if (!sec) return;

        document.getElementById("modalSeccionTitulo").textContent = `Configurar: ${sec.nombre}`;
        document.getElementById("seccionIdxEdit").value = sec.id;
        document.getElementById("secNombre").value = sec.nombre;
        document.getElementById("secColor").value = sec.color;

        const box = document.getElementById("secCriteriosChecks");
        box.innerHTML = "";
        const criterios = this.grupoActivo.criterios || [];

        const actualizarSumaModal = () => {
          const chks = box.querySelectorAll("input[type='checkbox']:checked");
          let suma = 0;
          chks.forEach(chk => {
            const crit = criterios.find(c => c.codigo === chk.value);
            suma += Number(crit ? crit.ponderacion || 0 : 0);
          });
          document.getElementById("secPonderacion").value = suma;
        };

        criterios.forEach(crit => {
          const label = document.createElement("label");
          label.style.display = "flex";
          label.style.alignItems = "center";
          label.style.gap = "6px";
          label.style.fontSize = "0.82rem";
          label.style.marginBottom = "4px";
          label.style.cursor = "pointer";

          const chk = document.createElement("input");
          chk.type = "checkbox";
          chk.value = crit.codigo;
          if (sec.criterios && sec.criterios.includes(crit.codigo)) chk.checked = true;
          chk.onchange = actualizarSumaModal;

          label.appendChild(chk);
          label.appendChild(document.createTextNode(`${crit.codigo} (${crit.ponderacion || 0}%) - ${crit.descripcion.substring(0, 50)}...`));
          box.appendChild(label);
        });

        actualizarSumaModal();
        this.abrirModal("modalSeccion");
      }

      recalcularPonderacionesSecciones() {
        if (!this.grupoActivo || !this.grupoActivo.secciones) return;
        const critMap = {};
        (this.grupoActivo.criterios || []).forEach(c => {
          critMap[c.codigo] = Number(c.ponderacion || 0);
        });
        this.grupoActivo.secciones.forEach(sec => {
          if (sec.criterios && sec.criterios.length > 0) {
            sec.ponderacion = sec.criterios.reduce((sum, cod) => sum + (critMap[cod] !== undefined ? critMap[cod] : 0), 0);
          } else {
            sec.ponderacion = 0;
          }
        });
      }

      guardarSeccion() {
        const secId = document.getElementById("seccionIdxEdit").value;
        const nombre = document.getElementById("secNombre").value.trim();
        const color = document.getElementById("secColor").value || "#2563eb";

        if (!nombre) {
          alert("Por favor, indica un nombre para la sección.");
          return;
        }

        const chks = document.querySelectorAll("#secCriteriosChecks input[type='checkbox']:checked");
        const criteriosSel = Array.from(chks).map(c => c.value);

        if (!this.grupoActivo.secciones) this.grupoActivo.secciones = [];

        if (secId) {
          const sec = this.grupoActivo.secciones.find(s => s.id === secId);
          if (sec) {
            sec.nombre = nombre;
            sec.color = color;
            sec.criterios = criteriosSel;
          }
        } else {
          const nuevaSec = {
            id: "sec-" + Date.now(),
            nombre: nombre,
            color: color,
            ponderacion: 0,
            criterios: criteriosSel
          };
          this.grupoActivo.secciones.push(nuevaSec);
        }

        // Recalcular automáticamente el peso de la sección a partir de los criterios seleccionados
        this.recalcularPonderacionesSecciones();

        this.guardarDatos();
        this.cerrarModal("modalSeccion");
        this.actualizarUI();
      }

      // --- PÁGINA 3: SUB-CONFIGURACIONES ---
      cambiarSubConfig(sub) {
        this.subConfigActiva = sub;
        document.querySelectorAll(".config-nav .config-nav-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".config-section").forEach(s => s.classList.remove("active"));

        const navBtns = document.querySelectorAll(".config-nav .config-nav-btn");

        if (sub === "cursos") {
          if (navBtns[0]) navBtns[0].classList.add("active");
          document.getElementById("cfgCursos").classList.add("active");
          this.renderizarListaCursos();
        } else if (sub === "alumnos") {
          if (navBtns[1]) navBtns[1].classList.add("active");
          document.getElementById("cfgAlumnos").classList.add("active");
          this.renderizarListaAlumnos();
        } else if (sub === "criterios") {
          if (navBtns[2]) navBtns[2].classList.add("active");
          document.getElementById("cfgCriterios").classList.add("active");
          this.renderizarListaCriterios();
        } else if (sub === "secciones") {
          if (navBtns[3]) navBtns[3].classList.add("active");
          document.getElementById("cfgSecciones").classList.add("active");
          this.renderizarListaSecciones();
        } else if (sub === "rubricas") {
          if (navBtns[4]) navBtns[4].classList.add("active");
          document.getElementById("cfgRubricas").classList.add("active");
          this.renderizarListaRubricas();
        } else if (sub === "copias") {
          if (navBtns[5]) navBtns[5].classList.add("active");
          document.getElementById("cfgCopias").classList.add("active");
        } else if (sub === "nube") {
          if (navBtns[6]) navBtns[6].classList.add("active");
          document.getElementById("cfgNube").classList.add("active");
          this.renderizarConfiguracionNube();
        } else if (sub === "ajustes") {
          if (navBtns[7]) navBtns[7].classList.add("active");
          document.getElementById("cfgAjustes").classList.add("active");
          this.renderizarAjustesEvaluaciones();
        } else if (sub === "premios") {
          if (navBtns[8]) navBtns[8].classList.add("active");
          document.getElementById("cfgPremios").classList.add("active");
          this.renderizarDashboardComportamientoPremios();
          this.renderizarListaPremios();
        } else if (sub === "camara") {
          if (navBtns[9]) navBtns[9].classList.add("active");
          const cfgC = document.getElementById("cfgCamara");
          if (cfgC) cfgC.classList.add("active");
          this.actualizarUIConfigCamara();
        }
      }

      renderizarAjustesEvaluaciones() {
        const cont = document.getElementById("cfgAjustesContenido");
        if (!cont) return;

        if (!this.grupoActivo) {
          cont.innerHTML = `<div class="alert-box alert-warning" style="grid-column: 1 / -1;">⚠️ No hay ningún grupo de alumnos seleccionado. Selecciona un grupo en "1. Grupos" para configurar sus periodos de evaluación.</div>`;
          return;
        }

        if (!this.grupoActivo.periodosEvaluacion) {
          this.grupoActivo.periodosEvaluacion = {
            eval1: { nombre: "1ª Evaluación", inicio: "", fin: "" },
            eval2: { nombre: "2ª Evaluación", inicio: "", fin: "" },
            eval3: { nombre: "3ª Evaluación", inicio: "", fin: "" },
            final: { nombre: "Evaluación Final", inicio: "", fin: "" }
          };
        }

        const periodosDef = [
          { key: "eval1", nombre: "1ª Evaluación", icon: "📅", color: "#2563eb", bg: "#eff6ff" },
          { key: "eval2", nombre: "2ª Evaluación", icon: "📅", color: "#059669", bg: "#ecfdf5" },
          { key: "eval3", nombre: "3ª Evaluación", icon: "📅", color: "#d97706", bg: "#fffbeb" },
          { key: "final", nombre: "Evaluación Final", icon: "🏆", color: "#7c3aed", bg: "#f5f3ff" }
        ];

        let html = "";
        periodosDef.forEach(p => {
          const pData = this.grupoActivo.periodosEvaluacion[p.key] || { inicio: "", fin: "" };
          const inicio = pData.inicio || "";
          const fin = pData.fin || "";

          let resumenDuracion = "";
          if (inicio && fin) {
            const d1 = new Date(inicio);
            const d2 = new Date(fin);
            if (!isNaN(d1) && !isNaN(d2)) {
              const diffTime = d2.getTime() - d1.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)) + 1;
              if (diffDays > 0) {
                resumenDuracion = `✓ Duración: ${diffDays} días (${this.formatearFecha(inicio)} al ${this.formatearFecha(fin)})`;
              } else {
                resumenDuracion = `⚠️ La fecha de fin es anterior a la fecha de inicio`;
              }
            }
          } else if (inicio) {
            resumenDuracion = `Inicio: ${this.formatearFecha(inicio)} (Sin fecha de fin)`;
          } else if (fin) {
            resumenDuracion = `Fin: ${this.formatearFecha(fin)} (Sin fecha de inicio)`;
          }

          html += `
            <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 14px; border-top: 4px solid ${p.color}; transition: all 0.2s;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 800; font-size: 1.02rem; color: #0f172a; display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 1.2rem;">${p.icon}</span> ${p.nombre}
                </span>
                ${(inicio || fin) ? `
                  <button type="button" class="btn btn-xs btn-gray" onclick="app.limpiarFechasPeriodo('${p.key}')" style="font-size: 0.75rem; padding: 3px 8px; border-radius: 6px;" title="Limpiar fechas de este periodo">
                    🧹 Limpiar
                  </button>
                ` : ''}
              </div>

              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.82rem; font-weight: 700; color: #475569; display: flex; align-items: center; gap: 6px;">
                  <span>📅 Fecha de Inicio:</span>
                </label>
                <input type="date"
                       class="form-control"
                       value="${inicio}"
                       onchange="app.guardarFechaPeriodoEvaluacion('${p.key}', 'inicio', this.value)"
                       style="font-weight: 700; color: #1e293b; padding: 8px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; width: 100%; box-sizing: border-box; font-size: 0.9rem; cursor: pointer;"
                       title="Pulsa para marcar la fecha en el calendario" />
              </div>

              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.82rem; font-weight: 700; color: #475569; display: flex; align-items: center; gap: 6px;">
                  <span>🏁 Fecha de Fin:</span>
                </label>
                <input type="date"
                       class="form-control"
                       value="${fin}"
                       onchange="app.guardarFechaPeriodoEvaluacion('${p.key}', 'fin', this.value)"
                       style="font-weight: 700; color: #1e293b; padding: 8px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; width: 100%; box-sizing: border-box; font-size: 0.9rem; cursor: pointer;"
                       title="Pulsa para marcar la fecha en el calendario" />
              </div>

              ${resumenDuracion ? `
                <div style="font-size: 0.78rem; font-weight: 700; color: ${resumenDuracion.includes('⚠️') ? '#dc2626' : '#059669'}; background: ${resumenDuracion.includes('⚠️') ? '#fef2f2' : p.bg}; padding: 7px 10px; border-radius: 6px; border: 1px solid ${resumenDuracion.includes('⚠️') ? '#fecaca' : p.color + '40'}; text-align: center;">
                  ${resumenDuracion}
                </div>
              ` : `
                <div style="font-size: 0.78rem; color: #94a3b8; text-align: center; font-style: italic; padding: 4px;">
                  Sin fechas definidas (marca en el calendario)
                </div>
              `}
            </div>
          `;
        });

        cont.innerHTML = html;
      }

      guardarFechaPeriodoEvaluacion(evKey, campo, valor) {
        if (!this.grupoActivo) return;
        if (!this.grupoActivo.periodosEvaluacion) {
          this.grupoActivo.periodosEvaluacion = {};
        }
        if (!this.grupoActivo.periodosEvaluacion[evKey]) {
          this.grupoActivo.periodosEvaluacion[evKey] = { inicio: "", fin: "" };
        }

        this.grupoActivo.periodosEvaluacion[evKey][campo] = valor;
        this.guardarDatos();
        this.renderizarAjustesEvaluaciones();

        const nomEval = evKey === "eval1" ? "1ª Evaluación" : (evKey === "eval2" ? "2ª Evaluación" : (evKey === "eval3" ? "3ª Evaluación" : "Evaluación Final"));
        const nomCampo = campo === "inicio" ? "Fecha de inicio" : "Fecha de fin";
        this.mostrarToast(`✅ ${nomCampo} de ${nomEval} guardada automáticamente.`);
      }

      limpiarFechasPeriodo(evKey) {
        if (!this.grupoActivo || !this.grupoActivo.periodosEvaluacion || !this.grupoActivo.periodosEvaluacion[evKey]) return;
        this.grupoActivo.periodosEvaluacion[evKey].inicio = "";
        this.grupoActivo.periodosEvaluacion[evKey].fin = "";
        this.guardarDatos();
        this.renderizarAjustesEvaluaciones();
        this.mostrarToast("🧹 Fechas del periodo eliminadas.");
      }

      establecerFechasCursoPredeterminadas() {
        if (!this.grupoActivo) return;
        this.grupoActivo.periodosEvaluacion = {
          eval1: { inicio: "2025-09-10", fin: "2025-12-22" },
          eval2: { inicio: "2026-01-08", fin: "2026-03-27" },
          eval3: { inicio: "2026-04-06", fin: "2026-06-22" },
          final: { inicio: "2025-09-10", fin: "2026-06-30" }
        };
        this.guardarDatos();
        this.renderizarAjustesEvaluaciones();
        this.mostrarToast("🗓️ Calendario escolar predeterminado (2025-2026) aplicado.");
      }

      // --- PÁGINA 9: PREMIOS Y AVISOS AUTOMÁTICOS ---
      renderizarListaPremios() {
        const cont = document.getElementById("listaPremiosContenido");
        const recuento = document.getElementById("recuentoPremios");
        if (!cont) return;

        if (!this.data.premios || !Array.isArray(this.data.premios)) {
          this.data.premios = JSON.parse(JSON.stringify(PREMIOS_DEFAULT));
        }

        const items = this.data.premios;
        if (recuento) {
          recuento.textContent = `${items.length} regla(s) configurada(s)`;
        }

        if (items.length === 0) {
          cont.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: #ffffff; border: 2px dashed #cbd5e1; border-radius: 12px; color: #64748b;">
              <div style="font-size: 2.5rem; margin-bottom: 8px;">🏆</div>
              <p style="font-weight: 700; margin-bottom: 4px; color: #334155;">No hay reglas de premios ni avisos configuradas.</p>
              <p style="font-size: 0.85rem; margin-bottom: 12px;">Haz clic en «Añadir Nuevo Premio / Aviso» para crear una regla automática.</p>
              <button class="btn btn-primary btn-sm" onclick="app.modalNuevoPremio()">➕ Crear Primera Regla</button>
            </div>
          `;
          return;
        }

        let html = "";
        items.forEach(p => {
          const esPremio = p.tipo === "premio";
          const bgHeader = esPremio ? "linear-gradient(135deg, #059669, #10b981)" : "linear-gradient(135deg, #dc2626, #ef4444)";
          const iconHeader = esPremio ? "🏆" : "⚠️";
          const badgeBg = p.activo !== false ? "#dcfce7" : "#f1f5f9";
          const badgeTxt = p.activo !== false ? "#166534" : "#64748b";

          html += `
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
              <div style="background: ${bgHeader}; padding: 12px 16px; color: white; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 0.95rem;">
                  <span style="font-size: 1.2rem;">${iconHeader}</span>
                  <span>${this.escapeHtml(p.titulo || "Regla de Premio / Aviso")}</span>
                </div>
                <span style="background: ${badgeBg}; color: ${badgeTxt}; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 20px;">
                  ${p.activo !== false ? "ACTIVO" : "INACTIVO"}
                </span>
              </div>
              <div style="padding: 16px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 12px;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <div style="display: flex; gap: 12px; font-size: 0.85rem; color: #475569; flex-wrap: wrap;">
                    <span style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 4px 10px; border-radius: 6px;">
                      <strong>Nota requerida:</strong> ${p.puntuacion} pts
                    </span>
                    <span style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 4px 10px; border-radius: 6px;">
                      <strong>Días / Calificaciones:</strong> ${p.diasConsecutivos} seguidos
                    </span>
                  </div>
                  <div style="background: #f8fafc; border-left: 4px solid ${esPremio ? "#10b981" : "#ef4444"}; padding: 10px 12px; border-radius: 0 8px 8px 0; font-size: 0.88rem; color: #1e293b; line-height: 1.45;">
                    <strong>Mensaje:</strong> "${this.escapeHtml(p.mensaje)}"
                  </div>
                </div>
                <div style="display: flex; gap: 8px; justify-content: flex-end; border-top: 1px solid #f1f5f9; padding-top: 12px; margin-top: 4px;">
                  <button class="btn btn-secondary btn-xs" onclick="app.probandoPremio('${p.id}')" title="Ver qué alumnos cumplen esta regla" style="font-size: 0.75rem; padding: 4px 8px;">
                    👁️ Probar
                  </button>
                  <button class="btn btn-secondary btn-xs" onclick="app.modalEditarPremio('${p.id}')" style="font-size: 0.75rem; padding: 4px 8px;">
                    ✏️ Editar
                  </button>
                  <button class="btn btn-danger btn-xs" onclick="app.solicitarEliminarPremio('${p.id}')" style="font-size: 0.75rem; padding: 4px 8px;">
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          `;
        });

        cont.innerHTML = html;
      }

      modalNuevoPremio() {
        const header = document.getElementById("modalPremioTituloHeader");
        if (header) header.textContent = "🏆 Nuevo Premio / Aviso Automático";

        document.getElementById("premioId").value = "";
        document.getElementById("premioTitulo").value = "";
        document.getElementById("premioTipo").value = "premio";
        document.getElementById("premioPuntuacion").value = "10";
        document.getElementById("premioDias").value = "3";
        document.getElementById("premioActivo").checked = true;
        document.getElementById("premioMensaje").value = "¡Premio! Tres días seguidos con las tareas hechas!";

        this.abrirModal("modalPremio");
      }

      modalEditarPremio(id) {
        if (!this.data.premios) return;
        const p = this.data.premios.find(x => x.id === id);
        if (!p) return;

        const header = document.getElementById("modalPremioTituloHeader");
        if (header) header.textContent = "✏️ Editar Regla de Premio / Aviso";

        document.getElementById("premioId").value = p.id;
        document.getElementById("premioTitulo").value = p.titulo || "";
        document.getElementById("premioTipo").value = p.tipo || "premio";
        document.getElementById("premioPuntuacion").value = p.puntuacion !== undefined ? p.puntuacion : 10;
        document.getElementById("premioDias").value = p.diasConsecutivos || 3;
        document.getElementById("premioActivo").checked = p.activo !== false;
        document.getElementById("premioMensaje").value = p.mensaje || "";

        this.abrirModal("modalPremio");
      }

      guardarPremio() {
        const id = document.getElementById("premioId").value;
        const titulo = document.getElementById("premioTitulo").value.trim();
        const tipo = document.getElementById("premioTipo").value;
        const puntuacionVal = parseFloat(document.getElementById("premioPuntuacion").value);
        const diasVal = parseInt(document.getElementById("premioDias").value, 10);
        const mensaje = document.getElementById("premioMensaje").value.trim();
        const activo = document.getElementById("premioActivo").checked;

        if (!titulo) {
          alert("Por favor, introduce un título para la regla.");
          return;
        }
        if (isNaN(puntuacionVal)) {
          alert("Por favor, introduce una puntuación numérica válida.");
          return;
        }
        if (isNaN(diasVal) || diasVal < 1) {
          alert("Por favor, introduce un número válido de días o calificaciones consecutivas.");
          return;
        }
        if (!mensaje) {
          alert("Por favor, introduce el mensaje que se mostrará.");
          return;
        }

        if (!this.data.premios) this.data.premios = [];

        if (id) {
          const idx = this.data.premios.findIndex(x => x.id === id);
          if (idx !== -1) {
            this.data.premios[idx] = {
              id,
              titulo,
              tipo,
              puntuacion: puntuacionVal,
              diasConsecutivos: diasVal,
              mensaje,
              activo
            };
          }
        } else {
          const nuevoId = "premio-" + Date.now();
          this.data.premios.push({
            id: nuevoId,
            titulo,
            tipo,
            puntuacion: puntuacionVal,
            diasConsecutivos: diasVal,
            mensaje,
            activo
          });
        }

        this.guardarDatos();
        this.cerrarModal("modalPremio");
        this.renderizarListaPremios();
        if (this.vistaActiva === "cuaderno") this.renderizarCuaderno();
        this.mostrarToast("💾 Regla de premio/aviso guardada correctamente.");
      }

      solicitarEliminarPremio(id) {
        if (!this.data.premios) return;
        const p = this.data.premios.find(x => x.id === id);
        if (!p) return;

        this.mostrarConfirmacion(
          `¿Estás seguro de que deseas eliminar la regla "${this.escapeHtml(p.titulo)}"?`,
          () => {
            this.data.premios = this.data.premios.filter(x => x.id !== id);
            this.guardarDatos();
            this.renderizarListaPremios();
            this.actualizarUI();
            this.mostrarToast("🗑️ Regla de premio/aviso eliminada.");
          },
          "Eliminar"
        );
      }

      restablecerPremiosEjemplo() {
        this.mostrarConfirmacion(
          "¿Deseas restablecer las reglas de premios y avisos predeterminadas?",
          () => {
            this.data.premios = JSON.parse(JSON.stringify(PREMIOS_DEFAULT));
            this.guardarDatos();
            this.renderizarListaPremios();
            if (this.vistaActiva === "cuaderno") this.renderizarCuaderno();
            this.mostrarToast("🔄 Ejemplos de premios y avisos restablecidos.");
          },
          "Restablecer"
        );
      }

      probandoPremio(premioId) {
        if (!this.grupoActivo || !this.grupoActivo.alumnos) return;
        const alusCoincidentes = [];
        this.grupoActivo.alumnos.forEach(alu => {
          const premios = this.obtenerPremiosAlumno(alu.id);
          const tiene = premios.find(p => p.rule.id === premioId);
          if (tiene) {
            alusCoincidentes.push({ alu, premio: tiene });
          }
        });

        const rule = (this.data.premios || []).find(r => r.id === premioId);
        const tit = rule ? rule.titulo : "Regla";

        if (alusCoincidentes.length === 0) {
          alert(`En el grupo activo (${this.grupoActivo.nombre}), ningún alumno cumple actualmente la regla "${tit}".`);
        } else {
          const nombres = alusCoincidentes.map(x => `• ${x.alu.nombre}`).join("\n");
          alert(`Alumnos que cumplen actualmente "${tit}" (${alusCoincidentes.length}):\n\n${nombres}`);
        }
      }

      obtenerPremiosAlumno(aluId, grupo = this.grupoActivo) {
        if (!grupo || !this.data) return [];
        if (!this.data.premios || !Array.isArray(this.data.premios)) {
          this.data.premios = JSON.parse(JSON.stringify(PREMIOS_DEFAULT));
        }
        const reglas = this.data.premios.filter(r => r && r.activo !== false);
        if (reglas.length === 0) return [];

        const evalKeys = ["eval1", "eval2", "eval3"];
        let lista = [];

        evalKeys.forEach(evKey => {
          const evData = grupo.evaluaciones ? grupo.evaluaciones[evKey] : null;
          if (!evData || !evData.actividades || !evData.calificaciones) return;

          evData.actividades.forEach(act => {
            const califs = evData.calificaciones[act.id];
            if (califs && califs[aluId] !== undefined && califs[aluId] !== null && califs[aluId] !== "") {
              const val = Number(califs[aluId]);
              if (!isNaN(val)) {
                const fechaStr = act.fecha || act.fechaCreacion || new Date().toISOString().split("T")[0];
                lista.push({
                  actId: act.id,
                  actNombre: act.nombre,
                  fecha: fechaStr,
                  grade: val,
                  evKey
                });
              }
            }
          });
        });

        if (lista.length === 0) return [];

        // Ordenar cronológicamente
        lista.sort((a, b) => a.fecha.localeCompare(b.fecha) || a.actId.localeCompare(b.actId));

        const result = [];

        reglas.forEach(rule => {
          const targetScore = Number(rule.puntuacion);
          const reqDays = Number(rule.diasConsecutivos) || 3;

          let currentStreak = [];
          let streakDates = new Set();

          for (let i = 0; i < lista.length; i++) {
            const item = lista[i];
            if (Math.abs(item.grade - targetScore) < 0.01) {
              currentStreak.push(item);
              streakDates.add(item.fecha);

              if (streakDates.size >= reqDays) {
                result.push({
                  rule,
                  mensaje: rule.mensaje,
                  titulo: rule.titulo,
                  tipo: rule.tipo,
                  items: [...currentStreak]
                });
                break;
              }
            } else {
              currentStreak = [];
              streakDates = new Set();
            }
          }
        });

        return result;
      }

      verPremiosAlumnoModal(aluId) {
        if (!this.grupoActivo || !this.grupoActivo.alumnos) return;
        const alu = this.grupoActivo.alumnos.find(a => a.id === aluId);
        if (!alu) return;

        const premios = this.obtenerPremiosAlumno(aluId);
        const header = document.getElementById("modalVerPremiosAlumnoHeader");
        const body = document.getElementById("modalVerPremiosAlumnoBody");

        if (header) header.textContent = `🏆 Prestigio y Avisos: ${alu.nombre}`;

        if (!body) return;

        if (premios.length === 0) {
          body.innerHTML = `
            <div style="text-align: center; padding: 24px; color: #64748b;">
              <div style="font-size: 2rem; margin-bottom: 8px;">✨</div>
              <p style="font-weight: 700;">Este alumno no tiene premios ni avisos acumulados actualmente.</p>
            </div>
          `;
        } else {
          let html = `<div style="display: flex; flex-direction: column; gap: 12px;">`;
          premios.forEach(p => {
            const esPremio = p.tipo === "premio";
            const borderCol = esPremio ? "#10b981" : "#ef4444";
            const bgCol = esPremio ? "#ecfdf5" : "#fef2f2";
            const icon = esPremio ? "🏆" : "⚠️";

            let actList = p.items.map(x => `<li><strong>${x.fecha}:</strong> ${this.escapeHtml(x.actNombre)} (Nota: ${x.grade})</li>`).join("");

            html += `
              <div style="background: ${bgCol}; border-left: 4px solid ${borderCol}; border-radius: 8px; padding: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="font-weight: 800; font-size: 0.95rem; color: #1e293b; display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                  <span>${icon}</span>
                  <span>${this.escapeHtml(p.titulo || "Premio / Aviso")}</span>
                </div>
                <div style="font-size: 0.9rem; font-weight: 700; color: ${esPremio ? '#065f46' : '#991b1b'}; margin-bottom: 8px; background: rgba(255,255,255,0.7); padding: 8px; border-radius: 6px;">
                  "${this.escapeHtml(p.mensaje)}"
                </div>
                <div style="font-size: 0.8rem; color: #475569;">
                  <strong>Actividades consecutivas detectadas:</strong>
                  <ul style="margin: 4px 0 0 16px; padding: 0; line-height: 1.4;">
                    ${actList}
                  </ul>
                </div>
              </div>
            `;
          });
          html += `</div>`;
          body.innerHTML = html;
        }

        this.abrirModal("modalVerPremiosAlumno");
      }

      comprobarPremiosRealTime(aluId) {
        const premios = this.obtenerPremiosAlumno(aluId);
        if (premios.length > 0) {
          const alu = (this.grupoActivo.alumnos || []).find(a => a.id === aluId);
          const nombreAlu = alu ? alu.nombre : "El alumno";
          premios.forEach(p => {
            const sessionKey = `premio_notif_${p.rule.id}_${aluId}`;
            if (!sessionStorage.getItem(sessionKey)) {
              sessionStorage.setItem(sessionKey, "true");
              const icon = p.tipo === "premio" ? "🏆" : "⚠️";
              this.mostrarModalMensajePremio(icon, p.tipo, `${icon} ${nombreAlu}`, p.mensaje);
            }
          });
        }
      }

      mostrarModalMensajePremio(icon, tipo, titulo, mensaje) {
        const header = document.getElementById("modalNotifPremioHeader");
        const body = document.getElementById("modalNotifPremioBody");
        if (header) header.textContent = titulo;
        if (body) {
          const esPremio = tipo === "premio";
          body.innerHTML = `
            <div style="text-align: center; padding: 10px 0;">
              <div style="font-size: 3.5rem; margin-bottom: 12px; animation: bounce 1s infinite;">${icon}</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: ${esPremio ? '#059669' : '#dc2626'}; line-height: 1.4; background: ${esPremio ? '#f0fdf4' : '#fef2f2'}; border: 2px solid ${esPremio ? '#bbf7d0' : '#fecaca'}; border-radius: 12px; padding: 16px;">
                "${this.escapeHtml(mensaje)}"
              </div>
            </div>
          `;
        }
        this.abrirModal("modalNotifPremio");
      }

      // --- CONTROL DE COMPORTAMIENTO E INCIDENCIAS ---

      calcularPuntosAlumno(aluId, grupo = this.grupoActivo) {
        if (!grupo) {
          return {
            activePoints: 0,
            rawPoints: 0,
            levesCount: 0,
            gravesCount: 0,
            positivasCount: 0,
            tieneAmonestacion: false,
            level: "verde",
            badge: { color: "#166534", bg: "#dcfce7", border: "#86efac", label: "0 pts", text: "Excelente (0 pts)" },
            validIncidencias: [],
            totalIncidencias: 0
          };
        }

        const config = grupo.incidenciasConfig || { vencimiento: "30d" };
        const vencimiento = config.vencimiento || "30d";
        const todas = (grupo.incidencias || []).filter(inc => inc.alumnoId === aluId);

        const ahoraMs = Date.now();
        const validIncidencias = todas.filter(inc => {
          if (!inc.fecha) return true;
          const fechaMs = new Date(inc.fecha).getTime();
          if (isNaN(fechaMs)) return true;

          if (vencimiento === "30d") {
            return (ahoraMs - fechaMs) <= (30 * 24 * 60 * 60 * 1000);
          } else if (vencimiento === "90d") {
            return (ahoraMs - fechaMs) <= (90 * 24 * 60 * 60 * 1000);
          } else if (vencimiento === "evaluacion") {
            return !inc.evaluacionKey || inc.evaluacionKey === this.evaluacionActiva;
          }
          return true; // "nunca"
        });

        let rawPoints = 0;
        let levesCount = 0;
        let gravesCount = 0;
        let positivasCount = 0;

        validIncidencias.forEach(inc => {
          const pts = Number(inc.puntos) || (inc.tipo === "grave" ? 2 : inc.tipo === "leve" ? 1 : -1);
          rawPoints += pts;
          if (inc.tipo === "leve") levesCount++;
          else if (inc.tipo === "grave") gravesCount++;
          else if (inc.tipo === "positiva") positivasCount++;
        });

        const activePoints = Math.max(0, rawPoints);
        let level = "verde";
        let badge = { color: "#166534", bg: "#dcfce7", border: "#86efac", label: "0 pts", text: "Sin faltas (0 pts)" };

        if (activePoints === 1) {
          level = "amarillo";
          badge = { color: "#854d0e", bg: "#fef9c3", border: "#fef08a", label: "1 pt", text: "Falta leve (1 pt)" };
        } else if (activePoints === 2) {
          level = "naranja";
          badge = { color: "#9a3412", bg: "#ffedd5", border: "#fed7aa", label: "2 pts", text: "Falta grave / Riesgo (2 pts)" };
        } else if (activePoints >= 3) {
          level = "rojo";
          badge = { color: "#991b1b", bg: "#fee2e2", border: "#fca5a5", label: `${activePoints} pts ⚠️`, text: `AMONESTACIÓN ESCRITA (${activePoints} pts)` };
        }

        return {
          activePoints,
          rawPoints,
          levesCount,
          gravesCount,
          positivasCount,
          tieneAmonestacion: activePoints >= 3,
          level,
          badge,
          validIncidencias,
          totalIncidencias: todas.length
        };
      }

      obtenerBadgeComportamientoHtml(aluId) {
        const stats = this.calcularPuntosAlumno(aluId);
        if (!stats || stats.activePoints === 0) return "";
        const b = stats.badge;
        let cardIcon = "🟨";
        if (stats.activePoints === 2) cardIcon = "🟧";
        else if (stats.activePoints >= 3) cardIcon = "🟥";

        return `<span onclick="event.stopPropagation(); app.abrirIncidenciasAlumnoModal('${aluId}')" title="Control de Comportamiento: ${this.escapeHtml(b.text)}" style="cursor: pointer; font-size: 0.95rem; line-height: 1; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;" aria-label="${this.escapeHtml(b.text)}">${cardIcon}</span>`;
      }

      abrirIncidenciasAlumnoModal(aluId) {
        if (!this.grupoActivo || !this.grupoActivo.alumnos) return;
        const alu = this.grupoActivo.alumnos.find(a => a.id === aluId);
        if (!alu) return;

        const inputId = document.getElementById("modalIncidenciasAlumnoId");
        if (inputId) inputId.value = aluId;

        const titleEl = document.getElementById("modalIncidenciasAlumnoNombre");
        if (titleEl) titleEl.textContent = `📋 Control de Comportamiento: ${alu.nombre}`;

        const fechaEl = document.getElementById("inputFechaIncidencia");
        if (fechaEl) fechaEl.value = new Date().toISOString().substring(0, 10);

        const commEl = document.getElementById("inputComentarioIncidencia");
        if (commEl) commEl.value = "";

        const radioLeve = document.querySelector('input[name="radioTipoIncidencia"][value="leve"]');
        if (radioLeve) radioLeve.checked = true;

        this.renderizarModalIncidencias();
        this.abrirModal("modalIncidenciasAlumno");
      }

      renderizarModalIncidencias() {
        const inputId = document.getElementById("modalIncidenciasAlumnoId");
        if (!inputId || !inputId.value || !this.grupoActivo || !this.grupoActivo.alumnos) return;
        const aluId = inputId.value;

        const alu = this.grupoActivo.alumnos.find(a => a.id === aluId);
        if (!alu) return;

        const stats = this.calcularPuntosAlumno(aluId);
        const headerCont = document.getElementById("modalIncidenciasResumenHeader");
        const historyCont = document.getElementById("containerHistorialIncidenciasAlumno");

        if (headerCont) {
          const b = stats.badge;
          const amonestacionBanner = stats.tieneAmonestacion
            ? `<div style="margin-top: 10px; background: #fee2e2; border: 2px solid #ef4444; color: #991b1b; padding: 10px 14px; border-radius: 8px; font-weight: 800; font-size: 0.88rem; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.2rem;">🚨</span>
                <span>AMONESTACIÓN ESCRITA ACUMULADA: El alumno ha alcanzado ${stats.activePoints} puntos acumulados. Se recomienda notificación o reunión con tutores legales.</span>
               </div>`
            : "";

          headerCont.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
              <div>
                <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Estado de Conducta</span>
                <h4 style="margin: 2px 0 0 0; font-size: 1.2rem; color: #0f172a; font-weight: 800;">${this.escapeHtml(alu.nombre)}</h4>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="background: ${b.bg}; color: ${b.color}; border: 1.5px solid ${b.border}; font-size: 1rem; font-weight: 800; padding: 6px 14px; border-radius: 20px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                  ${b.label} — ${b.text}
                </span>
              </div>
            </div>
            <div style="display: flex; gap: 12px; margin-top: 12px; font-size: 0.82rem; color: #334155; flex-wrap: wrap;">
              <span style="background: white; border: 1px solid #e2e8f0; padding: 3px 8px; border-radius: 6px;">
                <strong>Faltas leves (+1):</strong> ${stats.levesCount}
              </span>
              <span style="background: white; border: 1px solid #e2e8f0; padding: 3px 8px; border-radius: 6px;">
                <strong>Faltas graves (+2):</strong> ${stats.gravesCount}
              </span>
              <span style="background: white; border: 1px solid #e2e8f0; padding: 3px 8px; border-radius: 6px;">
                <strong>Conductas positivas (-1):</strong> ${stats.positivasCount}
              </span>
              <span style="background: white; border: 1px solid #e2e8f0; padding: 3px 8px; border-radius: 6px;">
                <strong>Total registros:</strong> ${stats.totalIncidencias}
              </span>
            </div>
            ${amonestacionBanner}
          `;
        }

        if (historyCont) {
          const todas = (this.grupoActivo.incidencias || []).filter(i => i.alumnoId === aluId);
          if (todas.length === 0) {
            historyCont.innerHTML = `
              <div style="text-align: center; padding: 24px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; color: #64748b; font-size: 0.88rem;">
                🌱 No hay ninguna incidencia o conducta registrada para este alumno/a.
              </div>
            `;
            return;
          }

          const sorted = [...todas].sort((a, b) => new Date(b.fecha || 0).getTime() - new Date(a.fecha || 0).getTime());

          let rowsHtml = "";
          sorted.forEach(inc => {
            const isPos = inc.tipo === "positiva";
            const isGrave = inc.tipo === "grave";
            const badgeBg = isPos ? "#dcfce7" : isGrave ? "#ffedd5" : "#fef9c3";
            const badgeCol = isPos ? "#166534" : isGrave ? "#9a3412" : "#854d0e";
            const badgeBorder = isPos ? "#86efac" : isGrave ? "#fed7aa" : "#fef08a";
            const labelTipo = isPos ? "🟢 Recuperación (-1)" : isGrave ? "🟠 Falta Grave (+2)" : "🟡 Falta Leve (+1)";

            const isValida = stats.validIncidencias.some(vi => vi.id === inc.id);
            const statusBadge = isValida
              ? `<span style="background: #e0f2fe; color: #0369a1; font-size: 0.7rem; font-weight: 800; padding: 2px 6px; border-radius: 4px;">Activa</span>`
              : `<span style="background: #f1f5f9; color: #64748b; font-size: 0.7rem; font-weight: 700; padding: 2px 6px; border-radius: 4px;">Vencida</span>`;

            rowsHtml += `
              <tr style="border-bottom: 1px solid #f1f5f9; ${!isValida ? 'opacity: 0.65; background: #fafafa;' : ''}">
                <td style="padding: 8px 10px; font-weight: 600; color: #334155; font-size: 0.82rem; white-space: nowrap;">${inc.fecha || "—"}</td>
                <td style="padding: 8px 10px;">
                  <span style="background: ${badgeBg}; color: ${badgeCol}; border: 1px solid ${badgeBorder}; font-weight: 800; font-size: 0.75rem; padding: 2px 8px; border-radius: 12px; white-space: nowrap;">
                    ${labelTipo}
                  </span>
                </td>
                <td style="padding: 8px 10px; font-weight: 700; color: #1e293b; font-size: 0.85rem;">
                  ${this.escapeHtml(inc.motivo || "Sin motivo especificado")}
                  ${inc.comentario ? `<div style="font-size: 0.78rem; font-weight: 400; color: #64748b; margin-top: 2px;">💬 ${this.escapeHtml(inc.comentario)}</div>` : ''}
                </td>
                <td style="padding: 8px 10px; text-align: center;">${statusBadge}</td>
                <td style="padding: 8px 10px; text-align: right;">
                  <button type="button" class="btn btn-danger btn-xs" onclick="app.eliminarIncidenciaAlumno('${inc.id}')" title="Eliminar este registro" style="padding: 3px 6px; font-size: 0.75rem;">
                    🗑️
                  </button>
                </td>
              </tr>
            `;
          });

          historyCont.innerHTML = `
            <div style="overflow-x: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
                <thead>
                  <tr style="background: #f8fafc; border-bottom: 1px solid #cbd5e1; color: #475569; font-weight: 700;">
                    <th style="padding: 8px 10px;">Fecha</th>
                    <th style="padding: 8px 10px;">Tipo</th>
                    <th style="padding: 8px 10px;">Motivo y Detalle</th>
                    <th style="padding: 8px 10px; text-align: center;">Estado</th>
                    <th style="padding: 8px 10px; text-align: right;">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml}
                </tbody>
              </table>
            </div>
          `;
        }
      }

      guardarNuevaIncidenciaAlumno() {
        const inputId = document.getElementById("modalIncidenciasAlumnoId");
        if (!inputId || !inputId.value || !this.grupoActivo) return;
        const aluId = inputId.value;

        const radioChecked = document.querySelector('input[name="radioTipoIncidencia"]:checked');
        const tipo = radioChecked ? radioChecked.value : "leve";
        const puntos = tipo === "grave" ? 2 : tipo === "leve" ? 1 : -1;

        const selectMotivo = document.getElementById("selectMotivoIncidencia");
        const motivo = selectMotivo ? selectMotivo.value : "Conducta en clase";

        const inputFecha = document.getElementById("inputFechaIncidencia");
        const fecha = (inputFecha && inputFecha.value) ? inputFecha.value : new Date().toISOString().substring(0, 10);

        const inputComentario = document.getElementById("inputComentarioIncidencia");
        const comentario = inputComentario ? inputComentario.value.trim() : "";

        if (!this.grupoActivo.incidencias) this.grupoActivo.incidencias = [];

        const nuevaInc = {
          id: "inc-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
          alumnoId: aluId,
          fecha,
          tipo,
          puntos,
          motivo,
          comentario,
          evaluacionKey: this.evaluacionActiva || "eval1"
        };

        this.grupoActivo.incidencias.push(nuevaInc);
        this.guardarDatos();

        if (inputComentario) inputComentario.value = "";

        this.renderizarModalIncidencias();
        this.renderizarDashboardComportamientoPremios();
        if (this.vistaActiva === "cuaderno") this.renderizarCuaderno();

        const alu = (this.grupoActivo.alumnos || []).find(a => a.id === aluId);
        const aluNombre = alu ? alu.nombre : "Alumno";
        this.mostrarToast(`💾 Registro de conducta guardado para ${aluNombre}.`);
      }

      eliminarIncidenciaAlumno(incId) {
        if (!this.grupoActivo || !this.grupoActivo.incidencias) return;
        this.mostrarConfirmacion(
          "¿Estás seguro de que deseas eliminar este registro de conducta?",
          () => {
            this.grupoActivo.incidencias = this.grupoActivo.incidencias.filter(i => i.id !== incId);
            this.guardarDatos();
            this.renderizarModalIncidencias();
            this.renderizarDashboardComportamientoPremios();
            this.actualizarUI();
            this.mostrarToast("🗑️ Registro de conducta eliminado.");
          },
          "Eliminar"
        );
      }

      reiniciarPuntosAlumnoActual() {
        const inputId = document.getElementById("modalIncidenciasAlumnoId");
        if (!inputId || !inputId.value || !this.grupoActivo) return;
        const aluId = inputId.value;
        const alu = (this.grupoActivo.alumnos || []).find(a => a.id === aluId);
        const aluNombre = alu ? alu.nombre : "este alumno";

        this.mostrarConfirmacion(
          `¿Estás seguro de que deseas reiniciar y borrar todos los puntos e incidencias de ${this.escapeHtml(aluNombre)}?`,
          () => {
            if (this.grupoActivo.incidencias) {
              this.grupoActivo.incidencias = this.grupoActivo.incidencias.filter(i => i.alumnoId !== aluId);
            }
            this.guardarDatos();
            this.renderizarModalIncidencias();
            this.renderizarDashboardComportamientoPremios();
            if (this.vistaActiva === "cuaderno") this.renderizarCuaderno();
            this.mostrarToast(`🔄 Puntos e incidencias de ${aluNombre} reiniciados.`);
          },
          "Reiniciar Puntos"
        );
      }

      reiniciarPuntosGrupo() {
        if (!this.grupoActivo) return;
        this.mostrarConfirmacion(
          `¿Estás seguro de que deseas reiniciar todos los puntos e incidencias de los alumnos del grupo "${this.escapeHtml(this.grupoActivo.nombre)}"?`,
          () => {
            this.grupoActivo.incidencias = [];
            this.guardarDatos();
            this.renderizarDashboardComportamientoPremios();
            if (this.vistaActiva === "cuaderno") this.renderizarCuaderno();
            this.mostrarToast("🔄 Puntos e incidencias de todo el grupo reiniciados a 0.");
          },
          "Reiniciar Grupo"
        );
      }

      cambiarVencimientoPuntos(nuevoVencimiento) {
        if (!this.grupoActivo) return;
        this.grupoActivo.incidenciasConfig = this.grupoActivo.incidenciasConfig || {};
        this.grupoActivo.incidenciasConfig.vencimiento = nuevoVencimiento;
        this.guardarDatos();
        this.renderizarDashboardComportamientoPremios();
        if (this.vistaActiva === "cuaderno") this.renderizarCuaderno();
        this.mostrarToast("⚙️ Plazo de vencimiento de puntos actualizado.");
      }

      renderizarDashboardComportamientoPremios() {
        const containerMetricas = document.getElementById("metricasComportamientoGrupo");
        const containerTbody = document.getElementById("tablaComportamientoAlumnosBody");
        const selectVenc = document.getElementById("selectVencimientoPuntos");

        if (!this.grupoActivo) return;

        const config = this.grupoActivo.incidenciasConfig || { vencimiento: "30d" };
        if (selectVenc) selectVenc.value = config.vencimiento || "30d";

        const alumnos = this.grupoActivo.alumnos || [];

        let countExcelente = 0;
        let countLeve = 0;
        let countGrave = 0;
        let countAmonestacion = 0;
        let totalIncidenciasActivas = 0;

        const alumnosStats = alumnos.map(alu => {
          const stats = this.calcularPuntosAlumno(alu.id);
          if (stats.activePoints === 0) countExcelente++;
          else if (stats.activePoints === 1) countLeve++;
          else if (stats.activePoints === 2) countGrave++;
          else if (stats.activePoints >= 3) countAmonestacion++;

          totalIncidenciasActivas += stats.validIncidencias.length;
          return { alu, stats };
        });

        if (containerMetricas) {
          containerMetricas.innerHTML = `
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #166534;">${countExcelente}</div>
              <div style="font-size: 0.78rem; font-weight: 700; color: #15803d; margin-top: 2px;">🟢 Sin Faltas (0 pts)</div>
            </div>
            <div style="background: #fefce8; border: 1px solid #fef08a; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #854d0e;">${countLeve}</div>
              <div style="font-size: 0.78rem; font-weight: 700; color: #a16207; margin-top: 2px;">🟡 Advertencia (1 pt)</div>
            </div>
            <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #9a3412;">${countGrave}</div>
              <div style="font-size: 0.78rem; font-weight: 700; color: #c2410c; margin-top: 2px;">🟠 Riesgo Alto (2 pts)</div>
            </div>
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #991b1b;">${countAmonestacion}</div>
              <div style="font-size: 0.78rem; font-weight: 700; color: #dc2626; margin-top: 2px;">🔴 Amonestación (3+ pts)</div>
            </div>
          `;
        }

        if (containerTbody) {
          if (alumnos.length === 0) {
            containerTbody.innerHTML = `
              <tr>
                <td colspan="6" style="text-align: center; padding: 24px; color: #64748b;">
                  No hay alumnos matriculados en este grupo.
                </td>
              </tr>
            `;
            return;
          }

          let rowsHtml = "";
          alumnosStats.forEach(({ alu, stats }, idx) => {
            const b = stats.badge;
            const tieneAmon = stats.tieneAmonestacion;

            rowsHtml += `
              <tr style="border-bottom: 1px solid #f1f5f9; ${tieneAmon ? 'background: #fef2f2;' : idx % 2 === 1 ? 'background: #fafafa;' : ''}">
                <td style="padding: 10px 12px; text-align: center; font-weight: 600; color: #64748b;">${idx + 1}</td>
                <td style="padding: 10px 12px; font-weight: 700; color: #1e293b;">
                  <a href="javascript:void(0)" onclick="app.abrirIncidenciasAlumnoModal('${alu.id}')" style="color: #0284c7; text-decoration: none;">
                    ${this.escapeHtml(alu.nombre)}
                  </a>
                </td>
                <td style="padding: 10px 12px; text-align: center; font-weight: 800; font-size: 0.95rem; color: ${stats.activePoints > 0 ? b.color : '#94a3b8'};">
                  ${stats.activePoints > 0 ? `${stats.activePoints} pts` : '—'}
                </td>
                <td style="padding: 10px 12px; text-align: center;">
                  ${stats.activePoints > 0 ? `
                    <span style="background: ${b.bg}; color: ${b.color}; border: 1px solid ${b.border}; font-size: 0.76rem; font-weight: 800; padding: 3px 8px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;">
                      ${b.text}
                    </span>
                  ` : '<span style="color: #94a3b8; font-size: 0.85rem;">—</span>'}
                </td>
                <td style="padding: 10px 12px; text-align: center; font-size: 0.82rem; color: #475569;">
                  <span title="Faltas Leves">🟡 ${stats.levesCount}</span> &nbsp;|&nbsp;
                  <span title="Faltas Graves">🟠 ${stats.gravesCount}</span> &nbsp;|&nbsp;
                  <span title="Conductas Positivas">🟢 ${stats.positivasCount}</span>
                </td>
                <td style="padding: 10px 12px; text-align: right;">
                  <button type="button" class="btn btn-primary btn-xs" onclick="app.abrirIncidenciasAlumnoModal('${alu.id}')" style="font-size: 0.78rem; font-weight: 700; padding: 4px 10px;">
                    ➕ Registrar / 📜 Historial
                  </button>
                </td>
              </tr>
            `;
          });

          containerTbody.innerHTML = rowsHtml;
        }
      }

      renderizarConfiguracion() {
        this.cambiarSubConfig(this.subConfigActiva);
      }

      // 1. Cursos
      renderizarListaCursos() {
        const cont = document.getElementById("listaGruposCards");
        if (!cont) return;
        cont.innerHTML = "";

        const grupos = (this.data && Array.isArray(this.data.grupos)) ? this.data.grupos : [];
        if (grupos.length === 0) {
          cont.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted); background: #f8fafc; border-radius: 12px; border: 1px dashed #cbd5e1;">No hay ningún grupo o curso creado en Supabase. Haz clic en <strong>"+ Crear Nuevo Grupo / Curso"</strong> para añadir tu primer curso.</div>`;
          this.renderizarGruposVinculados();
          return;
        }

        grupos.forEach(g => {
          const card = document.createElement("div");
          card.className = "item-card";
          card.style.display = "flex";
          card.style.justifyContent = "space-between";
          card.style.alignItems = "center";
          card.style.gap = "12px";
          card.style.flexWrap = "wrap";

          const esActivo = (this.grupoActivo && this.grupoActivo.id === g.id);

          card.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 12px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <strong style="font-size: 0.98rem; color: #0f172a;">${g.nombre}</strong>
                ${esActivo ? '<span class="badge" style="background:#2563eb; color:#ffffff; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.75rem;">✓ Grupo Activo</span>' : ''}
                <div style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
                  ${!esActivo ? `<button class="btn btn-sm btn-primary" style="padding: 2px 8px; font-size: 0.78rem;" onclick="app.cambiarGrupo('${g.id}')">Seleccionar</button>` : ''}
                  <button class="btn btn-sm btn-secondary" style="padding: 2px 8px; font-size: 0.78rem;" onclick="app.renombrarGrupo('${g.id}')">Renombrar</button>
                  <button class="btn btn-sm btn-gray" style="padding: 2px 8px; font-size: 0.78rem;" onclick="app.alternarOcultarGrupo('${g.id}')">${g.oculto ? 'Mostrar' : 'Ocultar'}</button>
                  <button class="btn btn-sm btn-danger" style="padding: 2px 8px; font-size: 0.78rem;" onclick="app.solicitarEliminarGrupo('${g.id}')">Eliminar</button>
                </div>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">
                ${g.alumnos ? g.alumnos.length : 0} alumnos • ${g.oculto ? "🙈 Oculto" : "👁️ Visible"}
              </div>
            </div>
          `;
          cont.appendChild(card);
        });

        this.renderizarGruposVinculados();
      }

      renderizarGruposVinculados() {
        const cont = document.getElementById("seccionGruposVinculados");
        if (!cont) return;
        if (!this.grupoActivo) {
          cont.innerHTML = "";
          return;
        }

        const otrosGrupos = (this.data.grupos || []).filter(g => g.id !== this.grupoActivo.id);
        const linkedIds = this.grupoActivo.linkedGroupIds || [];

        let html = `
          <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
              <div>
                <h4 style="font-size: 1.05rem; font-weight: 800; color: #1e293b; margin: 0 0 4px 0; display: flex; align-items: center; gap: 8px;">
                  <span>🔗</span> Grupos vinculados
                </h4>
                <p style="font-size: 0.82rem; color: #64748b; margin: 0; max-width: 650px;">
                  Selecciona uno o varios grupos para compartir plantillas de rúbricas. La vinculación funciona en ambos sentidos.
                  <strong>Aislamiento total:</strong> las calificaciones, alumnos, puntuaciones y evaluaciones jamás se comparten y quedan 100% aisladas.
                </p>
              </div>
              <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 6px 14px; border-radius: 8px; font-size: 0.82rem; color: #1e40af; font-weight: 700;">
                Grupo actual: <strong>${this.grupoActivo.nombre}</strong>
              </div>
            </div>
        `;

        if (otrosGrupos.length === 0) {
          html += `
            <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 18px; text-align: center; color: #64748b; font-size: 0.86rem;">
              ℹ️ Solo existe este grupo en Fernanditio. Pulsa arriba <strong>"Crear nuevo grupo"</strong> para añadir otro curso y poder vincularlos para compartir plantillas de rúbricas.
            </div>
          </div>`;
          cont.innerHTML = html;
          return;
        }

        html += `
          <div style="margin-bottom: 16px;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #334155; margin-bottom: 10px;">
              Grupos vinculados:
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px;">
        `;

        otrosGrupos.forEach(g => {
          const isLinked = linkedIds.includes(g.id);
          html += `
            <label style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: ${isLinked ? '#f0fdf4' : '#f8fafc'}; border: 1.5px solid ${isLinked ? '#86efac' : '#e2e8f0'}; border-radius: 8px; cursor: pointer; transition: all 0.15s ease;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" class="chk-grupo-vinculado" value="${g.id}" ${isLinked ? 'checked' : ''} style="width: 17px; height: 17px; accent-color: #16a34a; cursor: pointer;" />
                <span style="font-size: 0.9rem; font-weight: 700; color: #1e293b;">${g.nombre}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                ${isLinked ? '<span style="font-size: 0.72rem; background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; padding: 2px 7px; border-radius: 4px; font-weight: 700;">✓ Vinculado</span>' : '<span style="font-size: 0.72rem; color: #94a3b8; font-weight: 600;">No vinculado</span>'}
                ${isLinked ? `<button type="button" class="btn btn-sm" style="padding: 2px 7px; font-size: 0.72rem; background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; border-radius: 4px;" onclick="event.preventDefault(); event.stopPropagation(); app.desvincularGrupoIndividual('${g.id}')" title="Desvincular este grupo">Desvincular</button>` : ''}
              </div>
            </label>
          `;
        });

        html += `
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-top: 1px solid #e2e8f0; padding-top: 14px;">
            <div style="font-size: 0.8rem; color: #64748b;">
              ${linkedIds.length > 0 ? `🔗 <strong>${linkedIds.length}</strong> grupo(s) vinculado(s) bidireccionalmente con "${this.grupoActivo.nombre}".` : 'Sin grupos vinculados actualmente con este curso.'}
            </div>
            <div style="display: flex; gap: 8px;">
              ${linkedIds.length > 0 ? `<button type="button" class="btn btn-secondary btn-sm" onclick="app.desvincularTodosGrupos()" style="font-size: 0.82rem; padding: 6px 14px; color: #b91c1c; border-color: #fca5a5;">Desvincular todos</button>` : ''}
              <button type="button" class="btn btn-primary" onclick="app.guardarVinculacionGruposUI()" style="font-weight: 800; font-size: 0.88rem; padding: 8px 20px; box-shadow: 0 2px 6px rgba(37,99,235,0.2);">
                💾 Guardar vinculación
              </button>
            </div>
          </div>
        </div>`;

        cont.innerHTML = html;
      }

      guardarVinculacionGruposUI() {
        if (!this.grupoActivo) return;
        const checkboxes = document.querySelectorAll(".chk-grupo-vinculado");
        const selectedIds = [];
        checkboxes.forEach(cb => {
          if (cb.checked) selectedIds.push(cb.value);
        });
        this.guardarVinculacionGrupos(this.grupoActivo.id, selectedIds);
        this.mostrarToast(`🔗 Vinculación de grupos guardada correctamente para "${this.grupoActivo.nombre}".`);
      }

      guardarVinculacionGrupos(grupoId, nuevosLinkedIds) {
        const targetGrupo = this.data.grupos.find(g => g.id === grupoId);
        if (!targetGrupo) return;

        if (!Array.isArray(targetGrupo.linkedGroupIds)) targetGrupo.linkedGroupIds = [];
        targetGrupo.linkedGroupIds = Array.from(new Set(nuevosLinkedIds)).filter(id => id !== grupoId);

        // Garantizar simetría bidireccional en todos los grupos
        this.data.grupos.forEach(g => {
          if (g.id === grupoId) return;
          if (!Array.isArray(g.linkedGroupIds)) g.linkedGroupIds = [];
          if (targetGrupo.linkedGroupIds.includes(g.id)) {
            // Debe estar vinculado con targetGrupo
            if (!g.linkedGroupIds.includes(grupoId)) {
              g.linkedGroupIds.push(grupoId);
            }
          } else {
            // Ya no debe estar vinculado con targetGrupo
            g.linkedGroupIds = g.linkedGroupIds.filter(id => id !== grupoId);
          }
        });

        this.guardarDatos();
        this.renderizarListaCursos();
        this.renderizarRubricasView();
      }

      desvincularGrupoIndividual(otroGrupoId) {
        if (!this.grupoActivo) return;
        const nuevoList = (this.grupoActivo.linkedGroupIds || []).filter(id => id !== otroGrupoId);
        this.guardarVinculacionGrupos(this.grupoActivo.id, nuevoList);
        const otro = this.data.grupos.find(g => g.id === otroGrupoId);
        this.mostrarToast(`🔗 Vinculación eliminada entre "${this.grupoActivo.nombre}" y "${otro ? otro.nombre : otroGrupoId}". Las calificaciones y evaluaciones existentes se mantienen intactas.`);
      }

      desvincularTodosGrupos() {
        if (!this.grupoActivo) return;
        this.mostrarConfirmacion(
          `¿Deseas desvincular el grupo <strong>"${this.grupoActivo.nombre}"</strong> de todos los demás grupos?<br><br>
          <span style="font-size:0.85rem; color:#64748b;">Las plantillas ya utilizadas, las rúbricas aplicadas y todas las calificaciones de los alumnos permanecerán intactas.</span>`,
          () => {
            this.guardarVinculacionGrupos(this.grupoActivo.id, []);
            this.mostrarToast(`🔗 Grupo "${this.grupoActivo.nombre}" desvinculado.`);
          }
        );
      }

      crearNuevoGrupo() {
        this.mostrarPrompt(
          "Crear nuevo grupo",
          "Introduce el nombre del nuevo grupo o curso (ej. 2º ESO B - Lengua):",
          "",
          (nombre) => {
            const nuevoGrupo = {
              id: "grupo-" + Date.now(),
              nombre: nombre.trim(),
              oculto: false,
              linkedGroupIds: [],
              alumnos: [],
              criterios: JSON.parse(JSON.stringify(CRITERIOS_DEFAULT)),
              secciones: JSON.parse(JSON.stringify(SECCIONES_DEFAULT)),
              rubricas: [],
              evaluaciones: {
                eval1: { actividades: [], calificaciones: {} },
                eval2: { actividades: [], calificaciones: {} },
                eval3: { actividades: [], calificaciones: {} }
              }
            };

            if (!this.data) this.data = { grupos: [] };
            if (!Array.isArray(this.data.grupos)) this.data.grupos = [];
            this.data.grupos.push(nuevoGrupo);
            this.data.grupoActivoId = nuevoGrupo.id;
            this.grupoActivo = nuevoGrupo;

            if (window.supabaseSync) {
              window.supabaseSync.saveGroup(nuevoGrupo);
            }

            this.guardarDatos(true);
            this.actualizarUI();
            this.mostrarToast(`✅ Grupo "${nuevoGrupo.nombre}" creado y guardado en Supabase.`);
          }
        );
      }

      alternarOcultarGrupo(grupoId) {
        const targetGrupo = grupoId ? this.data.grupos.find(g => g.id === grupoId) : this.grupoActivo;
        if (!targetGrupo) return;

        this.mostrarConfirmacion(
          `¿Deseas cambiar el estado de visibilidad del grupo <strong>"${this.escapeHtml(targetGrupo.nombre)}"</strong>? (Actualmente: ${targetGrupo.oculto ? "Oculto" : "Visible"})`,
          () => {
            targetGrupo.oculto = !targetGrupo.oculto;
            if (window.supabaseSync) {
              window.supabaseSync.saveGroup(targetGrupo);
            }
            this.guardarDatos(true);
            this.actualizarUI();
            this.mostrarToast(`👁️ Estado del grupo "${targetGrupo.nombre}" cambiado a ${targetGrupo.oculto ? "Oculto" : "Visible"}.`);
          }
        );
      }

      solicitarEliminarGrupo(grupoId) {
        const targetGrupo = grupoId ? this.data.grupos.find(g => g.id === grupoId) : this.grupoActivo;
        if (!targetGrupo) return;

        if (this.data.grupos.length <= 1) {
          alert("No puedes eliminar el único grupo disponible.");
          return;
        }

        this.mostrarConfirmacion(
          `⚠️ <strong>ATENCIÓN:</strong> Vas a eliminar permanentemente el grupo <strong>"${this.escapeHtml(targetGrupo.nombre)}"</strong>.<br><br>
          Esta acción eliminará de manera irreversible:
          <ul style="margin: 8px 0 8px 20px; font-size: 0.85rem;">
            <li>Todos los alumnos del grupo</li>
            <li>Todas las actividades y notas de las 3 evaluaciones</li>
            <li>Todos los criterios de evaluación asociados</li>
            <li>Las rúbricas y ponderaciones específicas de este grupo</li>
          </ul>
          ¿Confirmas la eliminación total?`,
          () => {
            const gId = targetGrupo.id;
            this.data.grupos = this.data.grupos.filter(g => g.id !== gId);
            // Limpiar vinculaciones hacia el grupo eliminado en todos los demás grupos
            this.data.grupos.forEach(g => {
              if (Array.isArray(g.linkedGroupIds)) {
                g.linkedGroupIds = g.linkedGroupIds.filter(id => id !== gId);
              }
            });

            if (this.grupoActivo && this.grupoActivo.id === gId) {
              this.grupoActivo = this.data.grupos[0];
              this.data.grupoActivoId = this.grupoActivo ? this.grupoActivo.id : null;
            }

            if (window.supabaseSync) {
              window.supabaseSync.deleteGroup(gId);
            }

            this.guardarDatos(true);
            this.actualizarUI();
            this.mostrarToast(`🗑️ Grupo "${targetGrupo.nombre}" eliminado correctamente.`);
          }
        );
      }

      renombrarGrupo(grupoId) {
        const g = this.data.grupos.find(grp => grp.id === grupoId);
        if (!g) return;
        this.mostrarPrompt(
          "Renombrar grupo",
          "Introduce el nuevo nombre para el grupo:",
          g.nombre,
          (nuevo) => {
            g.nombre = nuevo.trim();
            this.guardarDatos();
            this.actualizarUI();
            this.mostrarToast(`✏️ Grupo renombrado a "${g.nombre}".`);
          }
        );
      }

      // 2. Alumnos
      renderizarListaAlumnos() {
        const cont = document.getElementById("listaAlumnos");
        const rec = document.getElementById("recuentoAlumnos");
        if (cont) cont.innerHTML = "";

        if (!this.grupoActivo) {
          if (cont) cont.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted); background: #f8fafc; border-radius: 12px; border: 1px dashed #cbd5e1;">No hay ningún grupo seleccionado. Crea un curso primero en la pestaña "Cursos".</div>`;
          if (rec) rec.textContent = "Total: 0 alumnos";
          return;
        }

        if (!this.grupoActivo.alumnos) this.grupoActivo.alumnos = [];
        const alumnos = (this.grupoActivo.alumnos || []).slice().sort((a,b) => (a.orden || 0) - (b.orden || 0));
        if (rec) rec.textContent = `Total: ${alumnos.length} alumnos`;

        if (alumnos.length === 0) {
          if (cont) cont.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">No hay alumnos en este grupo. Añade uno o importa una lista.</div>`;
          return;
        }

        alumnos.forEach((alu, idx) => {
          const card = document.createElement("div");
          card.className = "item-card student-drag-item";
          card.draggable = true;
          card.dataset.alumnoId = alu.id;
          card.dataset.index = idx;

          card.ondragstart = (e) => {
            e.dataTransfer.setData("text/plain", alu.id);
            e.dataTransfer.effectAllowed = "move";
            card.classList.add("dragging");
          };

          card.ondragover = (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            card.classList.add("drag-over");
          };

          card.ondragleave = () => {
            card.classList.remove("drag-over");
          };

          card.ondrop = (e) => {
            e.preventDefault();
            card.classList.remove("drag-over");
            const draggedId = e.dataTransfer.getData("text/plain");
            if (draggedId && draggedId !== alu.id) {
              this.reordenarAlumnos(draggedId, alu.id);
            }
          };

          card.ondragend = () => {
            document.querySelectorAll(".student-drag-item").forEach(el => {
              el.classList.remove("dragging");
              el.classList.remove("drag-over");
            });
          };

          card.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 12px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <span class="drag-handle" title="Arrastra para reordenar este alumno" style="cursor: grab;">⠿</span>
                <strong style="font-size: 0.94rem; color: #0f172a;">${idx + 1}. ${this.escapeHtml(alu.nombre)}</strong>
                <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
                  <button class="btn btn-sm btn-secondary" style="padding: 2px 6px; font-size: 0.75rem;" onclick="app.moverAlumno('${alu.id}', -1)" title="Subir posición">⬆️</button>
                  <button class="btn btn-sm btn-secondary" style="padding: 2px 6px; font-size: 0.75rem;" onclick="app.moverAlumno('${alu.id}', 1)" title="Bajar posición">⬇️</button>
                  <button class="btn btn-sm btn-secondary" style="padding: 2px 8px; font-size: 0.78rem;" onclick="app.editarAlumno('${alu.id}')">✏️ Editar</button>
                  <button class="btn btn-sm btn-danger" style="padding: 2px 6px; font-size: 0.78rem;" onclick="app.solicitarEliminarAlumno('${alu.id}')" title="Eliminar alumno">🗑️</button>
                </div>
              </div>
            </div>
          `;
          cont.appendChild(card);
        });
      }

      reordenarAlumnos(draggedId, targetId) {
        const alumnos = (this.grupoActivo.alumnos || []).slice().sort((a,b) => a.orden - b.orden);
        const fromIdx = alumnos.findIndex(a => a.id === draggedId);
        const toIdx = alumnos.findIndex(a => a.id === targetId);
        if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return;

        const [moved] = alumnos.splice(fromIdx, 1);
        alumnos.splice(toIdx, 0, moved);

        alumnos.forEach((alu, index) => {
          alu.orden = index + 1;
        });

        this.grupoActivo.alumnos = alumnos;
        this.guardarDatos();
        this.renderizarListaAlumnos();
        if (this.vistaActiva === "cuaderno") this.renderizarCuaderno();
        if (this.vistaActiva === "resultados") this.renderizarResultados();
      }

      modalAlumno(id = null) {
        if (!this.grupoActivo) {
          this.mostrarToast("⚠️ Crea o selecciona un curso primero en la pestaña 'Cursos'.");
          return;
        }
        if (!this.grupoActivo.alumnos) this.grupoActivo.alumnos = [];
        document.getElementById("alumnoIdEdit").value = id || "";
        if (id) {
          const alu = this.grupoActivo.alumnos.find(a => a.id === id);
          document.getElementById("modalAlumnoTitulo").textContent = "Editar Alumno";
          document.getElementById("alumnoNombre").value = alu ? alu.nombre : "";
        } else {
          document.getElementById("modalAlumnoTitulo").textContent = "Añadir Alumno";
          document.getElementById("alumnoNombre").value = "";
        }
        this.abrirModal("modalAlumno");
      }

      editarAlumno(id) {
        this.modalAlumno(id);
      }

      guardarAlumno() {
        if (!this.grupoActivo) {
          alert("Debes crear o seleccionar un curso primero antes de añadir alumnos.");
          return;
        }
        const id = document.getElementById("alumnoIdEdit").value;
        const nombre = document.getElementById("alumnoNombre").value.trim();
        if (!nombre) {
          alert("Indica el nombre del alumno.");
          return;
        }

        if (!this.grupoActivo.alumnos) this.grupoActivo.alumnos = [];

        let savedStudent = null;
        if (id) {
          const alu = this.grupoActivo.alumnos.find(a => a.id === id);
          if (alu) {
            alu.nombre = nombre;
            savedStudent = alu;
          }
        } else {
          const maxOrden = this.grupoActivo.alumnos.reduce((m, a) => Math.max(m, a.orden || 0), 0);
          const newUuid = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : (Date.now() + "-" + Math.random().toString(36).substring(2, 9));
          savedStudent = {
            id: "alu-" + newUuid,
            nombre,
            orden: maxOrden + 1
          };
          this.grupoActivo.alumnos.push(savedStudent);
        }

        if (window.supabaseSync && this.grupoActivo && savedStudent) {
          window.supabaseSync.saveStudent(this.grupoActivo.id, savedStudent);
        }

        this.guardarDatos(true);
        this.cerrarModal("modalAlumno");
        this.renderizarListaAlumnos();
        this.actualizarUI();
      }

      moverAlumno(alumnoId, direccion) {
        const alus = this.grupoActivo.alumnos.sort((a,b) => a.orden - b.orden);
        const idx = alus.findIndex(a => a.id === alumnoId);
        if (idx === -1) return;
        const targetIdx = idx + direccion;
        if (targetIdx < 0 || targetIdx >= alus.length) return;

        const temp = alus[idx].orden;
        alus[idx].orden = alus[targetIdx].orden;
        alus[targetIdx].orden = temp;

        this.guardarDatos();
        this.renderizarListaAlumnos();
        this.actualizarUI();
      }

      ordenarAlumnosAZ() {
        this.mostrarConfirmacion(
          "¿Deseas ordenar alfabéticamente (A-Z) a todos los alumnos?",
          () => {
            this.grupoActivo.alumnos.sort((a,b) => a.nombre.localeCompare(b.nombre, "es"));
            this.grupoActivo.alumnos.forEach((a, i) => a.orden = i + 1);
            this.guardarDatos();
            this.renderizarListaAlumnos();
            this.actualizarUI();
          }
        );
      }

      solicitarEliminarAlumno(alumnoId) {
        const alu = this.grupoActivo.alumnos.find(a => a.id === alumnoId);
        if (!alu) return;

        this.mostrarConfirmacion(
          `¿Eliminar al alumno <strong>"${this.escapeHtml(alu.nombre)}"</strong>?<br><br>Se borrarán también todas sus calificaciones asociadas en todas las evaluaciones.`,
          () => {
            this.grupoActivo.alumnos = this.grupoActivo.alumnos.filter(a => a.id !== alumnoId);
            // Limpiar sus notas en todas las evaluaciones
            if (this.grupoActivo.evaluaciones) {
              ["eval1", "eval2", "eval3", "final"].forEach(evKey => {
                const evObj = this.grupoActivo.evaluaciones[evKey];
                if (evObj && evObj.calificaciones) {
                  for (const actId in evObj.calificaciones) {
                    delete evObj.calificaciones[actId][alumnoId];
                  }
                }
                if (evObj && evObj.calificacionesRubricas) {
                  for (const rubId in evObj.calificacionesRubricas) {
                    delete evObj.calificacionesRubricas[rubId][alumnoId];
                  }
                }
              });
            }
            if (this.grupoActivo.incidencias && Array.isArray(this.grupoActivo.incidencias)) {
              this.grupoActivo.incidencias = this.grupoActivo.incidencias.filter(inc => inc.alumnoId !== alumnoId);
            }
            if (this.alumnoCuadernoSeleccionadoId === alumnoId) {
              this.alumnoCuadernoSeleccionadoId = null;
            }
            if (this.diarioAlumnosSelIds && Array.isArray(this.diarioAlumnosSelIds)) {
              this.diarioAlumnosSelIds = this.diarioAlumnosSelIds.filter(id => id !== alumnoId);
            }
            if (this.evaluandoRubricaActual && this.evaluandoRubricaActual.alumnosSeleccionados) {
              this.evaluandoRubricaActual.alumnosSeleccionados.delete(alumnoId);
            }
            if (window.supabaseSync) {
              window.supabaseSync.deleteStudent(alumnoId);
            }
            this.guardarDatos(true);
            this.renderizarListaAlumnos();
            this.actualizarUI();
          }
        );
      }

      modalImportarAlumnos() {
        document.getElementById("importAlumnosTexto").value = "";
        this.abrirModal("modalImportAlumnos");
      }

      ejecutarImportarAlumnos() {
        const texto = document.getElementById("importAlumnosTexto").value;
        if (!texto.trim()) return;

        const lineas = texto.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        if (lineas.length === 0) return;

        if (!this.grupoActivo.alumnos) this.grupoActivo.alumnos = [];

        const existentes = new Set(this.grupoActivo.alumnos.map(a => a.nombre.toLowerCase()));
        let agregados = 0;
        let maxOrden = this.grupoActivo.alumnos.reduce((m, a) => Math.max(m, a.orden || 0), 0);

        lineas.forEach((linea, index) => {
          if (!existentes.has(linea.toLowerCase())) {
            existentes.add(linea.toLowerCase());
            maxOrden++;
            const newUuid = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : (Date.now() + "-" + index + "-" + Math.random().toString(36).substring(2, 9));
            this.grupoActivo.alumnos.push({
              id: "alu-" + newUuid,
              nombre: linea,
              orden: maxOrden
            });
            agregados++;
          }
        });

        this.guardarDatos();
        this.cerrarModal("modalImportAlumnos");
        this.mostrarToast(`✅ Importados ${agregados} alumnos correctamente.`);
        this.renderizarListaAlumnos();
        this.actualizarUI();
      }

      modalCrearImportarRubrica() {
        this.abrirModal("modalCrearImportarRubrica");
      }

      // 3. Criterios
      renderizarListaCriterios() {
        const cont = document.getElementById("listaCriterios");
        const rec = document.getElementById("recuentoCriterios");
        if (!cont) return;
        cont.innerHTML = "";

        const criterios = this.grupoActivo ? (this.grupoActivo.criterios || []) : [];
        this.ordenarCriterios(criterios);
        rec.textContent = `Total: ${criterios.length} criterios`;

        let sumaPond = 0;
        criterios.forEach(crit => {
          sumaPond += Number(crit.ponderacion || 0);
          const card = document.createElement("div");
          card.className = "item-card";
          const colorCrit = this.obtenerColorIntensificado("#2563eb", crit.ponderacion);
          card.style.borderLeft = `5px solid ${colorCrit}`;
          card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; max-width: 75%;">
              <input type="checkbox" class="chk-criterio" value="${crit.codigo}" onchange="app.actualizarContadorCriteriosSeleccionados()" style="width: 16px; height: 16px; cursor: pointer;" />
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span style="font-weight: 800; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${this.escapeHtml(crit.codigo)}</span>
                <span style="font-size: 0.88rem;">${this.escapeHtml(crit.descripcion)}</span>
                <div style="display: flex; align-items: center; gap: 4px; background: #eff6ff; padding: 2px 8px; border-radius: 6px; border: 1px solid #bfdbfe;">
                  <label style="font-size: 0.78rem; font-weight: 700; color: #1e40af; margin: 0;">Peso %:</label>
                  <input type="number" step="0.5" min="0" max="100" class="form-control input-peso-criterio" data-crit-code="${crit.codigo}" style="width: 65px; padding: 2px 4px; font-size: 0.85rem; font-weight: 800; text-align: center; color: #1e40af;" value="${crit.ponderacion || 0}" onchange="app.actualizarPesoCriterio('${crit.codigo}', this.value)" onkeydown="app.onPesoCriterioKeydown(event, '${crit.codigo}')" title="Escribe el peso o ponderación de este criterio (%)" />
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-sm btn-secondary" onclick="app.editarCriterio('${crit.codigo}')">✏️ Editar</button>
              <button class="btn btn-sm btn-danger" onclick="app.solicitarEliminarCriterio('${crit.codigo}')">🗑️</button>
            </div>
          `;
          cont.appendChild(card);
        });

        // Redondear a 2 decimales para evitar imprecisiones de flotantes
        sumaPond = Math.round(sumaPond * 100) / 100;
        const txtCrit = document.getElementById("sumaPonderacionesCriteriosTxt");
        if (txtCrit) {
          txtCrit.textContent = `Suma total de ponderaciones de los criterios: ${sumaPond}% ${sumaPond === 100 ? "✅ (Correcto: 100%)" : "⚠️ (Recomendado: 100%)"}`;
        }

        this.actualizarContadorCriteriosSeleccionados();
      }

      onPesoCriterioKeydown(e, codigo) {
        if (e.key === "Enter") {
          e.preventDefault();
          const input = e.currentTarget;
          this.actualizarPesoCriterio(codigo, input.value);

          const allPesos = Array.from(document.querySelectorAll(".input-peso-criterio"));
          const idx = allPesos.indexOf(input);
          if (idx !== -1 && idx + 1 < allPesos.length) {
            const nextInput = allPesos[idx + 1];
            nextInput.focus();
            if (typeof nextInput.select === "function") {
              nextInput.select();
            }
          } else {
            input.blur();
          }
        }
      }

      actualizarPesoCriterio(codigo, nuevoPeso) {
        if (!this.grupoActivo || !this.grupoActivo.criterios) return;
        const crit = this.grupoActivo.criterios.find(c => c.codigo === codigo);
        if (crit) {
          crit.ponderacion = Number(nuevoPeso) || 0;
          this.recalcularPonderacionesSecciones();
          this.guardarDatos();

          const criterios = this.grupoActivo.criterios || [];
          let sumaPond = criterios.reduce((acc, c) => acc + Number(c.ponderacion || 0), 0);
          sumaPond = Math.round(sumaPond * 100) / 100;
          const txtCrit = document.getElementById("sumaPonderacionesCriteriosTxt");
          if (txtCrit) {
            txtCrit.textContent = `Suma total de ponderaciones de los criterios: ${sumaPond}% ${sumaPond === 100 ? "✅ (Correcto: 100%)" : "⚠️ (Recomendado: 100%)"}`;
          }

          if (this.vistaActiva === "configuracion") {
            this.renderizarListaSecciones();
          } else if (this.vistaActiva === "resultados") {
            this.renderizarResultados();
          }
        }
      }

      actualizarContadorCriteriosSeleccionados() {
        const chks = document.querySelectorAll(".chk-criterio:checked");
        const count = chks.length;
        const total = document.querySelectorAll(".chk-criterio").length;
        const btnEliminar = document.getElementById("btnEliminarCriteriosSeleccionados");
        const countSpan = document.getElementById("countCriteriosSel");
        const btnToggle = document.getElementById("btnToggleSelCriterios");

        if (countSpan) countSpan.textContent = count;
        if (btnEliminar) btnEliminar.style.display = count > 0 ? "inline-flex" : "none";
        if (btnToggle) {
          btnToggle.textContent = (total > 0 && count === total) ? "☐ Deseleccionar Todos" : "☑️ Seleccionar Todos";
        }
      }

      alternarSeleccionTodosCriterios() {
        const chks = document.querySelectorAll(".chk-criterio");
        const chksChecked = document.querySelectorAll(".chk-criterio:checked");
        const marcar = chksChecked.length < chks.length;
        chks.forEach(c => c.checked = marcar);
        this.actualizarContadorCriteriosSeleccionados();
      }

      solicitarEliminarCriteriosSeleccionados() {
        const chks = Array.from(document.querySelectorAll(".chk-criterio:checked"));
        const codigos = chks.map(c => c.value);
        if (codigos.length === 0) {
          alert("No hay ningún criterio seleccionado.");
          return;
        }
        this.mostrarConfirmacion(
          `¿Eliminar los <strong>${codigos.length}</strong> criterios seleccionados?<br><br>Se desvincularán automáticamente de todas las actividades y secciones asociadas.`,
          () => {
            this.grupoActivo.criterios = this.grupoActivo.criterios.filter(c => !codigos.includes(c.codigo));
            // Desvincular de actividades
            ["eval1", "eval2", "eval3"].forEach(ev => {
              const acts = this.grupoActivo.evaluaciones[ev].actividades;
              if (acts) {
                acts.forEach(a => {
                  if (a.criterios) a.criterios = a.criterios.filter(c => !codigos.includes(c));
                });
              }
            });
            // Desvincular de secciones
            this.grupoActivo.secciones.forEach(s => {
              if (s.criterios) s.criterios = s.criterios.filter(c => !codigos.includes(c));
            });

            this.recalcularPonderacionesSecciones();
            this.guardarDatos();
            this.renderizarListaCriterios();
          }
        );
      }

      modalCriterio(codigo = null) {
        document.getElementById("criterioCodigoOriginal").value = codigo || "";
        if (codigo) {
          const crit = this.grupoActivo.criterios.find(c => c.codigo === codigo);
          document.getElementById("modalCriterioTitulo").textContent = "Editar Criterio";
          document.getElementById("critCodigo").value = crit ? crit.codigo : "";
          document.getElementById("critDesc").value = crit ? crit.descripcion : "";
          document.getElementById("critPond").value = crit ? (crit.ponderacion || "") : "";
        } else {
          document.getElementById("modalCriterioTitulo").textContent = "Nuevo Criterio";
          document.getElementById("critCodigo").value = "";
          document.getElementById("critDesc").value = "";
          document.getElementById("critPond").value = "";
        }
        this.abrirModal("modalCriterio");
      }

      editarCriterio(codigo) {
        this.modalCriterio(codigo);
      }

      guardarCriterio() {
        const orig = document.getElementById("criterioCodigoOriginal").value;
        const codigo = document.getElementById("critCodigo").value.trim();
        const descripcion = document.getElementById("critDesc").value.trim();
        const ponderacion = Number(document.getElementById("critPond").value) || 0;

        if (!codigo || !descripcion) {
          alert("Indica el código y la descripción del criterio.");
          return;
        }

        if (!this.grupoActivo.criterios) this.grupoActivo.criterios = [];

        if (orig) {
          const crit = this.grupoActivo.criterios.find(c => c.codigo === orig);
          if (crit) {
            crit.codigo = codigo;
            crit.descripcion = descripcion;
            crit.ponderacion = ponderacion;
          }
        } else {
          // Evitar duplicados de código
          if (this.grupoActivo.criterios.some(c => c.codigo === codigo)) {
            alert(`Ya existe un criterio con el código ${codigo}.`);
            return;
          }
          this.grupoActivo.criterios.push({ codigo, descripcion, ponderacion });
        }

        this.ordenarCriterios(this.grupoActivo.criterios);
        this.recalcularPonderacionesSecciones();
        this.guardarDatos();
        this.cerrarModal("modalCriterio");
        this.renderizarListaCriterios();
      }

      solicitarEliminarCriterio(codigo) {
        this.mostrarConfirmacion(
          `¿Eliminar el criterio <strong>"${codigo}"</strong>?<br><br>El criterio se desvinculará automáticamente de todas las actividades asociadas.`,
          () => {
            this.grupoActivo.criterios = this.grupoActivo.criterios.filter(c => c.codigo !== codigo);
            // Desvincular de actividades
            ["eval1", "eval2", "eval3"].forEach(ev => {
              const acts = this.grupoActivo.evaluaciones[ev].actividades;
              if (acts) {
                acts.forEach(a => {
                  if (a.criterios) a.criterios = a.criterios.filter(c => c !== codigo);
                });
              }
            });
            // Desvincular de secciones
            this.grupoActivo.secciones.forEach(s => {
              if (s.criterios) s.criterios = s.criterios.filter(c => c !== codigo);
            });

            this.recalcularPonderacionesSecciones();
            this.guardarDatos();
            this.renderizarListaCriterios();
          }
        );
      }

      modalImportarCriterios() {
        document.getElementById("importCriteriosTexto").value = "";
        this.abrirModal("modalImportCriterios");
      }

      ejecutarImportarCriterios() {
        const texto = document.getElementById("importCriteriosTexto").value;
        if (!texto.trim()) return;

        const lineas = texto.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        let importados = 0;

        lineas.forEach(linea => {
          let partes = [];
          if (linea.includes(";")) {
            partes = linea.split(";").map(p => p.trim());
          } else if (linea.includes("\t")) {
            partes = linea.split("\t").map(p => p.trim());
          } else {
            // Separar por múltiples espacios
            partes = linea.split(/\s{2,}/).map(p => p.trim());
          }

          if (partes.length >= 2) {
            const codigo = partes[0];
            const descripcion = partes[1];
            const pond = partes[2] ? Number(partes[2]) : 10;

            const idx = this.grupoActivo.criterios.findIndex(c => c.codigo === codigo);
            if (idx >= 0) {
              this.grupoActivo.criterios[idx] = { codigo, descripcion, ponderacion: pond };
            } else {
              this.grupoActivo.criterios.push({ codigo, descripcion, ponderacion: pond });
            }
            importados++;
          }
        });

        this.ordenarCriterios(this.grupoActivo.criterios);
        this.recalcularPonderacionesSecciones();
        this.guardarDatos();
        this.cerrarModal("modalImportCriterios");
        alert(`Se importaron/actualizaron ${importados} criterios.`);
        this.renderizarListaCriterios();
      }

      // 4. Secciones
      renderizarListaSecciones() {
        this.recalcularPonderacionesSecciones();
        const cont = document.getElementById("listaSeccionesConfig");
        cont.innerHTML = "";

        const critMap = {};
        (this.grupoActivo.criterios || []).forEach(c => {
          critMap[c.codigo] = Number(c.ponderacion || 0);
        });

        let sumaPond = 0;
        this.grupoActivo.secciones.forEach(sec => {
          sumaPond += Number(sec.ponderacion || 0);
          const card = document.createElement("div");
          card.className = "item-card";
          const secColorIntens = this.obtenerColorIntensificado(sec.color, sec.ponderacion);
          card.style.borderLeft = `5px solid ${secColorIntens}`;

          const critCount = sec.criterios ? sec.criterios.length : 0;
          const critListText = sec.criterios && sec.criterios.length > 0
            ? sec.criterios.map(cod => `${cod} (${critMap[cod] !== undefined ? critMap[cod] : 0}%)`).join(", ")
            : "Ninguno (0%)";

          card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" class="chk-seccion" value="${sec.id}" onchange="app.actualizarContadorSeccionesSeleccionadas()" style="width: 16px; height: 16px; cursor: pointer;" />
              <div>
                <strong>${this.escapeHtml(sec.nombre)}</strong>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
                  Ponderación: <strong style="color: #2563eb;">${sec.ponderacion}%</strong> (calculada automáticamente)
                </div>
                <div style="font-size: 0.76rem; color: #64748b; margin-top: 2px;">
                  🎯 Criterios: ${critListText}
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-sm btn-secondary" onclick="app.abrirModalEditarSeccion('${sec.id}')">⚙️ Configurar</button>
              <button class="btn btn-sm btn-danger" onclick="app.solicitarEliminarSeccion('${sec.id}')">🗑️</button>
            </div>
          `;
          cont.appendChild(card);
        });

        const txt = document.getElementById("sumaPonderacionesTxt");
        txt.textContent = `Suma total de ponderaciones de las secciones: ${sumaPond}% ${sumaPond === 100 ? "✅ (Correcto: 100%)" : "⚠️ (Recomendado: 100%)"}`;
        this.actualizarContadorSeccionesSeleccionadas();
      }

      abrirModalNuevaSeccion() {
        document.getElementById("modalSeccionTitulo").textContent = "Nueva Sección";
        document.getElementById("seccionIdxEdit").value = "";
        document.getElementById("secNombre").value = "";
        const colores = ["#2563eb", "#7c3aed", "#db2777", "#ea580c", "#16a34a", "#0284c7", "#4f46e5", "#ca8a04"];
        document.getElementById("secColor").value = colores[Math.floor(Math.random() * colores.length)];

        const box = document.getElementById("secCriteriosChecks");
        box.innerHTML = "";
        const criterios = this.grupoActivo.criterios || [];

        const actualizarSumaModal = () => {
          const chks = box.querySelectorAll("input[type='checkbox']:checked");
          let suma = 0;
          chks.forEach(chk => {
            const crit = criterios.find(c => c.codigo === chk.value);
            suma += Number(crit ? crit.ponderacion || 0 : 0);
          });
          document.getElementById("secPonderacion").value = suma;
        };

        criterios.forEach(crit => {
          const label = document.createElement("label");
          label.style.display = "flex";
          label.style.alignItems = "center";
          label.style.gap = "6px";
          label.style.fontSize = "0.82rem";
          label.style.marginBottom = "4px";
          label.style.cursor = "pointer";

          const chk = document.createElement("input");
          chk.type = "checkbox";
          chk.value = crit.codigo;
          chk.onchange = actualizarSumaModal;

          label.appendChild(chk);
          label.appendChild(document.createTextNode(`${crit.codigo} (${crit.ponderacion || 0}%) - ${crit.descripcion.substring(0, 50)}...`));
          box.appendChild(label);
        });

        actualizarSumaModal();
        this.abrirModal("modalSeccion");
      }

      actualizarContadorSeccionesSeleccionadas() {
        const chks = document.querySelectorAll(".chk-seccion:checked");
        const count = chks.length;
        const total = document.querySelectorAll(".chk-seccion").length;
        const btnEliminar = document.getElementById("btnEliminarSeccionesSeleccionadas");
        const countSpan = document.getElementById("countSeccionesSel");
        const btnToggle = document.getElementById("btnToggleSelSecciones");

        if (countSpan) countSpan.textContent = count;
        if (btnEliminar) btnEliminar.style.display = count > 0 ? "inline-flex" : "none";
        if (btnToggle) {
          btnToggle.textContent = (total > 0 && count === total) ? "☐ Deseleccionar Todas" : "☑️ Seleccionar Todas";
        }
      }

      alternarSeleccionTodasSecciones() {
        const chks = document.querySelectorAll(".chk-seccion");
        const chksChecked = document.querySelectorAll(".chk-seccion:checked");
        const marcar = chksChecked.length < chks.length;
        chks.forEach(c => c.checked = marcar);
        this.actualizarContadorSeccionesSeleccionadas();
      }

      solicitarEliminarSeccionesSeleccionadas() {
        const chks = Array.from(document.querySelectorAll(".chk-seccion:checked"));
        const ids = chks.map(c => c.value);
        if (ids.length === 0) {
          alert("No hay ninguna sección seleccionada.");
          return;
        }
        this.mostrarConfirmacion(
          `¿Eliminar las <strong>${ids.length}</strong> secciones seleccionadas?`,
          () => {
            this.grupoActivo.secciones = this.grupoActivo.secciones.filter(s => !ids.includes(s.id));
            this.recalcularPonderacionesSecciones();
            this.guardarDatos();
            this.renderizarListaSecciones();
            this.actualizarUI();
          }
        );
      }

      solicitarEliminarSeccion(secId) {
        const sec = this.grupoActivo.secciones.find(s => s.id === secId);
        if (!sec) return;
        this.mostrarConfirmacion(
          `¿Eliminar la sección <strong>"${this.escapeHtml(sec.nombre)}"</strong>?`,
          () => {
            this.grupoActivo.secciones = this.grupoActivo.secciones.filter(s => s.id !== secId);
            this.recalcularPonderacionesSecciones();
            this.guardarDatos();
            this.renderizarListaSecciones();
            this.actualizarUI();
          }
        );
      }

      asignarCriteriosASeccionesAuto() {
        if (!this.grupoActivo) return;
        const criterios = this.grupoActivo.criterios || [];
        if (criterios.length === 0) {
          alert("No hay criterios configurados en este grupo. Añade o importa criterios primero.");
          return;
        }

        if (this.grupoActivo.secciones && this.grupoActivo.secciones.length > 0) {
          if (!confirm(`¿Deseas reemplazar las ${this.grupoActivo.secciones.length} secciones actuales por una sección individual para cada uno de los ${criterios.length} criterios?`)) {
            return;
          }
        }

        const colores = ["#2563eb", "#7c3aed", "#db2777", "#ea580c", "#16a34a", "#0284c7", "#4f46e5", "#ca8a04", "#0891b2", "#c026d3", "#059669", "#d97706"];
        
        const nuevasSecciones = criterios.map((crit, idx) => {
          return {
            id: "sec-crit-" + crit.codigo.replace(/[^a-zA-Z0-9]/g, "-") + "-" + idx,
            nombre: `${crit.codigo}. ${crit.descripcion}`,
            color: colores[idx % colores.length],
            ponderacion: Number(crit.ponderacion || 0),
            criterios: [crit.codigo]
          };
        });

        this.grupoActivo.secciones = nuevasSecciones;
        this.recalcularPonderacionesSecciones();
        this.guardarDatos();
        this.renderizarListaSecciones();
        this.mostrarToast(`Se han creado y asignado ${nuevasSecciones.length} secciones (una por cada criterio).`);
      }

      // 5. Rúbricas
      renderizarListaRubricas() {
        const cont = document.getElementById("listaRubricas");
        cont.innerHTML = "";
        const rubricas = this.grupoActivo.rubricas || [];

        if (rubricas.length === 0) {
          cont.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">No hay rúbricas creadas.</div>`;
          this.actualizarContadorRubricasSeleccionadas();
          return;
        }

        rubricas.forEach(rub => {
          const card = document.createElement("div");
          card.className = "item-card";
          const fechaStr = rub.fechaCreacion || rub.fecha || "";
          const fechaFmt = fechaStr ? this.formatearFecha(fechaStr.split("T")[0]) : "Sin fecha";
          const numAspectos = rub.aspectos ? rub.aspectos.length : (rub.items ? rub.items.length : 0);

          card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" class="chk-rubrica" value="${rub.id}" onchange="app.actualizarContadorRubricasSeleccionadas()" style="width: 16px; height: 16px; cursor: pointer;" />
              <div>
                <strong style="font-size: 0.95rem; color: var(--text);">${this.escapeHtml(rub.titulo)}</strong>
                <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px; margin-top: 3px; flex-wrap: wrap;">
                  <span>${this.escapeHtml(rub.descripcion || "")} • ${numAspectos} aspectos de evaluación</span>
                  <span style="background: #f1f5f9; color: #334155; padding: 2px 7px; border-radius: 4px; font-weight: 600; font-size: 0.75rem; border: 1px solid #cbd5e1; display: inline-flex; align-items: center; gap: 4px;">
                    📅 Creada: ${fechaFmt}
                  </span>
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-sm btn-secondary" onclick="app.abrirConfigurarRubrica('${rub.id}')">⚙️ Configuración</button>
              <button class="btn btn-sm btn-secondary" onclick="app.exportarRubrica('${rub.id}')">📤 Exportar</button>
              <button class="btn btn-sm btn-danger" onclick="app.solicitarEliminarRubrica('${rub.id}')">🗑️</button>
            </div>
          `;
          cont.appendChild(card);
        });
        this.actualizarContadorRubricasSeleccionadas();
      }

      actualizarContadorRubricasSeleccionadas() {
        const chks = document.querySelectorAll(".chk-rubrica:checked");
        const count = chks.length;
        const total = document.querySelectorAll(".chk-rubrica").length;

        // Config view counter
        const btnEliminar = document.getElementById("btnEliminarRubricasSeleccionadas");
        const countSpan = document.getElementById("countRubricasSel");
        const btnToggle = document.getElementById("btnToggleSelRubricas");

        if (countSpan) countSpan.textContent = count;
        if (btnEliminar) btnEliminar.style.display = count > 0 ? "inline-flex" : "none";
        if (btnToggle) {
          btnToggle.textContent = (total > 0 && count === total) ? "☐ Deseleccionar Todas" : "☑️ Seleccionar Todas";
        }

        // Main rubrics view counter
        const btnEliminarMain = document.getElementById("btnEliminarRubricasSeleccionadasMain");
        const countSpanMain = document.getElementById("countRubricasSelMain");
        const btnToggleMain = document.getElementById("btnToggleSelRubricasMain");

        if (countSpanMain) countSpanMain.textContent = count;
        if (btnEliminarMain) btnEliminarMain.style.display = count > 0 ? "inline-flex" : "none";
        if (btnToggleMain) {
          btnToggleMain.textContent = (total > 0 && count === total) ? "☐ Deseleccionar Todas" : "☑️ Seleccionar Todas";
        }
      }

      alternarSeleccionTodasRubricas() {
        const chks = document.querySelectorAll(".chk-rubrica");
        const chksChecked = document.querySelectorAll(".chk-rubrica:checked");
        const marcar = chksChecked.length < chks.length;
        chks.forEach(c => c.checked = marcar);
        this.actualizarContadorRubricasSeleccionadas();
      }

      solicitarEliminarRubricasSeleccionadas() {
        const chks = Array.from(document.querySelectorAll(".chk-rubrica:checked"));
        const ids = chks.map(c => c.value);
        if (ids.length === 0) {
          alert("No hay ninguna rúbrica seleccionada.");
          return;
        }
        this.mostrarConfirmacion(
          `¿Eliminar las <strong>${ids.length}</strong> rúbricas seleccionadas?<br><br>Se eliminarán permanentemente de este grupo.`,
          () => {
            if (!this.grupoActivo || !this.grupoActivo.rubricas) return;
            this.grupoActivo.rubricas = (this.grupoActivo.rubricas || []).filter(r => !ids.includes(r.id));
            this.guardarDatos();
            this.renderizarRubricasView();
            if (document.getElementById("listaRubricas")) {
              this.renderizarListaRubricas();
            }
            if (this.vistaActiva === "cuaderno") {
              this.renderizarCuaderno();
            }
            this.actualizarUI();
            this.mostrarToast(`🗑️ ${ids.length} rúbricas eliminadas correctamente.`);
          }
        );
      }

      exportarResultadosExcel() {
        if (!this.grupoActivo) return;
        const evalNombre = this.evaluacionActiva === "final" ? "Final" : (this.evaluacionActiva.toUpperCase());
        const filename = `Resultados_${(this.grupoActivo.nombre || 'Curso').replace(/[^a-zA-Z0-9_\-]/g, '_')}_${evalNombre}.xlsx`;

        if (window.rubricEngine && window.rubricEngine.exportTableToExcel) {
          window.rubricEngine.exportTableToExcel("tablaResultados", filename);
        } else {
          this.exportarTablaExcelHTML("tablaResultados", filename);
        }
        this.mostrarToast("📊 Tabla de resultados exportada correctamente a Excel.");
      }

      exportarTablaExcelHTML(tableId, filename) {
        const table = document.getElementById(tableId);
        if (!table) return;
        const html = table.outerHTML;
        const url = 'data:application/vnd.ms-excel;charset=utf-8,\uFEFF' + encodeURIComponent(html);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename.endsWith('.xls') || filename.endsWith('.xlsx') ? filename : filename + '.xls';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      modalEditRubrica(rubId) {
        this.abrirConfigurarRubrica(rubId);
      }

      abrirConfigurarRubrica(rubId) {
        const rub = (this.grupoActivo.rubricas || []).find(r => r.id === rubId);
        if (!rub) return;

        document.getElementById("editRubricaId").value = rub.id;
        document.getElementById("editRubTitulo").value = rub.titulo;
        document.getElementById("editRubDesc").value = rub.descripcion || "";
        const fechaEl = document.getElementById("editRubFechaCreacion");
        if (fechaEl) {
          fechaEl.value = (rub.fechaCreacion || rub.fecha || new Date().toISOString().split("T")[0]).split("T")[0];
        }
        document.getElementById("modalEditRubricaTitulo").textContent = `⚙️ Configurar Rúbrica: ${rub.titulo}`;

        this.actualizarLabelsDisponibilidadUI();
        if (rub.esCompartida) {
          const rComp = document.getElementById("editRubDispCompartida");
          if (rComp) rComp.checked = true;
        } else {
          const rPriv = document.getElementById("editRubDispPrivada");
          if (rPriv) rPriv.checked = true;
        }

        this.renderizarAspectosEnModalRubrica(rub.aspectos || []);
        this.abrirModal("modalEditRubrica");
      }

      anadirRubricaADiarioClase() {
        if (!this.grupoActivo) {
          this.mostrarToast("⚠️ Selecciona primero un grupo de alumnos.");
          return;
        }

        const rubId = document.getElementById("editRubricaId") ? document.getElementById("editRubricaId").value : "";
        const rub = (this.grupoActivo.rubricas || []).find(r => r.id === rubId);

        const inputTitulo = document.getElementById("editRubTitulo");
        const inputFecha = document.getElementById("editRubFechaCreacion");

        const titulo = (inputTitulo && inputTitulo.value.trim()) ? inputTitulo.value.trim() : (rub ? rub.titulo : "Rúbrica");
        const fecha = (inputFecha && inputFecha.value) ? inputFecha.value : (rub && (rub.fechaCreacion || rub.fecha) ? (rub.fechaCreacion || rub.fecha).split("T")[0] : new Date().toISOString().split("T")[0]);

        if (!this.grupoActivo.diarioClase) {
          this.grupoActivo.diarioClase = [];
        }

        if (rub) {
          rub.titulo = titulo;
          if (fecha) rub.fechaCreacion = fecha;
        }

        const existeMismoDiaYDesc = this.grupoActivo.diarioClase.some(e => e.fecha === fecha && (e.descripcion || "").trim().toLowerCase() === titulo.trim().toLowerCase());
        if (existeMismoDiaYDesc) {
          const fechaFmt = this.formatearFecha ? this.formatearFecha(fecha) : fecha;
          this.mostrarToast(`ℹ️ La actividad "${titulo}" ya está registrada en el Diario de clase para el ${fechaFmt}.`);
          return;
        }

        const nuevoEvt = {
          id: "evt-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
          fecha: fecha,
          descripcion: titulo,
          creadoEn: new Date().toISOString()
        };

        this.grupoActivo.diarioClase.push(nuevoEvt);
        this.grupoActivo.diarioClase.sort((a, b) => (a.fecha || "").localeCompare(b.fecha || ""));
        this.guardarDatos();

        const fechaFmt = this.formatearFecha ? this.formatearFecha(fecha) : fecha;
        this.mostrarToast(`📖 Actividad "${titulo}" añadida al Diario de clase (${fechaFmt}).`);
      }

      renderizarAspectosEnModalRubrica(aspectos) {
        const cont = document.getElementById("containerAspectosRubrica");
        cont.innerHTML = "";

        aspectos.forEach((asp, idx) => {
          const card = document.createElement("div");
          card.style.background = "#f8fafc";
          card.style.border = "1px solid #e2e8f0";
          card.style.borderRadius = "6px";
          card.style.padding = "10px";
          card.style.display = "flex";
          card.style.gap = "8px";
          card.style.alignItems = "center";
          card.innerHTML = `
            <div style="flex: 1;">
              <input type="text" class="form-control asp-nombre-input" value="${asp.nombre}" placeholder="Nombre del aspecto" style="font-size: 0.85rem;" />
            </div>
            <div style="width: 90px;">
              <input type="number" class="form-control asp-peso-input" value="${asp.peso || 0}" placeholder="Peso %" min="0" max="100" style="font-size: 0.85rem;" />
            </div>
            <button class="btn btn-sm btn-danger" onclick="this.closest('div').remove()">🗑️</button>
          `;
          cont.appendChild(card);
        });
      }

      agregarAspectoEnModalRubrica() {
        const cont = document.getElementById("containerAspectosRubrica");
        const card = document.createElement("div");
        card.style.background = "#f8fafc";
        card.style.border = "1px solid #e2e8f0";
        card.style.borderRadius = "6px";
        card.style.padding = "10px";
        card.style.display = "flex";
        card.style.gap = "8px";
        card.style.alignItems = "center";
        card.innerHTML = `
          <div style="flex: 1;">
            <input type="text" class="form-control asp-nombre-input" value="" placeholder="Nombre del nuevo aspecto" style="font-size: 0.85rem;" />
          </div>
          <div style="width: 90px;">
            <input type="number" class="form-control asp-peso-input" value="25" placeholder="Peso %" min="0" max="100" style="font-size: 0.85rem;" />
          </div>
          <button class="btn btn-sm btn-danger" onclick="this.closest('div').remove()">🗑️</button>
        `;
        cont.appendChild(card);
      }

      rubricaTieneEvaluaciones(rubricaId, grupoTarget = this.grupoActivo) {
        if (!grupoTarget || !grupoTarget.evaluaciones) return false;
        for (const evalKey in grupoTarget.evaluaciones) {
          const evalData = grupoTarget.evaluaciones[evalKey];
          if (evalData && evalData.calificacionesRubricas && evalData.calificacionesRubricas[rubricaId]) {
            const califsAlumnos = evalData.calificacionesRubricas[rubricaId];
            for (const aluId in califsAlumnos) {
              const itemScores = califsAlumnos[aluId];
              if (itemScores && typeof itemScores === "object") {
                const keys = Object.keys(itemScores);
                if (keys.some(k => itemScores[k] !== undefined && itemScores[k] !== null && itemScores[k] !== "")) {
                  return true;
                }
              }
            }
          }
        }
        return false;
      }

      guardarConfiguracionRubrica() {
        const rubId = document.getElementById("editRubricaId").value;
        const rub = (this.grupoActivo.rubricas || []).find(r => r.id === rubId);
        if (!rub) return;

        const titulo = document.getElementById("editRubTitulo").value.trim();
        if (!titulo) {
          alert("Indica un título para la rúbrica.");
          return;
        }

        const rCompartida = document.getElementById("editRubDispCompartida");
        const esCompartida = rCompartida ? rCompartida.checked : (rub.esCompartida || false);

        const cont = document.getElementById("containerAspectosRubrica");
        const aspectCards = cont ? cont.children : [];
        const nuevosAspectos = [];

        for (let card of aspectCards) {
          const nombreInput = card.querySelector(".asp-nombre-input");
          const pesoInput = card.querySelector(".asp-peso-input");
          if (nombreInput && nombreInput.value.trim()) {
            const aspNombre = nombreInput.value.trim();
            const aspPeso = Number(pesoInput ? pesoInput.value : 0) || 0;
            const originalAsp = (rub.aspectos || []).find(a => a.nombre === aspNombre);
            const niveles = originalAsp ? originalAsp.niveles : [
              { desc: "Insuficiente", puntos: 2.5 },
              { desc: "Suficiente", puntos: 5.0 },
              { desc: "Notable", puntos: 7.5 },
              { desc: "Sobresaliente", puntos: 10.0 }
            ];
            nuevosAspectos.push({ nombre: aspNombre, peso: aspPeso, niveles });
          }
        }

        // Si la rúbrica ya tiene calificaciones, comprobar si se modifican/eliminan elementos estructurales
        const tieneEvaluaciones = this.rubricaTieneEvaluaciones(rub.id);
        if (tieneEvaluaciones && nuevosAspectos.length > 0) {
          const numAnt = (rub.aspectos || []).length;
          const numNuevos = nuevosAspectos.length;
          const nombresAnt = (rub.aspectos || []).map(a => a.nombre.trim()).sort().join("|");
          const nombresNuevos = nuevosAspectos.map(a => a.nombre.trim()).sort().join("|");

          const cambioEstructural = numAnt !== numNuevos || nombresAnt !== nombresNuevos;
          if (cambioEstructural) {
            const confirmarGuardado = confirm(
              "⚠️ ATENCIÓN: Esta rúbrica ya contiene calificaciones registradas para el alumnado.\n\n" +
              "Modificar o eliminar elementos estructurales puede alterar la correspondencia de las calificaciones existentes.\n\n" +
              "¿Deseas continuar y guardar los cambios estructurales de todas formas?"
            );
            if (!confirmarGuardado) {
              return; // Cancela la operación sin modificar la rúbrica ni perder datos.
            }
          }
        }

        rub.titulo = titulo;
        rub.descripcion = document.getElementById("editRubDesc").value.trim();
        rub.esCompartida = esCompartida;

        const fechaEl = document.getElementById("editRubFechaCreacion");
        if (fechaEl && fechaEl.value) {
          rub.fechaCreacion = fechaEl.value;
        }

        if (nuevosAspectos.length > 0) {
          rub.aspectos = nuevosAspectos;
        }

        // Sincronizar o versionar plantilla compartida
        this.crearOActualizarPlantilla(rub, rub.origenGrupoId || this.grupoActivo.id, esCompartida);

        this.guardarDatos();
        this.cerrarModal("modalEditRubrica");
        this.renderizarListaRubricas();
        this.renderizarRubricasView();
        this.mostrarToast("Configuración de la rúbrica guardada correctamente.");
      }

      modalNuevaRubrica() {
        this.abrirModalCrearRubricaPaso1();
      }

      exportarRubrica(rubId) {
        const rub = this.grupoActivo.rubricas.find(r => r.id === rubId);
        if (!rub) return;
        const str = JSON.stringify(rub, null, 2);
        const blob = new Blob([str], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `rubrica_${rub.titulo.toLowerCase().replace(/\s+/g, '_')}.json`;
        a.click();
      }

      modalImportarRubrica() {
        this.abrirImportadorRubrica("actividades");
      }

      solicitarEliminarRubrica(rubId) {
        const rub = this.grupoActivo.rubricas.find(r => r.id === rubId);
        if (!rub) return;

        this.mostrarConfirmacion(
          `¿Deseas eliminar la rúbrica <strong>"${this.escapeHtml(rub.titulo)}"</strong>?`,
          () => {
            this.grupoActivo.rubricas = this.grupoActivo.rubricas.filter(r => r.id !== rubId);
            this.guardarDatos();
            this.renderizarListaRubricas();
            this.renderizarRubricasView();
            this.actualizarUI();
            this.mostrarToast("🗑️ Rúbrica eliminada.");
          }
        );
      }

      // 6. Copias de seguridad e Importación / Exportación
      descargarBackup() {
        const str = JSON.stringify(this.data, null, 2);
        const blob = new Blob([str], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `backup_cuaderno_evaluacion_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
      }

      cargarBackup(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.mostrarConfirmacion(
          `¿Estás seguro de que deseas restaurar la copia de seguridad?<br><br>Se sustituirán todos los cursos, calificaciones y configuraciones actuales por los del archivo y se guardarán en Supabase.`,
          () => {
            const reader = new FileReader();
            reader.onload = async (e) => {
              try {
                const parsed = JSON.parse(e.target.result);
                if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.grupos)) {
                  throw new Error("El archivo no contiene un formato de cuaderno válido (debe incluir la lista de grupos).");
                }
                // OWASP A08: Defensa contra contaminación de prototipos (Prototype Pollution)
                delete parsed.__proto__;
                delete parsed.constructor;
                delete parsed.prototype;

                this.data = parsed;
                this.guardarDatos();
                this.cargarDatos();
                this.actualizarUI();

                if (window.supabaseSync) {
                  this.mostrarToast("⏳ Guardando toda la información del JSON en Supabase...");
                  const ok = await window.supabaseSync.syncNotebookToSupabase('docente_borborigmo_gmail_com', parsed);
                  if (ok) {
                    this.mostrarToast(`✅ ¡${parsed.grupos.length} grupo(s) del JSON guardados en Supabase correctamente!`);
                  } else {
                    this.mostrarToast("⚠️ Copia cargada en local. Revisa la conexión con Supabase.");
                  }
                }
                alert(`✅ Copia de seguridad restaurada correctamente con ${parsed.grupos.length} grupo(s) y guardada en Supabase.`);
              } catch (err) {
                alert("Error al procesar el archivo JSON: " + (err.message || "Formato inválido."));
              } finally {
                if (event && event.target) event.target.value = "";
              }
            };
            reader.readAsText(file);
          }
        );
      }

      restablecerDatosEjemplo() {
        this.mostrarConfirmacion(
          "¿Deseas restablecer los datos con el ejemplo completo oficial de 1º ESO (Castilla y León)?",
          () => {
            this.crearEstructuraBase();
            this.cargarDatos();
            this.actualizarUI();
          }
        );
      }

      exportarCSVGoogleSheets(soloGrupoActivo = false) {
        const gruposAExportar = soloGrupoActivo && this.grupoActivo 
          ? [this.grupoActivo] 
          : (this.grupos && this.grupos.length > 0 ? this.grupos : (this.grupoActivo ? [this.grupoActivo] : []));

        if (gruposAExportar.length === 0) {
          this.mostrarToast("⚠️ No hay grupos registrados para exportar.");
          return;
        }

        const evalKey = this.evaluacionActiva || "eval1";
        const evalNombre = evalKey === "final" ? "Final" : evalKey.toUpperCase();

        // Recopilar todos los códigos de criterios únicos
        let codigosCriterios = new Set();
        gruposAExportar.forEach(g => {
          (g.criterios || []).forEach(c => {
            if (c.codigo) codigosCriterios.add(c.codigo);
          });
        });
        const listaCodigosCriterios = Array.from(codigosCriterios).sort();

        let lineas = [];

        // Cabecera CSV para Google Sheets
        let cabecera = [
          "Grupo",
          "Nombre del Alumno",
          "Evaluación"
        ];

        listaCodigosCriterios.forEach(codigo => {
          cabecera.push(`Crit_${codigo}`);
        });

        cabecera.push("Nota_Final_Ponderada");
        cabecera.push("Puntos_Comportamiento_Activos");
        cabecera.push("Faltas_Leves");
        cabecera.push("Faltas_Graves");
        cabecera.push("Conductas_Positivas");
        cabecera.push("Estado_Comportamiento");
        cabecera.push("Historial_Incidencias");

        lineas.push(cabecera.map(val => `"${val.replace(/"/g, '""')}"`).join(";"));

        let totalAlumnos = 0;

        gruposAExportar.forEach(grupo => {
          const alumnos = (grupo.alumnos || []).slice().sort((a, b) => (a.orden || 0) - (b.orden || 0));
          const criteriosGrupo = grupo.criterios || [];

          alumnos.forEach(alu => {
            totalAlumnos++;
            let fila = [
              `"${this.sanitizeCsvField(grupo.nombre || "")}"`,
              `"${this.sanitizeCsvField(alu.nombre || "")}"`,
              `"${this.sanitizeCsvField(evalNombre)}"`
            ];

            // Criterios / Notas
            listaCodigosCriterios.forEach(codigo => {
              const crit = criteriosGrupo.find(c => c.codigo === codigo);
              if (crit) {
                let n = (evalKey === "final") ? 
                  this.calcularNotaCriterioAlumnoFinal(crit.codigo, alu.id, grupo) : 
                  this.calcularNotaCriterioAlumnoEnEval(crit.codigo, alu.id, evalKey, grupo);
                fila.push(n !== null && n !== undefined && !isNaN(n) ? `"${this.sanitizeCsvField(n.toFixed(2).replace(".", ","))}"` : '""');
              } else {
                fila.push('""');
              }
            });

            // Nota Final Ponderada
            let nFin = this.calcularNotaFinalGlobalAlumno(alu.id, evalKey, grupo);
            fila.push(nFin !== null && nFin !== undefined && !isNaN(nFin) ? `"${this.sanitizeCsvField(nFin.toFixed(2).replace(".", ","))}"` : '""');

            // Comportamiento y Puntos
            const statsPuntos = this.calcularPuntosAlumno(alu.id, grupo);
            fila.push(`"${this.sanitizeCsvField(statsPuntos.activePoints)}"`);
            fila.push(`"${this.sanitizeCsvField(statsPuntos.levesCount)}"`);
            fila.push(`"${this.sanitizeCsvField(statsPuntos.gravesCount)}"`);
            fila.push(`"${this.sanitizeCsvField(statsPuntos.positivasCount)}"`);

            const badgeLabel = statsPuntos.badge?.text || statsPuntos.badge?.label || statsPuntos.level || "0 pts";
            fila.push(`"${this.sanitizeCsvField(badgeLabel)}"`);

            // Historial de Incidencias / Comportamiento
            const incidenciasAlu = (grupo.incidencias || []).filter(inc => inc.alumnoId === alu.id);
            const resumenHistorial = incidenciasAlu.map(inc => {
              const fecha = inc.fecha ? inc.fecha.split("T")[0] : "";
              const tipoStr = (inc.tipo || 'incidencia').toUpperCase();
              const desc = inc.descripcion || 'Sin descripción';
              const pts = inc.puntos !== undefined ? inc.puntos : (inc.tipo === 'grave' ? 2 : (inc.tipo === 'leve' ? 1 : -1));
              return `[${fecha}] ${tipoStr}: ${desc} (${pts > 0 ? '+' + pts : pts} pts)`;
            }).join(" | ");

            fila.push(`"${this.sanitizeCsvField(resumenHistorial)}"`);

            lineas.push(fila.join(";"));
          });
        });

        if (totalAlumnos === 0) {
          this.mostrarToast("⚠️ No se encontraron alumnos en los grupos para exportar.");
          return;
        }

        const csvContent = "\uFEFF" + lineas.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const hoy = new Date().toISOString().split("T")[0];
        const gNombre = soloGrupoActivo && this.grupoActivo ? (this.grupoActivo.nombre || "Grupo").replace(/[^a-zA-Z0-9_\-]/g, "_") : "Todos_los_Grupos";
        a.download = `FernanDiTio_GoogleSheets_${gNombre}_${evalNombre}_${hoy}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.mostrarToast(`📊 Exportación a Google Sheets lista (${totalAlumnos} alumnos procesados).`);
      }

      exportarCSV() {
        this.exportarCSVGoogleSheets(true);
      }

      // --- SINCRONIZACIÓN NUBE Y MÓVIL (SUPABASE POSTGRESQL) ---
      async conectarSupabaseSync() {
        if (window.supabaseSync) {
          try {
            const remoteData = await window.supabaseSync.fetchNotebookFromSupabase('docente_borborigmo_gmail_com');
            console.log('[Supabase Sync] Datos remotos cargados correctamente de Supabase.');
            this.data = remoteData || { grupos: [] };
            const storageKey = this.getStorageKey();
            if (storageKey) {
              localStorage.setItem(storageKey, JSON.stringify(this.data));
            }
            this.actualizarUI();
          } catch (e) {
            console.warn('[Supabase Init Sync Warning]:', e);
          }
        }
      }

      conectarFirebaseSync() {
        let lastUid = null;

        const setup = (sync) => {
          if (!sync) return;
          sync.onStatusChange((status) => {
            this.actualizarEstadoNubeUI(status);

            if (status.authState === 'checking') {
              // Esperar a que la autenticación esté confirmada antes de tomar decisiones sobre datos
              return;
            }

            if (status.authState === 'unauthenticated' || !status.user) {
              lastUid = null;
              window.firebaseAuthCurrentUserUid = null;
              this.limpiarEstadoUsuario();
              return;
            }

            const currentUid = status.user.uid;
            if (lastUid !== currentUid || !this._initializationCompleted) {
              lastUid = currentUid;
              window.firebaseAuthCurrentUserUid = currentUid;
              this.consolidarInicializacion(currentUid);
            }
          });

          sync.onRemoteData((remoteData) => {
            if (sync.status && sync.status.user) {
              this.aplicarDatosRemotos(remoteData);
            }
          });

          sync.onSyncConflict((info) => this.mostrarModalConflictoSync(info));

          if (sync.status && sync.status.authState !== 'checking') {
            if (sync.status.authState === 'unauthenticated' || !sync.status.user) {
              lastUid = null;
              window.firebaseAuthCurrentUserUid = null;
              this.limpiarEstadoUsuario();
            } else {
              const currentUid = sync.status.user.uid;
              lastUid = currentUid;
              window.firebaseAuthCurrentUserUid = currentUid;
              this.consolidarInicializacion(currentUid);
            }
          }
        };

        if (window.firebaseSync) {
          setup(window.firebaseSync);
        } else {
          window.addEventListener("firebaseSyncReady", (e) => {
            setup(e.detail || window.firebaseSync);
          });
        }
      }

      mostrarModalConflictoSync(info) {
        this.pendingSyncConflict = info;
        const localDateEl = document.getElementById("conflictoFechaLocal");
        const localInfoEl = document.getElementById("conflictoInfoLocal");
        const cloudDateEl = document.getElementById("conflictoFechaNube");
        const cloudInfoEl = document.getElementById("conflictoInfoNube");

        if (localDateEl) localDateEl.textContent = `Fecha: ${info.localData && info.localData.lastModified ? this.formatearHoraCompleta(info.localData.lastModified) : 'Desconocida'}`;
        if (localInfoEl) localInfoEl.textContent = `Cursos: ${info.localData && info.localData.grupos ? info.localData.grupos.length : 0}`;

        if (cloudDateEl) cloudDateEl.textContent = `Fecha: ${this.formatearHoraCompleta(info.remoteUpdatedAt)}`;
        if (cloudInfoEl) cloudInfoEl.textContent = `Cursos: ${info.remoteData && info.remoteData.grupos ? info.remoteData.grupos.length : 0}`;

        let grupoNombre = "";
        if (info.localData && info.localData.grupos && info.localData.grupoActivoId) {
          const gLocal = info.localData.grupos.find(g => g.id === info.localData.grupoActivoId);
          if (gLocal) grupoNombre = gLocal.nombre;
        }
        if (!grupoNombre && info.remoteData && info.remoteData.grupos && info.remoteData.grupoActivoId) {
          const gRemote = info.remoteData.grupos.find(g => g.id === info.remoteData.grupoActivoId);
          if (gRemote) grupoNombre = gRemote.nombre;
        }
        if (!grupoNombre && this.grupoActivo) {
          grupoNombre = this.grupoActivo.nombre;
        }

        const grupoEl = document.getElementById("conflictoGrupoAfectadoNombre");
        if (grupoEl) {
          grupoEl.textContent = grupoNombre || "Grupo Activo";
        }

        const compDiv = document.getElementById("conflictoDetalleComparacion");
        if (compDiv) {
          compDiv.style.display = "none";
          compDiv.innerHTML = `
            <strong>Detalles de discrepancia:</strong><br>
            - Último grupo afectado: <strong>${grupoNombre || 'Desconocido'}</strong><br>
            - Versión Local: ${info.localData ? info.localData.version || 1 : 1}<br>
            - Versión Nube: ${info.remoteData ? info.remoteData.version || 1 : 1} (Modificado: ${info.remoteUpdatedAt})
          `;
        }

        this.abrirModal("modalConflictoSync");
      }

      alternarDetalleConflictoSync() {
        const compDiv = document.getElementById("conflictoDetalleComparacion");
        if (compDiv) {
          compDiv.style.display = compDiv.style.display === "none" ? "block" : "none";
        }
      }

      resolverConflictoSync(opcion) {
        if (!this.pendingSyncConflict) return;
        if (opcion === 'local') {
          if (window.firebaseSync) {
            window.firebaseSync.saveData(this.data, true);
          }
          this.mostrarNotificacionToast("💻 Se mantuvo la versión local y se subió a la nube.");
        } else if (opcion === 'remote') {
          if (window.firebaseSync) {
            window.firebaseSync.applyRemoteData(this.pendingSyncConflict.remoteData, this.pendingSyncConflict.remoteUpdatedAt);
          }
          this.mostrarNotificacionToast("☁️ Se cargó la versión de la nube.");
        }
        this.cerrarModal("modalConflictoSync");
        this.pendingSyncConflict = null;
      }

      alternarPopoverNube(e) {
        if (e && typeof e.stopPropagation === "function") {
          e.stopPropagation();
        }
        if (this.popoverNubeAbierto) {
          this.cerrarPopoverNube();
        } else {
          this.abrirPopoverNube();
        }
      }

      abrirPopoverNube() {
        this.popoverNubeAbierto = true;
        this.actualizarEstadoNubeUI(this.cloudStatus);

        if (!this._popoverNubeListenersAttached) {
          this._popoverNubeListenersAttached = true;
          document.addEventListener("click", (evt) => {
            if (this.popoverNubeAbierto) {
              const headerEl = document.getElementById("cloudSyncHeader");
              if (headerEl && !headerEl.contains(evt.target)) {
                this.cerrarPopoverNube();
              }
            }
          });
          document.addEventListener("keydown", (evt) => {
            if (evt.key === "Escape" && this.popoverNubeAbierto) {
              this.cerrarPopoverNube();
            }
          });
        }
      }

      cerrarPopoverNube() {
        if (this.popoverNubeAbierto) {
          this.popoverNubeAbierto = false;
          const popoverEl = document.getElementById("cloudStatusPopover");
          if (popoverEl) {
            popoverEl.style.display = "none";
          }
        }
      }

      actualizarEstadoNubeUI(status) {
        this.cloudStatus = status || { state: 'disconnected', user: null, lastSynced: null };
        const headerEl = document.getElementById("cloudSyncHeader");
        if (headerEl) {
          const st = this.cloudStatus.state;
          const user = this.cloudStatus.user;
          const lastSyncedRaw = this.cloudStatus.lastSynced;

          headerEl.style.display = "flex";

          let dotEmoji = "🟢";
          let stateLabel = "Conectado";
          let stateBg = "#f0fdf4";
          let stateBorder = "#86efac";
          let stateTextColor = "#166534";

          if (user && (st === "synced" || st === "saving" || st === "pending")) {
            if (st === "saving") {
              dotEmoji = "🟠";
              stateLabel = "Sincronizando…";
              stateBg = "#fff7ed";
              stateBorder = "#fed7aa";
              stateTextColor = "#9a3412";
            } else if (st === "pending") {
              dotEmoji = "🟠";
              stateLabel = "Pendiente de sincronización";
              stateBg = "#fefce8";
              stateBorder = "#fef08a";
              stateTextColor = "#854d0e";
            } else {
              dotEmoji = "🟢";
              stateLabel = "Conectado";
              stateBg = "#f0fdf4";
              stateBorder = "#86efac";
              stateTextColor = "#166534";
            }
          } else if (st === "connecting") {
            dotEmoji = "🟠";
            stateLabel = "Sincronizando…";
            stateBg = "#fff7ed";
            stateBorder = "#fed7aa";
            stateTextColor = "#9a3412";
          } else if (st === "error") {
            dotEmoji = "🔴";
            stateLabel = "Error de sincronización";
            stateBg = "#fef2f2";
            stateBorder = "#fca5a5";
            stateTextColor = "#991b1b";
          } else {
            dotEmoji = "⚪";
            stateLabel = "Sin sesión activa";
            stateBg = "#f8fafc";
            stateBorder = "#cbd5e1";
            stateTextColor = "#475569";
          }

          const btnIndicatorHtml = `
            <button id="btnCloudStatusIndicator" class="btn-cloud-compact" onclick="app.alternarPopoverNube(event)"
              title="Estado de conexión: ${stateLabel}" aria-label="Estado de conexión: ${stateLabel}">
              <span style="font-size: 0.95rem; line-height: 1;">${dotEmoji}</span>
            </button>
          `;

          let btnLogoutHtml = "";
          if (user) {
            btnLogoutHtml = `
              <button id="btnCloudHeaderLogout" class="btn-cloud-compact btn-logout" onclick="app.cerrarSesionNube()"
                title="Cerrar sesión" aria-label="Cerrar sesión">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            `;
          }

          const isPopoverOpen = !!this.popoverNubeAbierto;
          const popoverDisplayStyle = isPopoverOpen ? "block" : "none";

          const userEmail = user ? (user.email || user.displayName || "Usuario registrado") : null;
          const grupoNombre = this.grupoActivo ? this.grupoActivo.nombre : null;

          let lastSyncedText = "Sin sincronizar aún";
          if (lastSyncedRaw) {
            try {
              const d = new Date(lastSyncedRaw);
              lastSyncedText = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } catch (e) {
              lastSyncedText = String(lastSyncedRaw);
            }
          }

          let popoverBodyHtml = `
            <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; padding: 6px 10px; background: ${stateBg}; border: 1px solid ${stateBorder}; color: ${stateTextColor}; border-radius: 8px; margin-bottom: 10px;">
              <span style="font-size: 1rem;">${dotEmoji}</span>
              <span style="font-size: 0.88rem;">${stateLabel}</span>
            </div>
          `;

          if (user) {
            popoverBodyHtml += `
              <div style="display: flex; flex-direction: column; gap: 6px; padding: 4px 2px; font-size: 0.82rem; color: #334155;">
                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${userEmail}">
                  <span style="color: #64748b;">👤</span> <strong style="color: #0f172a; overflow: hidden; text-overflow: ellipsis;">${userEmail}</strong>
                </div>
                ${grupoNombre ? `
                  <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    <span style="color: #64748b;">📚</span> <span>Grupo: <strong>${grupoNombre}</strong></span>
                  </div>
                ` : ''}
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="color: #64748b;">⏱️</span> <span>Última sincronización: <strong>${lastSyncedText}</strong></span>
                </div>
              </div>
            `;
          } else {
            popoverBodyHtml += `
              <div style="font-size: 0.82rem; color: #64748b; margin-bottom: 10px; line-height: 1.4;">
                Inicia sesión con tu cuenta para guardar y sincronizar tu cuaderno en la nube.
              </div>
              <div style="display: flex; justify-content: flex-end;">
                <button class="btn btn-primary btn-sm" onclick="app.cerrarPopoverNube(); app.abrirModalNube();" style="font-size: 0.78rem; padding: 5px 10px; border-radius: 6px; width: 100%; justify-content: center;">
                  ☁️ Conectar Nube
                </button>
              </div>
            `;
          }

          const popoverHtml = `
            <div id="cloudStatusPopover" class="cloud-popover-panel" style="display: ${popoverDisplayStyle};" onclick="event.stopPropagation()">
              ${popoverBodyHtml}
            </div>
          `;

          headerEl.innerHTML = `
            <div style="display: inline-flex; align-items: center; gap: 6px; position: relative;">
              ${btnIndicatorHtml}
              ${btnLogoutHtml}
              ${popoverHtml}
            </div>
          `;
        }

        const modalEl = document.getElementById("modalNube");
        if (modalEl && modalEl.style.display === "flex") {
          this.actualizarModalNube();
        }
        if (this.vistaActiva === "configuracion" && this.subConfigActiva === "nube") {
          this.renderizarConfiguracionNube();
        }
      }

      aplicarDatosRemotos(remoteData) {
        if (!remoteData || !remoteData.grupos) return;

        const remoteVer = remoteData.version || 0;
        const remoteTime = remoteData.updatedAt ? new Date(remoteData.updatedAt).getTime() : 0;
        const localVer = this.data ? (this.data.version || 0) : 0;
        const localTime = this.data && this.data.updatedAt ? new Date(this.data.updatedAt).getTime() : 0;

        if (this.data && this.data.hasPendingSync && (localVer > remoteVer || localTime > remoteTime)) {
          console.warn("Remoto más antiguo que cambios locales pendientes, manteniendo estado local.");
          return;
        }

        this.data = remoteData;
        this.data.hasPendingSync = false;
        const storageKey = this.getStorageKey();
        try {
          localStorage.setItem(storageKey, JSON.stringify(this.data));
        } catch (e) {}
        this.cargarDatos();
        this.actualizarUI();
        this.mostrarNotificacionToast("☁️ Cuaderno sincronizado desde la nube en tiempo real");
      }

      mostrarToast(msg, duration = 3200) {
        this.mostrarNotificacionToast(msg, duration);
      }

      mostrarNotificacionToast(msg, duration = 3200) {
        const t = document.getElementById("toastNotif");
        if (!t) return;
        t.textContent = msg;
        t.classList.add("show");
        if (this._toastTimer) clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => {
          t.classList.remove("show");
        }, duration);
      }

      abrirModalNube() {
        this.actualizarModalNube();
        this.abrirModal("modalNube");
      }

      actualizarModalNube() {
        const body = document.getElementById("modalNubeBody");
        if (!body) return;
        body.innerHTML = this.generarHTMLContenidoNube(false);
      }

      renderizarConfiguracionNube() {
        const cont = document.getElementById("cfgNubeContenido");
        if (!cont) return;
        cont.innerHTML = this.generarHTMLContenidoNube(true);
      }

      generarHTMLContenidoNube(esPaginaCompleta) {
        const sbStatus = window.supabaseSync ? window.supabaseSync.status : null;
        const lastSynced = (sbStatus && sbStatus.lastSyncedAt) ? sbStatus.lastSyncedAt : (this.cloudStatus && this.cloudStatus.lastSynced ? this.formatearHoraCompleta(this.cloudStatus.lastSynced) : 'Sin sincronizar aún');

        let html = '';

        html += `
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                  <span style="width: 10px; height: 10px; border-radius: 50%; background: #16a34a; display: inline-block;"></span>
                  <strong style="color: #15803d; font-size: 0.95rem;">Sincronización en la Nube Activa (Supabase)</strong>
                </div>
                <div style="font-size: 0.85rem; color: #166534; line-height: 1.6;">
                  👤 <strong>Usuario Docente:</strong> borborigmo@gmail.com<br>
                  ⏱️ <strong>Última sincronización:</strong> ${lastSynced}<br>
                  🛡️ <strong>Almacenamiento Único:</strong> Supabase PostgreSQL (Base de datos relacional persistente)
                </div>
              </div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <label class="btn btn-sm" style="background: #4f46e5; color: white; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; margin: 0; padding: 6px 12px; border-radius: 6px;">
                  📤 Subir archivo JSON a Supabase
                  <input type="file" accept=".json" style="display: none;" onchange="app.cargarBackup(event)">
                </label>
                <button class="btn btn-primary btn-sm" onclick="app.forzarSincronizacionNube()" style="background: #2563eb;">
                  🔄 Sincronizar Ahora con Supabase
                </button>
                <button class="btn btn-success btn-sm" onclick="app.descargarEstadoSupabaseDirecto()" style="background: #059669; color: white; font-weight: 700;">
                  📥 Recargar datos desde Supabase
                </button>
                <button class="btn btn-danger btn-sm" onclick="app.limpiarYRestaurarSupabase()" style="background: #dc2626; color: white; font-weight: 700;">
                  🗑️ Borrar Supabase y restaurar copia del 24
                </button>
              </div>
            </div>
          </div>
        `;

        // Sección de consejos para móvil y movilidad
        html += `
          <div style="background: #ffffff; border: 1px solid var(--border); border-radius: 8px; padding: 16px;">
            <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
              <span>📱</span> Consejos para usar en el Móvil y cambiar de ordenador
            </h4>

            <div style="font-size: 0.85rem; color: var(--text); line-height: 1.6; display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; gap: 10px; align-items: flex-start;">
                <span style="background: #e2e8f0; font-weight: 700; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; flex-shrink: 0;">1</span>
                <div>
                  <strong>Abre la aplicación en tu móvil:</strong> Abre el enlace de esta aplicación en el navegador de tu smartphone (Chrome en Android o Safari en iPhone/iPad).
                </div>
              </div>

              <div style="display: flex; gap: 10px; align-items: flex-start;">
                <span style="background: #e2e8f0; font-weight: 700; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; flex-shrink: 0;">2</span>
                <div>
                  <strong>Conecta con la misma cuenta:</strong> Pulsa el botón <em>"☁️ Conectar Nube"</em> en la cabecera e inicia sesión con la misma cuenta de Google. Toda tu información aparecerá al instante.
                </div>
              </div>

              <div style="display: flex; gap: 10px; align-items: flex-start;">
                <span style="background: #e2e8f0; font-weight: 700; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; flex-shrink: 0;">3</span>
                <div>
                  <strong>Conviértela en App móvil (PWA):</strong>
                  <ul style="margin-left: 18px; margin-top: 4px; color: var(--text-muted);">
                    <li><strong>En Android (Chrome):</strong> Pulsa el menú de 3 puntos verticales en la esquina superior derecha y elige <em>"Añadir a la pantalla de inicio"</em> o <em>"Instalar aplicación"</em>.</li>
                    <li><strong>En iPhone / iPad (Safari):</strong> Pulsa el botón <em>Compartir</em> (el cuadrado con la flecha hacia arriba) y selecciona <em>"Añadir a pantalla de inicio"</em>.</li>
                  </ul>
                  <small style="color: #0369a1; display: block; margin-top: 4px;">Esto creará un icono directo en el escritorio de tu móvil y la app se abrirá a pantalla completa sin las barras del navegador.</small>
                </div>
              </div>

              <div style="display: flex; gap: 10px; align-items: flex-start;">
                <span style="background: #e2e8f0; font-weight: 700; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; flex-shrink: 0;">4</span>
                <div>
                  <strong>Respaldo local permanente:</strong> Aunque estés en el aula sin cobertura o con Wi-Fi inestable, todas las notas se siguen guardando en la memoria del dispositivo y se suben a la nube automáticamente en cuanto el equipo recupera conexión a internet.
                </div>
              </div>
            </div>
          </div>
        `;

        return html;
      }

      formatearHoraCompleta(isoStr) {
        if (!isoStr) return "";
        try {
          const d = new Date(isoStr);
          return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " (" + d.toLocaleDateString() + ")";
        } catch (e) {
          return isoStr;
        }
      }

      async iniciarSesionGoogle() {
        if (!window.firebaseSync) {
          alert("El servicio de sincronización se está cargando. Por favor, inténtalo de nuevo en unos segundos.");
          return;
        }
        try {
          await window.firebaseSync.loginWithGoogle();
          this.mostrarNotificacionToast("🟢 Sesión iniciada con Google. Cuaderno sincronizado.");
          this.actualizarModalNube();
        } catch (err) {
          console.error("Error al iniciar sesión con Google en app.js:", err);
          const code = err ? (err.code || "") : "";
          const msg = err ? (err.message || String(err)) : "Error al iniciar sesión con Google";
          if (code === 'auth/popup-blocked' || msg.includes('popup-blocked')) {
            alert("Tu navegador ha bloqueado la ventana emergente de Google. Permite las ventanas emergentes en tu navegador e inténtalo de nuevo.");
          } else {
            this.mostrarNotificacionToast("⚠️ " + msg, 5000);
          }
        }
      }

      async iniciarSesionDispositivo() {
        if (!window.firebaseSync) return;
        alert("Para garantizar la seguridad e identidad aislada de tu cuaderno docente, debes iniciar sesión con tu cuenta de Google o Email.");
      }

      async cerrarSesionNube() {
        if (!window.firebaseSync) return;
        this.mostrarConfirmacion(
          "¿Deseas cerrar sesión en Fernanditio?<br><br>Al cerrar sesión, se protegerá el acceso al cuaderno y deberás iniciar sesión de nuevo para acceder.",
          async () => {
            this.limpiarEstadoUsuario();
            await window.firebaseSync.logout();
            this.mostrarNotificacionToast("Sesión cerrada correctamente.");
          }
        );
      }

      limpiarEstadoUsuario() {
        this.cerrarPopoverNube();
        this.filtroRubricaActividadesIds = null;
        this.grupoActivo = null;
        this.grupoActivoId = null;
        this.data = { grupos: [] };
        this.alumnoSeleccionadoId = null;
        this.actividadesSeleccionadasIds = [];
        this.criteriosSeleccionadosIds = [];
        this.seccionesSeleccionadasIds = [];
        this.rubricasSeleccionadasIds = [];
        if (typeof this.actualizarUI === 'function') {
          this.actualizarUI();
        }
      }

      async forzarSincronizacionNube() {
        if (window.supabaseSync) {
          this.mostrarNotificacionToast("🔄 Guardando y sincronizando con Supabase...");
          await window.supabaseSync.syncNotebookToSupabase('docente_borborigmo_gmail_com', this.data);
          this.mostrarNotificacionToast("✅ ¡Datos sincronizados con éxito en Supabase!");
        }
      }

      async descargarEstadoSupabaseDirecto() {
        if (!window.supabaseSync) return;
        this.mostrarNotificacionToast("⏳ Consultando estado directo de las tablas relacionales en Supabase...");
        try {
          const remoteData = await window.supabaseSync.fetchNotebookFromSupabase('docente_borborigmo_gmail_com');
          this.data = remoteData || { grupos: [] };
          const storageKey = this.getStorageKey();
          if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(this.data));
          }
          this.actualizarUI();
          let totalAlu = 0;
          if (Array.isArray(this.data.grupos)) {
            this.data.grupos.forEach(g => {
              totalAlu += Array.isArray(g.alumnos) ? g.alumnos.length : 0;
            });
          }
          this.mostrarNotificacionToast(`✅ Estado cargado desde Supabase (${this.data.grupos ? this.data.grupos.length : 0} grupos, ${totalAlu} alumnos).`);
        } catch (err) {
          console.error("Error al descargar de Supabase:", err);
          this.mostrarNotificacionToast("⚠️ Error al consultar Supabase.");
        }
      }

      async limpiarYRestaurarSupabase() {
        if (confirm("¿Estás seguro de que deseas borrar TODOS los datos de Supabase y volver a cargar únicamente la copia limpia del 24 de septiembre?")) {
          try {
            this.mostrarToast("⏳ Borrando datos en Supabase y restaurando versión del 24...");
            if (window.supabaseSync) {
              const dataset = (await import('./userDataset.json')).default;
              await window.supabaseSync.clearSupabaseData('docente_borborigmo_gmail_com');
              await window.supabaseSync.seedRelationalDataToSupabase('docente_borborigmo_gmail_com', dataset, true);
              await window.supabaseSync.syncNotebookToSupabase('docente_borborigmo_gmail_com', dataset);
              this.data = JSON.parse(JSON.stringify(dataset));
              this.guardarDatos();
              this.cargarDatos();
              this.actualizarUI();
              this.renderizarConfiguracionNube();
              this.mostrarToast("✅ ¡Datos de Supabase borrados correctamente y restaurados con la copia del 24!");
              alert("✅ ¡Éxito! Todos los datos en Supabase han sido borrados y reemplazados exclusivamente por la copia limpia del 24 de septiembre.");
            }
          } catch (err) {
            alert("Error al limpiar Supabase: " + (err.message || String(err)));
          }
        }
      }

      /* ==========================================================================
         ASISTENTE CHATBOT VIRTUAL DE FERNANDITIO (LOMLOE Y SOPORTE)
         ========================================================================== */

      initChatbot() {
        this.chatbotCargado = true;
        const cont = document.getElementById("chatbotMessages");
        if (!cont) return;
        cont.innerHTML = "";

        // Mensaje inicial obligatorio: Cómo crear grupos, cómo introducir alumnos y cómo introducir criterios
        const initialHtml = `
          <div class="chat-bubble-content">
            <div style="margin-bottom: 12px; font-size: 0.93rem; color: #1e293b; line-height: 1.5;">
              ¡Hola, colega! 👋 <strong>Soy tu Asistente Virtual en Fernanditio</strong>.<br>
              A continuación te explico los tres primeros pasos clave para empezar a trabajar con tu cuaderno:
            </div>

            <!-- 1. CÓMO CREAR GRUPOS -->
            <div style="background: #ffffff; border-left: 4px solid #2563eb; border-radius: 0 8px 8px 0; padding: 10px 12px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <div style="font-weight: 800; color: #1e40af; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; font-size: 0.9rem;">
                <span>1️⃣</span> <span>CÓMO CREAR TUS GRUPOS</span>
              </div>
              <ol style="margin-left: 18px; margin-bottom: 8px; line-height: 1.5; color: #334155; font-size: 0.86rem;">
                <li>Entra en la pestaña <strong>⚙️ Configuración</strong> (en el menú central superior).</li>
                <li>Selecciona la primera subpestaña: <strong>1. Grupos</strong>.</li>
                <li>Pulsa en el botón amarillo <strong>«Crear nuevo grupo»</strong>.</li>
                <li>Escribe el nombre de tu grupo o materia (ej. <em>2º ESO B - Lengua Castellana</em>) y pulsa Aceptar.</li>
                <li>El grupo se inicializará automáticamente con las 3 evaluaciones trimestrales (eval1, eval2, eval3), secciones base y criterios LOMLOE oficiales.</li>
              </ol>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="chat-action-btn" onclick="app.ejecutarAccionChatbot('crearGrupo')">➕ Crear nuevo grupo ahora</button>
                <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('irGrupos')">📂 Ver gestión de grupos</button>
              </div>
            </div>

            <!-- 2. CÓMO INTRODUCIR ALUMNOS -->
            <div style="background: #ffffff; border-left: 4px solid #10b981; border-radius: 0 8px 8px 0; padding: 10px 12px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <div style="font-weight: 800; color: #065f46; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; font-size: 0.9rem;">
                <span>2️⃣</span> <span>CÓMO INTRODUCIR ALUMNOS</span>
              </div>
              <div style="color: #334155; line-height: 1.5; margin-bottom: 8px; font-size: 0.86rem;">
                Ve a <strong>⚙️ Configuración → 2. Alumnos</strong>. Tienes dos maneras muy rápidas:
                <ul style="margin-left: 18px; margin-top: 5px;">
                  <li><strong>Importación masiva (Séneca o Excel):</strong> Pulsa <strong>«📋 Importar de Word / Excel»</strong>. Copia la lista de nombres completos de tu alumnado desde Séneca o tu hoja de cálculo y pégalos directamente. Fernanditio separará y ordenará apellidos y nombres al instante.</li>
                  <li><strong>Manual individual:</strong> Pulsa <strong>«+ Añadir Alumno»</strong> para introducir nombre, apellidos, observaciones y marcar si presenta necesidades educativas específicas (NEE/NEAE).</li>
                  <li><strong>Ordenación:</strong> Pulsa <strong>«🔤 Ordenar A-Z»</strong> para tener tu lista alfabéticamente ordenada en un clic.</li>
                </ul>
              </div>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="chat-action-btn" onclick="app.ejecutarAccionChatbot('importarAlumnos')">📋 Pegar lista desde Séneca/Excel</button>
                <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('nuevoAlumno')">👤 Añadir alumno manual</button>
                <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('irAlumnos')">👥 Ver alumnos</button>
              </div>
            </div>

            <!-- 3. CÓMO INTRODUCIR Y CONFIGURAR CRITERIOS -->
            <div style="background: #ffffff; border-left: 4px solid #8b5cf6; border-radius: 0 8px 8px 0; padding: 10px 12px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <div style="font-weight: 800; color: #5b21b6; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; font-size: 0.9rem;">
                <span>3️⃣</span> <span>CÓMO INTRODUCIR Y CONFIGURAR CRITERIOS</span>
              </div>
              <div style="color: #334155; line-height: 1.5; margin-bottom: 8px; font-size: 0.86rem;">
                Ve a <strong>⚙️ Configuración → 3. Criterios de Evaluación</strong>:
                <ul style="margin-left: 18px; margin-top: 5px;">
                  <li>La aplicación ya trae precargado el banco oficial de criterios LOMLOE para Lengua Castellana y Literatura ESO.</li>
                  <li><strong>Añadir nuevo criterio:</strong> Pulsa <strong>«+ Nuevo Criterio»</strong>, asigna un código identificador (ej. <em>1.1</em>, <em>2.1</em>, <em>9.4</em>), su descripción oficial y su peso porcentual (%) de ponderación.</li>
                  <li><strong>Importar tu programación:</strong> Pulsa <strong>«📋 Importar Criterios (Word/Excel)»</strong> para volcar los criterios de tu programación didáctica de una sola vez.</li>
                  <li><strong>Cálculo automático:</strong> Al calificar actividades, rúbricas o exámenes en el Cuaderno, el sistema calculará de forma automática las medias oficiales y el promedio trimestral en la vista <strong>📊 Resultados</strong>.</li>
                </ul>
              </div>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="chat-action-btn" onclick="app.ejecutarAccionChatbot('nuevoCriterio')">🎯 Nuevo Criterio</button>
                <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('importarCriterios')">📋 Importar criterios</button>
                <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('irCriterios')">🎯 Ver criterios</button>
              </div>
            </div>

            <div style="font-size: 0.81rem; color: #64748b; margin-top: 6px; line-height: 1.45;">
              💡 <em>¿Tienes dudas sobre cómo crear una rúbrica de examen sobre 10, cómo evaluar con caritas o cómo sincronizar con la nube? Puedes escribir cualquier pregunta abajo o pulsar los botones de sugerencia.</em>
            </div>
          </div>
        `;

        this.agregarFilaMensajeChatbot('bot', initialHtml);
      }

      alternarChatbot() {
        const win = document.getElementById("chatbotVentana");
        if (!win) return;
        if (win.style.display === "none" || !win.style.display) {
          this.abrirChatbot();
        } else {
          this.cerrarChatbot();
        }
      }

      abrirChatbot() {
        const win = document.getElementById("chatbotVentana");
        if (!win) return;
        win.style.display = "flex";
        this.chatbotAbierto = true;
        if (!this.chatbotCargado) {
          this.initChatbot();
        }
        const input = document.getElementById("inputChatbotMensaje");
        if (input) {
          setTimeout(() => input.focus(), 150);
        }
        this.scrollChatbotAbajo();
      }

      cerrarChatbot() {
        const win = document.getElementById("chatbotVentana");
        if (!win) return;
        win.style.display = "none";
        this.chatbotAbierto = false;
      }

      reiniciarChatbot() {
        this.chatbotHistorial = [];
        this.initChatbot();
        this.mostrarNotificacionToast("🔄 Asistente reiniciado con la guía inicial.");
      }

      scrollChatbotAbajo() {
        const cont = document.getElementById("chatbotMessages");
        if (cont) {
          setTimeout(() => {
            cont.scrollTop = cont.scrollHeight;
          }, 60);
        }
      }

      scrollChatbotAlInicioDeElemento(el) {
        const cont = document.getElementById("chatbotMessages");
        if (cont && el) {
          setTimeout(() => {
            cont.scrollTop = Math.max(0, el.offsetTop - 12);
          }, 60);
        }
      }

      agregarFilaMensajeChatbot(emisor, contenidoHtml) {
        const cont = document.getElementById("chatbotMessages");
        if (!cont) return;

        const row = document.createElement("div");
        row.className = `chat-msg-row ${emisor === 'user' ? 'user' : 'bot'}`;

        const bubble = document.createElement("div");
        bubble.className = `chat-bubble ${emisor === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`;
        bubble.innerHTML = contenidoHtml;

        const time = document.createElement("span");
        time.className = "chat-time";
        const ahora = new Date();
        time.textContent = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        row.appendChild(bubble);
        row.appendChild(time);
        cont.appendChild(row);

        if (emisor === 'bot') {
          this.scrollChatbotAlInicioDeElemento(row);
        } else {
          this.scrollChatbotAbajo();
        }
      }

      mostrarIndicadorEscribiendoChatbot() {
        const cont = document.getElementById("chatbotMessages");
        if (!cont) return;
        this.ocultarIndicadorEscribiendoChatbot();

        const row = document.createElement("div");
        row.id = "chatbotTypingRow";
        row.className = "chat-msg-row bot";
        row.innerHTML = `
          <div class="chat-bubble chat-bubble-bot" style="padding: 6px 12px;">
            <div class="chatbot-typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        `;
        cont.appendChild(row);
        this.scrollChatbotAbajo();
      }

      ocultarIndicadorEscribiendoChatbot() {
        const el = document.getElementById("chatbotTypingRow");
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }

      enviarPreguntaPredefinida(pregunta) {
        const input = document.getElementById("inputChatbotMensaje");
        if (input) input.value = pregunta;
        this.enviarMensajeChatbot(pregunta);
      }

      enviarMensajeChatbotInput() {
        const input = document.getElementById("inputChatbotMensaje");
        if (!input) return;
        const texto = input.value.trim();
        if (!texto) return;
        input.value = "";
        this.enviarMensajeChatbot(texto);
      }

      async enviarMensajeChatbot(texto) {
        if (!texto || !texto.trim()) return;
        const textoLimpio = texto.trim();

        // Agregar mensaje del usuario a la vista
        this.agregarFilaMensajeChatbot('user', textoLimpio.replace(/</g, "&lt;").replace(/>/g, "&gt;"));

        // Mostrar indicador de "escribiendo"
        this.mostrarIndicadorEscribiendoChatbot();

        // Guardar en historial de conversación
        this.chatbotHistorial.push({ role: "user", text: textoLimpio });

        // Preparar contexto del grupo activo
        const context = {
          grupoNombre: this.grupoActivo ? this.grupoActivo.nombre : null,
          alumnosCount: this.grupoActivo?.alumnos?.length || 0,
          criteriosCount: this.grupoActivo?.criterios?.length || 0,
          rubricasCount: this.grupoActivo?.rubricas?.length || 0,
          evaluacion: this.evaluacionActiva,
          vistaActiva: this.vistaActiva
        };

        try {
          const reqHeaders = { "Content-Type": "application/json" };
          if (window.firebaseSync && typeof window.firebaseSync.getIdToken === "function") {
            const idToken = await window.firebaseSync.getIdToken();
            if (idToken) {
              reqHeaders["Authorization"] = `Bearer ${idToken}`;
            }
          }

          const res = await fetch("/api/assistant/chat", {
            method: "POST",
            headers: reqHeaders,
            body: JSON.stringify({
              message: textoLimpio,
              history: this.chatbotHistorial.slice(-6),
              context
            })
          });

          this.ocultarIndicadorEscribiendoChatbot();

          if (!res.ok) {
            throw new Error(`HTTP Error ${res.status}`);
          }

          const data = await res.json();
          if (data && data.reply) {
            const parsedHtml = this.renderizarMarkdownChat(data.reply);
            const htmlConAcciones = this.enriquecerRespuestaChatbot(parsedHtml, textoLimpio);
            this.agregarFilaMensajeChatbot('bot', htmlConAcciones);
            this.chatbotHistorial.push({ role: "assistant", text: data.reply });
          } else {
            throw new Error(data.error || "Respuesta vacía");
          }
        } catch (err) {
          console.warn("[Chatbot] Alternando a base de conocimiento local:", err?.message || err);
          this.ocultarIndicadorEscribiendoChatbot();

          // Respuesta local inteligente inmediata sin depender de la nube
          const respuestaLocal = this.generarRespuestaLocalChatbot(textoLimpio);
          this.agregarFilaMensajeChatbot('bot', respuestaLocal);
          this.chatbotHistorial.push({ role: "assistant", text: respuestaLocal });
        }
      }

      renderizarMarkdownChat(md) {
        if (!md) return "";
        let html = String(md)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h4 style="font-size: 0.92rem; font-weight: 800; color: #1e293b; margin: 8px 0 4px 0;">$1</h4>');
        html = html.replace(/^## (.*$)/gim, '<h3 style="font-size: 0.98rem; font-weight: 800; color: #1e3a8a; margin: 10px 0 4px 0;">$1</h3>');
        html = html.replace(/^# (.*$)/gim, '<h2 style="font-size: 1.05rem; font-weight: 800; color: #1e3a8a; margin: 12px 0 6px 0;">$1</h2>');

        // Bold & Italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code style="background: #e2e8f0; color: #0f172a; padding: 1px 4px; border-radius: 4px; font-size: 0.82rem; font-family: monospace;">$1</code>');

        // Listas con viñetas
        html = html.replace(/^\s*[-*]\s+(.*)$/gim, '<li style="margin-left: 18px; margin-bottom: 3px;">$1</li>');

        // Listas numeradas
        html = html.replace(/^\s*(\d+)\.\s+(.*)$/gim, '<li style="margin-left: 18px; margin-bottom: 3px;">$2</li>');

        // Salto de línea
        html = html.replace(/\n\n/g, '<br><br>');
        html = html.replace(/\n/g, '<br>');

        return `<div style="line-height: 1.52; font-size: 0.88rem; color: #1e293b;">${html}</div>`;
      }

      enriquecerRespuestaChatbot(html, pregunta) {
        const p = pregunta.toLowerCase();
        let botones = "";

        if (p.includes("grupo") || p.includes("curso")) {
          botones += `
            <button class="chat-action-btn" onclick="app.ejecutarAccionChatbot('crearGrupo')">➕ Crear grupo</button>
            <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('irGrupos')">📂 Ver grupos</button>
          `;
        }
        if (p.includes("alumno") || p.includes("estudiante") || p.includes("seneca") || p.includes("séneca")) {
          botones += `
            <button class="chat-action-btn" onclick="app.ejecutarAccionChatbot('importarAlumnos')">📋 Pegar lista Séneca/Excel</button>
            <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('nuevoAlumno')">👤 Añadir alumno</button>
          `;
        }
        if (p.includes("criterio") || p.includes("pondera") || p.includes("peso")) {
          botones += `
            <button class="chat-action-btn" onclick="app.ejecutarAccionChatbot('nuevoCriterio')">🎯 Nuevo criterio</button>
            <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('irCriterios')">📋 Ver criterios</button>
          `;
        }
        if (p.includes("rubrica") || p.includes("rúbrica") || p.includes("examen")) {
          botones += `
            <button class="chat-action-btn" onclick="app.ejecutarAccionChatbot('importarExamen')">💯 Rúbrica de examen</button>
            <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('irRubricas')">📋 Sistema de rúbricas</button>
          `;
        }
        if (p.includes("nota") || p.includes("resultado") || p.includes("media") || p.includes("excel")) {
          botones += `
            <button class="chat-action-btn" onclick="app.ejecutarAccionChatbot('irResultados')">📊 Ver resultados</button>
            <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('irCuaderno')">📝 Ir al cuaderno</button>
          `;
        }

        if (botones) {
          return `${html}<div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; border-top: 1px dashed #cbd5e1; padding-top: 8px;">${botones}</div>`;
        }
        return html;
      }

      generarRespuestaLocalChatbot(texto) {
        const t = texto.toLowerCase();

        // 1. Grupos
        if (t.includes("grupo") || t.includes("crear grupo") || t.includes("curso")) {
          return `
            <div style="line-height: 1.5; font-size: 0.88rem;">
              <strong style="color: #1e40af; font-size: 0.94rem;">📁 Cómo crear y gestionar grupos en Fernanditio:</strong>
              <ol style="margin-left: 18px; margin-top: 6px; margin-bottom: 8px;">
                <li>Entra en <strong>⚙️ Configuración</strong> (menú central).</li>
                <li>Pulsa en la subpestaña <strong>1. Grupos</strong>.</li>
                <li>Haz clic en el botón amarillo <strong>«Crear nuevo grupo»</strong>.</li>
                <li>Introduce el nombre (ej. <em>2º ESO A - Lengua Castellana</em>).</li>
                <li>¡Listo! El grupo se creará con sus 3 evaluaciones trimestrales, criterios LOMLOE y secciones por defecto.</li>
              </ol>
              <p style="margin-bottom: 8px; font-size: 0.82rem; color: #64748b;">
                Puedes cambiar de grupo en cualquier momento usando el menú desplegable superior izquierdo.
              </p>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="chat-action-btn" onclick="app.ejecutarAccionChatbot('crearGrupo')">➕ Crear grupo ahora</button>
                <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('irGrupos')">📂 Ver grupos</button>
              </div>
            </div>
          `;
        }

        // 2. Alumnos
        if (t.includes("alumno") || t.includes("meter alumno") || t.includes("introducir alumno") || t.includes("estudiante") || t.includes("seneca") || t.includes("séneca")) {
          return `
            <div style="line-height: 1.5; font-size: 0.88rem;">
              <strong style="color: #065f46; font-size: 0.94rem;">👥 Cómo introducir alumnos en tu grupo:</strong>
              <p style="margin: 6px 0;">Ve a <strong>⚙️ Configuración → 2. Alumnos</strong>. Tienes dos modalidades:</p>
              <ul style="margin-left: 18px; margin-bottom: 8px;">
                <li><strong>Pegar lista completa (Séneca / Excel):</strong> Haz clic en <strong>«📋 Importar de Word / Excel»</strong>. Pega la lista de alumnos copiada de Séneca o Excel y Fernanditio procesará automáticamente nombres y apellidos.</li>
                <li><strong>Añadir uno a uno:</strong> Pulsa en <strong>«+ Añadir Alumno»</strong> e introduce sus datos y posibles observaciones o necesidades de apoyo (NEE/NEAE).</li>
                <li><strong>Ordenar:</strong> Pulsa <strong>«🔤 Ordenar A-Z»</strong> para mantener la lista ordenada alfabéticamente.</li>
              </ul>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="chat-action-btn" onclick="app.ejecutarAccionChatbot('importarAlumnos')">📋 Pegar lista Séneca/Excel</button>
                <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('nuevoAlumno')">👤 Añadir alumno manual</button>
                <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('ordenarAlumnos')">🔤 Ordenar A-Z</button>
              </div>
            </div>
          `;
        }

        // 3. Criterios
        if (t.includes("criterio") || t.includes("competencia") || t.includes("lomloe") || t.includes("pondera") || t.includes("peso")) {
          return `
            <div style="line-height: 1.5; font-size: 0.88rem;">
              <strong style="color: #5b21b6; font-size: 0.94rem;">🎯 Cómo introducir y configurar criterios de evaluación:</strong>
              <p style="margin: 6px 0;">Ve a <strong>⚙️ Configuración → 3. Criterios de Evaluación</strong>:</p>
              <ul style="margin-left: 18px; margin-bottom: 8px;">
                <li>La app incluye por defecto el catálogo oficial LOMLOE de Lengua Castellana y Literatura ESO.</li>
                <li><strong>Añadir criterio:</strong> Pulsa <strong>«+ Nuevo Criterio»</strong> y rellena el código (ej. <em>1.1</em>), la descripción y la ponderación (% de peso en la media global).</li>
                <li><strong>Importar de tu programación:</strong> Usa <strong>«📋 Importar Criterios (Word/Excel)»</strong> para volcar todos los criterios de golpe.</li>
                <li><strong>Cálculo:</strong> Al calificar actividades y exámenes vinculados a estos códigos, la pestaña <strong>📊 Resultados</strong> calculará automáticamente las medias oficiales.</li>
              </ul>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="chat-action-btn" onclick="app.ejecutarAccionChatbot('nuevoCriterio')">🎯 Nuevo criterio</button>
                <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('importarCriterios')">📋 Importar criterios</button>
                <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('irCriterios')">🎯 Ver criterios</button>
              </div>
            </div>
          `;
        }

        // 4. Rúbricas y Exámenes
        if (t.includes("rubrica") || t.includes("rúbrica") || t.includes("examen") || t.includes("prueba") || t.includes("control")) {
          return `
            <div style="line-height: 1.5; font-size: 0.88rem;">
              <strong style="color: #9d174d; font-size: 0.94rem;">💯 Cómo crear rúbricas de examen sobre 10:</strong>
              <ol style="margin-left: 18px; margin-top: 6px; margin-bottom: 8px;">
                <li>Entra en la vista central <strong>📋 Rúbricas</strong>.</li>
                <li>Pulsa en la tarjeta <strong>«💯 Exámenes»</strong>.</li>
                <li>Elige el método: subir un archivo Word/Excel/PDF, tomar una foto a tu examen impreso o pegar el texto estructurado (<code>Nº;Pregunta;Criterio;Puntos</code>).</li>
                <li>En la vista previa, comprueba que cada pregunta tiene su criterio asignado y que la suma total es exactamente <strong>10 pts</strong>.</li>
                <li>Al confirmar, se crea la rúbrica y su columna en el Cuaderno. Al evaluar, podrás introducir notas directas por pregunta (0 a max pts) con cálculo automático sobre 10.</li>
              </ol>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="chat-action-btn" onclick="app.ejecutarAccionChatbot('importarExamen')">💯 Importar rúbrica de examen</button>
                <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('irRubricas')">📋 Ver todas las rúbricas</button>
              </div>
            </div>
          `;
        }

        // 5. Cálculo de notas y Resultados
        if (t.includes("nota") || t.includes("calcul") || t.includes("cálcul") || t.includes("resultado") || t.includes("media")) {
          return `
            <div style="line-height: 1.5; font-size: 0.88rem;">
              <strong style="color: #1e293b; font-size: 0.94rem;">📊 Cómo se calculan las notas en Fernanditio:</strong>
              <p style="margin: 6px 0;">El cálculo cumple estrictamente con el enfoque por competencias y criterios LOMLOE:</p>
              <ol style="margin-left: 18px; margin-bottom: 8px;">
                <li>Cada actividad o pregunta calificada se vincula a uno o varios <strong>criterios</strong>.</li>
                <li>En la pestaña <strong>📊 Resultados</strong>, Fernanditio calcula la media aritmética o ponderada de todas las evidencias recogidas para cada criterio.</li>
                <li>La <strong>Calificación Global del Trimestre</strong> se obtiene aplicando la ponderación (%) asignada a cada criterio oficial en la configuración del curso.</li>
                <li>Las notas inferiores a 5 aparecen destacadas en rojo. Puedes exportar todo a <strong>Excel</strong> o imprimir informes oficiales.</li>
              </ol>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="chat-action-btn" onclick="app.ejecutarAccionChatbot('irResultados')">📊 Ver Resultados</button>
                <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('irCuaderno')">📝 Ir al Cuaderno</button>
              </div>
            </div>
          `;
        }

        // Respuesta general de ayuda
        return `
          <div style="line-height: 1.5; font-size: 0.88rem;">
            ¡Entendido! Puedo ayudarte con cualquiera de estas tareas clave:
            <ul style="margin-left: 18px; margin-top: 6px; margin-bottom: 8px;">
              <li><strong>1. Grupos:</strong> Crear nuevos cursos, renombrarlos o cambiar de grupo.</li>
              <li><strong>2. Alumnos:</strong> Pegar listas completas desde Séneca/Excel o meterlos de uno en uno.</li>
              <li><strong>3. Criterios:</strong> Configurar el peso (%) de cada criterio LOMLOE.</li>
              <li><strong>4. Rúbricas y Exámenes:</strong> Importar exámenes a 10 puntos con casillas numéricas.</li>
              <li><strong>5. Cuaderno y Resultados:</strong> Registro diario, evaluación por caritas o rúbrica y exportación a Excel.</li>
            </ul>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <button class="chat-action-btn" onclick="app.ejecutarAccionChatbot('crearGrupo')">➕ Crear grupo</button>
              <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('importarAlumnos')">👥 Alumnos</button>
              <button class="chat-action-btn-secondary" onclick="app.ejecutarAccionChatbot('irCriterios')">🎯 Criterios</button>
            </div>
          </div>
        `;
      }

      ejecutarAccionChatbot(accion) {
        switch (accion) {
          case 'crearGrupo':
            this.crearNuevoGrupo();
            break;
          case 'irGrupos':
            this.cambiarVista('configuracion');
            this.cambiarSubConfig('cursos');
            break;
          case 'nuevoAlumno':
            this.modalAlumno();
            break;
          case 'importarAlumnos':
            this.modalImportarAlumnos();
            break;
          case 'irAlumnos':
            this.cambiarVista('configuracion');
            this.cambiarSubConfig('alumnos');
            break;
          case 'ordenarAlumnos':
            this.ordenarAlumnosAZ();
            break;
          case 'nuevoCriterio':
            this.modalCriterio();
            break;
          case 'importarCriterios':
            this.modalImportarCriterios();
            break;
          case 'irCriterios':
            this.cambiarVista('configuracion');
            this.cambiarSubConfig('criterios');
            break;
          case 'irCuaderno':
            this.cambiarVista('cuaderno');
            break;
          case 'irRubricas':
            this.cambiarVista('rubricas');
            break;
          case 'importarExamen':
            this.abrirImportadorRubrica('examen');
            break;
          case 'irResultados':
            this.cambiarVista('resultados');
            break;
          case 'exportarExcel':
            this.exportarResultadosExcel();
            break;
          case 'abrirDiario':
            this.abrirModalDiarioClase();
            break;
          default:
            console.warn(`Acción desconocida: ${accion}`);
        }
      }
    }

    // Inicialización automática
    const app = new EvaluacionApp();
    window.app = app;
    window.EvaluacionApp = EvaluacionApp;

    try {
      window.dispatchEvent(new CustomEvent("fernanditioAppReady", { detail: app }));
    } catch (e) {}

    // Captura del evento de instalación PWA para crear icono en el ordenador
    window.deferredPwaPrompt = null;
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      window.deferredPwaPrompt = e;
      const btnDirecto = document.getElementById("btnInstalarPwaDirecto");
      if (btnDirecto) btnDirecto.style.display = "inline-flex";
    });

    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", () => {
        app.init();
      });
    } else {
      app.init();
    }
