import SectionHeading from "./SectionHeading";
import Accordion from "./Accordion";
import { ESTIMATED_DELIVERY_WINDOW } from "@/lib/constants";

const FAQS = [
  {
    q: "How long does delivery take?",
    a: `Most orders across India are delivered within ${ESTIMATED_DELIVERY_WINDOW} of dispatch. You'll get your tracking details over WhatsApp as soon as your pouch ships.`,
  },
  {
    q: "What is your return/refund policy?",
    a: "Since these are packaged food items, we can't accept returns once a pouch is opened. If anything arrives damaged, expired, or incorrect, message us within 48 hours of delivery and we'll replace it or refund you in full.",
  },
  {
    q: "Are your products 100% natural? Any preservatives?",
    a: "Yes. Every batch is roasted, never fried, with no artificial preservatives or added colours — just premium fox nuts, natural seasoning, and a light hand with salt and spice.",
  },
  {
    q: "How should I store the makhana after opening?",
    a: "Reseal the pouch tightly, or transfer it to an airtight container, and keep it in a cool, dry place away from direct sunlight. That keeps the crunch locked in for weeks.",
  },
  {
    q: "Do you offer Cash on Delivery?",
    a: "Yes — Cash on Delivery is available alongside UPI and online payment at checkout, so you can pick whatever's easiest for you.",
  },
  {
    q: "Can I order multiple flavors together?",
    a: "Absolutely. Mix and match any flavors and sizes in a single cart, or grab our \"Try All 5 Flavors\" bundle for one of everything at a discount.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-bg-base py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Good to Know"
          title="Frequently Asked Questions"
          className="mb-12"
        />

        <Accordion items={FAQS} />
      </div>
    </section>
  );
}
