"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import MagneticButton from "./MagneticButton";
import { PRODUCTS } from "@/lib/products";
import { useCartStore } from "@/lib/store";

const PARTICLES = [
  { size: 8, top: "12%", left: "18%", duration: 3, delay: 0 },
  { size: 6, top: "70%", left: "12%", duration: 5, delay: 0.4 },
  { size: 10, top: "20%", left: "82%", duration: 6.5, delay: 0.8 },
  { size: 7, top: "78%", left: "78%", duration: 5, delay: 1.2 },
  { size: 6, top: "45%", left: "90%", duration: 3, delay: 0.6 },
];

// Ambient mini makhanas drifting across the whole hero (both columns) —
// a separate, simpler layer that never reacts to the stage's mouse-tilt.
// Large travelX/travelY sweeps (not small wobbles) so the drift visibly
// crosses a big share of the section instead of hovering in one spot.
const FLOATERS = [
  { image: "/products/makhana1.png", size: 30, top: "8%", left: "4%", duration: 18, delay: 0, travelX: 220, travelY: 160, spinDuration: 5, opacity: 0.6 },
  { image: "/products/makhana2.png", size: 24, top: "68%", left: "10%", duration: 24, delay: 1.2, travelX: 260, travelY: -140, spinDuration: 7, opacity: 0.55 },
  { image: "/products/makhana3.png", size: 34, top: "22%", left: "42%", duration: 28, delay: 2.4, travelX: -200, travelY: 220, spinDuration: 4, opacity: 0.5 },
  { image: "/products/makhana4.png", size: 24, top: "82%", left: "55%", duration: 22, delay: 0.8, travelX: 240, travelY: -180, spinDuration: 8, opacity: 0.65 },
  { image: "/products/makhana5.png", size: 30, top: "14%", left: "88%", duration: 26, delay: 1.8, travelX: -260, travelY: 200, spinDuration: 6, opacity: 0.7 },
  { image: "/products/makhana2.png", size: 26, top: "45%", left: "20%", duration: 20, delay: 3.0, travelX: 180, travelY: -160, spinDuration: 5.5, opacity: 0.4 },
  { image: "/products/makhana4.png", size: 28, top: "50%", left: "75%", duration: 23, delay: 1.0, travelX: -190, travelY: 150, spinDuration: 6.5, opacity: 0.35 },
  { image: "/products/makhana1.png", size: 24, top: "90%", left: "30%", duration: 25, delay: 2.0, travelX: 200, travelY: -130, spinDuration: 4.5, opacity: 0.45 },
];

const ENTRANCE_DELAY = 0.3;
const ENTRANCE_DURATION = 0.8;
const ROTATE_INTERVAL = 4450;
const HOVER_RESUME_DELAY = 4500;

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Hero() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  // Mobile GPUs/CPUs have far less headroom than desktop for the hero's
  // stacked blur filters + floater/particle count, so below this width we
  // swap in a lighter variant of each ambient effect rather than reusing
  // the desktop one at a smaller size.
  const [isMobile, setIsMobile] = useState(false);
  const [stageHovered, setStageHovered] = useState(false);
  const cartOpen = useCartStore((s) => s.isOpen);
  // Same intent as reduceMotion below (freeze the continuous ambient
  // animations), just triggered by the cart drawer covering the hero
  // instead of a user accessibility preference.
  const pauseAmbient = reduceMotion || cartOpen;

  const [activeIndex, setActiveIndex] = useState(0);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = PRODUCTS[activeIndex];

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 120, damping: 16 });
  const rotateY = useSpring(rawRotateY, { stiffness: 120, damping: 16 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only feature detection, no re-render loop
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileQuery.matches);
    const onMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mobileQuery.addEventListener("change", onMobileChange);
    return () => mobileQuery.removeEventListener("change", onMobileChange);
  }, []);

  const clearAutoTimer = () => {
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  };

  const startAutoTimer = () => {
    clearAutoTimer();
    autoTimerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % PRODUCTS.length);
    }, ROTATE_INTERVAL);
  };

  useEffect(() => {
    // Also re-runs (via the pauseAmbient dep) when the cart drawer opens —
    // same reasoning as the tab-hidden case below: a periodic flavor
    // crossfade firing mid-keystroke in the checkout form was competing
    // with typing for frame budget, so it's paused for as long as the
    // drawer covers the hero and restarted fresh once it closes.
    if (pauseAmbient) return;
    startAutoTimer();

    // Pause the rotation while the tab is hidden and restart it fresh (rather
    // than leaving a throttled interval to fire on its old, now-stale
    // schedule) once it's visible again — otherwise the flavor crossfade can
    // fire immediately on refocus mid-animation-setup, adding to the jank.
    const onVisibilityChange = () => {
      if (document.hidden) {
        clearAutoTimer();
      } else {
        startAutoTimer();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearAutoTimer();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pauseAmbient]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || reduceMotion) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(px * 16);
    rawRotateX.set(py * -16);

    // Pausing on real movement (not on onMouseEnter) is deliberate: closing an
    // overlay that was covering the stage (e.g. the welcome popup, centered
    // over roughly this same screen region) can leave the cursor stationary
    // over the now-exposed stage, and browsers fire a synthetic mouseenter
    // for that — with no real mousemove/mouseleave ever following, that
    // would pause the auto-rotation permanently. A genuine mousemove event
    // never fires without actual pointer movement, so gating on it here
    // avoids that stuck state entirely.
    if (!stageHovered) {
      setStageHovered(true);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      clearAutoTimer();
    }
  };

  const handleMouseLeave = () => {
    setStageHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
    if (reduceMotion) return;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(startAutoTimer, HOVER_RESUME_DELAY);
  };

  // Mobile gets fewer ambient floaters/particles than desktop (rather than
  // the same count rendered smaller) — each is its own continuously
  // animated + repainted layer, and mid-range phones don't have the frame
  // budget for 8 floaters + 5 particles running at once alongside the rest
  // of the hero's motion.
  const floaters = isMobile ? FLOATERS.slice(0, 3) : FLOATERS;
  const particles = isMobile ? PARTICLES.slice(0, 2) : PARTICLES;

  const goToShop = () => router.push("/shop");

  const handleStageKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToShop();
    }
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const exitY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const exitOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToShop = () => {
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const imageExitTransition = reduceMotion
    ? { duration: 0.2, ease: "linear" as const }
    : { duration: 0.22, ease: "easeIn" as const, delay: 0.04 };

  const imageEnterTransition = reduceMotion
    ? { duration: 0.2, ease: "linear" as const }
    : { duration: 0.26, ease: "easeOut" as const, delay: 0.18 };

  const textExitTransition = reduceMotion
    ? { duration: 0.15, ease: "linear" as const }
    : { duration: 0.12, ease: "easeOut" as const };

  const textEnterTransition = reduceMotion
    ? { duration: 0.15, ease: "linear" as const }
    : { duration: 0.15, ease: "easeOut" as const, delay: 0.33 };

  const glowTransition = reduceMotion
    ? { duration: 0.2, ease: "linear" as const }
    : { duration: 0.3, ease: "easeOut" as const, delay: 0.21 };

  const imageVariants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: imageEnterTransition },
        exit: { opacity: 0, transition: imageExitTransition },
      }
    : isMobile
    ? // Mobile: opacity + scale only — no animated `filter: blur()`. Blur is
      // one of the most expensive properties to animate on mobile GPUs, and
      // this crossfade repeats every ROTATE_INTERVAL for as long as the hero
      // is on screen.
      {
        initial: { opacity: 0, scale: 0.92 },
        animate: { opacity: 1, scale: 1, transition: imageEnterTransition },
        exit: { opacity: 0, scale: 0.92, transition: imageExitTransition },
      }
    : {
        initial: { opacity: 0, scale: 0.85, filter: "blur(4px)" },
        animate: {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          transition: imageEnterTransition,
        },
        exit: {
          opacity: 0,
          scale: 0.85,
          filter: "blur(4px)",
          transition: imageExitTransition,
        },
      };

  const textVariants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: textEnterTransition },
        exit: { opacity: 0, transition: textExitTransition },
      }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0, transition: textEnterTransition },
        exit: { opacity: 0, y: -8, transition: textExitTransition },
      };

  return (
    <section
      ref={sectionRef}
      // Bottom padding must clear the "Scroll to Explore" cue's own height
      // (~59px) plus its bottom-4/sm:bottom-6 offset from the section edge —
      // otherwise it overlaps the row-2 caption above it, whose container is
      // now correctly sized to the longest flavor's content (see min-h-[150px]
      // below) and so always extends right up to this padding's edge.
      className="relative overflow-hidden bg-bg-base pb-20 pt-4 sm:pb-24 sm:pt-8"
    >
      {/* Ambient mini makhanas drifting across the hero background — sits above
          the plain section background, below the headline/CTA/main image (z-10). */}
      {!pauseAmbient && (
        <div className="pointer-events-none absolute inset-0 z-[6]" aria-hidden="true">
          {floaters.map((f, i) => (
            <div
              key={i}
              className="floater-drift absolute"
              style={
                {
                  top: f.top,
                  left: f.left,
                  width: f.size,
                  height: f.size,
                  opacity: f.opacity,
                  "--drift-x": `${f.travelX}px`,
                  "--drift-y": `${f.travelY}px`,
                  "--drift-duration": `${f.duration}s`,
                  "--drift-delay": `${f.delay}s`,
                } as React.CSSProperties
              }
            >
              <div
                className="floater-spin h-full w-full"
                style={{ "--spin-duration": `${f.spinDuration}s` } as React.CSSProperties}
              >
                <Image
                  src={f.image}
                  alt=""
                  fill
                  className="object-contain"
                  sizes={`${f.size}px`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Row 1: text column + (makhana image + its caption), centered as a
            pair via items-center. The image+caption column is taller than the
            text column, so the text column now centers vertically against
            that full combined height — genuinely centered in the available
            space rather than just filling it. */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
            <div>
              <motion.span
                initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="eyebrow block text-sm sm:text-base"
              >
                A Brand by Jainam Bothra
              </motion.span>

              <motion.h1
                initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-text-primary sm:text-5xl lg:text-6xl"
              >
                Not Just a Snack.
                <br />A Statement.
              </motion.h1>

              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                // Reserved height covers the longest of all 5 flavors' heroSub
                // strings at each breakpoint's actual rendered width/font-size
                // (measured, not guessed): Classic Roasted wraps to 4 lines at
                // narrow mobile widths (~320px, 26px line-height ≈ 104px) and
                // to 3 lines at sm+ where text-lg/max-w-md apply (29.3px line
                // height ≈ 88px). Both get a small buffer on top. Since the
                // subtext is positioned absolutely (for the crossfade), this
                // container needs an explicit height for every variant to fit
                // without the text overlapping the CTA button below it.
                className="relative mt-6 min-h-[112px] max-w-md sm:min-h-[100px]"
              >
                <AnimatePresence initial={false}>
                  <motion.p
                    key={activeIndex}
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-x-0 top-0 text-base leading-relaxed text-text-primary/70 sm:text-lg"
                  >
                    {active.heroSub}
                  </motion.p>
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="mt-9"
              >
                <MagneticButton onClick={scrollToShop} glow>
                  Shop Now
                </MagneticButton>
              </motion.div>

              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                className="eyebrow mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px]"
              >
                <span>5 Flavors</span>
                <span aria-hidden="true" className="text-accent-gold/50">
                  &middot;
                </span>
                <span>100% Natural</span>
                <span aria-hidden="true" className="text-accent-gold/50">
                  &middot;
                </span>
                <span>Roasted Not Fried</span>
                <span aria-hidden="true" className="text-accent-gold/50">
                  &middot;
                </span>
                <span>Fast Delivery</span>
                <span aria-hidden="true" className="text-accent-gold/50">
                  &middot;
                </span>
                <span>Made in India</span>
              </motion.div>
            </div>

            <div className="mx-auto flex w-full max-w-xs flex-col items-center lg:max-w-[410px]">
            <motion.div
              style={{
                y: reduceMotion ? 0 : exitY,
                opacity: reduceMotion ? 1 : exitOpacity,
              }}
              className="w-full"
            >
              <div
                ref={stageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={goToShop}
                onKeyDown={handleStageKeyDown}
                role="button"
                tabIndex={0}
                aria-label="Shop now"
                style={{ perspective: 1000 }}
                className="relative aspect-square w-full cursor-pointer"
              >
                {/* Radial violet glow. The box-blur is dropped on mobile — the
                    gradient already fades smoothly to transparent on its own,
                    and an animated `blur-3xl` (64px) filter is one of the
                    costlier things a mobile GPU can be asked to composite. */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: ENTRANCE_DELAY }}
                  className={`absolute inset-0 rounded-full ${isMobile ? "" : "blur-3xl"}`}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(30,15,46,0.09) 0%, rgba(30,15,46,0) 70%)",
                  }}
                  aria-hidden="true"
                />

                {/* Subtle hover cue: gentle gold glow boost, doesn't touch the tilt/float wrappers */}
                <motion.div
                  animate={{ opacity: stageHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`absolute inset-0 rounded-full ${isMobile ? "" : "blur-3xl"}`}
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in srgb, var(--accent-gold) 16%, transparent) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                {/* Flavor-reactive ambient tint. Desktop keeps one static-color
                    layer per flavor, crossfading opacity between them. Mobile
                    only ever mounts the active flavor's layer (no blur, no
                    crossfade) instead of paying for 5 always-mounted blurred
                    circles to get a transition that's barely noticeable at
                    this size anyway. */}
                {isMobile ? (
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${hexToRgba(active.flavorHex, 0.14)} 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />
                ) : (
                  PRODUCTS.map((product, i) => (
                    <motion.div
                      key={product.id}
                      animate={{ opacity: i === activeIndex ? 1 : 0 }}
                      transition={glowTransition}
                      className="absolute inset-0 rounded-full blur-3xl"
                      style={{
                        background: `radial-gradient(circle, ${hexToRgba(product.flavorHex, 0.14)} 0%, transparent 70%)`,
                      }}
                      aria-hidden="true"
                    />
                  ))
                )}

                {/* Ambient gold particles. Mobile drops the count (see
                    `particles` above) and the animated `blur(3px)` filter —
                    a plain small dot at lower opacity reads close enough to
                    the soft blurred version without the per-frame filter cost. */}
                {!pauseAmbient &&
                  particles.map((p, i) => (
                    <motion.span
                      key={i}
                      className="absolute rounded-full bg-accent-gold"
                      style={{
                        width: p.size,
                        height: p.size,
                        top: p.top,
                        left: p.left,
                        filter: isMobile ? undefined : "blur(3px)",
                        opacity: 0.5,
                      }}
                      animate={{
                        y: [0, -16, 0],
                        x: [0, 6, 0],
                        opacity: [0.4, 0.6, 0.4],
                      }}
                      transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      aria-hidden="true"
                    />
                  ))}

                {/* Ground shadow, synced inversely to float */}
                <motion.div
                  className="absolute bottom-6 left-1/2 h-8 w-2/3 -translate-x-1/2 rounded-full bg-text-primary/20 blur-md"
                  animate={
                    pauseAmbient
                      ? undefined
                      : { opacity: [0.2, 0.1], scale: [1, 0.85] }
                  }
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: ENTRANCE_DELAY + ENTRANCE_DURATION,
                  }}
                  aria-hidden="true"
                />

                {/* Layered second makhana, larger + heavily blurred, for ambient
                    depth behind the main image. Skipped on mobile — blurring
                    actual raster image content is heavier than blurring a
                    CSS gradient, and this layer is purely decorative. */}
                {!isMobile && (
                  <div
                    className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[110%] w-[110%] -translate-x-[46%] -translate-y-[44%] opacity-20 blur-lg"
                    aria-hidden="true"
                  >
                    <Image
                      src="/products/makhana1.png"
                      alt=""
                      fill
                      priority
                      className="object-contain"
                      sizes="400px"
                    />
                  </div>
                )}

                {/* Mouse tilt wrapper */}
                <motion.div
                  style={{
                    rotateX: reduceMotion ? 0 : rotateX,
                    rotateY: reduceMotion ? 0 : rotateY,
                    transformStyle: "preserve-3d",
                  }}
                  className="relative h-full w-full"
                >
                  {/* Float loop wrapper */}
                  <motion.div
                    className="relative h-full w-full"
                    animate={
                      pauseAmbient
                        ? undefined
                        : { y: [0, -14, 0], rotate: [-2, 2, -2] }
                    }
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: ENTRANCE_DELAY + ENTRANCE_DURATION,
                    }}
                  >
                    {/* One-time entrance on page load */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: ENTRANCE_DURATION,
                        ease: "easeOut",
                        delay: ENTRANCE_DELAY,
                      }}
                      className="relative h-full w-full"
                    >
                      {/* Rotating flavor crossfade */}
                      <AnimatePresence initial={false}>
                        <motion.div
                          key={activeIndex}
                          variants={imageVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="absolute inset-0"
                        >
                          <Image
                            src={active.heroImage}
                            alt={`${active.heroName} roasted makhana`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 85vw, 512px"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Flavor caption, directly under the image now (not a separate
                row) so the gap between image and caption is a plain, tight
                margin instead of leftover items-center slack from row 1. */}
            <div className="mx-auto w-full max-w-xs">
              {/* min-height covers the tallest of all 5 flavors' caption
                  blocks (name + line + heroSub) at this column's actual
                  max-w-xs width — measured, not guessed: Chat Masala's is
                  the longest at ~144px. Since max-w-xs caps the width the
                  same way at every viewport ≥360px, this wrap behavior (and
                  so the worst case) is the same at every breakpoint, unlike
                  the row-1 subtext above — no sm: variant needed here. */}
              <div className="relative mt-3 min-h-[150px] w-full text-center sm:mt-4">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activeIndex}
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-x-0 top-0"
                  >
                    <span className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-accent-gold">
                      {active.heroName}
                    </span>
                    <p className="mt-2 font-display text-2xl italic text-text-primary">
                      {active.heroLine}
                    </p>
                    <p className="mt-2 text-sm text-text-primary/50">
                      {active.heroSub}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          </div>
      </div>

      {/* Scroll cue, pinned low so it never collides with the rotating caption block */}
      <motion.button
        type="button"
        onClick={scrollToShop}
        initial={reduceMotion ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
        className="absolute inset-x-0 bottom-4 z-10 mx-auto flex w-fit flex-col items-center gap-2 text-accent-gold/70 transition-colors duration-200 ease-in-out hover:text-accent-gold sm:bottom-6"
        aria-label="Scroll to explore"
      >
        <span className="eyebrow text-[10px]">Scroll to Explore</span>
        <span
          className="relative block h-9 w-px overflow-hidden bg-accent-gold/20"
          aria-hidden="true"
        >
          {!pauseAmbient && (
            <motion.span
              className="absolute inset-x-0 top-0 h-full origin-top bg-accent-gold"
              animate={{
                scaleY: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.4, 0.7, 1],
              }}
            />
          )}
        </span>
      </motion.button>
    </section>
  );
}
