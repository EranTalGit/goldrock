import Link from "next/link";
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
    strong: "אחריות מלאה בכתב:",
    rest: "על כל תהליך הליטוש והציפוי.",
  },
  {
    icon: "sparkle",
    strong: "טכנולוגיית ליטוש יהלום וקריסטל:",
    rest: "חומרי איטום מאירופה לעמידות לשנים.",
  },
  {
    icon: "broom",
    strong: "עבודה נקייה וסטרילית:",
    rest: "ללא אבק וללא נזק לפנלים ולריהוט.",
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
            {/* Break held at "עד" so the name sits on its own line. */}
            <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-ink sm:text-3xl">
              גולדרוק - מטפלים באבן
              <br />
              עד שהיא מחזירה אור
            </h2>
            <div className="gold-rule mt-7 w-full max-w-sm" />

            {/* The owner's line, set apart so it reads as someone speaking. */}
            <blockquote className="mt-7 border-e-2 border-gold pe-5 text-[17px] font-medium leading-relaxed text-ink sm:text-[19px]">
              אנחנו לא רק &quot;מנקים&quot; או &quot;מבריקים&quot; רצפות - אנחנו מתייחסים לכל אבן ושיש כאל יצירת אומנות טבעית.
            </blockquote>

            <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
              חברת Goldrock מתמחה בפתרונות ליטוש, קריסטליזציה ושחזור משטחי שיש, אבן טבעית וגרניט פורצלן ברמת פרימיום. אנו משלבים טכנולוגיית ליטוש יהלום חדשנית לצד עבודה קפדנית ללא אבק, תוך שמירה מוחלטת על הנכס והציוד שלכם.
            </p>
            <ul className="mt-9 space-y-7">
              {highlights.map((item) => (
                <li key={item.strong} className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="trust-badge mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-gold"
                  >
                    <ServiceIcon name={item.icon} width={24} height={24} />
                  </span>
                  <span className="text-[16px] leading-relaxed text-ink-soft">
                    <strong className="font-bold text-gold">{item.strong}</strong>{" "}
                    {item.rest}
                  </span>
                </li>
              ))}
            </ul>

            {/* The full story lives on its own page; this stays the summary. */}
            <Link
              href="/about"
              className="arrow-link mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-gold transition-colors hover:text-gold-soft"
            >
              קראו עוד על הסיפור שלנו <span className="arrow">←</span>
            </Link>
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
