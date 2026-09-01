import DiamondMark from "./DiamondMark";

/**
 * The Goldrock diamond, centred in a gold-rimmed circle on a dark
 * ground. The stone is drawn rather than photographed so its silhouette
 * survives at nav size, and gold on near-black keeps it in the palette.
 */
export default function LogoMark({
  size = 44,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#26262A] to-[#0D0D0E] ring-2 ring-gold shadow-[0_2px_10px_rgba(0,0,0,0.25)] ${className}`}
      style={{ width: size, height: size }}
    >
      <DiamondMark className="w-[64%]" />
    </span>
  );
}
