import { BENEFITS } from "@/lib/site";
import { ServiceIcon } from "./icons";
import SectionHeading from "./SectionHeading";

/** Option D: the mirror-glass finish, four across in a single row. */
export default function WhyUsRow() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="למה לבחור בנו?"
          title="למה Goldrock היא הבחירה הבטוחה לרצפה שלך?"
          description="כחברה המובילה בתחום הפוליש וחידוש המרצפות במרכז, אנו משלבים טכנולוגיה מתקדמת, חומרי ליטוש מהשורה הראשונה וסטנדרט עבודה בלתי מתפשר. הנה הסיבות שבגללן הלקוחות שלנו בוחרים בנו פעם אחר פעם:"
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <article key={benefit.title} className="card-mirror p-6">
              <span className="mirror-tile relative inline-flex h-14 w-14 items-center justify-center rounded-2xl text-gold">
                <ServiceIcon name={benefit.icon} width={28} height={28} />
              </span>
              <h3 className="relative mt-5 font-display text-lg font-bold leading-snug text-ink">
                {benefit.title}
              </h3>
              <div className="gold-line relative mt-4 w-24" />
              <p className="relative mt-4 text-[15px] leading-relaxed text-ink-soft">
                {benefit.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
