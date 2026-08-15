export const projectTypes = [
  "New website",
  "Redesign",
  "WordPress",
  "Next.js / React",
  "E-commerce",
  "Performance optimization",
  "Custom web application",
  "Other",
] as const;

export const budgetRanges = ["Under $5k", "$5k–$15k", "$15k–$40k", "$40k+", "Not sure yet"] as const;

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  website?: string;
  projectType: (typeof projectTypes)[number] | "";
  budget?: (typeof budgetRanges)[number] | "";
  message: string;
}

export interface ContactSubmitResult {
  ok: boolean;
  error?: string;
}

/**
 * Thin client abstraction over the contact API route. No external provider
 * (email service, CRM) is wired up yet — swap the implementation inside
 * app/api/contact/route.ts once credentials exist; this call site doesn't
 * need to change.
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactSubmitResult> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { ok: false, error: body.error ?? "Something went wrong. Please try again." };
  }

  return { ok: true };
}
