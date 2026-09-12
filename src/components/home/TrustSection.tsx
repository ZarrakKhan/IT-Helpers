"use client";

import { motion, type Variants } from "framer-motion";
import { ShieldCheck, Timer, Users2, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const stats = [
  { value: "10+", label: "IT service areas covered", icon: Wrench },
  { value: "<1hr", label: "Typical response time", icon: Timer },
  { value: "100%", label: "Remote & on-site coverage", icon: Users2 },
  { value: "AU", label: "Sydney-based & local", icon: ShieldCheck },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/** Trust / credibility section — quick-scan stats that build confidence. */
export function TrustSection() {
  return (
    <Section id="why-us" spacing="lg">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
              Why Businesses Choose Us
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              A responsive, security-first IT partner
            </h2>
            <p className="mt-4 text-muted">
              We work as an extension of your team — proactive, clear about trade-offs, and
              focused on keeping your systems reliable, secure, and easy to manage. Whether
              it&rsquo;s a single laptop issue or a full cloud migration, you get the same
              attention to detail.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground">
              {[
                "Clear, jargon-free communication",
                "Security and access governance built in, not bolted on",
                "Flexible remote and on-site support",
                "Transparent pricing and scoping",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={i * 0.1}
                className="rounded-lg border border-border bg-surface p-6 text-center"
              >
                <Icon className="mx-auto h-6 w-6 text-secondary" aria-hidden />
                <p className="mt-3 text-3xl font-bold text-primary">{value}</p>
                <p className="mt-1 text-xs text-muted">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
