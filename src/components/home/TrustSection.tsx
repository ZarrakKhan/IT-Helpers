"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Timer, Users2, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const stats = [
  { value: "10+", label: "IT service areas covered", icon: Wrench },
  { value: "<1hr", label: "Typical response time", icon: Timer },
  { value: "100%", label: "Remote & on-site coverage", icon: Users2 },
  { value: "AU", label: "Sydney-based & local", icon: ShieldCheck },
];

const bulletPoints = [
  "Clear, jargon-free communication",
  "Security and access governance built in, not bolted on",
  "Flexible remote and on-site support",
  "Transparent pricing and scoping",
];

/** Trust / credibility section — quick-scan stats that build confidence. */
export function TrustSection() {
  return (
    <Section id="why-us" spacing="lg">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
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
              Why Businesses Choose Us
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
            >
              A responsive, security-first IT partner
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-muted">
              We work as an extension of your team — proactive, clear about trade-offs, and
              focused on keeping your systems reliable, secure, and easy to manage. Whether
              it&rsquo;s a single laptop issue or a full cloud migration, you get the same
              attention to detail.
            </motion.p>
            <motion.ul
              variants={staggerContainer(0.08)}
              className="mt-6 space-y-3 text-sm text-foreground"
            >
              {bulletPoints.map((item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            {stats.map(({ value, label, icon: Icon }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="rounded-lg border border-border bg-surface p-6 text-center"
              >
                <Icon className="mx-auto h-6 w-6 text-secondary" aria-hidden />
                <p className="mt-3 text-3xl font-bold text-primary">{value}</p>
                <p className="mt-1 text-xs text-muted">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
