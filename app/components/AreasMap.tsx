"use client";

import Link from "next/link";
import { useState } from "react";
import { CITIES, REGION_LABEL } from "@/lib/site";
import SectionHeading from "./SectionHeading";

/**
 * Option B: copy on one side, a map on the other.
 *
 * Cities are plotted from their real coordinates rather than placed by
 * eye, so the relative geography is correct. The coastline is a
 * simplified trace of the real Mediterranean shore through this window -
 * accurate in position, not in every inlet.
 */
const BOUNDS = { latMin: 31.85, latMax: 32.25, lngMin: 34.68, lngMax: 34.99 };

/** Equirectangular is plenty at a 30km span; scale x by cos(lat). */
const COS_LAT = Math.cos((32.05 * Math.PI) / 180);
const SPAN_X = (BOUNDS.lngMax - BOUNDS.lngMin) * COS_LAT;
const SPAN_Y = BOUNDS.latMax - BOUNDS.latMin;
const VIEW_H = Math.round((SPAN_Y / SPAN_X) * 100);

function project(lat: number, lng: number) {
  return {
    x: ((lng - BOUNDS.lngMin) * COS_LAT * 100) / SPAN_X,
    y: ((BOUNDS.latMax - lat) * VIEW_H) / SPAN_Y,
  };
}

/** Real shoreline points, north to south. */
const COAST: [number, number][] = [
  [32.25, 34.8],
  [32.19, 34.785],
  [32.162, 34.79],
  [32.13, 34.783],
  [32.1, 34.774],
  [32.085, 34.768],
  [32.05, 34.755],
  [32.017, 34.743],
  [31.98, 34.735],
  [31.94, 34.723],
  [31.9, 34.706],
  [31.85, 34.69],
];

export default function AreasMap() {
  const [active, setActive] = useState<string | null>(null);

  const coastPath = COAST.map(([lat, lng], i) => {
    const { x, y } = project(lat, lng);
    return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");

  // Close the sea off to the west so it can be filled.
  const seaPath = `${coastPath} L0 ${VIEW_H} L0 0 Z`;

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

            {/* The full list stays reachable without hunting on the map. */}
            <div className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
              {CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`/areas/${city.slug}`}
                  onMouseEnter={() => setActive(city.slug)}
                  onMouseLeave={() => setActive(null)}
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

          <div
            className="relative w-full overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-[#1d1d1d] to-[#101010] shadow-[0_20px_45px_rgba(0,0,0,0.25)]"
            style={{ aspectRatio: `100 / ${VIEW_H}` }}
          >
            <svg
              viewBox={`0 0 100 ${VIEW_H}`}
              className="absolute inset-0 h-full w-full"
              aria-hidden
              preserveAspectRatio="none"
            >
              <path d={seaPath} fill="rgba(197,160,89,0.06)" />
              <path
                d={coastPath}
                fill="none"
                stroke="rgba(197,160,89,0.55)"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
            </svg>

            {CITIES.map((city) => {
              const { x, y } = project(city.lat, city.lng);
              const on = active === city.slug;
              return (
                <Link
                  key={city.slug}
                  href={`/areas/${city.slug}`}
                  onMouseEnter={() => setActive(city.slug)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(city.slug)}
                  onBlur={() => setActive(null)}
                  style={{
                    left: `${x}%`,
                    top: `${(y / VIEW_H) * 100}%`,
                    zIndex: on ? 20 : 10,
                  }}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
                  aria-label={`פוליש ${city.inName}`}
                >
                  <span
                    className={`map-pin block rounded-full bg-gold transition-all duration-300 ${
                      on
                        ? "h-3.5 w-3.5 shadow-[0_0_16px_5px_rgba(197,160,89,0.6)]"
                        : "h-2 w-2"
                    }`}
                  />
                  <span
                    className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] backdrop-blur-md transition-all duration-200 ${
                      on
                        ? "border-gold bg-black/80 text-gold opacity-100"
                        : "border-white/10 bg-black/50 text-white/60 opacity-0"
                    }`}
                  >
                    {city.name}
                  </span>
                </Link>
              );
            })}

            <p className="absolute bottom-3 left-3 text-[10px] text-white/35">
              מפה סכמטית
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
