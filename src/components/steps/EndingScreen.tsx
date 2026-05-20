"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { fireConfetti } from "@/lib/confetti";

type EndingScreenProps = {
  onReplay: () => void;
};

export function EndingScreen({ onReplay }: EndingScreenProps) {
  useEffect(() => {
    fireConfetti("burst");
    const t = setTimeout(() => fireConfetti("burst"), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center gap-8 text-center"
    >
      <motion.h1
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="font-display text-5xl text-purple-900 drop-shadow-sm sm:text-6xl"
      >
        Happy Birthday 🎂
      </motion.h1>
      <p className="max-w-xs text-lg text-purple-800/90">
        You mean the world to me. Today and always 💛
      </p>
      <PrimaryButton variant="secondary" onClick={onReplay}>
        Replay 🔁
      </PrimaryButton>
    </motion.div>
  );
}
