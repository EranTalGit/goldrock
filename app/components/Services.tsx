import Image from "next/image";
import Link from "next/link";
import { DEFAULT_WA_MESSAGE, SERVICES, whatsappLink } from "@/lib/site";
import { ServiceIcon } from "./icons";

export default function Services() {
  return (
    <section id="services" className="bg-sand text-ink">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">השירותים שלנו</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            כל מה שהרצפה שלך צריכה
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
            מפוליש לשיש ועד חידוש מדרגות וניקיון אחרי שיפוץ. כל שירות עם דף מלא, תהליך ברור והצעת מחיר מהירה.
          </p>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.slug}
              className="card-glass group overflow-hidden backdrop-blur-[12px]"
            >
              <div className="relative aspect-video overflow-hidden rounded-t-[14px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute bottom-3 right-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gold shadow-[0_4px_14px_rgba(0,0,0,0.12)] backdrop-blur-[4px]">
                  <ServiceIcon name={service.icon} width={22} height={22} />
                </span>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-bold leading-snug text-ink">
                  <Link
                    href={`/services/${service.slug}`}
                    className="transition-colors hover:text-gold"
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#555555]">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="arrow-link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold"
                >
                  לפרטי השירות <span className="arrow">←</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold arrow-link inline-block rounded-xl px-8 py-4 text-center text-[15px] leading-snug sm:text-base"
          >
            לא בטוחים איזה שירות מתאים לרצפה שלכם? דברו איתנו לייעוץ ללא התחייבות{" "}
            <span className="arrow">←</span>
          </a>
        </div>
      </div>
    </section>
  );
}
