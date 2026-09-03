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
  ruleOnPhone = true,
  tightLabel = false,
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
  /** Drops the rule on a phone, where the block runs long enough already. */
  ruleOnPhone?: boolean;
  /**
   * Steps the label down on a phone for the pages whose label is a long
   * name - a service or a city - so it holds one line there.
   */
  tightLabel?: boolean;
}) {
  const Label = labelAs;

  return (
    <div className="mx-auto max-w-3xl text-center">
      <Label
        className={`gold-metal font-display font-bold leading-tight sm:text-6xl ${
          tightLabel ? "text-[1.75rem]" : "text-4xl"
        }`}
      >
        {label}
      </Label>
      <h2
        className={`mt-4 whitespace-pre-line font-display font-semibold leading-snug sm:whitespace-normal sm:text-3xl ${
          tightLabel ? "text-[19px]" : "text-xl"
        } ${dark ? "text-white/90" : "text-ink"}`}
      >
        {title}
      </h2>
      {/* Fades to nothing at both ends, so it separates without boxing
          the heading in - and gives every block the same anchor. */}
      <div
        className={`gold-rule mx-auto mt-6 w-full max-w-sm ${
          ruleOnPhone ? "" : "hidden sm:block"
        }`}
      />

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
