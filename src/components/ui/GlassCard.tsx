"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`rounded-3xl border border-white/60 bg-white/35 p-6 shadow-2xl shadow-pink-200/40 backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
