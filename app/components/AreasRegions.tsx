import Link from "next/link";
import { CITY_REGIONS, REGION_LABEL, citiesInRegion } from "@/lib/site";
import SectionHeading from "./SectionHeading";

/** Option C: the cities sorted into three regional glass cards. */
export default function AreasRegions() {
  return (
    <section id="areas" className="relative overflow-hidden bg-paper text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(197,160,89,0.1),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="אזורי שירות"
          title={`מגיעים אליכם ב${REGION_LABEL}`}
          description="צוותי המומחים של Goldrock מעניקים שירותי פוליש, ליטוש שיש, חידוש מדרגות וקריסטליזציה בפריסה רחבה. בחרו את העיר שלכם לקבלת פרטים, מענה מהיר והצעת מחיר במקום."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CITY_REGIONS.map((region) => (
            <article key={region.title} className="region-card p-6 sm:p-7">
              <h3 className="flex items-center gap-2 text-[15px] font-bold text-gold">
                <span aria-hidden>📍</span>
                {region.title}
              </h3>
              <div className="gold-line mt-4" />
              <div className="mt-5 flex flex-wrap gap-2">
                {citiesInRegion(region.slugs).map((city) => (
                  <Link
                    key={city.slug}
                    href={`/areas/${city.slug}`}
                    className="city-pill inline-flex items-center px-4 py-2 text-[13px] font-medium"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="btn-gold arrow-link inline-flex rounded-xl px-7 py-3.5 text-center text-[15px] leading-snug"
          >
            צריכים שירות בעיר אחרת? צרו עמנו קשר לבדיקת הגעה{" "}
            <span className="arrow">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
