"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_WA_MESSAGE, GALLERY, whatsappLink } from "@/lib/site";
import SectionHeading from "./SectionHeading";

const GAP = 16;

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [pages, setPages] = useState(1);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /** How far the track can actually travel, in whole cards. */
  const measure = useCallback((track: HTMLDivElement) => {
    const card = track.children[0] as HTMLElement | undefined;
    if (!card) return { step: 1, maxIndex: 0, maxScroll: 0 };
    const step = card.getBoundingClientRect().width + GAP;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    // The last cards are already on screen, so the final position is not
    // the last card - it is wherever the track runs out of travel.
    const maxIndex = Math.max(0, Math.ceil(maxScroll / step));
    return { step, maxIndex, maxScroll };
  }, []);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { step, maxIndex, maxScroll } = measure(track);
    const pos = Math.abs(track.scrollLeft);
    const ended = pos >= maxScroll - 2;
    setPages(maxIndex + 1);
    // At the far end the travel runs out mid-card, so pin the last dot
    // rather than letting the rounding leave it one short.
    setIndex(ended ? maxIndex : Math.min(maxIndex, Math.round(pos / step)));
    setAtStart(pos <= 2);
    setAtEnd(ended);
  }, [measure]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    sync();

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
      cancelAnimationFrame(frame);
    };
  }, [sync]);

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;

      const { step, maxIndex, maxScroll } = measure(track);
      const clamped = Math.max(0, Math.min(maxIndex, i));
      const rtl = getComputedStyle(track).direction === "rtl";
      // Never ask for more travel than the track has.
      const distance = Math.min(clamped * step, maxScroll);
      const target = rtl ? -distance : distance;

      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced || document.hidden) {
        track.scrollLeft = target;
        sync();
        return;
      }

      // Animate scrollLeft directly, lifting mandatory snapping for the
      // duration so it cannot yank the tween back.
      const start = track.scrollLeft;
      const change = target - start;
      if (Math.abs(change) < 1) return;

      const snap = track.style.scrollSnapType;
      track.style.scrollSnapType = "none";
      const t0 = performance.now();

      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / 420);
        track.scrollLeft = start + change * (1 - Math.pow(1 - p, 3));
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          track.style.scrollSnapType = snap;
          sync();
        }
      };

      requestAnimationFrame(tick);
    },
    [measure, sync]
  );

  return (
    <section className="relative overflow-hidden bg-sand text-ink">
      {/* Warm halo so the cloud of images has some depth behind it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_70%_10%,rgba(197,160,89,0.14),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="גלריה"
          title="אומנות הברק והאבן"
          description="הנה חלק מהתוצאות שאנחנו מייצרים עבור הלקוחות שלנו במרכז"
        />

        {/* 3.5 cards wide, so the cut fourth shows there is more. */}
        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {GALLERY.map((item, i) => (
            <figure
              key={item.src + i}
              className="group relative aspect-[4/5] w-[80%] shrink-0 snap-start overflow-hidden rounded-2xl border border-gold/25 shadow-[0_12px_30px_rgba(0,0,0,0.08)] sm:w-[48%] lg:w-[27%]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 48vw, 27vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />

              {/* Caption and magnifier surface only on hover. The label
                  carries its own dark backing, so it stays readable over
                  the brighter photographs rather than sinking into them. */}
              <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/55 opacity-0 backdrop-blur-[3px] transition-opacity duration-400 group-hover:opacity-100">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-black/40 text-2xl font-light leading-none text-gold-soft backdrop-blur-sm">
                  +
                </span>
                <span className="mx-4 rounded-full border border-gold/40 bg-black/60 px-4 py-2 text-center text-[14px] font-medium tracking-wide text-gold-soft backdrop-blur-md">
                  {item.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Controls. An arrow disappears once its direction is spent. */}
        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            type="button"
            aria-label="התמונה הקודמת"
            onClick={() => goTo(index - 1)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-white/70 text-gold backdrop-blur-md transition-all hover:bg-gold hover:text-white ${
              atStart ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            →
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`מעבר לתמונה ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-7 bg-gold" : "w-1.5 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="התמונה הבאה"
            onClick={() => goTo(index + 1)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-white/70 text-gold backdrop-blur-md transition-all hover:bg-gold hover:text-white ${
              atEnd ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            ←
          </button>
        </div>

        <div className="mt-8 text-center">
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold arrow-link inline-flex rounded-xl px-7 py-3.5 text-[15px]"
          >
            רוצים לראות עוד עבודות? דברו איתנו בוואטסאפ <span className="arrow">←</span>
          </a>
        </div>
      </div>
    </section>
  );
}
