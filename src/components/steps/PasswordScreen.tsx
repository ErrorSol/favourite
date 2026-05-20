"use client";

import { FormEvent, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import {
  PASSWORD,
  WRONG_PASSWORD_MESSAGES,
} from "@/data/content";
import { fireConfetti } from "@/lib/confetti";

type PasswordScreenProps = {
  onSuccess: () => void;
  onInteract: () => void;
};

export function PasswordScreen({ onSuccess, onInteract }: PasswordScreenProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onInteract();
    if (value.trim().toLowerCase() === PASSWORD.toLowerCase()) {
      fireConfetti("light");
      setError(null);
      setTimeout(onSuccess, 600);
    } else {
      setShaking(true);
      setError(
        WRONG_PASSWORD_MESSAGES[
          Math.floor(Math.random() * WRONG_PASSWORD_MESSAGES.length)
        ]
      );
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <GlassCard
      className={`w-full max-w-sm text-center ${shaking ? "animate-shake" : ""}`}
    >
      <p className="mb-2 font-display text-3xl text-purple-800">🎁</p>
      <h1 className="mb-6 font-display text-2xl text-purple-900">
        Secret Surprise
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <label htmlFor="password" className="sr-only">
          Enter the secret word
        </label>
        <input
          id="password"
          type="password"
          autoComplete="off"
          placeholder="Enter the secret word 🎁"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          className="w-full rounded-2xl border border-white/60 bg-white/50 px-4 py-3 text-center text-purple-900 placeholder:text-purple-400/80 outline-none focus:ring-2 focus:ring-pink-300"
        />
        {error && (
          <p className="text-sm font-medium text-pink-600" role="alert">
            {error}
          </p>
        )}
        <PrimaryButton type="submit">Unlock ✨</PrimaryButton>
      </form>
    </GlassCard>
  );
}
