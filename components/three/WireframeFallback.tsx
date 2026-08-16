"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * CSS-only wireframe cube — the WebGL-free / reduced-motion / low-end
 * fallback for the hero visual. Built from bordered divs with a real CSS
 * 3D transform, so it degrades gracefully with zero WebGL cost.
 */
export function WireframeFallback() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [-18, -18] : [-18, -4]);
  const rotateY = useTransform(scrollYProgress, [0, 1], reduce ? [28, 28] : [28, 70]);
  const z = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -220]);

  const faceStyle = "absolute inset-0 border border-fg/25";

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center [perspective:1200px]" aria-hidden>
      <motion.div
        style={{ rotateX, rotateY, z, transformStyle: "preserve-3d" }}
        className="relative h-56 w-56 md:h-72 md:w-72"
        animate={reduce ? undefined : { rotateY: [28, 388] }}
        transition={reduce ? undefined : { duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className={faceStyle} style={{ transform: "translateZ(112px)" }} />
        <div className={faceStyle} style={{ transform: "rotateY(180deg) translateZ(112px)" }} />
        <div className={faceStyle} style={{ transform: "rotateY(90deg) translateZ(112px)", borderColor: "rgba(255,90,31,0.4)" }} />
        <div className={faceStyle} style={{ transform: "rotateY(-90deg) translateZ(112px)", borderColor: "rgba(255,90,31,0.4)" }} />
        <div className={faceStyle} style={{ transform: "rotateX(90deg) translateZ(112px)" }} />
        <div className={faceStyle} style={{ transform: "rotateX(-90deg) translateZ(112px)" }} />
      </motion.div>
    </div>
  );
}
