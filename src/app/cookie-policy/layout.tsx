import type { Metadata } from "next";

const TITLE = "Cookie Policy | BOTHRA'S SNACKS MAKHANA";
const DESCRIPTION =
  "How BOTHRA'S SNACKS uses cookies for essential site functionality and Google Analytics, and how to disable them.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/cookie-policy",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BOTHRA'S SNACKS Makhana — Classic Roasted pouch" }],
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
