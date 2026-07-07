import type { Metadata } from "next";

const TITLE = "Help & Support | BOTHRA'S SNACKS MAKHANA";
const DESCRIPTION =
  "Get help with your order — confirmations, tracking, UPI payments, cancellations, and more. All support is handled directly over WhatsApp.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/help" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/help",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BOTHRA'S SNACKS Makhana — Classic Roasted pouch" }],
  },
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
