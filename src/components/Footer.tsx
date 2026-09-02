import { Link } from "react-router-dom";
import { brands, categories, contact } from "@/data/catalogue";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-paper">
      <div className="container-site py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              to="/"
              className="font-display text-3xl font-bold tracking-tight md:text-4xl"
            >
              Kora Concept
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
              Agentes comerciales y distribuidores de mobiliario para
              hostelería y contract a nivel europeo. Representamos a los
              mejores fabricantes y resolvemos el proyecto de principio a fin.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-4">
            <div>
              <span className="label text-paper/40">Catálogo</span>
              <ul className="mt-5 space-y-3">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      to={`/productos/${c.id}`}
                      className="link-underline text-sm text-paper/80"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="label text-paper/40">Marcas</span>
              <ul className="mt-5 space-y-3">
                {brands.map((b) => (
                  <li key={b.id}>
                    <Link
                      to={`/marcas/${b.id}`}
                      className="link-underline text-sm text-paper/80"
                    >
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-3">
            <span className="label text-paper/40">Contacto</span>
            <ul className="mt-5 space-y-4 text-sm text-paper/80">
              <li>
                <a
                  href={contact.emailHref}
                  className="link-underline break-words"
                >
                  {contact.email.toLowerCase()}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="link-underline">
                  {contact.phone}
                </a>
                <span className="block text-paper/50">
                  {contact.contactName}
                </span>
              </li>
              <li className="leading-relaxed text-paper/70">
                {contact.address}
                <br />
                {contact.region}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-paper/15 pt-8 text-xs text-paper/40 md:flex-row md:items-center">
          <p>
            © {year} {contact.company}. Todos los derechos reservados.
          </p>
          <p className="label text-paper/30">
            Contract · Hostelería · Distribución europea
          </p>
        </div>
      </div>
    </footer>
  );
}
