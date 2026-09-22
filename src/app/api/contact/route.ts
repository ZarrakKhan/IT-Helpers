import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { ContactFormData, ContactResponse } from "@/types/contact";
import { validateContactForm } from "@/lib/validation";
import { contactFormEmailHtml } from "@/lib/email-templates";

// TEMPLATE CUSTOMIZATION POINT: change the recipient inbox for a rebrand.
const CONTACT_RECIPIENT = "ithelpers01@gmail.com";

// Resend's shared testing address works without a verified sending domain.
// Once a domain is verified in Resend, set RESEND_FROM_EMAIL to send as it.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "IT Helpers <onboarding@resend.dev>";

const RATE_LIMIT_WINDOW_MS = 60_000;

/**
 * Basic in-memory spam guard: blocks a second submission from the same
 * email within 60s. Per-process only (resets on redeploy/cold start, and
 * isn't shared across serverless instances) — good enough to stop a form
 * being double-submitted or hammered by a simple script, not a substitute
 * for a real rate limiter if abuse becomes a problem.
 */
const lastSubmissionByEmail = new Map<string, number>();

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const last = lastSubmissionByEmail.get(email);
  if (last !== undefined && now - last < RATE_LIMIT_WINDOW_MS) {
    return true;
  }
  lastSubmissionByEmail.set(email, now);
  return false;
}

function jsonResponse(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  let payload: Partial<ContactFormData>;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ success: false, message: "Invalid request." }, 400);
  }

  const data: ContactFormData = {
    name: typeof payload.name === "string" ? payload.name : "",
    email: typeof payload.email === "string" ? payload.email : "",
    phone: typeof payload.phone === "string" ? payload.phone : undefined,
    message: typeof payload.message === "string" ? payload.message : "",
    service: typeof payload.service === "string" ? payload.service : undefined,
  };

  const errors = validateContactForm(data);
  if (Object.keys(errors).length > 0) {
    return jsonResponse({ success: false, message: "Please check the form for errors and try again." }, 400);
  }

  const normalizedEmail = data.email.trim().toLowerCase();
  if (isRateLimited(normalizedEmail)) {
    return jsonResponse(
      {
        success: false,
        message: "You've already sent a message recently — please wait a minute and try again.",
      },
      429,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Server-side only — never expose the missing-key detail to the client.
    console.error("[api/contact] RESEND_API_KEY is not set; cannot send email.");
    return jsonResponse({ success: false, message: "Could not send message. Please try again later." }, 500);
  }

  const resend = new Resend(apiKey);
  const name = data.name.trim();

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_RECIPIENT,
      replyTo: data.email.trim(),
      subject: `New Contact Form Submission from ${name}`,
      html: contactFormEmailHtml(data),
    });

    if (error) {
      console.error("[api/contact] Resend API error:", error);
      return jsonResponse({ success: false, message: "Could not send message. Please try again later." }, 500);
    }

    return jsonResponse({ success: true, message: "Message sent successfully." }, 200);
  } catch (err) {
    console.error("[api/contact] Unexpected error sending email:", err);
    return jsonResponse({ success: false, message: "Could not send message. Please try again later." }, 500);
  }
}
