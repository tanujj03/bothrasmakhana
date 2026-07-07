import LegalPageShell, { LegalSection } from "@/components/legal/LegalPageShell";
import { WHATSAPP_NUMBER, CONTACT_EMAIL, LEGAL_ENTITY_NAME } from "@/lib/constants";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro={`This policy explains what information ${LEGAL_ENTITY_NAME} collects when you use this website or place an order, and how we use, store, and protect it.`}
    >
      <LegalSection heading="1. Information We Collect">
        <p>Since checkout happens over WhatsApp, the information we collect is generally what you share with us directly in order to place and fulfil an order:</p>
        <ul>
          <li>Your name</li>
          <li>Phone number (via WhatsApp)</li>
          <li>Delivery address and pincode</li>
          <li>Order details — items, sizes, quantities, and payment method chosen</li>
          <li>Email address, if you contact us via our contact form or email</li>
        </ul>
        <p>
          We do not collect card or bank details on this website, as payment
          is currently coordinated over WhatsApp rather than through an
          online payment gateway.
        </p>
      </LegalSection>

      <LegalSection heading="2. How We Use Your Information">
        <p>We use the information you provide to:</p>
        <ul>
          <li>Confirm and process your order</li>
          <li>Arrange delivery through our courier partners</li>
          <li>Contact you about your order, including delivery or payment follow-ups</li>
          <li>Respond to enquiries sent via WhatsApp, email, or our contact form</li>
          <li>Improve our products, website, and customer experience</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. How We Store Your Information">
        <p>
          Order details shared over WhatsApp are stored within WhatsApp
          itself (as chat history) and, where necessary, noted internally
          for order fulfilment and delivery coordination. We take reasonable
          measures to keep this information secure and limit access to
          those who need it to fulfil your order.
        </p>
      </LegalSection>

      <LegalSection heading="4. Sharing of Information">
        <p>
          We do not sell or rent your personal information. We do not share
          your information with third parties, except where necessary to:
        </p>
        <ul>
          <li>Deliver your order (e.g. sharing your name, address, and phone number with our courier/delivery partner)</li>
          <li>Comply with a legal obligation or valid request from a government authority</li>
        </ul>
      </LegalSection>

      <LegalSection heading="5. Analytics">
        <p>
          We use Google Analytics to understand how visitors use this
          website — such as which pages are viewed and how visitors arrive
          at the site — so we can improve it over time. This data is
          collected in an anonymized/aggregated form and is not used to
          personally identify you. See our{" "}
          <a href="/cookie-policy">Cookie Policy</a> for more on the cookies
          this involves.
        </p>
      </LegalSection>

      <LegalSection heading="6. Your Rights">
        <p>
          You can contact us at any time to ask what information we hold
          about you, to request a correction, or to request that we delete
          your data from our records (subject to any information we are
          legally required to retain, such as for tax or accounting
          purposes). To make a request, email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or message
          us on{" "}
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="7. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes in our practices. The &quot;Last updated&quot; date at the
          top of this page indicates when it was last revised.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
