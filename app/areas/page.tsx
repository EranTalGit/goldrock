import type { Metadata } from "next";
import Link from "next/link";
import { CITIES, REGION_LABEL, SITE_URL } from "@/lib/site";
import InnerHero from "../components/InnerHero";
import CtaBand from "../components/CtaBand";

const title = "אזורי שירות: פוליש רצפות בגוש דן";
const description = `Goldrock מגיעים לפוליש לשיש, ליטוש מדרגות וחידוש רצפות ב${REGION_LABEL}. בחרו עיר וקבלו פרטים מקומיים.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/areas` },
};

export default function AreasPage() {
  return (
    <>
      <InnerHero
        eyebrow="אזורי שירות"
        title={`פוליש והברקה ב${REGION_LABEL}`}
        tagline="כל עיר עם דף משלה: שכונות, שירותים מקומיים והזמנה מהירה."
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "אזורי שירות", href: "/areas" },
        ]}
      />
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-20 sm:px-6 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((city) => (
            <article key={city.slug} className="rounded-2xl bg-cream p-6">
              <h2 className="font-display text-2xl">
                <Link href={`/areas/${city.slug}`}>פוליש לשיש {city.inName}</Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{city.intro}</p>
              <Link href={`/areas/${city.slug}`} className="mt-4 inline-block text-sm font-semibold text-gold">
                לפירוט {city.inName}
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
