import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import BrandStory from "@/components/BrandStory";
import Nutrition from "@/components/Nutrition";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import InstagramStrip from "@/components/InstagramStrip";
import ThankYouNote from "@/components/ThankYouNote";

const TITLE = "BOTHRA'S SNACKS MAKHANA | Buy Roasted Makhana Online India";
const DESCRIPTION =
  "Buy premium roasted makhana (fox nuts) online in India — Classic, Pudina, Chat Masala, Peri Peri & Turmeric Fusion. Protein rich, gluten free, guilt-free snack.";
const KEYWORDS = [
  "roasted makhana",
  "fox nuts",
  "lotus seeds snack",
  "healthy snacks India",
  "protein rich snacks",
  "low calorie snacks",
  "gluten free snacks",
  "guilt-free snacking",
  "premium makhana",
  "flavored makhana",
  "makhana online order",
  "makhana online india",
  "buy makhana online India",
  "Bothra's Snacks",
  "D2C snacks India",
  "healthy snacks online",
  "snacks online India",
  "Indian snacks online",
  "healthy namkeen",
  "evening snacks",
  "tea time snacks",
  "guilt-free snacks",
  "snacks brand India",
  "healthy nashta",
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
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

export default function Home() {
  return (
    <>
      <Hero />
      <Nutrition />
      <ProductShowcase />
      <BrandStory />
      <Testimonials />
      <FAQ />
      <InstagramStrip />
      <ThankYouNote />
    </>
  );
}
