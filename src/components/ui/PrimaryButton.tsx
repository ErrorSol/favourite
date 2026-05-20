"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

const variants = {
  primary:
    "bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 text-white shadow-lg shadow-pink-200/50",
  secondary:
    "bg-white/50 text-purple-800 border border-white/60 shadow-md",
  danger:
    "bg-gradient-to-r from-amber-300 to-pink-400 text-purple-900 shadow-lg",
};

export function PrimaryButton({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: PrimaryButtonProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      className="flex w-full justify-center"
    >
      <button
        type={type}
        className={`w-full max-w-xs rounded-2xl px-6 py-4 text-base font-semibold transition-colors ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    </motion.div>
  );
}
