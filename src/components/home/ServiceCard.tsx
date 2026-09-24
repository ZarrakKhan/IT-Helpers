"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, type LucideIcon } from "lucide-react";
import type { Service } from "@/lib/constants";
import { EASE_OUT_PREMIUM, EXPAND_DURATION, fadeUp, hoverLift, ICON_SPIN_DURATION } from "@/lib/motion";

interface ServiceCardProps {
  service: Service;
  icon: LucideIcon;
}

/**
 * Interactive service card: lifts and highlights on hover, and expands
 * inline (no modal) to reveal "what's included" details — the same
 * interaction on touch and desktop keeps behavior predictable everywhere.
 * The title links to the full service detail page.
 */
export function ServiceCard({ service, icon: Icon }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={fadeUp}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={hoverLift}
      className="group relative flex flex-col rounded-[2.5rem] border border-grey-200 bg-paper p-5 shadow-[inset_0_-2px_1px_rgba(0,0,0,0.12),inset_0_0_1px_2px_rgba(255,255,255,0.9)] transition-[border-color] duration-300 hover:border-grey-300 focus-within:border-grey-300 sm:p-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-secondary/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:from-secondary/5 group-hover:opacity-100"
      />

      <motion.div
        whileHover={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: ICON_SPIN_DURATION, ease: EASE_OUT_PREMIUM }}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent-gradient/30 p-[2px]"
      >
        <div className="flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-white/10 p-[3px] backdrop-blur-md">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-ink">
            <Icon className="h-5 w-5 text-white drop-shadow-[0_0_6px_rgba(179,226,255,0.6)]" aria-hidden />
          </div>
        </div>
      </motion.div>

      <h3 className="relative mt-4 text-lg font-semibold text-primary">
        <Link href={`/services/${service.slug}`} className="link-animated hover:text-secondary">
          {service.name}
        </Link>
      </h3>
      <p className="relative mt-2 text-sm text-muted">{service.description}</p>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={detailsId}
        className="relative mt-4 inline-flex min-h-[48px] items-center gap-1.5 self-start text-sm font-semibold text-secondary transition-colors hover:text-secondary-dark"
      >
        {expanded ? "Show less" : "Learn more"}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={detailsId}
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: EXPAND_DURATION, ease: EASE_OUT_PREMIUM }}
            className="relative overflow-hidden"
          >
            <div className="mt-4 space-y-4 border-t border-border pt-4 text-sm">
              <div>
                <p className="font-semibold text-primary">What&rsquo;s included</p>
                <ul className="mt-2 space-y-1.5">
                  {service.whatsIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={`/services/${service.slug}#contact`}
                className="inline-flex min-h-[48px] items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-secondary-dark"
              >
                Get this service
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
