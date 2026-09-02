import type { BrandId } from "@/data/catalogue";
import { cn } from "@/lib/utils";

/**
 * Wordmarks for the represented brands.
 *
 * variant="mono" (default) — drawn with `currentColor` so they tint to a
 * single tone; used in the olive partner strip where every mark must read
 * as one cohesive color. Faithful text-built placeholders for all 5 brands.
 *
 * variant="full" — official full-color artwork from /public/logos, used on
 * the Marcas listing and brand detail pages. Falls back to the mono mark
 * (in ink) for brands without artwork on file (currently Almar Garden).
 */
const LOGO_FILES: Partial<Record<BrandId, string>> = {
  helcosol: "/logos/helcosol.png",
  genmar: "/logos/genmar.png",
  vela: "/logos/vela.png",
  werzalit: "/logos/werzalit.webp",
};

export default function BrandWordmark({
  id,
  className,
  variant = "mono",
}: {
  id: BrandId;
  className?: string;
  variant?: "mono" | "full";
}) {
  const logo = variant === "full" ? LOGO_FILES[id] : undefined;

  if (logo) {
    return (
      <span
        className={cn(
          "inline-flex select-none items-center justify-center",
          className
        )}
      >
        <img
          src={logo}
          alt={id}
          className="h-full w-auto max-h-12 object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex select-none items-center font-display leading-none",
        variant === "full" && "text-ink",
        className
      )}
    >
      {mark(id)}
    </span>
  );
}

function mark(id: BrandId) {
  switch (id) {
    case "helcosol":
      return (
        <span className="flex items-baseline text-[26px] font-extrabold tracking-tight">
          HELC
          <span className="relative mx-[1px] inline-block h-[0.62em] w-[0.62em] translate-y-[0.06em] rounded-full border-[3px] border-current" />
          SOL
        </span>
      );
    case "genmar":
      return (
        <span className="text-[26px] font-light tracking-[0.34em]">
          GENMAR
        </span>
      );
    case "almar-garden":
      return (
        <span className="flex items-center rounded-full border-[2px] border-current px-4 py-[6px] text-[20px] font-semibold lowercase tracking-tight">
          almar&nbsp;garden
        </span>
      );
    case "vela":
      return (
        <span className="flex flex-col items-start leading-none">
          <span className="flex items-center text-[30px] font-bold lowercase tracking-tight">
            vela
            <svg
              viewBox="0 0 40 22"
              className="ml-1 h-[16px] w-[28px]"
              fill="none"
              aria-hidden
            >
              <path
                d="M1 20C10 4 26 1 39 3C27 5 15 11 8 21"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="mt-[3px] text-[9px] font-medium tracking-[0.42em]">
            ARREDAMENTI
          </span>
        </span>
      );
    case "werzalit":
      return (
        <span className="flex items-baseline text-[28px] font-extrabold italic tracking-tight">
          werzalit
          <span className="ml-[2px] text-[11px] not-italic">®</span>
        </span>
      );
  }
}
