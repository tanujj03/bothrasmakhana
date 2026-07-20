"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import ConfettiBurst from "./ConfettiBurst";
import { LAUNCH_OFFER_TEXT, PRICING, DEFAULT_SIZE } from "@/lib/constants";
import { useUIStore } from "@/lib/uiStore";

const SHOW_DELAY = 1800;

export default function WelcomePopup() {
  const [show, setShow] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const setWelcomePopupOpen = useUIStore((state) => state.setWelcomePopupOpen);

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

  // Lets CookieConsentBanner fully hide itself while this popup is open,
  // instead of the two fixed-position overlays fighting over z-index.
  useEffect(() => {
    setWelcomePopupOpen(show);
    return () => setWelcomePopupOpen(false);
  }, [show, setWelcomePopupOpen]);

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
