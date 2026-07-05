import { RevealGroup, RevealItem } from "./Reveal";
import SectionHeading from "./SectionHeading";

const TESTIMONIALS = [
  {
    name: "Sunny Chandarana",
    quote:
      "The Peri Peri flavor is unreal — spicy, crunchy, and doesn't feel like a guilty snack at all. Ordering again this week.",
    rating: 4,
  },
  {
    name: "Vedant",
    quote:
      "Bhai packaging dekh ke hi impress ho gaya tha, taste to usse bhi zyada mast nikla. Peri Peri, Chat Masala, aur Pudina teeno try kiye — sabse favorite abhi tak yehi hain.",
    rating: 5,
  },
  {
    name: "Vishal Lekhrajani",
    quote:
      "Good quality makhana, light and crunchy like they claim. Would love to see bigger pack sizes soon.",
    rating: 3,
  },
  {
    name: "Yash Jain",
    quote:
      "Roasted not fried wala baat sach mein feel hoti hai khane mein — bilkul heavy nahi lagta. Chat Masala flavor toh zabardast hai.",
    rating: 5,
  },
  {
    name: "Jagdish Parkhi",
    quote:
      "Finally a snack that's actually healthy and doesn't compromise on taste. Pudina is my evening go-to now.",
    rating: 4,
  },
  {
    name: "Kishore Chandani",
    quote:
      "Quality premium lagti hai, price bhi reasonable hai launch offer ke saath. Classic Roasted best hai simple snacking ke liye.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What People Say"
          title="Loved By Our Customers"
          className="mb-12"
        />

        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <RevealItem key={t.name}>
              <div className="flex h-full flex-col rounded-xl border-[2.5px] border-accent-gold/50 bg-bg-base p-7 shadow-sm transition-colors duration-300 hover:border-accent-gold/80">
                <span className="font-display text-4xl leading-none text-text-primary/20">
                  &ldquo;
                </span>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-primary/75">
                  {t.quote}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-body text-sm font-semibold text-text-primary">
                    {t.name}
                  </span>
                  <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={i < t.rating ? "var(--accent-gold)" : "none"}
                        stroke="var(--accent-gold)"
                        strokeWidth="1.2"
                        aria-hidden="true"
                      >
                        <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7-5.4-4.7 7.1-.6L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
