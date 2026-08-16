"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { motionConfig } from "@/lib/motion-config";

/**
 * Global inertial-scroll driver — the single biggest lever for a site
 * "feeling alive" versus feeling like a default document. Renders nothing;
 * it just smooths the real scroll position over time, so every existing
 * `useScroll()`-driven animation (Hero, SelectedWork, ScrollProgress) keeps
 * tracking real scrollY without any changes on their end.
 *
 * Skipped entirely under prefers-reduced-motion or on low-end hardware —
 * native scroll is the correct, more accessible default there.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (motionConfig.prefersReduced() || motionConfig.isLowEnd()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      autoRaf: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
