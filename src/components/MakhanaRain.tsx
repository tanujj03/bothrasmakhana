"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// Same 5 close-up grain photos Hero.tsx uses for its ambient floaters — shot
// on a white square, not alpha-transparent, so `mix-blend-multiply` is what
// drops the white background out against the drawer's cream bg-base rather
// than object-fit cropping (which would just show white corners).
const PARTICLE_IMAGES = [
  "/products/makhana1.png",
  "/products/makhana2.png",
  "/products/makhana3.png",
  "/products/makhana4.png",
  "/products/makhana5.png",
];

interface Drop {
  id: number;
  image: string;
  left: number;
  size: number;
  delay: number;
  duration: number;
  startVh: number;
  endVh: number;
  swayX: number[];
  rotateStart: number;
  rotateEnd: number;
}

const DEFAULT_PARTICLE_COUNT = 180;

function generateDrops(count: number): Drop[] {
  const drops: Drop[] = [];
  for (let i = 0; i < count; i++) {
    const sway = 10 + Math.random() * 22;
    const swaySign = Math.random() < 0.5 ? 1 : -1;
    drops.push({
      id: i,
      image: PARTICLE_IMAGES[Math.floor(Math.random() * PARTICLE_IMAGES.length)],
      left: Math.random() * 100,
      size: 20 + Math.random() * 16,
      delay: Math.random() * 0.7,
      duration: 1.3 + Math.random() * 0.9,
      // vh (not px) so the fall spans the drawer's actual height on any
      // screen: spawn a few vh above the drawer's top edge — behind/above
      // the "Your Cart" header — and land comfortably past its bottom.
      startVh: -(2 + Math.random() * 8),
      endVh: 95 + Math.random() * 30,
      swayX: [0, sway * swaySign, sway * -0.4 * swaySign, 0],
      rotateStart: (Math.random() - 0.5) * 60,
      rotateEnd: (Math.random() - 0.5) * 360,
    });
  }
  return drops;
}

interface MakhanaRainProps {
  /** Number of falling particles. Defaults to 180. */
  count?: number;
}

// Coupon-success celebration for CartDrawer: mounted as a full-bleed overlay
// directly inside the drawer's <motion.aside> — a sibling of the header and
// scrollable item list, not nested inside the item list's overflow-y-auto
// box, which would otherwise clip the fall. `fixed`-positioned aside is
// itself a containing block, so this absolute overlay spans the whole
// drawer without needing its own `relative` wrapper.
export default function MakhanaRain({ count = DEFAULT_PARTICLE_COUNT }: MakhanaRainProps) {
  const drops = useMemo(() => generateDrops(count), [count]);
  // Same two-frame stagger as the burst effect this replaced: let the
  // parent's own entrance settle before creating every drop's element.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
      {drops.map((d) => (
        <motion.img
          key={d.id}
          src={d.image}
          alt=""
          className="absolute mix-blend-multiply"
          style={{ left: `${d.left}%`, top: 0, width: d.size, height: d.size }}
          initial={{ opacity: 0, y: `${d.startVh}vh`, x: 0, rotate: d.rotateStart, scale: 0.7 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: `${d.endVh}vh`,
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
