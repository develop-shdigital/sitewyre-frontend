"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";

interface AnimatedCounterProps {
  to: number;
  suffix?: string;
  className?: string;
}

/** Counts up from 0 to `to` once the element enters the viewport. */
export function AnimatedCounter({ to, suffix = "", className }: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapperRef, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: motionTokens.duration.crawl,
      ease: motionTokens.easing.smooth,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={wrapperRef} className={className}>
      <span ref={nodeRef}>{display}</span>
      {suffix}
    </span>
  );
}
