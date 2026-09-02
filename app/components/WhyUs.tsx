import { BENEFITS } from "@/lib/site";
import { ServiceIcon } from "./icons";
import SectionHeading from "./SectionHeading";

/**
 * Asymmetric bento for the hierarchy, mirrored glass for the finish:
 * the warranty card leads on a dark ground, the other three sit light
 * beside it, and every card is cut by the same diagonal of gold.
 */
export default function WhyUs() {
  const hero = BENEFITS.find((b) => b.featured) ?? BENEFITS[0];
  const rest = BENEFITS.filter((b) => b !== hero);

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="למה לבחור בנו?"
          title="למה Goldrock היא הבחירה הבטוחה לרצפה שלך?"
          description="כחברה המובילה בתחום הפוליש וחידוש המרצפות במרכז, אנו משלבים טכנולוגיה מתקדמת, חומרי ליטוש מהשורה הראשונה וסטנדרט עבודה בלתי מתפשר. הנה הסיבות שבגללן הלקוחות שלנו בוחרים בנו פעם אחר פעם:"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {/* Lead card runs the full height of the grid. */}
          <article className="card-mirror-dark flex flex-col justify-center p-7 sm:p-8 md:row-span-2">
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-black/40 px-3.5 py-1.5 text-[12px] font-medium text-gold-soft">
                <span>★</span> התחייבות Goldrock
              </span>
              <span className="mirror-tile mt-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl text-gold">
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
              className={`card-mirror p-6 sm:p-7 ${
                i === rest.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <div className="relative flex items-center gap-4">
                <span className="mirror-tile inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-gold">
                  <ServiceIcon name={benefit.icon} width={28} height={28} />
                </span>
                <h3 className="font-display text-xl font-bold leading-snug text-ink">
                  {benefit.title}
                </h3>
              </div>
              <p className="relative mt-4 text-[16px] leading-relaxed text-ink-soft">
                {benefit.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
