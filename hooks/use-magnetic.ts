"use client";

import { useRef } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { springs } from "@/lib/motion-tokens";

/**
 * Same "pulled toward the cursor" feel as MagneticButton, but as a hook so
 * it can wrap any element (an <a>/<Link> included) instead of only a
 * <button>. Disabled on touch via the pointerType check.
 */
export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springs.gentle);
  const sy = useSpring(y, springs.gentle);

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, style: { x: sx, y: sy }, onPointerMove, onPointerLeave };
}
