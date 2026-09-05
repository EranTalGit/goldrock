import { BENEFITS, DEFAULT_WA_MESSAGE, whatsappLink } from "@/lib/site";
import { ServiceIcon, WhatsAppIcon } from "./icons";
import SectionHeading from "./SectionHeading";

/**
 * Four benefits across, each on mirrored glass cut by a diagonal of
 * gold. Weighted equally on purpose: no one of them outranks the rest.
 */
export default function WhyUs() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="למה לבחור בנו?"
          title="למה Goldrock היא הבחירה הבטוחה לרצפה שלך?"
          description="כחברה המובילה בתחום הפוליש וחידוש המרצפות במרכז, אנו משלבים טכנולוגיה מתקדמת, חומרי ליטוש מהשורה הראשונה וסטנדרט עבודה בלתי מתפשר. הנה הסיבות שבגללן הלקוחות שלנו בוחרים בנו פעם אחר פעם:"
        />

        {/* A phone reads them as a list rather than as cards. Four boxes two
            by two on a 375px screen made every line short and the section
            tall, and the page already runs on cards; here the numeral does
            the work the box was doing. */}
        <ul className="mt-8 sm:hidden">
          {BENEFITS.map((benefit, i) => (
            <li
              key={benefit.title}
              className="relative border-b border-gold/20 py-6 last:border-0"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-2 left-0 font-display text-[4.5rem] font-black leading-none text-gold/10"
              >
                0{i + 1}
              </span>
              <div className="relative flex items-center gap-3">
                <span className="shrink-0 text-gold">
                  <ServiceIcon name={benefit.icon} width={26} height={26} />
                </span>
                <h3 className="font-display text-[19px] font-bold leading-snug text-ink">
                  {benefit.title}
                </h3>
              </div>
              <p className="relative mt-2.5 text-[15px] leading-relaxed text-ink-soft">
                {benefit.text}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 hidden grid-cols-2 gap-3 sm:grid sm:gap-5 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <article key={benefit.title} className="card-mirror flex flex-col items-center p-6 text-center">
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

        {/* Somewhere to go once the four reasons have landed. */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-center text-[15px] text-ink-soft">
            שולחים תמונה של הרצפה ומקבלים הערכת מחיר, בלי התחייבות.
          </p>
          {/* One route only, matching the closing CTA's primary button. */}
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-link inline-flex items-center gap-2.5 rounded-xl bg-[#D4AF37] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_4px_18px_rgba(212,175,55,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#e0bd4a] hover:shadow-[0_8px_26px_rgba(212,175,55,0.42)]"
          >
            <WhatsAppIcon width={19} height={19} />
            לקבלת הצעת מחיר בוואטסאפ <span className="arrow">←</span>
          </a>
        </div>
      </div>
    </section>
  );
}
