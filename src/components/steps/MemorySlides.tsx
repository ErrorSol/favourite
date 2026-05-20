"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { MEMORIES } from "@/data/memories";

type MemorySlidesProps = {
  onComplete: () => void;
  onInteract: () => void;
};

const AUTO_MS = 5500; // 5.5s per slide (auto-advance)
const TOTAL = MEMORIES.length;

export function MemorySlides({ onComplete, onInteract }: MemorySlidesProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [segmentProgress, setSegmentProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  const advance = useCallback(() => {
    setIndex((current) => {
      if (current >= TOTAL - 1) {
        onComplete();
        return current;
      }
      setDirection(1);
      return current + 1;
    });
  }, [onComplete]);

  const goPrev = useCallback(() => {
    onInteract();
    setIndex((current) => {
      if (current <= 0) return 0;
      setDirection(-1);
      return current - 1;
    });
  }, [onInteract]);

  const startTimers = useCallback(() => {
    clearTimers();
    setSegmentProgress(0);
    const tick = 50;
    let elapsed = 0;
    progressRef.current = setInterval(() => {
      elapsed += tick;
      setSegmentProgress(Math.min(elapsed / AUTO_MS, 1));
    }, tick);
    timerRef.current = setTimeout(() => {
      advance();
    }, AUTO_MS);
  }, [advance, clearTimers]);

  useEffect(() => {
    startTimers();
    return clearTimers;
  }, [index, startTimers, clearTimers]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    onInteract();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) {
      goPrev();
    } else {
      advance();
    }
  };

  useEffect(() => {
    [1, 2].forEach((offset) => {
      const next = MEMORIES[index + offset];
      if (next) {
        const img = new window.Image();
        img.src = next.src;
      }
    });
  }, [index]);

  const memory = MEMORIES[index];
  const overallProgress = ((index + segmentProgress) / TOTAL) * 100;

  return (
    <div className="absolute inset-0 z-10 flex flex-col">
      <div className="absolute left-0 right-0 top-0 z-30 px-3 pt-3">
        <div className="h-1 overflow-hidden rounded-full bg-white/30">
          <motion.div
            className="h-full rounded-full bg-white/90"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="mt-1.5 text-center text-[10px] font-medium tracking-wide text-white/80">
          {index + 1} / {TOTAL}
        </p>
      </div>

      <div
        className="relative flex-1 cursor-pointer touch-manipulation"
        onClick={handleTap}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          onInteract();
          if (e.key === "ArrowRight") advance();
          if (e.key === "ArrowLeft") goPrev();
        }}
        aria-label="Tap left or right to navigate memories"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image
              src={memory.src}
              alt={memory.quote}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/25" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-24 left-0 right-0 px-6 text-center font-display text-lg leading-snug text-white drop-shadow-lg sm:text-xl"
            >
              {memory.quote}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <p className="pointer-events-none absolute bottom-8 left-0 right-0 text-center text-xs text-white/70">
          Tap left · Tap right
        </p>
      </div>
    </div>
  );
}
