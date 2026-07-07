"use client";

import { motion, Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className = "",
  stagger = 0.12,
  immediate = false,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  // For a grid that sits high enough on the page that it's often already
  // partially below the fold on mobile (e.g. right after a full-height
  // hero): `whileInView`'s viewport check needs 20% of the grid actually
  // scrolled into view before it fires, which reads as a stuck blank gap
  // rather than a reveal animation. `immediate` swaps the trigger to
  // `animate` so it plays once on mount instead, like the hero's own
  // entrance animations.
  immediate?: boolean;
}) {
  const trigger = immediate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, amount: 0.2 } };
  return (
    <motion.div
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={variants} transition={{ duration: 0.6, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
