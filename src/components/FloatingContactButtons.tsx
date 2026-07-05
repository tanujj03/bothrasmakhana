"use client";

import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useCartStore, cartItemCount } from "@/lib/store";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/constants";

const WHATSAPP_FLOAT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi BOTHRA'S SNACK'S Makhana, I'd like to know more about your products."
)}`;

// Shared shell for both floating buttons — same size/shape/shadow/hover so
// they read as a matched pair despite the different fill colors.
function FloatButton({
  href,
  label,
  className = "",
  style,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={style}
      className={`group relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform duration-200 ease-out hover:scale-110 ${className}`}
    >
      {children}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-text-primary px-3 py-1.5 text-xs font-medium text-bg-base opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
        {label}
      </span>
    </a>
  );
}

export default function FloatingContactButtons() {
  const items = useCartStore((s) => s.items);
  const count = cartItemCount(items);

  return (
    <div
      className={`fixed right-5 z-40 flex flex-col items-end gap-3 sm:right-6 ${
        count > 0 ? "bottom-24 sm:bottom-6" : "bottom-6"
      }`}
    >
      <FloatButton
        href={INSTAGRAM_URL}
        label="Follow us on Instagram"
        className="text-white"
        style={{
          background:
            "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
        }}
      >
        <FaInstagram size={22} />
      </FloatButton>

      <FloatButton
        href={WHATSAPP_FLOAT_URL}
        label="Chat on WhatsApp"
        className="bg-[#25D366] text-white"
      >
        <FaWhatsapp size={26} />
      </FloatButton>
    </div>
  );
}
