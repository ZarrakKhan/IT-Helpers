"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FAQItem } from "@/components/common/FAQItem";
import type { FaqItem } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

interface FAQAccordionProps {
  items: FaqItem[];
  /** Allow more than one answer open at once. Defaults to accordion behavior (one at a time). */
  allowMultiple?: boolean;
  className?: string;
}

/** Reusable FAQ accordion — used on the homepage FAQ section and the standalone /faq page. */
export function FAQAccordion({ items, allowMultiple = false, className }: FAQAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

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
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
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
