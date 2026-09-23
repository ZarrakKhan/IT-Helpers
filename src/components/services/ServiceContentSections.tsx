"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/lib/constants";
import { COMPANY } from "@/lib/constants";
import { fadeUp, revealTrigger, staggerContainer } from "@/lib/motion";

interface ServiceContentSectionsProps {
  service: Service;
}

/**
 * The three stacked, scroll-revealed sections that make up the bulk of a
 * service detail page: what's included, why choose IT Helpers, and typical
 * use cases. Kept as one client component since all three share the same
 * stagger-reveal pattern and are only ever rendered together.
 */
export function ServiceContentSections({ service }: ServiceContentSectionsProps) {
  const reduceMotion = useReducedMotion();
  return (
    <>
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div {...revealTrigger(reduceMotion, "mount")} variants={staggerContainer(0.08)}>
              <motion.span
                variants={fadeUp}
                className="text-sm font-semibold uppercase tracking-wider text-secondary"
              >
                What&rsquo;s Included
              </motion.span>
              <motion.h2 variants={fadeUp} className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                Everything covered under {service.name}
              </motion.h2>
              <motion.ul variants={staggerContainer(0.08)} className="mt-6 space-y-3">
                {service.whatsIncluded.map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div {...revealTrigger(reduceMotion, "mount")} variants={staggerContainer(0.08)}>
              <motion.span
                variants={fadeUp}
                className="text-sm font-semibold uppercase tracking-wider text-secondary"
              >
                Why {COMPANY.name}
              </motion.span>
              <motion.h2 variants={fadeUp} className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                Built around your business
              </motion.h2>
              <motion.ul variants={staggerContainer(0.08)} className="mt-6 space-y-3">
                {service.benefits.map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-sm text-foreground">
                    <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section spacing="md" className="bg-surface">
        <Container>
          <motion.div
            {...revealTrigger(reduceMotion, "scroll")}
            variants={staggerContainer(0.08)}
          >
            <motion.span
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-wider text-secondary"
            >
              Perfect For
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Typical use cases
            </motion.h2>
            <motion.div variants={staggerContainer(0.08)} className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {service.useCases.map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  className="rounded-lg border border-border bg-background p-5 shadow-sm"
                >
                  <Target className="h-5 w-5 text-secondary" aria-hidden />
                  <p className="mt-3 text-sm text-foreground">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="md" className="relative overflow-hidden bg-primary text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <Container className="relative text-center">
          <motion.div {...revealTrigger(reduceMotion, "scroll")} variants={staggerContainer(0.1)}>
            <motion.h2 variants={fadeUp} className="mx-auto max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to get started with {service.name}?
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="#contact" size="lg">
                Get This Service
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <a href={COMPANY.phoneHref} className="link-animated text-sm font-semibold text-neutral-100/80 hover:text-white">
                or call {COMPANY.phone}
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
