import type { Metadata } from "next";
import {
  DEFAULT_WA_MESSAGE,
  PHONE_DISPLAY,
  PHONE_HREF,
  SITE_URL,
  whatsappLink,
} from "@/lib/site";
import InnerHero from "../components/InnerHero";
import ContactForm from "../components/ContactForm";
import { PhoneIcon, WhatsAppIcon } from "../components/icons";

const title = "צור קשר והזמנת פוליש";
const description =
  "הזמנת שירות פוליש לשיש בגוש דן. השאירו פרטים, התקשרו או שלחו תמונה בוואטסאפ ל-053-273-3999.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <InnerHero
        eyebrow="צור קשר"
        title="הזמנת שירות מתחילה בתמונה"
        tagline="שם וטלפון בטופס, או וואטסאפ ישיר. נחזור עם כיוון מחיר."
      />

      <section className="bg-[#FAF6F0] text-ink">
        {/* Quick routes first on a phone, form beside them on desktop. */}
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-[60px] sm:px-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="font-display text-[1.8rem] font-bold text-[#1A1A1A]">
              דרכים מהירות
            </h2>
            <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-[#666059]">
              מעדיפים מענה מיידי? שלחו תמונה של הרצפה בוואטסאפ לקבלת הצעת מחיר מדויקת במקום.
            </p>

            <div className="mt-7 space-y-4">
              <a
                href={whatsappLink(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-[rgba(212,175,55,0.3)] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_14px_34px_rgba(212,175,55,0.18)]"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                  <WhatsAppIcon width={24} height={24} />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-lg font-bold text-[#1A1A1A]">
                    וואטסאפ מהיר
                  </span>
                  <span className="mt-1 block text-sm text-[#666059]">
                    שלחו תמונה וקבלו כיוון מחיר
                  </span>
                </span>
                <span className="arrow-link shrink-0 text-[15px] font-semibold text-gold">
                  פתיחת צ&apos;אט <span className="arrow">←</span>
                </span>
              </a>

              <a
                href={PHONE_HREF}
                className="group flex items-center gap-4 rounded-xl border border-[rgba(212,175,55,0.3)] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_14px_34px_rgba(212,175,55,0.18)]"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <PhoneIcon width={22} height={22} />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-lg font-bold text-[#1A1A1A]">
                    שיחת טלפון
                  </span>
                  <span
                    className="mt-1 block text-[1.05rem] font-bold text-[#1A1A1A]"
                    dir="ltr"
                  >
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>
            </div>

            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-[#666059]">
              הכי מדויק: שולחים תמונה של הרצפה או המדרגות. ככה אפשר להגיד אם צריך פוליש מלא, קריסטליזציה או ניקיון אחרי שיפוץ.
            </p>
          </div>

          <div className="rounded-2xl border border-[rgba(212,175,55,0.2)] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8">
            <h2 className="font-display text-[1.4rem] font-bold text-[#1A1A1A]">
              השארת פרטים
            </h2>
            <div className="gold-line mt-4 w-32" />
            <div className="mt-6">
              <ContactForm source="contact-page" tone="light" compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
