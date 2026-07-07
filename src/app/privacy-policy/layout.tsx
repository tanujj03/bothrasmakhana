import type { Metadata } from "next";

const TITLE = "Privacy Policy | BOTHRA'S SNACKS MAKHANA";
const DESCRIPTION =
  "How BOTHRA'S SNACKS collects, uses, and protects your personal information, including data shared over WhatsApp during checkout.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/privacy-policy",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BOTHRA'S SNACKS Makhana — Classic Roasted pouch" }],
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
