"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

type VideoStepProps = {
  onContinue: () => void;
  onInteract: () => void;
};

export function VideoStep({ onContinue, onInteract }: VideoStepProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = async () => {
    onInteract();
    const v = videoRef.current;
    if (!v) return;
    if (!v.paused) {
      v.pause();
      return;
    }
    try {
      await v.play();
    } catch {
      // autoplay restrictions or blocked play; controls still available
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      <GlassCard className="w-full p-4 text-center">
        <h2 className="mb-3 font-display text-2xl text-purple-950">
          One Last Thing 💗
        </h2>

        <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-black/30 shadow-xl">
          <video
            ref={videoRef}
            className="aspect-[9/16] w-full object-cover"
            src="/video/one-last-thing.mp4"
            playsInline
            preload="metadata"
            controls
            onPlay={() => onInteract()}
          />

          {!playing && (
            <motion.button
              type="button"
              onClick={togglePlay}
              whileTap={{ scale: 0.96 }}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/35 via-black/10 to-transparent"
              aria-label="Play video"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/60 bg-white/30 text-2xl backdrop-blur-md">
                ▶️
              </span>
            </motion.button>
          )}
        </div>

        <p className="mt-3 text-sm font-medium text-purple-900/90">
          (Agar Song ki voice jyda ho toh usko rok ke video dekh lena..)
        </p>
      </GlassCard>

      <PrimaryButton
        onClick={() => {
          onInteract();
          onContinue();
        }}
      >
        Continue →
      </PrimaryButton>
    </div>
  );
}

