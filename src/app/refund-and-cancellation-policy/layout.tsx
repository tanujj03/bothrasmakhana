import type { Metadata } from "next";

const TITLE = "Refund & Cancellation Policy | BOTHRA'S SNACKS MAKHANA";
const DESCRIPTION =
  "Our policy on replacements, refunds, and order cancellations for BOTHRA'S SNACKS roasted makhana orders.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/refund-and-cancellation-policy" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/refund-and-cancellation-policy",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BOTHRA'S SNACKS Makhana — Classic Roasted pouch" }],
  },
};

export default function RefundPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
