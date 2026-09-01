import Image from "next/image";

/**
 * The Goldrock diamond on its marble ground, centred in a gold-rimmed
 * circle. The pale stone keeps the charcoal half of the diamond legible
 * at nav size, where it vanished against the original dark artwork.
 *
 * Swap /assets/logo-diamond.png to change the mark everywhere at once.
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
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-gold shadow-[0_2px_10px_rgba(0,0,0,0.18)] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/assets/logo-diamond.png"
        alt="סמל Goldrock - יהלום זהב"
        width={size * 2}
        height={size * 2}
        className="h-full w-full object-cover"
        priority
      />
    </span>
  );
}
