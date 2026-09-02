import { Link } from "react-router-dom";
import { categories, getBrand } from "@/data/catalogue";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import SpecImage from "@/components/SpecImage";
import QuoteBand from "@/components/QuoteBand";

export default function Products() {
  return (
    <>
      <PageHeader
        eyebrow="Catálogo · 06 familias"
        title="Productos"
        intro="Todo lo que necesita para equipar un espacio de hostelería o contract, organizado por familia. Cada categoría se apoya en los fabricantes especialistas que representamos."
      />

      <div className="container-site pb-8 pt-16 md:pt-24">
        <div className="flex flex-col gap-24 md:gap-36">
          {categories.map((c, i) => (
            <Reveal key={c.id}>
              <div className="grid gap-8 md:grid-cols-12 md:gap-10">
                <div
                  className={`md:col-span-6 ${
                    i % 2 === 1 ? "md:order-2 md:col-start-7" : ""
                  }`}
                >
                  <Link to={`/productos/${c.id}`} className="block">
                    <SpecImage
                      alt={c.name}
                      caption={c.subtitle}
                      index={c.index}
                      ratio="4/3"
                    />
                  </Link>
                </div>
                <div
                  className={`flex flex-col justify-center md:col-span-5 ${
                    i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-8"
                  }`}
                >
                  <span className="label">{c.index}</span>
                  <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                    {c.name}
                  </h2>
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
                    {c.intro}
                  </p>

                  {c.subcategories.length > 0 && (
                    <div className="mt-6">
                      <span className="label">Subfamilias</span>
                      <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
                        {c.subcategories.map((sub) => (
                          <span
                            key={sub}
                            className="rounded-full bg-paper-2 px-3 py-1 text-[13px] font-medium text-ink-soft"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-7 flex flex-wrap gap-2">
                    {c.brands.map((bid) => {
                      const b = getBrand(bid);
                      return (
                        <span
                          key={bid}
                          className="rounded-full border border-hairline px-3 py-1.5 text-xs font-medium text-muted"
                        >
                          {b?.name}
                        </span>
                      );
                    })}
                  </div>

                  <Link
                    to={`/productos/${c.id}`}
                    className="group mt-8 inline-flex items-center gap-2.5 self-start rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors duration-500 hover:bg-olive"
                  >
                    Ver {c.name.toLowerCase()}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
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
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-24 md:mt-36">
        <QuoteBand
          title="¿No encuentra una tipología concreta?"
          text="Nuestro catálogo va más allá de lo que se muestra aquí. Díganos qué busca y localizamos el producto y el fabricante adecuados."
        />
      </div>
    </>
  );
}
