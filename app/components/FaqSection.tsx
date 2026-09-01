import { GENERAL_FAQ } from "@/lib/site";

export default function FaqSection({
  items = GENERAL_FAQ,
}: {
  items?: { q: string; a: string }[];
}) {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="text-center">
          <p className="eyebrow">שאלות נפוצות</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            תשובות קצרות לפני שמתקשרים
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {items.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="group rounded-xl border border-[#EAE5D9] bg-cream px-6 shadow-[0_4px_15px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 open:border-gold open:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-bold text-ink marker:content-none">
                {item.q}
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-xl leading-none text-gold transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-6 text-[15px] leading-[1.7] text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
