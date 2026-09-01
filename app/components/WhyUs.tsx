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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <article
              key={benefit.title}
              className="card-soft card-topline flex flex-col items-center p-7 text-center"
            >
              {/* Circular badge echoes the logo mark, and anchors the
                  centred card better than a bare floating icon. */}
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.07] text-gold">
                <ServiceIcon name={benefit.icon} width={30} height={30} />
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
