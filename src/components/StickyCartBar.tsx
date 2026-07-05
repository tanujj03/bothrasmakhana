"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCartStore, cartItemCount, cartSubtotal } from "@/lib/store";

export default function StickyCartBar() {
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const count = cartItemCount(items);
  const subtotal = cartSubtotal(items);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-bg-base/95 backdrop-blur-md px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] sm:hidden"
        >
          <button
            onClick={openCart}
            className="flex w-full items-center justify-between rounded-lg bg-text-primary px-4 py-3 text-accent-gold"
          >
            <span className="text-xs font-semibold">
              {count} {count === 1 ? "item" : "items"} · ₹{subtotal}
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider">
              View Cart
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
