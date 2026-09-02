"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS } from "@/lib/site";
import SectionHeading from "./SectionHeading";

/** Each step, then the line to the next one, staggered in that order. */
const STEP_MS = 650;
const LINE_OFFSET_MS = 320;
const ARROW_OFFSET_MS = 560;

export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Nothing to observe against if the API is missing - just show it.
    if (typeof IntersectionObserver === "undefined") {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      // Start just before the list reaches the viewport.
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);

    // The steps are hidden until this runs, so never let a missed
    // observation leave them invisible.
    const failsafe = window.setTimeout(() => setStarted(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="פשוט, נקי, מהיר"
          title="מחזירים את הברק לרצפה - התהליך שלנו"
          description="מהשיחה הראשונה ועד לקבלת משטח מבריק ומושלם - הפכנו את תהליך חידוש הרצפה לפשוט, שקוף וללא כאבי ראש. הנה איך זה עובד ב-4 צעדים קלים:"
        />

        {/* A row of four on desktop; a rail of markers down the right with
            the copy beside them on a phone. */}
        <ol
          ref={ref}
          className={`mt-12 grid gap-0 md:grid-cols-4 md:gap-7 ${
            started ? "seq-run" : ""
          }`}
        >
          {PROCESS.map((step, i) => {
            const last = i === PROCESS.length - 1;
            const stepDelay = 120 + i * STEP_MS;
            return (
              <li key={step.title} className="group flex items-stretch gap-5 md:block">
                {/* Marker rail. */}
                <div className="flex flex-col items-center md:block">
                  <div className="relative flex justify-center">
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
                      className="seq seq-step relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-white/85 text-xl font-bold text-gold shadow-[0_8px_20px_rgba(0,0,0,0.06)] backdrop-blur-[8px] transition-[transform,box-shadow,border-color,background-color,color] duration-300 group-hover:-translate-y-1 group-hover:border-gold-soft group-hover:bg-white group-hover:text-gold-soft group-hover:shadow-[0_12px_28px_rgba(197,160,89,0.45)] md:h-20 md:w-20 md:text-2xl"
                      style={{ animationDelay: `${stepDelay}ms` }}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  {/* Rail running down to the next marker. */}
                  {!last ? (
                    <span
                      aria-hidden
                      className="seq seq-fade my-2 w-0 flex-1 border-r-2 border-dashed border-gold-soft/70 md:hidden"
                      style={{ animationDelay: `${stepDelay + LINE_OFFSET_MS}ms` }}
                    />
                  ) : null}
                </div>

                {/* Copy sits beside the marker on a phone, beneath it above. */}
                <div className="flex-1 pb-10 text-right md:pb-0 md:text-center">
                  <h3
                    className="seq seq-step text-pretty text-lg font-bold text-ink md:mt-6"
                    style={{ animationDelay: `${stepDelay + 120}ms` }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="seq seq-step mt-3 text-pretty text-[15px] leading-relaxed text-ink-soft"
                    style={{ animationDelay: `${stepDelay + 180}ms` }}
                  >
                    {step.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
