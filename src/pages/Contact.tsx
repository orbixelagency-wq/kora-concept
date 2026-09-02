import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { categories, contact } from "@/data/catalogue";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full border-0 border-b border-hairline bg-transparent py-3 font-sans text-lg text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-olive";

export default function Contact() {
  const [params] = useSearchParams();
  const preset = params.get("categoria");

  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    tipo: "",
    cantidades: "",
    mensaje: "",
  });
  const [cats, setCats] = useState<string[]>(
    preset ? [preset] : []
  );
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleCat = (id: string) =>
    setCats((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const mailtoHref = useMemo(() => {
    const selected = cats
      .map((id) => categories.find((c) => c.id === id)?.name)
      .filter(Boolean)
      .join(", ");
    const body = [
      `Nombre: ${form.nombre}`,
      `Empresa: ${form.empresa}`,
      `Email: ${form.email}`,
      `Teléfono: ${form.telefono}`,
      `Tipo de proyecto: ${form.tipo}`,
      `Familias de producto: ${selected || "—"}`,
      `Cantidades estimadas: ${form.cantidades}`,
      "",
      "Detalle del proyecto:",
      form.mensaje,
    ].join("\n");
    const subject = `Solicitud de presupuesto — ${form.empresa || form.nombre || "Nuevo proyecto"}`;
    return `${contact.emailHref}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [form, cats]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = mailtoHref;
    setSent(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Contacto · Presupuesto a medida"
        title={<>Solicitar presupuesto</>}
        intro="Sin tienda ni carrito: trabajamos por proyecto y volumen. Cuéntenos qué necesita y le respondemos con una propuesta a medida."
      />

      <section className="container-site py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          {/* form */}
          <div className="md:col-span-7">
            {sent ? (
              <Reveal className="flex min-h-[420px] flex-col justify-center border border-olive bg-olive p-10 text-paper md:p-14">
                <span className="label text-paper/60">Casi hecho</span>
                <h2 className="mt-5 font-display text-3xl font-semibold leading-tight md:text-4xl">
                  Se ha abierto su correo con la solicitud
                </h2>
                <p className="mt-5 max-w-md text-paper/75">
                  Revíselo y pulse enviar. Si no se ha abierto, escríbanos
                  directamente a{" "}
                  <a
                    href={contact.emailHref}
                    className="link-underline font-medium text-paper"
                  >
                    {contact.email.toLowerCase()}
                  </a>
                  . Le responderemos con una propuesta a medida.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 w-fit text-sm font-medium text-paper/70 underline underline-offset-4 hover:text-paper"
                >
                  Volver al formulario
                </button>
              </Reveal>
            ) : (
              <Reveal>
                <form onSubmit={onSubmit} className="space-y-10">
                  <div className="grid gap-8 md:grid-cols-2">
                    <Field label="Nombre" required>
                      <input
                        className={inputBase}
                        value={form.nombre}
                        onChange={set("nombre")}
                        required
                        placeholder="Su nombre"
                      />
                    </Field>
                    <Field label="Empresa" required>
                      <input
                        className={inputBase}
                        value={form.empresa}
                        onChange={set("empresa")}
                        required
                        placeholder="Nombre de la empresa"
                      />
                    </Field>
                    <Field label="Email" required>
                      <input
                        type="email"
                        className={inputBase}
                        value={form.email}
                        onChange={set("email")}
                        required
                        placeholder="nombre@empresa.com"
                      />
                    </Field>
                    <Field label="Teléfono">
                      <input
                        className={inputBase}
                        value={form.telefono}
                        onChange={set("telefono")}
                        placeholder="+34 ..."
                      />
                    </Field>
                  </div>

                  <Field label="Tipo de proyecto">
                    <input
                      className={inputBase}
                      value={form.tipo}
                      onChange={set("tipo")}
                      placeholder="Restaurante, hotel, cadena, terraza, gran superficie…"
                    />
                  </Field>

                  <div>
                    <span className="label">Familias de producto</span>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {categories.map((c) => {
                        const active = cats.includes(c.id);
                        return (
                          <button
                            type="button"
                            key={c.id}
                            onClick={() => toggleCat(c.id)}
                            className={cn(
                              "rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-300",
                              active
                                ? "border-olive bg-olive text-paper"
                                : "border-hairline text-ink-soft hover:border-ink"
                            )}
                          >
                            {c.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Field label="Cantidades estimadas">
                    <input
                      className={inputBase}
                      value={form.cantidades}
                      onChange={set("cantidades")}
                      placeholder="p. ej. 120 sillas + 40 mesas"
                    />
                  </Field>

                  <Field label="Detalle del proyecto">
                    <textarea
                      className={cn(inputBase, "min-h-[120px] resize-y")}
                      value={form.mensaje}
                      onChange={set("mensaje")}
                      placeholder="Plazos, acabados, referencias, ubicación de entrega…"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-colors duration-500 hover:bg-olive"
                  >
                    Enviar solicitud
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
                  </button>
                  <p className="text-xs leading-relaxed text-muted">
                    Al enviar, se abrirá su cliente de correo con la solicitud
                    preparada. No almacenamos datos en este sitio.
                  </p>
                </form>
              </Reveal>
            )}
          </div>

          {/* aside */}
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.1}>
            <div className="border-t border-hairline pt-8">
              <span className="label">Contacto directo</span>
              <p className="mt-5 font-display text-xl leading-snug text-ink">
                {contact.contactName}
              </p>
              <a
                href={contact.emailHref}
                className="link-underline mt-2 block text-base font-medium text-ink-soft"
              >
                {contact.email.toLowerCase()}
              </a>
              <a
                href={contact.phoneHref}
                className="link-underline mt-1 block text-base text-ink-soft"
              >
                Tel. {contact.phone}
              </a>
              <a
                href={contact.mobileHref}
                className="link-underline mt-1 block text-base text-ink-soft"
              >
                Móvil {contact.mobile}
              </a>
            </div>
            <div className="mt-10 border-t border-hairline pt-8">
              <span className="label">Dirección</span>
              <p className="mt-5 font-display text-xl leading-snug text-ink">
                {contact.address}
              </p>
              <p className="mt-2 text-sm text-muted">{contact.region}</p>
            </div>
            <div className="mt-10 border-t border-hairline pt-8">
              <span className="label">Perfil</span>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                Atención B2B a empresas, hostelería, contract y grandes
                superficies. Pedidos por proyecto y volumen.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label">
        {label}
        {required && <span className="text-olive"> *</span>}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
