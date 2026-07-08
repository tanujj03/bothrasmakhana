import type { Metadata } from "next";

const TITLE = "Contact Us | Order Makhana Online | BOTHRA'S SNACKS MAKHANA";
const DESCRIPTION =
  "Order makhana online ghar baithe — reach BOTHRA'S SNACKS via WhatsApp, Instagram, or our enquiry form for queries, bulk orders, or delivery across Maharashtra.";
const KEYWORDS = [
  "Bothra's Snacks",
  "makhana ghar baithe order",
  "makhana Hinganghat",
  "order makhana Maharashtra",
  "buy makhana online India",
  "healthy snacks Nagpur",
  "makhana online order",
  "namkeen online",
  "gifting snacks",
  "snack gift pack",
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/contact",
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
