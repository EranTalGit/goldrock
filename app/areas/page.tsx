import type { Metadata } from "next";
import Link from "next/link";
import {
  CITIES,
  REGION_LABEL,
  SITE_URL,
  whatsappLink,
} from "@/lib/site";
import InnerHero from "../components/InnerHero";
import SectionHeading from "../components/SectionHeading";
import { ServiceIcon } from "../components/icons";

const title = "אזורי שירות: פוליש רצפות בגוש דן";
const description = `Goldrock מגיעים לפוליש לשיש, ליטוש מדרגות וחידוש רצפות ב${REGION_LABEL}. בחרו עיר וקבלו פרטים מקומיים.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/areas` },
};

export default function AreasPage() {
  const wa = whatsappLink(
    "היי, אני נמצא/ת מחוץ לרשימת הערים באתר. אשמח לדעת אם אתם מגיעים לאזור שלי.",
  );

  return (
    <>
      {/* No eyebrow here - the section below already leads with it. */}
      <InnerHero
        title="פוליש וליטוש בכל גוש דן"
        tagline="כל עיר עם דף משלה: שכונות, שירותים מקומיים והזמנה מהירה"
        note="מגיעים בתיאום מראש לבתים פרטיים, לדירות ולבנייני מגורים בכל האזור, ללא אבק"
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "אזורי שירות", href: "/areas" },
        ]}
      />

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-4 pt-[45px] sm:px-6">
          <SectionHeading
            label="אזורי שירות"
            title={`מגיעים ל${REGION_LABEL}`}
            description={
              <>
                לכל עיר יש דף משלה, עם השכונות שאנחנו עובדים בהן, השירותים שהכי מבוקשים שם ודרך מהירה להזמין.
                <br />
                בחרו את העיר שלכם וקבלו את הפרטים המקומיים.
              </>
            }
          />
        </div>

        <div className="mx-auto grid max-w-[1400px] gap-5 px-4 pb-[50px] pt-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {CITIES.map((city) => (
            <article
              key={city.slug}
              className="group relative flex flex-col rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[5px] hover:border-[rgba(212,175,55,0.6)] hover:shadow-[0_18px_42px_rgba(0,0,0,0.09)]"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(212,175,55,0.35)] bg-gold/[0.08] text-gold"
                >
                  <ServiceIcon name="pin" width={17} height={17} />
                </span>
                <h2 className="font-display text-[1.1rem] font-bold leading-snug text-[#1A1A1A] transition-colors group-hover:text-gold">
                  {/* The whole card is the target, not only the words. */}
                  <Link
                    href={`/areas/${city.slug}`}
                    className="after:absolute after:inset-0"
                  >
                    פוליש לשיש {city.inName}
                  </Link>
                </h2>
              </div>

              <p className="mt-3.5 flex-1 text-[14px] leading-relaxed text-[#4A4A4A]">
                {city.intro}
              </p>

              <span className="arrow-link mt-4 self-start text-[14px] font-semibold text-gold">
                לפירוט {city.inName} <span className="arrow">←</span>
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Closes the page with the one question this list leaves open. */}
      <section className="border-t border-[rgba(212,175,55,0.25)] bg-sand text-ink">
        <div className="mx-auto max-w-3xl px-4 py-[50px] text-center sm:px-6">
          <h2 className="font-display text-[1.6rem] font-bold leading-snug text-[#1A1A1A] sm:text-[1.95rem]">
            לא מצאתם את העיר שלכם ברשימה?
          </h2>
          <div className="gold-rule mx-auto mt-4 w-full max-w-xs" />
          <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-[#55504A]">
            הרשימה מרכזת את הערים שאנחנו מגיעים אליהן הכי הרבה, אבל היא לא סוגרת את הדלת. שלחו מיקום ונענה מיד אם זה בטווח.
          </p>
          <div className="mt-8">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-metal arrow-link inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[1rem]"
            >
              שלחו לנו מיקום לבדיקת הגעה מהירה <span className="arrow">←</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
