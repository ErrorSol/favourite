"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SECRET_MEMORY } from "@/data/content";

type SecretButtonProps = {
  onContinue: () => void;
  onInteract: () => void;
};

export function SecretButton({ onContinue, onInteract }: SecretButtonProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      {!revealed ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            onInteract();
            setRevealed(true);
          }}
          className="rounded-2xl border-2 border-dashed border-pink-400/60 bg-white/30 px-8 py-4 text-lg font-semibold text-purple-800 shadow-lg backdrop-blur-md"
        >
          Don&apos;t click this 😏
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="w-full max-w-sm rounded-3xl border border-white/50 bg-gradient-to-br from-pink-200/80 via-purple-200/80 to-amber-100/80 p-8 text-center shadow-2xl backdrop-blur-xl"
          >
            <motion.p
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: 3, duration: 0.4 }}
              className="mb-2 text-3xl"
            >
              👀
            </motion.p>
            <h3 className="mb-3 font-display text-xl text-purple-900">
              {SECRET_MEMORY.title}
            </h3>
            <p className="mb-6 text-purple-800">{SECRET_MEMORY.text}</p>
            <PrimaryButton
              onClick={() => {
                onInteract();
                onContinue();
              }}
            >
              Continue →
            </PrimaryButton>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
