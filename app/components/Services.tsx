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

  return (
    <section id="services" className="bg-sand text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="השירותים שלנו"
          title="כל מה שהרצפה שלך צריכה כדי להבריק"
          description={
            <>
              מפוליש לשיש ועד חידוש מדרגות וניקיון אחרי שיפוץ. לכל שירות תהליך עבודה ברור, מחיר שקוף
              <br />
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
              {SERVICES[active].tag}
            </span>
            {/* No caption naming the service: the highlighted row already
                says which one is showing, and a light glass badge was
                unreadable over the brighter photographs. */}
          </div>
        </div>

        {/* Mobile: swipe through instead of scrolling six cards. */}
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:hidden">
          {SERVICES.map((service, i) => (
            <article
              key={service.slug}
              className="card-mirror w-[78vw] shrink-0 snap-center overflow-hidden"
            >
              <div className="relative aspect-video">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="78vw"
                  className="object-cover"
                />
                <span className="absolute right-3 top-3 rounded-full border border-gold/50 bg-black/55 px-3 py-1 text-[10px] font-medium tracking-[0.14em] text-gold-soft backdrop-blur-md">
                  {service.tag}
                </span>
              </div>
              <div className="relative p-5">
                <span className="font-display text-xs font-bold text-gold">0{i + 1}</span>
                <h3 className="mt-1 font-display text-lg font-bold">{service.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="arrow-link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold"
                >
                  לפרטים והצעת מחיר <span className="arrow">←</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
