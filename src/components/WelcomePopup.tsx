"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { LAUNCH_OFFER_TEXT, PRICING, DEFAULT_SIZE } from "@/lib/constants";

const SHOW_DELAY = 1800;

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

const PARTICLE_COUNT = 32;

function generateParticles(): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
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

function ConfettiBurst() {
  const particles = useMemo(() => generateParticles(), []);
  // Mounting these a beat after the backdrop/popup box's own entrance
  // (instead of in the same commit) spreads the DOM-creation + animation
  // start-up cost across two frames rather than dumping it all into one —
  // that first frame was otherwise doing backdrop fade-in, popup scale-in,
  // and creating every particle's animated element all at once.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return (
    // z-20 lifts this above the dialog box below (a sibling with no z-index
    // of its own) — without it, being first in DOM order meant the dialog's
    // opaque background painted over the burst instead of it reading as a
    // party-popper effect in front of the popup.
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

export default function WelcomePopup() {
  const [show, setShow] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only feature detection, no re-render loop
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const timer = setTimeout(() => {
      setShow(true);
    }, SHOW_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const close = () => setShow(false);

  const handleShopNow = () => {
    close();
    if (pathname === "/") {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/shop");
    }
  };

  const size = DEFAULT_SIZE;
  const { mrp, offer } = PRICING[size];

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[10000] bg-text-primary/60"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 z-[10000] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2"
          >
            {!reduceMotion && <ConfettiBurst />}

            <div
              role="dialog"
              aria-modal="true"
              aria-label="Welcome offer"
              className="relative overflow-hidden rounded-2xl border border-accent-gold/30 bg-bg-base p-8 text-center shadow-2xl sm:p-10"
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-text-primary/50 transition-colors duration-200 ease-in-out hover:bg-black/5 hover:text-text-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>

              <Logo size={64} className="mx-auto" />

              <span className="eyebrow mt-5 block text-xs">Launch Offer</span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-text-primary">
                Welcome to BOTHRA&apos;S SNACKS
              </h2>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-text-primary/70">
                {LAUNCH_OFFER_TEXT}. Every flavor starts at{" "}
                <span className="font-semibold text-accent-gold-strong">
                  ₹{offer}
                </span>{" "}
                <span className="line-through">₹{mrp}</span> — roasted, not
                fried, and yours before the offer closes.
              </p>

              <button
                onClick={handleShopNow}
                className="mt-7 w-full rounded-lg bg-text-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-accent-gold transition-colors duration-200 ease-in-out hover:bg-text-primary-hover"
              >
                Shop Now
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
