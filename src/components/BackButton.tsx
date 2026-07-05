import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-primary/60 transition-colors duration-200 ease-in-out hover:text-accent-gold-strong"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back to Home
    </Link>
  );
}
