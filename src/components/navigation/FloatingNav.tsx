"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, CTA, COMPANY } from "@/lib/constants";
import { EASE_OUT_PREMIUM, staggerContainer, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ICON_TRANSITION = { duration: 0.25, ease: EASE_OUT_PREMIUM };
const PANEL_TRANSITION = { duration: 0.3, ease: EASE_OUT_PREMIUM };

// Services / About / FAQ left, Contact + Get Support right — a 4-link list
// split into a fixed 2/2 grid rather than derived generically, since
// `NAV_LINKS` has no natural column boundary of its own.
const LEFT_LINKS = NAV_LINKS.slice(0, 3);
const RIGHT_LINKS = NAV_LINKS.slice(3);

/**
 * Floating nav: the logo circle is its own separate floating element, and
 * the nav panel — one shared static glass pill — sits next to it with a
 * small gap, containing exactly three things: the "IT Helpers" gradient
 * label, the Get Support button, and an icon-only hamburger toggle. That
 * shared pill never resizes (nothing animates its width/height), so none
 * of the earlier phases' shape-morph complexity (constant vs. animated
 * border-radius, `layout` FLIP, stale-paint-on-resize) applies here — it's
 * just a plain rounded box sized to fit its tallest child (the Get Support
 * button's own 2px gradient-ring), with generous padding so that ring is
 * never at risk of the clipping bug a couple of phases back.
 *
 * Clicking the hamburger reveals a second, independent glass panel below
 * the row — the row itself never resizes.
 *
 * The hamburger⇄X glyph is two independently animated bars (not an icon
 * swap): closed, they sit offset above/below center; open, both rotate to
 * ±45° and collapse onto the center line. Untouched from the last phase.
 */
export function FloatingNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const mountedRef = useRef(false);

  function close() {
    setOpen(false);
  }

  // Returns focus to the Menu toggle on close — skipped on first mount so
  // the page doesn't steal focus on load.
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (!open) toggleRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const panel = expandedRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusables?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-3 px-4">
        <div className="flex items-center gap-3">
          {/* Logo circle — glass button, links home only. The blurred
              gradient glow sits in a sibling span (not clipped by the
              circle's own overflow-hidden) so it can bleed past the
              circle's edge on hover instead of being cut off at it. */}
          <Link
            href="/"
            aria-label="IT Helpers — home"
            className="group relative shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ui"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-1.5 rounded-full bg-accent-gradient opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70"
            />
            <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-ink/75 shadow-lg backdrop-blur-xl">
              <Image src="/logo.png" alt="" width={96} height={96} className="h-11 w-11 object-contain" />
            </span>
          </Link>

          {/* Nav panel — one shared static pill: IT Helpers label, Get
              Support, hamburger. No overflow-hidden and nothing here
              animates width/height, so there's nothing for a resize
              animation to clip — padding alone (py-2.5) keeps Get
              Support's ring clear of the pill's own edge. */}
          <div className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-ink/75 px-3 py-2.5 shadow-lg backdrop-blur-xl">
            <span className="text-gradient whitespace-nowrap px-1 text-xl font-semibold">{COMPANY.name}</span>

            <Button href={CTA.primary.href} size="sm" className="shrink-0 whitespace-nowrap">
              Get Support
            </Button>

            {/* Hamburger/X toggle — icon only, no label. Unchanged from the
                last phase: same two motion.span bars, same transition, same
                active-state ring. Only the button's own border/background/
                shadow were dropped, since it now sits inside the shared
                pill's background instead of carrying its own. */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ui",
                open && "bg-white/10 ring-2 ring-accent-ui/50",
              )}
            >
              <span className="relative flex h-4 w-5 shrink-0 items-center justify-center">
                <motion.span
                  className="absolute h-0.5 w-5 rounded-full bg-white"
                  animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                  transition={ICON_TRANSITION}
                />
                <motion.span
                  className="absolute h-0.5 w-5 rounded-full bg-white"
                  animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                  transition={ICON_TRANSITION}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              id={panelId}
              ref={expandedRef}
              role="region"
              aria-label="Site navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={PANEL_TRANSITION}
              className="w-[min(26rem,calc(100vw-2rem))] rounded-container-sm border border-white/10 bg-ink/90 p-6 shadow-lg backdrop-blur-xl"
            >
              <motion.div
                variants={staggerContainer(0.06, 0.05)}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-x-6 gap-y-1"
              >
                <div className="flex flex-col gap-1">
                  {LEFT_LINKS.map((link) => (
                    <motion.div key={link.href} variants={fadeUp}>
                      <Link
                        href={link.href}
                        onClick={close}
                        className="flex min-h-[48px] items-center rounded-md px-3 text-base font-medium text-neutral-100/90 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  {RIGHT_LINKS.map((link) => (
                    <motion.div key={link.href} variants={fadeUp}>
                      <Link
                        href={link.href}
                        onClick={close}
                        className="flex min-h-[48px] items-center rounded-md px-3 text-base font-medium text-neutral-100/90 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div variants={fadeUp}>
                    <Button href={CTA.primary.href} onClick={close} size="sm" className="mt-1 w-full">
                      Get Support
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
