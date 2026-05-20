"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TypingText } from "@/components/ui/TypingText";
import { INTRO_LINES } from "@/data/content";

type IntroMessageProps = {
  onContinue: () => void;
  onInteract: () => void;
};

export function IntroMessage({ onContinue, onInteract }: IntroMessageProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  return (
    <GlassCard className="w-full max-w-md text-center">
      <div className="min-h-[8rem] space-y-4">
        {INTRO_LINES.slice(0, lineIndex).map((line, i) => (
          <p key={i} className="text-lg text-purple-900">
            {line}
          </p>
        ))}
        {lineIndex < INTRO_LINES.length && (
          <TypingText
            key={lineIndex}
            text={INTRO_LINES[lineIndex]}
            className="text-lg text-purple-900"
            onComplete={() => {
              if (lineIndex < INTRO_LINES.length - 1) {
                setTimeout(() => setLineIndex((i) => i + 1), 500);
              } else {
                setShowButton(true);
              }
            }}
          />
        )}
      </div>
      {showButton && (
        <div className="mt-8 flex justify-center">
          <PrimaryButton
            onClick={() => {
              onInteract();
              onContinue();
            }}
          >
            Continue →
          </PrimaryButton>
        </div>
      )}
    </GlassCard>
  );
}
