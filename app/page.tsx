import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Process from "./components/Process";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Areas from "./components/Areas";
import FaqSection from "./components/FaqSection";
import CtaBand from "./components/CtaBand";
import ContactForm from "./components/ContactForm";
import { ServiceIcon } from "./components/icons";
import { HOME_FAQ, type ServiceIconName } from "@/lib/site";

const highlights: { icon: ServiceIconName; strong: string; rest: string }[] = [
  {
    icon: "shield",
    strong: "אחריות מלאה",
    rest: "על כל תהליך הליטוש והחידוש",
  },
  {
    icon: "sparkle",
    strong: "חומרי ציפוי וקריסטל",
    rest: "מהמובילים בעולם (עמידות לשנים)",
  },
  {
    icon: "broom",
    strong: "עבודה נקייה ומדויקת",
    rest: "ללא אבק וללא נזק לפנלים ולריהוט",
  },
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
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-10 pb-24 sm:px-6 sm:py-14 sm:pb-28 lg:grid-cols-2">
          <div>
            <p className="gold-metal font-display text-4xl font-bold leading-tight sm:text-6xl">
              אודות
            </p>
            <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-ink sm:text-3xl">
              גולדרוק - מטפלים באבן עד שהיא מחזירה אור
            </h2>
            <div className="gold-rule mt-6 w-full max-w-sm" />
            <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
              Goldrock הוקמה מתוך תשוקה לאבנים טבעיות ולמבנים מרהיבים. אנו מתמחים במתן שירותי פוליש וליטוש ברמה הגבוהה ביותר, תוך דגש על דיוק, ניקיון, עמידה בזמנים ושקיפות מלאה. בלי הבטחות סרק ובלי דירוגים מומצאים - רק עבודה מקצועית על שיש, מדרגות, מרצפות ופורצלן עם אחריות מלאה על התוצאה.
            </p>
            <ul className="mt-8 space-y-5">
              {highlights.map((item) => (
                <li key={item.strong} className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="trust-badge mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-gold"
                  >
                    <ServiceIcon name={item.icon} width={22} height={22} />
                  </span>
                  <span className="text-[16px] leading-relaxed text-ink-soft">
                    <strong className="font-bold text-gold">{item.strong}</strong>{" "}
                    {item.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="form-card p-7 sm:p-9">
            <h3 className="font-display text-2xl font-bold text-white">
              השאירו פרטים להצעת מחיר
            </h3>
            <p className="mt-2 text-sm text-[#E8E2D4]/70">
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
