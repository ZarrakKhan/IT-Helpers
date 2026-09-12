"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Lock, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CORE_VALUES, TEAM_MEMBERS } from "@/lib/constants";
import { fadeUp, hoverLift, staggerContainer, viewportOnce } from "@/lib/motion";

const VALUE_ICONS = [ShieldCheck, Sparkles, Users, Lock];

const differentiators = [
  "Sydney-based, with on-site visits when you need them",
  "Security considered in every engagement, not bolted on after",
  "Clear, jargon-free communication",
  "Support scoped around your business, not a fixed package",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/** All of the animated content sections on /about, below the PageHero. */
export function AboutContent() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Section spacing="lg">
        <Container className="mx-auto max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="space-y-5 text-foreground"
          >
            <motion.p variants={fadeUp}>
              IT Helpers was started with a simple idea: businesses shouldn&rsquo;t need an
              in-house IT department to get reliable, professional technology support. Whether
              it&rsquo;s a single laptop issue or a full cloud migration, we bring the same level
              of care and attention to every engagement.
            </motion.p>
            <motion.p variants={fadeUp}>
              We work across desktop support, Microsoft 365, cloud infrastructure, networking,
              and cybersecurity — covering the full stack of IT needs for Sydney SMBs and
              individuals, without the overhead of managing multiple vendors.
            </motion.p>
            <motion.p variants={fadeUp}>
              Above all, we aim to be the kind of IT partner you can actually reach when
              something goes wrong — clear communication, fast response times, and no jargon.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-surface">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-wider text-secondary">
              What We Value
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Our core values
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
          >
            {CORE_VALUES.map((value, index) => {
              const Icon = VALUE_ICONS[index % VALUE_ICONS.length];
              return (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  className="rounded-lg border border-border bg-background p-6 shadow-sm"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-semibold text-primary">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-wider text-secondary">
              Meet The Team
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              The people behind IT Helpers
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          >
            {TEAM_MEMBERS.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                whileHover={reduceMotion ? undefined : { y: -8 }}
                transition={hoverLift}
                className="rounded-lg border border-border bg-background p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg hover:border-secondary/40"
              >
                <span
                  aria-hidden
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-white"
                >
                  {initials(member.name)}
                </span>
                <h3 className="mt-4 font-semibold text-primary">{member.name}</h3>
                <p className="text-sm text-secondary">{member.role}</p>
                <p className="mt-2 text-sm text-muted">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-surface">
        <Container className="mx-auto max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
          >
            <motion.h2 variants={fadeUp} className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Why businesses choose us
            </motion.h2>
            <motion.ul variants={staggerContainer(0.08)} className="mt-6 space-y-3">
              {differentiators.map((item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="md" className="relative overflow-hidden bg-primary text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <Container className="relative text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
          >
            <motion.h2 variants={fadeUp} className="mx-auto max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">
              Let&rsquo;s talk about your IT needs
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-6">
              <Button href="/#contact" size="lg">
                Get In Touch
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
