import { NextResponse } from "next/server";
import type { ContactFormData } from "@/lib/contact";

/**
 * No email/CRM provider is configured yet — this validates the payload and
 * logs it server-side so the form is fully functional end to end. Wire in
 * a real provider (Resend, SendGrid, a CRM webhook, etc.) here once
 * credentials exist; lib/contact.ts and the form component don't need to
 * change.
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

  console.info("[contact] new inquiry", {
    name: data.name,
    email: data.email,
    company: data.company,
    projectType: data.projectType,
    budget: data.budget,
  });

  return NextResponse.json({ ok: true });
}
