import type { Metadata } from "next";
import {
  BUSINESS_NAME,
  DEFAULT_WA_MESSAGE,
  PHONE_DISPLAY,
  PHONE_HREF,
  SITE_URL,
  whatsappLink,
} from "@/lib/site";
import SectionHeading from "../components/SectionHeading";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: `הצהרת הנגישות של אתר ${BUSINESS_NAME}, רכיב הנגישות באתר ודרכי פנייה בנושא.`,
  alternates: { canonical: `${SITE_URL}/accessibility` },
};

const WIDGET_OPTIONS = [
  "הגדלה והקטנה של גודל הטקסט באתר",
  "מצב ניגודיות כהה ומצב ניגודיות בהירה",
  "תצוגת גווני אפור (מונוכרום)",
  "הדגשת קישורים וסימון ברור שלהם",
  "מעבר לפונט קריא וברור",
  "הגדלת ריווח בין שורות ואותיות",
  "עצירת אנימציות ותנועה באתר",
  "הגדלת סמן העכבר",
  "איפוס מלא של כל ההתאמות",
];

const MEASURES = [
  "מבנה דפים סמנטי המאפשר ניווט באמצעות מקלדת (Tab) וקוראי מסך",
  "קישור לדילוג ישיר לתוכן הראשי בתחילת כל עמוד",
  "טקסט חלופי (alt) לתמונות התוכן באתר",
  "סימון פוקוס ברור לאלמנטים הניתנים לתפעול",
  "תוויות ברורות בשדות הטופס וסימון שדות חובה",
  "הודעות שגיאה והצלחה בטופס המוכרזות גם לקוראי מסך",
  "צמצום אנימציות עבור מי שהגדיר במערכת ההפעלה העדפה לתנועה מופחתת",
  "שמירה על ניגודיות צבעים וקריאות הטקסט",
  "תמיכה מלאה בתצוגה במחשב, בטאבלט ובנייד",
];

export default function AccessibilityPage() {
  return (
    <>
      {/* No hero on the legal pages: the heading block does that work, in
          the same shape every other section uses. The top padding is what
          the fixed bar would otherwise sit on. */}
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-3xl px-4 pt-[110px] sm:px-6">
          <SectionHeading
            labelAs="h1"
            label="הצהרת נגישות"
            title="מה עשינו כדי שהאתר יהיה נוח לשימוש, ואיך לפנות אלינו"
            description="נתקלתם בקושי בשימוש באתר? נשמח לשמוע ולתקן."
          />
        </div>

        <div className="mx-auto max-w-3xl px-4 pb-12 pt-12 leading-[1.95] text-ink-soft sm:px-6">
          <p>
            {BUSINESS_NAME} רואה חשיבות רבה במתן שירות שוויוני לכלל הלקוחות ובהנגשת האתר לאנשים עם מוגבלות. אנו פועלים כמיטב יכולתנו להנגיש את האתר בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע&quot;ג-2013, ובהתאם לתקן הישראלי 5568 המבוסס על הנחיות WCAG 2.0 ברמת התאמה AA.
          </p>

          <h2 className="mt-8 font-display text-xl font-bold text-ink">
            רכיב הנגישות באתר
          </h2>
          <p className="mt-3">
            באתר מוטמע רכיב נגישות הנפתח באמצעות כפתור הנגישות שבצד המסך. הרכיב מאפשר להתאים את התצוגה לצרכים אישיים, וכולל בין היתר את האפשרויות הבאות:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5">
            {WIDGET_OPTIONS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3">
            ההגדרות נשמרות בדפדפן שלכם וממשיכות ללוות אתכם בין הדפים השונים באתר.
          </p>

          <h2 className="mt-8 font-display text-xl font-bold text-ink">
            אמצעי נגישות נוספים
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-1.5">
            {MEASURES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="mt-8 font-display text-xl font-bold text-ink">
            מגבלות נגישות
          </h2>
          <p className="mt-3">
            למרות מאמצינו להנגיש את כלל הדפים והרכיבים באתר, ייתכן שחלקים מסוימים - ובפרט תכנים ותמונות שהתקבלו מגורמים חיצוניים - טרם הונגשו במלואם. אנו ממשיכים לפעול לשיפור מתמיד של רמת הנגישות באתר.
          </p>

          <h2 className="mt-8 font-display text-xl font-bold text-ink">
            יצירת קשר בנושא נגישות
          </h2>
          <p className="mt-3">
            אם נתקלתם בבעיה או בקושי בגלישה באתר, או שיש לכם הצעה לשיפור הנגישות, נשמח שתפנו אלינו. נעשה כל מאמץ לתת מענה מהיר ומיטבי.
          </p>
          <ul className="mt-3 space-y-1.5">
            <li>
              רכז נגישות: צוות {BUSINESS_NAME}
            </li>
            <li>
              טלפון:{" "}
              <a href={PHONE_HREF} className="font-semibold text-gold" dir="ltr">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              וואטסאפ:{" "}
              <a
                href={whatsappLink(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gold"
              >
                שליחת הודעה
              </a>
            </li>
          </ul>

          <p className="mt-8 text-sm text-ink-soft/80">
            הצהרת הנגישות עודכנה לאחרונה בחודש ספטמבר 2026.
          </p>
        </div>
      </section>
    </>
  );
}
