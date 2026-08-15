"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionTokens, springs } from "@/lib/motion-tokens";

interface RevealTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Split unit — words read better than characters for most headlines. */
  by?: "words" | "lines";
  delay?: number;
  once?: boolean;
}

/**
 * Clip-mask + vertical-rise headline reveal: each word starts below its own
 * clipping boundary and rises into position as the section enters view.
 * This is the "hidden -> emerging -> assembling" motion described in the
 * SITEWYRE scroll-reveal philosophy, not a plain opacity fade.
 */
export function RevealText({
  children,
  as: Tag = "p",
  className,
  by = "words",
  delay = 0,
  once = true,
}: RevealTextProps) {
  const reduce = useReducedMotion();
  const units = by === "words" ? children.split(" ") : children.split("\n");

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.045, delayChildren: delay },
    },
  };

  const unitVariants = {
    hidden: { y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: reduce ? { duration: motionTokens.duration.fast } : springs.gentle,
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-80px" }}
      >
        {units.map((unit, i) => (
          <span key={i} className="inline-block overflow-hidden align-top pb-[0.1em]">
            <motion.span className="inline-block" variants={unitVariants}>
              {unit}
              {by === "words" && i < units.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
