"use client";

import { TESTIMONIALS } from "@/lib/testimonials";
import SectionHeading from "./SectionHeading";
import { CarouselControls, RAIL_CLASS, useCarousel } from "./carousel";

/** Five gold stars, drawn once and repeated. */
function Stars() {
  return (
    <span
      className="flex gap-0.5 text-gold"
      role="img"
      aria-label="דירוג חמישה כוכבים"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

const SIDE_ARROW =
  "absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-white text-lg leading-none text-gold shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all hover:border-gold hover:bg-gold hover:text-white lg:flex";

export default function Testimonials() {
  const { rail, atStart, atEnd, page, pages, step } = useCarousel(
    TESTIMONIALS.length,
  );

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-[50px] sm:px-6">
        <SectionHeading
          label="לקוחות מספרים"
          title="מה אומרים עלינו אחרי העבודה"
          description="ביקורות של לקוחות שטיפלנו ברצפה שלהם - בבתים פרטיים, בדירות ובבנייני מגורים ומשרדים ברחבי הארץ"
        />

        <div className="relative mt-12">
          <ul ref={rail} className={RAIL_CLASS}>
            {TESTIMONIALS.map((item) => (
              <li
                key={item.name + item.city}
                className="flex w-full flex-none snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <figure className="flex w-full flex-col rounded-[18px] border border-[rgba(212,175,55,0.3)] bg-white/90 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-[10px]">
                  <Stars />

                  <span
                    aria-hidden
                    className="mt-10 font-display text-[2.6rem] leading-[0.4] text-[#DDD6C9]"
                  >
                    &rdquo;
                  </span>

                  <blockquote className="mt-0.5 flex-1 text-[15px] leading-[1.75] text-[#333333]">
                    {item.quote}
                  </blockquote>

                  <figcaption className="mt-5 flex items-center gap-3 border-t border-[rgba(212,175,55,0.2)] pt-4">
                    {/* The customer's initial, in place of a photograph. */}
                    <span
                      aria-hidden
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,#CBA55C,#A37F34)] font-display text-[1.15rem] font-bold text-white shadow-[0_6px_16px_-8px_rgba(163,127,52,0.9)]"
                    >
                      {item.name.trim().charAt(0)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[1rem] font-bold text-[#1A1A1A]">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-[#7A736A]">
                        {item.service}, {item.city}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          {/* An arrow disappears at the end it can no longer travel toward. */}
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="ביקורות קודמות"
            className={`${SIDE_ARROW} -right-2 ${
              atStart ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <span aria-hidden>&rarr;</span>
          </button>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="ביקורות נוספות"
            className={`${SIDE_ARROW} -left-2 ${
              atEnd ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <span aria-hidden>&larr;</span>
          </button>
        </div>

        <CarouselControls
          className="mt-7 lg:hidden"
          atStart={atStart}
          atEnd={atEnd}
          page={page}
          pages={pages}
          step={step}
          labels={{
            back: "ביקורות קודמות",
            on: "ביקורות נוספות",
            progress: "התקדמות בביקורות",
          }}
        />
      </div>
    </section>
  );
}
