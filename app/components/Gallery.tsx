"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_WA_MESSAGE, GALLERY, whatsappLink } from "@/lib/site";
import SectionHeading from "./SectionHeading";

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    const clamped = Math.max(0, Math.min(GALLERY.length - 1, i));
    setIndex(clamped);

    const card = track?.children[clamped] as HTMLElement | undefined;
    if (!track || !card) return;

    // Measure how far the card's leading edge sits from the track's, which
    // works out the same in both directions - scrollLeft runs negative here.
    const rtl = getComputedStyle(track).direction === "rtl";
    const t = track.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    const target = track.scrollLeft + (rtl ? c.right - t.right : c.left - t.left);

    // Jump outright when an animation cannot run: a hidden document never
    // fires rAF, which would otherwise strand snapping in the "off" state
    // it gets put into below.
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || document.hidden) {
      track.scrollLeft = target;
      return;
    }

    // Animate scrollLeft directly. scrollIntoView and scrollTo with
    // behavior:"smooth" both refuse to move this snap container, and
    // mandatory snapping yanks a running tween back, so it is lifted
    // for the duration.
    const start = track.scrollLeft;
    const change = target - start;
    if (Math.abs(change) < 1) return;

    const snap = track.style.scrollSnapType;
    track.style.scrollSnapType = "none";
    const t0 = performance.now();
    const duration = 420;

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      track.scrollLeft = start + change * eased;
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        track.style.scrollSnapType = snap;
      }
    };

    requestAnimationFrame(tick);
  }, []);

  // Keep the dots honest when the track is swiped or scrolled by hand.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const card = track.children[0] as HTMLElement | undefined;
        if (!card) return;
        const step = card.getBoundingClientRect().width + 16;
        setIndex(Math.round(Math.abs(track.scrollLeft) / step));
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1e1e1e] to-[#121212]">
      {/* Warm halo so the dark ground reads as lit rather than flat. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_70%_10%,rgba(197,160,89,0.16),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          dark
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
              className="group relative aspect-[4/5] w-[80%] shrink-0 snap-start overflow-hidden rounded-2xl border border-gold/25 sm:w-[48%] lg:w-[27%]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 48vw, 27vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />

              {/* Caption and magnifier surface only on hover. */}
              <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-400 group-hover:opacity-100">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-white/10 text-2xl font-light leading-none text-gold-soft">
                  +
                </span>
                <span className="px-4 text-center text-[15px] font-light tracking-wide text-gold-soft">
                  {item.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Controls. */}
        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            type="button"
            aria-label="התמונה הקודמת"
            onClick={() => goTo(index - 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-white/10 text-gold-soft backdrop-blur-md transition-colors hover:bg-gold hover:text-white"
          >
            →
          </button>

          <div className="flex items-center gap-2">
            {GALLERY.map((item, i) => (
              <button
                key={item.src + i}
                type="button"
                aria-label={`מעבר לתמונה ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-7 bg-gold" : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="התמונה הבאה"
            onClick={() => goTo(index + 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-white/10 text-gold-soft backdrop-blur-md transition-colors hover:bg-gold hover:text-white"
          >
            ←
          </button>
        </div>

        <div className="mt-8 text-center">
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-link inline-flex rounded-xl border border-gold/60 bg-white/[0.06] px-7 py-3.5 text-[15px] font-semibold text-gold-soft backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-white"
          >
            רוצים לראות עוד עבודות? דברו איתנו בוואטסאפ <span className="arrow">←</span>
          </a>
        </div>
      </div>
    </section>
  );
}
