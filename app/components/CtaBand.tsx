import Link from "next/link";
import { DEFAULT_WA_MESSAGE, PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "@/lib/site";

export default function CtaBand({
  title = "רוצים רצפה שמחזירה ברק?",
  text = "שולחים תמונה בוואטסאפ ומקבלים הצעת מחיר בלי התחייבות.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="border-y border-gold/15 bg-charcoal">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-3xl text-cream sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-xl text-muted">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold rounded-full px-6 py-3"
          >
            שיחה בוואטסאפ
          </a>
          <a href={PHONE_HREF} className="btn-ghost rounded-full px-6 py-3" dir="ltr">
            {PHONE_DISPLAY}
          </a>
          <Link href="/contact" className="btn-ghost rounded-full px-6 py-3">
            טופס קצר
          </Link>
        </div>
      </div>
    </section>
  );
}
