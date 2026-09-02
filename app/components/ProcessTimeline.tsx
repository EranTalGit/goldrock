import { PROCESS } from "@/lib/site";
import SectionHeading from "./SectionHeading";

/** Option A: a vertical spine of gold with a glass card at each step. */
export default function ProcessTimeline() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="פשוט, נקי, מהיר"
          title="מחזירים את הברק לרצפה - התהליך שלנו"
          description="מהשיחה הראשונה ועד לקבלת משטח מבריק ומושלם - הפכנו את תהליך חידוש הרצפה לפשוט, שקוף וללא כאבי ראש. הנה איך זה עובד ב-4 צעדים קלים:"
        />

        <ol className="relative mt-12">
          {/* Spine, tucked behind the markers. */}
          <span
            aria-hidden
            className="timeline-spine absolute bottom-8 top-4 right-6 w-px sm:right-8"
          />

          {PROCESS.map((step, i) => (
            <li key={step.title} className="relative pb-8 pe-0 ps-0 last:pb-0">
              <div className="flex items-start gap-5 sm:gap-7">
                <span className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-white text-sm font-bold text-gold shadow-[0_0_0_6px_var(--paper),0_6px_18px_rgba(197,160,89,0.3)] sm:h-16 sm:w-16 sm:text-base">
                  0{i + 1}
                </span>

                <article className="step-card flex-1 p-6 sm:p-7">
                  <span className="step-num">0{i + 1}</span>
                  <div className="relative">
                    <span className="inline-flex rounded-full border border-gold/30 bg-gold/[0.07] px-3.5 py-1.5 text-[12px] font-medium text-ink-soft">
                      {step.badge}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
                      {step.text}
                    </p>
                  </div>
                </article>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
