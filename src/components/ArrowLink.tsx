import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[1em] w-[1em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Text link with a nudging arrow. */
export function ArrowLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-2 font-medium",
        className
      )}
    >
      <span className="link-underline">{children}</span>
      <Arrow />
    </Link>
  );
}

/** Solid pill button, primary CTA across the site. */
export function ButtonLink({
  to,
  children,
  variant = "dark",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: "dark" | "light" | "olive";
  className?: string;
}) {
  const styles = {
    dark: "bg-ink text-paper hover:bg-olive active:bg-olive-2",
    light: "bg-paper text-ink hover:bg-olive hover:text-paper active:bg-olive-2 active:text-paper",
    olive: "bg-olive text-paper hover:bg-olive-2 active:bg-ink",
  }[variant];
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex select-none items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-medium",
        "shadow-sm transition-[background-color,color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.97] active:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        styles,
        className
      )}
    >
      {children}
      <Arrow />
    </Link>
  );
}
