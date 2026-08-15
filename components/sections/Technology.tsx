"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { technologies } from "@/lib/site";
import { RevealText } from "@/components/ui/RevealText";
import { motionTokens, springs } from "@/lib/motion-tokens";

const RADIUS = 42;

export function Technology() {
  const [active, setActive] = useState<number | null>(null);
  const count = technologies.length;

  return (
    <section className="container-page border-t border-border py-32 md:py-40">
      <RevealText as="h2" className="font-display text-h1 font-medium text-fg">
        Technology
      </RevealText>

      <div className="relative mx-auto mt-20 aspect-square w-full max-w-2xl">
        <svg className="absolute inset-0 h-full w-full" aria-hidden viewBox="0 0 100 100">
          {technologies.map((_, i) => {
            const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * RADIUS;
            const y = 50 + Math.sin(angle) * RADIUS;
            const isActive = active === i;
            return (
              <motion.line
                key={i}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke={isActive ? "var(--color-accent)" : "var(--grid-line-strong)"}
                strokeWidth={isActive ? 0.6 : 0.3}
                animate={{ opacity: active === null || isActive ? 1 : 0.35 }}
                transition={{ duration: motionTokens.duration.fast }}
              />
            );
          })}
        </svg>

        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-bg font-display text-label font-medium text-fg md:h-28 md:w-28">
          SITEWYRE
        </div>

        {technologies.map((tech, i) => {
          const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * RADIUS;
          const y = 50 + Math.sin(angle) * RADIUS;
          return (
            <button
              key={tech.name}
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border-strong bg-bg px-3 py-1.5 font-mono text-micro uppercase tracking-widest2 text-fg-muted transition-colors hover:border-accent hover:text-fg"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {tech.name}
            </button>
          );
        })}

        <AnimatePresence>
          {active !== null && technologies[active] && (
            <motion.p
              key={technologies[active].name}
              initial={{ opacity: 0, y: motionTokens.distance.sm }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: motionTokens.distance.sm }}
              transition={springs.gentle}
              className="absolute -bottom-4 left-1/2 w-full max-w-xs -translate-x-1/2 translate-y-full text-center text-fg-muted"
            >
              {technologies[active].description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
