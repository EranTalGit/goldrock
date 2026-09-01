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

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <Services />
      <Process />
      <Gallery />
      <Areas />
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl items-start gap-14 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-2">
          <div>
            <p className="eyebrow">אודות</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              גולדרוק - מטפלים באבן עד שהיא מחזירה אור
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              Goldrock הוקמה מתוך תשוקה לאבנים טבעיות ולמבנים מרהיבים. אנו מתמחים במתן שירותי פוליש וליטוש ברמה הגבוהה ביותר, תוך דגש על דיוק, ניקיון, עמידה בזמנים ושקיפות מלאה. בלי הבטחות סרק ובלי דירוגים מומצאים - רק עבודה מקצועית על שיש, מדרגות, מרצפות ופורצלן עם אחריות מלאה על התוצאה.
            </p>
          </div>
          <div className="rounded-2xl bg-obsidian p-8 shadow-[0_18px_50px_rgba(18,18,18,0.16)] sm:p-10">
            <h3 className="font-display text-2xl font-bold text-white">
              השאירו פרטים להצעת מחיר
            </h3>
            <p className="mt-2 text-sm text-white/55">
              שם וטלפון מספיקים. אפשר להוסיף עיר וסוג שירות.
            </p>
            <div className="mt-8">
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
