export interface StatEntry {
  value: number;
  suffix?: string;
  label: string;
  display?: string;
  sublabel?: string;
}

export const site = {
  name: "SITEWYRE",
  domain: "https://sitewyre.com",
  tagline: "Digital experiences engineered to perform.",
  description:
    "SITEWYRE is an independent creative development studio building premium WordPress, Next.js, and custom web experiences engineered for performance and conversion.",
  credibility: "6+ years · 200+ websites · WordPress · Next.js · MERN",
  stats: [
    { value: 200, suffix: "+", label: "websites built", display: undefined, sublabel: undefined },
    { value: 6, suffix: "+", label: "years experience", display: undefined, sublabel: undefined },
    {
      value: 0,
      label: "WordPress + Next.js",
      display: "WordPress + Next.js",
      sublabel: "core development stack",
      suffix: undefined,
    },
    { value: 0, label: "International", display: "International", sublabel: "client experience", suffix: undefined },
  ] as StatEntry[],
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  socials: [] as { label: string; href: string }[],
  contactEmail: "hello@sitewyre.com",
} as const;

export const processStages = [
  {
    index: "01",
    title: "Discover",
    description: "Understand business, audience and goals.",
  },
  {
    index: "02",
    title: "Design",
    description: "Create visual direction and user experience.",
  },
  {
    index: "03",
    title: "Build",
    description: "Develop using the right technology.",
  },
  {
    index: "04",
    title: "Optimize",
    description: "Performance, responsiveness, accessibility and launch.",
  },
] as const;

export const technologies = [
  { name: "WordPress", description: "Premium themes, Elementor and custom development." },
  { name: "Elementor", description: "Rapid, design-precise WordPress page building." },
  { name: "WooCommerce", description: "Conversion-focused e-commerce on WordPress." },
  { name: "Next.js", description: "Server-rendered React for performance-critical builds." },
  { name: "React", description: "Component architecture for interactive interfaces." },
  { name: "TypeScript", description: "Type-safe application code end to end." },
  { name: "Node.js", description: "Custom APIs and backend services." },
  { name: "MongoDB", description: "Flexible data layer for custom applications." },
  { name: "Tailwind CSS", description: "Systematic, maintainable interface styling." },
  { name: "PHP", description: "WordPress core and custom plugin development." },
] as const;

export const capabilities = [
  {
    title: "Build",
    items: ["WordPress", "Next.js", "React", "WooCommerce", "Custom Web Applications"],
  },
  {
    title: "Transform",
    items: ["Redesign", "UX", "Conversion", "Interactive Experiences"],
  },
  {
    title: "Optimize",
    items: ["Performance", "Core Web Vitals", "Caching", "Image Optimization", "Technical Optimization"],
  },
] as const;
