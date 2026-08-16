import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, projects, type Project } from "@/lib/projects";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { RevealText } from "@/components/ui/RevealText";
import { RevealSection } from "@/components/ui/RevealSection";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const allProjects = await getProjects();
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

const fields: { key: keyof Project & string; label: string }[] = [
  { key: "challenge", label: "Challenge" },
  { key: "approach", label: "Approach" },
  { key: "design", label: "Design" },
  { key: "development", label: "Development" },
  { key: "performance", label: "Performance" },
];

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allProjects = await getProjects();
  const index = allProjects.findIndex((p) => p.slug === slug);
  const project = allProjects[index];
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: { "@type": "Organization", name: "SITEWYRE" },
    about: project.industry,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="container-page pt-32 md:pt-40">
        <p className="font-mono text-label uppercase tracking-widest2 text-fg-muted">
          {project.category}
          {project.location ? ` · ${project.location}` : ""}
        </p>
        <RevealText as="h1" className="mt-6 max-w-3xl font-display text-display-2 font-medium text-fg">
          {project.title}
        </RevealText>
        <RevealSection delay={0.15} className="mt-6 max-w-xl">
          <p className="text-body-lg text-fg-muted">{project.description}</p>
        </RevealSection>

        <RevealSection delay={0.25} className="mt-14">
          <ProjectVisual project={project} index={index} className="aspect-[16/9] w-full" />
        </RevealSection>
      </section>

      <section className="container-page grid gap-16 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-4">
          <h2 className="font-mono text-micro uppercase tracking-widest2 text-fg-subtle">Overview</h2>
          <dl className="mt-6 space-y-4">
            <div>
              <dt className="text-fg-subtle">Client</dt>
              <dd className="text-fg">{project.client}</dd>
            </div>
            <div>
              <dt className="text-fg-subtle">Industry</dt>
              <dd className="text-fg">{project.industry}</dd>
            </div>
            <div>
              <dt className="text-fg-subtle">Services</dt>
              <dd className="text-fg">{project.services.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-fg-subtle">Technology</dt>
              <dd className="text-fg">{project.technologies.join(", ")}</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-16 md:col-span-7 md:col-start-6">
          {fields.map((field) => (
            <RevealSection key={field.key}>
              <h2 className="font-display text-h2 font-medium text-fg">{field.label}</h2>
              <p className="mt-4 text-fg-muted">{project[field.key] as string}</p>
            </RevealSection>
          ))}
        </div>
      </section>

      <section className="container-page border-t border-border py-24 text-center md:py-32">
        <RevealText as="h2" className="mx-auto max-w-2xl font-display text-h1 font-medium text-fg">
          Have a project like this in mind?
        </RevealText>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/contact"
            className="rounded-full bg-accent px-7 py-3.5 font-mono text-label uppercase text-accent-fg"
            data-cursor="open"
            data-cursor-label="OPEN"
          >
            Start a project →
          </Link>
          <Link href="/work" className="font-mono text-label uppercase text-fg-muted hover:text-fg" data-cursor="interactive">
            View all work
          </Link>
        </div>
      </section>
    </article>
  );
}
