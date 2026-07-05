import { PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";
import BundleCard from "./BundleCard";
import { RevealGroup, RevealItem } from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ProductShowcase() {
  return (
    <section id="shop" className="bg-bg-base py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Collection"
          title="Our Flavors"
          className="mb-12"
        />

        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <RevealItem key={product.id}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
          <RevealItem>
            <BundleCard />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
