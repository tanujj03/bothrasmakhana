import type { Metadata } from "next";

const TITLE = "Terms & Conditions | BOTHRA'S SNACKS MAKHANA";
const DESCRIPTION =
  "Terms and conditions governing use of the BOTHRA'S SNACKS website and WhatsApp-based ordering process.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/terms-and-conditions",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BOTHRA'S SNACKS Makhana — Classic Roasted pouch" }],
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
