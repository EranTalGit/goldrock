import type { Metadata } from "next";
import Image from "next/image";
import { BUSINESS_NAME, BUSINESS_NAME_HE, REGION_LABEL, SITE_URL } from "@/lib/site";
import InnerHero from "../components/InnerHero";
import CtaBand from "../components/CtaBand";
import SectionHeading from "../components/SectionHeading";
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
    text: "מתאימים את סוג הליטוש ואת החומרים לאבן שיש לכם בבית - שיש, טרצו, טרוורטין או אבן טבעית. אין שתי רצפות זהות, ולכן אין טיפול אחד שמתאים לכולן.",
  },
  {
    icon: "diamond",
    title: "טכנולוגיית ליטוש יהלום",
    text: "דיסקיות יהלום במגוון דרגות, שמסירות שריטות וכתמים ומשאירות משטח חלק ואחיד - בלי בליטות ובלי סימני מעבר בין אזורים.",
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
      {/* No eyebrow here - the section below already leads with it. */}
      <InnerHero
        title="האומנות שמאחורי האבן"
        tagline="מחזירים לשיש ולאבן הטבעית את הברק, העומק והאופי המקורי שלהם"
        note={`חברת ${BUSINESS_NAME} נולדה מתוך תשוקה לעבודה עם אבן - בלי הרס, בלי אבק, ובדיוק של עבודת יד`}
      />

      {/* The story: the section opener, then the photograph, then the text. */}
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-4 py-[45px] sm:px-6">
          <SectionHeading
            label="אודות"
            title="מי אנחנו, ולמה זה משנה לרצפה שלכם"
            description="Goldrock עוסקת בדבר אחד בלבד - חידוש משטחי אבן ושיש. אותה יד מגיעה לכל עבודה, כל רצפה נבדקת לפני שנוקבים במחיר, ומה שלא ניתן לעשות נאמר מראש."
          />

          {/* Photograph on the right, the story beside it on the left. */}
          {/* The picture takes the row's height beside the copy, so a longer
              story makes it taller and never wider. */}
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold/30 shadow-[0_20px_45px_rgba(0,0,0,0.12)] lg:aspect-auto">
              <Image
                src="/assets/services/marble-polish.webp"
                alt="ליטוש רצפת שיש בעבודת אומן"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold leading-snug text-[#1A1A1A] sm:text-3xl">
                לא עוד פוליש גנרי - אומנות הטיפול באבן
              </h3>
              <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
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

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {VALUES.map((value) => (
              <article
                key={value.title}
                className="flex flex-col items-center rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-4 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[0_16px_38px_rgba(212,175,55,0.18)] sm:p-6"
              >
                <span className="trust-badge inline-flex h-11 w-11 items-center justify-center rounded-full text-gold sm:h-14 sm:w-14">
                  <ServiceIcon name={value.icon} width={22} height={22} />
                </span>
                <h3 className="mt-4 text-balance font-display text-[15px] font-bold leading-snug text-[#1A1A1A] sm:mt-5 sm:text-lg">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-ink-soft sm:mt-3 sm:text-[15px]">
                  {value.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers bar. */}
      <section className="border-y border-[rgba(212,175,55,0.25)] bg-white">
        {/* The divide-x utilities put their border on a physical edge, which
            in RTL left a stray line outside and dropped the last divider. A
            logical inline-start border on every item but the first is correct
            in both directions. */}
        <div className="mx-auto grid max-w-6xl grid-cols-4 px-2 py-9 sm:px-6 sm:py-12">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-1.5 text-center sm:px-4 ${
                i > 0 ? "border-s border-[rgba(212,175,55,0.35)]" : ""
              }`}
            >
              <p className="gold-metal flex min-h-[2.5em] items-center justify-center text-balance font-display text-[13px] font-bold leading-tight sm:min-h-0 sm:text-2xl lg:text-[1.7rem]">
                {stat.value}
              </p>
              <p className="mt-1.5 text-balance text-[11px] font-medium leading-snug text-[#2C2C2C] sm:mt-2 sm:text-[1.05rem] sm:leading-relaxed">
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
