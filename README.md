# Kora Concept

Web corporativa B2B para **Kora Concept** — agentes comerciales y distribuidores
de mobiliario para hostelería y contract a nivel europeo.

Marcas representadas: **Helcosol · Genmar Yapi · Almar Garden · Vela Arredamenti
· Werzalit**. Categorías: **Sobres de mesa · Taules · Cadires · Peus de parasol**.

Sin tienda ni carrito: cada llamada a la acción lleva a **solicitar presupuesto
a medida**.

## Stack

- **React + Vite + TypeScript**
- **Tailwind CSS** (v3)
- **React Router** (multipágina)
- **Framer Motion** (scroll reveal) · **Lenis** (smooth scroll)
- Tipografías: Bricolage Grotesque + Hanken Grotesk (Google Fonts)

## Ejecutar en local

```bash
cd Documents/kora-concept
npm install      # solo la primera vez
npm run dev      # abre http://localhost:5173
```

Si el navegador muestra errores de "Invalid hook call" o "504 Outdated Optimize
Dep" tras editar, es la caché de Vite. Reinicia limpio:

```bash
rm -rf node_modules/.vite && npm run dev
```

Compilar para producción:

```bash
npm run build    # genera /dist
npm run preview  # sirve /dist en local
```

## Editar el contenido

**Todo el catálogo está en un solo archivo:** `src/data/catalogue.ts`
(marcas, categorías, datos de contacto). Cambiar ahí actualiza toda la web.

## Logos de marca

`BrandWordmark` tiene dos variantes: `mono` (por defecto — tipográfico,
`currentColor`, se usa en la franja olivo de "Marcas que representamos" para
que todas las marcas lean en un solo tono) y `full` (artwork oficial a color,
se usa en `/marcas` y en la ficha de cada marca).

Ya hay artwork real en `public/logos/` para **Helcosol, Genmar Yapi, Vela
Arredamenti y Werzalit** (`helcosol.png`, `genmar.png`, `vela.png`,
`werzalit.webp`), copiados desde `Desktop/CLAUDE FOTOS`. **Falta el logo de
Almar Garden** — mientras no se añada, esa marca sigue mostrando su marca
tipográfica en variante `full` también. Para añadirlo: copia el archivo a
`public/logos/almar-garden.<ext>` y súmalo al mapa `LOGO_FILES` en
`BrandWordmark.tsx`.

## Imágenes de producto

Los bloques de imagen usan `SpecImage`, que muestra una "ficha" placeholder
cuando no hay foto — nunca se ve roto. Para poner fotos reales, copia el
archivo a `public/images/` y pasa la ruta con `src` allí donde se use
`<SpecImage ... />` (`Home.tsx`, `Products.tsx`, `CategoryDetail.tsx`,
`BrandDetail.tsx`, `About.tsx`). Ejemplo:
`<SpecImage src="/images/terraza.jpg" alt="..." ratio="16/9" />`.

Estado actual (2026-08-24): hay foto real en el **hero de la home**
(`/images/home-hero.jpg`) y en la **ficha de Almar Garden**
(`/images/brands/almar-garden.jpg`), ambas fotografía oficial de
almargarden.com. El resto de fotos (categorías, escenas de aplicación,
Helcosol/Genmar/Vela/Werzalit, hero de Nosotros) sigue en placeholder:
la generación con IA (Viewmax) estaba a 0 créditos y el scraping de los
demás fabricantes dio imágenes de baja resolución o bloqueadas (Werzalit
devuelve 403). Para completarlas: recarga créditos de Viewmax, o pide
fotografía oficial a cada fabricante y cuélgala en `public/images/`.

## Formulario de presupuesto

`src/pages/Contact.tsx` compone la solicitud y abre el cliente de correo del
usuario (`mailto:`) hacia `jordirawal@koraconcept.com`. No hay backend ni se
almacenan datos. Para recibir los envíos en un panel, conecta un endpoint
(Formspree, Netlify Forms, etc.) en el `onSubmit`.

## Contacto

- Email: JORDIRAWAL@KORACONCEPT.COM
- Dirección: C/ Torrent 40, Santa Coloma de Farners, Girona
