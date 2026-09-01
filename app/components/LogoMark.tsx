import Image from "next/image";

/**
 * The Goldrock mark, centred inside a gold-rimmed circle.
 * Every placement of the logo goes through here, so replacing
 * /assets/logo-mark.png updates the whole site at once.
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
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0d0d0d] ring-1 ring-gold/70 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/assets/logo-mark.png"
        alt="סמל Goldrock"
        width={size * 2}
        height={size * 2}
        className="h-full w-full object-contain p-[12%]"
        priority
      />
    </span>
  );
}
