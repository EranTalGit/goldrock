"use client";

import Link from "next/link";
import { useState } from "react";
import { DEFAULT_WA_MESSAGE, PROCESS, whatsappLink } from "@/lib/site";
import SectionHeading from "./SectionHeading";

/** Option B: four tabs above one large panel that swaps as you pick. */
export default function ProcessTabs() {
  const [active, setActive] = useState(0);
  const step = PROCESS[active];

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="פשוט, נקי, מהיר"
          title="מחזירים את הברק לרצפה - התהליך שלנו"
          description="מהשיחה הראשונה ועד לקבלת משטח מבריק ומושלם - הפכנו את תהליך חידוש הרצפה לפשוט, שקוף וללא כאבי ראש. הנה איך זה עובד ב-4 צעדים קלים:"
        />

        {/* Scrolls rather than squeezes on a narrow screen. */}
        <div
          role="tablist"
          className="mt-10 flex snap-x gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible"
        >
          {PROCESS.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.title}
                role="tab"
                aria-selected={on}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`flex shrink-0 snap-start items-center gap-3 rounded-xl border px-4 py-3.5 text-right transition-all duration-300 md:shrink ${
                  on
                    ? "border-gold bg-[#161616] shadow-[0_10px_26px_rgba(0,0,0,0.25)]"
                    : "border-gold/20 bg-white/70 hover:border-gold/50"
                }`}
              >
                <span
                  className={`font-display text-lg font-bold ${
                    on ? "text-gold" : "text-ink/30"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`text-[14px] font-semibold leading-tight ${
                    on ? "text-gold-soft" : "text-ink-soft"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        <div
          key={active}
          className="step-card mt-5 grid gap-8 p-7 sm:p-9 md:grid-cols-[1.1fr_0.9fr] md:items-center"
          style={{ animation: "rise 0.45s ease both" }}
        >
          <div className="relative">
            <span className="inline-flex rounded-full border border-gold/30 bg-gold/[0.07] px-3.5 py-1.5 text-[12px] font-medium text-ink-soft">
              {step.badge}
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold leading-snug sm:text-3xl">
              {step.title}
            </h3>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{step.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {step.points.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/70 px-3.5 py-1.5 text-[13px] text-ink-soft"
                >
                  <span className="text-gold">✓</span>
                  {p}
                </li>
              ))}
            </ul>
            {step.cta.whatsapp ? (
              <a
                href={whatsappLink(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold arrow-link mt-6 inline-flex rounded-xl px-6 py-3.5 text-[15px]"
              >
                {step.cta.label} <span className="arrow">←</span>
              </a>
            ) : (
              <Link
                href={step.cta.href}
                className="btn-gold arrow-link mt-6 inline-flex rounded-xl px-6 py-3.5 text-[15px]"
              >
                {step.cta.label} <span className="arrow">←</span>
              </Link>
            )}
          </div>

          <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-[#1d1d1d] to-[#101010]">
            <span
              aria-hidden
              className="font-display text-[9rem] font-black leading-none text-gold/15"
            >
              0{active + 1}
            </span>
            <span className="absolute bottom-5 right-5 text-[13px] font-medium tracking-wide text-gold-soft">
              שלב {active + 1} מתוך {PROCESS.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
