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
      <p className="gold-metal font-display text-4xl font-bold leading-tight sm:text-6xl">
        {label}
      </p>
      <h2
        className={`mt-4 font-display text-xl font-semibold leading-snug sm:text-3xl ${
          dark ? "text-white/90" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            dark ? "text-white/60" : "text-ink-soft"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
