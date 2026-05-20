"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type CatParadeProps = {
  active: boolean;
};

const CATS = [
  { src: "/cats/persian-1.svg", alt: "Cute Persian cat" },
  { src: "/cats/persian-2.svg", alt: "Cute Persian cat with bow" },
  { src: "/cats/persian-3.svg", alt: "Cute sleepy Persian cat" },
];

export function CatParade({ active }: CatParadeProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!active) return;
    // start a little after interaction, then occasionally show
    const t1 = setTimeout(() => setShow(true), 4500);
    const interval = setInterval(() => {
      setShow(true);
      setTimeout(() => setShow(false), 6000);
    }, 16000);
    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, [active]);

  const cats = useMemo(() => {
    const baseLeft = [-30, -55, -80];
    return CATS.map((c, i) => ({
      ...c,
      startX: baseLeft[i % baseLeft.length],
      delay: 0.2 + i * 0.35,
      scale: 0.9 + i * 0.07,
      y: i === 1 ? 4 : i === 2 ? 10 : 0,
    }));
  }, []);

  if (!active) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-20 h-28 overflow-hidden"
    >
      {show &&
        cats.map((cat, i) => (
          <motion.div
            key={cat.src}
            initial={{ x: `${cat.startX}vw`, opacity: 0 }}
            animate={{
              x: ["-30vw", "120vw"],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: 9,
              delay: cat.delay,
              ease: "easeInOut",
            }}
            className="absolute bottom-1"
            style={{ left: 0, transform: `translateY(${cat.y}px)` }}
          >
            <motion.div
              animate={{
                y: [0, -3, 0],
                rotate: [0, i === 1 ? 1.5 : -1.2, 0],
              }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              className="drop-shadow-[0_8px_18px_rgba(255,105,180,0.25)]"
              style={{ scale: cat.scale }}
            >
              <Image
                src={cat.src}
                alt={cat.alt}
                width={120}
                height={98}
                priority={false}
              />
            </motion.div>
          </motion.div>
        ))}

      {/* subtle pink ground haze */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-pink-200/70 to-transparent" />
    </div>
  );
}

