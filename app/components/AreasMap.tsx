"use client";

import Link from "next/link";
import { useState } from "react";
import { CITIES, REGION_LABEL } from "@/lib/site";
import SectionHeading from "./SectionHeading";

/**
 * Option B: copy on one side, an abstract map on the other.
 *
 * The shape is decorative, not cartographic - it suggests the coast and
 * the built-up strip inland without claiming to place anywhere exactly,
 * so nobody reads a real boundary into it. Pin positions are chosen for
 * balance, and the eight named here are the busiest; the rest stay as
 * chips beneath.
 */
const PINS = [
  { slug: "tel-aviv", x: 30, y: 46 },
  { slug: "ramat-gan", x: 45, y: 41 },
  { slug: "givatayim", x: 40, y: 50 },
  { slug: "bnei-brak", x: 52, y: 34 },
  { slug: "petah-tikva", x: 66, y: 30 },
  { slug: "herzliya", x: 27, y: 22 },
  { slug: "holon", x: 32, y: 64 },
  { slug: "rishon-lezion", x: 44, y: 76 },
];

export default function AreasMap() {
  const [active, setActive] = useState<string | null>(null);
  const pinned = new Set(PINS.map((p) => p.slug));
  const rest = CITIES.filter((c) => !pinned.has(c.slug));

  return (
    <section id="areas" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="text-center lg:text-right">
            <p className="gold-metal font-display text-4xl font-bold leading-tight sm:text-6xl">
              אזורי שירות
            </p>
            <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-ink sm:text-3xl">
              מגיעים אליכם ב{REGION_LABEL}
            </h2>
            <div className="gold-rule mt-6 w-full max-w-sm lg:mx-0" />
            <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
              צוותי המומחים של Goldrock מעניקים שירותי פוליש, ליטוש שיש, חידוש מדרגות וקריסטליזציה בפריסה רחבה. בחרו את העיר שלכם לקבלת פרטים, מענה מהיר והצעת מחיר במקום.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
              {rest.map((city) => (
                <Link
                  key={city.slug}
                  href={`/areas/${city.slug}`}
                  className="city-pill inline-flex items-center px-4 py-2 text-[13px] font-medium"
                >
                  {city.name}
                </Link>
              ))}
            </div>

            <Link
              href="/areas"
              className="btn-gold arrow-link mt-8 inline-flex rounded-xl px-7 py-3.5 text-[15px]"
            >
              לכל אזורי השירות והערים הנוספות <span className="arrow">←</span>
            </Link>
          </div>

          {/* Abstract map. */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-[#1d1d1d] to-[#101010] shadow-[0_20px_45px_rgba(0,0,0,0.25)] sm:aspect-square lg:aspect-[4/5]">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              aria-hidden
              preserveAspectRatio="none"
            >
              <path
                d="M18 0 C14 22 20 40 16 58 C13 74 20 88 17 100"
                fill="none"
                stroke="rgba(197,160,89,0.45)"
                strokeWidth="0.5"
              />
              <path
                d="M22 6 C34 14 44 12 58 20 C72 28 80 24 92 32 C86 46 90 60 84 74 C72 84 58 82 44 90 C34 96 28 94 20 98"
                fill="rgba(197,160,89,0.05)"
                stroke="rgba(197,160,89,0.3)"
                strokeWidth="0.4"
              />
              <path
                d="M26 30 C40 34 52 44 66 46"
                fill="none"
                stroke="rgba(197,160,89,0.18)"
                strokeWidth="0.3"
              />
              <path
                d="M24 58 C38 60 50 68 64 68"
                fill="none"
                stroke="rgba(197,160,89,0.18)"
                strokeWidth="0.3"
              />
            </svg>

            {PINS.map((pin) => {
              const city = CITIES.find((c) => c.slug === pin.slug);
              if (!city) return null;
              const on = active === pin.slug;
              return (
                <Link
                  key={pin.slug}
                  href={`/areas/${city.slug}`}
                  onMouseEnter={() => setActive(pin.slug)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(pin.slug)}
                  onBlur={() => setActive(null)}
                  style={{ right: `${pin.x}%`, top: `${pin.y}%` }}
                  className="absolute flex -translate-y-1/2 translate-x-1/2 items-center gap-2"
                >
                  <span
                    className={`map-pin block rounded-full bg-gold transition-all duration-300 ${
                      on ? "h-4 w-4 shadow-[0_0_18px_6px_rgba(197,160,89,0.55)]" : "h-2.5 w-2.5"
                    }`}
                  />
                  <span
                    className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] backdrop-blur-md transition-colors ${
                      on
                        ? "border-gold bg-black/70 text-gold"
                        : "border-white/15 bg-black/45 text-white/75"
                    }`}
                  >
                    {city.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
