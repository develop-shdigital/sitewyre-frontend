import Link from "next/link";
import { RevealText } from "@/components/ui/RevealText";
import { RevealSection } from "@/components/ui/RevealSection";

export function AboutTeaser() {
  return (
    <section className="container-page border-t border-border py-32 md:py-40">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <RevealText as="h2" className="font-display text-h1 font-medium text-fg">
            Who's behind SITEWYRE
          </RevealText>
        </div>
        <RevealSection delay={0.1} className="md:col-span-6 md:col-start-7">
          <p className="text-body-lg text-fg-muted">
            An independent senior web developer and creative technologist with 6+ years building for clients
            internationally — from WordPress and Elementor to Next.js, React, and the modern JavaScript ecosystem,
            with performance treated as a first-class requirement rather than an afterthought.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 font-mono text-label uppercase text-fg transition-colors hover:text-accent-ink"
            data-cursor="interactive"
          >
            More about SITEWYRE →
          </Link>
        </RevealSection>
      </div>
    </section>
  );
}
