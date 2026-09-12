"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NetworkVisual } from "@/components/home/NetworkVisual";
import { CTA, COMPANY } from "@/lib/constants";

const trustPoints = [
  { icon: MapPin, label: "Sydney-based & on-site" },
  { icon: Clock, label: "Fast response times" },
  { icon: ShieldCheck, label: "Security-first approach" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/** Animated, technology-forward hero for the homepage. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

      <Container className="relative grid grid-cols-1 items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:py-32">
        <div>
          <motion.span
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-secondary-light"
          >
            IT Support &amp; Technology Services · Sydney, Australia
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.1}
            className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            IT support that keeps your business{" "}
            <span className="text-gradient">connected &amp; secure</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.2}
            className="mt-6 max-w-xl text-lg text-neutral-100/70"
          >
            {COMPANY.name} is {COMPANY.tagline.toLowerCase()} — from desktop support and
            Microsoft 365 to cloud migrations and cybersecurity, we manage the technology so
            you can focus on running your business.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.3}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Button href={CTA.primary.href} size="lg">
              {CTA.primary.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href={CTA.secondary.href} size="lg" variant="outline" className="border-white/20 text-white hover:border-secondary-light hover:text-secondary-light">
              {CTA.secondary.label}
            </Button>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.4}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
          >
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-neutral-100/70">
                <Icon className="h-4 w-4 text-secondary-light" aria-hidden />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex w-full max-w-md items-center justify-center"
        >
          <div className="glass-panel animate-float rounded-xl p-6 sm:p-10">
            <NetworkVisual />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
