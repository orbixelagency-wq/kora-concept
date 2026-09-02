import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ArrowLink";

const nav = [
  { to: "/productos", label: "Productos" },
  { to: "/marcas", label: "Marcas" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  // The home hero is a full-bleed photo with its own dark scrim — before the
  // user scrolls past it, the header reads in light text over that photo
  // instead of the app's default dark-on-paper.
  const overlay = location.pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-hairline bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-site flex h-[70px] items-center justify-between md:h-[84px]">
          <Link
            to="/"
            className={cn(
              "flex items-baseline gap-2 font-display text-xl font-bold tracking-tight transition-colors duration-500",
              overlay ? "text-paper" : "text-ink"
            )}
          >
            Kora
            <span
              className={cn(
                "font-light transition-colors duration-500",
                overlay ? "text-paper/60" : "text-muted"
              )}
            >
              Concept
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "link-underline text-sm font-medium transition-colors duration-500",
                    overlay
                      ? cn("text-paper/80 hover:text-paper", isActive && "text-paper")
                      : cn("text-ink-soft hover:text-ink", isActive && "text-ink")
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <ButtonLink to="/contacto" variant="dark" className="py-2.5">
              Solicitar presupuesto
            </ButtonLink>
          </div>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <span
              className={cn(
                "h-[1.5px] w-6 transition-all duration-300",
                open ? "translate-y-[3.75px] rotate-45 bg-ink" : overlay ? "bg-paper" : "bg-ink"
              )}
            />
            <span
              className={cn(
                "h-[1.5px] w-6 transition-all duration-300",
                open ? "-translate-y-[3.75px] -rotate-45 bg-ink" : overlay ? "bg-paper" : "bg-ink"
              )}
            />
          </button>
        </div>
      </header>

      {/* mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-between bg-paper px-6 pb-10 pt-28 transition-all duration-500 md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <nav className="flex flex-col">
          {nav.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "border-b border-hairline py-5 font-display text-3xl font-medium text-ink transition-transform duration-500",
                open ? "translate-y-0" : "translate-y-4"
              )}
              style={{ transitionDelay: open ? `${i * 60 + 100}ms` : "0ms" }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <ButtonLink to="/contacto" variant="olive" className="w-full justify-center">
          Solicitar presupuesto
        </ButtonLink>
      </div>
    </>
  );
}
