"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/lib/uiStore";

const CONSENT_KEY = "bothras-cookie-consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const welcomePopupOpen = useUIStore((state) => state.welcomePopupOpen);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only localStorage check, no re-render loop
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "1");
    setVisible(false);
  };

  // Fully retreats behind the WelcomePopup instead of the two fixed overlays
  // fighting over z-index — reappears once the popup is dismissed if consent
  // still hasn't been given.
  return (
    <AnimatePresence>
      {visible && !welcomePopupOpen && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[9000] px-4 pb-4 sm:px-6"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-xl border border-accent-gold/30 bg-footer-bg px-5 py-4 text-center shadow-2xl sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs leading-relaxed text-footer-text/80 sm:text-sm">
              We use cookies for essential site function and to understand
              site usage via Google Analytics.{" "}
              <Link
                href="/cookie-policy"
                className="font-semibold text-accent-gold underline-offset-2 hover:underline"
              >
                Learn more
              </Link>
            </p>
            <button
              onClick={accept}
              className="w-full shrink-0 rounded-lg bg-accent-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-footer-bg transition-colors duration-200 ease-in-out hover:bg-accent-gold-strong sm:w-auto"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
