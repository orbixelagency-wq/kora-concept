// ─────────────────────────────────────────────────────────────
// Kora Concept — catálogo maestro (B2B, sin e-commerce)
// Toda la web se genera desde este archivo. Editar aquí = editar la web.
// ─────────────────────────────────────────────────────────────

export type CategoryId =
  | "sobres-de-mesa"
  | "mesas"
  | "sillas"
  | "pies-de-parasol";

export type BrandId =
  | "helcosol"
  | "genmar"
  | "almar-garden"
  | "vela"
  | "werzalit";

export interface Category {
  id: CategoryId;
  index: string; // "01"
  name: string;
  subtitle: string;
  intro: string;
  /** Puntos técnicos / de venta para la ficha B2B */
  specs: { label: string; value: string }[];
  /** Escenas de uso — para el placeholder / caption de imagen */
  scenes: string[];
  brands: BrandId[];
  /** Ruta de imagen opcional en /public/images. Vacío = placeholder de ficha. */
  image?: string;
}

export interface Brand {
  id: BrandId;
  name: string;
  wordmark: string; // fichero en /public/logos
  country: string;
  since?: string;
  url: string;
  tagline: string;
  summary: string;
  description: string;
  strengths: string[];
  categories: CategoryId[];
  image?: string;
}

// ── CATEGORÍAS ────────────────────────────────────────────────
export const categories: Category[] = [
  {
    id: "sobres-de-mesa",
    index: "01",
    name: "Sobres de mesa",
    subtitle: "Tableros técnicos para interior y exterior",
    intro:
      "El tablero es el punto de mayor desgaste de cualquier mesa de contract. Trabajamos superficies compactas y resinadas que resisten el uso intensivo, la intemperie y la limpieza continua sin perder acabado.",
    specs: [
      { label: "Uso", value: "Interior · exterior · alta rotación" },
      { label: "Acabados", value: "Compacto, Werzalit, laminado, resina" },
      { label: "Formatos", value: "Redondo, cuadrado, rectangular, a medida" },
      { label: "Resistencia", value: "UV, agua, calor, rayado, químicos" },
    ],
    scenes: ["Terraza de restaurante", "Cafetería", "Hotel · zona buffet"],
    brands: ["werzalit", "genmar"],
  },
  {
    id: "mesas",
    index: "02",
    name: "Mesas",
    subtitle: "Mesas completas para hostelería y contract",
    intro:
      "Mesa completa: base, columna y tablero coordinados y homologados para uso profesional. Soluciones apilables, abatibles y de gran formato para banquetes, terrazas y espacios de restauración.",
    specs: [
      { label: "Tipologías", value: "Terraza, interior, banquete, alta" },
      { label: "Bases", value: "Aluminio, acero, fundición" },
      { label: "Sistemas", value: "Fija, abatible, apilable" },
      { label: "Volumen", value: "Proyectos y grandes cantidades" },
    ],
    scenes: ["Restaurante", "Terraza hotelera", "Sala de banquetes"],
    brands: ["genmar", "vela", "almar-garden"],
  },
  {
    id: "sillas",
    index: "03",
    name: "Sillas",
    subtitle: "Sillas, sillones y taburetes de contract",
    intro:
      "Asientos pensados para el servicio: ligeros para el apilado, robustos para la rotación y coherentes en color con el resto del proyecto. Amplia carta de estructuras, tejidos y acabados.",
    specs: [
      { label: "Familias", value: "Silla, sillón, taburete, lounge" },
      { label: "Materiales", value: "Aluminio, polipropileno, cuerda, teca" },
      { label: "Apilado", value: "Sí — logística optimizada" },
      { label: "Personalización", value: "Color y tapizado por proyecto" },
    ],
    scenes: ["Terraza", "Comedor de hotel", "Zona lounge exterior"],
    brands: ["vela", "almar-garden", "genmar"],
  },
  {
    id: "pies-de-parasol",
    index: "04",
    name: "Pies de parasol",
    subtitle: "Bases y contrapesos para sombra profesional",
    intro:
      "La pieza que sostiene todo el sistema de sombra. Bases dimensionadas por peso, formato y tipo de mástil, con acabados que aguantan la exposición permanente en terraza y zona de piscina.",
    specs: [
      { label: "Rango", value: "De portátil a base fija de gran peso" },
      { label: "Materiales", value: "Hormigón, granito, acero, HDPE" },
      { label: "Compatibilidad", value: "Parasol central y lateral" },
      { label: "Fabricante", value: "Helcosol — the bases factory" },
    ],
    scenes: ["Terraza", "Zona de piscina", "Chiringuito · beach club"],
    brands: ["helcosol"],
  },
];

// ── MARCAS REPRESENTADAS ──────────────────────────────────────
export const brands: Brand[] = [
  {
    id: "helcosol",
    name: "Helcosol",
    wordmark: "helcosol.svg",
    country: "Países Bajos",
    url: "https://www.helcosol.nl",
    tagline: "the bases factory",
    summary: "Especialistas europeos en bases y contrapesos para parasol.",
    description:
      "Helcosol es la fábrica de referencia en bases de parasol para el canal profesional. Un catálogo dimensionado por peso y formato que resuelve la sombra en terrazas, piscinas y espacios exteriores de alta exigencia.",
    strengths: [
      "Bases calculadas por peso y tipo de mástil",
      "Acabados para exposición permanente a la intemperie",
      "Suministro estable para grandes proyectos",
    ],
    categories: ["pies-de-parasol"],
  },
  {
    id: "genmar",
    name: "Genmar Yapi",
    wordmark: "genmar.svg",
    country: "Turquía",
    url: "https://en.genmaryapi.com/urunler",
    tagline: "Contract & outdoor manufacturing",
    summary: "Mobiliario de exterior y contract a escala industrial.",
    description:
      "Genmar Yapi fabrica mesas, sillas y sistemas de tablero para hostelería con capacidad industrial. Un aliado clave cuando el proyecto exige volumen, coherencia y plazos.",
    strengths: [
      "Capacidad de producción para grandes volúmenes",
      "Sistemas de mesa y tablero coordinados",
      "Buena relación prestación / precio en contract",
    ],
    categories: ["mesas", "sillas", "sobres-de-mesa"],
  },
  {
    id: "almar-garden",
    name: "Almar Garden",
    wordmark: "almar-garden.svg",
    country: "Italia",
    url: "https://www.almargarden.com",
    tagline: "Outdoor living",
    summary: "Diseño italiano de mobiliario de jardín y exterior.",
    description:
      "Almar Garden aporta el gusto italiano al mobiliario de exterior: colecciones de jardín y terraza que combinan estética, confort y materiales pensados para vivir al aire libre.",
    strengths: [
      "Diseño y acabado de origen italiano",
      "Colecciones coordinadas de exterior",
      "Confort y estética para hostelería de gama",
    ],
    categories: ["mesas", "sillas"],
    image: "/images/brands/almar-garden.jpg",
  },
  {
    id: "vela",
    name: "Vela Arredamenti",
    wordmark: "vela.svg",
    country: "Italia",
    url: "https://www.velarredamenti.it",
    tagline: "Arredamenti per contract",
    summary: "Amueblamiento integral para proyectos de contract.",
    description:
      "Vela Arredamenti desarrolla soluciones de amueblamiento para el canal contract, con especial atención al asiento y la mesa de proyecto. Diseño italiano orientado a espacios de restauración y hospitality.",
    strengths: [
      "Enfoque de proyecto contract llave en mano",
      "Amplia carta de asiento y mesa",
      "Diseño italiano para hospitality",
    ],
    categories: ["mesas", "sillas"],
  },
  {
    id: "werzalit",
    name: "Werzalit",
    wordmark: "werzalit.svg",
    country: "Alemania",
    since: "1923",
    url: "https://www.werzalit.com",
    tagline: "beständig seit 1923",
    summary: "El referente mundial en tableros técnicos de mesa.",
    description:
      "Werzalit es sinónimo de tablero de mesa profesional. Su superficie patentada resiste la intemperie, el calor, los golpes y la limpieza constante, y es el estándar de hecho en terrazas de todo el mundo desde 1923.",
    strengths: [
      "Superficie técnica patentada de altísima resistencia",
      "Apto para exterior sin pérdida de acabado",
      "Estándar histórico del sector (desde 1923)",
    ],
    categories: ["sobres-de-mesa"],
  },
];

// ── Helpers ───────────────────────────────────────────────────
export const getBrand = (id: string) => brands.find((b) => b.id === id);
export const getCategory = (id: string) =>
  categories.find((c) => c.id === id);
export const brandsForCategory = (id: CategoryId) =>
  brands.filter((b) => b.categories.includes(id));
export const categoriesForBrand = (b: Brand) =>
  categories.filter((c) => b.categories.includes(c.id));

export const contact = {
  email: "JORDIRAWAL@KORACONCEPT.COM",
  emailHref: "mailto:jordirawal@koraconcept.com",
  address: "C/ Torrent 40, Santa Coloma de Farners, Girona",
  region: "Cataluña · España",
  company: "Kora Concept",
  contactName: "Jordi Rawal",
  phone: "+34 972 877 588",
  phoneHref: "tel:+34972877588",
  mobile: "+34 629 460 888",
  mobileHref: "tel:+34629460888",
};
