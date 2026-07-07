"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { DEFAULT_SIZE } from "@/lib/constants";
import AddToCartButton from "./AddToCartButton";
import ProductBadges from "./ProductBadges";
import { useCartStore } from "@/lib/store";

const SAMPLE_PACK_MRP = 139;
const SAMPLE_PACK_PRICE = 99;

const SAMPLE_PACK_BADGES = [
  "Free Delivery",
  "Gluten Free",
  "Protein Rich",
  "Low Calorie",
  "Roasted Not Fried",
] as const;

const cardStyle = {
  "--card-border": "var(--accent-gold)",
  "--card-glow-color": "color-mix(in srgb, var(--accent-gold) 55%, transparent)",
} as React.CSSProperties;

export default function SamplePackCard() {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  // Same visibility-gated animation pause as ProductCard/BundleCard.
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { margin: "200px 0px" });
  const animationPlayState = inView ? "running" : "paused";

  const handleAddToCart = () => {
    addItem(
      {
        id: "sample-pack",
        size: DEFAULT_SIZE,
        name: "5-Flavour Sample Pack",
        flavorColor: "var(--accent-gold)",
        image: "/products/product6.png",
        price: SAMPLE_PACK_PRICE,
      },
      1
    );
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
        style={{ animationPlayState, willChange: inView ? "opacity" : "auto" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col overflow-hidden rounded-xl border-[4.5px] border-[color:var(--card-border)] bg-bg-base p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl">
        <span
          className="absolute left-4 top-4 z-10 h-3 w-3 rounded-full ring-2 ring-bg-base"
          style={{ backgroundColor: "var(--accent-gold)" }}
          aria-hidden="true"
        />
        <span className="absolute right-4 top-4 z-10 rounded-full bg-accent-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-bg-base">
          Sample Pack
        </span>

        <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg bg-bg-secondary">
          <div
            className="animate-kenburns relative h-full w-full"
            style={{ animationPlayState }}
          >
            <Image
              src="/products/product6.png"
              alt="5-Flavour Sample Pack"
              fill
              className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 90vw, 320px"
            />
          </div>
        </div>

        <h3 className="font-display text-lg font-semibold text-text-primary">
          5-Flavour Sample Pack
        </h3>
        <p className="mt-1 text-sm text-text-primary/60">
          Try all 5 flavours in one bundle pack
        </p>

        <ProductBadges badges={SAMPLE_PACK_BADGES} className="mt-4" />

        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-baseline gap-2">
            <span className="font-display text-lg font-semibold text-accent-gold-strong">
              ₹{SAMPLE_PACK_PRICE}
            </span>
            <span className="text-sm text-text-primary/40 line-through">
              ₹{SAMPLE_PACK_MRP}
            </span>
          </span>
          <AddToCartButton onAdd={handleAddToCart} />
        </div>
      </div>
    </motion.div>
  );
}
