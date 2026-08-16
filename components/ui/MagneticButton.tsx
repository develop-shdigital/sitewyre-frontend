"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "motion/react";
import { springs } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  strength?: number;
}

/** Button that subtly follows the cursor within its bounds — disabled on touch via pointer events. */
export const MagneticButton = ({ children, className, strength = 0.35, ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springs.gentle);
  const sy = useSpring(y, springs.gentle);

  function handlePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      transition={springs.snappy}
      className={cn(
        "group relative inline-flex items-center gap-3 whitespace-nowrap",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
