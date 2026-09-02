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
  labelAs = "p",
}: {
  label: string;
  title: string;
  description?: React.ReactNode;
  dark?: boolean;
  /**
   * Rises to the page's h1 where this block opens the content itself, such
   * as a service page whose hero names the section rather than the piece.
   */
  labelAs?: "p" | "h1";
}) {
  const Label = labelAs;

  return (
    <div className="mx-auto max-w-3xl text-center">
      <Label className="gold-metal font-display text-4xl font-bold leading-tight sm:text-6xl">
        {label}
      </Label>
      <h2
        className={`mt-4 font-display text-xl font-semibold leading-snug sm:text-3xl ${
          dark ? "text-white/90" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {/* Fades to nothing at both ends, so it separates without boxing
          the heading in - and gives every block the same anchor. */}
      <div className="gold-rule mx-auto mt-6 w-full max-w-sm" />

      {description ? (
        <p
          className={`mt-6 text-base leading-relaxed sm:text-lg ${
            dark ? "text-white/60" : "text-ink-soft"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
