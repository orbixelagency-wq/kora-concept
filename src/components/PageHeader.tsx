import type { ReactNode } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Consistent inner-page masthead in the catalogue system. */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="container-site pt-[128px] md:pt-[168px]">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="label block"
      >
        {eyebrow}
      </motion.span>
      <div className="mt-6 grid gap-8 md:grid-cols-12 md:gap-6">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="font-display text-[12vw] font-semibold leading-[0.95] tracking-[-0.02em] md:col-span-8 md:text-[6.5vw] lg:text-[84px]"
        >
          {title}
        </motion.h1>
        {(intro || aside) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="flex flex-col justify-end md:col-span-4"
          >
            {intro && (
              <p className="text-base leading-relaxed text-ink-soft">{intro}</p>
            )}
            {aside}
          </motion.div>
        )}
      </div>
      <div className="mt-12 rule md:mt-16" />
    </header>
  );
}
