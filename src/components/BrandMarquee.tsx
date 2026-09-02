import { Link } from "react-router-dom";
import { Marquee } from "@/components/ui/marquee";
import BrandWordmark from "@/components/BrandWordmark";
import { brands } from "@/data/catalogue";
import { Reveal } from "@/components/Reveal";

/**
 * "Marcas que representamos" — partner strip on the deep-olive band.
 * Wordmarks tint to warm paper and brighten on hover; each links to its
 * brand page. This is the trusted-brands section for the homepage.
 */
export default function BrandMarquee({
  heading = true,
}: {
  heading?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-olive py-16 text-paper md:py-24">
      {heading && (
        <div className="container-site">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="label text-paper/55">Alianzas</span>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-[1.05] md:text-5xl">
                Marcas que representamos
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-paper/70">
              Fabricantes europeos de referencia que confían en Kora Concept
              como su socio comercial y de distribución.
            </p>
          </Reveal>
        </div>
      )}

      <div className="mt-14 md:mt-20">
        <Marquee pauseOnHover speed={38} className="py-2">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/marcas/${brand.id}`}
              aria-label={brand.name}
              className="mx-10 flex h-16 items-center text-paper/55 transition-colors duration-500 hover:text-paper md:mx-16"
            >
              <BrandWordmark id={brand.id} />
            </Link>
          ))}
        </Marquee>
      </div>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-olive to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-olive to-transparent md:w-40" />
    </section>
  );
}
