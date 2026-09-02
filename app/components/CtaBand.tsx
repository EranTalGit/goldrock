import Link from "next/link";
import { DEFAULT_WA_MESSAGE, PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";

export default function CtaBand({
  title = "רוצים רצפה שמחזירה ברק?",
  text = "שולחים תמונה בוואטסאפ ומקבלים הצעת מחיר מיידית ללא התחייבות.",
  /** Where the short-form button goes; the homepage points at its own form. */
  formHref = "/contact",
}: {
  title?: string;
  text?: string;
  formHref?: string;
}) {
  return (
    <section className="bg-[#FAF6F0]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="rounded-2xl bg-[#1A1A1A] px-6 py-9 shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:px-10 sm:py-10">
          {/* Stacks and centres below 900px, side by side above it. */}
          <div className="flex flex-col items-center gap-8 text-center min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between min-[900px]:text-right">
            <div>
              <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                {title}
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#A0A0A0] sm:text-base">
                {text}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 min-[900px]:w-auto min-[900px]:flex-row min-[900px]:items-center">
              <a
                href={whatsappLink(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3.5 font-bold text-white shadow-[0_8px_24px_rgba(212,175,55,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#e0bd4a] hover:shadow-[0_12px_30px_rgba(212,175,55,0.5)]"
              >
                <WhatsAppIcon width={19} height={19} />
                שיחה בוואטסאפ
              </a>

              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold/55 px-6 py-3.5 font-semibold text-gold transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
              >
                <PhoneIcon width={18} height={18} />
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>

              <Link
                href={formHref}
                className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-[#2A2A2A] px-6 py-3.5 font-medium text-white/85 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
              >
                טופס קצר
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
