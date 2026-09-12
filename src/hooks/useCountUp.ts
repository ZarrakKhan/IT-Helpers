"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { COUNTER_DURATION } from "@/lib/motion";

interface UseCountUpOptions {
  /** Target number to count up to. */
  end: number;
  /** Duration in milliseconds. Defaults to the shared `COUNTER_DURATION`. */
  duration?: number;
  start?: number;
}

/**
 * Counts a number up from `start` to `end` once its returned `ref` element
 * scrolls into view. Respects `prefers-reduced-motion` by jumping straight
 * to the end value instead of animating.
 */
export function useCountUp<T extends HTMLElement>({
  end,
  duration = COUNTER_DURATION,
  start = 0,
}: UseCountUpOptions) {
  const ref = useRef<T>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(start);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (reduceMotion) {
      setValue(end);
      return;
    }

    const controls = animate(start, end, {
      duration: duration / 1000,
      ease: "easeOut",
      onUpdate: setValue,
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, end, duration, start, reduceMotion]);

  return { ref, value };
}
