import LegalPageShell, { LegalSection } from "@/components/legal/LegalPageShell";
import { CONTACT_EMAIL, LEGAL_ENTITY_NAME } from "@/lib/constants";

export default function CookiePolicyPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Cookie Policy"
      intro={`This page explains how ${LEGAL_ENTITY_NAME} uses cookies on this website.`}
    >
      <LegalSection heading="1. What Are Cookies">
        <p>
          Cookies are small text files stored on your device by your
          browser. They help websites function properly and help us
          understand how the site is being used.
        </p>
      </LegalSection>

      <LegalSection heading="2. Types of Cookies We Use">
        <p>
          <strong>Essential cookies</strong> — required for core site
          functionality, such as remembering items in your cart and your
          cookie consent preference. The site won&apos;t work correctly
          without these.
        </p>
        <p>
          <strong>Analytics cookies</strong> — we use Google Analytics to
          understand, in aggregate, how visitors use this website (pages
          viewed, time on site, general location and device type). This
          helps us improve the site over time and does not personally
          identify you.
        </p>
      </LegalSection>

      <LegalSection heading="3. How to Disable Cookies">
        <p>
          You can disable or delete cookies at any time through your
          browser&apos;s settings. Most browsers let you block cookies from
          specific sites or all sites, and clear cookies already stored.
          Check your browser&apos;s help section for exact steps, as this
          varies by browser (Chrome, Safari, Firefox, Edge, etc.).
        </p>
        <p>
          Note that blocking essential cookies may affect site features like
          your cart or your cookie consent preference not being remembered
          between visits.
        </p>
      </LegalSection>

      <LegalSection heading="4. Questions">
        <p>
          If you have questions about our use of cookies, email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
