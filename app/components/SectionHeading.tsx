/**
 * Shared heading block so every section carries the same hierarchy:
 * the gold label leads at display size, the dark line supports it, and
 * the description sits underneath. The h2 stays the semantic heading
 * regardless of which line is visually louder.
 */
export default function SectionHeading({
  label,
  title,
  description,
  dark = false,
}: {
  label: string;
  title: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="gold-metal font-display text-3xl font-bold leading-tight sm:text-5xl">
        {label}
      </p>
      <h2
        className={`mt-3 font-display text-lg font-semibold leading-snug sm:text-2xl ${
          dark ? "text-white/90" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-[15px] leading-relaxed sm:text-base ${
            dark ? "text-white/60" : "text-ink-soft"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
