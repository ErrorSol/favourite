"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
};

export function TypingText({
  text,
  speed = 45,
  className = "",
  onComplete,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, onComplete]);

  return (
    <p className={`font-medium leading-relaxed ${className}`}>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="ml-0.5 inline-block"
        >
          |
        </motion.span>
      )}
    </p>
  );
}
