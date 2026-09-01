import Image from "next/image";
import Link from "next/link";
import {
  DEFAULT_WA_MESSAGE,
  PHONE_DISPLAY,
  PHONE_HREF,
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
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-obsidian/30" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-32 pt-40 sm:px-6 md:pb-24">
        <p className="rise text-xs font-semibold tracking-[0.32em] text-gold-soft">
          GOLDROCK | אומנות השחזור והליטוש
        </p>
        <h1
          className="rise mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.12] text-white sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          מחזירים לרצפה את הברק, היוקרה והחיים
        </h1>
        <p
          className="rise mt-6 max-w-2xl text-lg leading-relaxed text-white/85"
          style={{ animationDelay: "160ms" }}
        >
          פוליש, ליטוש וחידוש משטחי שיש, אבן ופורצלן בסטנדרט הבלתי מתפשר של גוש דן והמרכז. עבודה נקייה, יסודית ובאחריות מלאה.
        </p>
        <div className="rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold rounded-2xl px-7 py-4 text-base"
          >
            לקבלת הצעת מחיר בוואטסאפ ←
          </a>
          <a href={PHONE_HREF} className="btn-ghost rounded-2xl px-7 py-4" dir="ltr">
            {PHONE_DISPLAY}
          </a>
          <Link href="/services" className="btn-ghost rounded-2xl px-7 py-4">
            לכל השירותים
          </Link>
        </div>
      </div>
    </section>
  );
}
