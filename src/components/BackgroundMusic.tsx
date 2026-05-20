"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type BackgroundMusicProps = {
  enabled: boolean;
  useLastTrack?: boolean;
};

export function BackgroundMusic({
  enabled,
  useLastTrack = false,
}: BackgroundMusicProps) {
  const softAudioRef = useRef<HTMLAudioElement>(null);
  const lastAudioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [softAvailable, setSoftAvailable] = useState(true);
  const [lastAvailable, setLastAvailable] = useState(true);

  const activeAudioRef = useLastTrack ? lastAudioRef : softAudioRef;
  const activeAvailable = useLastTrack ? lastAvailable : softAvailable;

  useEffect(() => {
    const soft = softAudioRef.current;
    const last = lastAudioRef.current;
    if (!soft || !last) return;
    soft.volume = 0.35;
    last.volume = 0.42;
  }, []);

  useEffect(() => {
    const soft = softAudioRef.current;
    const last = lastAudioRef.current;
    const active = activeAudioRef.current;
    const inactive = useLastTrack ? soft : last;
    if (!soft || !last || !active || !inactive) return;

    inactive.pause();
    inactive.currentTime = 0;

    if (!enabled || !activeAvailable) {
      active.pause();
      setPlaying(false);
      return;
    }

    active
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [enabled, useLastTrack, activeAvailable, activeAudioRef]);

  const toggle = async () => {
    const audio = activeAudioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <>
      <audio
        ref={softAudioRef}
        loop
        preload="none"
        src="/music/soft-instrumental.mp3"
        onError={() => setSoftAvailable(false)}
      />
      <audio
        ref={lastAudioRef}
        loop
        preload="none"
        src="/music/last-song.mp3"
        onError={() => setLastAvailable(false)}
      />
      {enabled && activeAvailable && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          type="button"
          onClick={toggle}
          className="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/30 text-lg shadow-lg backdrop-blur-md"
          aria-label={playing ? "Pause music" : "Play music"}
        >
          {playing ? "⏸️" : "▶️"}
        </motion.button>
      )}
    </>
  );
}
