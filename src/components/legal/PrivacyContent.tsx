"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { COMPANY } from "@/lib/constants";
import { fadeUp, revealTrigger, staggerContainer } from "@/lib/motion";

/*
 * TEMPLATE CUSTOMIZATION POINT: Replace with actual legal review before
 * launch. This is placeholder content for structure only — it is written
 * to be a reasonable, honest starting point (it reflects what this
 * codebase actually does: the contact form, Resend, no analytics/cookies
 * today), but it has not been reviewed by a lawyer and should be before
 * this site goes live to real customers.
 */
const sections = [
  {
    heading: "Overview",
    body: (
      <>
        <p>
          {COMPANY.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your
          privacy. This policy explains what personal information we collect through{" "}
          {COMPANY.website}, how we use and store it, and the rights you have over it.
        </p>
        <p>
          We handle personal information in accordance with the{" "}
          <strong className="font-semibold text-ink">Australian Privacy Principles (APPs)</strong>{" "}
          set out in the <em>Privacy Act 1988</em> (Cth).
        </p>
      </>
    ),
  },
  {
    heading: "Information we collect",
    body: (
      <>
        <p>We only collect personal information you provide directly to us, specifically:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold text-ink">Contact form submissions</strong> — your
            name, email address, message, and phone number if you choose to provide it.
          </li>
        </ul>
        <p className="mt-3">
          We don&rsquo;t use analytics, tracking cookies, or advertising pixels on this site at this
          time.
        </p>
      </>
    ),
  },
  {
    heading: "How we use your information",
    body: (
      <>
        <p>We use the information you submit through the contact form solely to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Respond to your enquiry and provide the IT support services you&rsquo;ve requested.</li>
          <li>Follow up about a quote, booking, or ongoing engagement.</li>
        </ul>
        <p className="mt-3">
          We do not sell, rent, or trade your personal information to third parties, and we don&rsquo;t
          use it for unrelated marketing without your separate consent.
        </p>
      </>
    ),
  },
  {
    heading: "Data storage & third parties",
    body: (
      <>
        <p>
          Contact form submissions are sent via{" "}
          <a
            href="https://resend.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-animated font-medium text-accent-ui"
          >
            Resend
          </a>
          , a transactional email provider, to deliver your message to our team&rsquo;s inbox. Resend
          processes this data solely to transmit the email and is bound by its own privacy and data
          handling obligations.
        </p>
        <p>
          We don&rsquo;t maintain a separate database of contact form submissions beyond the email
          record itself.
        </p>
      </>
    ),
  },
  {
    heading: "Cookies",
    body: (
      <p>
        This website does not currently set analytics, advertising, or tracking cookies. If that
        changes in the future, this policy will be updated to describe what&rsquo;s used and how to
        opt out.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <>
        <p>Under the Australian Privacy Principles, you have the right to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Ask what personal information we hold about you.</li>
          <li>Request a correction to inaccurate or out-of-date information.</li>
          <li>Request that we delete personal information we hold about you.</li>
          <li>Make a complaint about how we&rsquo;ve handled your personal information.</li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, contact us using the details below. If you&rsquo;re not
          satisfied with our response, you can lodge a complaint with the{" "}
          <a
            href="https://www.oaic.gov.au"
            target="_blank"
            rel="noopener noreferrer"
            className="link-animated font-medium text-accent-ui"
          >
            Office of the Australian Information Commissioner (OAIC)
          </a>
          .
        </p>
      </>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time to reflect changes to our practices or for
        legal reasons. The date of the most recent update will be shown at the top of this page.
      </p>
    ),
  },
  {
    heading: "Contact us",
    body: (
      <p>
        For any questions about this privacy policy or how your personal information is handled,
        contact us at{" "}
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

// TEMPLATE CUSTOMIZATION POINT: bump this whenever the policy content
// actually changes — it should reflect the last real edit, not "today".
const LAST_UPDATED = "24 September 2026";

/** Body content for /privacy, below the PageHero. */
export function PrivacyContent() {
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
