import type { Metadata } from "next";
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_HREF, SITE_URL } from "@/lib/site";
import InnerHero from "../components/InnerHero";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: `הצהרת הנגישות של אתר ${BUSINESS_NAME} ודרכי פנייה בנושא.`,
  alternates: { canonical: `${SITE_URL}/accessibility` },
};

export default function AccessibilityPage() {
  return (
    <>
      <InnerHero
        eyebrow="משפטי"
        title="הצהרת נגישות"
        tagline="מה נעשה באתר כדי שיהיה נוח לשימוש, ואיך לפנות אלינו."
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "נגישות", href: "/accessibility" },
        ]}
      />
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 leading-relaxed text-ink/80 sm:px-6">
          <p>
            ב-{BUSINESS_NAME} אנחנו רואים חשיבות בכך שהאתר יהיה נוח לשימוש עבור כמה שיותר אנשים, לרבות אנשים עם מוגבלות.
          </p>

          <h2 className="pt-2 font-display text-xl font-bold text-ink">מה נעשה באתר</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>מבנה עמוד סמנטי עם היררכיית כותרות, כדי שקוראי מסך יוכלו לנווט בו.</li>
            <li>ניווט מלא במקלדת בכל הקישורים, הכפתורים ושדות הטופס.</li>
            <li>טקסט חלופי לתמונות, ותיאורים לכפתורי אייקון.</li>
            <li>שדות טופס עם תוויות ברורות וסימון שדות חובה.</li>
            <li>הודעות שגיאה והצלחה שמוכרזות גם לקוראי מסך.</li>
            <li>הקטנת אנימציות עבור מי שהגדיר במערכת ההפעלה העדפה לצמצום תנועה.</li>
            <li>ניגודיות צבע ורוחב שורה שנבחרו לקריאוּת.</li>
          </ul>

          <h2 className="pt-2 font-display text-xl font-bold text-ink">
            מגבלות ושיפור מתמשך
          </h2>
          <p>
            הנגשת אתר היא תהליך מתמשך. ייתכן שקיימים חלקים שטרם הונגשו במלואם, ואנחנו ממשיכים לשפר אותם.
          </p>

          <h2 className="pt-2 font-display text-xl font-bold text-ink">
            נתקלתם בבעיה?
          </h2>
          <p>
            אם נתקלתם בקושי בשימוש באתר, נשמח שתעדכנו אותנו ונטפל בכך. אפשר לפנות בטלפון{" "}
            <a href={PHONE_HREF} className="font-semibold text-gold" dir="ltr">
              {PHONE_DISPLAY}
            </a>
            , ונחזור אליכם בהקדם.
          </p>
        </div>
      </section>
    </>
  );
}
