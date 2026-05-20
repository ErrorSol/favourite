"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TIMELINE } from "@/data/content";

type TimelineStepProps = {
  onContinue: () => void;
  onInteract: () => void;
};

export function TimelineStep({ onContinue, onInteract }: TimelineStepProps) {
  return (
    <div className="flex h-full w-full max-w-md flex-col gap-4 overflow-hidden">
      <GlassCard className="p-4">
        <p className="mb-3 text-center text-xs font-semibold text-purple-600">
          📍 Our timeline
        </p>
        <div className="space-y-3">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              className="flex items-start gap-3"
            >
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-purple-900">
                  {item.title}
                </p>
                <p className="text-xs text-purple-700/80">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <div className="flex justify-center pb-2">
        <PrimaryButton
          onClick={() => {
            onInteract();
            onContinue();
          }}
        >
          Continue →
        </PrimaryButton>
      </div>
    </div>
  );
}

