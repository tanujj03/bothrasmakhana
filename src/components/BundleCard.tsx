"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { PRODUCTS } from "@/lib/products";
import { PRICING, DEFAULT_SIZE } from "@/lib/constants";
import AddToCartButton from "./AddToCartButton";
import ProductBadges from "./ProductBadges";
import { useCartStore } from "@/lib/store";

const BUNDLE_SIZE = DEFAULT_SIZE;
const BUNDLE_DISCOUNT = 0.1;
const INDIVIDUAL_TOTAL = PRODUCTS.length * PRICING[BUNDLE_SIZE].offer;
const BUNDLE_PRICE = Math.round(INDIVIDUAL_TOTAL * (1 - BUNDLE_DISCOUNT));

const cardStyle = {
  "--card-glow-color": "color-mix(in srgb, var(--accent-gold) 55%, transparent)",
} as React.CSSProperties;

// One hard-edged segment per flavor, in equal 72deg arcs, so the border reads
// as 5 distinct colors going around the card rather than a blended ring.
const BUNDLE_BORDER_GRADIENT =
  "conic-gradient(var(--flavor-periperi) 0deg 72deg, var(--flavor-classic) 72deg 144deg, var(--flavor-pudina) 144deg 216deg, var(--flavor-chatmasala) 216deg 288deg, var(--flavor-turmeric) 288deg 360deg)";

export default function BundleCard() {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  // See ProductCard.tsx for why this is gated on visibility — same
  // always-on idle-glow layer, same fix.
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { margin: "200px 0px" });

  const handleAddToCart = () => {
    const base = Math.floor(BUNDLE_PRICE / PRODUCTS.length);
    const remainder = BUNDLE_PRICE - base * PRODUCTS.length;

    PRODUCTS.forEach((product, i) => {
      addItem({
        id: product.id,
        size: BUNDLE_SIZE,
        name: product.name,
        flavorColor: product.flavorColorVar,
        image: product.image,
        price: base + (i === 0 ? remainder : 0),
      });
    });
    openCart();
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={cardStyle}
      className="group relative"
    >
      <div
        className="card-flavor-glow-layer"
        style={{ animationPlayState: inView ? "running" : "paused" }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 rounded-xl p-[4.5px]"
        style={{ backgroundImage: BUNDLE_BORDER_GRADIENT }}
      >
        <article className="relative flex flex-col overflow-hidden rounded-[7.5px] bg-bg-base p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl">
          <span className="absolute right-4 top-4 z-10 rounded-full bg-accent-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-bg-base">
            Best Value
          </span>

          <div className="relative mb-4 grid aspect-square w-full grid-cols-3 grid-rows-2 place-items-center gap-2 overflow-hidden rounded-lg bg-bg-secondary p-6">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="relative h-full w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
            ))}
          </div>

          <h3 className="font-display text-lg font-semibold text-text-primary">
            Try All 5 Flavors
          </h3>
          <p className="mt-1 text-sm text-text-primary/60">
            One of each flavor, 50g each — the full BOTHRA&apos;S experience.
          </p>

          <ProductBadges badges={["Free Delivery"]} className="mt-4" />

          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-accent-gold-strong">
            Save 10% When You Bundle
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-baseline gap-2">
              <span className="font-display text-lg font-semibold text-accent-gold-strong">
                ₹{BUNDLE_PRICE}
              </span>
              <span className="text-sm text-text-primary/40 line-through">
                ₹{INDIVIDUAL_TOTAL}
              </span>
            </span>
            <AddToCartButton onAdd={handleAddToCart} />
          </div>
        </article>
      </div>
    </motion.div>
  );
}
