"use client";

import Link from "next/link";
import { useState } from "react";
import { GENERAL_FAQ } from "@/lib/site";
import SectionHeading from "./SectionHeading";

export default function FaqSection({
  items = GENERAL_FAQ,
  moreHref,
}: {
  items?: { q: string; a: string }[];
  /** Shows a link on to the fuller list when given. */
  moreHref?: string;
}) {
  // Everything starts closed, and only one answer is open at a time.
  // Driven from state rather than the native toggle so the behaviour is
  // the same in every browser.
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading label="שאלות נפוצות" title="תשובות קצרות לפני שמתקשרים" />

        <div className="mt-9 space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <details
                key={item.q}
                open={isOpen}
                className={`group rounded-xl border bg-cream px-5 transition-all duration-300 ${
                  isOpen
                    ? "border-gold shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                    : "border-[#EAE5D9] shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 hover:border-gold/60"
                }`}
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(isOpen ? null : i);
                  }}
                  className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-[17px] font-bold text-ink marker:content-none"
                >
                  {item.q}
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-lg leading-none text-gold transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </summary>
                <p className="pb-4 text-[15px] leading-[1.7] text-ink-soft">{item.a}</p>
              </details>
            );
          })}
        </div>

        {moreHref ? (
          <div className="mt-8 text-center">
            <Link
              href={moreHref}
              className="arrow-link inline-flex items-center gap-2 text-[16px] font-semibold text-gold transition-colors hover:text-gold-soft"
            >
              לכל השאלות והתשובות המלאות <span className="arrow">←</span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
