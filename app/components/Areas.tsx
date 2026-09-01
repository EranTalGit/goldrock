import Link from "next/link";
import { CITIES, REGION_LABEL } from "@/lib/site";

export default function Areas() {
  return (
    <section id="areas" className="bg-charcoal">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <p className="eyebrow">אזורי שירות</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          מגיעים אליכם ב{REGION_LABEL}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
          פוליש לשיש, חידוש מדרגות וניקיון אחרי שיפוץ בכל גוש דן. בחרו עיר וקבלו פרטים מקומיים.
        </p>
        <div className="mt-12 flex flex-wrap gap-2.5">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/areas/${city.slug}`}
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition-colors hover:border-gold hover:bg-gold/10 hover:text-gold-soft"
            >
              {city.name}
            </Link>
          ))}
        </div>
        <Link
          href="/areas"
          className="mt-10 inline-block text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
        >
          לכל אזורי השירות ←
        </Link>
      </div>
    </section>
  );
}
