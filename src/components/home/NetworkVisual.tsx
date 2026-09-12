"use client";

import { motion } from "framer-motion";

const nodes = [
  { x: 60, y: 60, delay: 0 },
  { x: 260, y: 40, delay: 0.4 },
  { x: 340, y: 160, delay: 0.8 },
  { x: 180, y: 220, delay: 1.2 },
  { x: 40, y: 180, delay: 0.2 },
  { x: 220, y: 130, delay: 0.6 }, // hub
];

const edges: [number, number][] = [
  [0, 5],
  [1, 5],
  [2, 5],
  [3, 5],
  [4, 5],
];

/**
 * Decorative animated network diagram — cloud/device connections. Purely
 * presentational (aria-hidden); safe to remove or restyle when rebranding.
 */
export function NetworkVisual() {
  return (
    <svg
      viewBox="0 0 380 260"
      fill="none"
      aria-hidden="true"
      className="h-full w-full max-w-[420px]"
    >
      {edges.map(([from, to], i) => {
        const a = nodes[from];
        const b = nodes[to];
        return (
          <motion.line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#lineGradient)"
            strokeWidth={1.5}
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}

      {nodes.map((node, i) => (
        <g key={i}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={i === 5 ? 16 : 9}
            fill={i === 5 ? "#0891b2" : "#0f172a"}
            stroke="#22d3ee"
            strokeWidth={1.5}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: node.delay, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={i === 5 ? 16 : 9}
            fill="none"
            stroke="#22d3ee"
            strokeWidth={1}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{
              duration: 2.4,
              delay: node.delay + 0.6,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </g>
      ))}

      <defs>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
