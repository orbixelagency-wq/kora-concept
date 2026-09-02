// ─────────────────────────────────────────────────────────────
// Proyectos realizados — portfolio B2B.
// Placeholders listos para sustituir: añade la foto real en
// /public/images/proyectos y ponla en `image`.
// ─────────────────────────────────────────────────────────────

export const projectSectors = [
  "Restauración",
  "Terrazas y exterior",
  "Hoteles",
  "Espacios comerciales",
] as const;

export type ProjectSector = (typeof projectSectors)[number];

export interface Project {
  id: string;
  title: string;
  location: string;
  year?: string;
  sector: ProjectSector;
  summary: string;
  materials: string[];
  /** Ruta de foto real en /public/images/proyectos. Vacío = placeholder. */
  image?: string;
}

export const projects: Project[] = [
  {
    id: "marina-blau",
    title: "Restaurante Marina Blau",
    location: "Barcelona",
    year: "2024",
    sector: "Restauración",
    summary:
      "Comedor y barra equipados de principio a fin con sobres técnicos y sillas de contract coordinadas en una paleta cálida.",
    materials: ["Sobres HPL", "Sillas de madera", "Bases metálicas"],
  },
  {
    id: "beach-club-sol",
    title: "Beach Club Sol",
    location: "Platja d'Aro, Girona",
    year: "2024",
    sector: "Terrazas y exterior",
    summary:
      "Terraza frente al mar con sombra profesional, asiento apilable y bases de parasol dimensionadas para viento de costa.",
    materials: ["Bases de parasol", "Sillas de exterior", "Sobres Werzalit"],
  },
  {
    id: "hotel-boutique-farners",
    title: "Hotel Boutique Farners",
    location: "Santa Coloma de Farners",
    year: "2023",
    sector: "Hoteles",
    summary:
      "Zonas comunes y desayunador de un hotel boutique con tableros Werzalit y sillería de línea cálida y sobria.",
    materials: ["Sobres Werzalit", "Sillas tapizadas", "Bases de acero"],
  },
  {
    id: "central-market",
    title: "Cafetería Central Market",
    location: "Madrid",
    year: "2023",
    sector: "Espacios comerciales",
    summary:
      "Cafetería de alto tránsito dentro de un mercado gastronómico, con mesas altas, taburetes y superficies de máxima resistencia.",
    materials: ["Mesas altas", "Taburetes", "Sobres compactos"],
  },
  {
    id: "chiringuito-costa-brava",
    title: "Chiringuito Costa Brava",
    location: "Roses, Girona",
    year: "2024",
    sector: "Terrazas y exterior",
    summary:
      "Chiringuito de playa con mobiliario ligero, resistente a la salinidad y fácil de recoger fuera de temporada.",
    materials: ["Sillas de polipropileno", "Bases de parasol", "Bases de aluminio"],
  },
  {
    id: "resort-mediterraneo",
    title: "Resort Mediterráneo",
    location: "Valencia",
    year: "2022",
    sector: "Hoteles",
    summary:
      "Suministro integral de mobiliario para las terrazas, piscina y restaurante de un resort de gran capacidad.",
    materials: ["Mobiliario integral", "Bases de parasol", "Revestimientos"],
  },
  {
    id: "brasserie-le-nord",
    title: "Brasserie Le Nord",
    location: "Andorra la Vella",
    year: "2023",
    sector: "Restauración",
    summary:
      "Brasería de montaña con sobres HPL, sillería metálica y una estética contract urbana y contemporánea.",
    materials: ["Sobres HPL", "Sillas de metal", "Bases metálicas"],
  },
  {
    id: "food-court-diagonal",
    title: "Food Court Diagonal",
    location: "Barcelona",
    year: "2024",
    sector: "Espacios comerciales",
    summary:
      "Zona de restauración de un centro comercial con mobiliario contract de alta rotación y mantenimiento mínimo.",
    materials: ["Mesas de contract", "Carcasas PP", "Perfiles de aluminio"],
  },
];
