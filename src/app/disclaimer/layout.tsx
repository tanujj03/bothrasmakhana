import type { Metadata } from "next";

const TITLE = "Disclaimer | BOTHRA'S SNACKS MAKHANA";
const DESCRIPTION =
  "Disclaimer regarding product health claims, nutrition information, and packaging imagery for BOTHRA'S SNACKS roasted makhana.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/disclaimer",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BOTHRA'S SNACKS Makhana — Classic Roasted pouch" }],
  },
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
