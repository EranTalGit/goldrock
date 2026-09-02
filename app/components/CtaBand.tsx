import { DEFAULT_WA_MESSAGE, PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";

export default function CtaBand({
  title = "רוצים רצפה שמחזירה ברק?",
  text = "שולחים תמונה בוואטסאפ ומקבלים הצעת מחיר מיידית ללא התחייבות.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-[#FAF6F0]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="rounded-[20px] border border-[rgba(212,175,55,0.2)] bg-[#181818]/95 px-6 py-12 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-md sm:px-12 sm:py-14">
          {/* Side by side once there is room; stacked and centred before that. */}
          <div className="flex flex-col items-center gap-9 text-center min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between min-[900px]:gap-12 min-[900px]:text-right">
            <div>
              <h2 className="font-display text-2xl font-semibold leading-tight text-[#F5F5F5] sm:text-3xl">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#B3A89B] sm:text-base">
                {text}
              </p>
            </div>

            {/* Two routes only: message us, or call. */}
            <div className="flex w-full flex-col gap-3 min-[900px]:w-auto min-[900px]:flex-row min-[900px]:items-center">
              <a
                href={whatsappLink(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#D4AF37] px-7 py-4 font-bold text-white shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#e0bd4a] hover:shadow-[0_8px_28px_rgba(212,175,55,0.45)]"
              >
                <WhatsAppIcon width={20} height={20} />
                שיחה בוואטסאפ
              </a>

              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-[rgba(212,175,55,0.4)] bg-white/[0.05] px-7 py-4 font-semibold text-gold backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-white/[0.09]"
              >
                <PhoneIcon width={19} height={19} />
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
