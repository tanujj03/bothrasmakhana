export type Spice = "mild" | "spicy";
export type ProductBadgeTag = "best-seller" | "new";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  flavorColorVar: string;
  image: string;
  spice: Spice;
  // Hero carousel presentation — kept on the same record as everything else
  // so display order only ever needs to change in one place (this array).
  heroImage: string;
  heroName: string;
  heroLine: string;
  heroSub: string;
  flavorHex: string;
  // Small supporting badge shown alongside "Launch Offer" on product cards.
  badge?: ProductBadgeTag;
}

const SHARED_BADGES = [
  "Low Calorie",
  "Protein Rich",
  "Gluten Free",
  "Light & Crunchy",
] as const;

// Every field below was re-verified against the actual image files in
// /public/products/ (not assumed from filename numbers) after a prior reorder
// left image/heroImage pointing at the wrong flavor. Ground truth used:
//   product2.jpg = Peri Peri (maroon pouch)   product4.jpg = Classic Roasted (beige pouch)
//   product5.jpg = Pudina (green pouch)       product3.jpg = Chat Masala (brown pouch)
//   product1.jpg = Turmeric Fusion (gold pouch)
//   makhana5.png = Peri Peri (red-dusted)     makhana1.png = Classic Roasted (plain speckle)
//   makhana2.png = Pudina (green flecks)      makhana3.png = Chat Masala (brown dusted)
//   makhana4.png = Turmeric Fusion (golden)
export const PRODUCTS: Product[] = [
  {
    id: "product2",
    name: "Peri Peri Makhana",
    tagline: "Spicy, Tangy, Irresistible",
    description:
      "Bold peri peri spice with a fiery kick and tangy finish. For those who like their snacking with a little heat and a lot of character.",
    flavorColorVar: "var(--flavor-periperi)",
    image: "/products/product2.jpg",
    spice: "spicy",
    heroImage: "/products/makhana5.png",
    heroName: "Peri Peri",
    heroLine: "Heat With Character.",
    heroSub:
      "Bold peri peri heat meets protein-rich crunch — for those who take their snacking seriously.",
    flavorHex: "#6b2130",
    badge: "best-seller",
  },
  {
    id: "product4",
    name: "Classic Roasted Makhana",
    tagline: "Simply Roasted, Lightly Salted, Naturally Delicious",
    description:
      "Our signature makhana, roasted to a light crunch and finished with a whisper of sea salt. Nothing added that doesn't need to be there — just the pure, nutty flavour of premium fox nuts.",
    flavorColorVar: "var(--flavor-classic)",
    image: "/products/product4.jpg",
    spice: "mild",
    heroImage: "/products/makhana1.png",
    heroName: "Classic Roasted",
    heroLine: "The Original, Perfected.",
    heroSub:
      "Roasted, not fried. Protein-rich and low calorie. A guilt-free indulgence crafted for those who refuse to settle for ordinary.",
    flavorHex: "#8b6f47",
  },
  {
    id: "product5",
    name: "Pudina Makhana",
    tagline: "Fresh, Minty, Irresistible",
    description:
      "A cooling burst of fresh mint layered over our roasted makhana. Bright, herbaceous, and endlessly snackable — perfect for when you want something light yet full of flavour.",
    flavorColorVar: "var(--flavor-pudina)",
    image: "/products/product5.jpg",
    spice: "mild",
    heroImage: "/products/makhana2.png",
    heroName: "Pudina",
    heroLine: "Cool Comes Standard.",
    heroSub:
      "Cool, fresh mint meets golden crunch — a refreshing twist on India's favourite superfood snack.",
    flavorHex: "#4a6b3a",
    badge: "best-seller",
  },
  {
    id: "product3",
    name: "Chat Masala Makhana",
    tagline: "Zesty, Tangy, Irresistible",
    description:
      "A tangy hit of classic Indian chat masala on every bite. Zesty, tangy and moreish — this one brings the street-food thrill straight to your snack bowl.",
    flavorColorVar: "var(--flavor-chatmasala)",
    image: "/products/product3.jpg",
    spice: "spicy",
    heroImage: "/products/makhana3.png",
    heroName: "Chat Masala",
    heroLine: "India's Favourite, Reinvented.",
    heroSub:
      "Every bite carries the zest of classic Indian chaat spice, roasted to a perfect crunch.",
    flavorHex: "#4a3220",
    badge: "best-seller",
  },
  {
    id: "product1",
    name: "Turmeric Fusion Makhana",
    tagline: "Spicy, Tangy, Irresistible",
    description:
      "Golden turmeric fused with warm spice notes for a snack that's as good for you as it looks. Earthy, aromatic, and quietly addictive.",
    flavorColorVar: "var(--flavor-turmeric)",
    image: "/products/product1.jpg",
    spice: "spicy",
    heroImage: "/products/makhana4.png",
    heroName: "Turmeric Fusion",
    heroLine: "Gold, Inside and Out.",
    heroSub:
      "Earthy turmeric and golden spice, roasted to royalty — as good for you as it tastes.",
    flavorHex: "#c89b3c",
    badge: "new",
  },
];

export const PRODUCT_BADGES = SHARED_BADGES;
