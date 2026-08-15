"use client";

import { motion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";

interface GridLinesProps {
  columns?: number;
  className?: string;
}

/**
 * Progressive wire/structure motif: vertical hairlines draw in sequentially
 * as a section enters view. Used sparingly at section boundaries, never as
 * a persistent background texture — see SITEWYRE brief: "keep this
 * extremely subtle."
 */
export function GridLines({ columns = 6, className }: GridLinesProps) {
  return (
    <div className={className} aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div className="flex h-full w-full">
        {Array.from({ length: columns + 1 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-full w-px bg-[var(--grid-line)]"
            style={{ marginLeft: i === 0 ? 0 : `${100 / columns}%`, transformOrigin: "top" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: motionTokens.duration.slow,
              ease: motionTokens.easing.smooth,
              delay: i * 0.04,
            }}
          />
        ))}
      </div>
    </div>
  );
}
