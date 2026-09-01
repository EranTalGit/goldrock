import Image from "next/image";

/**
 * The Goldrock diamond, centred in a gold-rimmed circle.
 * Swap /assets/logo-gr.png to change the mark everywhere at once.
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
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0D0D0E] ring-2 ring-gold shadow-[0_2px_10px_rgba(0,0,0,0.25)] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/assets/logo-gr.png"
        alt="סמל Goldrock - יהלום זהב"
        width={size * 2}
        height={size * 2}
        className="h-full w-full object-cover"
        priority
      />
    </span>
  );
}
