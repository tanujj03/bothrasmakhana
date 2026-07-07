import type { Metadata } from "next";

const TITLE = "Shipping & Delivery Policy | BOTHRA'S SNACKS MAKHANA";
const DESCRIPTION =
  "Shipping timelines, order confirmation process, and delivery details for BOTHRA'S SNACKS — free shipping across India.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/shipping-policy" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/shipping-policy",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BOTHRA'S SNACKS Makhana — Classic Roasted pouch" }],
  },
};

export default function ShippingPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
