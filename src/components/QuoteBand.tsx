import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ArrowLink";

/** Recurring conversion band — replaces the "add to cart" of a shop. */
export default function QuoteBand({
  eyebrow = "Solicitud de presupuesto",
  title = "¿Tiene un proyecto entre manos?",
  text = "Cuéntenos qué necesita —tipología, cantidades y plazos— y le preparamos una propuesta a medida con las marcas adecuadas.",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-olive text-paper">
      <div className="container-site py-20 md:py-32">
        <Reveal className="max-w-4xl">
          <span className="label text-paper/55">{eyebrow}</span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            {title}
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-paper/75 md:text-lg">
            {text}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink to="/contacto" variant="light">
              Solicitar presupuesto
            </ButtonLink>
            <a
              href="mailto:jordirawal@koraconcept.com"
              className="link-underline text-sm font-medium text-paper/80"
            >
              jordirawal@koraconcept.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
