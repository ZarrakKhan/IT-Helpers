"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Service } from "@/lib/constants";
import { SERVICE_ICON_MAP } from "@/lib/service-icons";
import { fadeUp, revealTrigger, staggerContainer } from "@/lib/motion";

interface RelatedServicesProps {
  services: Service[];
  /** Set to `null` to omit the heading (e.g. when the page already has its own). */
  heading?: string | null;
}

/**
 * Cross-links to a few other services. A static responsive grid rather than
 * a swipeable carousel — with only 2-3 items it never needs horizontal
 * scrolling, so a carousel's drag/arrow mechanics would add complexity
 * without adding usability. Also reused as the full grid on `/services`.
 */
export function RelatedServices({ services, heading = "Related services" }: RelatedServicesProps) {
  const reduceMotion = useReducedMotion();
  if (services.length === 0) return null;

  return (
    <Section spacing="md" className="bg-surface">
      <Container>
        {heading && (
          <motion.h2
            {...revealTrigger(reduceMotion, "scroll")}
            variants={fadeUp}
            className="text-2xl font-bold tracking-tight text-primary"
          >
            {heading}
          </motion.h2>
        )}

        <motion.div
          {...revealTrigger(reduceMotion, "scroll")}
          variants={staggerContainer(0.08)}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = SERVICE_ICON_MAP[service.icon];
            return (
              <motion.div key={service.slug} variants={fadeUp}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white transition-colors duration-300 group-hover:bg-secondary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 font-semibold text-primary">{service.name}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-muted">{service.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">
                    View details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
