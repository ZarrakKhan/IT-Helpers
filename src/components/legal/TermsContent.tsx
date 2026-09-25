"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { COMPANY } from "@/lib/constants";
import { fadeUp, revealTrigger, staggerContainer } from "@/lib/motion";

/*
 * TEMPLATE CUSTOMIZATION POINT: Replace with actual legal review before
 * launch. This is placeholder content for structure only — general terms
 * describing use of the website and service delivery, not a substitute
 * for a proper services agreement/SOW, and not reviewed by a lawyer.
 */
// TEMPLATE CUSTOMIZATION POINT: bump this whenever the terms actually
// change — it should reflect the last real edit, not "today".
const LAST_UPDATED = "24 September 2026";

const sections = [
  {
    heading: "Acceptance of terms",
    body: (
      <p>
        By accessing or using {COMPANY.website} (the &ldquo;Site&rdquo;), or by engaging{" "}
        {COMPANY.name} for IT support services, you agree to be bound by these Terms of Service.
        If you don&rsquo;t agree with any part of these terms, please don&rsquo;t use the Site or
        our services.
      </p>
    ),
  },
  {
    heading: "Description of services",
    body: (
      <p>
        {COMPANY.name} provides IT support, Microsoft 365, cloud, networking, and cybersecurity
        services for businesses and individuals. The Site describes these services generally;
        specific scope, pricing, and deliverables for any engagement are agreed separately (e.g.
        via quote, proposal, or service agreement) and take precedence over the general
        descriptions on the Site.
      </p>
    ),
  },
  {
    heading: "Use of the website",
    body: (
      <>
        <p>You agree to use the Site only for lawful purposes. You must not:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Attempt to gain unauthorised access to the Site or its underlying systems.</li>
          <li>Use the Site to transmit malware, spam, or unlawful content.</li>
          <li>Scrape, copy, or republish the Site&rsquo;s content without permission.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Service delivery",
    body: (
      <p>
        We aim to respond to enquiries and deliver services promptly and professionally, but we
        don&rsquo;t guarantee specific response or resolution times unless explicitly agreed in a
        separate service agreement or support contract. Availability of on-site visits depends on
        location and scheduling.
      </p>
    ),
  },
  {
    heading: "Limitation of liability",
    body: (
      <p>
        To the maximum extent permitted by law, {COMPANY.name} is not liable for any indirect,
        incidental, or consequential loss arising from your use of the Site or our services,
        including loss of data, revenue, or business, except where liability cannot be excluded
        under the <em>Australian Consumer Law</em>. Nothing in these terms excludes, restricts, or
        modifies any consumer guarantee, right, or remedy that cannot lawfully be excluded.
      </p>
    ),
  },
  {
    heading: "Intellectual property",
    body: (
      <p>
        All content on the Site — text, graphics, logos, and design — is the property of{" "}
        {COMPANY.name} unless otherwise noted, and is protected by copyright and other
        intellectual property laws. You may not reproduce or use it without our prior written
        consent, other than for normal browsing of the Site.
      </p>
    ),
  },
  {
    heading: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of{" "}
        <strong className="font-semibold text-ink">New South Wales, Australia</strong>, and
        you submit to the non-exclusive jurisdiction of its courts.
      </p>
    ),
  },
  {
    heading: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. Continued use of the Site after changes are
        posted constitutes acceptance of the revised terms. The date of the most recent update is
        shown at the top of this page.
      </p>
    ),
  },
  {
    heading: "Contact us",
    body: (
      <p>
        For any questions about these terms, contact us at{" "}
        <a href={`mailto:${COMPANY.email}`} className="link-animated font-medium text-accent-ui">
          {COMPANY.email}
        </a>{" "}
        or{" "}
        <a href={COMPANY.phoneHref} className="link-animated font-medium text-accent-ui">
          {COMPANY.phone}
        </a>
        .
      </p>
    ),
  },
];

/** Body content for /terms, below the PageHero. */
export function TermsContent() {
  const reduceMotion = useReducedMotion();

  return (
    <Section spacing="lg">
      <Container className="mx-auto max-w-3xl">
        <motion.div {...revealTrigger(reduceMotion, "mount")} variants={staggerContainer(0.08)}>
          <motion.p variants={fadeUp} className="text-sm text-muted">
            Last updated: {LAST_UPDATED}
          </motion.p>

          <motion.div variants={staggerContainer(0.06)} className="mt-8 space-y-10">
            {sections.map((section) => (
              <motion.div key={section.heading} variants={fadeUp}>
                <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground sm:text-base">
                  {section.body}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
