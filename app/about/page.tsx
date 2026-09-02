import type { Metadata } from "next";
import Image from "next/image";
import { BUSINESS_NAME, BUSINESS_NAME_HE, REGION_LABEL, SITE_URL } from "@/lib/site";
import InnerHero from "../components/InnerHero";
import CtaBand from "../components/CtaBand";
import { ServiceIcon } from "../components/icons";
import type { ServiceIconName } from "@/lib/site";

const title = "אודות Goldrock";
const description = `${BUSINESS_NAME_HE} מספקים פוליש לשיש, ליטוש והברקת רצפות ב${REGION_LABEL}. עבודה נקייה, שקיפות במחיר ואחריות על התוצאה.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/about` },
};

const VALUES: { icon: ServiceIconName; title: string; text: string }[] = [
  {
    icon: "layers",
    title: "אבחון מדויק ומותאם אישית",
    text: "התאמה מלאה של סוג הליטוש והחומרים לפי סוג השיש - חלילה, מצפה, טרוורטין, קרארה ועוד. אין שתי רצפות זהות, ולכן אין טיפול אחד שמתאים לכולן.",
  },
  {
    icon: "diamond",
    title: "טכנולוגיית ליטוש יהלום",
    text: "שימוש בדיסקיות יהלום במגוון גדלים להסרת שריטות וכתמים ולהחלקה מושלמת, בלי גליות ובלי סימני מעבר בין אזורים.",
  },
  {
    icon: "broom",
    title: "עבודה נקייה וללא אבק",
    text: "מערכות שאיבה מתקדמות ועטיפת ריהוט וקירות. סביבת העבודה נשארת שמורה, ואפשר להישאר בבית לאורך רוב התהליך.",
  },
  {
    icon: "shield",
    title: "אחריות ויושרה מלאה",
    text: "הצעת מחיר שקופה מראש בלי הפתעות, אחריות מלאה על התוצאה ועל עמידות הברק, והנחיות תחזוקה לשמירה עליו לאורך זמן.",
  },
];

const STATS = [
  { value: "100%", label: "עבודה נקייה וללא אבק" },
  { value: "יהלום וקריסטל", label: "טכנולוגיה מתקדמת" },
  { value: "שקוף ומדויק", label: "הצעת מחיר ללא התחייבות" },
  { value: "אחריות מלאה", label: "על כל סוגי העבודות" },
];

export default function AboutPage() {
  return (
    <>
      <InnerHero
        eyebrow={BUSINESS_NAME}
        title="האומנות שמאחורי האבן"
        tagline={`חברת ${BUSINESS_NAME} נולדה מתוך תשוקה להחזיר לשיש ולאבן הטבעית את הברק, העומק והאופי המקורי שלהם - ללא הרס, ללא אבק, ובמיומנות של אטלייה.`}
      />

      {/* The story, beside a photograph of the work itself. */}
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-[60px] sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold/30 shadow-[0_20px_45px_rgba(0,0,0,0.12)]">
            <Image
              src="/assets/services/marble-polish.webp"
              alt="ליטוש רצפת שיש בעבודת אומן"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold leading-snug text-[#1A1A1A] sm:text-3xl">
              לא עוד פוליש גנרי - אומנות הטיפול באבן
            </h2>
            <div className="gold-rule mt-5 w-full max-w-sm" />
            <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-ink-soft">
              <p>
                רצפת שיש אינה סתם עוד משטח בבית; היא אלמנט אדריכלי חי, נושם ויוקרתי. לאורך השנים, חומרי ניקוי חריפים, שחיקה יומיומית וטיפולים לא נכונים פוגעים בשכבה העליונה של האבן ומכבים את הברק הטבעי שלה.
              </p>
              <p>
                ב-{BUSINESS_NAME} אנחנו לא מאמינים בפתרונות קסם מהירים או בשכבות ווקס קוסמטיות שנעלמות תוך חודשיים. העבודה שלנו מבוססת על אבחון עמוק של סוג האבן, התאמת דרגת הליטוש ביהלום, וקריסטליזציה רב-שכבתית שמחזירה לאבן את המראה המושלם שלה.
              </p>
              <p>
                אנחנו מגיעים לכל בית ברמת גימור של אומן, עם ציוד שאיבת אבק מתקדם המבטיח עבודה נקייה לחלוטין, ויחס אישי ושקוף מהשיחה הראשונה ועד המסירה.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Four principles. */}
      <section className="bg-sand text-ink">
        <div className="mx-auto max-w-6xl px-4 py-[60px] sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="gold-metal font-display text-3xl font-bold leading-tight sm:text-5xl">
              עקרונות הברזל שלנו
            </p>
            <h2 className="mt-3 font-display text-lg font-semibold leading-snug text-ink sm:text-2xl">
              ארבעה דברים שלא מתפשרים עליהם, בכל עבודה
            </h2>
            <div className="gold-rule mx-auto mt-6 w-full max-w-sm" />
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[0_16px_38px_rgba(212,175,55,0.18)]"
              >
                <span className="trust-badge inline-flex h-14 w-14 items-center justify-center rounded-full text-gold">
                  <ServiceIcon name={value.icon} width={26} height={26} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold leading-snug text-[#1A1A1A]">
                  {value.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {value.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers bar. */}
      <section className="border-y border-[rgba(212,175,55,0.25)] bg-[#F3ECE2]">
        <div className="mx-auto grid max-w-6xl gap-y-8 px-4 py-12 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-x-reverse lg:divide-[rgba(212,175,55,0.35)]">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-4 text-center">
              <p className="gold-metal font-display text-2xl font-bold leading-tight sm:text-[1.7rem]">
                {stat.value}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
