import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, ButtonLink } from "@/components/ArrowLink";

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="Error 404"
        title={<>Esta página no existe.</>}
        intro="Puede que el enlace esté roto o que la referencia haya cambiado de sitio. Vuelva al catálogo o cuéntenos qué buscaba."
      />
      <Reveal className="container-site flex flex-wrap items-center gap-6 py-16 md:py-24">
        <ButtonLink to="/" variant="dark">
          Volver al inicio
        </ButtonLink>
        <ArrowLink to="/productos" className="text-ink-soft">
          Ver el catálogo
        </ArrowLink>
      </Reveal>
    </>
  );
}
