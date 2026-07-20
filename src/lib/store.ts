import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRICING, type SizeKey, DEFAULT_SIZE } from "./constants";

export interface CartItem {
  id: string;
  size: SizeKey;
  name: string;
  flavorColor: string;
  image: string;
  price: number;
  qty: number;
}

const lineKey = (id: string, size: SizeKey) => `${id}::${size}`;

export const COUPONS: Record<string, number> = {
  CRUNCH15: 15,
};

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string | null;
  addItem: (
    item: Omit<CartItem, "qty" | "price"> & { size?: SizeKey; price?: number },
    qty?: number
  ) => void;
  incrementItem: (id: string, size: SizeKey) => void;
  decrementItem: (id: string, size: SizeKey) => void;
  removeItem: (id: string, size: SizeKey) => void;
  changeItemSize: (id: string, oldSize: SizeKey, newSize: SizeKey) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      couponCode: null,
      addItem: (item, qty = 1) =>
        set((state) => {
          const size = item.size ?? DEFAULT_SIZE;
          const price = item.price ?? PRICING[size].offer;
          const existing = state.items.find(
            (i) => lineKey(i.id, i.size) === lineKey(item.id, size)
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                lineKey(i.id, i.size) === lineKey(item.id, size)
                  ? { ...i, qty: i.qty + qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, size, price, qty }] };
        }),
      incrementItem: (id, size) =>
        set((state) => ({
          items: state.items.map((i) =>
            lineKey(i.id, i.size) === lineKey(id, size)
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        })),
      decrementItem: (id, size) =>
        set((state) => {
          const items = state.items
            .map((i) =>
              lineKey(i.id, i.size) === lineKey(id, size)
                ? { ...i, qty: i.qty - 1 }
                : i
            )
            .filter((i) => i.qty > 0);
          return {
            items,
            couponCode: items.length === 0 ? null : state.couponCode,
          };
        }),
      removeItem: (id, size) =>
        set((state) => {
          const items = state.items.filter(
            (i) => lineKey(i.id, i.size) !== lineKey(id, size)
          );
          return {
            items,
            couponCode: items.length === 0 ? null : state.couponCode,
          };
        }),
      changeItemSize: (id, oldSize, newSize) =>
        set((state) => {
          const target = state.items.find(
            (i) => lineKey(i.id, i.size) === lineKey(id, oldSize)
          );
          if (!target) return state;

          const collision = state.items.find(
            (i) => lineKey(i.id, i.size) === lineKey(id, newSize)
          );

          if (collision) {
            return {
              items: state.items
                .filter((i) => lineKey(i.id, i.size) !== lineKey(id, oldSize))
                .map((i) =>
                  lineKey(i.id, i.size) === lineKey(id, newSize)
                    ? { ...i, qty: i.qty + target.qty }
                    : i
                ),
            };
          }

          return {
            items: state.items.map((i) =>
              lineKey(i.id, i.size) === lineKey(id, oldSize)
                ? { ...i, size: newSize, price: PRICING[newSize].offer }
                : i
            ),
          };
        }),
      clearCart: () => set({ items: [], couponCode: null }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      applyCoupon: (code) => {
        const normalized = code.trim().toUpperCase();
        const isValid = normalized in COUPONS;
        if (isValid) set({ couponCode: normalized });
        return isValid;
      },
      clearCoupon: () => set({ couponCode: null }),
    }),
    {
      name: "bothras-cart",
      partialize: (state) => ({ items: state.items, couponCode: state.couponCode }),
    }
  )
);

export const cartItemCount = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.qty, 0);

export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.qty * i.price, 0);

export const couponPercent = (couponCode: string | null | undefined) =>
  couponCode ? COUPONS[couponCode] ?? 0 : 0;

export const cartDiscount = (items: CartItem[], couponCode: string | null | undefined) =>
  Math.round((cartSubtotal(items) * couponPercent(couponCode)) / 100);

export const cartTotal = (items: CartItem[], couponCode: string | null | undefined) =>
  cartSubtotal(items) - cartDiscount(items, couponCode);

export type PaymentMethod = "cod" | "upi" | "razorpay";

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  pincode: string;
  paymentMethod: PaymentMethod;
}

// Isolated function - swap the body of this for a real Razorpay API call once KYC is approved.
// NOTE: the real Razorpay Payment Links API needs a secret key, which cannot live in frontend code.
// Activating this for real requires a small server-side API route (e.g. /api/create-payment-link)
// that this function calls — this is the one part of this feature that isn't purely frontend.
export async function generateRazorpayLink(orderDetails: {
  amount: number;
  customerName: string;
  customerPhone: string;
}): Promise<string> {
  // TODO: replace with real call to /api/create-payment-link once Razorpay KYC is approved
  void orderDetails;
  return "https://rzp.io/l/placeholder-order-link";
}

export function buildWhatsAppOrderMessage(
  items: CartItem[],
  customer: CustomerDetails,
  razorpayLink?: string,
  couponCode?: string | null
) {
  const lines = items.map((item, idx) => {
    const lineTotal = item.qty * item.price;
    return `${idx + 1}. ${item.name} (${item.size}) x${item.qty} - ₹${lineTotal}`;
  });
  const subtotal = cartSubtotal(items);
  const discount = cartDiscount(items, couponCode);
  const total = subtotal - discount;

  const totalLines =
    discount > 0
      ? [
          `Subtotal: ₹${subtotal}`,
          `Coupon (${couponCode}): -₹${discount}`,
          `Total: ₹${total}`,
        ]
      : [`Total: ₹${total}`];

  const paymentLines =
    customer.paymentMethod === "upi"
      ? ["Payment: UPI (screenshot to follow)"]
      : customer.paymentMethod === "razorpay"
        ? [
            "Payment: Online via Razorpay",
            ...(razorpayLink ? [`Pay here: ${razorpayLink}`] : []),
          ]
        : ["Payment: Cash on Delivery"];

  return [
    "New Order - BOTHRA'S SNACKS Makhana",
    "",
    `Customer: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Address: ${customer.address}`,
    `Pincode: ${customer.pincode}`,
    "",
    "Order:",
    ...lines,
    "",
    ...totalLines,
    ...paymentLines,
  ].join("\n");
}

export function whatsappCheckoutUrl(
  items: CartItem[],
  customer: CustomerDetails,
  number: string,
  razorpayLink?: string,
  couponCode?: string | null
) {
  const text = encodeURIComponent(
    buildWhatsAppOrderMessage(items, customer, razorpayLink, couponCode)
  );
  return `https://wa.me/${number}?text=${text}`;
}

/**
 * Single entry point for placing an order. Isolated so a real backend/payment
 * gateway can replace the WhatsApp redirect later without touching callers.
 */
export async function submitOrder(
  items: CartItem[],
  customer: CustomerDetails,
  whatsappNumber: string,
  couponCode?: string | null
) {
  let razorpayLink: string | undefined;
  if (customer.paymentMethod === "razorpay") {
    razorpayLink = await generateRazorpayLink({
      amount: cartTotal(items, couponCode),
      customerName: customer.name,
      customerPhone: customer.phone,
    });
  }
  const url = whatsappCheckoutUrl(
    items,
    customer,
    whatsappNumber,
    razorpayLink,
    couponCode
  );
  window.open(url, "_blank");
}
