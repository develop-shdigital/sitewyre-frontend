import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/services";
import { RevealText } from "@/components/ui/RevealText";
import { RevealSection } from "@/components/ui/RevealSection";

export const metadata: Metadata = {
  title: "Services",
  description: "Web design, WordPress development, Next.js and React, e-commerce, custom applications, and performance optimization.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="py-32 md:py-40">
      <div className="container-page">
        <RevealText as="h1" className="max-w-3xl font-display text-display-2 font-medium text-fg">
          Services
        </RevealText>
      </div>

      <div className="mt-24 divide-y divide-border">
        {services.map((service, i) => (
          <section key={service.slug} className="container-page grid gap-8 border-border py-16 md:grid-cols-12 md:py-24">
            <div className="md:col-span-4">
              <span className="font-mono text-label text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
              <RevealText as="h2" className="mt-4 font-display text-h1 font-medium text-fg">
                {service.title}
              </RevealText>
            </div>

            <RevealSection delay={0.1} className="md:col-span-6 md:col-start-6">
              <p className="text-body-lg text-fg-muted">{service.description}</p>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="font-mono text-micro uppercase tracking-widest2 text-fg-subtle">Use cases</h3>
                  <ul className="mt-3 space-y-2">
                    {service.useCases.map((u) => (
                      <li key={u} className="text-fg-muted">
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-micro uppercase tracking-widest2 text-fg-subtle">Technology</h3>
                  <ul className="mt-3 space-y-2">
                    {service.technologies.map((t) => (
                      <li key={t} className="text-fg-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 font-mono text-label uppercase text-fg transition-colors hover:text-accent-ink"
                data-cursor="interactive"
              >
                Start a project →
              </Link>
            </RevealSection>
          </section>
        ))}
      </div>
    </div>
  );
}
