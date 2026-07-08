import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import LaunchOfferBanner from "@/components/LaunchOfferBanner";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { SITE_URL } from "@/lib/constants";

// None of these render anything on first paint (cart drawer starts closed,
// the sticky bar/back-to-top buttons stay hidden until scroll/cart state
// changes, the popup waits on its own timer) — splitting them into separate
// chunks keeps their code out of the JS that has to parse/execute/hydrate
// synchronously on initial mount.
const CartDrawer = dynamic(() => import("@/components/CartDrawer"));
const StickyCartBar = dynamic(() => import("@/components/StickyCartBar"));
const WelcomePopup = dynamic(() => import("@/components/WelcomePopup"));
const BackToTop = dynamic(() => import("@/components/BackToTop"));
const CookieConsentBanner = dynamic(() => import("@/components/CookieConsentBanner"));

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_TITLE = "BOTHRA'S SNACKS MAKHANA | Not Just a Snack. A Statement.";
const SITE_DESCRIPTION =
  "Premium roasted makhana (fox nuts) by Jainam Bothra. Low calorie, protein rich, gluten free, roasted not fried. Not Just a Snack. A Statement.";
const SITE_KEYWORDS = [
  "roasted makhana",
  "fox nuts",
  "lotus seeds snack",
  "healthy snacks India",
  "premium makhana",
  "Bothra's Snacks",
  "buy makhana online India",
  "makhana Maharashtra",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "BOTHRA'S SNACKS MAKHANA",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BOTHRA'S SNACKS Makhana — Classic Roasted pouch" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary">
        <LoadingScreen />
        <CustomCursor />
        <div className="grain-overlay" aria-hidden="true" />
        <Navbar />
        <LaunchOfferBanner />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <StickyCartBar />
        <WelcomePopup />
        <FloatingContactButtons />
        <BackToTop />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
