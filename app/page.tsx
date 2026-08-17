import Hero from "./components/Hero";
import Process from "./components/Process";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Areas from "./components/Areas";
import FaqSection from "./components/FaqSection";
import CtaBand from "./components/CtaBand";
import ContactForm from "./components/ContactForm";
import { BUSINESS_NAME_HE, REGION_LABEL } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <Services />
      <Gallery />
      <Areas />
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2">
          <div>
            <p className="text-xs tracking-[0.28em] text-gold">אודות</p>
            <h2 className="mt-3 font-display text-4xl">
              {BUSINESS_NAME_HE} מטפלים באבן עד שהיא מחזירה אור
            </h2>
            <p className="mt-5 leading-relaxed text-ink/75">
              Goldrock הוקם כדי לתת שירות פוליש ברור, מדויק ונקי ב{REGION_LABEL}. בלי הבטחות מנופחות. בלי דירוגים מומצאים. עבודה על שיש, מדרגות, מרצפות ופורצלן, עם אחריות על התוצאה.
            </p>
            <p className="mt-4 leading-relaxed text-ink/75">
              שולחים תמונה, מקבלים כיוון מחיר, וקובעים מועד. רוב הדירות מסתיימות ביום אחד.
            </p>
          </div>
          <div className="rounded-2xl bg-obsidian p-6 text-cream sm:p-8">
            <h3 className="font-display text-2xl">השאירו פרטים להצעת מחיר</h3>
            <p className="mt-2 text-sm text-muted">שם וטלפון מספיקים. אפשר להוסיף עיר וסוג שירות.</p>
            <div className="mt-6">
              <ContactForm source="home" />
            </div>
          </div>
        </div>
      </section>
      <FaqSection />
      <CtaBand />
    </>
  );
}
