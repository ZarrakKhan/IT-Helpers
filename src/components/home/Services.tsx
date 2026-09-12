"use client";

import { motion, type Variants } from "framer-motion";
import {
  Headset,
  Cloud,
  Network,
  ShieldCheck,
  Laptop,
  ArrowLeftRight,
  Users,
  MapPinned,
  Lightbulb,
  Grid3x3,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SERVICES, type Service } from "@/lib/constants";

const iconMap: Record<Service["icon"], LucideIcon> = {
  support: Headset,
  cloud: Cloud,
  network: Network,
  shield: ShieldCheck,
  device: Laptop,
  migration: ArrowLeftRight,
  users: Users,
  remote: MapPinned,
  consulting: Lightbulb,
  m365: Grid3x3,
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/** Grid showcase of IT Helpers' services with icon, name, and description. */
export function Services() {
  return (
    <Section id="services" spacing="lg" className="bg-surface">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            What We Do
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Full-scope IT services for your business
          </h2>
          <p className="mt-4 text-muted">
            From day-to-day support to strategic cloud and security projects, we cover the
            full stack of IT needs for Sydney SMBs and individuals.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                custom={(i % 3) * 0.1}
                className="group relative rounded-lg border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-white transition-colors duration-300 group-hover:bg-secondary">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-primary">{service.name}</h3>
                <p className="mt-2 text-sm text-muted">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
