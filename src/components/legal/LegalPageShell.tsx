import Reveal from "@/components/Reveal";
import BackButton from "@/components/BackButton";
import { LEGAL_LAST_UPDATED } from "@/lib/constants";

export default function LegalPageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-bg-base py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <BackButton />

        <Reveal className="mb-10">
          <span className="eyebrow text-xs">{eyebrow}</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-text-primary sm:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 text-sm leading-relaxed text-text-primary/70 sm:text-base">
              {intro}
            </p>
          )}
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-text-primary/40">
            Last updated: {LEGAL_LAST_UPDATED}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="rounded-xl border border-black/5 bg-bg-secondary p-6 sm:p-10">
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 first:mt-0">
      <h2 className="font-display text-xl font-semibold text-text-primary sm:text-2xl">
        {heading}
      </h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-text-primary/70 sm:text-base [&_a]:font-semibold [&_a]:text-accent-gold-strong [&_a]:underline-offset-2 [&_a:hover]:underline [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:font-semibold [&_strong]:text-text-primary [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}
