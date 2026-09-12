"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/home/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { SERVICE_ICON_MAP } from "@/lib/service-icons";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

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
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.slug} service={service} icon={SERVICE_ICON_MAP[service.icon]} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
