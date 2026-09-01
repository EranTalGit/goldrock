import Image from "next/image";

/**
 * The Goldrock diamond, centred inside a gold-rimmed circle.
 * Every placement of the logo goes through here, so replacing
 * /assets/logo-goldrock.png updates the whole site at once.
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
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-gold/80 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/assets/logo-goldrock.png"
        alt="סמל Goldrock - יהלום זהב"
        width={size * 2}
        height={size * 2}
        className="h-full w-full object-cover"
        priority
      />
    </span>
  );
}
