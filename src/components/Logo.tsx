import Image from "next/image";

export default function Logo({
  size = 40,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/products/logo.png"
      alt="BOTHRA'S SNACK'S Makhana"
      width={size}
      height={size}
      priority={priority}
      className={`rounded-full object-contain ${className}`}
    />
  );
}
