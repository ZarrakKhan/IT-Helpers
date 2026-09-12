import type { Transition, Variants } from "framer-motion";

/**
 * Shared animation primitives — the "premium feel" motion language used
 * across the homepage. Import these instead of redefining variants per
 * component so every section reveals with the same rhythm.
 */

export const EASE_OUT_PREMIUM: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_PREMIUM },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_PREMIUM },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT_PREMIUM },
  },
};

/**
 * Parent variant that staggers its direct `motion` children. Children should
 * use `fadeUp`/`fadeIn`/`scaleIn` (or a custom variant) with no explicit
 * delay — timing is driven entirely by the container.
 */
export function staggerContainer(stagger = 0.12, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Standard viewport trigger for scroll-based reveals: fire once, slightly before entering view. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

/**
 * Micro-interaction timings (seconds unless noted) — kept as named constants
 * so hover/tap/expand/counter animations stay consistent across components.
 */
export const HOVER_DURATION = 0.2;
export const TAP_DURATION = 0.15;
export const EXPAND_DURATION = 0.35;
export const ICON_SPIN_DURATION = 0.5;
/** Count-up duration in milliseconds — used by `useCountUp`. */
export const COUNTER_DURATION = 2000;

export const hoverLift: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 22,
};

export const tapScale: Transition = {
  duration: TAP_DURATION,
  ease: EASE_OUT_PREMIUM,
};
