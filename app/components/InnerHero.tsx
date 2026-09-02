import Image from "next/image";

/**
 * Light textured hero for the inner pages. A marble photograph carries the
 * texture; a cream wash over it keeps the type fully legible.
 *
 * Every page uses the same five parts in the same order - eyebrow, the large
 * gold heading, the gold rule, a subheading and a small note - so the top of
 * the site reads identically wherever the visitor lands.
 *
 * Breadcrumbs were dropped from this template at the client's request. The
 * `crumbs` prop is kept so the pages that pass it still compile and the
 * structured breadcrumb data stays available if it comes back.
 */
/** The hero copy carries no full stops, including on text that arrives as data. */
function trim(text: string): string {
  return text.replace(/\.\s*$/, "");
}

export default function InnerHero({
  eyebrow,
  title,
  tagline,
  note,
  children,
}: {
  eyebrow: string;
  title: string;
  /** The subheading, directly under the gold heading. */
  tagline: string;
  /** The small line that closes the block. */
  note?: string;
  /** Anything that belongs below the note, such as an article's byline. */
  children?: React.ReactNode;
  crumbs?: unknown;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[rgba(212,175,55,0.3)] bg-[#FAF6F0]">
      <Image
        src="/assets/gallery/hall-panorama.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />
      {/* The wash is heaviest under the type, which sits on the right in RTL,
          and thins out to the left so the hall stays visible. On a phone the
          text spans the full width, so it falls back to an even wash. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_left,rgba(250,246,240,0.95),rgba(249,245,238,0.93))] sm:bg-[linear-gradient(to_left,rgba(250,246,240,0.97)_0%,rgba(250,246,240,0.94)_42%,rgba(248,243,235,0.66)_72%,rgba(246,240,231,0.45)_100%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-[38px] pt-[110px] sm:px-6 sm:pb-[48px] sm:pt-[120px]">
        <p className="text-xs font-semibold tracking-[0.28em] text-gold">
          {trim(eyebrow)}
        </p>
        <h1 className="shine gold-metal mt-3 max-w-4xl font-display text-[2.3rem] font-black leading-[1.1] tracking-tight sm:text-[3.2rem]">
          {trim(title)}
        </h1>
        <div className="mt-5 h-0.5 w-[45px] rounded bg-[#D4AF37]" />
        <p className="mt-5 max-w-2xl font-display text-[1.15rem] font-semibold leading-snug text-[#1A1A1A] sm:text-[1.3rem]">
          {trim(tagline)}
        </p>
        {note ? (
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#6B655C]">
            {trim(note)}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
