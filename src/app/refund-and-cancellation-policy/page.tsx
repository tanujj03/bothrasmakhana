import LegalPageShell, { LegalSection } from "@/components/legal/LegalPageShell";
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from "@/lib/constants";

export default function RefundAndCancellationPolicyPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Refund &amp; Cancellation Policy"
      intro="Because our products are packaged food items, this policy is built around food safety and hygiene, alongside a fair process if something genuinely goes wrong with your order."
    >
      <LegalSection heading="1. Damaged in Transit or Wrong Item Delivered">
        <p>
          If your sealed, unopened packet arrives damaged, or you receive
          the wrong item, we&apos;ll arrange a replacement or refund — as
          long as you let us know within 24-48 hours of delivery, on the same
          WhatsApp chat you ordered through, with clear photos of:
        </p>
        <ul>
          <li>The outer packaging/shipping box</li>
          <li>The product itself, showing the damage or the incorrect item received</li>
        </ul>
        <p>
          Once we&apos;ve verified the photo proof, we&apos;ll arrange either
          a replacement of the affected item or a refund, whichever you
          prefer.
        </p>
      </LegalSection>

      <LegalSection heading="2. Opened or Used Packets">
        <p>
          For food hygiene and safety reasons, we cannot accept returns,
          refunds, or replacements once a packet has been opened or
          consumed. This applies regardless of the reason for the return
          request.
        </p>
      </LegalSection>

      <LegalSection heading="3. Change of Mind or Taste Preference">
        <p>
          Since our makhana is a consumable food product that cannot be
          resold once shipped, we&apos;re unable to accept returns or offer
          refunds for &quot;change of mind&quot; or simply not liking a
          flavor. We&apos;d encourage trying our sample pack or smaller sizes
          first if you&apos;re unsure about a flavor.
        </p>
      </LegalSection>

      <LegalSection heading="4. Quality Issues">
        <p>
          If you receive a sealed packet, still within its printed expiry
          date, that has a genuine quality issue (for example, an off taste
          or texture inconsistent with our usual roasting standard), message
          us on WhatsApp with photo proof and we&apos;ll arrange a
          replacement.
        </p>
      </LegalSection>

      <LegalSection heading="5. Order Cancellations">
        <p>
          You can cancel your order any time before it has been dispatched —
          just message us on the same WhatsApp chat as soon as possible.
          Once an order has been shipped/dispatched, it can no longer be
          cancelled, as it is already on its way to you through our courier
          partner.
        </p>
      </LegalSection>

      <LegalSection heading="6. How Refunds Are Processed">
        <p>
          Approved refunds are processed back to the original payment method
          used (UPI/bank transfer) or adjusted against a Cash on Delivery
          settlement, as applicable, within a reasonable time after
          approval. We&apos;ll confirm the refund with you over the same
          WhatsApp chat.
        </p>
      </LegalSection>

      <LegalSection heading="7. Contact Us">
        <p>
          For any replacement, refund, or cancellation request, message us
          on{" "}
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>{" "}
          or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
