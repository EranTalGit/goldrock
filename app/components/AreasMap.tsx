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

/**
 * Which way each label leans off its pin. Hand-set rather than computed:
 * the Tel Aviv cluster sits within a couple of kilometres, so labels have
 * to be steered apart by hand. Coastal cities point out over the sea,
 * where there is empty space.
 */
const LABEL_SIDE: Record<string, "west" | "east" | "north" | "south"> = {
  herzliya: "west",
  "ramat-hasharon": "west",
  "tel-aviv": "west",
  "bat-yam": "west",
  holon: "west",
  "rishon-lezion": "west",
  "nes-ziona": "west",
  rehovot: "west",
  raanana: "north",
  "kfar-saba": "east",
  "hod-hasharon": "east",
  "petah-tikva": "north",
  "rosh-haayin": "east",
  "bnei-brak": "north",
  "ramat-gan": "east",
  givatayim: "south",
  "givat-shmuel": "east",
  "kiryat-ono": "east",
  yehud: "east",
  "or-yehuda": "south",
};

const SIDE_CLASS: Record<string, string> = {
  west: "right-full me-0 mr-2 top-1/2 -translate-y-1/2",
  east: "left-full ml-2 top-1/2 -translate-y-1/2",
  north: "bottom-full mb-1.5 left-1/2 -translate-x-1/2",
  south: "top-full mt-1.5 left-1/2 -translate-x-1/2",
};

/**
 * Simplified national outline, for the locator inset. Traced from real
 * border and coastline points so the silhouette is recognisable; it is
 * a schematic, not a survey, and takes no position on any boundary.
 */
const ISRAEL: [number, number][] = [
  [33.28, 35.62],
  [33.09, 35.3],
  [33.05, 35.1],
  [32.83, 35.07],
  [32.7, 34.95],
  [32.4, 34.87],
  [32.08, 34.77],
  [31.8, 34.65],
  [31.55, 34.52],
  [31.35, 34.48],
  [31.25, 34.27],
  [30.9, 34.35],
  [30.4, 34.5],
  [30.1, 34.7],
  [29.55, 34.92],
  [29.55, 34.97],
  [30.1, 35.0],
  [30.5, 35.15],
  [30.95, 35.35],
  [31.2, 35.42],
  [31.5, 35.47],
  [31.75, 35.5],
  [31.9, 35.55],
  [32.1, 35.55],
  [32.35, 35.52],
  [32.5, 35.55],
  [32.72, 35.57],
  [32.95, 35.68],
  [33.1, 35.65],
];

const IL = { latMin: 29.4, latMax: 33.4, lngMin: 34.2, lngMax: 35.8 };
const IL_COS = Math.cos((31.4 * Math.PI) / 180);
const IL_SPAN_X = (IL.lngMax - IL.lngMin) * IL_COS;
const IL_H = Math.round((IL.latMax - IL.latMin) / IL_SPAN_X * 100);

function projectIL(lat: number, lng: number) {
  return {
    x: ((lng - IL.lngMin) * IL_COS * 100) / IL_SPAN_X,
    y: ((IL.latMax - lat) * IL_H) / (IL.latMax - IL.latMin),
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
                  className="absolute -translate-x-1/2 -translate-y-1/2"
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
                    className={`absolute whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] leading-tight transition-all duration-200 ${
                      SIDE_CLASS[LABEL_SIDE[city.slug] ?? "east"]
                    } ${
                      on
                        ? "bg-gold text-[#161616] shadow-[0_2px_10px_rgba(197,160,89,0.5)]"
                        : "bg-black/55 text-white/80 backdrop-blur-sm"
                    }`}
                  >
                    {city.name}
                  </span>
                </Link>
              );
            })}

            {/* Locator: the whole country, with a box round the part
                enlarged here, so the window is recognisably Israel. */}
            <div className="absolute bottom-3 left-3 flex items-end gap-2">
              <svg
                viewBox={`0 0 100 ${IL_H}`}
                className="h-24 w-auto"
                role="img"
                aria-label="מפת ישראל, עם סימון אזור השירות במרכז"
              >
                <path
                  d={
                    ISRAEL.map(([lat, lng], i) => {
                      const { x, y } = projectIL(lat, lng);
                      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
                    }).join(" ") + " Z"
                  }
                  fill="rgba(197,160,89,0.12)"
                  stroke="rgba(197,160,89,0.65)"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                {(() => {
                  const tl = projectIL(BOUNDS.latMax, BOUNDS.lngMin);
                  const br = projectIL(BOUNDS.latMin, BOUNDS.lngMax);
                  return (
                    <rect
                      x={tl.x}
                      y={tl.y}
                      width={br.x - tl.x}
                      height={br.y - tl.y}
                      fill="rgba(212,175,55,0.35)"
                      stroke="#D4AF37"
                      strokeWidth="1.2"
                    />
                  );
                })()}
              </svg>
              <p className="pb-1 text-[10px] leading-tight text-white/45">
                אזור השירות
                <br />
                מפה סכמטית
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
