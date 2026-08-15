import { testimonials } from "@/lib/testimonials";
import { RevealSection } from "@/components/ui/RevealSection";
import { StaggerChildren } from "@/components/ui/RevealSection";

/**
 * Fully data-driven: renders real testimonials once lib/testimonials.ts has
 * entries. Until then, shows a quiet placeholder instead of fabricated
 * quotes — see that file's comment for the schema.
 */
export function Testimonials() {
  if (testimonials.length === 0) {
    return (
      <section className="container-page border-t border-border py-24 text-center md:py-32">
        <p className="font-mono text-label uppercase tracking-widest2 text-fg-subtle">Client stories — coming soon</p>
      </section>
    );
  }

  return (
    <section className="container-page border-t border-border py-32 md:py-40">
      <StaggerChildren className="grid gap-10 md:grid-cols-2">
        {testimonials.map((t) => (
          <RevealSection key={t.author} className="border-t border-border-strong pt-6">
            <p className="text-body-lg text-fg">“{t.quote}”</p>
            <p className="mt-6 font-mono text-label uppercase tracking-widest2 text-fg-muted">
              {t.author} · {t.role}, {t.company}
            </p>
          </RevealSection>
        ))}
      </StaggerChildren>
    </section>
  );
}
