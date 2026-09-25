"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { FAQ_ITEMS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/** Homepage FAQ section — full FAQ list, with a link through to the standalone /faq page. */
export function FAQSection() {
  return (
    <Section id="faq" spacing="lg">
      <Container className="mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-wider text-accent-ui"
          >
            FAQ
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            Frequently asked questions
          </motion.h2>
        </motion.div>

        <FAQAccordion items={FAQ_ITEMS} className="mt-10" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-8 text-center"
        >
          <Link
            href="/faq"
            className="link-animated inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ui hover:text-ink"
          >
            View all FAQs
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
