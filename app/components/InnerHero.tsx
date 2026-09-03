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
  headingAs = "h1",
  children,
}: {
  /** Omitted where the page repeats it as a heading further down. */
  eyebrow?: string;
  title: string;
  /** The subheading, directly under the gold heading. */
  tagline: string;
  /** The small line that closes the block. */
  note?: string;
  /**
   * Drops to a paragraph on pages whose real h1 lives further down, such as
   * an article, so the document keeps exactly one h1 and it names the piece.
   */
  headingAs?: "h1" | "p";
  /** Anything that belongs below the note, such as an article's byline. */
  children?: React.ReactNode;
  crumbs?: unknown;
}) {
  const Heading = headingAs;

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
        className="absolute inset-0 bg-[rgba(250,246,240,0.55)] sm:bg-[rgba(250,246,240,0.2)]"
      />
      {/* A short fade across the top strip only, so the gold wordmark in the
          transparent navbar never lands on a bright window. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[104px] bg-[linear-gradient(to_bottom,rgba(250,246,240,0.94)_0%,rgba(250,246,240,0.88)_38%,rgba(250,246,240,0.5)_66%,rgba(250,246,240,0)_100%)] sm:h-[130px]"
      />
      {/* Then a soft halo behind the centred type only. The hall stays fully
          visible at the sides and corners; the heading still reads on cream.
          A phone has no free sides - its type runs the width of the screen -
          so there the halo is wide and shallow instead, and the hall shows
          through above and below the words rather than beside them. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_82%_42%_at_50%_58%,rgba(250,246,240,0.93)_0%,rgba(250,246,240,0.88)_52%,rgba(250,246,240,0.4)_84%,rgba(250,246,240,0)_100%)] sm:bg-[radial-gradient(ellipse_38%_50%_at_50%_56%,rgba(250,246,240,0.96)_0%,rgba(250,246,240,0.93)_58%,rgba(250,246,240,0.5)_84%,rgba(250,246,240,0)_100%)]"
      />

      <div className="relative mx-auto max-w-4xl px-4 pb-[26px] pt-[84px] text-center sm:px-6 sm:pb-[40px] sm:pt-[104px]">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.28em] text-gold">
            {trim(eyebrow)}
          </p>
        ) : null}
        <Heading className="shine gold-metal mt-3 font-display text-[1.7rem] font-black leading-[1.15] tracking-tight sm:text-[3.2rem]">
          {trim(title)}
        </Heading>
        <p className="mx-auto mt-4 max-w-2xl text-balance whitespace-pre-line font-display text-[1rem] font-bold leading-snug text-[#1A1A1A] sm:mt-5 sm:whitespace-normal sm:text-[1.45rem]">
          {trim(tagline)}
        </p>
        {note ? (
          <p className="mx-auto mt-3 max-w-2xl text-balance text-[16px] leading-relaxed text-[#5A554E] sm:mt-4 sm:text-[18px]">
            {trim(note)}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
