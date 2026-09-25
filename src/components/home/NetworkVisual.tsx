"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Cloud, Laptop, Server, ShieldCheck, Users, Wifi, type LucideIcon } from "lucide-react";

interface SatelliteNode {
  x: number;
  y: number;
  delay: number;
  icon: LucideIcon;
  label: string;
}

const VIEW_W = 380;
const VIEW_H = 260;
const HUB = { x: 190, y: 130 };

const satellites: SatelliteNode[] = [
  { x: 70, y: 55, delay: 0, icon: Laptop, label: "Devices" },
  { x: 312, y: 55, delay: 0.15, icon: ShieldCheck, label: "Security" },
  { x: 336, y: 195, delay: 0.3, icon: Wifi, label: "Network" },
  { x: 190, y: 240, delay: 0.45, icon: Users, label: "Support" },
  { x: 44, y: 195, delay: 0.6, icon: Server, label: "Infrastructure" },
];

const pct = (v: number, max: number) => `${(v / max) * 100}%`;

/**
 * Decorative animated network diagram — devices, security, and network
 * connecting into a central cloud hub. Purely presentational (aria-hidden);
 * safe to remove or restyle when rebranding. Continuous loops and the
 * traveling "data packet" dots are skipped for `prefers-reduced-motion`.
 */
export function NetworkVisual() {
  const reduceMotion = useReducedMotion();
  // Continuous (repeat: Infinity) animations are deferred until just after
  // mount so they don't compete with hydration for main-thread time during
  // the page's initial load — they're decorative, not part of first paint.
  const [loopsStarted, setLoopsStarted] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setTimeout(() => setLoopsStarted(true), 200);
    return () => window.clearTimeout(id);
  }, [reduceMotion]);

  return (
    <div className="relative aspect-[380/260] w-full max-w-[420px]">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          {/*
            userSpaceOnUse with fixed viewBox coordinates, not the default
            objectBoundingBox: objectBoundingBox derives its gradient vector
            from each individual shape's own bounding box, which is
            zero-width for an exactly vertical line (e.g. the Support node
            sits directly below the hub) — that degenerates the gradient
            transform and the stroke silently fails to paint in most
            browsers, even though the line element itself is correct.
          */}
          <linearGradient id="lineGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VIEW_W} y2={VIEW_H}>
            <stop offset="0%" stopColor="#b3e2ff" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#b3e2ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#b3e2ff" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/*
          Connection lines fade in only (opacity, GPU-composited) rather than
          "drawing" via animated `pathLength` — pathLength/stroke-dasharray
          are SVG geometry properties the browser can't hand off to the
          compositor, so 5 of them animating at once were 5 non-composited,
          main-thread-painted animations running right at page load.
        */}
        {satellites.map((node, i) => (
          <motion.line
            key={`line-${i}`}
            x1={node.x}
            y1={node.y}
            x2={HUB.x}
            y2={HUB.y}
            stroke="url(#lineGradient)"
            strokeWidth={1.5}
            strokeDasharray="6 6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {/*
          Traveling data packets: animated via `x`/`y` (CSS transform) rather
          than `cx`/`cy` (SVG attributes) so the browser can run the loop on
          the compositor instead of re-laying-out/painting every frame.
          `cx`/`cy` set the packet's resting position; the transform then
          slides it from there to the hub and back.
        */}
        {!reduceMotion &&
          loopsStarted &&
          satellites.map((node, i) => (
            <motion.circle
              key={`packet-${i}`}
              cx={node.x}
              cy={node.y}
              r={3}
              fill="#b3e2ff"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: [0, HUB.x - node.x],
                y: [0, HUB.y - node.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.8,
                delay: i * 0.35,
                repeat: Infinity,
                repeatDelay: satellites.length * 0.35,
                ease: "easeInOut",
              }}
            />
          ))}

        {/* Hub pulse rings */}
        {!reduceMotion && loopsStarted && (
          <motion.circle
            cx={HUB.x}
            cy={HUB.y}
            r={26}
            fill="none"
            stroke="#b3e2ff"
            strokeWidth={1}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </svg>

      {/*
        Cloud hub — centering lives in Framer Motion's own x/y (not the Tailwind
        -translate-x-1/2 utility): this is a `motion.div` that also animates
        `scale`, and Framer Motion takes over the whole `transform` property via
        inline style once it manages any transform value, silently discarding a
        class-based `transform: translate(...)`. Keeping x/y constant at "-50%"
        alongside the scale keyframes lets Framer Motion compose both into one
        transform instead of one silently overwriting the other.
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute flex h-14 w-14 items-center justify-center rounded-2xl bg-paper-bright text-ink shadow-[0_0_40px_-8px_rgba(255,255,255,0.5)]"
        style={{ left: pct(HUB.x, VIEW_W), top: pct(HUB.y, VIEW_H) }}
      >
        <Cloud className="h-9 w-9" aria-hidden />
      </motion.div>

      {/* Satellite device / concept nodes — same x/y-in-Framer-Motion centering as the hub above. */}
      {satellites.map((node, i) => (
        <motion.div
          key={`node-${i}`}
          initial={{ opacity: 0, scale: 0.6, x: "-50%", y: "-50%" }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
          transition={{ duration: 0.5, delay: node.delay, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel absolute flex h-10 w-10 items-center justify-center rounded-xl text-accent-sky"
          style={{ left: pct(node.x, VIEW_W), top: pct(node.y, VIEW_H) }}
        >
          <node.icon className="h-6 w-6" aria-hidden />
        </motion.div>
      ))}
    </div>
  );
}
