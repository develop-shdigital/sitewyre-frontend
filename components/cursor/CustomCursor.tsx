"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion } from "motion/react";
import { springs } from "@/lib/motion-tokens";

type CursorState = "default" | "interactive" | "project" | "open";

/**
 * Desktop-only custom cursor: small dot by default, expands on interactive
 * elements, and shows a text label ("VIEW PROJECT" / "OPEN") when hovering
 * an element with a matching data-cursor attribute. Fully disabled on touch
 * devices and under prefers-reduced-motion.
 */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, springs.instant);
  const sy = useSpring(y, springs.instant);

  useEffect(() => {
    if (reduce) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFinePointer);
    if (!isFinePointer) return;

    document.documentElement.classList.add("custom-cursor-active");

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        const kind = target.dataset.cursor as CursorState;
        setState(kind);
        setLabel(target.dataset.cursorLabel ?? "");
      } else {
        const interactive = (e.target as HTMLElement).closest("a, button");
        setState(interactive ? "interactive" : "default");
        setLabel("");
      }
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  const sizes: Record<CursorState, number> = { default: 8, interactive: 16, project: 88, open: 72 };
  const size = sizes[state];

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full mix-blend-difference bg-fg"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: size, height: size }}
      transition={springs.gentle}
    >
      <AnimatePresence>
        {label && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-mono text-micro uppercase tracking-widest2 text-bg whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
