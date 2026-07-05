"use client";

import { useState } from "react";
import type { CartItem, CustomerDetails, PaymentMethod } from "@/lib/store";
import { submitOrder } from "@/lib/store";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const PHONE_RE = /^\d{10}$/;
const PINCODE_RE = /^\d{6}$/;

export default function CheckoutForm({
  items,
  onBack,
  onSubmitted,
}: {
  items: CartItem[];
  onBack: () => void;
  onSubmitted: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required";
    if (!PHONE_RE.test(phone)) next.phone = "Enter a valid 10-digit phone number";
    if (!address.trim()) next.address = "Address is required";
    if (!PINCODE_RE.test(pincode)) next.pincode = "Enter a valid 6-digit pincode";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const customer: CustomerDetails = {
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      pincode: pincode.trim(),
      paymentMethod,
    };

    await submitOrder(items, customer, WHATSAPP_NUMBER);
    onSubmitted();
  };

  const fieldClass =
    "rounded-lg border border-black/10 bg-bg-base px-3.5 py-2.5 text-sm text-text-primary outline-none transition-all duration-200 focus:border-accent-gold focus:shadow-[0_0_0_3px_rgba(184,137,46,0.18)]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-4">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-1.5 text-xs font-medium text-text-primary/60 transition-colors duration-200 ease-in-out hover:text-accent-gold-strong"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to cart
      </button>

      <h3 className="font-display text-lg font-semibold text-text-primary">
        Delivery Details
      </h3>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="co-name" className="text-xs font-medium text-text-primary/70">
          Name
        </label>
        <input
          id="co-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />
        {errors.name && <p className="text-xs text-flavor-periperi">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="co-phone" className="text-xs font-medium text-text-primary/70">
          Phone
        </label>
        <input
          id="co-phone"
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          className={fieldClass}
        />
        {errors.phone && <p className="text-xs text-flavor-periperi">{errors.phone}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="co-address" className="text-xs font-medium text-text-primary/70">
          Address
        </label>
        <textarea
          id="co-address"
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={`resize-none ${fieldClass}`}
        />
        {errors.address && <p className="text-xs text-flavor-periperi">{errors.address}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="co-pincode" className="text-xs font-medium text-text-primary/70">
          Pincode
        </label>
        <input
          id="co-pincode"
          inputMode="numeric"
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          className={fieldClass}
        />
        {errors.pincode && <p className="text-xs text-flavor-periperi">{errors.pincode}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-text-primary/70">Payment Method</span>
          <span className="flex items-center gap-1 text-[11px] font-medium text-text-primary/50">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="5" y="11" width="14" height="9" rx="1.5" />
              <path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round" />
            </svg>
            Secure Payment
          </span>
        </div>
        <p className="-mt-0.5 text-[11px] text-text-primary/50">
          Your order will be finalized on WhatsApp — you&apos;ll receive order
          confirmation and all updates there.
        </p>
        <div className="flex flex-col gap-2">
          {(
            [
              { key: "cod", label: "Cash on Delivery", sub: null },
              {
                key: "upi",
                label: "Pay via UPI",
                sub: "You'll receive the QR code on WhatsApp — payment and checkout will happen there.",
              },
            ] as const
          ).map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setPaymentMethod(opt.key)}
              className={`flex flex-col items-start rounded-lg border px-3.5 py-2.5 text-left transition-colors ${
                paymentMethod === opt.key
                  ? "border-text-primary bg-text-primary text-accent-gold"
                  : "border-black/10 text-text-primary/60"
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-wide">
                {opt.label}
              </span>
              {opt.sub && (
                <span
                  className={`mt-0.5 text-[11px] normal-case tracking-normal ${
                    paymentMethod === opt.key
                      ? "text-accent-gold/70"
                      : "text-text-primary/40"
                  }`}
                >
                  {opt.sub}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-text-primary px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-accent-gold transition-colors duration-200 ease-in-out hover:bg-text-primary-hover"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.9 9.9 0 0 0 4.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.9C21.96 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.34-.5.05-1.02.24-3.43-.72-2.9-1.16-4.76-4.1-4.9-4.29-.14-.19-1.17-1.56-1.17-2.98s.75-2.11 1.02-2.4c.26-.28.58-.35.77-.35h.55c.18 0 .42-.03.65.5.24.55.8 1.93.87 2.07.07.14.12.3.02.49-.1.19-.15.3-.3.46-.14.16-.3.36-.43.48-.15.14-.3.29-.13.57.17.28.75 1.25 1.62 2.02 1.11.99 2.05 1.3 2.33 1.44.28.14.44.12.6-.07.17-.19.72-.85.91-1.14.19-.28.38-.24.64-.14.26.1 1.65.78 1.94.92.28.14.47.21.54.33.07.13.07.71-.17 1.39z" />
        </svg>
        Place Order via WhatsApp
      </button>
      <p className="-mt-1 text-center text-[11px] text-text-primary/50">
        All checkout, payment, and order updates happen via WhatsApp.
      </p>
    </form>
  );
}
