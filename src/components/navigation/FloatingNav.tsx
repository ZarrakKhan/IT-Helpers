"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, CTA, COMPANY } from "@/lib/constants";
import { EASE_OUT_PREMIUM, staggerContainer, fadeUp } from "@/lib/motion";

// One curve, both directions — a monotonic ease-out never overshoots, so
// reusing it for both open and close (rather than a spring, which can
// wobble past its target) is what guarantees no bounce on the shell resize.
const SHELL_TRANSITION = { duration: 0.4, ease: EASE_OUT_PREMIUM };

/**
 * Minimal floating nav: a glass capsule ("IT Helpers" / Get Support /
 * hamburger) fixed at the top of every page. The hamburger expands the same
 * capsule into a full menu (Services/About/FAQ/Contact/Get Support, from the
 * shared `NAV_LINKS` config) rather than opening a separate dropdown or
 * modal.
 *
 * The shell's pill-to-panel shape change uses Framer Motion's `layout`
 * prop (its battle-tested FLIP implementation) for the width/height
 * resize. An earlier version hand-measured the target size via
 * `useLayoutEffect` + `getBoundingClientRect` and animated explicit
 * `width`/`height` values instead, specifically to avoid `layout`
 * distorting an *animated* `borderRadius` into a near-circle mid-transition
 * — but driving layout-triggering CSS properties (width/height) via JS on
 * every frame is also exactly the kind of change that can leave a child's
 * `background`+`padding` "gradient ring" trick stale until the next
 * unrelated repaint, which is what broke the Get Support ring after an
 * open/close cycle. `layout`'s own transform-based FLIP doesn't have that
 * failure mode.
 *
 * `borderRadius` itself is a CONSTANT 32px, not animated at all — the
 * collapsed row's padding is tuned so 32px reads as fully-rounded pill ends
 * (with real clearance around the primary Button's own 2px gradient-ring
 * border, and the hamburger toggle's focus ring, both of which a too-tight
 * fit was clipping against this shell's own `overflow-hidden`), same as
 * the expanded panel's corners. Keeping radius constant (not part of the
 * `layout` diff at all) is what makes `layout` safe to use again here: a
 * value that never changes can't be the thing FLIP's scale-transform
 * distorts.
 *
 * The inner content's own reveal (`staggerContainer`) carries a
 * `delayChildren` so items don't start appearing until the shell resize is
 * substantially through.
 *
 * No logo/wordmark here by design (branding placement is a separate,
 * later decision) — "IT Helpers" appears only as gradient text, matching
 * the Hero's `.text-gradient` treatment.
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

  // Returns focus to the hamburger toggle once it's the closed (hamburger)
  // instance that's actually mounted — skipped on first mount so the page
  // doesn't steal focus on load.
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

      <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <motion.nav
          aria-label="Primary"
          layout
          transition={SHELL_TRANSITION}
          className="overflow-hidden rounded-[34px] border border-white/10 bg-ink/75 shadow-lg backdrop-blur-xl"
        >
          <div className="inline-block">
            {open ? (
              <div ref={expandedRef} id={panelId} className="w-[min(20rem,calc(100vw-2rem))] px-2 pb-2">
                <div className="flex items-center justify-end p-3">
                  <button
                    ref={toggleRef}
                    type="button"
                    onClick={close}
                    aria-expanded={true}
                    aria-controls={panelId}
                    aria-label="Close navigation menu"
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ui"
                  >
                    <X className="h-5 w-5" aria-hidden />
                  </button>
                </div>

                <motion.ul
                  variants={staggerContainer(0.06, 0.1)}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-1"
                >
                  {NAV_LINKS.map((link) => (
                    <motion.li key={link.href} variants={fadeUp}>
                      <Link
                        href={link.href}
                        onClick={close}
                        className="flex min-h-[48px] items-center rounded-md px-3 text-base font-medium text-neutral-100/90 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li variants={fadeUp} className="mt-1">
                    <Button href={CTA.primary.href} onClick={close} className="w-full">
                      Get Support
                    </Button>
                  </motion.li>
                </motion.ul>
              </div>
            ) : (
              <div className="flex items-center gap-1 whitespace-nowrap px-3 py-2.5">
                <span className="text-gradient px-2 text-sm font-semibold">{COMPANY.name}</span>
                <Button href={CTA.primary.href} size="sm" className="whitespace-nowrap">
                  Get Support
                </Button>
                <button
                  ref={toggleRef}
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-expanded={false}
                  aria-controls={panelId}
                  aria-label="Open navigation menu"
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ui"
                >
                  <Menu className="h-5 w-5" aria-hidden />
                </button>
              </div>
            )}
          </div>
        </motion.nav>
      </div>
    </>
  );
}
