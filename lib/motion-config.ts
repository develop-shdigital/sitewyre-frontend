import { motionTokens } from "@/lib/motion-tokens";

// Runtime gating: reduced-motion preference and low-end device detection.
// Every animated component should check shouldAnimate() before doing
// anything beyond an opacity fade.
export const motionConfig = {
  isLowEnd() {
    return typeof navigator !== "undefined" && navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
  },

  prefersReduced() {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  shouldAnimate({ essential = false }: { essential?: boolean } = {}) {
    if (this.prefersReduced()) return false;
    if (!essential && this.isLowEnd()) return false;
    return true;
  },

  duration() {
    return this.isLowEnd() || this.prefersReduced() ? motionTokens.duration.instant : motionTokens.duration.normal;
  },
};
