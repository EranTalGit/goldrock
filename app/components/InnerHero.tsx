import Image from "next/image";

/**
 * Light textured hero for the inner pages. A marble photograph carries
 * the texture; a cream wash over it keeps the type fully legible.
 *
 * Breadcrumbs were dropped from this template at the client's request.
 * The `crumbs` prop is kept so the pages that pass it still compile and
 * the structured breadcrumb data stays available if it comes back.
 */
export default function InnerHero({
  eyebrow,
  title,
  tagline,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
  crumbs?: unknown;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[rgba(212,175,55,0.3)] bg-[#FAF6F0]">
      <Image
        src="/assets/gallery/marble-closeup.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Wash over the texture, so the heading reads at full contrast. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(130deg,rgba(250,246,240,0.94),rgba(245,238,228,0.88))]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-[35px] pt-[110px] sm:px-6 sm:pb-[45px] sm:pt-[120px]">
        <p className="text-xs font-semibold tracking-[0.28em] text-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-[1.8rem] font-bold leading-tight text-[#1A1A1A] sm:text-[2.2rem]">
          {title}
        </h1>
        <div className="mt-4 h-0.5 w-[45px] rounded bg-[#D4AF37]" />
        <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-[#4A453F]">
          {tagline}
        </p>
      </div>
    </section>
  );
}
