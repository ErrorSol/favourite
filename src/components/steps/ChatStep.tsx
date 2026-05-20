"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { CHAT_MESSAGES } from "@/data/content";

type ChatStepProps = {
  onContinue: () => void;
  onInteract: () => void;
};

export function ChatStep({ onContinue, onInteract }: ChatStepProps) {
  return (
    <div className="flex h-full w-full max-w-md flex-col gap-4 overflow-hidden">
      <GlassCard className="flex flex-col gap-2 p-3">
        <p className="text-center text-xs font-semibold text-purple-600">
          💬 Our chats
        </p>
        {CHAT_MESSAGES.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`flex ${
              msg.from === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-xs sm:text-sm ${
                msg.from === "me"
                  ? "rounded-br-sm bg-[#DCF8C6] text-gray-800"
                  : "rounded-bl-sm bg-white text-gray-800 shadow-sm"
              }`}
            >
              {msg.text}
            </span>
          </motion.div>
        ))}
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

