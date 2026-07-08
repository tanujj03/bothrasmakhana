import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import { PRICING, DEFAULT_SIZE, SITE_URL } from "@/lib/constants";

const TITLE = "Shop All Flavors | Buy Makhana Online | BOTHRA'S SNACKS MAKHANA";
const DESCRIPTION =
  "Order roasted-not-fried makhana online — Classic, Pudina, Chat Masala, Peri Peri & Turmeric Fusion. Low calorie, protein rich, gluten free, India-wide delivery.";
const KEYWORDS = [
  "peri peri makhana",
  "chat masala makhana",
  "pudina makhana",
  "turmeric fusion makhana",
  "classic roasted makhana",
  "flavored makhana",
  "buy makhana online India",
  "makhana online order",
  "makhana online india",
  "premium makhana online",
  "healthy namkeen online",
  "roasted makhana snacks",
  "order makhana Maharashtra",
  "spicy makhana",
  "minty makhana",
  "namkeen online",
  "healthy snacks online",
  "diet snacks",
  "snacks for weight loss",
  "office snacks",
  "travel snacks",
  "kids healthy snacks",
  "gifting snacks",
  "festive snacks",
  "Diwali snacks gift",
  "snack gift pack",
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  alternates: { canonical: "/shop" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/shop",
    siteName: "BOTHRA'S SNACKS MAKHANA",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BOTHRA'S SNACKS Makhana — Classic Roasted pouch" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

const productJsonLd = PRODUCTS.map((product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: `${SITE_URL}${product.image}`,
  brand: { "@type": "Brand", name: "BOTHRA'S SNACKS" },
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
