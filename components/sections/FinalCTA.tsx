"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { RevealText } from "@/components/ui/RevealText";
import { GridLines } from "@/components/ui/GridLines";
import { motionTokens } from "@/lib/motion-tokens";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border py-40 md:py-56">
      <GridLines columns={10} className="opacity-40" />

      <div className="container-page relative flex flex-col items-start">
        <RevealText as="h2" className="max-w-3xl font-display text-display-1 font-medium text-fg">
          Have a website that deserves to exist?
        </RevealText>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: motionTokens.duration.slow }}
          className="mt-4 font-display text-h1 font-medium text-accent"
        >
          Let&rsquo;s build it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: motionTokens.distance.md }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
          className="mt-14 flex flex-wrap items-center gap-6"
        >
          <Link
            href="/contact"
            className="rounded-full bg-accent px-8 py-4 font-mono text-label uppercase text-accent-fg transition-transform hover:scale-[1.03]"
            data-cursor="open"
            data-cursor-label="OPEN"
          >
            Start a project →
          </Link>
          <Link
            href="/work"
            className="font-mono text-label uppercase text-fg underline decoration-border-strong underline-offset-8 transition-colors hover:decoration-accent"
            data-cursor="interactive"
          >
            View selected work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
