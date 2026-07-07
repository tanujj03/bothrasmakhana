import LegalPageShell, { LegalSection } from "@/components/legal/LegalPageShell";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function DisclaimerPage() {
  return (
    <LegalPageShell eyebrow="Legal" title="Disclaimer">
      <LegalSection heading="1. Health &amp; Nutrition Information">
        <p>
          Labels used on our products and website — such as{" "}
          <strong>Low Calorie</strong>, <strong>Protein Rich</strong>,{" "}
          <strong>Gluten Free</strong>, and <strong>Roasted Not Fried</strong>{" "}
          — describe general product characteristics based on our recipe and
          preparation method. They are provided for general information
          only and are not medical advice, and are not intended to diagnose,
          treat, cure, or prevent any condition.
        </p>
        <p>
          If you have a specific health condition, allergy, or dietary
          concern, please consult a qualified healthcare professional or
          nutritionist before making changes to your diet based on
          information from this website.
        </p>
      </LegalSection>

      <LegalSection heading="2. Product Images">
        <p>
          Product images on this website are for illustrative purposes.
          Actual packaging, pouch design, and product appearance may vary
          slightly from what is shown, due to packaging updates, screen
          display differences, or batch variation.
        </p>
      </LegalSection>

      <LegalSection heading="3. Questions">
        <p>
          If you have questions about a specific product or ingredient,
          email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{" "}
          before ordering.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
