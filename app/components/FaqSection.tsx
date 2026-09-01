import { GENERAL_FAQ } from "@/lib/site";
import SectionHeading from "./SectionHeading";

export default function FaqSection({
  items = GENERAL_FAQ,
}: {
  items?: { q: string; a: string }[];
}) {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading label="שאלות נפוצות" title="תשובות קצרות לפני שמתקשרים" />

        <div className="mt-9 space-y-4">
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
