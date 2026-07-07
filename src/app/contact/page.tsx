"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import BackButton from "@/components/BackButton";
import {
  WHATSAPP_NUMBER,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  CONTACT_EMAIL,
  CITY_NAME,
} from "@/lib/constants";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [emailName, setEmailName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [emailPhone, setEmailPhone] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Enquiry from ${name || "website visitor"}:\n\n${message}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const isEmailAddressValid = EMAIL_PATTERN.test(emailAddress.trim());
  const isEmailFormValid =
    emailName.trim() !== "" &&
    isEmailAddressValid &&
    emailSubject.trim() !== "" &&
    emailMessage.trim() !== "";

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailFormValid) return;

    const body = [
      `Name: ${emailName}`,
      `Phone: ${emailPhone.trim() || "Not provided"}`,
      `Reply to: ${emailAddress}`,
      "",
      emailMessage,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="bg-bg-base py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <BackButton />

        <Reveal className="mb-14 text-center">
          <span className="eyebrow text-xs">Get In Touch</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-text-primary sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-sm text-text-primary/60">
            Already have an order and need help with it?{" "}
            <Link
              href="/help"
              className="font-semibold text-accent-gold-strong underline-offset-2 hover:underline"
            >
              Visit Help &amp; Support
            </Link>
            .
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hi BOTHRA'S SNACKS Makhana, I'd like to know more about your products."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col items-start gap-4 rounded-xl border border-accent-gold/40 bg-bg-secondary p-8 transition-colors duration-200 ease-in-out hover:border-accent-gold"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/15">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--accent-gold-strong)" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.9 9.9 0 0 0 4.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.9C21.96 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.34-.5.05-1.02.24-3.43-.72-2.9-1.16-4.76-4.1-4.9-4.29-.14-.19-1.17-1.56-1.17-2.98s.75-2.11 1.02-2.4c.26-.28.58-.35.77-.35h.55c.18 0 .42-.03.65.5.24.55.8 1.93.87 2.07.07.14.12.3.02.49-.1.19-.15.3-.3.46-.14.16-.3.36-.43.48-.15.14-.3.29-.13.57.17.28.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.33 1.44.28.14.44.12.6-.07.17-.19.72-.85.91-1.14.19-.28.38-.24.64-.14.26.1 1.65.78 1.94.92.28.14.47.21.54.33.07.13.07.71-.17 1.39z" />
                </svg>
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold text-text-primary">
                  Chat on WhatsApp
                </h2>
                <p className="mt-2 text-sm text-text-primary/60">
                  Fastest way to reach us. Tap to start a conversation.
                </p>
                <p className="mt-3 font-body text-sm font-semibold text-accent-gold-strong">
                  +91 92707 85725
                </p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-6 rounded-xl border border-black/5 bg-bg-secondary p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/15">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold-strong)" strokeWidth="1.6" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="var(--accent-gold-strong)" stroke="none" />
                  </svg>
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-text-primary">
                    Instagram
                  </h2>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent-gold-strong underline-offset-2 transition-all duration-200 ease-in-out hover:underline"
                  >
                    {INSTAGRAM_HANDLE}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/15">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold-strong)" strokeWidth="1.6" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-text-primary">
                    Email
                  </h2>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm text-accent-gold-strong underline-offset-2 transition-all duration-200 ease-in-out hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/15">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold-strong)" strokeWidth="1.6" aria-hidden="true">
                    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.4" />
                  </svg>
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-text-primary">
                    Location
                  </h2>
                  <p className="text-sm text-text-primary/60">{CITY_NAME}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-xl border border-black/5 bg-bg-secondary p-8"
          >
            <h2 className="font-display text-xl font-semibold text-text-primary">
              Send an Enquiry
            </h2>
            <p className="-mt-1 text-sm text-text-primary/60">
              We&apos;ll open WhatsApp with your message pre-filled.
            </p>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-medium text-text-primary/70">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-lg border border-black/10 bg-bg-base px-4 py-3 text-sm text-text-primary outline-none transition-all duration-200 focus:border-accent-gold focus:shadow-[0_0_0_3px_rgba(184,137,46,0.18)]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-medium text-text-primary/70">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="resize-none rounded-lg border border-black/10 bg-bg-base px-4 py-3 text-sm text-text-primary outline-none transition-all duration-200 focus:border-accent-gold focus:shadow-[0_0_0_3px_rgba(184,137,46,0.18)]"
              />
            </div>
            <button
              type="submit"
              className="mt-2 self-start rounded-lg bg-text-primary px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-accent-gold transition-colors duration-200 ease-in-out hover:bg-text-primary-hover"
            >
              Send via WhatsApp
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col gap-4 rounded-xl border border-black/5 bg-bg-secondary p-8"
          >
            <h2 className="font-display text-xl font-semibold text-text-primary">
              Or Email Us
            </h2>
            <p className="-mt-1 text-sm text-text-primary/60">
              We&apos;ll open your email app with this pre-filled.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email-name" className="text-xs font-medium text-text-primary/70">
                  Name
                </label>
                <input
                  id="email-name"
                  type="text"
                  value={emailName}
                  onChange={(e) => setEmailName(e.target.value)}
                  required
                  className="rounded-lg border border-black/10 bg-bg-base px-4 py-3 text-sm text-text-primary outline-none transition-all duration-200 focus:border-accent-gold focus:shadow-[0_0_0_3px_rgba(184,137,46,0.18)]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email-address" className="text-xs font-medium text-text-primary/70">
                  Your Email
                </label>
                <input
                  id="email-address"
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  required
                  className="rounded-lg border border-black/10 bg-bg-base px-4 py-3 text-sm text-text-primary outline-none transition-all duration-200 focus:border-accent-gold focus:shadow-[0_0_0_3px_rgba(184,137,46,0.18)]"
                />
                {emailAddress.trim() !== "" && !isEmailAddressValid && (
                  <p className="text-xs text-red-600">
                    Enter a valid email address.
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email-phone" className="text-xs font-medium text-text-primary/70">
                  Phone Number (optional)
                </label>
                <input
                  id="email-phone"
                  type="tel"
                  value={emailPhone}
                  onChange={(e) => setEmailPhone(e.target.value)}
                  className="rounded-lg border border-black/10 bg-bg-base px-4 py-3 text-sm text-text-primary outline-none transition-all duration-200 focus:border-accent-gold focus:shadow-[0_0_0_3px_rgba(184,137,46,0.18)]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email-subject" className="text-xs font-medium text-text-primary/70">
                  Subject
                </label>
                <input
                  id="email-subject"
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  required
                  className="rounded-lg border border-black/10 bg-bg-base px-4 py-3 text-sm text-text-primary outline-none transition-all duration-200 focus:border-accent-gold focus:shadow-[0_0_0_3px_rgba(184,137,46,0.18)]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email-message" className="text-xs font-medium text-text-primary/70">
                Message
              </label>
              <textarea
                id="email-message"
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                required
                rows={4}
                className="resize-none rounded-lg border border-black/10 bg-bg-base px-4 py-3 text-sm text-text-primary outline-none transition-all duration-200 focus:border-accent-gold focus:shadow-[0_0_0_3px_rgba(184,137,46,0.18)]"
              />
            </div>

            <button
              type="submit"
              disabled={!isEmailFormValid}
              className="mt-2 self-start rounded-lg bg-text-primary px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-accent-gold transition-colors duration-200 ease-in-out hover:bg-text-primary-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-text-primary"
            >
              Send via Email
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
