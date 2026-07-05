import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import { PRICING, DEFAULT_SIZE, SITE_URL } from "@/lib/constants";

const TITLE = "Shop All Flavors | BOTHRA'S SNACK'S MAKHANA";
const DESCRIPTION =
  "Browse all 5 roasted-not-fried makhana flavors from BOTHRA'S SNACK'S — Classic, Pudina, Chat Masala, Peri Peri & Turmeric Fusion. Mild and spicy options available.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/shop" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/shop",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BOTHRA'S SNACK'S Makhana — Classic Roasted pouch" }],
  },
};

const productJsonLd = PRODUCTS.map((product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: `${SITE_URL}${product.image}`,
  brand: { "@type": "Brand", name: "BOTHRA'S SNACK'S" },
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    price: PRICING[DEFAULT_SIZE].offer,
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/shop`,
  },
}));

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {children}
    </>
  );
}
