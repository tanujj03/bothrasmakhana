"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PRICING, type SizeKey } from "@/lib/constants";

export default function PriceTag({
  size,
  className = "",
  offerClassName = "font-display text-lg font-semibold text-accent-gold-strong",
}: {
  size: SizeKey;
  className?: string;
  offerClassName?: string;
}) {
  const { mrp, offer } = PRICING[size];

  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={size}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className={offerClassName}
        >
          ₹{offer}
        </motion.span>
      </AnimatePresence>
      <span className="text-sm text-text-primary/40 line-through">
        ₹{mrp}
      </span>
    </span>
  );
}
