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
  const watermarkX = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);
  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -160]);

  // Gate on `mounted` so the server render and the client's first hydration
  // pass are always identical (neither visual renders yet) — WebGL support,
  // low-end detection, and reduced-motion all resolve from client-only APIs
  // and would otherwise flip the tree between server and client output.
  const use3D = mounted && webglSupported === true && !reduce && !isLowEnd;
  const useFallbackVisual = mounted && (webglSupported === false || reduce || isLowEnd);

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-bg">
      <GridLines columns={8} className="opacity-60" />

      <motion.div
        aria-hidden
        style={{ x: watermarkX, opacity: watermarkOpacity }}
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden"
      >
        <span className="font-display text-emboss whitespace-nowrap text-[clamp(4.5rem,20vw,15rem)] font-extrabold uppercase leading-none tracking-tight">
          Structure
        </span>
      </motion.div>

      <div className="absolute inset-0">
        {use3D && <WireframeScene scrollProgress={scrollProgressRef} />}
        {useFallbackVisual && <WireframeFallback />}
      </div>

      {/* Floating field, mixed idle-loop + scroll-parallax — the scattered
          drifting props from the Noth.in reference, reworked for our light
          palette instead of copying its foil/metallic material. */}
      <motion.div
        aria-hidden
        className="absolute right-[8%] top-[18%] hidden h-14 w-14 rotate-12 rounded-lg border border-border-strong bg-bg-elevated/80 shadow-sm md:block"
        animate={reduce ? undefined : { y: [0, -14, 0], rotate: [12, 4, 12] }}
        transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[16%] right-[16%] hidden h-9 w-9 -rotate-6 rounded-md border border-accent/40 bg-accent-muted md:block"
        animate={reduce ? undefined : { y: [0, 12, 0], rotate: [-6, 8, -6] }}
        transition={reduce ? undefined : { duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.div
        aria-hidden
        style={{ y: parallaxSlow }}
        className="absolute left-[6%] top-[30%] hidden h-6 w-6 rotate-45 rounded-md border border-border-strong bg-bg-elevated/60 md:block"
      />
      <motion.div
        aria-hidden
        style={{ y: parallaxFast }}
        className="absolute right-[22%] top-[68%] hidden h-16 w-16 rounded-full border border-border-strong bg-bg-elevated/50 md:block"
      />
      <motion.div
        aria-hidden
        style={{ y: parallaxSlow }}
        className="absolute left-[24%] top-[78%] hidden h-5 w-5 rotate-12 rounded-full border border-accent-ink/30 bg-accent-muted md:block"
      />

      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
        className="container-page relative flex h-full flex-col justify-center"
      >
        <p className="font-mono text-label uppercase tracking-widest2 text-fg-muted">
          {site.name} / Digital Experience Studio
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {["Web Design", "Next.js Development", "Performance Engineering"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border-strong bg-bg-elevated/70 px-3.5 py-1.5 font-mono text-micro uppercase tracking-widest2 text-fg-muted"
            >
              {tag}
            </span>
          ))}
        </div>

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
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        style={{ opacity: contentOpacity }}
      >
        <span className="font-mono text-micro uppercase tracking-widest2 text-fg-subtle">Scroll to explore</span>
        <span className="flex h-8 w-5 items-start justify-center rounded-full border border-border-strong p-1">
          <motion.span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-accent-ink"
            animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={reduce ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
