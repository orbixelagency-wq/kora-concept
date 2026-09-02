// ─────────────────────────────────────────────────────────────
// Kora Concept — catálogo maestro (B2B, sin e-commerce)
// Toda la web se genera desde este archivo. Editar aquí = editar la web.
// ─────────────────────────────────────────────────────────────

export type CategoryId =
  | "sobres-de-mesa"
  | "sillas"
  | "bases-metalicas"
  | "bases-de-parasol"
  | "revestimientos"
  | "perfiles-vallas-balcones";

export type BrandId =
  | "genmar"
  | "gentas"
  | "werzalit"
  | "severin"
  | "helcosol"
  | "vela"
  | "freixotel"
  | "zenith"
  | "almar-garden"
  | "iberlamit";

export interface Category {
  id: CategoryId;
  index: string; // "01"
  name: string;
  subtitle: string;
  intro: string;
  /** Subfamilias / acabados que componen la categoría (chips en la ficha) */
  subcategories: string[];
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
    subcategories: [
      "Melamina",
      "Laminados",
      "HPL",
      "Wermodin",
      "Werzalit",
      "Severin",
      "Madera",
      "Logotipos",
    ],
    specs: [
      { label: "Uso", value: "Interior · exterior · alta rotación" },
      { label: "Acabados", value: "Melamina, laminado, HPL, Wermodin, Werzalit" },
      { label: "Formatos", value: "Redondo, cuadrado, rectangular, a medida" },
      { label: "Resistencia", value: "UV, agua, calor, rayado, químicos" },
    ],
    scenes: ["Terraza de restaurante", "Cafetería", "Hotel · zona buffet"],
    brands: ["werzalit", "genmar", "gentas", "severin", "iberlamit"],
  },
  {
    id: "sillas",
    index: "02",
    name: "Sillas",
    subtitle: "Sillas, sillones y taburetes de contract",
    intro:
      "Asientos pensados para el servicio: ligeros para el apilado, robustos para la rotación y coherentes en color con el resto del proyecto. Amplia carta de estructuras, tejidos y acabados.",
    subcategories: ["Plástico", "Madera", "Metal", "Carcasas PP"],
    specs: [
      { label: "Materiales", value: "Plástico, madera, metal, carcasas PP" },
      { label: "Familias", value: "Silla, sillón, taburete, lounge" },
      { label: "Apilado", value: "Sí — logística optimizada" },
      { label: "Personalización", value: "Color y tapizado por proyecto" },
    ],
    scenes: ["Terraza", "Comedor de hotel", "Zona lounge exterior"],
    brands: ["vela", "almar-garden", "genmar", "freixotel", "zenith"],
  },
  {
    id: "bases-metalicas",
    index: "03",
    name: "Bases metálicas",
    subtitle: "Bases y columnas de mesa para uso profesional",
    intro:
      "La estructura que sostiene la mesa: bases y columnas homologadas para uso intensivo en hostelería. Estabilidad, resistencia a la corrosión y acabados coordinados con el resto del mobiliario.",
    subcategories: ["Resina", "Aluminio", "Acero"],
    specs: [
      { label: "Materiales", value: "Resina, aluminio, acero" },
      { label: "Tipologías", value: "Base central, columna, cuatro patas" },
      { label: "Uso", value: "Interior y exterior · alta rotación" },
      { label: "Volumen", value: "Proyectos y grandes cantidades" },
    ],
    scenes: ["Restaurante", "Terraza hotelera", "Sala de banquetes"],
    brands: ["genmar", "vela", "almar-garden", "zenith"],
  },
  {
    id: "bases-de-parasol",
    index: "04",
    name: "Bases de parasol",
    subtitle: "Contrapesos y bases para sombra profesional",
    intro:
      "La pieza que sostiene todo el sistema de sombra. Bases dimensionadas por peso, formato y tipo de mástil, con acabados que aguantan la exposición permanente en terraza y zona de piscina.",
    subcategories: ["Polipropileno (rellenada o sin rellenar)"],
    specs: [
      { label: "Material", value: "Polipropileno — rellenable con agua o arena" },
      { label: "Rango", value: "De portátil a base fija de gran peso" },
      { label: "Compatibilidad", value: "Parasol central y lateral" },
      { label: "Fabricante", value: "Helcosol — the bases factory" },
    ],
    scenes: ["Terraza", "Zona de piscina", "Chiringuito · beach club"],
    brands: ["helcosol"],
  },
  {
    id: "revestimientos",
    index: "05",
    name: "Revestimientos",
    subtitle: "Perfiles Werzalit de madera para exterior sin mantenimiento",
    intro:
      "Revestimiento de fachada y exterior con perfiles Werzalit: el aspecto cálido de la madera con el comportamiento técnico del material compuesto. Resistente a la intemperie, a los rayos UV y sin necesidad de tratamiento ni mantenimiento periódico.",
    subcategories: ["Perfiles Werzalit", "Madera de exterior", "Sin mantenimiento"],
    specs: [
      { label: "Material", value: "Perfil Werzalit — compuesto de madera" },
      { label: "Aplicación", value: "Revestimiento de fachada y exterior" },
      { label: "Mantenimiento", value: "Sin tratamiento ni mantenimiento" },
      { label: "Resistencia", value: "UV, humedad, cambios de temperatura" },
    ],
    scenes: ["Fachada de hotel", "Terraza exterior", "Zona de acceso"],
    brands: ["werzalit"],
  },
  {
    id: "perfiles-vallas-balcones",
    index: "06",
    name: "Perfiles para vallas y balcones",
    subtitle: "Perfilería de aluminio para exteriores",
    intro:
      "Sistemas de perfilería de aluminio para vallas, cerramientos y balcones de exterior. Ligeros, resistentes a la corrosión y con acabados duraderos, pensados para delimitar y proteger espacios de hostelería y contract.",
    subcategories: ["Aluminio", "Vallas", "Balcones", "Exterior"],
    specs: [
      { label: "Material", value: "Aluminio para intemperie" },
      { label: "Aplicación", value: "Vallas, cerramientos y balcones" },
      { label: "Acabados", value: "Lacado y anodizado de larga duración" },
      { label: "Uso", value: "Exterior · hostelería y contract" },
    ],
    scenes: ["Terraza delimitada", "Balcón de hotel", "Cerramiento exterior"],
    brands: ["genmar", "iberlamit"],
  },
];

// ── MARCAS REPRESENTADAS ──────────────────────────────────────
export const brands: Brand[] = [
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
    categories: ["sobres-de-mesa", "sillas", "bases-metalicas", "perfiles-vallas-balcones"],
  },
  {
    id: "gentas",
    name: "Gentas",
    wordmark: "gentas.svg",
    country: "Turquía",
    url: "https://www.gentas.com.tr",
    tagline: "Compact & tabletop surfaces",
    summary: "Fabricante de tableros compactos y superficies técnicas.",
    description:
      "Gentas produce tableros compactos, laminados y superficies técnicas para mobiliario de contract. Una referencia en sobres de mesa de alta resistencia para interior y exterior.",
    strengths: [
      "Amplia carta de acabados y compactos",
      "Superficies para uso intensivo",
      "Capacidad para proyectos de gran formato",
    ],
    categories: ["sobres-de-mesa"],
  },
  {
    id: "werzalit",
    name: "Werzalit",
    wordmark: "werzalit.svg",
    country: "Alemania",
    since: "1923",
    url: "https://www.werzalit.com",
    tagline: "beständig seit 1923",
    summary: "El referente mundial en tableros técnicos y perfiles.",
    description:
      "Werzalit es sinónimo de tablero de mesa profesional y perfil técnico de madera. Su superficie patentada resiste la intemperie, el calor, los golpes y la limpieza constante, y es el estándar de hecho en terrazas de todo el mundo desde 1923.",
    strengths: [
      "Superficie técnica patentada de altísima resistencia",
      "Apto para exterior sin pérdida de acabado",
      "Estándar histórico del sector (desde 1923)",
    ],
    categories: ["sobres-de-mesa", "revestimientos"],
  },
  {
    id: "severin",
    name: "Severin",
    wordmark: "severin.svg",
    country: "Alemania",
    url: "https://www.severin-online.com",
    tagline: "Tabletops & surfaces",
    summary: "Tableros y superficies de mesa para hostelería.",
    description:
      "Severin aporta tableros y superficies de mesa de acabado cuidado para el canal profesional, con opciones técnicas para interior y exterior en proyectos de restauración y hospitality.",
    strengths: [
      "Acabados de superficie de calidad",
      "Opciones para interior y exterior",
      "Enfoque de proyecto contract",
    ],
    categories: ["sobres-de-mesa"],
  },
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
    categories: ["bases-de-parasol"],
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
    categories: ["sillas", "bases-metalicas"],
  },
  {
    id: "freixotel",
    name: "Freixotel",
    wordmark: "freixotel.svg",
    country: "España",
    url: "#",
    tagline: "Equipamiento para hostelería",
    summary: "Equipamiento y mobiliario para hostelería y colectividades.",
    description:
      "Freixotel suministra mobiliario y equipamiento para hostelería, hoteles y colectividades, con soluciones de asiento y mesa pensadas para el uso profesional diario.",
    strengths: [
      "Catálogo orientado a hostelería",
      "Soluciones de asiento y mesa para contract",
      "Servicio y suministro de proximidad",
    ],
    categories: ["sillas"],
  },
  {
    id: "zenith",
    name: "Zenith",
    wordmark: "zenith.svg",
    country: "Europa",
    url: "#",
    tagline: "Contract seating & structures",
    summary: "Asiento y estructuras de mesa para el canal contract.",
    description:
      "Zenith aporta sillas, estructuras y bases para proyectos de contract, con una gama versátil que combina resistencia y estética para espacios de hostelería.",
    strengths: [
      "Gama versátil de asiento y estructura",
      "Resistencia para uso intensivo",
      "Coherencia estética por proyecto",
    ],
    categories: ["sillas", "bases-metalicas"],
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
    categories: ["sillas", "bases-metalicas"],
    image: "/images/brands/almar-garden.jpg",
  },
  {
    id: "iberlamit",
    name: "Iberlamit",
    wordmark: "iberlamit.svg",
    country: "España",
    url: "#",
    tagline: "Laminados y perfilería",
    summary: "Laminados, tableros y perfilería para mobiliario y exterior.",
    description:
      "Iberlamit trabaja laminados, tableros y perfilería para mobiliario y aplicaciones de exterior, con soluciones para sobres de mesa y sistemas de perfil en aluminio.",
    strengths: [
      "Laminados y tableros técnicos",
      "Perfilería para exterior",
      "Suministro para proyecto",
    ],
    categories: ["sobres-de-mesa", "perfiles-vallas-balcones"],
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
