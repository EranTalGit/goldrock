import Image from "next/image";
import Link from "next/link";
import {
  BUSINESS_NAME,
  DEFAULT_WA_MESSAGE,
  PHONE_DISPLAY,
  PHONE_HREF,
  REGION_LABEL,
  whatsappLink,
} from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src="/assets/hero.webp"
        alt="רצפת שיש קרם מבריקה בסלון יוקרתי אחרי פוליש והברקה"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/35" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-28 pt-36 sm:px-6 md:pb-20">
        <p className="rise text-xs tracking-[0.32em] text-gold">
          {BUSINESS_NAME} · {REGION_LABEL}
        </p>
        <h1 className="rise mt-4 max-w-3xl font-display text-4xl leading-[1.15] text-cream sm:text-6xl" style={{ animationDelay: "80ms" }}>
          פוליש לשיש שמחזיר לרצפה את הברק
        </h1>
        <p className="rise mt-5 max-w-xl text-lg leading-relaxed text-cream/80" style={{ animationDelay: "160ms" }}>
          ליטוש, הברקה וחידוש מדרגות בגוש דן. עבודה נקייה, אחריות מלאה, והצעת מחיר לפי תמונה בוואטסאפ.
        </p>
        <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
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
          <Link href="/services" className="btn-ghost rounded-full px-6 py-3">
            לכל השירותים
          </Link>
        </div>
      </div>
    </section>
  );
}
