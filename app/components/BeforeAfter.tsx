"use client";

import { BEFORE_AFTER } from "@/lib/site";
import BeforeAfterTile from "./BeforeAfterTile";
import { CarouselControls, RAIL_CLASS, useCarousel } from "./carousel";
import SectionHeading from "./SectionHeading";

/**
 * Real jobs, the same floor a drag apart. A section of its own rather than
 * sharing the gallery's ground: the two read as one crowded block otherwise,
 * and the proof this carries earns the same weight every other section
 * gets.
 */
export default function BeforeAfter() {
  const { rail, atStart, atEnd, page, pages, step } = useCarousel(BEFORE_AFTER.length);

  return (
    <section className="bg-sand text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="לפני ואחרי"
          title="התוצאות מדברות בעד עצמן"
          description="גררו את הסמן על כל תמונה ותראו איך נראתה הרצפה לפני הטיפול ואיך היא נראית אחריו - הכל מעבודות שביצענו בפועל"
        />

        <ul ref={rail} className={`${RAIL_CLASS} mt-10`}>
          {BEFORE_AFTER.map((item) => (
            <li
              key={item.caption}
              className="w-[86%] flex-none snap-start sm:w-[47%] lg:w-[31%]"
            >
              <BeforeAfterTile {...item} />
            </li>
          ))}
        </ul>

        <CarouselControls
          className="mt-7"
          atStart={atStart}
          atEnd={atEnd}
          page={page}
          pages={pages}
          step={step}
          labels={{ back: "העבודה הקודמת", on: "העבודה הבאה", progress: "התקדמות בלפני ואחרי" }}
        />
      </div>
    </section>
  );
}
