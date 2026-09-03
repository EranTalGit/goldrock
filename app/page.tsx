import Link from "next/link";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Process from "./components/Process";
import BlogTeaser from "./components/BlogTeaser";
import Testimonials from "./components/Testimonials";
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
    icon: "diamond",
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
      <section id="quote" className="bg-sand text-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-5 pb-16 sm:px-6 sm:py-7 sm:pb-20 lg:grid-cols-2">
          <div className="text-center">
            <p className="gold-metal font-display text-4xl font-bold leading-tight sm:text-6xl">
              אודות
            </p>
            {/* One line on a phone; the break at "עד" is for the wider
                measure, where the name earns a line of its own. */}
            <h2 className="mt-3 font-display text-[15px] font-semibold leading-snug text-ink sm:text-3xl">
              גולדרוק - מטפלים באבן
              <br className="hidden sm:inline" />{" "}
              עד שהיא מחזירה אור
            </h2>
            <div className="gold-rule mx-auto mt-5 w-full max-w-sm" />

            {/* The owner's line, set apart so it reads as someone speaking. */}
            <blockquote className="mx-auto mt-5 max-w-xl text-[17px] font-medium leading-relaxed text-ink sm:text-[19px]">
              אנחנו לא רק &quot;מנקים&quot; או &quot;מבריקים&quot; רצפות - אנחנו מתייחסים לכל אבן ושיש כאל יצירת אומנות טבעית.
            </blockquote>

            <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
              חברת Goldrock מתמחה בפתרונות ליטוש, קריסטליזציה ושחזור משטחי שיש, אבן טבעית וגרניט פורצלן ברמת פרימיום. אנו משלבים טכנולוגיית ליטוש יהלום חדשנית לצד עבודה קפדנית ללא אבק, תוך שמירה מוחלטת על
              <br className="hidden sm:inline" />{" "}
              הנכס והציוד שלכם.
            </p>
            <ul className="mx-auto mt-6 w-fit max-w-full space-y-4 text-right">
              {highlights.map((item) => (
                <li key={item.strong} className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="trust-badge inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-gold"
                  >
                    <ServiceIcon name={item.icon} width={24} height={24} />
                  </span>
                  {/* Title on its own line, the sentence beneath it starting
                      on the same edge. */}
                  <span className="text-[16px] leading-relaxed text-ink-soft">
                    <strong className="block font-bold text-gold">
                      {item.strong}
                    </strong>
                    <span className="block">{item.rest}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* The full story lives on its own page; this stays the summary. */}
            <Link
              href="/about"
              className="arrow-link mt-6 inline-flex items-center gap-2 text-[17px] font-semibold text-gold transition-colors hover:text-gold-soft"
            >
              קראו עוד על הסיפור שלנו <span className="arrow">←</span>
            </Link>
          </div>
          {/* Solid white rather than a dark panel: the charcoal card sat
              heavily on the cream section, the same reason the dark box came
              out of the closing band. A firmer gold edge and shadow keep it
              the loudest thing here without the weight. */}
          <div className="rounded-2xl border border-[rgba(212,175,55,0.35)] bg-white p-6 shadow-[0_14px_38px_rgba(0,0,0,0.07)] sm:p-8">
            <p className="gold-metal text-center font-display text-2xl font-bold leading-tight">
              צרו קשר
            </p>
            <h3 className="mt-1.5 text-center font-display text-lg font-bold text-[#1A1A1A] sm:text-xl">
              השאירו פרטים להצעת מחיר
            </h3>
            <div className="gold-line mx-auto mt-4 w-40" />
            <p className="mt-3 text-center text-[13px] text-[#6B655C]">
              שם וטלפון מספיקים. אפשר להוסיף עיר וסוג שירות.
            </p>
            <div className="mt-5">
              <ContactForm source="home" tone="light" />
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
      <FaqSection items={HOME_FAQ} moreHref="/faq" ground="sand" />
      <BlogTeaser />
      <CtaBand />
    </>
  );
}
