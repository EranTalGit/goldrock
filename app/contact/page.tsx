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
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "צור קשר", href: "/contact" },
        ]}
      />
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">דרכים מהירות</h2>
            <a href={PHONE_HREF} className="mt-6 block text-2xl text-gold" dir="ltr">
              {PHONE_DISPLAY}
            </a>
            <a
              href={whatsappLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-semibold text-gold"
            >
              פתיחת וואטסאפ
            </a>
            <p className="mt-6 leading-relaxed text-ink/75">
              הכי מדויק: שולחים תמונה של הרצפה או המדרגות. ככה אפשר להגיד אם צריך פוליש מלא, קריסטליזציה או ניקיון אחרי שיפוץ.
            </p>
          </div>
          <div className="form-card p-6 sm:p-7">
            <h2 className="font-display text-2xl">טופס קצר</h2>
            <div className="mt-6">
              <ContactForm source="contact-page" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
