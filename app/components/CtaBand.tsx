import { DEFAULT_WA_MESSAGE, PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "@/lib/site";
import { PhoneIcon, ServiceIcon, WhatsAppIcon } from "./icons";

/**
 * Open and full width - no floating panel. A gold hairline top and
 * bottom is all that separates it from the sections either side.
 */
export default function CtaBand({
  title = "רוצים רצפה שמחזירה ברק?",
  text = "שולחים תמונה בוואטסאפ ומקבלים הצעת מחיר מיידית ללא התחייבות.",
  /** Word to gild in the heading. Ignored when the title lacks it. */
  highlight = "ברק?",
}: {
  title?: string;
  text?: string;
  highlight?: string;
}) {
  // Callers pass their own titles, so only split when the word is there.
  const at = highlight ? title.indexOf(highlight) : -1;
  const head =
    at === -1 ? (
      title
    ) : (
      <>
        {title.slice(0, at)}
        <span className="gold-metal">{highlight}</span>
        {title.slice(at + highlight.length)}
      </>
    );

  return (
    <section className="relative overflow-hidden border-y border-[rgba(212,175,55,0.25)] bg-[#F3ECE2]">
      {/* Warm light pooling behind the content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_75%_at_50%_50%,rgba(212,175,55,0.14),transparent_70%)]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-9 px-4 py-[60px] text-center sm:px-6 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between min-[900px]:gap-12 min-[900px]:text-right">
        <div>
          {/* A turning crystal with a smaller one keeping it company. */}
          <span
            aria-hidden
            className="mb-3 inline-flex items-start gap-1 text-gold min-[900px]:mb-2"
          >
            <span className="crystal-a inline-flex">
              <ServiceIcon name="sparkle" width={28} height={28} />
            </span>
            <span className="crystal-b inline-flex text-gold-soft">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2l1.9 6.6L20 12l-6.1 3.4L12 22l-1.9-6.6L4 12l6.1-3.4L12 2z" />
              </svg>
            </span>
          </span>
          <h2 className="font-display text-[2.2rem] font-bold leading-tight text-[#1A1A1A]">
            {head}
          </h2>
          <p className="mt-4 max-w-xl text-[1.05rem] font-normal leading-relaxed text-[#55504A]">
            {text}
          </p>
        </div>

        {/* Separates the ask from the answer, on wide screens only. */}
        <span
          aria-hidden
          className="hidden w-px self-stretch bg-[rgba(212,175,55,0.3)] min-[900px]:block"
        />

        <div className="flex w-full flex-col gap-3 min-[900px]:w-auto min-[900px]:flex-row min-[900px]:items-center">
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="pulse-gold inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#D4AF37] px-7 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#e0bd4a] hover:shadow-[0_8px_26px_rgba(212,175,55,0.5)]"
          >
            <WhatsAppIcon width={20} height={20} />
            שיחה בוואטסאפ
          </a>

          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl border-[1.5px] border-[#D4AF37] px-7 py-4 font-semibold text-[#2C2416] transition-all hover:-translate-y-0.5 hover:bg-[rgba(212,175,55,0.12)]"
          >
            <PhoneIcon width={19} height={19} />
            <span dir="ltr">{PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
