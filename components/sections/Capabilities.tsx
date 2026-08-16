import { capabilities } from "@/lib/site";
import { RevealText } from "@/components/ui/RevealText";
import { StaggerChildren, StaggerItem } from "@/components/ui/RevealSection";

const offsets = ["md:mt-0", "md:mt-16", "md:mt-32"];
const widths = ["md:col-span-4", "md:col-span-4", "md:col-span-4"];

export function Capabilities() {
  return (
    <section className="container-page border-t border-border py-32 md:py-40">
      <RevealText as="h2" className="font-display text-h1 font-medium text-fg">
        What I do
      </RevealText>

      <StaggerChildren className="mt-16 grid gap-16 md:grid-cols-12 md:gap-8">
        {capabilities.map((group, i) => (
          <StaggerItem key={group.title} className={`${widths[i]} ${offsets[i]}`}>
            <span className="font-mono text-micro uppercase tracking-widest2 text-accent-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-h1 font-medium text-fg">{group.title}</h3>
            <ul className="mt-8 space-y-3 border-t border-border pt-6">
              {group.items.map((item) => (
                <li key={item} className="text-fg-muted">
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
