import PageHeader from "@/components/PageHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import SpecImage from "@/components/SpecImage";
import BrandMarquee from "@/components/BrandMarquee";
import QuoteBand from "@/components/QuoteBand";
import { contact } from "@/data/catalogue";

const values = [
  {
    n: "01",
    t: "Criterio",
    d: "Seleccionamos fabricantes y producto por calidad real y adecuación al uso profesional, no por catálogo. Si no encaja, no lo proponemos.",
  },
  {
    n: "02",
    t: "Escala",
    d: "Nacimos para el volumen. Negociamos, coordinamos y entregamos a la escala que exige un proyecto de hostelería o contract.",
  },
  {
    n: "03",
    t: "Cercanía",
    d: "Un interlocutor directo desde Girona para toda Europa. Trato ágil, respuestas rápidas y seguimiento del proyecto de principio a fin.",
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Nosotros"
        title={<>Agentes de mobiliario, resolvedores de proyectos.</>}
        intro="Kora Concept compra y vende mobiliario para hostelería y contract a nivel europeo. Entre el fabricante y quien equipa el espacio, ponemos criterio, escala y un único interlocutor."
      />

      <section className="container-site py-16 md:py-24">
        <Reveal>
          <SpecImage
            alt="Espacio de hostelería equipado por Kora Concept"
            caption="Proyecto contract · hostelería"
            index="KC"
            ratio="16/9"
          />
        </Reveal>
      </section>

      <section className="container-site pb-8">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Qué significa ser agente y distribuidor
            </h2>
          </Reveal>
          <Reveal className="space-y-6 text-base leading-relaxed text-ink-soft md:col-span-6 md:col-start-7" delay={0.1}>
            <p>
              No fabricamos: representamos. Eso nos deja libres para elegir, en
              cada proyecto, la marca y el producto que mejor responden a lo que
              se necesita. Trabajamos con cinco fabricantes europeos de
              referencia y sumamos, sobre ese catálogo, la parte que marca la
              diferencia: asesoramiento, condiciones de volumen y logística.
            </p>
            <p>
              El cliente habla con una sola empresa —Kora Concept— y recibe una
              solución completa: del sobre de mesa a la base del parasol, con un
              presupuesto, un plazo y una entrega coordinada.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-site py-20 md:py-28">
        <RevealGroup className="grid gap-px overflow-hidden border border-hairline bg-hairline md:grid-cols-3">
          {values.map((v) => (
            <RevealItem
              key={v.n}
              className="flex min-h-[260px] flex-col justify-between bg-paper p-8 md:p-10"
            >
              <span className="font-display text-5xl font-semibold text-olive/25">
                {v.n}
              </span>
              <div>
                <h3 className="font-display text-2xl font-medium tracking-tight">
                  {v.t}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {v.d}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* why Kora, in numbers */}
      <section className="border-t border-hairline bg-paper-2/50">
        <div className="container-site py-16 md:py-24">
          <Reveal className="max-w-2xl">
            <span className="label">Por qué Kora Concept</span>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.03] tracking-tight md:text-5xl">
              El atajo entre la fábrica europea y su proyecto
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
              Comprar directo a fábrica sin intermediario local significa
              gestionar cinco idiomas, cinco condiciones comerciales y cinco
              plazos de transporte distintos. Kora Concept absorbe esa
              complejidad: negociamos en volumen con cada fabricante y la
              trasladamos a un único presupuesto, un único plazo y una única
              factura.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-8 border-t border-hairline pt-12 md:mt-20 md:grid-cols-4">
            {[
              { v: "5", l: "Fabricantes europeos representados" },
              { v: "4", l: "Familias de producto en catálogo" },
              { v: "100%", l: "Proyectos B2B — sin venta al detalle" },
              { v: "1", l: "Interlocutor para todo el pedido" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
                  {s.v}
                </div>
                <div className="mt-3 text-sm text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BrandMarquee />

      <section className="container-site py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <span className="label">Dónde estamos</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Base en Girona, alcance europeo
            </h2>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-6" delay={0.1}>
            <dl className="divide-y divide-hairline border-y border-hairline">
              <div className="grid grid-cols-3 gap-4 py-6">
                <dt className="label pt-1">Empresa</dt>
                <dd className="col-span-2 font-display text-lg">
                  {contact.company}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-6">
                <dt className="label pt-1">Interlocutor</dt>
                <dd className="col-span-2 font-display text-lg">
                  {contact.contactName}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-6">
                <dt className="label pt-1">Dirección</dt>
                <dd className="col-span-2 font-display text-lg">
                  {contact.address}
                  <span className="block text-sm text-muted">
                    {contact.region}
                  </span>
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-6">
                <dt className="label pt-1">Email</dt>
                <dd className="col-span-2">
                  <a
                    href={contact.emailHref}
                    className="link-underline font-display text-lg"
                  >
                    {contact.email.toLowerCase()}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-6">
                <dt className="label pt-1">Teléfono</dt>
                <dd className="col-span-2">
                  <a
                    href={contact.phoneHref}
                    className="link-underline font-display text-lg"
                  >
                    {contact.phone}
                  </a>
                  <span className="block text-sm text-muted">
                    Móvil {contact.mobile}
                  </span>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
