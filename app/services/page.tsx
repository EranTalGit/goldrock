import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS_NAME, REGION_LABEL, SERVICES, SITE_URL } from "@/lib/site";
import InnerHero from "../components/InnerHero";
import CtaBand from "../components/CtaBand";
import SectionHeading from "../components/SectionHeading";

const title = "שירותי פוליש, ליטוש והברקת רצפות";
const description = `כל שירותי Goldrock: פוליש לשיש, קריסטליזציה, חידוש מדרגות, חידוש מרצפות, גרניט פורצלן וניקיון לאחר שיפוץ ב${REGION_LABEL}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: `${title} | ${BUSINESS_NAME}`,
    description,
    url: `${SITE_URL}/services`,
    locale: "he_IL",
    type: "website",
    images: [{ url: "/assets/og.webp" }],
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* No eyebrow here - the section below already leads with it. */}
      <InnerHero
        title="פוליש, ליטוש וחידוש אבן"
        tagline={`טיפול מקצועי לכל סוגי הרצפות והמדרגות ב${REGION_LABEL}`}
        note="כל שירות מותאם לסוג האבן ולמצב שלה, אחרי בדיקה ולא לפי הערכה בטלפון"
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "שירותים", href: "/services" },
        ]}
      />

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-4 py-[45px] sm:px-6">
          <SectionHeading
            label="שירותים"
            title="טיפול אחד לא מתאים לכל אבן"
            description="לכל סוג רצפה יש תהליך משלו, ולכן כל שירות כאן עומד בפני עצמו. בכל אחד מהם תמצאו מה הוא כולל, לאיזה משטח הוא מתאים ומה התוצאה שאפשר לצפות לה."
          />

          {/* Alternating rows. The picture leads on a phone in every row,
              and only from lg do the sides swap on the even ones. */}
          <div className="mt-12">
            {SERVICES.map((service, i) => {
              const href = `/services/${service.slug}`;
              const last = i === SERVICES.length - 1;
              return (
                <article
                  key={service.slug}
                  className={`flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10 ${
                    i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  } ${
                    last
                      ? ""
                      : "mb-10 border-b border-[rgba(212,175,55,0.15)] pb-10"
                  }`}
                >
                  <Link
                    href={href}
                    aria-hidden
                    tabIndex={-1}
                    className="group w-full shrink-0 overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.25)] shadow-[0_14px_34px_rgba(0,0,0,0.09)] lg:w-[42%]"
                  >
                    <span className="relative block aspect-[16/10]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                      />
                    </span>
                  </Link>

                  <div className="w-full lg:w-[58%]">
                    <h2 className="font-display text-[1.45rem] font-bold leading-snug text-[#1A1A1A]">
                      <Link href={href} className="transition-colors hover:text-gold">
                        {service.title}
                      </Link>
                    </h2>

                    <p className="mt-3 text-[1rem] leading-relaxed text-[#55504A]">
                      {service.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {service.benefits.slice(0, 3).map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#55504A]"
                        >
                          <span aria-hidden className="shrink-0 font-bold text-gold">
                            ✓
                          </span>
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={href}
                      className="arrow-link mt-5 inline-flex items-center gap-2 text-[1rem] font-bold text-gold transition-colors hover:text-gold-soft"
                    >
                      לפרטים מלאים והזמנה <span className="arrow">←</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
