"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

type FormStatus = "idle" | "submitting" | "success" | "error";

/**
 * Contact section with details card + lead-gen form.
 *
 * TEMPLATE CUSTOMIZATION POINT: the form posts JSON to
 * `NEXT_PUBLIC_FORM_ENDPOINT` (see `.env.local.example`) — point this at a
 * Formspree endpoint, a Resend-backed API route, or your own backend.
 */
export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    const data = Object.fromEntries(new FormData(form).entries());

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
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact" spacing="lg" className="bg-surface">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
              Get In Touch
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Talk to IT Helpers today
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Tell us what you&rsquo;re working with and we&rsquo;ll get back to you with next
              steps — usually within one business hour.
            </p>

            <dl className="mt-8 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden />
                <div>
                  <dt className="font-medium text-primary">Address</dt>
                  <dd className="text-muted">{COMPANY.address}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden />
                <div>
                  <dt className="font-medium text-primary">Phone</dt>
                  <dd>
                    <a href={COMPANY.phoneHref} className="text-muted hover:text-secondary">
                      {COMPANY.phone}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden />
                <div>
                  <dt className="font-medium text-primary">Email</dt>
                  <dd>
                    <a href={`mailto:${COMPANY.email}`} className="text-muted hover:text-secondary">
                      {COMPANY.email}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl border border-border bg-background p-6 shadow-md sm:p-8"
            noValidate
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="text-sm font-medium text-primary">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-secondary"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="phone" className="text-sm font-medium text-primary">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-secondary"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="text-sm font-medium text-primary">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-secondary"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-sm font-medium text-primary">
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1.5 w-full resize-none rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-secondary"
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending..." : "Send Message"}
            </Button>

            <div aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm">
              {status === "success" && (
                <p className="text-success">Thanks — we&rsquo;ll be in touch shortly.</p>
              )}
              {status === "error" && (
                <p className="text-danger">
                  Something went wrong. Please call us at {COMPANY.phone} instead.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </Container>
    </Section>
  );
}
