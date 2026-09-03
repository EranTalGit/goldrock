"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SERVICES } from "@/lib/site";
import SectionHeading from "./SectionHeading";

/**
 * A menu of services on one side, a single large preview on the other
 * that crossfades as you move down the list. Six cards became six lines,
 * so the section reads rather than crowds.
 */
export default function Services() {
  const [active, setActive] = useState(0);

  // A phone can close every row, and the desktop preview still needs
  // something to caption; it falls back to the first service.
  const preview = SERVICES[active] ?? SERVICES[0];

  return (
    <section id="services" className="bg-sand text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="השירותים שלנו"
          title="כל מה שהרצפה שלך צריכה כדי להבריק"
          description={
            <>
              מפוליש לשיש ועד חידוש מדרגות וניקיון אחרי שיפוץ. לכל שירות תהליך עבודה ברור, מחיר שקוף
              {/* The break is for the desktop measure only; on a phone the
                  text already wraps and the break left a short orphan line. */}
              <br className="hidden sm:inline" />{" "}
              והצעת מחיר מהירה בוואטסאפ.
            </>
          }
        />

        {/* Desktop: split view. */}
        <div className="mt-10 hidden gap-10 lg:grid lg:grid-cols-[1fr_1.05fr]">
          <ul className="flex flex-col justify-center">
            {SERVICES.map((service, i) => {
              const on = i === active;
              return (
                <li key={service.slug}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={on}
                    className="w-full border-b border-gold/15 py-4 text-right transition-colors last:border-0"
                  >
                    <span className="flex items-center gap-4">
                      {/* Glow bar marks the active row on the leading edge. */}
                      <span
                        className={`h-8 w-[3px] rounded-full transition-all duration-300 ${
                          on
                            ? "bg-gold shadow-[0_0_10px_rgba(197,160,89,0.8)]"
                            : "bg-transparent"
                        }`}
                      />
                      <span
                        className={`font-display text-sm font-bold transition-colors ${
                          on ? "text-gold" : "text-ink/35"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display text-xl font-bold transition-colors duration-300 sm:text-2xl ${
                          on ? "text-[#C5A059]" : "text-ink/80"
                        }`}
                      >
                        {service.title}
                      </span>
                      {/* The tag lives on the preview instead: one at a
                          time reads as a caption, six read as clutter. */}
                    </span>

                    {/* Detail unfurls only for the active row. */}
                    <span
                      className={`grid transition-all duration-400 ${
                        on ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden ps-7">
                        <span className="block text-[17px] leading-relaxed text-ink-soft">
                          {service.detail}
                        </span>
                        <Link
                          href={`/services/${service.slug}`}
                          className="arrow-link mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-gold"
                        >
                          לפרטים והצעת מחיר <span className="arrow">←</span>
                        </Link>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative h-[520px] overflow-hidden rounded-2xl border border-gold/30 shadow-[0_20px_45px_rgba(0,0,0,0.12)]">
            {SERVICES.map((service, i) => (
              <Image
                key={service.slug}
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <span className="absolute right-5 top-5 rounded-full border border-gold/50 bg-black/55 px-4 py-1.5 text-[11px] font-medium tracking-[0.14em] text-gold-soft backdrop-blur-md">
              {preview.tag}
            </span>
            {/* No caption naming the service: the highlighted row already
                says which one is showing, and a light glass badge was
                unreadable over the brighter photographs. */}
          </div>
        </div>

        {/* Phone: the same list, read down instead of across. There is no
            room for a preview beside it, so the open row carries its own
            photograph - one service at a time, the way the split view
            shows one. */}
        <ul className="mt-8 lg:hidden">
          {SERVICES.map((service, i) => {
            const on = i === active;
            return (
              <li key={service.slug} className="border-b border-gold/15 last:border-0">
                <button
                  type="button"
                  onClick={() => setActive(on ? -1 : i)}
                  aria-expanded={on}
                  className="block w-full py-4 text-right"
                >
                  {on ? (
                    // The picture takes the starting edge and grows to
                    // whatever height the copy beside it needs, so the two
                    // columns end on the same line. It is a crop, not a
                    // letterbox: a long description makes a tall picture.
                    <span className="flex items-stretch gap-4">
                      <span className="relative w-[42%] shrink-0 overflow-hidden rounded-xl border border-gold/30 shadow-[0_10px_24px_rgba(0,0,0,0.1)]">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="42vw"
                          className="object-cover"
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-start gap-2">
                          <span className="mt-1 h-6 w-[3px] shrink-0 rounded-full bg-gold shadow-[0_0_10px_rgba(197,160,89,0.8)]" />
                          <span className="mt-0.5 font-display text-[13px] font-bold text-gold">
                            0{i + 1}
                          </span>
                          <span className="flex-1 font-display text-[17px] font-bold leading-snug text-[#C5A059]">
                            {service.title}
                          </span>
                          <span
                            aria-hidden
                            className="inline-flex h-7 w-7 shrink-0 rotate-45 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-base leading-none text-gold transition-transform duration-300"
                          >
                            +
                          </span>
                        </span>

                        <span className="mt-2.5 block text-[14px] leading-relaxed text-ink-soft">
                          {service.detail}
                        </span>
                      </span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <span className="h-7 w-[3px] shrink-0 rounded-full bg-transparent" />
                      <span className="font-display text-[13px] font-bold text-ink/35">
                        0{i + 1}
                      </span>
                      <span className="flex-1 font-display text-[17px] font-bold leading-snug text-ink/85">
                        {service.title}
                      </span>
                      <span
                        aria-hidden
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-base leading-none text-gold transition-transform duration-300"
                      >
                        +
                      </span>
                    </span>
                  )}
                </button>

                {/* Outside the button: a link cannot live inside one. It
                    runs under both columns, centred on the row. */}
                {on ? (
                  <div className="pb-5 text-center">
                    <Link
                      href={`/services/${service.slug}`}
                      className="arrow-link inline-flex items-center gap-1.5 text-[15px] font-semibold text-gold"
                    >
                      לפרטים והצעת מחיר <span className="arrow">←</span>
                    </Link>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
