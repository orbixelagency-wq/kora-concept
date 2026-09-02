import { Link, Navigate, useParams } from "react-router-dom";
import { getBrand, categoriesForBrand } from "@/data/catalogue";
import PageHeader from "@/components/PageHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import SpecImage from "@/components/SpecImage";
import BrandWordmark from "@/components/BrandWordmark";
import QuoteBand from "@/components/QuoteBand";

export default function BrandDetail() {
  const { id } = useParams();
  const brand = id ? getBrand(id) : undefined;
  if (!brand) return <Navigate to="/marcas" replace />;

  const cats = categoriesForBrand(brand);

  return (
    <>
      <PageHeader
        eyebrow={`Marca · ${brand.country}${
          brand.since ? ` · desde ${brand.since}` : ""
        }`}
        title={brand.name}
        intro={brand.summary}
        aside={
          <a
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-olive"
          >
            <span className="link-underline">Sitio del fabricante</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M7 17L17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        }
      />

      <section className="container-site py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <SpecImage
              src={brand.image}
              alt={brand.name}
              caption={brand.tagline}
              index={brand.name.slice(0, 3).toUpperCase()}
              ratio="3/2"
              tone="olive"
            />
          </Reveal>
          <Reveal className="flex flex-col justify-between md:col-span-4 md:col-start-9" delay={0.1}>
            <div className="flex h-14 w-fit items-center border border-hairline bg-paper px-6">
              <BrandWordmark id={brand.id} variant="full" className="h-8" />
            </div>
            <p className="mt-8 text-lg leading-relaxed text-ink-soft">
              {brand.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* strengths */}
      <section className="border-y border-hairline bg-paper-2/50">
        <div className="container-site py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <span className="label">Por qué esta marca</span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Puntos fuertes
              </h2>
            </Reveal>
            <RevealGroup className="md:col-span-7 md:col-start-6">
              {brand.strengths.map((s, i) => (
                <RevealItem
                  key={s}
                  className="grid grid-cols-[auto_1fr] gap-6 border-t border-hairline py-7 first:border-t-0 first:pt-0"
                >
                  <span className="label pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-xl leading-snug text-ink">
                    {s}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* categories covered */}
      <section className="container-site py-16 md:py-24">
        <Reveal>
          <span className="label">En el catálogo</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Familias que cubre
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {cats.map((c) => (
            <RevealItem key={c.id}>
              <Link
                to={`/productos/${c.id}`}
                className="group flex h-full flex-col justify-between gap-10 border border-hairline p-7 transition-colors duration-500 hover:border-olive"
              >
                <span className="label">{c.index}</span>
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-olive">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{c.subtitle}</p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <QuoteBand
        eyebrow={`Presupuesto · ${brand.name}`}
        title={`Trabaje con ${brand.name}`}
        text="Le preparamos una propuesta con producto de esta marca, dimensionada a las cantidades y plazos de su proyecto."
      />
    </>
  );
}
