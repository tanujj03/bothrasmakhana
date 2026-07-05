"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { useCartStore, cartItemCount } from "@/lib/store";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const count = cartItemCount(items);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    // Hysteresis: enter the scrolled (violet) state past 80px, only revert
    // to the top (cream) state below 40px — prevents flicker when scroll
    // position hovers right around a single fixed threshold.
    //
    // rAF-gated: raw "scroll" events can fire many times per animation
    // frame, and calling setState on every single one adds up to visible
    // jank during fast/continuous scrolling. Collapsing to at most one
    // state check per frame keeps this to the minimum React work needed —
    // the actual color fade is still handled entirely by the CSS
    // transition below, not by animating anything from JS.
    let ticking = false;
    const evaluate = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > 40 : y > 80));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- transient bump animation triggered by external cart-count change
    setBump(true);
    const t = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(t);
  }, [count]);

  // Single shared duration/easing for every scroll-driven color change (bg,
  // text, icons) so nothing shifts a beat ahead of or behind the rest.
  const SCROLL_TRANSITION = "duration-500 ease-in-out";
  const textColorClass = `${scrolled ? "text-footer-text" : "text-text-primary"} transition-colors ${SCROLL_TRANSITION}`;
  const iconColorClass = `${scrolled ? "text-accent-gold" : "text-text-primary"} transition-colors ${SCROLL_TRANSITION}`;
  const hoverBgClass = scrolled ? "hover:bg-footer-text/10" : "hover:bg-text-primary/10";

  return (
    <header className="sticky top-0 z-50">
      {/* Background + blur live on this inner wrapper, not <header> itself —
          backdrop-filter on header would make it the containing block for the
          fixed mobile drawer below, collapsing the drawer to header's own height. */}
      {/* Only background-color transitions (cheap, compositor-friendly).
          backdrop-blur and shadow switch instantly — animating
          backdrop-filter/box-shadow re-blurs/repaints every frame of the
          transition, which is exactly what was causing the scroll-trigger
          color change to feel laggy instead of smooth. */}
      <div
        className={`transition-colors ${SCROLL_TRANSITION} ${
          scrolled
            ? "bg-footer-bg/90 backdrop-blur-md shadow-sm"
            : "bg-bg-base/90 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="BOTHRA'S SNACK'S Makhana home">
            <Logo size={62} priority />
            <span
              className={`font-display text-xl font-semibold tracking-wide ${textColorClass}`}
            >
              BOTHRA&apos;S SNACK&apos;S
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group relative font-body text-sm font-medium ${textColorClass}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleCart}
              aria-label={`Open cart, ${count} items`}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${SCROLL_TRANSITION} ${iconColorClass} ${hoverBgClass}`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path
                  d="M6 6h15l-1.5 9h-12L5 3H2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="20" r="1.4" fill="currentColor" />
                <circle cx="17" cy="20" r="1.4" fill="currentColor" />
              </svg>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: bump ? 1.25 : 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent-gold px-1 text-[10px] font-bold text-bg-base"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={`flex h-10 w-10 items-center justify-center rounded-full md:hidden ${iconColorClass}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-text-primary/40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col gap-8 px-6 py-6 shadow-xl transition-colors ${SCROLL_TRANSITION} md:hidden ${
                scrolled ? "bg-footer-bg text-footer-text" : "bg-bg-base text-text-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 ease-in-out ${hoverBgClass}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <ul className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-2xl"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
