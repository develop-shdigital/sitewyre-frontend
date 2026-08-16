import { getBackendProjects, getBackendProjectBySlug, type BackendProject } from "@/lib/api";

export interface Project {
  title: string;
  slug: string;
  client: string;
  industry: string;
  location?: string;
  category: string;
  description: string;
  challenge: string;
  approach: string;
  design: string;
  development: string;
  performance: string;
  services: string[];
  technologies: string[];
  /** Canonical filter buckets for the /work index — a subset of "Web Design" | "WordPress" | "E-commerce" | "Development" | "Performance". */
  filters: string[];
  featured: boolean;
  /** External live URL — only set when confirmed real; omitted otherwise. */
  url?: string;
}

// Factual scope only: industry/category is derived directly from each
// client's name (e.g. "Gartenbau" = garden construction, "AG" = a Swiss/
// German/Austrian stock-company suffix). No results, metrics, or
// testimonial content are invented — see case-study pages for the same
// constraint applied to narrative copy.
export const projects: Project[] = [
  {
    title: "Egli Gartenbau AG",
    slug: "egli-gartenbau",
    client: "Egli Gartenbau AG",
    industry: "Garden architecture",
    location: "Switzerland",
    category: "WordPress",
    description:
      "A WordPress site for a Swiss garden architecture and landscaping company, built around clear service presentation and a fast, dependable front end for prospective clients researching a landscaping partner.",
    challenge:
      "Landscaping decisions are high-consideration and visual — the site needed to present past work and services clearly while staying fast on mobile, where most research happens.",
    approach:
      "Structured the information architecture around services and completed work, with a WordPress/Elementor foundation the client's team can maintain independently.",
    design: "A clean, editorial layout that lets photography of completed gardens carry the visual weight.",
    development: "Built on WordPress with Elementor, optimized for straightforward client-side content updates.",
    performance: "Image-heavy pages optimized for fast loading on mobile connections.",
    services: ["Web Design", "WordPress Development", "UX"],
    technologies: ["WordPress", "Elementor"],
    filters: ["Web Design", "WordPress"],
    featured: true,
  },
  {
    title: "Angling Edge",
    slug: "angling-edge",
    client: "Angling Edge",
    industry: "Fishing",
    category: "Content Platform",
    description:
      "A WordPress content platform built for a fishing-focused publisher, combining custom development with a WordPress backend for editorial workflows.",
    challenge:
      "Content-heavy publishing sites need to stay fast as the archive grows, without making the editorial workflow harder for non-technical writers.",
    approach:
      "Paired WordPress's editorial tooling with custom development where the default theme layer wasn't enough for the content structure required.",
    design: "A magazine-style reading experience prioritizing legibility and clear content hierarchy.",
    development: "WordPress backend with custom development for specific content and layout needs.",
    performance: "Optimized asset loading for content-heavy archive and article pages.",
    services: ["WordPress Development", "Custom Development"],
    technologies: ["WordPress"],
    filters: ["WordPress", "Development"],
    featured: true,
  },
  {
    title: "Freyhandel",
    slug: "freyhandel",
    client: "Freyhandel",
    industry: "E-commerce",
    category: "WooCommerce",
    description: "A WooCommerce store built for reliable checkout performance and straightforward catalog management.",
    challenge: "E-commerce needs to convert — every step from product page to checkout has to be fast and frictionless.",
    approach: "Built on WooCommerce with attention to checkout flow, catalog structure, and page-load performance.",
    design: "A clear, product-first layout that keeps the path to checkout short.",
    development: "WooCommerce on WordPress, configured for catalog and checkout reliability.",
    performance: "Performance and Core Web Vitals work focused on product and checkout pages.",
    services: ["E-commerce", "WooCommerce", "Performance Optimization"],
    technologies: ["WordPress", "WooCommerce"],
    filters: ["E-commerce", "WordPress", "Performance"],
    featured: true,
  },
  {
    title: "Westminster Medical Group",
    slug: "westminster-medical-group",
    client: "Westminster Medical Group",
    industry: "Healthcare",
    category: "WordPress",
    description:
      "A WordPress website for a medical practice, built to present services and make it straightforward for patients to find the right information.",
    challenge: "Healthcare visitors need to find relevant information quickly and trust the practice from the first screen.",
    approach: "Prioritized clear service navigation and fast page loads over decorative complexity.",
    design: "A calm, trustworthy visual tone appropriate to a medical practice.",
    development: "WordPress with a maintainable content structure for the practice's team.",
    performance: "Optimized for fast, reliable loading across devices.",
    services: ["Web Design", "WordPress Development"],
    technologies: ["WordPress"],
    filters: ["Web Design", "WordPress"],
    featured: false,
  },
  {
    title: "Cross-works AG",
    slug: "cross-works",
    client: "Cross-works AG",
    industry: "Professional Services",
    location: "Switzerland",
    category: "WordPress",
    description: "A WordPress site for a Swiss professional-services company, focused on clear positioning and lead generation.",
    challenge: "B2B service businesses need their site to communicate credibility and capability quickly to prospective clients.",
    approach: "Built a clear structural narrative from services to proof points to contact.",
    design: "A restrained, professional visual system.",
    development: "WordPress, built for straightforward long-term maintenance.",
    performance: "Optimized for fast, dependable loading.",
    services: ["Web Design", "WordPress Development"],
    technologies: ["WordPress"],
    filters: ["Web Design", "WordPress"],
    featured: false,
  },
  {
    title: "Lindner Media",
    slug: "lindner-media",
    client: "Lindner Media",
    industry: "Media",
    category: "WordPress",
    description: "A WordPress website built for a media company, structured around content presentation and audience growth.",
    challenge: "Media sites need a content structure that scales without slowing the site down as the archive grows.",
    approach: "Built a WordPress foundation structured for content growth and editorial flexibility.",
    design: "A content-forward layout with clear visual hierarchy.",
    development: "WordPress, configured for editorial workflow and content scale.",
    performance: "Optimized for fast content delivery as the archive grows.",
    services: ["Web Design", "WordPress Development"],
    technologies: ["WordPress"],
    filters: ["Web Design", "WordPress"],
    featured: false,
  },
  {
    title: "Holistic Vet Care",
    slug: "holistic-vet-care",
    client: "Holistic Vet Care",
    industry: "Veterinary",
    category: "WordPress",
    description:
      "A WordPress website for a veterinary practice, built to present services clearly and make it easy for pet owners to get in touch.",
    challenge: "Pet owners researching care need clear, reassuring information and an easy way to make contact.",
    approach: "Focused the structure on services, approach to care, and a direct path to contact.",
    design: "A warm, approachable visual tone suited to a care-focused practice.",
    development: "WordPress with a content structure the practice can maintain independently.",
    performance: "Optimized for fast, reliable loading on mobile.",
    services: ["Web Design", "WordPress Development"],
    technologies: ["WordPress"],
    filters: ["Web Design", "WordPress"],
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

function mapBackendProject(raw: BackendProject): Project {
  return {
    title: raw.title,
    slug: raw.slug,
    client: raw.client,
    industry: raw.industry,
    location: raw.location,
    category: raw.category,
    description: raw.description,
    challenge: raw.challenge,
    approach: raw.approach,
    design: raw.design,
    development: raw.development,
    performance: raw.performance,
    services: raw.services,
    technologies: raw.technologies,
    filters: raw.filters,
    featured: raw.featured,
    url: raw.url,
  };
}

/** Live project list from the backend when configured, else the static fallback above. */
export async function getProjects(): Promise<Project[]> {
  const backendProjects = await getBackendProjects();
  if (!backendProjects || backendProjects.length === 0) return projects;
  return backendProjects.map(mapBackendProject);
}

/** Live single project from the backend when configured, else the static fallback above. */
export async function getProjectBySlugAsync(slug: string): Promise<Project | undefined> {
  const backendProject = await getBackendProjectBySlug(slug);
  if (backendProject) return mapBackendProject(backendProject);
  return getProjectBySlug(slug);
}
