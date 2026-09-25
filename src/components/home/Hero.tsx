"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ShieldCheck, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BackgroundVideo } from "@/components/common/BackgroundVideo";
import { NetworkVisual } from "@/components/home/NetworkVisual";
import { CTA, COMPANY } from "@/lib/constants";
import { revealUp, staggerContainer } from "@/lib/motion";

const trustPoints = [
  { icon: MapPin, label: "Sydney-based & on-site" },
  { icon: Clock, label: "Fast response times" },
  { icon: ShieldCheck, label: "Security-first approach" },
];

/** Animated, technology-forward hero for the homepage. */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/*
        Ambient background layer: the video (or its poster, before the
        deferred load kicks in / under reduced motion) sits behind the
        gradient overlay, which in turn sits behind the existing grid
        texture and glow blobs — all absolutely positioned siblings before
        the `relative` Container below, so DOM order alone determines
        stacking (no z-index needed). The video's own opacity is dimmed
        (rather than relying on the overlay alone) because the source
        footage is quite bright — the overlay by itself at a legible
        strength wasn't enough to tame it; verified visually.
      */}
      <BackgroundVideo
        mp4="/assets/video/hero-video.mp4"
        webm="/assets/video/hero-video.webm"
        poster="/assets/images/hero-video-poster.jpg"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/75 to-ink/85" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent-ui/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-accent-ui/10 blur-3xl" />

      <Container className="relative grid grid-cols-1 items-start gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.12, 0.05)}
        >
          <motion.span
            variants={revealUp}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-accent-sky"
          >
            IT Support &amp; Technology Services · Sydney, Australia
          </motion.span>

          {/*
            Rendered as a plain, unanimated element (not a `motion.h1`
            variants child): this is the LCP element. Fading it in — even
            with a GPU-friendly opacity/transform animation — delays the
            paint Lighthouse measures as LCP by the stagger delay + fade
            duration. Every other hero element still animates in normally.
          */}
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            IT support that keeps your business{" "}
            <span className="text-gradient">connected &amp; secure</span>
          </h1>

          <motion.p variants={revealUp} className="mt-6 max-w-xl text-lg text-neutral-100/70">
            {COMPANY.name} is {COMPANY.tagline.toLowerCase()} — from desktop support and
            Microsoft 365 to cloud migrations and cybersecurity, we manage the technology so
            you can focus on running your business.
          </motion.p>

          <motion.div variants={revealUp} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href={CTA.primary.href} size="lg">
              {CTA.primary.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              href={CTA.secondary.href}
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:border-accent-sky hover:text-accent-sky"
            >
              {CTA.secondary.label}
            </Button>
          </motion.div>

          <motion.ul variants={revealUp} className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-neutral-100/70">
                <Icon className="h-4 w-4 text-accent-sky" aria-hidden />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex w-full max-w-md items-center justify-center"
          style={{ perspective: 800 }}
        >
          <motion.div
            ref={panelRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{ rotateX, rotateY }}
            // The float bob lives here (not the `animate-float` CSS class) —
            // that class also sets `transform`, which Framer Motion's own
            // inline `rotateX`/`rotateY` style silently overrode, so the
            // bob never actually rendered. Keeping both on one motion value
            // set lets Framer Motion compose them into a single transform.
            animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
            transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            className="glass-panel w-full rounded-xl p-6 sm:p-10"
          >
            <NetworkVisual />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
