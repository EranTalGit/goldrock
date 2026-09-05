"use client";

import { useState } from "react";
import { BENEFITS } from "@/lib/site";
import { ServiceIcon } from "../../components/icons";

/**
 * Four ways to show the four reasons on a phone, none of them a carousel.
 * A page to look at and choose from, not part of the site: it is linked
 * from nowhere and asks not to be indexed.
 *
 * Each option is built from the same data the home page uses, so what is
 * on screen here is what would ship.
 */

function Label({
  num,
  name,
  note,
}: {
  num: string;
  name: string;
  note: string;
}) {
  return (
    <div className="mb-6 border-b border-gold/25 pb-4">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-gold">
        אפשרות {num}
      </p>
      <h2 className="mt-1.5 font-display text-[1.35rem] font-bold text-ink">
        {name}
      </h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{note}</p>
    </div>
  );
}

/* 1. Rows, no boxes at all: a big gold numeral, a hairline between each. */
function Ledger() {
  return (
    <ul>
      {BENEFITS.map((benefit, i) => (
        <li
          key={benefit.title}
          className="relative border-b border-gold/20 py-5 last:border-0"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-1 left-0 font-display text-[4rem] font-black leading-none text-gold/10"
          >
            0{i + 1}
          </span>
          <div className="relative flex items-center gap-3">
            <span className="text-gold">
              <ServiceIcon name={benefit.icon} width={20} height={20} />
            </span>
            <h3 className="font-display text-[17px] font-bold leading-snug text-ink">
              {benefit.title}
            </h3>
          </div>
          <p className="relative mt-2 text-[14px] leading-relaxed text-ink-soft">
            {benefit.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

/* 2. One wide tile, then three narrow ones - a rhythm, not a grid. */
function Bento() {
  const [lead, ...rest] = BENEFITS;
  return (
    <div className="space-y-3">
      <article className="card-mirror p-5">
        <span className="mirror-tile relative inline-flex h-12 w-12 items-center justify-center rounded-2xl text-gold">
          <ServiceIcon name={lead.icon} width={24} height={24} />
        </span>
        <h3 className="relative mt-3 font-display text-[18px] font-bold text-ink">
          {lead.title}
        </h3>
        <p className="relative mt-2 text-[14px] leading-relaxed text-ink-soft">
          {lead.text}
        </p>
      </article>

      <div className="grid grid-cols-3 gap-3">
        {rest.map((benefit) => (
          <article
            key={benefit.title}
            className="card-mirror flex flex-col items-center p-3 text-center"
          >
            <span className="mirror-tile relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-gold">
              <ServiceIcon name={benefit.icon} width={20} height={20} />
            </span>
            <h3 className="relative mt-2.5 font-display text-[13px] font-bold leading-tight text-ink">
              {benefit.title}
            </h3>
          </article>
        ))}
      </div>
    </div>
  );
}

/* 3. Four icons on one line, one panel underneath - the whole section
      fits a screen and the visitor picks what to read. */
function Tabs() {
  const [on, setOn] = useState(0);
  const current = BENEFITS[on];

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {BENEFITS.map((benefit, i) => (
          <button
            key={benefit.title}
            type="button"
            onClick={() => setOn(i)}
            aria-pressed={i === on}
            aria-label={benefit.title}
            className={`flex flex-col items-center gap-1.5 rounded-2xl border px-1 py-3 transition-all ${
              i === on
                ? "border-gold bg-gold/10 text-gold shadow-[0_6px_18px_rgba(212,175,55,0.22)]"
                : "border-gold/25 bg-white/70 text-ink/45"
            }`}
          >
            <ServiceIcon name={benefit.icon} width={22} height={22} />
            <span className="text-[10px] font-bold leading-tight">
              0{i + 1}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-gold/25 bg-white/80 p-5 text-center">
        <h3 className="font-display text-[17px] font-bold text-ink">
          {current.title}
        </h3>
        <div className="gold-line mx-auto mt-3 w-20" />
        <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
          {current.text}
        </p>
      </div>
    </div>
  );
}

/* 4. A deck: the four sit one on top of the other and a tap deals the
      next one to the front. No swiping, no dots. */
function Deck() {
  const [front, setFront] = useState(0);

  return (
    <div>
      <div className="relative h-[260px]">
        {BENEFITS.map((benefit, i) => {
          const place = (i - front + BENEFITS.length) % BENEFITS.length;
          return (
            <button
              key={benefit.title}
              type="button"
              onClick={() => setFront((f) => (f + 1) % BENEFITS.length)}
              style={{
                zIndex: BENEFITS.length - place,
                transform: `translateY(${place * 12}px) scale(${1 - place * 0.04})`,
                opacity: place > 2 ? 0 : 1,
              }}
              className="card-mirror absolute inset-x-0 top-0 flex h-[220px] flex-col items-center justify-center p-6 text-center transition-all duration-400"
            >
              <span className="mirror-tile relative inline-flex h-12 w-12 items-center justify-center rounded-2xl text-gold">
                <ServiceIcon name={benefit.icon} width={24} height={24} />
              </span>
              <h3 className="relative mt-3 font-display text-[17px] font-bold text-ink">
                {benefit.title}
              </h3>
              <p className="relative mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-ink-soft">
                {benefit.text}
              </p>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[13px] text-ink-soft">
        נגיעה בקלף מעבירה לבא אחריו · {front + 1} מתוך {BENEFITS.length}
      </p>
    </div>
  );
}

export default function WhyUsPreview() {
  return (
    <main className="bg-paper text-ink">
      <div className="mx-auto max-w-md px-4 pb-32 pt-28">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-gold">
          דף בחינה
        </p>
        <h1 className="mt-2 font-display text-[1.6rem] font-bold leading-snug text-ink">
          למה לבחור בנו - ארבע דרכים להציג
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
          אף אחת מהן אינה קרוסלה. כל אחת בנויה מאותם ארבעה תכנים של דף
          הבית, כך שמה שנראה כאן הוא מה שייצא לאוויר. הדף בנוי לטלפון -
          כדאי לפתוח אותו שם
        </p>

        <section className="mt-12">
          <Label
            num="1"
            name="שורות פנקס"
            note="בלי קופסאות בכלל. מספר זהב גדול ברקע, קו דק בין אחד לשני. הכי קל לסריקה מהירה, והכי קצר בגובה"
          />
          <Ledger />
        </section>

        <section className="mt-16">
          <Label
            num="2"
            name="בנטו"
            note="הראשון רחב ומלא, שלושת האחרים צרים עם כותרת בלבד. שובר את הסימטריה של 2 על 2 - אבל שלושה מהם מאבדים את הטקסט"
          />
          <Bento />
        </section>

        <section className="mt-16">
          <Label
            num="3"
            name="לשוניות אייקונים"
            note="ארבעה אייקונים בשורה, פאנל אחד מתחת. כל המקטע נכנס למסך אחד בלי גלילה, והמבקר בוחר מה לקרוא"
          />
          <Tabs />
        </section>

        <section className="mt-16">
          <Label
            num="4"
            name="חפיסת קלפים"
            note="הארבעה מונחים אחד על השני. נגיעה מעבירה לקלף הבא - בלי גרירה ובלי נקודות. הכי משחקי, אבל מסתיר שלושה מתוך ארבעה"
          />
          <Deck />
        </section>

        <p className="mt-16 border-t border-gold/25 pt-6 text-[13px] leading-relaxed text-ink-soft">
          ההמלצה שלי: מספר 1. הוא היחיד שמראה את כל ארבעת התכנים בבת אחת
          בלי להסתיר כלום ובלי לבקש נגיעה, והוא נמוך יותר מהגריד הנוכחי של
          2 על 2. מספר 3 הוא השני בתור אם חשוב שהמקטע ייקח מסך אחד בלבד
        </p>
      </div>
    </main>
  );
}
