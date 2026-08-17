import { GENERAL_FAQ } from "@/lib/site";

export default function FaqSection({
  items = GENERAL_FAQ,
}: {
  items?: { q: string; a: string }[];
}) {
  return (
    <section className="bg-obsidian">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-xs tracking-[0.28em] text-gold">שאלות נפוצות</p>
        <h2 className="mt-3 font-display text-4xl text-cream">תשובות קצרות לפני שמתקשרים</h2>
        <div className="mt-10 divide-y divide-gold/15">
          {items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="cursor-pointer list-none font-display text-xl text-cream marker:content-none">
                {item.q}
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
