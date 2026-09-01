import Link from "next/link";
import { CITIES, REGION_LABEL } from "@/lib/site";
import SectionHeading from "./SectionHeading";

export default function Areas() {
  return (
    <section id="areas" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="אזורי שירות"
          title={`מגיעים אליכם ב${REGION_LABEL}`}
          description="צוותי המומחים של Goldrock מעניקים שירותי פוליש, ליטוש שיש, חידוש מדרגות וקריסטליזציה בפריסה רחבה. בחרו את העיר שלכם לקבלת פרטים, מענה מהיר והצעת מחיר במקום."
        />

        <div className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/areas/${city.slug}`}
              className="chip px-5 py-2.5 text-sm font-medium"
            >
              {city.name}
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/areas"
            className="arrow-link inline-flex items-center gap-1.5 text-[15px] font-semibold text-gold transition-colors hover:text-gold-soft"
          >
            לכל אזורי השירות והערים הנוספות <span className="arrow">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
