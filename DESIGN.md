# Kora Concept — Sistema de diseño

> Web B2B para agentes y distribuidores de mobiliario de hostelería y contract.
> Sin e-commerce: cada acción conduce a **solicitar presupuesto a medida**.

## Concepto — "The Specification House"

Kora Concept no fabrica: **cura y resuelve**. La web se lee como un
**catálogo de especificación** de contract premium — numeración de índice
corrida, fichas técnicas, voz de curador y mucho aire. Rechaza el patrón por
defecto de la categoría (grid de e-commerce + hero con formulario).

## Color — estrategia *Committed*

Neutros cálidos + un color (olivo) que **posee regiones enteras** (franja de
marcas, banda CTA, footer, pie), no acentos sueltos.

| Token | Hex | Uso |
|---|---|---|
| `paper` | `#F2F0EA` | Fondo base (papel cálido) |
| `paper-2` | `#E9E6DD` | Fondos alternos / placeholders |
| `ink` | `#1C1B18` | Texto principal, botón oscuro |
| `ink-soft` | `#3A382F` | Texto secundario |
| `muted` | `#6E6A5F` | Texto terciario, captions |
| `hairline` | `#D6D2C6` | Líneas y separadores |
| `olive` | `#34402C` | Color *committed*: bandas, CTA, hover |
| `olive-2` | `#2A3323` | Olivo oscuro (hover, placeholders) |
| `clay` | `#A9612F` | Reserva (no usado por defecto) |

## Tipografía — sans, con carácter (no Inter/Fraunces)

- **Display:** `Bricolage Grotesque` — titulares, cifras, índices.
- **Texto/UI:** `Hanken Grotesk` — cuerpo, navegación, formularios.
- **Etiquetas:** `.label` — 11px, mayúsculas, `tracking 0.18em`, color `muted`.
  Es el "sistema de catálogo": aparece sobre cada sección con su índice.

Ambas se cargan desde Google Fonts en `index.html`.

## Ritmo y layout

- Contenedor: `.container-site` (max 1440px, padding responsive).
- Rejilla de 12 columnas en secciones de contenido.
- Reglas `hairline` y numeración `01–04 / 01–05` estructuran el índice.
- Espaciado vertical amplio: `py-24 md:py-36` entre secciones mayores.
- Más aire encima de un titular que debajo.

## Movimiento

- **Smooth scroll:** Lenis (`SmoothScroll.tsx`), desactivado con
  `prefers-reduced-motion`.
- **Scroll reveal:** Framer Motion (`Reveal.tsx`) — `Reveal`, `RevealGroup` /
  `RevealItem` (stagger), `RevealLines` (líneas de hero que suben).
  Easing común `cubic-bezier(0.22, 1, 0.36, 1)`, `once: true`.
- **Hero cinemático** (`CinematicHero.tsx`, home): stage `position: sticky`
  dentro de un contenedor de `100svh + 2200px`. Un único bucle `rAF` lee
  la posición de scroll y el puntero, los suaviza (`lerp`) y escribe
  variables CSS directamente en el DOM (sin re-render de React) que pilotan,
  por "actos" segmentados con `smoothstep`: la salida del titular/CTA, el
  oscurecimiento progresivo de la foto (banda olivo → "committed"), y la
  entrada de un carril con las 4 familias de producto en bucle infinito
  (3 sets clonados, con normalización al llegar a los extremos). Ver
  comentarios en `CinematicHero.tsx`/`.css`. Antes de esta pieza, el hero era
  estático (texto + imagen aparte); ahora es la foto real de home a pantalla
  completa con el titular superpuesto.
- **Marquee de marcas:** CSS keyframes (`tailwind.config.js`) sobre banda olivo.
- Micro-interacciones: subrayado que crece (`.link-underline`), flechas que se
  desplazan, círculos que se rellenan en hover.

## Cabecera sobre foto

`Header.tsx` detecta `overlay = pathname === "/" && !scrolled`: en ese
estado usa texto claro (paper) en vez del dark-on-paper habitual, porque
antes de hacer scroll está flotando sobre la foto del hero cinemático (que
lleva su propio degradado oscuro permanente para garantizar contraste). En
cualquier otra página, o en cuanto se hace scroll, vuelve a texto oscuro.

## Componentes clave

| Componente | Rol |
|---|---|
| `CinematicHero.tsx` (+ `.css`) | Hero de la home: stage sticky, motor scroll/rAF, carril de familias en bucle |
| `components/ui/marquee.tsx` | Marquee genérico (el componente integrado) |
| `BrandMarquee.tsx` | Franja "Marcas que representamos" (olivo) |
| `BrandWordmark.tsx` | Logotipos de marca — variantes `mono` (tipográfica, franja olivo) y `full` (artwork real en `/marcas`) |
| `SpecImage.tsx` | Imagen con placeholder "ficha" cuando no hay foto |
| `PageHeader.tsx` | Masthead de páginas internas |
| `QuoteBand.tsx` | Banda CTA de presupuesto (reutilizable) |
| `ArrowLink.tsx` | `ArrowLink` + `ButtonLink` (píldoras) |

## Arquitectura de datos

Todo el contenido vive en **`src/data/catalogue.ts`**: `categories`, `brands`,
`contact`. Las páginas se generan desde ahí. Editar ese archivo = editar la web.

## Rutas

`/` · `/productos` · `/productos/:id` · `/marcas` · `/marcas/:id` ·
`/nosotros` · `/contacto`

## Modo

**Persuade** — el visitante (comprador de hostelería/contract) entiende qué
resuelve Kora y solicita un presupuesto por volumen. Nunca hay carrito.
