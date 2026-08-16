"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";
import { useSafeReducedMotion } from "@/hooks/use-reduced-motion";

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
  const reduce = useSafeReducedMotion();
  // Always 0 on server and on the client's first paint — reduce is false
  // until mount, so this never diverges from the server-rendered markup.
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(to);
      return;
    }
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
