// Thin client for the sitewyre-backend content API. BACKEND_URL is a
// server-only env var (read in Server Components / Route Handlers, never
// exposed to the browser), so there's no client-side CORS concern here.
// Every call degrades to `null` on any failure or when BACKEND_URL isn't
// configured, so callers can fall back to the static lib/*.ts data — the
// site must keep working with zero backend configured, which is the
// current production state.
const BACKEND_URL = process.env.BACKEND_URL;

async function fetchFromBackend<T>(path: string, revalidateSeconds = 60): Promise<T | null> {
  if (!BACKEND_URL) return null;

  try {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) {
      console.warn(`[backend] ${path} responded ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[backend] request to ${path} failed:`, err);
    return null;
  }
}

export interface BackendProject {
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
  filters: string[];
  featured: boolean;
  url?: string;
}

export interface BackendService {
  slug: string;
  title: string;
  description: string;
  useCases: string[];
  technologies: string[];
}

export interface BackendTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function getBackendProjects() {
  return fetchFromBackend<BackendProject[]>("/api/projects");
}

export function getBackendProjectBySlug(slug: string) {
  return fetchFromBackend<BackendProject>(`/api/projects/${encodeURIComponent(slug)}`);
}

export function getBackendServices() {
  return fetchFromBackend<BackendService[]>("/api/services");
}

export function getBackendTestimonials() {
  return fetchFromBackend<BackendTestimonial[]>("/api/testimonials");
}
