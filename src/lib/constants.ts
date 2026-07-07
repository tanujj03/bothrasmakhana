// Production domain — used as the base for metadataBase, canonical URLs,
// sitemap.xml, and robots.txt.
export const SITE_URL = "https://www.bothrassnacks.com";

export const WHATSAPP_NUMBER = "919270785725";
export const INSTAGRAM_HANDLE = "@bothrassnacks";
export const INSTAGRAM_URL = "https://www.instagram.com/bothrassnacks/";
export const CONTACT_EMAIL = "bothrassnacks@gmail.com";
export const CITY_NAME = "Hinganghat";

export type SizeKey = "50g" | "75g" | "100g";

export const SIZES: SizeKey[] = ["50g", "75g", "100g"];

export const DEFAULT_SIZE: SizeKey = "50g";

export const PRICING: Record<SizeKey, { mrp: number; offer: number }> = {
  "50g": { mrp: 199, offer: 179 },
  "75g": { mrp: 269, offer: 242 },
  "100g": { mrp: 339, offer: 305 },
};

export const LAUNCH_OFFER_TEXT =
  "Launch Offer — Valid for First 100 Customers Only";

// Legal/compliance placeholders — registration is in progress. Replace both
// with the actual numbers as soon as they're issued; every legal page reads
// from here so there's a single place to update.
export const FSSAI_LICENSE_NO = "[FSSAI License No. — to be updated]";
export const GST_NO = "[GST No. — to be updated]";

export const LEGAL_ENTITY_NAME = "BOTHRA'S SNACKS";
export const LEGAL_LAST_UPDATED = "July 8, 2026";

// ASSUMPTION: confirm this against actual courier SLA. FAQ.tsx imports this
// constant too, so updating it here is the only place needed.
export const ESTIMATED_DELIVERY_WINDOW = "3-7 business days";
