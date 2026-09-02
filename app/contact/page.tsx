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

/** Both quick routes wear the same shape: mark, label, action. */
const cardClass =
  "flex items-center gap-4 rounded-xl border border-[rgba(212,175,55,0.3)] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_14px_34px_rgba(212,175,55,0.18)]";

export default function ContactPage() {
  return (
    <>
      <InnerHero
        eyebrow="דברו איתנו"
        title="צור קשר"
        tagline="נשמח לשמוע מכם, ולחזור אליכם עם תשובה ברורה"
        note="זמינים בכל גוש דן, בטלפון ובוואטסאפ, גם בשעות הערב"
      />

      <section className="bg-[#FAF6F0] text-ink">
        <div className="mx-auto max-w-3xl px-4 py-[60px] sm:px-6">
          <div className="text-center">
            <h2 className="font-display text-[1.8rem] font-bold text-[#1A1A1A]">
              צור קשר
            </h2>
            <div className="gold-rule mx-auto mt-4 w-full max-w-[220px]" />
            <p className="mx-auto mt-5 max-w-xl text-[1.02rem] leading-relaxed text-[#666059]">
              הכניסו שם וטלפון בטופס, או שלחו הודעה בוואטסאפ ישירות, ונחזור אליכם עם הצעת מחיר ללא התחייבות.
            </p>
          </div>

          <div className="mt-14 text-center">
            <h2 className="font-display text-[1.8rem] font-bold text-[#1A1A1A]">
              דרכים מהירות
            </h2>
            <div className="gold-rule mx-auto mt-4 w-full max-w-[220px]" />
            <p className="mx-auto mt-5 max-w-xl text-[1.02rem] leading-relaxed text-[#666059]">
              מעדיפים מענה מיידי? שלחו תמונה של הרצפה בוואטסאפ לקבלת הצעת מחיר מדויקת במקום.
            </p>

            {/* Held well short of the column width, so the two routes read as
                buttons rather than as full-width bands. */}
            <div className="mx-auto mt-7 max-w-md space-y-4 text-right">
              <a
                href={whatsappLink(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
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

              <a href={PHONE_HREF} className={cardClass}>
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <PhoneIcon width={22} height={22} />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-lg font-bold text-[#1A1A1A]">
                    שיחת טלפון
                  </span>
                  <span className="mt-1 block text-sm text-[#666059]" dir="ltr">
                    {PHONE_DISPLAY}
                  </span>
                </span>
                <span className="arrow-link shrink-0 text-[15px] font-semibold text-gold">
                  חייגו <span className="arrow">←</span>
                </span>
              </a>
            </div>

            <p className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-[#666059]">
              הכי מדויק: שולחים תמונה של הרצפה או המדרגות. ככה אפשר להגיד אם צריך פוליש מלא, קריסטליזציה או ניקיון אחרי שיפוץ.
            </p>
          </div>

          <div className="mt-14 rounded-2xl border border-[rgba(212,175,55,0.2)] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8">
            <h2 className="text-center font-display text-[1.8rem] font-bold text-[#1A1A1A]">
              השאירו פנייה
            </h2>
            <div className="gold-rule mx-auto mt-4 w-full max-w-[220px]" />
            <div className="mt-7">
              <ContactForm source="contact-page" tone="light" compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
