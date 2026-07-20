"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  left: number;
  dx: number;
  dy: number;
  rotate: number;
  size: number;
  delay: number;
  duration: number;
}

const DEFAULT_PARTICLE_COUNT = 32;

function generateParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const fromLeft = i % 2 === 0;
    particles.push({
      id: i,
      left: fromLeft ? 2 + Math.random() * 14 : 84 + Math.random() * 14,
      dx: (fromLeft ? -1 : 1) * (50 + Math.random() * 90),
      dy: -(60 + Math.random() * 140),
      rotate: (Math.random() - 0.5) * 200,
      size: 4 + Math.random() * 4,
      delay: Math.random() * 0.25,
      duration: 0.9 + Math.random() * 0.6,
    });
  }
  return particles;
}

interface ConfettiBurstProps {
  /** Number of particles. Defaults to 32 (WelcomePopup's original density). */
  count?: number;
}

// Shared by WelcomePopup and CartDrawer's coupon success state — anchor a
// `relative` container around wherever this is mounted, it fills that box.
// Renders unclipped (no overflow-hidden here or on the caller's wrapper) so
// the burst reads as a party-popper effect above the surrounding content
// rather than being cut off.
export default function ConfettiBurst({ count = DEFAULT_PARTICLE_COUNT }: ConfettiBurstProps) {
  const particles = useMemo(() => generateParticles(count), [count]);
  // Mounting these a beat after the parent's own entrance (instead of in the
  // same commit) spreads the DOM-creation + animation start-up cost across
  // two frames rather than dumping it all into one — that first frame was
  // otherwise doing backdrop fade-in, box scale-in, and creating every
  // particle's animated element all at once.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return (
    // z-20 lifts this above sibling content with no z-index of its own —
    // without it, being first in DOM order meant an opaque background could
    // paint over the burst instead of it reading as a party-popper effect.
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-accent-gold"
          style={{ left: `${p.left}%`, bottom: 10, width: p.size, height: p.size }}
          initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 1, 0],
            x: p.dx,
            y: p.dy,
            rotate: p.rotate,
            scale: 1,
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
