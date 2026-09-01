import Link from "next/link";
import { DEFAULT_WA_MESSAGE, PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "@/lib/site";

export default function CtaBand({
  title = "רוצים רצפה שמחזירה ברק?",
  text = "שולחים תמונה בוואטסאפ ומקבלים הצעת מחיר מיידית ללא התחייבות.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-charcoal">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-20 sm:px-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/60">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold rounded-2xl px-7 py-4"
          >
            שיחה בוואטסאפ
          </a>
          <a href={PHONE_HREF} className="btn-ghost rounded-2xl px-7 py-4" dir="ltr">
            {PHONE_DISPLAY}
          </a>
          <Link href="/contact" className="btn-ghost rounded-2xl px-7 py-4">
            טופס קצר
          </Link>
        </div>
      </div>
    </section>
  );
}
