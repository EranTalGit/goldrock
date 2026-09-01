import DiamondMark from "./DiamondMark";

/**
 * The Goldrock diamond, centred inside a gold-rimmed circle.
 * The pale ground keeps the charcoal half of the stone legible at
 * nav size, where it disappeared against the original dark artwork.
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
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-white to-[#F3EEE4] ring-2 ring-gold shadow-[0_2px_10px_rgba(0,0,0,0.18)] ${className}`}
      style={{ width: size, height: size }}
    >
      <DiamondMark className="w-[62%]" />
    </span>
  );
}
