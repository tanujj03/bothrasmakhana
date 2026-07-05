import Image from "next/image";
import Reveal from "./Reveal";

export default function Nutrition() {
  return (
    <section className="relative overflow-hidden bg-bg-secondary pb-20 pt-12 sm:pb-28 sm:pt-16">
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal delay={0.1}>
          <Image
            src="/products/photo2.jpg"
            alt="Nutrition transparency — what's in every pouch: low calorie, protein rich, gluten free, roasted in ghee, no artificial preservatives, made in India"
            width={1812}
            height={868}
            className="h-auto w-full rounded-3xl shadow-2xl"
            sizes="(max-width: 1024px) 100vw, 1152px"
          />
        </Reveal>
      </div>
    </section>
  );
}
