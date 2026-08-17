import Link from "next/link";
import { CITIES, REGION_LABEL } from "@/lib/site";

export default function Areas() {
  return (
    <section id="areas" className="bg-charcoal">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-xs tracking-[0.28em] text-gold">אזורי שירות</p>
        <h2 className="mt-3 font-display text-4xl text-cream">מגיעים אליכם ב{REGION_LABEL}</h2>
        <p className="mt-4 max-w-2xl text-muted">
          פוליש לשיש, חידוש מדרגות וניקיון אחרי שיפוץ בכל גוש דן. בחרו עיר וקבלו פרטים מקומיים.
        </p>
        <div className="mt-10 flex flex-wrap gap-2">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/areas/${city.slug}`}
              className="rounded-full border border-gold/25 px-4 py-2 text-sm text-cream/85 transition-colors hover:border-gold hover:text-gold-soft"
            >
              {city.name}
            </Link>
          ))}
        </div>
        <Link href="/areas" className="mt-8 inline-block text-sm font-semibold text-gold">
          לכל אזורי השירות
        </Link>
      </div>
    </section>
  );
}
