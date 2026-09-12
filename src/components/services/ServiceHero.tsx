"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumb, type BreadcrumbItem } from "@/components/services/Breadcrumb";
import type { Service } from "@/lib/constants";
import { SERVICE_ICON_MAP } from "@/lib/service-icons";
import { fadeUp, staggerContainer } from "@/lib/motion";

interface ServiceHeroProps {
  name: string;
  description: string;
  /** Icon key (not the component itself — this is a Client Component, and passing a
   * component reference across the Server → Client boundary from the page isn't allowed). */
  icon: Service["icon"];
  breadcrumbItems: BreadcrumbItem[];
}

/** Compact, polished hero for a service detail page — smaller than the homepage hero. */
export function ServiceHero({ name, description, icon, breadcrumbItems }: ServiceHeroProps) {
  const Icon = SERVICE_ICON_MAP[icon];
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <Container className="relative py-14 sm:py-20">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.1)}>
          <motion.div variants={fadeUp}>
            <Breadcrumb items={breadcrumbItems} variant="dark" />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-white shadow-glow">
              <Icon className="h-7 w-7" aria-hidden />
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{name}</h1>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg text-neutral-100/70">
            {description}
          </motion.p>

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
