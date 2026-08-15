"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useSafeReducedMotion } from "@/hooks/use-reduced-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Vertical travel in px at full scroll range. */
  strength?: number;
  sizes?: string;
}

/** Image that drifts vertically at a different rate than scroll — disabled under reduced motion. */
export function ParallaxImage({ src, alt, className, strength = 60, sizes }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-strength, strength]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden", position: "relative" }}>
      <motion.div style={{ y, position: "absolute", inset: "-8% 0", willChange: "transform" }}>
        <Image src={src} alt={alt} fill sizes={sizes ?? "100vw"} style={{ objectFit: "cover" }} />
      </motion.div>
    </div>
  );
}
