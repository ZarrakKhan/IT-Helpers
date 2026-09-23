"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Breadcrumb, type BreadcrumbItem } from "@/components/services/Breadcrumb";
import { fadeUp, revealTrigger, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbItems: BreadcrumbItem[];
}

/** Compact dark hero band shared by simple content pages (About, FAQ). */
export function PageHero({ title, description, breadcrumbItems }: PageHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <Container className="relative py-14 sm:py-20">
        <motion.div {...revealTrigger(reduceMotion, "mount")} variants={staggerContainer(0.1)}>
          <motion.div variants={fadeUp}>
            <Breadcrumb items={breadcrumbItems} variant="dark" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </motion.h1>
          {description && (
            <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-lg text-neutral-100/70">
              {description}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
