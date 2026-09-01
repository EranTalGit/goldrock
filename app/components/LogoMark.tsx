import Image from "next/image";

/**
 * The Goldrock diamond, centred in a gold-rimmed circle. The stone is
 * uniformly bright, so it holds its shape against the dark ground and
 * sits in the site palette rather than fighting it.
 *
 * Swap /assets/logo-diamond-gold.png to change the mark everywhere at once.
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
        src="/assets/logo-diamond-gold.png"
        alt="סמל Goldrock - יהלום זהב"
        width={size * 2}
        height={size * 2}
        className="h-full w-full object-cover"
        priority
      />
    </span>
  );
}
