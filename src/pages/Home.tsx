import { Link } from "react-router-dom";
import { categories, brands } from "@/data/catalogue";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { ArrowLink } from "@/components/ArrowLink";
import BrandMarquee from "@/components/BrandMarquee";
import QuoteBand from "@/components/QuoteBand";
import CinematicHero from "@/components/CinematicHero";

export default function Home() {
  return (
    <>
      <CinematicHero />
      <Approach />
      <CatalogueRows />
      <BrandMarquee />
      <Process />
      <QuoteBand />
    </>
  );
}

/* ── Approach / manifesto ─────────────────────────────────── */
const pillars = [
  {
    n: "01",
    t: "Un solo interlocutor",
    d: "Coordinamos varias marcas y familias de producto en un único pedido, presupuesto y plazo. Usted habla con Kora; nosotros con la fábrica.",
  },
  {
    n: "02",
    t: "Pensado para el volumen",
    d: "Trabajamos por proyecto y gran cantidad: hostelería, cadenas, grandes superficies y contract. Precio y logística dimensionados a escala.",
  },
  {
    n: "03",
    t: "Marcas seleccionadas",
    d: "Representamos a cinco fabricantes europeos de referencia. Cada categoría, con el especialista adecuado detrás.",
  },
];

function Approach() {
  return (
    <section className="container-site py-24 md:py-36">
      <div className="grid gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <span className="label">El planteamiento</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.03] tracking-tight md:text-5xl lg:text-6xl">
            No vendemos un catálogo. Resolvemos una necesidad.
          </h2>
          <p className="mt-7 max-w-md text-base leading-relaxed text-ink-soft">
            Kora Concept es el puente entre los fabricantes europeos y quien
            equipa espacios: restaurantes, hoteles, terrazas y grandes
            superficies. Analizamos el proyecto y proponemos la combinación
            exacta de producto, marca y cantidad.
          </p>
        </Reveal>

        <RevealGroup
          as="ul"
          className="flex flex-col md:col-span-6 md:col-start-7"
        >
          {pillars.map((p) => (
            <RevealItem
              as="li"
              key={p.n}
              className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-hairline py-8 first:border-t-0 first:pt-0 md:py-10"
            >
              <span className="label pt-1">{p.n}</span>
              <div>
                <h3 className="font-display text-2xl font-medium tracking-tight">
                  {p.t}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                  {p.d}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── Catalogue rows ───────────────────────────────────────── */
function CatalogueRows() {
  return (
    <section className="border-t border-hairline">
      <div className="container-site">
        <Reveal className="flex flex-col gap-4 py-14 md:flex-row md:items-end md:justify-between md:py-20">
          <div>
            <span className="label">El catálogo</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Seis familias de producto
            </h2>
          </div>
          <ArrowLink to="/productos" className="text-ink-soft">
            Ver todo el catálogo
          </ArrowLink>
        </Reveal>
      </div>

      <ul>
        {categories.map((c) => (
          <li key={c.id} className="border-t border-hairline">
            <Link to={`/productos/${c.id}`} className="group block">
              <div className="container-site grid items-center gap-6 py-10 md:grid-cols-12 md:py-14">
                <span className="label md:col-span-1">{c.index}</span>
                <Reveal
                  className="md:col-span-4"
                  y={20}
                  delay={0}
                >
                  <h3 className="font-display text-3xl font-medium tracking-tight transition-colors duration-500 group-hover:text-olive md:text-5xl">
                    {c.name}
                  </h3>
                </Reveal>
                <Reveal className="md:col-span-4 md:col-start-6" delay={0.05}>
                  <p className="max-w-sm text-[15px] leading-relaxed text-muted">
                    {c.subtitle}
                  </p>
                </Reveal>
                <Reveal
                  className="flex items-center justify-between md:col-span-2 md:col-start-11 md:justify-end md:gap-6"
                  delay={0.1}
                >
                  <span className="label hidden md:inline">
                    {c.brands.length} {c.brands.length > 1 ? "marcas" : "marca"}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline transition-all duration-500 group-hover:border-olive group-hover:bg-olive group-hover:text-paper">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5"
                      fill="none"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Reveal>
              </div>
            </Link>
          </li>
        ))}
        <li className="border-t border-hairline" />
      </ul>
    </section>
  );
}

/* ── Process ──────────────────────────────────────────────── */
const steps = [
  {
    n: "01",
    t: "Atendemos su petición",
    d: "Modelos, plazos y cantidades. Definimos el alcance real del pedido.",
  },
  {
    n: "02",
    t: "Seleccionamos producto",
    d: "Cruzamos su necesidad con nuestras marcas y proponemos la combinación óptima de calidad y precio.",
  },
  {
    n: "03",
    t: "Presupuesto a medida",
    d: "Una propuesta clara, con condiciones y logística cerradas. Sin sorpresas.",
  },
  {
    n: "04",
    t: "Suministro y entrega",
    d: "Coordinamos fabricación, transporte y entrega para que el material pedido llegue completo, en perfecto estado y en el plazo acordado.",
  },
];

function Process() {
  return (
    <section className="container-site py-24 md:py-36">
      <Reveal className="max-w-2xl">
        <span className="label">Cómo trabajamos</span>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.03] tracking-tight md:text-6xl">
          Un proceso claro, de la consulta a la entrega
        </h2>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-none border border-hairline bg-hairline md:mt-20 md:grid-cols-4">
        {steps.map((s) => (
          <RevealItem
            key={s.n}
            className="flex min-h-[240px] flex-col justify-between bg-paper p-7 md:p-8"
          >
            <span className="font-display text-5xl font-semibold text-olive/25">
              {s.n}
            </span>
            <div>
              <h3 className="font-display text-xl font-medium tracking-tight">
                {s.t}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                {s.d}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <StatsRow />
      </Reveal>
    </section>
  );
}

function StatsRow() {
  const stats = [
    { v: String(brands.length), l: "Marcas representadas" },
    { v: String(categories.length), l: "Familias de producto" },
    { v: "5", l: "Países de origen" },
    { v: "B2B", l: "Hostelería · contract" },
  ];
  return (
    <div className="mt-20 grid grid-cols-2 gap-8 border-t border-hairline pt-12 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.l}>
          <div className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
            {s.v}
          </div>
          <div className="mt-3 text-sm text-muted">{s.l}</div>
        </div>
      ))}
    </div>
  );
}
