"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GridLines } from "@/components/ui/GridLines";
import { WireframeFallback } from "@/components/three/WireframeFallback";
import { useWebglSupport } from "@/hooks/use-webgl-support";
import { useSafeReducedMotion } from "@/hooks/use-reduced-motion";
import { motionConfig } from "@/lib/motion-config";
import { site } from "@/lib/site";
import { motionTokens } from "@/lib/motion-tokens";

const WireframeScene = dynamic(
  () => import("@/components/three/WireframeScene").then((m) => m.WireframeScene),
  { ssr: false },
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgressRef = useRef(0);
  const reduce = useSafeReducedMotion();
  const webglSupported = useWebglSupport();
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsLowEnd(motionConfig.isLowEnd());
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollProgressRef.current = v;
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  // Gate on `mounted` so the server render and the client's first hydration
  // pass are always identical (neither visual renders yet) — WebGL support,
  // low-end detection, and reduced-motion all resolve from client-only APIs
  // and would otherwise flip the tree between server and client output.
  const use3D = mounted && webglSupported === true && !reduce && !isLowEnd;
  const useFallbackVisual = mounted && (webglSupported === false || reduce || isLowEnd);

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-bg">
      <GridLines columns={8} className="opacity-60" />

      <div className="absolute inset-0">
        {use3D && <WireframeScene scrollProgress={scrollProgressRef} />}
        {useFallbackVisual && <WireframeFallback />}
      </div>

      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
        className="container-page relative flex h-full flex-col justify-center"
      >
        <p className="font-mono text-label uppercase tracking-widest2 text-fg-muted">
          {site.name} / Digital Experience Studio
        </p>

        <RevealText
          as="h1"
          by="words"
          className="mt-6 max-w-4xl font-display text-display-1 font-medium text-fg"
        >
          We build digital experiences that make businesses impossible to ignore.
        </RevealText>

        <motion.p
          initial={{ opacity: 0, y: motionTokens.distance.md }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
          className="mt-6 max-w-lg text-body-lg text-fg-muted"
        >
          Design, development and performance engineering for ambitious businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: motionTokens.distance.md }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <MagneticButton
            className="rounded-full bg-accent px-7 py-3.5 font-mono text-label uppercase text-accent-fg"
            data-cursor="open"
            data-cursor-label="OPEN"
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
          >
            View selected work
          </MagneticButton>
          <Link
            href="/contact"
            className="font-mono text-label uppercase text-fg underline decoration-border-strong underline-offset-8 transition-colors hover:decoration-accent"
            data-cursor="interactive"
          >
            Start a project
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: motionTokens.duration.slow }}
          className="mt-14 font-mono text-micro uppercase tracking-widest2 text-fg-subtle"
        >
          {site.credibility}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-micro uppercase tracking-widest2 text-fg-subtle"
        style={{ opacity: contentOpacity }}
        animate={reduce ? undefined : { y: [0, 6, 0] }}
        transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll to explore
      </motion.div>
    </section>
  );
}
