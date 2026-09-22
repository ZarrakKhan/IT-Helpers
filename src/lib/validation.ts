import type { ContactFormData } from "@/types/contact";

/**
 * Shared contact-form validation — used client-side (ContactForm.tsx, for
 * instant feedback) and server-side (api/contact/route.ts, as the
 * authoritative check, since client-side validation can be bypassed).
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFormErrors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

export function validateContactForm(
  values: Pick<ContactFormData, "name" | "email" | "phone" | "message">,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const name = values.name?.trim() ?? "";
  const email = values.email?.trim() ?? "";
  const phone = values.phone?.trim() ?? "";
  const message = values.message?.trim() ?? "";

  if (!name) errors.name = "Please enter your name.";

  if (!email) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (phone && phone.replace(/\D/g, "").length < 8) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!message) {
    errors.message = "Please tell us how we can help.";
  } else if (message.length < 10) {
    errors.message = "Please add a few more details (10+ characters).";
  }

  return errors;
}
