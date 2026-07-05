const ICONS: Record<string, React.ReactNode> = {
  "Low Calorie": (
    <path d="M12 3v6m0 0c-3.3 0-6 2.7-6 6a6 6 0 0012 0c0-3.3-2.7-6-6-6z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "Protein Rich": (
    <path d="M6 3h4l2 4 2-4h4l-3 8 2 10H9l2-10L6 3z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "Gluten Free": (
    <path d="M12 2l2.5 5L20 8.5l-4 4 1 5.5L12 15l-5 3 1-5.5-4-4L9.5 7 12 2z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "Light & Crunchy": (
    <path d="M4 12c2-4 4-6 8-6s6 2 8 6c-2 4-4 6-8 6s-6-2-8-6z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "Roasted Not Fried": (
    <path d="M6 20c-2-3-2-7 0-10 1 1.5 1.5 2 1.5 2S7 9 9 6c1 2 3 2.5 4 4.5 1-1 1-2 1-2 2 2 3 5 2 7.5-1 2.5-3.5 4-6 4s-3-1-4-2z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "Net Weight 50g": (
    <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

export default function ProductBadges({
  badges,
  className = "",
}: {
  badges: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-x-4 gap-y-2 ${className}`}>
      {badges.map((badge) => (
        <li
          key={badge}
          className="flex items-center gap-1.5 text-[11px] font-medium text-text-primary/70"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="shrink-0 text-text-primary/45"
            aria-hidden="true"
          >
            {ICONS[badge]}
          </svg>
          {badge}
        </li>
      ))}
    </ul>
  );
}
