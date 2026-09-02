import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { categories } from "@/data/catalogue";
import { ButtonLink, ArrowLink } from "@/components/ArrowLink";
import "@/components/CinematicHero.css";

const SCROLL_RUNWAY = 2200; // px of extra scroll beyond 100vh

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smoothstep = (e0: number, e1: number, v: number) => {
  const x = clamp((v - e0) / (e1 - e0));
  return x * x * (3 - 2 * x);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Sticky cinematic hero: a tall spacer holds a 100svh sticky stage while the
 * real terrace photo, headline and a looping rail of the four product
 * families are all driven by scroll position through CSS custom properties
 * set directly on the DOM (no per-frame React re-render). Mirrors the
 * scroll-jack technique — segmented smoothstep "acts" plus a lerped mouse
 * parallax — kept to what the site actually has: one photo, no fake layers.
 */
export default function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const active = useRef(categories.length); // start on the middle set
  const reduceMotion = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const controls = controlsRef.current;
    if (!section || !track || !controls) return;

    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const state = {
      targetMouseX: 0,
      targetMouseY: 0,
      mouseX: 0,
      mouseY: 0,
      targetScroll: 0,
      smoothScroll: 0,
      initialized: false,
      rafPending: false,
    };

    const getScrollDistance = () => {
      const rect = section.getBoundingClientRect();
      return clamp(-rect.top, 0, section.offsetHeight - window.innerHeight);
    };

    const updateRail = (jump = false) => {
      const card = cardRefs.current[0];
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap || "0");
      const shift = -(card.offsetWidth + gap) * active.current;
      section.style.setProperty("--rail-shift", `${shift}px`);
      cardRefs.current.forEach((el, i) =>
        el?.classList.toggle("is-active", i === active.current)
      );
      if (jump) {
        track.classList.add("is-jumping");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => track.classList.remove("is-jumping"))
        );
      }
    };

    const normalizeRail = () => {
      const n = categories.length;
      if (active.current >= n * 2) {
        active.current -= n;
        updateRail(true);
      } else if (active.current < n) {
        active.current += n;
        updateRail(true);
      }
    };

    const moveRail = (dir: number) => {
      active.current += dir;
      updateRail();
    };

    const selectRail = (index: number) => {
      active.current = index;
      updateRail();
    };

    const update = () => {
      state.rafPending = false;
      state.targetScroll = getScrollDistance();

      if (!state.initialized || reduceMotion.current) {
        state.smoothScroll = state.targetScroll;
        state.initialized = true;
      } else {
        state.smoothScroll = lerp(state.smoothScroll, state.targetScroll, 0.15);
      }
      if (Math.abs(state.smoothScroll - state.targetScroll) < 0.1) {
        state.smoothScroll = state.targetScroll;
      }

      state.mouseX = lerp(state.mouseX, state.targetMouseX, 0.1);
      state.mouseY = lerp(state.mouseY, state.targetMouseY, 0.1);

      const s = state.smoothScroll;
      const progress = clamp(s / SCROLL_RUNWAY);
      const introExit = smoothstep(50, 480, s);
      const moodEnter = smoothstep(380, 1080, s);
      const railEnterRaw = smoothstep(1280, 1980, s);
      const railEnter = Math.pow(railEnterRaw, 1.5);
      const controlsEnter = smoothstep(1720, 2020, s);

      const mx = reduceMotion.current ? 0 : state.mouseX;
      const my = reduceMotion.current ? 0 : state.mouseY;

      section.style.setProperty("--mx", `${(mx * 18).toFixed(2)}px`);
      section.style.setProperty(
        "--photo-scale",
        (1 + progress * 0.16).toFixed(4)
      );
      section.style.setProperty(
        "--photo-y",
        `${(my * -14 - progress * 30).toFixed(2)}px`
      );

      section.style.setProperty(
        "--shade-top",
        (0.56 + moodEnter * 0.2).toFixed(3)
      );
      section.style.setProperty(
        "--shade-mid",
        (0.34 + moodEnter * 0.36).toFixed(3)
      );
      section.style.setProperty(
        "--shade-bottom",
        (0.3 + moodEnter * 0.46).toFixed(3)
      );

      section.style.setProperty("--title-y", `${(introExit * -120).toFixed(2)}px`);
      section.style.setProperty(
        "--title-scale",
        (1 - introExit * 0.05).toFixed(4)
      );
      section.style.setProperty("--title-opacity", `${1 - introExit}`);

      section.style.setProperty("--intro-y", `${(introExit * 60).toFixed(2)}px`);
      section.style.setProperty("--intro-opacity", `${1 - introExit}`);

      section.style.setProperty("--rail-enter-x", `${(1 - railEnter) * 60}vw`);
      section.style.setProperty(
        "--rail-visibility",
        railEnter > 0.01 ? "visible" : "hidden"
      );
      section.style.setProperty("--controls-opacity", `${controlsEnter}`);
      controls.classList.toggle("is-ready", controlsEnter > 0.98);

      const settled =
        Math.abs(state.smoothScroll - state.targetScroll) < 0.1 &&
        Math.abs(state.mouseX - state.targetMouseX) < 0.001 &&
        Math.abs(state.mouseY - state.targetMouseY) < 0.001;
      if (!settled) requestTick();
    };

    const requestTick = () => {
      if (state.rafPending) return;
      state.rafPending = true;
      requestAnimationFrame(update);
    };

    const onScroll = () => requestTick();
    const onResize = () => {
      updateRail();
      requestTick();
    };
    const onPointerMove = (e: PointerEvent) => {
      state.targetMouseX = e.clientX / window.innerWidth - 0.5;
      state.targetMouseY = e.clientY / window.innerHeight - 0.5;
      requestTick();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    track.addEventListener("transitionend", normalizeRail);

    updateRail();
    requestTick();

    (section as HTMLElement & { __kcMoveRail?: (d: number) => void }).__kcMoveRail =
      moveRail;
    (
      section as HTMLElement & { __kcSelectRail?: (i: number) => void }
    ).__kcSelectRail = selectRail;

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("transitionend", normalizeRail);
    };
  }, []);

  const rail = [...categories, ...categories, ...categories];

  return (
    <section
      ref={sectionRef}
      className="cinema-hero"
      style={{ height: `calc(100svh + ${SCROLL_RUNWAY}px)` }}
      aria-label="Kora Concept — presentación"
    >
      <div className="cinema-stage">
        <img
          src="/images/home-hero.jpg"
          alt=""
          className="cinema-photo"
          loading="eager"
        />
        <div className="cinema-shade" />

        <div className="container-site relative h-full">
          <span className="cinema-eyebrow label !text-paper/70">
            Agentes comerciales · Distribución de mobiliario · Europa
          </span>
          <h1 className="cinema-title font-display text-[13vw] font-semibold leading-[0.94] tracking-[-0.02em] md:text-[7.4vw] lg:text-[100px]">
            Resolvemos el
            <br />
            mobiliario de
            <br />
            su proyecto.
          </h1>

          <div className="cinema-intro">
            <p className="text-base leading-relaxed text-paper/85">
              Compramos y vendemos mobiliario de hostelería y contract a
              nivel europeo. Del sobre de mesa a la base del parasol.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <ButtonLink to="/contacto" variant="light">
                Solicitar presupuesto
              </ButtonLink>
              <ArrowLink to="/productos" className="text-paper/85">
                Ver el catálogo
              </ArrowLink>
            </div>
          </div>

          <div className="cinema-rail-wrap">
            <div ref={trackRef} className="cinema-rail-track">
              {rail.map((c, i) => (
                <Link
                  key={`${c.id}-${i}`}
                  to={`/productos/${c.id}`}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onMouseEnter={() => {
                    const fn = (
                      sectionRef.current as
                        | (HTMLElement & { __kcSelectRail?: (i: number) => void })
                        | null
                    )?.__kcSelectRail;
                    fn?.(i);
                  }}
                  className="cinema-card group"
                >
                  <span className="label !text-paper/50">{c.index}</span>
                  <h3 className="mt-3 font-display text-xl font-medium leading-tight">
                    {c.name}
                  </h3>
                  <span className="link-underline mt-3 inline-block text-xs font-medium text-paper/70">
                    Ver familia
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div ref={controlsRef} className="cinema-rail-controls">
          <button
            type="button"
            aria-label="Familia anterior"
            className="cinema-nav-btn"
            onClick={() =>
              (
                sectionRef.current as
                  | (HTMLElement & { __kcMoveRail?: (d: number) => void })
                  | null
              )?.__kcMoveRail?.(-1)
            }
          >
            <ArrowIcon dir="left" />
          </button>
          <button
            type="button"
            aria-label="Familia siguiente"
            className="cinema-nav-btn"
            onClick={() =>
              (
                sectionRef.current as
                  | (HTMLElement & { __kcMoveRail?: (d: number) => void })
                  | null
              )?.__kcMoveRail?.(1)
            }
          >
            <ArrowIcon dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
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
