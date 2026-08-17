import type { Metadata } from "next";
import { BUSINESS_NAME, PHONE_DISPLAY, SITE_URL } from "@/lib/site";
import InnerHero from "../components/InnerHero";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: `איך ${BUSINESS_NAME} שומרים על פרטי פניות מהאתר.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <>
      <InnerHero
        eyebrow="משפטי"
        title="מדיניות פרטיות"
        tagline="מה אוספים בטופס, למה, ולכמה זמן."
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "פרטיות", href: "/privacy" },
        ]}
      />
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-16 leading-relaxed text-ink/80 sm:px-6">
          <p>
            בטופס יצירת הקשר נשמרים שם, טלפון, עיר, סוג שירות והודעה. המטרה היחידה היא לחזור אליכם עם הצעת מחיר ולתאם עבודה.
          </p>
          <p>
            הפרטים נשמרים ב-Supabase ולא נמכרים לצד שלישי. אפשר לבקש מחיקה בפנייה ל-{PHONE_DISPLAY}.
          </p>
          <p>האתר עשוי להשתמש בכלי מדידה בסיסיים של האחסון (Vercel) לשיפור ביצועים.</p>
        </div>
      </section>
    </>
  );
}
