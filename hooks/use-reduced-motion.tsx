"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Returns SSR-safe initial/animate/exit props that collapse to an
 * opacity-only fade when the visitor prefers reduced motion.
 */
export function useSafeMotion(fullY: number = 16) {
  const reduce = useSafeReducedMotion();
  return {
    initial: { opacity: 0, y: reduce ? 0 : fullY },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduce ? 0 : -fullY },
  };
}

/**
 * Reduced-motion state that is always `false` on the server and on the
 * client's first (hydrating) render, then updates to the real value once
 * mounted. `useReducedMotion()` alone reads the live media query
 * synchronously on the client, which can differ from the server's default
 * and trigger a hydration mismatch for any prop computed from it. Use this
 * wherever reduced-motion affects INITIAL render output (initial variants,
 * initial useState, first-paint style/animate props) rather than only
 * gating a later transition.
 */
export function useSafeReducedMotion() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && Boolean(reduce);
}

export { useReducedMotion };
