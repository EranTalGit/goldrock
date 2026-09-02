"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "@/lib/testimonials";
import SectionHeading from "./SectionHeading";

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

function Arrow({ back }: { back?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      // The path points left. The button that goes back sits on the right
      // in RTL and has to point at the edge it travels toward, so it turns.
      className={back ? "rotate-180" : ""}
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export default function Testimonials() {
  const rail = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  // scrollLeft runs negative in a right-to-left container, so every read of
  // it goes through Math.abs and every comparison works off that distance.
  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const at = Math.abs(el.scrollLeft);
    setAtStart(at < 8);
    setAtEnd(at > max - 8);
    const per = Math.max(1, Math.round(el.clientWidth / (el.firstElementChild?.clientWidth || 1)));
    const total = Math.max(1, Math.ceil(TESTIMONIALS.length / per));
    setPages(total);
    setPage(max > 0 ? Math.round((at / max) * (total - 1)) : 0);
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });

    // How many fit across changes with the layout, not only with the window,
    // so watch the rail itself rather than waiting for a resize event.
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      el.removeEventListener("scroll", measure);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Smooth scrolling fights mandatory snapping and does not always finish,
  // so the position is animated by hand with the snapping lifted, the same
  // way the gallery does it. A hidden document has no frames to animate on,
  // and a reduced-motion preference asks for none, so both jump instead.
  const step = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;

    const rtl = getComputedStyle(el).direction === "rtl";
    const max = el.scrollWidth - el.clientWidth;
    // Distance travelled from the start edge, whichever edge that is.
    const at = Math.abs(el.scrollLeft);
    const travel = dir === -1 ? el.clientWidth : -el.clientWidth;
    const next = Math.min(max, Math.max(0, at + travel));
    const target = rtl ? -next : next;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || document.hidden) {
      el.scrollLeft = target;
      measure();
      return;
    }

    const start = el.scrollLeft;
    const change = target - start;
    if (Math.abs(change) < 1) return;

    const snap = el.style.scrollSnapType;
    el.style.scrollSnapType = "none";
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 420);
      el.scrollLeft = start + change * (1 - Math.pow(1 - p, 3));
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        el.style.scrollSnapType = snap;
        measure();
      }
    };
    requestAnimationFrame(tick);
  };

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-[50px] sm:px-6">
        <SectionHeading
          label="לקוחות מספרים"
          title="מה אומרים עלינו אחרי העבודה"
          description="ביקורות של לקוחות שטיפלנו ברצפה שלהם - בבתים פרטיים, בדירות ובבנייני מגורים ומשרדים ברחבי הארץ"
        />

        <div className="relative mt-12">
          <ul
            ref={rail}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((item) => (
              <li
                key={item.name + item.city}
                className="flex w-full flex-none snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <figure className="flex w-full flex-col rounded-[18px] border border-[rgba(212,175,55,0.3)] bg-white/90 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-[10px]">
                  <Stars />

                  <span className="mt-3 self-start rounded-[20px] bg-[#FAF6F0] px-2.5 py-1 text-[13px] font-semibold text-[#B8860B]">
                    {item.city} • {item.service}
                  </span>

                  <blockquote className="mt-4 flex-1 text-[15px] leading-[1.75] text-[#333333]">
                    {item.quote}
                  </blockquote>

                  <figcaption className="mt-5 border-t border-[rgba(212,175,55,0.2)] pt-4 font-display text-[1rem] font-bold text-[#1A1A1A]">
                    {item.name}
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
            className={`absolute -right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-white text-gold shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all hover:border-gold hover:bg-gold hover:text-white lg:flex ${
              atStart ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <Arrow back />
          </button>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="ביקורות נוספות"
            className={`absolute -left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-white text-gold shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all hover:border-gold hover:bg-gold hover:text-white lg:flex ${
              atEnd ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <Arrow />
          </button>
        </div>

        {/* Dots, for the phone where the arrows are hidden. */}
        <div className="mt-6 flex justify-center gap-2 lg:hidden">
          {Array.from({ length: pages }, (_, i) => (
            <span
              key={i}
              aria-hidden
              className={`h-2 rounded-full transition-all duration-300 ${
                i === page ? "w-6 bg-gold" : "w-2 bg-gold/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
