import type { Metadata } from "next";
import { RevealText } from "@/components/ui/RevealText";
import { RevealSection } from "@/components/ui/RevealSection";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with SITEWYRE — WordPress, Next.js, e-commerce, and custom web application development.",
};

export default function ContactPage() {
  return (
    <div className="container-page py-32 md:py-40">
      <RevealText as="h1" className="max-w-2xl font-display text-display-2 font-medium text-fg">
        Let&rsquo;s build something worth remembering.
      </RevealText>

      <RevealSection delay={0.15} className="mt-16 max-w-2xl">
        <ContactForm />
      </RevealSection>
    </div>
  );
}
