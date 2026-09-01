import { PROCESS } from "@/lib/site";

export default function Process() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">פשוט, נקי, מהיר</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            מחזירים את הברק לרצפה - התהליך שלנו
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
            מהשיחה הראשונה ועד לקבלת משטח מבריק ומושלם - הפכנו את תהליך חידוש הרצפה לפשוט, שקוף וללא כאבי ראש. הנה איך זה עובד ב-4 צעדים קלים:
          </p>
        </div>

        <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-7">
          {PROCESS.map((step, i) => {
            const last = i === PROCESS.length - 1;
            return (
              <li key={step.title} className="text-center">
                <div className="relative flex justify-center">
                  {/* Dashed connector running toward the next step (leftward in RTL). */}
                  {!last ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-1/2 right-1/2 hidden w-[calc(100%+1.75rem)] -translate-y-1/2 md:block"
                    >
                      <span className="block border-t-2 border-dashed border-gold-soft/70" />
                      <span className="absolute left-0 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[5px] border-r-[8px] border-y-transparent border-r-gold-soft" />
                    </span>
                  ) : null}

                  <span className="relative z-10 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-white/85 text-2xl font-bold text-gold shadow-[0_8px_20px_rgba(0,0,0,0.06)] backdrop-blur-[8px]">
                    0{i + 1}
                  </span>
                </div>

                {/* Vertical connector for the stacked mobile layout. */}
                {!last ? (
                  <span
                    aria-hidden
                    className="mx-auto mt-5 block h-8 border-r-2 border-dashed border-gold-soft/70 md:hidden"
                  />
                ) : null}

                <h3 className="mt-6 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {step.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
