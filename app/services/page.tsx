import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS_NAME, REGION_LABEL, SERVICES, SITE_URL } from "@/lib/site";
import InnerHero from "../components/InnerHero";
import CtaBand from "../components/CtaBand";

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
    images: [{ url: "/assets/og.webp" }],
  },
};

export default function ServicesPage() {
  return (
    <>
      <InnerHero
        eyebrow="השירותים"
        title="פוליש, ליטוש וחידוש אבן"
        tagline={`טיפול מקצועי לכל סוגי הרצפות והמדרגות ב${REGION_LABEL}.`}
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "שירותים", href: "/services" },
        ]}
      />
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <article key={service.slug} className="overflow-hidden rounded-2xl bg-cream">
              <div className="relative h-52">
                <Image src={service.image} alt={service.title} fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl">
                  <Link href={`/services/${service.slug}`}>{service.title}</Link>
                </h2>
                <p className="mt-3 leading-relaxed text-ink/70">{service.description}</p>
                <Link href={`/services/${service.slug}`} className="mt-4 inline-block font-semibold text-gold">
                  לפרטי השירות
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
