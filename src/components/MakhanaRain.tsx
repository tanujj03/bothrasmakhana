"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface Drop {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  fallDistance: number;
  swayX: number[];
  rotateStart: number;
  rotateEnd: number;
}

const DEFAULT_PARTICLE_COUNT = 70;

function generateDrops(count: number): Drop[] {
  const drops: Drop[] = [];
  for (let i = 0; i < count; i++) {
    const sway = 10 + Math.random() * 18;
    const swaySign = Math.random() < 0.5 ? 1 : -1;
    drops.push({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 7,
      delay: Math.random() * 0.5,
      duration: 1.1 + Math.random() * 0.7,
      fallDistance: 150 + Math.random() * 100,
      swayX: [0, sway * swaySign, sway * -0.4 * swaySign, 0],
      rotateStart: (Math.random() - 0.5) * 60,
      rotateEnd: (Math.random() - 0.5) * 320,
    });
  }
  return drops;
}

interface MakhanaRainProps {
  /** Number of falling particles. Defaults to 70. */
  count?: number;
}

// Coupon-success celebration for CartDrawer: mounted inside a `relative`
// wrapper around the "Coupon Applied" box. Offset above that box so drops
// spawn off its top edge and fall past its bottom edge, reading as makhana
// rain rather than the party-popper burst ConfettiBurst renders elsewhere.
// No overflow-hidden on this element or any ancestor up to the drawer, so
// nothing clips the fall, and z-20 keeps it above sibling content.
export default function MakhanaRain({ count = DEFAULT_PARTICLE_COUNT }: MakhanaRainProps) {
  const drops = useMemo(() => generateDrops(count), [count]);
  // Same two-frame stagger as ConfettiBurst: let the parent's own
  // entrance settle before creating every drop's animated element.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 -top-5 z-20" aria-hidden="true">
      {drops.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: 0,
            width: d.size,
            height: d.size,
            background:
              "radial-gradient(circle at 32% 28%, #fdf6e3 0%, #f1dfa8 45%, #c9973f 100%)",
            boxShadow: "0 1px 2px rgba(120, 78, 20, 0.35)",
          }}
          initial={{ opacity: 0, y: 0, x: 0, rotate: d.rotateStart, scale: 0.6 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: d.fallDistance,
            x: d.swayX,
            rotate: d.rotateEnd,
            scale: 1,
          }}
          transition={{ duration: d.duration, delay: d.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}
