"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore, cartSubtotal } from "@/lib/store";
import SizeSelector from "./SizeSelector";
import CheckoutForm from "./CheckoutForm";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const incrementItem = useCartStore((s) => s.incrementItem);
  const decrementItem = useCartStore((s) => s.decrementItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const changeItemSize = useCartStore((s) => s.changeItemSize);
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const subtotal = cartSubtotal(items);

  // Pause the site's ambient background animations (hero floaters/particles,
  // card glows, cursor idle-spin, kenburns zoom) while the drawer covers
  // them — they were competing with typing in the checkout form for frame
  // budget. See globals.css ".overlay-open" and Hero.tsx's own isOpen read.
  useEffect(() => {
    document.body.classList.toggle("overlay-open", isOpen);
    return () => {
      document.body.classList.remove("overlay-open");
    };
  }, [isOpen]);

  const handleClose = () => {
    closeCart();
    setStep("cart");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[60] bg-text-primary/40"
            onClick={handleClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-sm flex-col bg-bg-base shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <h2 className="font-display text-xl font-semibold">
                {step === "cart" ? "Your Cart" : "Checkout"}
              </h2>
              <button
                onClick={handleClose}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 ease-in-out hover:bg-black/5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {step === "cart" ? (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.length === 0 ? (
                    <p className="mt-10 text-center text-sm text-text-primary/60">
                      Your cart is empty.
                    </p>
                  ) : (
                    <ul className="flex flex-col gap-5">
                      {items.map((item) => (
                        <li key={`${item.id}::${item.size}`} className="flex gap-3">
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-bg-secondary">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-1"
                              sizes="80px"
                            />
                          </div>
                          <div className="flex flex-1 flex-col gap-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span
                                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                                  style={{ backgroundColor: item.flavorColor }}
                                  aria-hidden="true"
                                />
                                <span className="font-body text-sm font-semibold leading-tight">
                                  {item.name}
                                </span>
                              </div>
                              <button
                                onClick={() => removeItem(item.id, item.size)}
                                aria-label={`Remove ${item.name}`}
                                className="text-text-primary/40 transition-colors duration-200 ease-in-out hover:text-accent-gold"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                                </svg>
                              </button>
                            </div>

                            <SizeSelector
                              value={item.size}
                              onChange={(newSize) =>
                                changeItemSize(item.id, item.size, newSize)
                              }
                              size="sm"
                            />

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 rounded-full border border-black/10 px-1">
                                <button
                                  onClick={() => decrementItem(item.id, item.size)}
                                  aria-label={`Decrease quantity of ${item.name}`}
                                  className="flex h-6 w-6 items-center justify-center text-sm transition-colors duration-200 ease-in-out hover:text-accent-gold"
                                >
                                  −
                                </button>
                                <span className="w-4 text-center text-sm">{item.qty}</span>
                                <button
                                  onClick={() => incrementItem(item.id, item.size)}
                                  aria-label={`Increase quantity of ${item.name}`}
                                  className="flex h-6 w-6 items-center justify-center text-sm transition-colors duration-200 ease-in-out hover:text-accent-gold"
                                >
                                  +
                                </button>
                              </div>
                              <span className="font-body text-sm font-semibold">
                                ₹{item.qty * item.price}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="border-t border-black/10 px-6 py-5">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-body text-sm font-medium text-text-primary/70">
                        Subtotal
                      </span>
                      <span className="font-display text-lg font-semibold">₹{subtotal}</span>
                    </div>
                    <button
                      onClick={() => setStep("checkout")}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-text-primary px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-accent-gold transition-colors duration-200 ease-in-out hover:bg-text-primary-hover"
                    >
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={clearCart}
                      className="mt-3 w-full text-center text-xs text-text-primary/50 underline-offset-2 transition-colors duration-200 ease-in-out hover:text-accent-gold hover:underline"
                    >
                      Clear Cart
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <CheckoutForm
                  items={items}
                  onBack={() => setStep("cart")}
                  onSubmitted={() => setStep("cart")}
                />
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
