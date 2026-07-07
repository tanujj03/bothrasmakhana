import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/constants";
import Reveal from "./Reveal";

export default function InstagramStrip() {
  return (
    <section className="bg-bg-base py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-display text-2xl font-semibold text-text-primary transition-colors duration-200 ease-in-out hover:text-accent-gold-strong sm:text-3xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Follow {INSTAGRAM_HANDLE}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
