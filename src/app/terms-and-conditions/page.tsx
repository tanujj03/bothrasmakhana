import Link from "next/link";
import LegalPageShell, { LegalSection } from "@/components/legal/LegalPageShell";
import {
  WHATSAPP_NUMBER,
  CONTACT_EMAIL,
  CITY_NAME,
  LEGAL_ENTITY_NAME,
  FSSAI_LICENSE_NO,
  GST_NO,
} from "@/lib/constants";

export default function TermsAndConditionsPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Terms &amp; Conditions"
      intro={`These terms govern your use of the ${LEGAL_ENTITY_NAME} website and any order you place with us. By browsing this site or placing an order, you agree to the terms below.`}
    >
      <LegalSection heading="1. Website Use">
        <p>
          This website is operated by {LEGAL_ENTITY_NAME}, a D2C roasted
          makhana (fox nut) snacks brand based in {CITY_NAME}, Maharashtra,
          India, founded by Jainam Bothra. Content on this site — text,
          images, logos, and product descriptions — belongs to{" "}
          {LEGAL_ENTITY_NAME} and may not be copied or reused without
          permission.
        </p>
        <p>
          You agree to use this website only for lawful purposes and not to
          interfere with its normal operation.
        </p>
      </LegalSection>

      <LegalSection heading="2. Order Placement Process">
        <p>
          We currently do not process payments directly on this website.
          Instead, orders are placed and confirmed through WhatsApp:
        </p>
        <ol>
          <li>Add your chosen flavors and sizes to the cart on this site.</li>
          <li>
            Proceed to checkout, where your order details are compiled into a
            message and sent to our official WhatsApp number.
          </li>
          <li>
            Our team confirms availability, final amount, and delivery
            details with you directly over WhatsApp before the order is
            processed.
          </li>
        </ol>
        <p>
          An order is only considered confirmed once we acknowledge it back
          to you on WhatsApp — adding items to a cart or opening a WhatsApp
          chat does not, by itself, confirm an order.
        </p>
      </LegalSection>

      <LegalSection heading="3. Pricing">
        <p>
          All prices listed on this website are in Indian Rupees (INR) and
          are inclusive of applicable taxes unless stated otherwise. We
          reserve the right to change prices, launch offers, or discounts at
          any time without prior notice. The price confirmed with you on
          WhatsApp at the time of order confirmation is the price that
          applies to that order.
        </p>
      </LegalSection>

      <LegalSection heading="4. Payment Terms">
        <p>
          Payment is currently coordinated over WhatsApp as part of order
          confirmation — via Cash on Delivery, UPI, or another method we
          share with you at that time. Direct online payment (Razorpay) is
          coming soon; once live, it will be offered as an additional option
          alongside our existing WhatsApp-based confirmation flow, not a
          replacement for it.
        </p>
      </LegalSection>

      <LegalSection heading="5. Liability Disclaimer">
        <p>
          While we take care to ensure product descriptions, images, and
          nutritional information are accurate, we do not guarantee that this
          website is free of errors or that every detail is fully up to
          date. To the maximum extent permitted by law, {LEGAL_ENTITY_NAME}{" "}
          is not liable for any indirect or incidental loss arising from use
          of this website or delays outside our reasonable control (such as
          courier delays).
        </p>
      </LegalSection>

      <LegalSection heading="6. Governing Law">
        <p>
          These terms are governed by the laws of India. Any disputes
          arising out of or in connection with these terms or your use of
          this website will be subject to the exclusive jurisdiction of the
          courts having competent authority over {CITY_NAME}, Maharashtra.
        </p>
      </LegalSection>

      <LegalSection heading="7. Acceptance of Terms">
        <p>
          By using this website or placing an order with us, you confirm
          that you have read, understood, and agree to these Terms &amp;
          Conditions, along with our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>,{" "}
          <Link href="/refund-and-cancellation-policy">
            Refund &amp; Cancellation Policy
          </Link>
          , and <Link href="/shipping-policy">Shipping Policy</Link>. We may
          update these terms from time to time; continued use of the website
          after changes are posted constitutes acceptance of the revised
          terms.
        </p>
      </LegalSection>

      <LegalSection heading="8. Business Details">
        <ul>
          <li>Brand: {LEGAL_ENTITY_NAME}</li>
          <li>Location: {CITY_NAME}, Maharashtra, India</li>
          <li>FSSAI License No.: {FSSAI_LICENSE_NO}</li>
          <li>GST No.: {GST_NO}</li>
        </ul>
      </LegalSection>

      <LegalSection heading="9. Contact Us">
        <p>
          Questions about these terms? Reach us on WhatsApp at{" "}
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
            +91 92707 85725
          </a>{" "}
          or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
