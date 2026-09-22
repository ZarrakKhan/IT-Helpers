"use client";

import dynamic from "next/dynamic";

/**
 * Below-the-fold homepage sections, code-split out of the initial JS bundle.
 * `next/dynamic` calls (especially `ssr: false`) only code-split correctly
 * from inside a Client Component boundary — calling them directly from the
 * (Server Component) page doesn't split the bundle. See
 * node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md.
 *
 * Testimonials skips SSR entirely: its content is animation-heavy and
 * already duplicated for crawlers via the review JSON-LD schema in
 * page.tsx, so there's no SEO cost to rendering it client-side only.
 */
export const Testimonials = dynamic(
  () => import("@/components/home/Testimonials").then((mod) => mod.Testimonials),
  { ssr: false },
);

// FAQ content stays server-rendered by default (`ssr` defaults to `true`) —
// it's real on-page copy, not just decoration — this only splits its JS
// into a separate chunk.
export const FAQSection = dynamic(() =>
  import("@/components/home/FAQSection").then((mod) => mod.FAQSection),
);
