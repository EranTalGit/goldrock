"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DEFAULT_WA_MESSAGE, SERVICES, whatsappLink } from "@/lib/site";
import SectionHeading from "./SectionHeading";

/**
 * Option B: six wide bars, one open at a time. Opening reveals the copy
 * and the photograph side by side, so the section stays one column deep
 * instead of a six-card grid.
 */
export default function ServicesAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="bg-sand text-ink">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="התמחות באבן ושיש"
          title="כל מה שהרצפה שלך צריכה כדי להבריק"
        />

        <div className="mt-10 space-y-3">
          {SERVICES.map((service, i) => {
            const on = i === open;
            return (
              <article
                key={service.slug}
                className={`overflow-hidden rounded-2xl transition-all duration-400 ${
                  on
                    ? "border-[1.5px] border-gold bg-white shadow-[0_16px_40px_rgba(197,160,89,0.18)]"
                    : "border border-gold/25 bg-white/80 hover:border-gold/60"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(on ? -1 : i)}
                  aria-expanded={on}
                  className="flex w-full items-center gap-4 px-5 py-5 text-right sm:px-7"
                >
                  <span
                    className={`font-display text-2xl font-bold transition-colors ${
                      on ? "text-gold" : "text-ink/30"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold leading-snug sm:text-xl">
                    {service.title}
                  </h3>
                  <span className="me-auto flex items-center gap-3">
                    <span className="hidden rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-1 text-[11px] font-medium text-ink-soft sm:inline">
                      {service.tag}
                    </span>
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-xl leading-none text-gold transition-transform duration-400 ${
                        on ? "rotate-45 bg-gold/10" : ""
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>

                {/* 0fr to 1fr animates height without hard-coding one. */}
                <div
                  className={`grid transition-all duration-400 ease-in-out ${
                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 px-5 pb-6 sm:px-7 md:grid-cols-2 md:items-center">
                      <div>
                        <p className="text-[15px] leading-relaxed text-ink-soft">
                          {service.description}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {service.benefits.slice(0, 3).map((b) => (
                            <li key={b} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                              <span className="mt-0.5 text-gold">✓</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={whatsappLink(DEFAULT_WA_MESSAGE)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gold arrow-link mt-5 inline-flex rounded-xl px-5 py-3 text-sm"
                        >
                          להצעת מחיר מהירה בוואטסאפ <span className="arrow">←</span>
                        </a>
                        <Link
                          href={`/services/${service.slug}`}
                          className="mt-3 block text-sm font-semibold text-gold"
                        >
                          לדף השירות המלא
                        </Link>
                      </div>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gold/30 shadow-[0_10px_28px_rgba(0,0,0,0.12)]">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
