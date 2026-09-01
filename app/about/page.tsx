import type { Metadata } from "next";
import { BUSINESS_NAME, BUSINESS_NAME_HE, REGION_LABEL, SITE_URL } from "@/lib/site";
import InnerHero from "../components/InnerHero";
import CtaBand from "../components/CtaBand";

const title = "אודות Goldrock";
const description = `${BUSINESS_NAME_HE} מספקים פוליש לשיש, ליטוש והברקת רצפות ב${REGION_LABEL}. עבודה נקייה, שקיפות במחיר ואחריות על התוצאה.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <>
      <InnerHero
        eyebrow={BUSINESS_NAME}
        title={`${BUSINESS_NAME_HE}: אטלייה לאבן`}
        tagline="מותג פוליש ששם את הברק, הניקיון והאחריות לפני כל דבר אחר."
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "אודות", href: "/about" },
        ]}
      />
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p className="leading-relaxed text-ink/80">
            Goldrock נולד מהרעיון הפשוט הזה: רצפת שיש לא חייבת להיראות עייפה. ליטוש נכון מחזיר לאבן את העומק שלה, בלי לפרק בית ובלי שיפוץ מיותר.
          </p>
          <p className="mt-4 leading-relaxed text-ink/80">
            אנחנו עובדים ב{REGION_LABEL}. מגיעים עד הבית, עובדים נקי, ומסבירים מה ייעשה בכל שלב. המחיר נקבע לפי הרצפה עצמה, לא לפי סיסמה.
          </p>
          <h2 className="mt-10 font-display text-3xl">איך אנחנו עובדים</h2>
          <ul className="mt-4 list-disc pr-5 text-ink/80">
            <li className="mt-2">אבחון לפי תמונה או ביקור קצר</li>
            <li className="mt-2">ליטוש יהלום והברקה לפי סוג האבן</li>
            <li className="mt-2">עבודה יבשה ככל האפשר, גם בבית מאוכלס</li>
            <li className="mt-2">אחריות מלאה על התוצאה</li>
          </ul>
          <p className="mt-8 leading-relaxed text-ink/80">
            אין כאן ביקורות מומצאות ואין כוכבים שהמצאנו. כשיהיו המלצות אמיתיות, הן יופיעו כאן בשם מלא.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
