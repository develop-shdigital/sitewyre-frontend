"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { motionTokens, springs } from "@/lib/motion-tokens";

const FILTERS = ["All", "Web Design", "WordPress", "E-commerce", "Development", "Performance"] as const;

interface WorkIndexProps {
  projects: Project[];
}

export function WorkIndex({ projects }: WorkIndexProps) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.filters.includes(filter))),
    [filter],
  );

  return (
    <div>
      <LayoutGroup>
        <div className="flex flex-wrap gap-3" role="group" aria-label="Filter work by category">
          {FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={isActive}
                className="relative rounded-full px-4 py-2 font-mono text-label uppercase text-fg-muted transition-colors"
                style={{ color: isActive ? "var(--color-accent-fg)" : undefined }}
              >
                {isActive && (
                  <motion.span
                    layoutId="work-filter-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={springs.snappy}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <motion.div layout className="mt-14 grid gap-10 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: motionTokens.distance.md }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: motionTokens.distance.sm }}
              transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
            >
              <Link href={`/work/${project.slug}`} data-cursor="project" data-cursor-label="VIEW PROJECT">
                <ProjectVisual project={project} index={i} className="aspect-[4/3] w-full" />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-h2 font-medium text-fg">{project.title}</h2>
                    <p className="mt-1 text-fg-muted">
                      {project.industry}
                      {project.location ? ` · ${project.location}` : ""}
                    </p>
                  </div>
                  <span className="whitespace-nowrap font-mono text-label uppercase text-fg-subtle">
                    {project.category}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && <p className="mt-14 text-fg-muted">No projects match this filter yet.</p>}
    </div>
  );
}
