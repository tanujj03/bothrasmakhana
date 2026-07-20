"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore, cartSubtotal, cartDiscount } from "@/lib/store";
import SizeSelector from "./SizeSelector";
import CheckoutForm from "./CheckoutForm";
import MakhanaRain from "./MakhanaRain";

const COUPON_RAIN_DURATION_MS = 1800;

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const incrementItem = useCartStore((s) => s.incrementItem);
  const decrementItem = useCartStore((s) => s.decrementItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const changeItemSize = useCartStore((s) => s.changeItemSize);
  const clearCart = useCartStore((s) => s.clearCart);
  const couponCode = useCartStore((s) => s.couponCode);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const clearCoupon = useCartStore((s) => s.clearCoupon);

  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [showCouponRain, setShowCouponRain] = useState(false);
  const [couponRainKey, setCouponRainKey] = useState(0);
  const couponRainTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subtotal = cartSubtotal(items);
  const discount = cartDiscount(items, couponCode);
  const total = subtotal - discount;

  useEffect(() => {
    return () => {
      if (couponRainTimeoutRef.current) clearTimeout(couponRainTimeoutRef.current);
    };
  }, []);

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      setCouponError("Enter a coupon code");
      return;
    }
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponError(null);
      setCouponInput("");
      setCouponRainKey((k) => k + 1);
      setShowCouponRain(true);
      if (couponRainTimeoutRef.current) clearTimeout(couponRainTimeoutRef.current);
      couponRainTimeoutRef.current = setTimeout(
        () => setShowCouponRain(false),
        COUPON_RAIN_DURATION_MS
      );
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    clearCoupon();
    setCouponError(null);
    setCouponInput("");
  };

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
                  <div className="border-t border-black/10 px-6 pb-5 pt-5">
                    <div className="mb-5">
                      {couponCode ? (
                        <div className="relative">
                          {/* Sibling of the bordered box below, not a child of it —
                              mirrors WelcomePopup's structure so the rain renders
                              fully visible above/around the box instead of being
                              clipped by it. Neither this wrapper nor any ancestor
                              up to the drawer itself sets overflow, and the
                              scrollable item list is a sibling (not a parent) of
                              this footer section, so nothing clips the rain. */}
                          {showCouponRain && <MakhanaRain key={couponRainKey} count={70} />}
                          <div className="flex items-center justify-between gap-3 rounded-xl border border-accent-gold/50 bg-gradient-to-r from-accent-gold/15 via-accent-gold/5 to-transparent px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-gold text-bg-base">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                              <span className="font-body text-xs font-semibold text-text-primary">
                                Coupon Applied
                              </span>
                            </div>
                            <button
                              onClick={handleRemoveCoupon}
                              className="shrink-0 font-body text-[11px] font-medium text-text-primary/45 underline-offset-2 transition-colors duration-200 ease-in-out hover:text-flavor-periperi hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex gap-2">
                            <input
                              value={couponInput}
                              onChange={(e) => {
                                setCouponInput(e.target.value);
                                setCouponError(null);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleApplyCoupon();
                                }
                              }}
                              placeholder="Enter coupon code"
                              aria-label="Coupon code"
                              className="min-w-0 flex-1 rounded-lg border border-black/10 bg-bg-base px-3.5 py-2.5 text-sm outline-none transition-all duration-200 focus:border-accent-gold focus:shadow-[0_0_0_3px_rgba(184,137,46,0.18)]"
                            />
                            <button
                              onClick={handleApplyCoupon}
                              className="shrink-0 rounded-lg bg-text-primary px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-accent-gold transition-colors duration-200 ease-in-out hover:bg-text-primary-hover"
                            >
                              Apply
                            </button>
                          </div>
                          {couponError && (
                            <p className="mt-2 flex items-center gap-1.5 font-body text-[11px] font-medium text-flavor-periperi/80">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
                              </svg>
                              {couponError}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="font-body text-sm font-medium text-text-primary/70">
                        Subtotal
                      </span>
                      <span className="font-body text-sm">₹{subtotal}</span>
                    </div>
                    {couponCode && (
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="font-body text-sm font-medium text-accent-gold-strong">
                          Coupon Discount
                        </span>
                        <span className="font-body text-sm font-semibold text-accent-gold-strong">
                          -₹{discount}
                        </span>
                      </div>
                    )}
                    <div className="mb-4 flex items-center justify-between border-t border-black/10 pt-2.5">
                      <span className="font-body text-sm font-medium text-text-primary/70">
                        Total
                      </span>
                      <span className="font-display text-lg font-semibold">₹{total}</span>
                    </div>
                    <div className="mb-4 flex items-center gap-1.5 text-xs font-semibold text-accent-gold-strong">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="M3 16V6a1 1 0 011-1h9v11M3 16h1m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m9 0a2 2 0 104 0m-4 0a2 2 0 114 0m-9 0h9m0 0h2.5a1 1 0 00.9-.55L21 11h-8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Free Delivery on this order
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
