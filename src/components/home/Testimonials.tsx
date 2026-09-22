"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TESTIMONIALS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/**
 * Static responsive grid of client testimonials (3 columns desktop, 1
 * mobile) — chosen over a carousel for simplicity: with only a handful of
 * cards, a grid needs no drag/arrow/dot mechanics and reads fine everywhere.
 */
export function Testimonials() {
  return (
    <Section spacing="lg" className="bg-surface">
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
            What Clients Say
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            Trusted by Sydney businesses
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.figure
              key={testimonial.name}
              variants={fadeUp}
              className="flex h-full flex-col rounded-lg border border-border bg-background p-6 shadow-sm"
            >
              {/*
                `role="img"` is required here — `aria-label` is a prohibited
                attribute on a plain `<div>`'s implicit `role="generic"`.
              */}
              <div
                className="flex gap-0.5"
                role="img"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={
                      i < testimonial.rating
                        ? "h-4 w-4 fill-secondary text-secondary"
                        : "h-4 w-4 text-border"
                    }
                    aria-hidden
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-sm text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="font-semibold text-primary">{testimonial.name}</p>
                <p className="text-xs text-muted">
                  {testimonial.role} · {testimonial.company}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
