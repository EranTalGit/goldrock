import Link from "next/link";
import { CITIES, REGION_LABEL } from "@/lib/site";
import SectionHeading from "./SectionHeading";

/** Option A: the existing cloud, rebuilt as glass pills over a map wash. */
export default function AreasPills() {
  return (
    <section id="areas" className="relative overflow-hidden bg-paper text-ink">
      {/* Faint contour wash plus a halo, so the cloud sits on something. */}
      <div aria-hidden className="map-wash pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_62%,rgba(197,160,89,0.12),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="אזורי שירות"
          title={`מגיעים אליכם ב${REGION_LABEL}`}
          description="צוותי המומחים של Goldrock מעניקים שירותי פוליש, ליטוש שיש, חידוש מדרגות וקריסטליזציה בפריסה רחבה. בחרו את העיר שלכם לקבלת פרטים, מענה מהיר והצעת מחיר במקום."
        />

        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/areas/${city.slug}`}
              className="city-pill inline-flex items-center px-5 py-2.5 text-sm font-medium"
            >
              <span className="pin">📍</span>
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
