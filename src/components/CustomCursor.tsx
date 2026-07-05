"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || prefersReducedMotion) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only feature detection, no re-render loop
    setActive(true);
    document.body.classList.add("custom-cursor-active");

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        "a, button, [role='button'], input, textarea"
      );
      cursorRef.current
        ?.querySelector(".cursor-hover-scale")
        ?.classList.toggle("scale-[1.35]", !!isInteractive);
    };

    const tick = () => {
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    // A rAF loop left running while the tab is hidden doesn't actually keep
    // ticking (browsers throttle/stop it), but it also isn't explicitly torn
    // down — some browsers still fire a backlog of frames right as the tab
    // regains focus. Stopping the loop on hide and restarting it fresh (with
    // x/y snapped straight to the last known target, not eased back in) on
    // show avoids any catch-up glide/jank at the moment of refocus.
    //
    // Deliberately NOT paused while the cart drawer/a modal is open: this
    // loop is what makes the cursor visually follow the mouse at all, so
    // pausing it there froze the cursor in place while hovering the drawer
    // (mousemove kept updating targetX/targetY, but nothing was left to
    // paint the interpolated position). The ambient decorative animations
    // (Hero floaters, card glows, this cursor's own idle-spin, etc.) are the
    // ones paused for the checkout-typing perf fix — not cursor tracking.
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        x = targetX;
        y = targetY;
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        }
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (!document.hidden) {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!active) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed left-0 top-0 z-[10050] h-7 w-7 pointer-events-none transition-opacity duration-200 will-change-transform"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div className="cursor-hover-scale h-full w-full transition-transform duration-200 ease-out">
        <div className="cursor-idle-spin relative h-full w-full">
          <Image
            src="/products/makhana1.png"
            alt=""
            fill
            className="rounded-full object-cover"
            sizes="28px"
          />
        </div>
      </div>
    </div>
  );
}
