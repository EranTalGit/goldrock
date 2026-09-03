"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The snapping rail shared by the review and article bands.
 *
 * Two things it has to get right. A right-to-left container reports
 * scrollLeft as a negative number, so every read goes through Math.abs and
 * the sign is put back only when writing. And smooth scrolling fights
 * mandatory snapping and does not reliably finish, so a step is animated by
 * hand with the snapping lifted - the same fix the gallery carries.
 */
export function useCarousel(count: number) {
  const rail = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const at = Math.abs(el.scrollLeft);
    setAtStart(at < 8);
    setAtEnd(at > max - 8);
    const per = Math.max(
      1,
      Math.round(el.clientWidth / (el.firstElementChild?.clientWidth || 1)),
    );
    const total = Math.max(1, Math.ceil(count / per));
    setPages(total);
    setPage(max > 0 ? Math.round((at / max) * (total - 1)) : 0);
  }, [count]);

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

  /** 1 goes back toward the start, -1 goes on. */
  const step = useCallback(
    (dir: 1 | -1) => {
      const el = rail.current;
      if (!el) return;

      const rtl = getComputedStyle(el).direction === "rtl";
      const max = el.scrollWidth - el.clientWidth;
      const at = Math.abs(el.scrollLeft);
      const travel = dir === -1 ? el.clientWidth : -el.clientWidth;
      const next = Math.min(max, Math.max(0, at + travel));
      const target = rtl ? -next : next;

      const reduced = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
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
    },
    [measure],
  );

  return { rail, atStart, atEnd, page, pages, step };
}

/** The class every rail shares: snapping, no visible scrollbar. */
export const RAIL_CLASS =
  "flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const ARROW =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-white text-lg leading-none text-gold transition-all hover:border-gold hover:bg-gold hover:text-white";

/** Arrows either side of a progress bar, for below the rail. */
export function CarouselControls({
  atStart,
  atEnd,
  page,
  pages,
  step,
  className = "",
  labels,
}: {
  atStart: boolean;
  atEnd: boolean;
  page: number;
  pages: number;
  step: (dir: 1 | -1) => void;
  className?: string;
  labels: { back: string; on: string; progress: string };
}) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label={labels.back}
        className={`${ARROW} ${atStart ? "pointer-events-none opacity-30" : "opacity-100"}`}
      >
        <span aria-hidden>&rarr;</span>
      </button>

      <div
        className="h-1.5 w-28 overflow-hidden rounded-full bg-ink/15"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={pages}
        aria-valuenow={page + 1}
        aria-label={labels.progress}
      >
        <div
          className="h-full rounded-full bg-gold transition-[width] duration-300"
          style={{ width: `${((page + 1) / pages) * 100}%` }}
        />
      </div>

      <span className="shrink-0 text-[13px] font-semibold tabular-nums text-ink-soft">
        {page + 1}/{pages}
      </span>

      <button
        type="button"
        onClick={() => step(-1)}
        aria-label={labels.on}
        className={`${ARROW} ${atEnd ? "pointer-events-none opacity-30" : "opacity-100"}`}
      >
        <span aria-hidden>&larr;</span>
      </button>
    </div>
  );
}
