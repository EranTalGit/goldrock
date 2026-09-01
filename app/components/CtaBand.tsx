import Link from "next/link";
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
    <section className="bg-sand">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="rounded-2xl border border-gold/30 bg-gradient-to-b from-[#1c1c1c] to-[#141414] px-6 py-10 shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:px-12 sm:py-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                {title}
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60 sm:text-base">
                {text}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappLink(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 rounded-xl px-6 py-3.5"
              >
                <WhatsAppIcon width={19} height={19} />
                שיחה בוואטסאפ
              </a>
              <a
                href={PHONE_HREF}
                className="btn-gold-outline inline-flex items-center gap-2 rounded-xl px-6 py-3.5"
              >
                <PhoneIcon width={18} height={18} />
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 font-medium text-white/85 transition-colors hover:border-gold/50 hover:text-white"
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
