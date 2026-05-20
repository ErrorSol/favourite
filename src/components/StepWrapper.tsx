"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

type StepWrapperProps = {
  stepKey: number;
  children: ReactNode;
};

export function StepWrapper({ stepKey, children }: StepWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative z-10 flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-5 py-8"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
