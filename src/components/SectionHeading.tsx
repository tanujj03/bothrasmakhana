"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  align = "center",
  className = "",
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          transformOrigin: align === "center" ? "center" : "left",
        }}
        className={`inline-flex items-center gap-2 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-6 bg-accent-gold" aria-hidden="true" />
        <span className="eyebrow text-xs">{eyebrow}</span>
        {align === "center" && (
          <span className="h-px w-6 bg-accent-gold" aria-hidden="true" />
        )}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="mt-3 font-display text-3xl font-semibold text-text-primary sm:text-4xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
