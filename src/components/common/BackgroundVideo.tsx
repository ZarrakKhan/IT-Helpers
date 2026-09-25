"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface BackgroundVideoProps {
  mp4: string;
  webm: string;
  poster: string;
  className?: string;
}

/**
 * Ambient, decorative background video loop. Renders the poster image only
 * until just after mount (matching NetworkVisual's deferred-loop pattern)
 * so the video's byte fetch never competes with initial paint/LCP, and
 * permanently for `prefers-reduced-motion` users.
 *
 * `el.muted` is set imperatively rather than relying on the JSX `muted`
 * prop landing on the DOM in time — otherwise the browser can evaluate
 * autoplay eligibility before it sees the element as muted and silently
 * block it. No `el.load()` call: the `<source>` children are already
 * present at mount, and in dev, React Strict Mode double-invokes this
 * effect, so a second `load()` would abort the first `play()` promise
 * with an AbortError — repeated `play()` calls are harmless by comparison.
 *
 * Chromium also pauses muted, video-only autoplay to save power while a
 * tab is backgrounded; the `visibilitychange` listener resumes it once
 * the tab is visible again.
 */
export function BackgroundVideo({ mp4, webm, poster, className }: BackgroundVideoProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setTimeout(() => setShouldLoad(true), 300);
    return () => window.clearTimeout(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (!shouldLoad) return;
    const el = ref.current;
    if (!el) return;
    el.muted = true;

    const tryPlay = () => {
      el.play().catch(() => {});
    };
    tryPlay();

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && el.paused) tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [shouldLoad]);

  if (!shouldLoad) {
    return <img src={poster} alt="" aria-hidden className={className} />;
  }

  return (
    <video ref={ref} className={className} autoPlay muted loop playsInline preload="auto" poster={poster}>
      <source src={mp4} type="video/mp4" />
      <source src={webm} type="video/webm" />
    </video>
  );
}
