import { Link, Navigate, useParams } from "react-router-dom";
import { getCategory, getBrand } from "@/data/catalogue";
import PageHeader from "@/components/PageHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import SpecImage from "@/components/SpecImage";
import { ArrowLink } from "@/components/ArrowLink";
import QuoteBand from "@/components/QuoteBand";

export default function CategoryDetail() {
  const { id } = useParams();
  const category = id ? getCategory(id) : undefined;
  if (!category) return <Navigate to="/productos" replace />;

  return (
    <>
      <PageHeader
        eyebrow={`Catálogo · ${category.index}`}
        title={category.name}
        intro={category.subtitle}
        aside={
          <div className="mt-6">
            <ArrowLink to="/contacto" className="text-olive">
              Solicitar presupuesto de esta familia
            </ArrowLink>
          </div>
        }
      />

      {/* intro + lead image */}
      <section className="container-site py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <SpecImage
              alt={category.name}
              caption={category.subtitle}
              index={category.index}
              ratio="3/2"
            />
          </Reveal>
          <Reveal className="flex flex-col justify-center md:col-span-4 md:col-start-9" delay={0.1}>
            <p className="text-lg leading-relaxed text-ink-soft">
              {category.intro}
            </p>
            {category.subcategories.length > 0 && (
              <div className="mt-8">
                <span className="label">Subfamilias</span>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.subcategories.map((sub) => (
                    <span
                      key={sub}
                      className="rounded-full border border-hairline px-3.5 py-1.5 text-[13px] font-medium text-ink-soft transition-colors duration-300 hover:border-olive hover:text-olive"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* specs table */}
      <section className="border-y border-hairline bg-paper-2/50">
        <div className="container-site py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <span className="label">Ficha técnica</span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Lo que debe saber
              </h2>
            </Reveal>
            <RevealGroup className="md:col-span-7 md:col-start-6">
              {category.specs.map((s) => (
                <RevealItem
                  key={s.label}
                  className="grid grid-cols-1 gap-1 border-t border-hairline py-6 first:border-t-0 first:pt-0 md:grid-cols-3 md:gap-6"
                >
                  <dt className="label pt-1">{s.label}</dt>
                  <dd className="font-display text-lg text-ink md:col-span-2">
                    {s.value}
                  </dd>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* usage scenes gallery */}
      <section className="container-site py-16 md:py-24">
        <Reveal>
          <span className="label">Aplicaciones</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Dónde encaja
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {category.scenes.map((scene, i) => (
            <RevealItem key={scene}>
              <SpecImage
                alt={scene}
                caption={scene}
                index={`${category.index}.${i + 1}`}
                ratio="4/3"
              />
              <p className="mt-3 text-sm text-muted">{scene}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* brands for this category */}
      <section className="border-t border-hairline">
        <div className="container-site py-16 md:py-24">
          <Reveal>
            <span className="label">Fabricantes</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Marcas para esta familia
            </h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2">
            {category.brands.map((bid) => {
              const b = getBrand(bid);
              if (!b) return null;
              return (
                <RevealItem key={bid}>
                  <Link
                    to={`/marcas/${b.id}`}
                    className="group flex h-full flex-col justify-between gap-8 border border-hairline p-7 transition-colors duration-500 hover:border-olive md:p-9"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl font-semibold tracking-tight">
                        {b.name}
                      </span>
                      <span className="label">{b.country}</span>
                    </div>
                    <p className="max-w-sm text-[15px] leading-relaxed text-muted">
                      {b.summary}
                    </p>
                    <span className="link-underline text-sm font-medium text-olive">
                      Ver marca
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <QuoteBand
        eyebrow={`Presupuesto · ${category.name}`}
        title={`Presupuesto de ${category.name.toLowerCase()}`}
        text="Indíquenos cantidades, acabados y plazos y le preparamos una propuesta por volumen con la mejor combinación de marca y precio."
      />
    </>
  );
}
