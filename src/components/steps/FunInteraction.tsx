"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { FUN_POPUP_TEXT } from "@/data/content";

type FunInteractionProps = {
  onContinue: () => void;
  onInteract: () => void;
};

export function FunInteraction({ onContinue, onInteract }: FunInteractionProps) {
  const [showPopup, setShowPopup] = useState(false);

  const handleChoice = () => {
    onInteract();
    setShowPopup(true);
  };

  return (
    <>
      <GlassCard className="w-full max-w-sm text-center">
        <h2 className="mb-8 text-xl font-semibold text-purple-900">
          Who is the better friend?
        </h2>
        <div className="flex flex-col gap-3">
          <PrimaryButton onClick={handleChoice}>Me 😎</PrimaryButton>
          <PrimaryButton variant="secondary" onClick={handleChoice}>
            Me 😎
          </PrimaryButton>
        </div>
      </GlassCard>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="w-full max-w-xs rounded-3xl border border-white/50 bg-white/90 p-8 text-center shadow-2xl"
            >
              <p className="mb-6 text-2xl font-bold text-purple-900">
                {FUN_POPUP_TEXT}
              </p>
              <PrimaryButton
                onClick={() => {
                  onInteract();
                  onContinue();
                }}
              >
                Continue →
              </PrimaryButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
