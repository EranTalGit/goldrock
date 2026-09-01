import Image from "next/image";
import { GALLERY } from "@/lib/site";

export default function Gallery() {
  return (
    <section className="bg-obsidian">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="eyebrow">גלריה</p>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          אומנות הברק והאבן
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/60">
          הנה חלק מהתוצאות שאנחנו מייצרים עבור הלקוחות שלנו במרכז.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((item, i) => (
            <figure
              key={item.src + i}
              className={`group relative overflow-hidden rounded-2xl transition-shadow duration-400 hover:shadow-[0_8px_25px_rgba(197,160,89,0.15)] ${
                i === 0 ? "min-h-72 md:col-span-2 md:row-span-2" : "min-h-44"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-400 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <figcaption className="absolute bottom-4 right-4">
                <span className="rounded-lg border border-gold/40 bg-black/60 px-4 py-1.5 text-xs font-medium tracking-wide text-[#F5EFE2] backdrop-blur-[8px]">
                  {item.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
