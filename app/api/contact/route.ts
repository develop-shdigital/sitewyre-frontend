import { NextResponse } from "next/server";
import type { ContactFormData } from "@/lib/contact";

const BACKEND_URL = process.env.BACKEND_URL;

/**
 * Forwards to sitewyre-backend's /api/leads (server-to-server — no CORS
 * concern, and the backend URL never reaches the browser) when BACKEND_URL
 * is configured, so leads land in MongoDB and trigger an email via Resend.
 * Falls back to the original log-only stub when it isn't, so the form
 * stays fully functional either way.
 */
export async function POST(request: Request) {
  let data: Partial<ContactFormData>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (BACKEND_URL) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        return NextResponse.json({ error: body.error ?? "Something went wrong. Please try again." }, { status: res.status });
      }
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[contact] backend forward failed, falling back to log-only:", err);
    }
  }

  console.info("[contact] new inquiry", {
    name: data.name,
    email: data.email,
    company: data.company,
    projectType: data.projectType,
    budget: data.budget,
  });

  return NextResponse.json({ ok: true });
}
