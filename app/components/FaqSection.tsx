import { GENERAL_FAQ } from "@/lib/site";

export default function FaqSection({
  items = GENERAL_FAQ,
}: {
  items?: { q: string; a: string }[];
}) {
  return (
    <section className="bg-obsidian">
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32">
        <p className="eyebrow">שאלות נפוצות</p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          תשובות קצרות לפני שמתקשרים
        </h2>
        <div className="mt-12 space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] px-6 transition-colors open:border-gold/30 hover:border-white/20"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-semibold text-white marker:content-none">
                {item.q}
                <span className="shrink-0 text-xl leading-none text-gold transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-5 leading-relaxed text-white/60">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
