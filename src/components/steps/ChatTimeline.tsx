"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { CHAT_MESSAGES, TIMELINE } from "@/data/content";

type ChatTimelineProps = {
  onContinue: () => void;
  onInteract: () => void;
};

export function ChatTimeline({ onContinue, onInteract }: ChatTimelineProps) {
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
            className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
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
              transition={{ delay: 0.5 + i * 0.12 }}
              className="flex items-start gap-3"
            >
              <span className="text-2xl">{item.emoji}</span>
              <motion.div>
                <p className="text-sm font-semibold text-purple-900">{item.title}</p>
                <p className="text-xs text-purple-700/80">{item.desc}</p>
              </motion.div>
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
