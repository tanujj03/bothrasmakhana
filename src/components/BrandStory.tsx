import Image from "next/image";
import Reveal from "./Reveal";

export default function BrandStory() {
  return (
    <section className="bg-bg-base py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-t-full rounded-b-xl shadow-2xl ring-1 ring-black/5">
            <Image
              src="/products/owner.png"
              alt="Jainam Bothra, founder of BOTHRA'S SNACK'S Makhana"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 400px"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <span className="eyebrow text-xs">Our Story</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-text-primary sm:text-4xl">
            Founded by Jainam Bothra
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-primary/70">
            BOTHRA&apos;S SNACK&apos;S MAKHANA was born from a simple belief — that
            snacking shouldn&apos;t be a compromise. Every batch is roasted,
            never fried, preserving the natural crunch and nutrition of
            premium fox nuts without a drop of excess oil.
          </p>
          <p className="mt-4 text-base leading-relaxed text-text-primary/70">
            &ldquo;Not Just a Snack. A Statement.&rdquo; isn&apos;t just our
            line — it&apos;s the standard we hold every pouch to. From
            sourcing to roasting to the final seasoning, quality is never
            negotiable.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
