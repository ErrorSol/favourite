"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const EMOJIS = ["🎂", "🎈", "🎆", "🌸", "☕", "🧋", "🍫", "👗", "🎀", "🐾"];

type FloatingItem = {
  id: number;
  emoji: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  glow: boolean;
  upward: boolean;
  rotate: boolean;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function FloatingElements() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const items = useMemo<FloatingItem[]>(() => {
    const count = 14;
    return Array.from({ length: count }, (_, i) => {
      const emoji = EMOJIS[i % EMOJIS.length];
      const upward = emoji === "🎈" || emoji === "🎆";
      const rotate = emoji === "👗";
      return {
        id: i,
        emoji,
        left: randomBetween(4, 92),
        top: randomBetween(8, 88),
        size: randomBetween(1.4, 2.4),
        duration: randomBetween(14, 26),
        delay: randomBetween(0, 6),
        glow: emoji === "🎆" || emoji === "🎈" || emoji === "🌸",
        upward,
        rotate,
      };
    });
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {items.map((item) => (
        <motion.span
          key={item.id}
          className={`absolute select-none blur-[0.5px] ${
            item.glow
              ? "drop-shadow-[0_0_12px_rgba(255,182,213,0.6)]"
              : ""
          }`}
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: `${item.size}rem`,
          }}
          initial={{ opacity: 0.1 }}
          animate={{
            opacity: [0.12, 0.28, 0.15, 0.25, 0.12],
            x: [0, randomBetween(-30, 30), randomBetween(-20, 20), 0],
            y: item.upward
              ? [0, -40, -80, -50, 0]
              : [0, randomBetween(-25, 25), randomBetween(-15, 15), 0],
            rotate: item.rotate ? [0, 15, -15, 10, 0] : [0, 5, -5, 0],
            scale: [1, 1.08, 0.95, 1.05, 1],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.span>
      ))}
    </motion.div>
  );
}
