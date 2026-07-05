import type { Metadata } from "next";

const TITLE = "Contact Us | BOTHRA'S SNACK'S MAKHANA";
const DESCRIPTION =
  "Get in touch with BOTHRA'S SNACK'S Makhana via WhatsApp, Instagram, or our enquiry form. We'd love to hear from you.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BOTHRA'S SNACK'S Makhana — Classic Roasted pouch" }],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
