import Link from "next/link";
import Logo from "./Logo";
import VegMark from "./VegMark";
import {
  WHATSAPP_NUMBER,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  CONTACT_EMAIL,
  CITY_NAME,
} from "@/lib/constants";

const FOOTER_TRUST_BADGES = [
  {
    label: "Fast Delivery",
    icon: (
      <path d="M3 16V7a1 1 0 011-1h9v10M3 16h1m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m9-6h3l3 3v3h-2m-4-6v6m0 0h-4m4 0a2 2 0 104 0m0 0a2 2 0 10-4 0" strokeLinecap="round" strokeLinejoin="round" />
    ),
    emoji: null,
  },
  {
    label: "100% Vegetarian",
    icon: null,
    emoji: null,
  },
  {
    label: "Made in India",
    icon: null,
    emoji: "🇮🇳",
  },
  {
    label: "Secure Payment",
    icon: (
      <path d="M5 11h14v9H5v-9zm3 0V7a4 4 0 018 0v4" strokeLinecap="round" strokeLinejoin="round" />
    ),
    emoji: null,
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-text">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Logo size={44} />
              <span className="font-display text-xl font-semibold">
                BOTHRA&apos;S SNACKS
              </span>
            </div>
            <p className="text-sm text-footer-text/70">A Brand by Jainam Bothra</p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="eyebrow text-xs">Quick Links</h3>
            <Link href="/shop" className="text-sm text-footer-text/80 transition-colors duration-200 ease-in-out hover:text-accent-gold">
              Shop
            </Link>
            <Link href="/about" className="text-sm text-footer-text/80 transition-colors duration-200 ease-in-out hover:text-accent-gold">
              About
            </Link>
            <Link href="/contact" className="text-sm text-footer-text/80 transition-colors duration-200 ease-in-out hover:text-accent-gold">
              Contact
            </Link>
            <Link href="/help" className="text-sm text-footer-text/80 transition-colors duration-200 ease-in-out hover:text-accent-gold">
              Help &amp; Support
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="eyebrow text-xs">Get In Touch</h3>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-footer-text/80 transition-colors duration-200 ease-in-out hover:text-accent-gold"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.9 9.9 0 0 0 4.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.9C21.96 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.34-.5.05-1.02.24-3.43-.72-2.9-1.16-4.76-4.1-4.9-4.29-.14-.19-1.17-1.56-1.17-2.98s.75-2.11 1.02-2.4c.26-.28.58-.35.77-.35h.55c.18 0 .42-.03.65.5.24.55.8 1.93.87 2.07.07.14.12.3.02.49-.1.19-.15.3-.3.46-.14.16-.3.36-.43.48-.15.14-.3.29-.13.57.17.28.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.33 1.44.28.14.44.12.6-.07.17-.19.72-.85.91-1.14.19-.28.38-.24.64-.14.26.1 1.65.78 1.94.92.28.14.47.21.54.33.07.13.07.71-.17 1.39z" />
              </svg>
              +91 92707 85725
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-footer-text/80 transition-colors duration-200 ease-in-out hover:text-accent-gold"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              {INSTAGRAM_HANDLE}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2 text-sm text-footer-text/80 transition-colors duration-200 ease-in-out hover:text-accent-gold"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="eyebrow text-xs">Policies</h3>
            <Link href="/terms-and-conditions" className="text-sm text-footer-text/80 transition-colors duration-200 ease-in-out hover:text-accent-gold">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy-policy" className="text-sm text-footer-text/80 transition-colors duration-200 ease-in-out hover:text-accent-gold">
              Privacy Policy
            </Link>
            <Link href="/refund-and-cancellation-policy" className="text-sm text-footer-text/80 transition-colors duration-200 ease-in-out hover:text-accent-gold">
              Refund &amp; Cancellation
            </Link>
            <Link href="/shipping-policy" className="text-sm text-footer-text/80 transition-colors duration-200 ease-in-out hover:text-accent-gold">
              Shipping Policy
            </Link>
            <Link href="/cookie-policy" className="text-sm text-footer-text/80 transition-colors duration-200 ease-in-out hover:text-accent-gold">
              Cookie Policy
            </Link>
            <Link href="/disclaimer" className="text-sm text-footer-text/80 transition-colors duration-200 ease-in-out hover:text-accent-gold">
              Disclaimer
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="eyebrow text-xs">Location</h3>
            <p className="text-sm text-footer-text/80">{CITY_NAME}</p>
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-footer-text/10 pt-6">
          {FOOTER_TRUST_BADGES.map((badge) => (
            <li
              key={badge.label}
              className="flex items-center gap-1.5 text-xs font-medium text-footer-text/70"
            >
              {badge.emoji ? (
                <span aria-hidden="true" className="shrink-0 text-sm leading-none">
                  {badge.emoji}
                </span>
              ) : badge.icon ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="shrink-0 text-accent-gold"
                  aria-hidden="true"
                >
                  {badge.icon}
                </svg>
              ) : (
                <VegMark size={14} className="shrink-0" />
              )}
              {badge.label}
            </li>
          ))}
        </ul>

        <div className="mt-6 text-center text-xs text-footer-text/50">
          &copy; {new Date().getFullYear()} BOTHRA&apos;S SNACKS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
