"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

const SESSION_KEY = "bothras-loaded";
const MIN_DISPLAY_MS = 700;
const MAX_WAIT_MS = 3500;

export default function LoadingScreen() {
  // Starts true on both server and client render so the overlay is part of
  // the very first paint — otherwise there's a frame (or more, on a slow
  // hydrate) where the real page is visible before this pops in on top,
  // which defeats the point of a loading screen.
  const [show, setShow] = useState(true);
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only session check, no re-render loop
      setShow(false);
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");

    const start = Date.now();
    const dismiss = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;
      const remaining = Math.max(MIN_DISPLAY_MS - (Date.now() - start), 0);
      setTimeout(() => setShow(false), remaining);
    };

    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", () => resolve(), { once: true });
      }
    });
    const fontsReady = "fonts" in document ? document.fonts.ready : Promise.resolve();

    Promise.all([pageReady, fontsReady]).then(dismiss);
    // Slow connection / stalled resource safety net — never block longer than this.
    const fallback = setTimeout(dismiss, MAX_WAIT_MS);

    return () => clearTimeout(fallback);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-bg-base"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-3"
          >
            <Logo size={112} priority />
            <span className="font-display text-2xl tracking-wide text-text-primary">
              BOTHRA&apos;S SNACKS
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
