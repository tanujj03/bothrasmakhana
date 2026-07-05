"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AddToCartButton({
  onAdd,
  className = "",
  variant = "outline",
}: {
  onAdd: () => void;
  className?: string;
  variant?: "outline" | "solid";
}) {
  const [added, setAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  const base =
    variant === "solid"
      ? "rounded-lg bg-text-primary text-accent-gold hover:bg-text-primary-hover"
      : "rounded-md border border-accent-gold text-accent-gold-strong hover:bg-accent-gold hover:text-bg-base";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={added}
      className={`relative overflow-hidden px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${base} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Added
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="inline-block"
          >
            Add to Cart
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
