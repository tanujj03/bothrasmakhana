"use client";

import { useMemo, useState } from "react";
import { PRODUCTS, type Spice } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import BundleCard from "@/components/BundleCard";
import SamplePackCard from "@/components/SamplePackCard";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import BackButton from "@/components/BackButton";

type Filter = "all" | Spice;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "mild", label: "Mild" },
  { key: "spicy", label: "Spicy" },
];

export default function ShopPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const visibleProducts = useMemo(
    () =>
      filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.spice === filter),
    [filter]
  );

  return (
    <section className="bg-bg-base py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <BackButton />

        <Reveal className="mb-4 text-center">
          <span className="eyebrow text-xs">Shop All</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-text-primary sm:text-5xl">
            Our Flavors
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm text-text-primary/60">
            Five roasted-not-fried flavors. Low calorie, protein rich, gluten
            free — every pouch, every time.
          </p>
        </Reveal>

        <div className="mb-10 flex justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                filter === f.key
                  ? "border-text-primary bg-text-primary text-accent-gold"
                  : "border-black/10 text-text-primary/70 hover:border-text-primary/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <RevealGroup
          key={filter}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          immediate
        >
          {visibleProducts.map((product, i) => (
            <RevealItem key={product.id}>
              <ProductCard product={product} priority={i < 3} />
            </RevealItem>
          ))}
          {filter === "all" && (
            <RevealItem>
              <BundleCard />
            </RevealItem>
          )}
          {filter === "all" && (
            <RevealItem>
              <SamplePackCard />
            </RevealItem>
          )}
        </RevealGroup>
      </div>
    </section>
  );
}
