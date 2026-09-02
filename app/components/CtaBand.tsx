import { DEFAULT_WA_MESSAGE, PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";

/**
 * Open and full width - no floating panel. A gold hairline top and
 * bottom is all that separates it from the sections either side.
 */
export default function CtaBand({
  title = "רוצים רצפה שמחזירה ברק?",
  text = "שולחים תמונה בוואטסאפ ומקבלים הצעת מחיר מיידית ללא התחייבות.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="border-y border-[rgba(212,175,55,0.25)] bg-[#F3ECE2]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-9 px-4 py-[60px] text-center sm:px-6 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between min-[900px]:gap-12 min-[900px]:text-right">
        <div>
          <h2 className="font-display text-[2.2rem] font-bold leading-tight text-[#1A1A1A]">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-[#666059]">
            {text}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 min-[900px]:w-auto min-[900px]:flex-row min-[900px]:items-center">
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#D4AF37] px-7 py-4 font-bold text-white shadow-[0_4px_18px_rgba(212,175,55,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#e0bd4a] hover:shadow-[0_8px_26px_rgba(212,175,55,0.42)]"
          >
            <WhatsAppIcon width={20} height={20} />
            שיחה בוואטסאפ
          </a>

          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-[#D4AF37] px-7 py-4 font-semibold text-[#2C2416] transition-all hover:-translate-y-0.5 hover:bg-[rgba(212,175,55,0.12)]"
          >
            <PhoneIcon width={19} height={19} />
            <span dir="ltr">{PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
