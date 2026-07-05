import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Page Not Found | BOTHRA'S SNACK'S MAKHANA",
  description:
    "The page you're looking for doesn't exist. Head back home to shop BOTHRA'S SNACK'S Makhana.",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-bg-base px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-md text-center">
        <Logo size={64} className="mx-auto mb-6" />
        <span className="eyebrow text-xs">404</span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-text-primary sm:text-5xl">
          This Pouch Is Empty
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-text-primary/60">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back to something crunchy.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-text-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-accent-gold transition-colors duration-200 ease-in-out hover:bg-text-primary-hover"
          >
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="rounded-lg border border-accent-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-accent-gold-strong transition-colors duration-200 ease-in-out hover:bg-accent-gold hover:text-bg-base"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
