import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Process from "./components/Process";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Areas from "./components/Areas";
import FaqSection from "./components/FaqSection";
import CtaBand from "./components/CtaBand";
import ContactForm from "./components/ContactForm";
import { HOME_FAQ } from "@/lib/site";

const highlights = [
  { strong: "אחריות מלאה", rest: "על כל תהליך הליטוש והחידוש" },
  { strong: "חומרי ציפוי וקריסטל", rest: "מהמובילים בעולם (עמידות לשנים)" },
  { strong: "עבודה נקייה ומדויקת", rest: "ללא אבק וללא נזק לפנלים ולריהוט" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <Services />
      <Process />
      <Gallery />
      <Areas />
      <section className="bg-sand text-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 pb-28 sm:px-6 sm:py-20 sm:pb-32 lg:grid-cols-2">
          <div>
            <p className="eyebrow">אודות</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
              גולדרוק - מטפלים באבן עד שהיא מחזירה אור
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
              Goldrock הוקמה מתוך תשוקה לאבנים טבעיות ולמבנים מרהיבים. אנו מתמחים במתן שירותי פוליש וליטוש ברמה הגבוהה ביותר, תוך דגש על דיוק, ניקיון, עמידה בזמנים ושקיפות מלאה. בלי הבטחות סרק ובלי דירוגים מומצאים - רק עבודה מקצועית על שיש, מדרגות, מרצפות ופורצלן עם אחריות מלאה על התוצאה.
            </p>
            <ul className="mt-7 space-y-3.5">
              {highlights.map((item) => (
                <li key={item.strong} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-sm font-bold text-gold"
                  >
                    ✓
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink-soft">
                    <strong className="font-bold text-ink">{item.strong}</strong> {item.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gold/20 bg-obsidian p-7 shadow-[0_20px_40px_rgba(0,0,0,0.2)] sm:p-9">
            <h3 className="font-display text-2xl font-bold text-white">
              השאירו פרטים להצעת מחיר
            </h3>
            <p className="mt-2 text-sm text-white/55">
              שם וטלפון מספיקים. אפשר להוסיף עיר וסוג שירות.
            </p>
            <div className="mt-7">
              <ContactForm source="home" />
            </div>
          </div>
        </div>
      </section>
      <FaqSection items={HOME_FAQ} />
      <CtaBand />
    </>
  );
}
