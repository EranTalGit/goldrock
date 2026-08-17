import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/site";
import { ServiceIcon } from "./icons";

export default function Services() {
  return (
    <section id="services" className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-xs tracking-[0.28em] text-gold">השירותים</p>
        <h2 className="mt-3 font-display text-4xl text-ink">כל מה שהרצפה צריכה</h2>
        <p className="mt-4 max-w-2xl text-ink/70">
          מפוליש לשיש ועד חידוש מדרגות וניקיון אחרי שיפוץ. כל שירות עם דף מלא, תהליך ברור והצעת מחיר מהירה.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.slug}
              className="group overflow-hidden rounded-2xl border border-ink/8 bg-cream"
            >
              <div className="relative h-44">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span className="text-gold">
                  <ServiceIcon name={service.icon} />
                </span>
                <h3 className="mt-3 font-display text-2xl">
                  <Link href={`/services/${service.slug}`} className="hover:text-gold">
                    {service.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-gold"
                >
                  לפרטי השירות
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
