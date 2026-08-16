import type { Metadata } from "next";
import Link from "next/link";
import { technologies } from "@/lib/site";
import { RevealText } from "@/components/ui/RevealText";
import { RevealSection } from "@/components/ui/RevealSection";
import { StaggerChildren, StaggerItem } from "@/components/ui/RevealSection";

export const metadata: Metadata = {
  title: "About",
  description: "SITEWYRE is an independent senior web developer and creative technologist with 6+ years of international client experience.",
};

export default function AboutPage() {
  return (
    <div className="py-32 md:py-40">
      <div className="container-page">
        <RevealText as="h1" className="max-w-3xl font-display text-display-2 font-medium text-fg">
          Let&rsquo;s build something worth remembering.
        </RevealText>

        <RevealSection delay={0.15} className="mt-10 max-w-2xl">
          <p className="text-body-lg text-fg-muted">
            SITEWYRE is an independent senior web developer and creative technologist. Six years of building for
            businesses internationally, across WordPress, Elementor, and the modern JavaScript ecosystem — with
            performance treated as a first-class requirement, not an afterthought.
          </p>
        </RevealSection>
      </div>

      <div className="container-page mt-24 grid gap-16 border-t border-border pt-16 md:grid-cols-2 md:pt-24">
        <RevealSection>
          <h2 className="font-mono text-micro uppercase tracking-widest2 text-fg-subtle">Philosophy</h2>
          <p className="mt-4 text-fg-muted">
            A website should earn the attention it gets. That means clear structure before visual polish, and
            performance work that happens by default rather than as an afterthought — the same discipline behind
            every SITEWYRE project, applied here first.
          </p>
        </RevealSection>
        <RevealSection delay={0.1}>
          <h2 className="font-mono text-micro uppercase tracking-widest2 text-fg-subtle">Experience</h2>
          <p className="mt-4 text-fg-muted">
            6+ years, 200+ websites, international client experience — spanning WordPress-based business sites,
            WooCommerce stores, and custom Next.js and MERN applications.
          </p>
        </RevealSection>
      </div>

      <div className="container-page mt-24 border-t border-border pt-16 md:pt-24">
        <h2 className="font-mono text-micro uppercase tracking-widest2 text-fg-subtle">Technology</h2>
        <StaggerChildren className="mt-6 flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <StaggerItem key={tech.name}>
              <span className="inline-block rounded-full border border-border-strong px-4 py-2 font-mono text-label uppercase text-fg-muted">
                {tech.name}
              </span>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>

      <div className="container-page mt-24 border-t border-border pt-16 text-center md:pt-24">
        <Link
          href="/contact"
          className="inline-block rounded-full bg-accent px-8 py-4 font-mono text-label uppercase text-accent-fg"
          data-cursor="open"
          data-cursor-label="OPEN"
        >
          Start a project →
        </Link>
      </div>
    </div>
  );
}
