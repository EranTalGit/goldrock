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
      {/* The wash is heaviest down the middle, where the centred type sits,
          and thins towards both edges so the hall stays visible either side.
          On a phone the text spans the full width, so it falls back to flat. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[rgba(250,246,240,0.94)] sm:bg-[linear-gradient(to_right,rgba(246,240,231,0.3)_0%,rgba(248,243,235,0.64)_18%,rgba(250,246,240,0.95)_36%,rgba(250,246,240,0.95)_64%,rgba(248,243,235,0.64)_82%,rgba(246,240,231,0.3)_100%)]"
      />

      <div className="relative mx-auto max-w-4xl px-4 pb-[42px] pt-[110px] text-center sm:px-6 sm:pb-[52px] sm:pt-[120px]">
        <p className="text-xs font-semibold tracking-[0.28em] text-gold">
          {trim(eyebrow)}
        </p>
        <h1 className="shine gold-metal mt-3 font-display text-[2.3rem] font-black leading-[1.1] tracking-tight sm:text-[3.2rem]">
          {trim(title)}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-display text-[1.25rem] font-bold leading-snug text-[#1A1A1A] sm:text-[1.45rem]">
          {trim(tagline)}
        </p>
        {note ? (
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-[#6B655C] sm:text-[16px]">
            {trim(note)}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
