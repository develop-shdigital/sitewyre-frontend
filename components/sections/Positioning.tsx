import { RevealText } from "@/components/ui/RevealText";
import { RevealSection } from "@/components/ui/RevealSection";

export function Positioning() {
  return (
    <section className="container-page py-32 md:py-48">
      <RevealText
        as="h2"
        className="max-w-4xl font-display text-display-2 font-medium text-fg"
      >
        Design. Development. Performance.
      </RevealText>

      <RevealSection delay={0.15} className="mt-10 max-w-2xl">
        <p className="text-body-lg text-fg-muted">
          I build digital experiences from the first idea to the final interaction. Every project moves through the
          same discipline: a clear structure, an interface worth using, and a build fast enough to earn the attention
          it gets.
        </p>
      </RevealSection>
    </section>
  );
}
