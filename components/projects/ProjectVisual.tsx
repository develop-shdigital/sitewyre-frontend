import type { Project } from "@/lib/projects";

interface ProjectVisualProps {
  project: Project;
  index: number;
  className?: string;
}

/**
 * No client screenshots exist yet, so each project gets an art-directed
 * structural graphic instead of a stock photo or placeholder image —
 * a deterministic wireframe pattern seeded from the project's index, in
 * keeping with the wire -> structure -> interface concept rather than
 * generic portfolio-template imagery.
 */
export function ProjectVisual({ project, index, className }: ProjectVisualProps) {
  const seed = (index * 47) % 12;
  const lines = Array.from({ length: 6 });

  return (
    <div className={`relative overflow-hidden bg-bg-elevated ${className ?? ""}`}>
      <span
        aria-hidden
        className="absolute -bottom-[0.15em] -right-4 select-none font-display text-[13rem] font-medium leading-none text-fg/[0.04] md:text-[18rem]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <svg className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
        {lines.map((_, i) => {
          const offset = ((seed + i * 7) % 100) / 100;
          const isAccent = i === (seed % lines.length);
          return (
            <line
              key={i}
              x1={`${offset * 100}%`}
              y1="0%"
              x2={`${((offset + 0.35) % 1) * 100}%`}
              y2="100%"
              stroke={isAccent ? "var(--color-accent)" : "var(--grid-line-strong)"}
              strokeWidth={isAccent ? 1.5 : 1}
            />
          );
        })}
      </svg>

      <div className="absolute left-6 top-6 font-mono text-micro uppercase tracking-widest2 text-fg-subtle md:left-10 md:top-10">
        {project.category}
      </div>
    </div>
  );
}
