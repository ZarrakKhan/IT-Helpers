"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FAQItem } from "@/components/common/FAQItem";
import type { FaqItem } from "@/lib/constants";
import { fadeUp, revealTrigger, staggerContainer } from "@/lib/motion";

interface FAQAccordionProps {
  items: FaqItem[];
  /** Allow more than one answer open at once. Defaults to accordion behavior (one at a time). */
  allowMultiple?: boolean;
  /**
   * Reveal immediately on mount instead of waiting for scroll-into-view.
   * Use this where the accordion is a page's first content (e.g. the
   * standalone /faq page, right after PageHero) — it's already in or near
   * the initial viewport, so an IntersectionObserver trigger just adds a
   * visible delay on top of the animation itself. Leave `false` (default)
   * when it's genuinely further down the page, like the homepage FAQ section.
   */
  immediate?: boolean;
  className?: string;
}

/** Reusable FAQ accordion — used on the homepage FAQ section and the standalone /faq page. */
export function FAQAccordion({ items, allowMultiple = false, immediate = false, className }: FAQAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());
  const reduceMotion = useReducedMotion();

  function toggle(index: number) {
    setOpenIndexes((prev) => {
      const next = allowMultiple ? new Set(prev) : new Set<number>();
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <motion.div
      {...revealTrigger(reduceMotion, immediate ? "mount" : "scroll")}
      variants={staggerContainer(0.06)}
      className={className}
    >
      {items.map((item, index) => (
        <motion.div key={item.question} variants={fadeUp}>
          <FAQItem item={item} isOpen={openIndexes.has(index)} onToggle={() => toggle(index)} />
        </motion.div>
      ))}
    </motion.div>
  );
}
