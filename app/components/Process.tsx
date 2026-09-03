"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS } from "@/lib/site";
import SectionHeading from "./SectionHeading";

/** Each step, then the line to the next one, staggered in that order. */
const STEP_MS = 650;
const LINE_OFFSET_MS = 320;
const ARROW_OFFSET_MS = 560;

export default function Process({
  steps = PROCESS,
  label = "פשוט, נקי, מהיר",
  title = "מחזירים את הברק לרצפה - התהליך שלנו",
  description = "מהשיחה הראשונה ועד לקבלת משטח מבריק ומושלם - הפכנו את תהליך חידוש הרצפה לפשוט, שקוף וללא כאבי ראש. הנה איך זה עובד ב-4 צעדים קלים:",
  cta,
}: {
  /** Defaults to the company's own process; a service passes its own steps. */
  steps?: { title: string; text: string }[];
  label?: string;
  title?: string;
  description?: string;
  /** An optional prompt below the steps, for pages with a long middle. */
  cta?: { label: string; href: string; external?: boolean };
} = {}) {
  const ref = useRef<HTMLOListElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const supported = typeof IntersectionObserver !== "undefined";

    let observer: IntersectionObserver | undefined;
    if (supported) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setStarted(true);
            observer?.disconnect();
          }
        },
        // Start just before the list reaches the viewport.
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
      );
      observer.observe(el);
    }

    // The steps are hidden until something reveals them, so a browser with
    // no observer to watch with gets them straight away. Where there is an
    // observer, waiting is the whole point: a timer running alongside it
    // fired while the section was still far below, and the reveal was over
    // before anyone scrolled to it.
    const failsafe = supported ? 0 : window.setTimeout(() => setStarted(true), 0);

    return () => {
      observer?.disconnect();
      if (failsafe) window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading label={label} title={title} description={description} />

        {/* A row of four on desktop; a rail of markers down the right with
            the copy beside them on a phone. */}
        <ol
          ref={ref}
          className={`mt-12 grid gap-0 md:grid-cols-4 md:gap-7 ${
            started ? "seq-run" : ""
          }`}
        >
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            const stepDelay = 120 + i * STEP_MS;
            // On a phone the marker sits on the centre line of its own heading
            // and text, and the connector is drawn from the marker's foot down
            // to the next one.
            return (
              <li
                key={step.title}
                className="group relative flex items-center pb-10 md:block md:items-stretch md:pb-0"
              >
                <div className="relative ms-5 me-5 flex shrink-0 justify-center md:mx-0">
                  {/* Connector toward the next step (leftward in RTL). */}
                  {!last ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-1/2 right-1/2 hidden w-[calc(100%+1.75rem)] -translate-y-1/2 md:block"
                    >
                      <span
                        className="seq seq-line block border-t-2 border-dashed border-gold-soft/70"
                        style={{ animationDelay: `${stepDelay + LINE_OFFSET_MS}ms` }}
                      />
                      {/* Arrowhead at the midpoint, on its own patch of
                          background so the dashes break cleanly around it. */}
                      <span
                        className="seq seq-fade absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-paper px-1.5"
                        style={{ animationDelay: `${stepDelay + ARROW_OFFSET_MS}ms` }}
                      >
                        <span className="h-0 w-0 border-y-[6px] border-r-[9px] border-y-transparent border-r-gold" />
                      </span>
                    </span>
                  ) : null}

                  <span
                    className="seq seq-step relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-white text-xl font-bold text-gold shadow-[0_8px_20px_rgba(0,0,0,0.06)] backdrop-blur-[8px] transition-[transform,box-shadow,border-color,background-color,color] duration-300 group-hover:-translate-y-1 group-hover:border-gold-soft group-hover:bg-white group-hover:text-gold-soft group-hover:shadow-[0_12px_28px_rgba(197,160,89,0.45)] md:h-20 md:bg-white/85 md:w-20 md:text-2xl"
                    style={{ animationDelay: `${stepDelay}ms` }}
                  >
                    0{i + 1}
                  </span>
                </div>

                {/* The phone rail. Rows are of unequal height and each marker
                    now sits on the middle of its own copy, so the gap between
                    two markers is never the same twice. Rather than measure
                    it, every row draws its own segment edge to edge and the
                    opaque marker covers the piece behind it - which makes one
                    continuous line down the column whatever the heights. */}
                {steps.length > 1 ? (
                  <span
                    aria-hidden
                    className={`absolute start-11 flex w-4 justify-center md:hidden ${
                      i === 0
                        ? "bottom-0 top-1/2"
                        : last
                          ? "bottom-1/2 top-0"
                          : "inset-y-0"
                    }`}
                  >
                    <span
                      className="seq seq-fade h-full w-0 border-r-2 border-dashed border-gold-soft/70"
                      style={{ animationDelay: `${stepDelay + LINE_OFFSET_MS}ms` }}
                    />
                    {/* Arrowhead low in the row, on its own patch of ground so
                        the dashes break cleanly around it. */}
                    {!last ? (
                      <span
                        className="seq seq-fade absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center justify-center bg-paper py-1.5"
                        style={{ animationDelay: `${stepDelay + ARROW_OFFSET_MS}ms` }}
                      >
                        <span className="h-0 w-0 border-x-[6px] border-t-[9px] border-x-transparent border-t-gold" />
                      </span>
                    ) : null}
                  </span>
                ) : null}

                {/* Copy sits beside the marker on a phone, beneath it above. */}
                <div className="flex-1 text-center">
                  <h3
                    className="seq seq-step text-pretty text-lg font-bold text-ink md:mt-6"
                    style={{ animationDelay: `${stepDelay + 120}ms` }}
                  >
                    {step.title}
                  </h3>
                  <p
                    // A step's text may carry its own newline, where the
                    // break belongs on a particular phrase rather than
                    // wherever the column happens to run out.
                    className="seq seq-step mt-3 whitespace-pre-line text-pretty text-[15px] leading-relaxed text-ink-soft"
                    style={{ animationDelay: `${stepDelay + 180}ms` }}
                  >
                    {step.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Keeps a way to act in the middle of a long page, not only at
            its two ends. */}
        {cta ? (
          <div className="mt-10 text-center">
            <a
              href={cta.href}
              {...(cta.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="btn-gold-metal arrow-link inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[1rem]"
            >
              {cta.label} <span className="arrow">←</span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
