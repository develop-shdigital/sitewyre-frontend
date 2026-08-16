import { getBackendTestimonials } from "@/lib/api";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

// Intentionally empty — no testimonial content has been supplied, and none
// is fabricated. The Testimonials component is data-driven off this array:
// add real entries here and the section renders them automatically.
export const testimonials: Testimonial[] = [];

/** Live testimonials from the backend when configured, else the static (empty) fallback above. */
export async function getTestimonials(): Promise<Testimonial[]> {
  const backendTestimonials = await getBackendTestimonials();
  if (!backendTestimonials || backendTestimonials.length === 0) return testimonials;
  return backendTestimonials;
}
