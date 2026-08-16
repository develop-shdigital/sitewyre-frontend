import { processStages } from "@/lib/site";
import { RevealText } from "@/components/ui/RevealText";
import { StaggerChildren, StaggerItem } from "@/components/ui/RevealSection";

export function Process() {
  return (
    <section className="container-page border-t border-border py-32 md:py-40">
      <RevealText as="h2" className="font-display text-h1 font-medium text-fg">
        How it comes together
      </RevealText>

      <StaggerChildren className="mt-16 grid gap-12 md:grid-cols-4 md:gap-6" stagger={0.1}>
        {processStages.map((stage, i) => (
          <StaggerItem key={stage.index} className="relative border-t border-border-strong pt-6">
            <span
              className="absolute -top-px left-0 h-px bg-accent"
              style={{ width: `${(i + 1) * 25}%` }}
              aria-hidden
            />
            <span className="font-mono text-label text-accent-ink">{stage.index}</span>
            <h3 className="mt-4 font-display text-h2 font-medium text-fg">{stage.title}</h3>
            <p className="mt-3 text-fg-muted">{stage.description}</p>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
