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
 * TEMPLATE CUSTOMIZATION POINT: the form posts JSON to
 * `NEXT_PUBLIC_FORM_ENDPOINT` (see `.env.local.example`) — point this at a
 * Formspree endpoint, a Resend-backed API route, or your own backend.
 */
export function ContactSection() {
  return (
    <Section id="contact" spacing="lg" className="bg-surface">
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
              className="text-sm font-semibold uppercase tracking-wider text-secondary"
            >
              Get In Touch
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
            >
              Talk to IT Helpers today
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-md text-muted">
              Tell us what you&rsquo;re working with and we&rsquo;ll get back to you with next
              steps — usually within one business hour.
            </motion.p>

            <motion.dl variants={staggerContainer(0.08)} className="mt-8 space-y-4 text-sm">
              <motion.div variants={fadeUp} className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden />
                <div>
                  <dt className="font-medium text-primary">Address</dt>
                  <dd className="text-muted">{COMPANY.address}</dd>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden />
                <div>
                  <dt className="font-medium text-primary">Phone</dt>
                  <dd>
                    <a href={COMPANY.phoneHref} className="link-animated text-muted hover:text-secondary">
                      {COMPANY.phone}
                    </a>
                  </dd>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden />
                <div>
                  <dt className="font-medium text-primary">Email</dt>
                  <dd>
                    <a href={`mailto:${COMPANY.email}`} className="link-animated text-muted hover:text-secondary">
                      {COMPANY.email}
                    </a>
                  </dd>
                </div>
              </motion.div>
            </motion.dl>
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
