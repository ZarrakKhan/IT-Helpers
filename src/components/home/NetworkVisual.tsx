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
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.05" />
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
              fill="#67e8f9"
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
            stroke="#22d3ee"
            strokeWidth={1}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </svg>

      {/* Cloud hub */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-secondary text-white shadow-glow"
        style={{ left: pct(HUB.x, VIEW_W), top: pct(HUB.y, VIEW_H) }}
      >
        <Cloud className="h-7 w-7" aria-hidden />
      </motion.div>

      {/* Satellite device / concept nodes */}
      {satellites.map((node, i) => (
        <motion.div
          key={`node-${i}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: node.delay, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl text-secondary-light"
          style={{ left: pct(node.x, VIEW_W), top: pct(node.y, VIEW_H) }}
        >
          <node.icon className="h-5 w-5" aria-hidden />
        </motion.div>
      ))}
    </div>
  );
}
