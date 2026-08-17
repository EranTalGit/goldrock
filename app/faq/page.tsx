import type { Metadata } from "next";
import { GENERAL_FAQ, SITE_URL } from "@/lib/site";
import InnerHero from "../components/InnerHero";
import FaqSection from "../components/FaqSection";
import CtaBand from "../components/CtaBand";

const title = "שאלות נפוצות על פוליש לשיש";
const description =
  "תשובות על מחיר פוליש לשיש, זמן עבודה, אחריות, קריסטליזציה ואזורי שירות של Goldrock בגוש דן.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/faq` },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GENERAL_FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InnerHero
        eyebrow="שאלות נפוצות"
        title="כל מה ששואלים לפני פוליש"
        tagline="מחיר, זמן, אחריות והבדל בין פוליש לקריסטליזציה. בקצרה."
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "שאלות נפוצות", href: "/faq" },
        ]}
      />
      <FaqSection />
      <CtaBand />
    </>
  );
}
