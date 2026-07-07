import Reveal from "./Reveal";

export default function ThankYouNote() {
  return (
    <section className="bg-bg-base py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <Reveal className="flex justify-center">
          <div className="rounded-xl border border-accent-gold/60 px-10 py-6 sm:px-16 sm:py-8">
            <p
              className="font-display text-xl font-semibold tracking-wide sm:text-2xl"
              style={{ color: "var(--flavor-periperi)" }}
            >
              Thank You for Visiting BOTHRA&apos;S.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
