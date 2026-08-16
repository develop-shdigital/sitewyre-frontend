"use client";

import { motion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { motionTokens } from "@/lib/motion-tokens";
import { useSafeReducedMotion } from "@/hooks/use-reduced-motion";

interface RevealImageProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

/**
 * Masked image reveal: the frame clips a slightly oversized image (scale
 * 1.15) that settles to scale 1 as the section enters view, so the crop
 * itself feels like it's assembling rather than just fading in.
 */
export function RevealImage({ src, alt, className, sizes, priority, fill = true, width, height }: RevealImageProps) {
  const reduce = useSafeReducedMotion();

  return (
    <div className={className} style={{ overflow: "hidden", position: "relative" }}>
      <motion.div
        initial={{ scale: reduce ? 1 : 1.15, opacity: reduce ? 1 : 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
        style={{ width: "100%", height: "100%" }}
      >
        {fill ? (
          <Image src={src} alt={alt} fill sizes={sizes ?? "100vw"} priority={priority} style={{ objectFit: "cover" }} />
        ) : (
          <Image src={src} alt={alt} width={width} height={height} priority={priority} />
        )}
      </motion.div>
    </div>
  );
}
