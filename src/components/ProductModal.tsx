"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { PRODUCT_BADGES } from "@/lib/products";
import ProductBadges from "./ProductBadges";
import SizeSelector from "./SizeSelector";
import PriceTag from "./PriceTag";
import AddToCartButton from "./AddToCartButton";
import { useCartStore } from "@/lib/store";
import { DEFAULT_SIZE, type SizeKey } from "@/lib/constants";

export default function ProductModal({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<SizeKey>(DEFAULT_SIZE);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        size,
        name: product.name,
        flavorColor: product.flavorColorVar,
        image: product.image,
      },
      qty
    );
    setTimeout(() => {
      openCart();
      onClose();
      setQty(1);
    }, 900);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[70] bg-text-primary/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            className="fixed left-1/2 top-1/2 z-[70] flex max-h-[85vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-bg-base shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg-base/80 transition-colors duration-200 ease-in-out hover:bg-black/5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <div className="grid flex-1 grid-cols-1 overflow-y-auto sm:grid-cols-2">
              <div className="relative aspect-square w-full bg-bg-secondary">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-10"
                  sizes="(max-width: 640px) 100vw, 400px"
                />
              </div>

              <div className="flex flex-col gap-4 p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: product.flavorColorVar }}
                    aria-hidden="true"
                  />
                  <span className="eyebrow text-xs">{product.tagline}</span>
                </div>
                <h2 className="font-display text-2xl font-semibold text-text-primary">
                  {product.name}
                </h2>
                <p className="text-sm leading-relaxed text-text-primary/70">
                  {product.description}
                </p>

                <ProductBadges badges={PRODUCT_BADGES} />
              </div>
            </div>

            <div className="shrink-0 border-t border-black/10 bg-bg-base p-4 sm:px-8 sm:py-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <SizeSelector value={size} onChange={setSize} />
                  <PriceTag
                    size={size}
                    offerClassName="font-display text-2xl font-semibold text-accent-gold-strong"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 rounded-full border border-black/10 px-2 py-1">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="flex h-8 w-8 items-center justify-center text-lg transition-colors duration-200 ease-in-out hover:text-accent-gold"
                    >
                      −
                    </button>
                    <span className="w-5 text-center">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="flex h-8 w-8 items-center justify-center text-lg transition-colors duration-200 ease-in-out hover:text-accent-gold"
                    >
                      +
                    </button>
                  </div>
                  <AddToCartButton onAdd={handleAdd} variant="solid" />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
