"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumb, type BreadcrumbItem } from "@/components/services/Breadcrumb";
import type { Service } from "@/lib/constants";
import { SERVICE_ICON_MAP } from "@/lib/service-icons";
import { fadeUp, revealTrigger, staggerContainer } from "@/lib/motion";

interface ServiceHeroProps {
  name: string;
  description: string;
  /** Icon key (not the component itself — this is a Client Component, and passing a
   * component reference across the Server → Client boundary from the page isn't allowed). */
  icon: Service["icon"];
  breadcrumbItems: BreadcrumbItem[];
  /** Shown directly under the description, e.g. Data Services' recovery disclaimer. */
  caveat?: string;
}

/** Compact, polished hero for a service detail page — smaller than the homepage hero. */
export function ServiceHero({ name, description, icon, breadcrumbItems, caveat }: ServiceHeroProps) {
  const Icon = SERVICE_ICON_MAP[icon];
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-accent-ui/20 blur-3xl" />

      <Container className="relative py-14 sm:py-20">
        <motion.div {...revealTrigger(reduceMotion, "mount")} variants={staggerContainer(0.1)}>
          <motion.div variants={fadeUp}>
            <Breadcrumb items={breadcrumbItems} variant="dark" />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent-ui text-white shadow-glow">
              <Icon className="h-7 w-7" aria-hidden />
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{name}</h1>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg text-neutral-100/70">
            {description}
          </motion.p>

          {caveat && (
            <motion.p
              variants={fadeUp}
              className="mt-3 max-w-2xl rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-100/70"
            >
              {caveat}
            </motion.p>
          )}

          <motion.div variants={fadeUp} className="mt-8">
            <Button href="#contact" size="lg">
              Get This Service
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
