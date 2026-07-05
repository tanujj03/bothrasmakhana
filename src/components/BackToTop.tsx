"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore, cartItemCount } from "@/lib/store";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const items = useCartStore((s) => s.items);
  const count = cartItemCount(items);

  useEffect(() => {
    // rAF-gated + passive, same reasoning as Navbar's scroll listener: avoid
    // running a state check on every raw scroll event.
    let ticking = false;
    const evaluate = () => {
      setVisible(window.scrollY > 500);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          // Bottom offset is pushed up past the floating WhatsApp/Instagram
          // stack (FloatingContactButtons — 2 buttons + gap ≈ 108px, plus a
          // 12px breathing gap) on top of that pair's own existing
          // mobile-cart-bar clearance, so all three floating controls stack
          // cleanly instead of overlapping.
          className={`fixed right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-accent-gold/40 bg-bg-base/90 text-accent-gold-strong shadow-md backdrop-blur-sm transition-[color,background-color,bottom] duration-200 ease-in-out hover:bg-accent-gold hover:text-bg-base sm:right-6 ${
            count > 0 ? "bottom-[216px] sm:bottom-[144px]" : "bottom-[144px]"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
