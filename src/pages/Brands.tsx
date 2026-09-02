import { Link } from "react-router-dom";
import { brands, getCategory } from "@/data/catalogue";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import BrandWordmark from "@/components/BrandWordmark";
import QuoteBand from "@/components/QuoteBand";

export default function Brands() {
  return (
    <>
      <PageHeader
        eyebrow="Alianzas · 05 fabricantes"
        title="Marcas"
        intro="Representamos a fabricantes europeos de referencia. Cada uno, especialista en su terreno; juntos, un catálogo completo para hostelería y contract."
      />

      <section className="container-site py-16 md:py-24">
        <ul className="border-t border-hairline">
          {brands.map((b) => (
            <li key={b.id} className="border-b border-hairline">
              <Link to={`/marcas/${b.id}`} className="group block">
                <Reveal
                  className="grid items-center gap-6 py-10 md:grid-cols-12 md:py-12"
                  y={18}
                >
                  <div className="flex h-14 items-center gap-6 md:col-span-4">
                    <BrandWordmark id={b.id} variant="full" className="h-full" />
                  </div>
                  <div className="md:col-span-3">
                    <span className="label">{b.country}</span>
                    {b.since && (
                      <span className="label ml-3">Desde {b.since}</span>
                    )}
                  </div>
                  <p className="max-w-md text-[15px] leading-relaxed text-muted md:col-span-4">
                    {b.summary}
                  </p>
                  <div className="flex justify-start md:col-span-1 md:justify-end">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-all duration-500 group-hover:border-olive group-hover:bg-olive group-hover:text-paper">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5"
                        fill="none"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Reveal>
              </Link>
            </li>
          ))}
        </ul>

        {/* categories each brand covers, quick map */}
        <Reveal className="mt-16 grid gap-6 md:grid-cols-2">
          <div>
            <span className="label">Cobertura por familia</span>
          </div>
          <div className="space-y-4">
            {brands.map((b) => (
              <div
                key={b.id}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-hairline pb-4"
              >
                <span className="font-display text-lg font-medium">
                  {b.name}
                </span>
                <span className="text-sm text-muted">
                  {b.categories
                    .map((cid) => getCategory(cid)?.name)
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <QuoteBand
        eyebrow="Distribución"
        title="¿Busca una marca o producto concreto?"
        text="Trabajamos con más fabricantes de los que aparecen aquí. Cuéntenos qué necesita y lo localizamos."
      />
    </>
  );
}
