import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/site";
import { ServiceIcon } from "./icons";

export default function Services() {
  return (
    <section id="services" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <p className="eyebrow">השירותים שלנו</p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
          כל מה שהרצפה שלך צריכה
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/65">
          מפוליש לשיש ועד חידוש מדרגות וניקיון אחרי שיפוץ. כל שירות עם דף מלא, תהליך ברור והצעת מחיר מהירה.
        </p>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article key={service.slug} className="card-soft group overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-gold shadow-sm">
                  <ServiceIcon name={service.icon} width={22} height={22} />
                </span>
              </div>
              <div className="p-8">
                <h3 className="font-display text-xl font-bold leading-snug">
                  <Link
                    href={`/services/${service.slug}`}
                    className="transition-colors hover:text-gold"
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
                >
                  לפרטי השירות ←
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
