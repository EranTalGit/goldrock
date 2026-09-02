import Link from "next/link";
import { CITIES, REGION_LABEL } from "@/lib/site";
import SectionHeading from "./SectionHeading";

/**
 * Twenty cities split 7 / 7 / 6 rather than left to wrap, so the block
 * reads as a deliberate shape with the short row centred beneath.
 */
const ROW_SIZES = [7, 7, 6];

function splitRows<T>(items: T[], sizes: number[]): T[][] {
  const rows: T[][] = [];
  let cursor = 0;
  for (const size of sizes) {
    rows.push(items.slice(cursor, cursor + size));
    cursor += size;
  }
  // Anything left over rides along on the last row.
  if (cursor < items.length) rows.push(items.slice(cursor));
  return rows.filter((row) => row.length > 0);
}

export default function Areas() {
  const rows = splitRows(CITIES, ROW_SIZES);

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

        <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-3">
          {rows.map((row, i) => (
            <div key={i} className="flex flex-wrap justify-center gap-3">
              {row.map((city) => (
                <Link
                  key={city.slug}
                  href={`/areas/${city.slug}`}
                  className="city-mirror inline-flex items-center px-5 py-2.5 text-sm font-medium"
                >
                  {city.name}
                </Link>
              ))}
            </div>
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
