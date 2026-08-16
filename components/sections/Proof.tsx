import { site } from "@/lib/site";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { StaggerChildren, StaggerItem } from "@/components/ui/RevealSection";

export function Proof() {
  return (
    <section className="section-invert border-t border-border bg-bg-elevated">
      <StaggerChildren className="container-page grid gap-10 py-24 md:grid-cols-4 md:py-32">
        {site.stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <p className="font-display text-display-2 font-medium text-fg">
              {stat.display ?? <AnimatedCounter to={stat.value} suffix={stat.suffix ?? ""} />}
            </p>
            <p className="mt-3 font-mono text-label uppercase tracking-widest2 text-fg-muted">
              {stat.sublabel ?? stat.label}
            </p>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
