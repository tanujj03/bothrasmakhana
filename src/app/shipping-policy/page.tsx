import LegalPageShell, { LegalSection } from "@/components/legal/LegalPageShell";
import { WHATSAPP_NUMBER, CONTACT_EMAIL, ESTIMATED_DELIVERY_WINDOW } from "@/lib/constants";

export default function ShippingPolicyPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Shipping &amp; Delivery Policy"
      intro="We ship across India through our courier partners. Here's what to expect from order confirmation to delivery."
    >
      <LegalSection heading="1. Free Shipping Across India">
        <p>
          We currently offer free shipping on every order, anywhere in
          India — no minimum order value required.
        </p>
      </LegalSection>

      <LegalSection heading="2. Estimated Delivery Time">
        <p>
          Orders are typically delivered within {ESTIMATED_DELIVERY_WINDOW}{" "}
          of dispatch, depending on your location and courier availability.
          Delivery to remote areas may take slightly longer.
        </p>
      </LegalSection>

      <LegalSection heading="3. Order Confirmation &amp; Dispatch">
        <p>Once you place an order via WhatsApp:</p>
        <ol>
          <li>We confirm your order details, address, and payment method with you over WhatsApp.</li>
          <li>Your order is packed and handed to our courier partner.</li>
          <li>We share your tracking ID and courier link on the same WhatsApp chat as soon as it ships.</li>
        </ol>
        <p>
          All order tracking happens through this WhatsApp chat — there is
          no separate order-tracking page on the website at this time.
        </p>
      </LegalSection>

      <LegalSection heading="4. Delivery Issues &amp; Address Problems">
        <p>
          If a delivery attempt fails because of an incorrect or incomplete
          address, or because no one was available to receive the package,
          our courier partner will usually attempt redelivery or hold the
          package briefly before returning it to us. If this happens,
          we&apos;ll reach out to you on WhatsApp to reconfirm your address
          and arrange redelivery — additional shipping charges may apply if
          the delay is due to an incorrect address you provided.
        </p>
        <p>
          If you notice an error in your address after placing an order,
          message us immediately so we can update it before dispatch.
        </p>
      </LegalSection>

      <LegalSection heading="5. Contact Us">
        <p>
          For questions about your shipment, message us on{" "}
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>{" "}
          or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
