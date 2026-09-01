import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

export default function InnerHero({
  eyebrow,
  title,
  tagline,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden marble-veil grain pt-28 pb-12 sm:pt-32">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Breadcrumbs items={crumbs} />
        <p className="mt-6 text-xs tracking-[0.28em] text-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-cream sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{tagline}</p>
        <div className="gold-line mt-10 max-w-xs" />
      </div>
    </section>
  );
}
