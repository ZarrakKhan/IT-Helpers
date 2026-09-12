"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { FormInput } from "@/components/forms/FormInput";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { EASE_OUT_PREMIUM } from "@/lib/motion";

interface ContactFormProps {
  title?: string;
  description?: string;
  submitButtonText?: string;
  /** Included in the submitted payload — e.g. the service name on a service detail page. */
  serviceContext?: string;
  onSuccess?: () => void;
  className?: string;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Formats digits as they're typed into the common `0421 300 524` AU mobile grouping. */
function formatAustralianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.phone && values.phone.replace(/\D/g, "").length < 8) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!values.message.trim()) {
    errors.message = "Please tell us how we can help.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please add a few more details (10+ characters).";
  }

  return errors;
}

/**
 * Reusable lead-gen form used on the homepage and every service detail page.
 * Validates on submit, formats the AU phone field as the user types, and
 * crossfades into a success message on a 200 response — the form stays
 * visible (with an inline error) if the request fails, so the user can retry.
 */
export function ContactForm({
  title = "Talk to IT Helpers today",
  description = "Tell us what you're working with and we'll get back to you with next steps — usually within one business hour.",
  submitButtonText = "Send Message",
  serviceContext,
  onSuccess,
  className,
}: ContactFormProps) {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(field: keyof FormValues) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const raw = event.target.value;
      const next = field === "phone" ? formatAustralianPhone(raw) : raw;
      setValues((prev) => ({ ...prev, [field]: next }));
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    if (!endpoint) {
      // eslint-disable-next-line no-console
      console.warn("NEXT_PUBLIC_FORM_ENDPOINT is not set — form submission skipped.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, service: serviceContext }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE_OUT_PREMIUM }}
            className="flex flex-col items-center justify-center rounded-xl border border-border bg-background p-10 text-center shadow-md"
          >
            <CheckCircle2 className="h-12 w-12 text-success" aria-hidden />
            <h3 className="mt-4 text-xl font-semibold text-primary">Thank you!</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              We&rsquo;ll be in touch within 24 hours. In the meantime, feel free to call us at{" "}
              <a href={COMPANY.phoneHref} className="link-animated font-semibold text-secondary">
                {COMPANY.phone}
              </a>
              .
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE_OUT_PREMIUM }}
            className="rounded-xl border border-border bg-background p-6 shadow-md sm:p-8"
            noValidate
          >
            {(title || description) && (
              <div className="mb-6">
                {title && <h3 className="text-lg font-semibold text-primary">{title}</h3>}
                {description && <p className="mt-1 text-sm text-muted">{description}</p>}
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormInput
                label="Name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={values.name}
                onChange={handleChange("name")}
                error={errors.name}
              />
              <FormInput
                label="Phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="0421 300 524"
                value={values.phone}
                onChange={handleChange("phone")}
                error={errors.phone}
                helperText="Optional — Australian format"
              />
              <div className="sm:col-span-2">
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  error={errors.email}
                />
              </div>
              <div className="sm:col-span-2">
                <FormInput
                  as="textarea"
                  label="How can we help?"
                  name="message"
                  rows={4}
                  required
                  value={values.message}
                  onChange={handleChange("message")}
                  error={errors.message}
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="mt-6 w-full" loading={status === "submitting"}>
              {status === "submitting" ? "Sending..." : submitButtonText}
            </Button>

            <div aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm">
              {status === "error" && (
                <p className="text-danger">
                  Something went wrong sending your message. Please try again, or call us at{" "}
                  {COMPANY.phone}.
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
