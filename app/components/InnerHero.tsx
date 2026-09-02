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
  /** Omitted where the page repeats it as a heading further down. */
  eyebrow?: string;
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
      {/* A light lift over the whole photograph, so it reads as part of the
          cream palette rather than a window cut into it. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[rgba(250,246,240,0.94)] sm:bg-[rgba(250,246,240,0.2)]"
      />
      {/* A short fade across the top strip only, so the gold wordmark in the
          transparent navbar never lands on a bright window. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 hidden h-[130px] sm:block sm:bg-[linear-gradient(to_bottom,rgba(250,246,240,0.94)_0%,rgba(250,246,240,0.88)_38%,rgba(250,246,240,0.5)_66%,rgba(250,246,240,0)_100%)]"
      />
      {/* Then a soft halo behind the centred type only. The hall stays fully
          visible at the sides and corners; the heading still reads on cream.
          A phone gets the flat wash above instead, since its text is full-width. */}
      <div
        aria-hidden
        className="absolute inset-0 hidden sm:block sm:bg-[radial-gradient(ellipse_38%_50%_at_50%_56%,rgba(250,246,240,0.96)_0%,rgba(250,246,240,0.93)_58%,rgba(250,246,240,0.5)_84%,rgba(250,246,240,0)_100%)]"
      />

      <div className="relative mx-auto max-w-4xl px-4 pb-[34px] pt-[96px] text-center sm:px-6 sm:pb-[40px] sm:pt-[104px]">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.28em] text-gold">
            {trim(eyebrow)}
          </p>
        ) : null}
        <h1 className="shine gold-metal mt-3 font-display text-[2.3rem] font-black leading-[1.1] tracking-tight sm:text-[3.2rem]">
          {trim(title)}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-display text-[1.25rem] font-bold leading-snug text-[#1A1A1A] sm:text-[1.45rem]">
          {trim(tagline)}
        </p>
        {note ? (
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-[#5A554E] sm:text-[18px]">
            {trim(note)}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
