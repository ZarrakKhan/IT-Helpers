"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { SERVICE_CATEGORIES, SERVICES, type Service, type ServiceCategory } from "@/lib/constants";
import { SERVICE_ICON_MAP } from "@/lib/service-icons";
import { EASE_OUT_PREMIUM, EXPAND_DURATION, fadeUp, revealTrigger, staggerContainer } from "@/lib/motion";

interface ServicesAccordionProps {
  className?: string;
}

interface CategoryRowProps {
  category: ServiceCategory;
  services: Service[];
  isOpen: boolean;
  onToggle: () => void;
}

/** Single category row — collapsed shows title + pitch; expanded reveals its services. */
function CategoryRow({ category, services, isOpen, onToggle }: CategoryRowProps) {
  const panelId = `services-panel-${category.slug}`;
  const buttonId = `services-button-${category.slug}`;

  return (
    <div id={category.slug} className="scroll-mt-24 border-b border-border">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-start justify-between gap-4 py-6 text-left transition-colors hover:text-accent-ui"
        >
          <span>
            <span className="block text-lg font-semibold text-ink">{category.title}</span>
            <span className="mt-1.5 block max-w-2xl text-sm text-muted">{category.pitch}</span>
          </span>
          <Plus
            className={`mt-1 h-5 w-5 shrink-0 text-accent-ui transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
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
            <div className="grid grid-cols-1 gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = SERVICE_ICON_MAP[service.icon];
                return (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col rounded-lg border border-border bg-paper-bright p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-grey-300 hover:shadow-lg"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink text-white transition-colors duration-300 group-hover:bg-accent-ui">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h4 className="mt-3 font-semibold text-ink">{service.name}</h4>
                    <p className="mt-1.5 flex-1 text-sm text-muted">{service.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ui">
                      View details
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Category accordion for `/services` — one row per `SERVICE_CATEGORIES`
 * entry, collapsed to title + pitch, expanding in place to the services it
 * contains. Multiple rows can be open at once (simpler than tracking a
 * single active index, and lets someone compare two categories side by
 * side), mirroring `FAQAccordion`'s `allowMultiple` pattern and its
 * `border-b` / height-animation / `Plus`-rotates-45 conventions.
 */
export function ServicesAccordion({ className }: ServicesAccordionProps) {
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(new Set());
  const reduceMotion = useReducedMotion();

  function toggle(slug: string) {
    setOpenSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  return (
    <motion.div {...revealTrigger(reduceMotion, "mount")} variants={staggerContainer(0.06)} className={className}>
      {SERVICE_CATEGORIES.map((category) => {
        const services = category.serviceSlugs
          .map((slug) => SERVICES.find((service) => service.slug === slug))
          .filter((service): service is Service => service !== undefined);

        return (
          <motion.div key={category.slug} variants={fadeUp}>
            <CategoryRow
              category={category}
              services={services}
              isOpen={openSlugs.has(category.slug)}
              onToggle={() => toggle(category.slug)}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
