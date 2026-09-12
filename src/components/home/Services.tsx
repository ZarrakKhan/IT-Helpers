"use client";

import { motion } from "framer-motion";
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
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

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

/** Grid showcase of IT Helpers' services with icon, name, and description. */
export function Services() {
  return (
    <Section id="services" spacing="lg" className="bg-surface">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-wider text-secondary"
          >
            What We Do
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            Full-scope IT services for your business
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-muted">
            From day-to-day support to strategic cloud and security projects, we cover the
            full stack of IT needs for Sydney SMBs and individuals.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.slug}
                variants={fadeUp}
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
        </motion.div>
      </Container>
    </Section>
  );
}
