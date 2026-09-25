"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { COMPANY } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/**
 * Contact section with details card + lead-gen form.
 *
 * The form posts JSON to `/api/contact`, which sends the submission via
 * Resend (see `.env.local.example` for the required `RESEND_API_KEY`).
 */
export function ContactSection() {
  return (
    <Section id="contact" spacing="lg" className="bg-paper-bright">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
          >
            <motion.span
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-wider text-accent-ui"
            >
              Get In Touch
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              Talk to IT Helpers today
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-md text-muted">
              Tell us what you&rsquo;re working with and we&rsquo;ll get back to you with next
              steps — usually within one business hour.
            </motion.p>

            {/*
              A `<dl>` was used here previously, but each row nested an icon
              alongside the `dt`/`dd` pair inside an extra wrapper `<div>` —
              a `<dl>` may only directly contain `dt`/`dd` groups (optionally
              each wrapped in a `<div>` containing *just* that pair), so the
              icon sibling made it a malformed definition list. A `<ul>` has
              no such restriction and reads identically to screen readers
              for this "list of contact details" use case.
            */}
            <motion.ul variants={staggerContainer(0.08)} className="mt-8 space-y-4 text-sm">
              <motion.li variants={fadeUp} className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-ui" aria-hidden />
                <div>
                  <span className="block font-medium text-ink">Address</span>
                  <span className="text-muted">{COMPANY.address}</span>
                </div>
              </motion.li>
              <motion.li variants={fadeUp} className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent-ui" aria-hidden />
                <div>
                  <span className="block font-medium text-ink">Phone</span>
                  <a href={COMPANY.phoneHref} className="link-animated text-muted hover:text-accent-ui">
                    {COMPANY.phone}
                  </a>
                </div>
              </motion.li>
              <motion.li variants={fadeUp} className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent-ui" aria-hidden />
                <div>
                  <span className="block font-medium text-ink">Email</span>
                  <a href={`mailto:${COMPANY.email}`} className="link-animated text-muted hover:text-accent-ui">
                    {COMPANY.email}
                  </a>
                </div>
              </motion.li>
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
