import { BENEFITS } from "@/lib/site";
import { ServiceIcon } from "./icons";
import SectionHeading from "./SectionHeading";

/** Option A: asymmetric bento, with the warranty card carrying the block. */
export default function WhyUsBento() {
  const hero = BENEFITS.find((b) => b.featured) ?? BENEFITS[0];
  const rest = BENEFITS.filter((b) => b !== hero);
  const heroIndex = BENEFITS.indexOf(hero) + 1;

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="למה לבחור בנו?"
          title="למה Goldrock היא הבחירה הבטוחה לרצפה שלך?"
          description="כחברה המובילה בתחום הפוליש וחידוש המרצפות במרכז, אנו משלבים טכנולוגיה מתקדמת, חומרי ליטוש מהשורה הראשונה וסטנדרט עבודה בלתי מתפשר. הנה הסיבות שבגללן הלקוחות שלנו בוחרים בנו פעם אחר פעם:"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {/* The lead card runs the full height of the grid. */}
          <article className="card-bento-dark flex flex-col justify-between p-7 sm:p-8 md:row-span-2">
            <span className="bento-num bento-num-dark">
              0{heroIndex}
            </span>
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-black/40 px-3.5 py-1.5 text-[12px] font-medium text-gold-soft">
                <span>★</span> התחייבות Goldrock
              </span>
              <span className="mt-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-gold/40 bg-gold/10 text-gold-soft">
                <ServiceIcon name={hero.icon} width={42} height={42} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold leading-snug text-white">
                {hero.title}
              </h3>
              <div className="gold-line mt-5" />
              <p className="mt-4 text-[17px] leading-relaxed text-white/70">
                {hero.text}
              </p>
            </div>
          </article>

          {rest.map((benefit, i) => (
            <article
              key={benefit.title}
              className={`card-bento p-6 sm:p-7 ${
                i === rest.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <span className="bento-num">0{BENEFITS.indexOf(benefit) + 1}</span>
              <div className="relative">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/[0.08] text-gold">
                    <ServiceIcon name={benefit.icon} width={28} height={28} />
                  </span>
                  <h3 className="font-display text-xl font-bold leading-snug text-ink">
                    {benefit.title}
                  </h3>
                </div>
                <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                  {benefit.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
