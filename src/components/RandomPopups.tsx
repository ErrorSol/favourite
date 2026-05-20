"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RANDOM_POPUPS } from "@/data/content";

type RandomPopupsProps = {
  active: boolean;
};

export function RandomPopups({ active }: RandomPopupsProps) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;

    const showRandom = () => {
      const text =
        RANDOM_POPUPS[Math.floor(Math.random() * RANDOM_POPUPS.length)];
      setMessage(text);
      setTimeout(() => setMessage(null), 2800);
    };

    const first = setTimeout(showRandom, 8000);
    const interval = setInterval(showRandom, 14000 + Math.random() * 8000);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [active]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="pointer-events-none fixed bottom-24 left-1/2 z-50 max-w-[85vw] -translate-x-1/2 rounded-2xl border border-white/50 bg-white/40 px-5 py-3 text-center text-sm font-semibold text-purple-900 shadow-lg backdrop-blur-lg"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
