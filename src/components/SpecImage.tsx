import { useState } from "react";
import { cn } from "../lib/utils";

/**
 * "Spec plate" image. If a real photo is provided (src), it renders it.
 * Otherwise it renders an on-brand catalogue placeholder — a labelled plate
 * that looks deliberate, never broken. Drop real photos into /public/images
 * and pass the path as `src` to replace the placeholder.
 */
export default function SpecImage({
  src,
  alt,
  index,
  caption,
  ratio = "4/3",
  tone = "paper",
  className,
}: {
  src?: string;
  alt: string;
  index?: string;
  caption?: string;
  ratio?: "4/3" | "3/4" | "16/9" | "1/1" | "3/2" | "5/7";
  tone?: "paper" | "olive";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <figure
      className={cn(
        "group relative overflow-hidden",
        tone === "olive" ? "bg-olive-2" : "bg-paper-2",
        className
      )}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      ) : (
        <Placeholder index={index} caption={caption ?? alt} tone={tone} />
      )}
    </figure>
  );
}

function Placeholder({
  index,
  caption,
  tone,
}: {
  index?: string;
  caption: string;
  tone: "paper" | "olive";
}) {
  const dark = tone === "olive";
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col justify-between p-5 md:p-7",
        dark ? "text-paper/80" : "text-ink/70"
      )}
    >
      {/* grain + soft diagonal light */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background: dark
            ? "radial-gradient(120% 90% at 20% 0%, rgba(255,255,255,0.06), transparent 55%)"
            : "radial-gradient(120% 90% at 20% 0%, rgba(28,27,24,0.06), transparent 55%)",
        }}
      />
      <div className="relative flex items-center justify-between">
        <span className="label" style={{ color: "inherit", opacity: 0.7 }}>
          {index ? `Ref. ${index}` : "Kora Concept"}
        </span>
        <span
          className={cn(
            "h-8 w-8 rounded-full border",
            dark ? "border-paper/25" : "border-ink/20"
          )}
        />
      </div>
      <div
        className={cn(
          "relative font-display text-[13vw] leading-[0.8] md:text-[64px]",
          dark ? "text-paper/10" : "text-ink/[0.08]"
        )}
      >
        {index ?? "KC"}
      </div>
      <div className="relative">
        <div
          className={cn(
            "mb-3 h-px w-full",
            dark ? "bg-paper/15" : "bg-ink/10"
          )}
        />
        <p className="font-display text-lg leading-tight">{caption}</p>
        <p
          className="label mt-2"
          style={{ color: "inherit", opacity: 0.55 }}
        >
          Imagen de producto — pendiente
        </p>
      </div>
    </div>
  );
}
