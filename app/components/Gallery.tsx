import Image from "next/image";
import { GALLERY } from "@/lib/site";
import SectionHeading from "./SectionHeading";

export default function Gallery() {
  return (
    <section className="bg-obsidian">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
          dark
          label="גלריה"
          title="אומנות הברק והאבן"
          description="הנה חלק מהתוצאות שאנחנו מייצרים עבור הלקוחות שלנו במרכז."
        />
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
