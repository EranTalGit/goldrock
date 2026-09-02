import { BENEFITS } from "@/lib/site";
import { ServiceIcon } from "./icons";
import SectionHeading from "./SectionHeading";

/** Option B: mirrored glass cards cut by a diagonal of polished gold. */
export default function WhyUsGlass() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="למה לבחור בנו?"
          title="למה Goldrock היא הבחירה הבטוחה לרצפה שלך?"
          description="כחברה המובילה בתחום הפוליש וחידוש המרצפות במרכז, אנו משלבים טכנולוגיה מתקדמת, חומרי ליטוש מהשורה הראשונה וסטנדרט עבודה בלתי מתפשר. הנה הסיבות שבגללן הלקוחות שלנו בוחרים בנו פעם אחר פעם:"
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
          {BENEFITS.map((benefit) => (
            <article key={benefit.title} className="card-mirror p-6 sm:p-7">
              <div className="relative flex items-center gap-4">
                <span className="mirror-tile inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-gold">
                  <ServiceIcon name={benefit.icon} width={28} height={28} />
                </span>
                <h3 className="font-display text-xl font-bold leading-snug text-ink">
                  {benefit.title}
                </h3>
              </div>
              <p className="relative mt-5 text-[17px] leading-relaxed text-ink-soft">
                {benefit.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
