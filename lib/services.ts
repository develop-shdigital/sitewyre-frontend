export interface Service {
  slug: string;
  title: string;
  description: string;
  useCases: string[];
  technologies: string[];
}

export const services: Service[] = [
  {
    slug: "web-design",
    title: "Web Design",
    description:
      "Visual direction and interface design grounded in your business goals — not decoration for its own sake.",
    useCases: ["New brand launch", "Site redesign", "Design system for a growing product"],
    technologies: ["Figma", "Design tokens", "Tailwind CSS"],
  },
  {
    slug: "wordpress-development",
    title: "WordPress Development",
    description: "Premium WordPress builds using Elementor and custom development where the theme layer isn't enough.",
    useCases: ["Marketing sites", "Content platforms", "Client-editable business sites"],
    technologies: ["WordPress", "Elementor", "PHP"],
  },
  {
    slug: "nextjs-react",
    title: "Next.js / React",
    description: "Server-rendered, type-safe front ends for products and marketing sites that need to be fast and precise.",
    useCases: ["Marketing sites with complex interaction", "Web applications", "Performance-critical rebuilds"],
    technologies: ["Next.js", "React", "TypeScript"],
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    description: "WooCommerce builds focused on checkout reliability and catalog structure that converts.",
    useCases: ["New online stores", "Checkout optimization", "Catalog and inventory structure"],
    technologies: ["WooCommerce", "WordPress"],
  },
  {
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    description: "Full-stack applications built on the MERN stack for workflows that off-the-shelf tools can't handle.",
    useCases: ["Internal tools", "Customer-facing portals", "Data-driven applications"],
    technologies: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    slug: "performance-optimization",
    title: "Performance Optimization",
    description: "Core Web Vitals, caching, and image optimization work for sites that need to load fast and rank well.",
    useCases: ["Slow legacy sites", "Pre-launch performance audits", "Ongoing technical SEO"],
    technologies: ["Core Web Vitals", "Caching", "Image optimization"],
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    description: "Structured redesigns that keep what works, fix what doesn't, and modernize the technical foundation.",
    useCases: ["Outdated visual identity", "Poor mobile experience", "Platform migration"],
    technologies: ["WordPress", "Next.js", "UX audit"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
