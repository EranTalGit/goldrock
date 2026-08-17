import Image from "next/image";
import { GALLERY } from "@/lib/site";

export default function Gallery() {
  return (
    <section className="bg-obsidian">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-xs tracking-[0.28em] text-gold">אווירה</p>
        <h2 className="mt-3 font-display text-4xl text-cream">איך רצפה מחודשת נראית</h2>
        <p className="mt-4 max-w-2xl text-muted">
          תמונות אווירה של שיש, מדרגות וחללים מבריקים. צילומי עבודה אמיתיים של Goldrock יתווספו לגלריה כשיהיו בידיים.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {GALLERY.map((item, i) => (
            <figure
              key={item.src + i}
              className={`relative overflow-hidden rounded-xl ${i === 0 ? "md:col-span-2 md:row-span-2 min-h-72" : "min-h-40"}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/80 to-transparent p-3 text-sm text-cream">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
