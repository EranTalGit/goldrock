import { BENEFITS } from "@/lib/site";
import { ServiceIcon } from "./icons";

export default function WhyUs() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">למה לבחור בנו?</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            למה Goldrock היא הבחירה הבטוחה לרצפה שלך?
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
            כחברה המובילה בתחום הפוליש וחידוש המרצפות במרכז, אנו משלבים טכנולוגיה מתקדמת, חומרי ליטוש מהשורה הראשונה וסטנדרט עבודה בלתי מתפשר. הנה הסיבות שבגללן הלקוחות שלנו בוחרים בנו פעם אחר פעם:
          </p>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <article key={benefit.title} className="card-soft card-topline p-7">
              <span className="text-gold">
                <ServiceIcon name={benefit.icon} width={34} height={34} />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold leading-snug">
                {benefit.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {benefit.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
