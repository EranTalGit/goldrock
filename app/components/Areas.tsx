import Link from "next/link";
import { CITIES, REGION_LABEL } from "@/lib/site";
import SectionHeading from "./SectionHeading";

/**
 * Twenty cities in a four-column grid: every pill the same width, five
 * even rows, and no short row left hanging.
 */

export default function Areas() {
  return (
    <section id="areas" className="relative overflow-hidden bg-paper text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_62%,rgba(197,160,89,0.11),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="אזורי שירות"
          title={`מגיעים אליכם ב${REGION_LABEL}`}
          description="צוותי המומחים של Goldrock מעניקים שירותי פוליש, ליטוש שיש, חידוש מדרגות וקריסטליזציה בפריסה רחבה. בחרו את העיר שלכם לקבלת פרטים, מענה מהיר והצעת מחיר במקום."
        />

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-4 gap-2 sm:gap-3">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/areas/${city.slug}`}
              className="city-mirror flex items-center justify-center px-1.5 py-2.5 text-center text-[11px] font-medium leading-tight sm:px-4 sm:text-sm"
            >
              {city.name}
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/areas"
            className="btn-gold arrow-link inline-flex rounded-xl px-7 py-3.5 text-[15px]"
          >
            לכל אזורי השירות והערים הנוספות <span className="arrow">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
