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
