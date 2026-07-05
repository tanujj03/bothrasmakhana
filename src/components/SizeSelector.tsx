import { SIZES, type SizeKey } from "@/lib/constants";

export default function SizeSelector({
  value,
  onChange,
  size = "md",
}: {
  value: SizeKey;
  onChange: (size: SizeKey) => void;
  size?: "sm" | "md";
}) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-black/10 p-1"
      role="radiogroup"
      aria-label="Select size"
    >
      {SIZES.map((s) => (
        <button
          key={s}
          type="button"
          role="radio"
          aria-checked={s === value}
          onClick={(e) => {
            e.stopPropagation();
            onChange(s);
          }}
          className={`rounded-full font-semibold uppercase tracking-wide transition-colors duration-200 ${
            size === "sm" ? "px-2.5 py-1 text-[10px]" : "px-3.5 py-1.5 text-xs"
          } ${
            s === value
              ? "bg-text-primary text-accent-gold"
              : "text-text-primary/60 hover:text-accent-gold-strong"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
