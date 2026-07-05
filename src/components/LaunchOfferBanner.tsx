"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LAUNCH_OFFER_TEXT } from "@/lib/constants";

const DISMISS_KEY = "bothras-launch-offer-dismissed";

export default function LaunchOfferBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (!dismissed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only localStorage check, no re-render loop
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden bg-accent-gold"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-5 py-2 sm:px-8">
            <p className="text-center text-xs font-semibold tracking-wide text-bg-base sm:text-sm">
              🎉 {LAUNCH_OFFER_TEXT}
            </p>
            <button
              onClick={dismiss}
              aria-label="Dismiss offer banner"
              className="shrink-0 text-bg-base/80 transition-colors duration-200 ease-in-out hover:text-bg-base"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
