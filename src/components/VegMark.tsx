// Regulation-style Indian vegetarian mark: green square outline on a white
// ground with a solid green dot inside. Colors are fixed (not themed) since
// this is a recognized food-safety symbol, not decorative site iconography.
export default function VegMark({
  size = 22,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label="100% Vegetarian"
    >
      <rect x="1.5" y="1.5" width="21" height="21" rx="2.5" fill="#ffffff" stroke="#0a7d2c" strokeWidth="2" />
      <circle cx="12" cy="12" r="6.5" fill="#0a7d2c" />
    </svg>
  );
}
