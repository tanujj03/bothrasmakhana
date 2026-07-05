"use client";

import Reveal from "@/components/Reveal";
import BackButton from "@/components/BackButton";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/constants";

const WHATSAPP_SUPPORT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi BOTHRA'S SNACK'S Makhana, I need help with my order."
)}`;

function WhatsAppButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_SUPPORT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-lg bg-text-primary px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-accent-gold transition-colors duration-200 ease-in-out hover:bg-text-primary-hover ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.9 9.9 0 0 0 4.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.9C21.96 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.34-.5.05-1.02.24-3.43-.72-2.9-1.16-4.76-4.1-4.9-4.29-.14-.19-1.17-1.56-1.17-2.98s.75-2.11 1.02-2.4c.26-.28.58-.35.77-.35h.55c.18 0 .42-.03.65.5.24.55.8 1.93.87 2.07.07.14.12.3.02.49-.1.19-.15.3-.3.46-.14.16-.3.36-.43.48-.15.14-.3.29-.13.57.17.28.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.33 1.44.28.14.44.12.6-.07.17-.19.72-.85.91-1.14.19-.28.38-.24.64-.14.26.1 1.65.78 1.94.92.28.14.47.21.54.33.07.13.07.71-.17 1.39z" />
      </svg>
      Chat with us on WhatsApp
    </a>
  );
}

function InstagramButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-lg bg-text-primary px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-accent-gold transition-colors duration-200 ease-in-out hover:bg-text-primary-hover ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
      Chat with us on Instagram
    </a>
  );
}

const HELP_ITEMS: AccordionItem[] = [
  {
    q: "I placed an order but didn't get a confirmation message",
    a: (
      <>
        First, double-check that your WhatsApp message actually went
        through — not just that the chat opened. If it looks like it
        wasn&apos;t sent, head back to your cart and tap &quot;Place Order via
        WhatsApp&quot; again.
        <br />
        <br />
        If it was sent and you haven&apos;t heard back within a few hours
        during business hours, just message the same WhatsApp number again
        to follow up — we&apos;ll get right back to you.
      </>
    ),
  },
  {
    q: "How do I track my order?",
    a: (
      <>
        All order tracking happens over WhatsApp — once your order ships,
        we&apos;ll send you a tracking ID and courier link in the same chat
        you placed your order in.
        <br />
        <br />
        There&apos;s no separate tracking page on the site right now, so
        keep an eye on that WhatsApp chat for updates.
      </>
    ),
  },
  {
    q: "I paid via UPI but haven't received confirmation",
    a: (
      <>
        After paying via UPI, send us a screenshot of the payment on the
        same WhatsApp order chat so we can match it and confirm your order.
        UPI confirmation isn&apos;t automatic right now — it&apos;s verified
        manually as soon as we see your screenshot.
      </>
    ),
  },
  {
    q: "I want to cancel or change my order",
    a: (
      <>
        Message the same WhatsApp chat as soon as possible with what
        you&apos;d like to change or cancel. This is handled manually, so
        it&apos;s easiest — and fastest — before your order ships.
      </>
    ),
  },
  {
    q: "I haven't received my order yet",
    a: (
      <>
        Check the tracking link sent to you on WhatsApp for the estimated
        delivery window. If it&apos;s past that window, message the same
        WhatsApp chat and we&apos;ll chase it up for you.
      </>
    ),
  },
  {
    q: "Who do I contact for anything else?",
    a: (
      <>
        <p>
          WhatsApp or Instagram — whichever you prefer, we&apos;re just a
          message away for order issues, questions, or anything else on your
          mind.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <WhatsAppButton />
          <InstagramButton />
        </div>
      </>
    ),
  },
];

export default function HelpPage() {
  return (
    <section className="bg-bg-base py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <BackButton />

        <Reveal className="mb-10 text-center">
          <span className="eyebrow text-xs">We&apos;re Here to Help</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-text-primary sm:text-5xl">
            Help &amp; Support
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-primary/70 sm:text-base">
            Something not quite right with your order? No stress — everything
            from confirmations to tracking to changes is sorted out over
            WhatsApp, the same place you placed your order. Pick a topic
            below, or message us directly.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mb-10 flex justify-center">
          <WhatsAppButton />
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion items={HELP_ITEMS} />
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex justify-center">
          <WhatsAppButton />
        </Reveal>
      </div>
    </section>
  );
}
