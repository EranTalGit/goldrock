import Image from "next/image";
import {
  DEFAULT_WA_MESSAGE,
  PHONE_HREF,
  whatsappLink,
} from "@/lib/site";
import { PhoneIcon } from "./icons";

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
      {/* Darker at the top so the nav and headline read cleanly; lifted at the
          bottom so the polished floor keeps its reflection and shine. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/25" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/12 via-white/5 to-transparent" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-4 py-28 text-center sm:px-6">
        <p className="rise inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/40 px-5 py-2 text-[13px] font-medium text-white/90 backdrop-blur-sm sm:text-sm">
          <span className="text-gold-soft">★</span>
          שירות פוליש וליטוש פרימיום בגוש דן והמרכז
        </p>

        <p
          className="rise gold-metal mt-7 font-display text-6xl font-black leading-none tracking-tight sm:text-8xl lg:text-9xl"
          style={{ animationDelay: "80ms" }}
        >
          GOLDROCK
        </p>

        <p
          className="rise mt-3 font-display text-xl font-medium tracking-wide text-white sm:text-2xl"
          style={{ animationDelay: "140ms" }}
        >
          אומנות השחזור והליטוש
        </p>

        <h1
          className="rise mt-7 max-w-3xl font-display text-3xl font-bold leading-[1.2] text-white sm:text-5xl"
          style={{ animationDelay: "200ms" }}
        >
          מחזירים לרצפה את הברק, היוקרה והחיים
        </h1>

        <p
          className="rise mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
          style={{ animationDelay: "260ms" }}
        >
          חברת הפוליש והליטוש המובילה במרכז. מתמחים בהברקת רצפות, ליטוש שיש, חידוש אבן טבעית וטיפול בגרניט פורצלן. עבודה נקייה ללא אבק, בסטנדרט בלתי מתפשר ובאחריות מלאה.
        </p>

        <div
          className="rise mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "320ms" }}
        >
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold arrow-link rounded-2xl px-8 py-4 text-base sm:text-lg"
          >
            לקבלת הצעת מחיר בוואטסאפ <span className="arrow">←</span>
          </a>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-2xl border border-gold/60 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-gold/15 sm:text-lg"
          >
            <PhoneIcon width={19} height={19} />
            חייגו עכשיו
          </a>
        </div>
      </div>
    </section>
  );
}
