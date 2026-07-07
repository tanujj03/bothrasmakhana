import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import BrandStory from "@/components/BrandStory";
import Nutrition from "@/components/Nutrition";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import InstagramStrip from "@/components/InstagramStrip";
import ThankYouNote from "@/components/ThankYouNote";

const TITLE = "BOTHRA'S SNACKS MAKHANA | Not Just a Snack. A Statement.";
const DESCRIPTION =
  "Shop premium roasted-not-fried makhana in 5 bold flavors — Classic, Pudina, Chat Masala, Peri Peri & Turmeric Fusion. Low calorie, protein rich, 100% natural.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BOTHRA'S SNACKS Makhana — Classic Roasted pouch" }],
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
