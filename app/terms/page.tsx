import type { Metadata } from "next";
import { BUSINESS_NAME, SITE_URL } from "@/lib/site";
import InnerHero from "../components/InnerHero";

export const metadata: Metadata = {
  title: "תנאי שימוש",
  description: `תנאי השימוש באתר ${BUSINESS_NAME}.`,
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <>
      <InnerHero
        eyebrow="משפטי"
        title="תנאי שימוש"
        tagline="האתר מיועד להזמנת שירותי פוליש וליטוש רצפות"
        note="התנאים שלהלן חלים על כל שימוש באתר ועל כל פנייה שנשלחת דרכו"
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "תנאי שימוש", href: "/terms" },
        ]}
      />
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 leading-relaxed text-ink/80 sm:px-6">
          <p>
            התוכן באתר הוא מידע כללי. הצעת מחיר סופית ניתנת אחרי בדיקת הרצפה או תמונות עדכניות.
          </p>
          <p>
            תמונות האווירה באתר כוללות צילומי סטוק והדמיות. הן לא מוצגות כעבודות שבוצעו בפועל אצל לקוח ספציפי.
          </p>
          <p>הזמנת עבודה נסגרת בתיאום ישיר, כולל היקף, מועד ואחריות.</p>
        </div>
      </section>
    </>
  );
}
