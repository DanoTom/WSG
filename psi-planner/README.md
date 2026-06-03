# Planificador Clínico — web-app en blanco

Conversión del handoff de **Claude Design** (`Psi_Planner`) a una **web-app HTML
autónoma y en blanco** para psicólogos y terapeutas. Un único archivo que el
cliente abre con doble clic, rellena y guarda en su propio navegador.

## Comando único

```bash
npm install && npm run build:planner
```

Esto deja en `out/`:

```
out/Planificador-Clinico.html      ← el entregable (1 archivo, ~1.3 MB)
```

- **Un solo archivo** (THEME_MODE = `live`): CSS, fuentes (woff2 en base64) y
  runtime van embebidos. **Cero llamadas de red** en tiempo de ejecución;
  funciona desde `file://` en Chrome, Safari (iPad) y Android.
- Tema por defecto: **Arcilla**. Las 6 paletas del bundle (Greige, Salvia,
  Lavanda, Cielo, Rubor, Arcilla) se cambian en vivo desde la toolbar.

## Cómo usar el HTML

1. **Abrir**: doble clic sobre `Planificador-Clinico.html`.
2. **Ayuda**: el botón **?** de la toolbar abre una ayuda rápida; la página
   **Guía de uso** (segunda página, también imprimible) explica todo en detalle,
   incluido **por qué es segura** (todo queda en tu dispositivo).
3. **Navegar**:
   - Toolbar superior: `‹ ›` (página anterior / siguiente), **Índice**, **Año**.
   - La barra del propio planner (arriba) y las pestañas laterales son enlaces
     reales a cada sección.
   - Teclado: `←` / `→` cambian de página cuando el foco no está en un campo.
4. **Editar**: todo campo, casilla, opción y nota es real. Lo que escribas o
   marques **se guarda solo** en `localStorage` y se restaura al reabrir.
   - Casillas y "estados" (Activo/Pausa/Alta, Presencial/Online, Cobrado/
     Pendiente…) cambian de aspecto al pulsar.
   - **Registro de cobros** (en Finanzas) es una lista **continua, sin tope
     mensual**: crece sola al rellenar la última fila (pensado para quien
     atiende muchos pacientes por día) y muestra en vivo `N cobros · M pend.`.
     Las tablas de **Directorio** y **Registro de supervisiones** también
     auto-crecen.
   - Los totales de **Finanzas** (Entra / Sale / Queda / Total cobrado) y las
     barras de progreso (hábitos, horas de formación, gastos) se recalculan en
     vivo a partir de lo que escribas.
5. **Exportar / Importar**: botones de la toolbar. *Exportar* descarga un
   `Planificador-Clinico-datos.json` con todo lo escrito; *Importar* lo vuelve a
   cargar (útil para copia de seguridad o pasar de un dispositivo a otro).
6. **Imprimir / PDF**: botón **Imprimir** o `Ctrl/Cmd+P`. Genera 15 páginas a
   1080 × 810 px exactos (una por hoja).
7. **En el teléfono** (modo híbrido): en pantallas chicas la página se ajusta al
   **ancho** y se baja con scroll vertical; en escritorio e iPad entra completa.
   En cualquier caso podés **acercar con los dedos** (pellizco). El diseño de
   página fija se mantiene (ideal para iPad e impresión).
8. **Reset**: **Borrar página** (solo la página activa) o **Borrar todo** (todo
   el planificador). Ambos piden confirmación.

## Cómo cambiar idioma / textos

La UI está en español (igual que el bundle). Para cambiar literales (etiquetas
de sección, textos de la toolbar, encabezados…), edita los `.jsx` en `src/` y
vuelve a ejecutar `npm run build:planner`. La toolbar y las confirmaciones están
en `build/build-planner.mjs` (objeto `runtimeJs`).

## Estructura

```
psi-planner/
  package.json
  build/
    build-planner.mjs   ← concatena los .jsx, esbuild + render, post-procesa
                          tokens → variables CSS, ensambla el .html final
    fonts.mjs           ← descarga e inlinea las fuentes (cachea en assets/)
    verify.mjs          ← comprobación con Playwright/Chromium contra file://
  src/                  ← los .jsx del bundle, con SOLO las 5 categorías de
                          edición permitidas (id ancla, enlaces, casillas,
                          campos, props nuevas)
  assets/fonts/fonts-inline.css   ← caché de fuentes (tras el primer build)
  out/Planificador-Clinico.html   ← salida
```

## Decisiones tomadas (notas del handoff)

- **THEME_MODE = `live`**: un único archivo con selector de paleta (dots en la
  toolbar), en vez de 6 archivos separados.
- **Planner SIN FECHAR**: el bundle marca "Sin fechar", así que **no** hay
  generación de calendario con fechas reales ni botón "Hoy". Los masters
  "×12 / ×52 / ×365" se entregan como **una plantilla única rellenable por
  tipo** (Mes, Semana, Día, Ficha, Registro), que es la versión más simple y
  liviana. El cliente reutiliza/imprime la plantilla las veces que necesite.
  - El **Mensual** es una rejilla 6×7 en blanco (el cliente escribe el mes, el
    año y los días). La vista **Anual** conserva 12 mini-calendarios como
    referencia visual (maquetados sobre un año neutro), con metas e intención
    rellenables.
- **Fuera del montaje**:
  - **Hoja de stickers** — recurso para recortar/pegar en apps externas; una
    web-app interactiva no lo necesita.
  - **Mockups Etsy (2000×1500)** — imágenes de listing, no son páginas del
    planner.
  - **design-canvas.jsx** — el lienzo de diseño (wrapper Figma), no se monta.
- **Navegación**: la barra superior del bundle y las pestañas laterales se
  conservan como enlaces troncales reales; los enlaces contextuales (mes ↔ día,
  directorio → ficha, registro → ficha) llevan al destino correcto.
- **Sin contador lineal X/Y** en la etiqueta de página (solo el nombre).
- **Persistencia por nombre** de campo, con espacio de nombres
  `lp:Planificador-Clinico:<página>|<campo>`: cada página guarda lo suyo y no
  contamina a otras del mismo tipo.

### Refinamientos posteriores (a pedido del cliente)

- **Cobros → registro continuo**: la tabla de Finanzas dejó de ser "del mes".
  Ahora es un **registro de cobros sin tope** que crece solo (apto para gran
  volumen diario), con columna **Fecha** y contador en vivo `N cobros · M pend.`.
- **Guía + ayuda** (adición fuera del bundle original, pedida por el cliente):
  página **Guía de uso** (imprimible) + botón **?** en la toolbar con ayuda
  rápida. Explican el uso y, sobre todo, la **privacidad**: los datos viven solo
  en el dispositivo del cliente, sin red.
- **Responsive híbrido**: se mantiene la **página de tamaño fijo** (fidelidad de
  impresión e iPad); en teléfono se ajusta al ancho con scroll vertical y se
  amplían las zonas táctiles. El pellizco-zoom sigue disponible en todo caso.
- **Fichas y registros multi-instancia**: la **Ficha de paciente** tiene un
  selector **Paciente 01 · 02 · 03 · +** (cada paciente guarda su ficha por
  separado); el **Registro de sesión** suma selectores de **Paciente** y
  **Sesión**. Se implementa con un mecanismo genérico de *ámbitos*
  (`data-scopes` en la página): la clave de guardado incluye el ámbito activo
  (`lp:<doc>:<página>|<pac.ses>|<campo>`). Se puede enlazar a una instancia
  concreta por hash, p. ej. `#ficha~pac:3`.
- **Diario** con franja horaria ampliada **7:00–22:00** (jornadas largas).

## Verificación

```bash
node build/verify.mjs
```

Comprueba (Chromium headless, `file://`): sin errores de consola ni red, las 14
páginas montadas, stickers/mockups excluidos, navegación por hash, persistencia
de casillas/campos/opciones tras recargar, derivados en vivo, auto-crecimiento
del ledger, cambio de tema y generación de PDF.
