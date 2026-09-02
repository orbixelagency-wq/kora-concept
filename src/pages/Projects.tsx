import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import SpecImage from "@/components/SpecImage";
import QuoteBand from "@/components/QuoteBand";
import { cn } from "@/lib/utils";
import { projects, projectSectors, type Project } from "@/data/projects";

const FILTERS = ["Todos", ...projectSectors] as const;
type Filter = (typeof FILTERS)[number];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const [activeId, setActiveId] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      filter === "Todos"
        ? projects
        : projects.filter((p) => p.sector === filter),
    [filter]
  );

  const activeIndex = visible.findIndex((p) => p.id === activeId);
  const active = activeIndex >= 0 ? visible[activeIndex] : null;

  const close = useCallback(() => setActiveId(null), []);
  const step = useCallback(
    (dir: number) => {
      setActiveId((cur) => {
        const i = visible.findIndex((p) => p.id === cur);
        if (i < 0) return cur;
        const next = (i + dir + visible.length) % visible.length;
        return visible[next].id;
      });
    },
    [visible]
  );

  // Keyboard controls + scroll lock while the lightbox is open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close, step]);

  return (
    <>
      <PageHeader
        eyebrow="Portfolio · Proyectos realizados"
        title="Proyectos realizados"
        intro="Una selección de espacios de hostelería y contract que hemos equipado en toda Europa. Del restaurante de barrio al resort de gran capacidad, con las marcas que representamos."
      />

      {/* Filtros por sector */}
      <section className="container-site pt-12 md:pt-16">
        <div className="flex flex-wrap gap-2.5">
          {FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={isActive}
                className={cn(
                  "select-none rounded-full border px-4 py-2 text-sm font-medium",
                  "transition-[background-color,color,border-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                  isActive
                    ? "border-ink bg-ink text-paper"
                    : "border-hairline text-ink-soft hover:border-olive hover:text-olive"
                )}
              >
                {f}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid de proyectos */}
      <section className="container-site pb-8 pt-10 md:pt-14">
        <motion.ul
          layout
          className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard
                  project={p}
                  index={i}
                  onOpen={() => setActiveId(p.id)}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <p className="py-16 text-center text-muted">
            No hay proyectos en este sector todavía.
          </p>
        )}
      </section>

      <div className="mt-16 md:mt-24">
        <QuoteBand
          eyebrow="Nuevo proyecto"
          title="¿Equipamos su próximo espacio?"
          text="Cuéntenos qué tiene entre manos —tipología, cantidades y plazos— y le preparamos una propuesta a medida con las marcas adecuadas."
        />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <Lightbox
            project={active}
            position={`${activeIndex + 1} / ${visible.length}`}
            onClose={close}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Card ─────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full text-left focus-visible:outline-none"
    >
      <div className="relative overflow-hidden ring-1 ring-transparent transition-all duration-500 group-hover:ring-olive group-focus-visible:ring-olive">
        <SpecImage
          src={project.image}
          alt={project.title}
          caption={project.title}
          index={`P.${String(index + 1).padStart(2, "0")}`}
          ratio="4/3"
        />
        {/* hover scrim + zoom cue */}
        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/55 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="m-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/95 text-ink">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path
                d="M8 3H5a2 2 0 0 0-2 2v3m0 8v3a2 2 0 0 0 2 2h3m8-18h3a2 2 0 0 1 2 2v3m0 8v3a2 2 0 0 1-2 2h-3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-[11px] font-medium uppercase tracking-label text-ink">
          {project.sector}
        </span>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-medium tracking-tight transition-colors duration-500 group-hover:text-olive">
            {project.title}
          </h3>
          {project.year && <span className="label shrink-0">{project.year}</span>}
        </div>
        <p className="mt-1.5 text-sm text-muted">{project.location}</p>
        <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5">
          {project.materials.map((m) => (
            <span
              key={m}
              className="rounded-full bg-paper-2 px-2.5 py-1 text-[12px] font-medium text-ink-soft"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

/* ── Lightbox modal ───────────────────────────────────────── */
function Lightbox({
  project,
  position,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project;
  position: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        className="relative z-10 flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-sm bg-paper shadow-2xl md:flex-row"
        initial={{ scale: 0.96, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97, y: 10 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="md:w-[62%]">
          <SpecImage
            src={project.image}
            alt={project.title}
            caption={project.title}
            index={project.sector}
            ratio="3/2"
            className="h-full"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-7 md:p-9">
          <div>
            <div className="flex items-center justify-between">
              <span className="label">{project.sector}</span>
              <span className="label">{position}</span>
            </div>
            <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-muted">
              {project.location}
              {project.year ? ` · ${project.year}` : ""}
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              {project.summary}
            </p>

            <div className="mt-6">
              <span className="label">Materiales y mobiliario</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.materials.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-hairline px-3 py-1.5 text-[13px] font-medium text-ink-soft"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Proyecto anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink transition-colors duration-300 hover:border-olive hover:text-olive active:scale-95"
            >
              <NavArrow dir="left" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Proyecto siguiente"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink transition-colors duration-300 hover:border-olive hover:text-olive active:scale-95"
            >
              <NavArrow dir="right" />
            </button>
            <Link
              to="/contacto"
              onClick={onClose}
              className="ml-auto text-sm font-medium text-olive link-underline"
            >
              Solicitar algo similar
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sm transition-colors duration-300 hover:bg-ink hover:text-paper active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

function NavArrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
