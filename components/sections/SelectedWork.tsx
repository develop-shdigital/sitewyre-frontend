"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { motionTokens } from "@/lib/motion-tokens";
import { RevealText } from "@/components/ui/RevealText";

interface SelectedWorkProps {
  projects: Project[];
}

/**
 * Cinematic pinned case-study reel: metadata and visual stay fixed in the
 * viewport while scrolling through the section advances which project is
 * shown, instead of a scrollable card grid. Receives project data as a
 * prop — fetched (backend-or-static-fallback) by the server-component
 * parent, since this component itself needs "use client" for scroll
 * tracking and can't fetch data directly.
 */
export function SelectedWork({ projects }: SelectedWorkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(projects.length - 1, Math.floor(v * projects.length));
    setActive(next);
  });

  const project = projects[active] ?? projects[0];
  if (!project) return null;

  return (
    <section id="work" ref={containerRef} style={{ height: `${projects.length * 100}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden border-t border-border bg-bg">
        <div className="container-page flex items-center justify-between pt-10">
          <RevealText as="h2" className="font-display text-h2 font-medium text-fg">
            Selected work
          </RevealText>
          <div className="hidden font-mono text-label text-fg-subtle md:block">
            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </div>
        </div>

        <div className="container-page grid flex-1 items-center gap-10 py-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: motionTokens.distance.md }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -motionTokens.distance.md }}
                transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
              >
                <span className="font-mono text-label text-accent">{String(active + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-h1 font-medium text-fg">{project.title}</h3>
                <p className="mt-2 text-fg-muted">
                  {project.industry}
                  {project.location ? ` · ${project.location}` : ""}
                </p>
                <p className="mt-6 max-w-md text-fg-muted">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border-strong px-3 py-1 font-mono text-micro uppercase tracking-widest2 text-fg-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/work/${project.slug}`}
                  className="mt-8 inline-flex items-center gap-2 font-mono text-label uppercase text-fg transition-colors hover:text-accent"
                  data-cursor="open"
                  data-cursor-label="OPEN"
                >
                  View case study →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
                className="aspect-[4/3] w-full"
              >
                <Link href={`/work/${project.slug}`} data-cursor="project" data-cursor-label="VIEW PROJECT">
                  <ProjectVisual project={project} index={active} className="h-full w-full" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="container-page flex gap-2 pb-8">
          {projects.map((p, i) => (
            <span
              key={p.slug}
              className="h-0.5 flex-1 bg-fg/10"
              style={{ backgroundColor: i === active ? "var(--color-accent)" : undefined }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
