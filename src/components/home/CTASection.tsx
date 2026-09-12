"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTA, COMPANY } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/** Mid-page conversion band — high-contrast call to action. */
export function CTASection() {
  return (
    <Section spacing="md" className="relative overflow-hidden bg-primary text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl" />

      <Container className="relative text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          <motion.h2 variants={fadeUp} className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Ready for IT support that just works?
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-neutral-100/70">
            Book a free consultation and we&rsquo;ll map out the right support plan for your
            business — no jargon, no lock-in pressure.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button href={CTA.consultation.href} size="lg">
              {CTA.consultation.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <a
              href={COMPANY.phoneHref}
              className="link-animated text-sm font-semibold text-neutral-100/80 transition-colors hover:text-white"
            >
              or call {COMPANY.phone}
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
