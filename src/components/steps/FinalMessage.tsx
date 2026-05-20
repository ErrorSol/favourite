"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TypingText } from "@/components/ui/TypingText";
import { FINAL_MESSAGE } from "@/data/content";

type FinalMessageProps = {
  onContinue: () => void;
  onInteract: () => void;
};

export function FinalMessage({ onContinue, onInteract }: FinalMessageProps) {
  const [showButton, setShowButton] = useState(false);

  return (
    <GlassCard className="w-full max-w-md text-center">
      <TypingText
        text={FINAL_MESSAGE}
        className="text-lg leading-relaxed text-purple-900"
        speed={40}
        onComplete={() => setShowButton(true)}
      />
      {showButton && (
        <div className="mt-8 flex justify-center">
          <PrimaryButton
            onClick={() => {
              onInteract();
              onContinue();
            }}
          >
            One Last Thing →
          </PrimaryButton>
        </div>
      )}
    </GlassCard>
  );
}
