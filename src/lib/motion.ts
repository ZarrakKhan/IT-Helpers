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

/**
 * Like `fadeUp`, but never touches opacity — only `y`. Use this (instead of
 * `fadeUp`) for any element that's a plausible LCP candidate (above-the-fold
 * text/hero content). An opacity:0→1 entrance delays LCP until the fade
 * actually completes, because the browser can't credit "largest contentful
 * paint" to something that isn't visible yet; a transform-only slide has no
 * such penalty; since the element is opacity:1 from first paint, it's
 * already "painted" and just animates into its resting position.
 */
export const revealUp: Variants = {
  hidden: { opacity: 1, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
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
 * Resolves the `initial`/`animate`/`whileInView` props for a reveal
 * container, respecting `prefers-reduced-motion`.
 *
 * The CSS media-query rule in globals.css only zeroes out CSS
 * `animation`/`transition` durations — it does nothing for these
 * JS-driven Framer Motion props, so every `whileInView`/mount reveal needs
 * to opt in explicitly via this helper (pass `useReducedMotion()`'s result).
 *
 * `trigger: "scroll"` (default) reveals via `whileInView` the first time the
 * element scrolls into view — appropriate for content genuinely below the
 * fold. `trigger: "mount"` reveals immediately on render instead — use this
 * for a page's first content block (e.g. right after a hero), which is
 * often already in or near the initial viewport, where waiting on an
 * IntersectionObserver just adds a visible "still loading" delay on top of
 * the animation's own duration.
 */
export function revealTrigger(reduceMotion: boolean | null, trigger: "mount" | "scroll" = "scroll") {
  if (reduceMotion) {
    // `initial={false}` paired with `animate` still pointing at the target
    // is Framer Motion's documented pattern for "skip the entrance
    // animation, render already-revealed" — it jumps straight to the
    // resolved "visible" values with no transition. Omitting `animate`
    // instead (leaving it unset) is riskier: `useReducedMotion()` resolves
    // from `null` to its real value in a layout effect *after* the first
    // render already locked in "hidden" as the mount state, so if that
    // second render also drops the animate target, the element can be
    // left stuck wherever it was — which, for a reduced-motion user, may
    // be fully invisible. Keeping `animate: "visible"` avoids that.
    return { initial: false as const, animate: "visible" as const };
  }
  return trigger === "mount"
    ? { initial: "hidden" as const, animate: "visible" as const }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: viewportOnce };
}

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
