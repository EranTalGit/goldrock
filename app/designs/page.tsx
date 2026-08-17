import type { Metadata } from "next";
import InnerHero from "../components/InnerHero";
import ThemePreview from "../components/ThemePreview";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "בחירת עיצוב",
  description: "השוואת שלושה כיווני עיצוב לאתר Goldrock.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/designs` },
};

export default function DesignsPage() {
  return (
    <>
      <InnerHero
        eyebrow="סטודיו"
        title="שלושה מראות לאתר. לחצו והאתר כולו מתחלף."
        tagline="לילה וזהב הוא העיצוב החי. שיש בהיר וברונזה חמה הם חלופות. הבחירה נשמרת בדפדפן עד שתבחרו אחרת."
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "עיצובים", href: "/designs" },
        ]}
      />
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <ThemePreview />
          <p className="mt-10 text-sm text-ink/65">
            אחרי בחירה תגללו לדף הבית, לשירותים ולצור קשר. תראו את אותו תוכן במראה אחר.
          </p>
        </div>
      </section>
    </>
  );
}
