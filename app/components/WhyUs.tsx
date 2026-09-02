import { BENEFITS } from "@/lib/site";
import { ServiceIcon } from "./icons";
import SectionHeading from "./SectionHeading";

export default function WhyUs() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="למה לבחור בנו?"
          title="למה Goldrock היא הבחירה הבטוחה לרצפה שלך?"
          description="כחברה המובילה בתחום הפוליש וחידוש המרצפות במרכז, אנו משלבים טכנולוגיה מתקדמת, חומרי ליטוש מהשורה הראשונה וסטנדרט עבודה בלתי מתפשר. הנה הסיבות שבגללן הלקוחות שלנו בוחרים בנו פעם אחר פעם:"
        />

        {/* Two by two rather than four narrow columns, which left the text
            stranded in tall thin cards. */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
          {BENEFITS.map((benefit) => (
            <article
              key={benefit.title}
              className={`card-premium p-6 sm:p-7 ${
                benefit.featured ? "card-premium-featured" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/[0.08] text-gold">
                  <ServiceIcon name={benefit.icon} width={28} height={28} />
                </span>
                <h3 className="font-display text-xl font-bold leading-snug text-ink">
                  {benefit.title}
                </h3>
              </div>
              <div className="gold-line mt-5" />
              <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
                {benefit.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
