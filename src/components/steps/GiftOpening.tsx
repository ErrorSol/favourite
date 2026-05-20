"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { fireConfetti } from "@/lib/confetti";
import { playGiftSound } from "@/lib/sounds";

type GiftOpeningProps = {
  onOpen: () => void;
  onInteract: () => void;
};

export function GiftOpening({ onOpen, onInteract }: GiftOpeningProps) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    onInteract();
    setOpened(true);
    playGiftSound();
    fireConfetti("burst");
    setTimeout(onOpen, 1400);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative h-48 w-48">
        <motion.div
          className="absolute left-1/2 top-0 z-20 h-14 w-40 -translate-x-1/2 rounded-t-xl bg-gradient-to-b from-pink-400 to-pink-500 shadow-lg"
          animate={
            opened
              ? { y: -80, rotate: -25, opacity: 0.9 }
              : { y: 0, rotate: 0 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="absolute -top-6 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-amber-300 shadow-md"
            animate={opened ? { scale: 1.2 } : { scale: 1 }}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-1/2 h-32 w-44 -translate-x-1/2 rounded-b-2xl rounded-t-sm bg-gradient-to-b from-purple-400 to-violet-500 shadow-xl"
          animate={opened ? { scale: [1, 1.05, 1] } : {}}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-5xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={
              opened ? { opacity: 1, scale: 1, y: -20 } : { opacity: 0 }
            }
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            🎂✨
          </motion.div>
          <div
            className="absolute left-0 top-1/2 h-full w-5 -translate-y-1/2 bg-white/20"
            aria-hidden
          />
          <div
            className="absolute right-0 top-1/2 h-full w-5 -translate-y-1/2 bg-white/20"
            aria-hidden
          />
        </motion.div>
      </div>

      {!opened && (
        <PrimaryButton onClick={handleOpen}>Open your gift 🎂</PrimaryButton>
      )}
      {opened && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-semibold text-purple-800"
        >
          Surprise! 🎉
        </motion.p>
      )}
    </motion.div>
  );
}
