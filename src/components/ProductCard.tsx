"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { PRODUCT_BADGES } from "@/lib/products";
import ProductBadges from "./ProductBadges";
import ProductModal from "./ProductModal";
import SizeSelector from "./SizeSelector";
import PriceTag from "./PriceTag";
import AddToCartButton from "./AddToCartButton";
import { useCartStore } from "@/lib/store";
import { DEFAULT_SIZE, type SizeKey } from "@/lib/constants";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [size, setSize] = useState<SizeKey>(DEFAULT_SIZE);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        size,
        name: product.name,
        flavorColor: product.flavorColorVar,
        image: product.image,
      },
      1
    );
    openCart();
  };

  const cardStyle = {
    "--card-border": product.flavorColorVar,
    "--card-glow-color": `color-mix(in srgb, ${product.flavorColorVar} 55%, transparent)`,
  } as React.CSSProperties;

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={cardStyle}
        className="group relative"
      >
        {/* Idle-pulsing flavor glow, kept as its own layer behind the card
            (not inside the card's overflow-hidden box) so it can spill
            outward past the rounded border. */}
        <div className="card-flavor-glow-layer" aria-hidden="true" />

        <div
          onClick={() => setModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") setModalOpen(true);
          }}
          className="relative z-10 flex cursor-pointer flex-col overflow-hidden rounded-xl border-[4.5px] border-[color:var(--card-border)] bg-bg-base p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl"
        >
          <span
            className="absolute left-4 top-4 z-10 h-3 w-3 rounded-full ring-2 ring-bg-base"
            style={{ backgroundColor: product.flavorColorVar }}
            aria-hidden="true"
          />
          <span className="absolute right-4 top-4 z-10 rounded-full bg-accent-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-bg-base">
            Launch Offer
          </span>

          <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg bg-bg-secondary">
            <div className="animate-kenburns relative h-full w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority={priority}
                className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 90vw, 320px"
              />
            </div>
            {product.badge && (
              <span className="absolute bottom-3 left-3 z-10 rounded-full border border-black/10 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-black">
                {product.badge === "best-seller" ? "Best Seller" : "New"}
              </span>
            )}
          </div>

          <h3 className="font-display text-lg font-semibold text-text-primary">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-text-primary/60">{product.tagline}</p>

          <ProductBadges badges={PRODUCT_BADGES} className="mt-4" />

          <div className="mt-5">
            <SizeSelector value={size} onChange={setSize} size="sm" />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <PriceTag size={size} />
            <AddToCartButton onAdd={handleAddToCart} />
          </div>
        </div>
      </motion.div>

      <ProductModal
        product={product}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
