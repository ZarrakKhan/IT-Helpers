"use client";

import { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/constants";
import { EASE_OUT_PREMIUM, EXPAND_DURATION } from "@/lib/motion";

interface FAQItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

/** Single accordion row. The question is a real `<h3>` for correct heading hierarchy. */
export function FAQItem({ item, isOpen, onToggle }: FAQItemProps) {
  const reactId = useId();
  const panelId = `faq-panel-${reactId}`;
  const buttonId = `faq-button-${reactId}`;

  return (
    <div className="border-b border-border">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-ink transition-colors hover:text-accent-ui"
        >
          {item.question}
          <Plus
            className={`h-5 w-5 shrink-0 text-accent-ui transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
            aria-hidden
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: EXPAND_DURATION, ease: EASE_OUT_PREMIUM }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-muted">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
