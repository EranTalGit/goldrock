import { PROCESS } from "@/lib/site";
import SectionHeading from "./SectionHeading";

/** Option C: four cut-stone tiles joined by a travelling gold shimmer. */
export default function ProcessCrystal() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          label="פשוט, נקי, מהיר"
          title="מחזירים את הברק לרצפה - התהליך שלנו"
          description="מהשיחה הראשונה ועד לקבלת משטח מבריק ומושלם - הפכנו את תהליך חידוש הרצפה לפשוט, שקוף וללא כאבי ראש. הנה איך זה עובד ב-4 צעדים קלים:"
        />

        <div className="relative mt-12">
          {/* The flow line runs behind the tiles on wide screens. */}
          <span
            aria-hidden
            className="shimmer-line absolute right-[12%] left-[12%] top-9 hidden h-[2px] lg:block"
          />

          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {PROCESS.map((step, i) => (
              <li key={step.title} className="relative">
                <article className="crystal-card h-full p-6 pt-16 text-center">
                  <span className="step-num">0{i + 1}</span>

                  {/* Crystal tag holding the step index. */}
                  <span className="absolute right-1/2 top-4 z-10 inline-flex h-11 w-11 translate-x-1/2 items-center justify-center rounded-lg border border-gold/50 bg-gradient-to-br from-[#f6e9c4] to-[#c5a059] text-sm font-bold text-[#2a2118] shadow-[0_6px_16px_rgba(197,160,89,0.35)]">
                    0{i + 1}
                  </span>

                  <div className="relative">
                    <h3 className="font-display text-lg font-bold leading-snug text-ink">
                      {step.title}
                    </h3>
                    <div className="gold-line mx-auto mt-3 w-16" />
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      {step.text}
                    </p>
                    <span className="mt-4 inline-flex rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-1.5 text-[11.5px] font-medium text-ink-soft">
                      {step.badge}
                    </span>
                  </div>
                </article>

                {/* Arrow points along the flow: leftward on desktop, down on mobile. */}
                {i < PROCESS.length - 1 ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-5 right-1/2 z-10 translate-x-1/2 text-xl text-gold lg:-left-4 lg:bottom-auto lg:right-auto lg:top-9 lg:-translate-y-1/2 lg:translate-x-0"
                  >
                    <span className="lg:hidden">↓</span>
                    <span className="hidden lg:inline">←</span>
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
