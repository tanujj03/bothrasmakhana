import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import BackButton from "@/components/BackButton";
import { CITY_NAME } from "@/lib/constants";

const TITLE = "About Us | BOTHRA'S SNACKS MAKHANA";
const DESCRIPTION =
  "Meet Jainam Bothra, founder of BOTHRA'S SNACKS Makhana, and discover the story behind our roasted-not-fried, premium fox nut snacks.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/about",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "BOTHRA'S SNACKS Makhana — Classic Roasted pouch" }],
  },
};

export default function AboutPage() {
  return (
    <section className="bg-bg-base py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <BackButton />

        <Reveal className="mb-14 text-center">
          <span className="eyebrow text-xs">About Us</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-text-primary sm:text-5xl">
            The Story Behind BOTHRA&apos;S SNACKS
          </h1>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-full rounded-b-xl shadow-2xl ring-1 ring-black/5">
              <Image
                src="/products/owner.png"
                alt="Jainam Bothra, founder of BOTHRA'S SNACKS Makhana"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 450px"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-5">
            <h2 className="font-display text-2xl font-semibold text-text-primary sm:text-3xl">
              Jainam Bothra
            </h2>
            <p className="text-base leading-relaxed text-text-primary/70">
              BOTHRA&apos;S SNACKS MAKHANA began with a simple frustration: every
              snack on the shelf asked you to trade flavour for health, or
              health for flavour. Jainam set out to build something that
              asked for neither compromise — a premium roasted makhana that
              tastes indulgent and eats clean.
            </p>
            <p className="text-base leading-relaxed text-text-primary/70">
              Every pouch is roasted, never fried — locking in the natural
              crunch of fox nuts without a drop of excess oil. It&apos;s a
              slower, more deliberate process, but it&apos;s the only way
              Jainam believes a snack should be made.
            </p>
            <p className="text-base leading-relaxed text-text-primary/70">
              &ldquo;Not Just a Snack. A Statement.&rdquo; is more than a
              tagline — it&apos;s a promise that quality is never
              negotiable, from sourcing to seasoning to the final seal on
              every pouch.
            </p>
            <p className="font-body text-sm font-medium text-accent-gold-strong">
              Proudly based in {CITY_NAME}.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
