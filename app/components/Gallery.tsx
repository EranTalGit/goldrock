import Image from "next/image";
import { GALLERY } from "@/lib/site";

export default function Gallery() {
  return (
    <section className="bg-obsidian">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <p className="eyebrow">גלריה</p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          אומנות הברק והאבן
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">
          הנה חלק מהתוצאות שאנחנו מייצרים עבור הלקוחות שלנו במרכז.
        </p>
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((item, i) => (
            <figure
              key={item.src + i}
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0 ? "min-h-80 md:col-span-2 md:row-span-2" : "min-h-44"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <figcaption className="absolute bottom-4 right-4">
                <span className="rounded-full bg-black/55 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
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
