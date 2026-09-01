import Link from "next/link";
import { CITIES, REGION_LABEL } from "@/lib/site";

export default function Areas() {
  return (
    <section id="areas" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">אזורי שירות</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            מגיעים אליכם ב{REGION_LABEL}
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
            צוותי המומחים של Goldrock מעניקים שירותי פוליש, ליטוש שיש, חידוש מדרגות וקריסטליזציה בפריסה רחבה. בחרו את העיר שלכם לקבלת פרטים, מענה מהיר והצעת מחיר במקום.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
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
