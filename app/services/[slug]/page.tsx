import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CITIES,
  getService,
  REGION_LABEL,
  SERVICES,
  SITE_URL,
  whatsappLink,
} from "@/lib/site";
import InnerHero from "../../components/InnerHero";
import CtaBand from "../../components/CtaBand";
import ContactForm from "../../components/ContactForm";
import Process from "../../components/Process";
import SectionHeading from "../../components/SectionHeading";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `${SITE_URL}/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${SITE_URL}/services/${service.slug}`,
      locale: "he_IL",
      images: [{ url: service.image }],
    },
  };
}

/** One heading treatment for every band on the page. */
function BandHeading({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-center font-display text-[1.6rem] font-bold leading-snug text-[#1A1A1A] sm:text-[1.95rem]">
        {children}
      </h2>
      <div className="gold-rule mx-auto mt-4 w-full max-w-xs" />
    </>
  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const wa = whatsappLink(
    `היי, אשמח להצעת מחיר ל${service.title}. אצרף תמונה של הרצפה.`,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.metaDescription,
        url: `${SITE_URL}/services/${service.slug}`,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: "IL",
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "דף הבית", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "שירותים", item: `${SITE_URL}/services` },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `${SITE_URL}/services/${service.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The hero names the section, exactly as on the services index. The
          service names itself below, in the block that carries the h1. */}
      <InnerHero
        headingAs="p"
        title="פוליש, ליטוש וחידוש אבן"
        tagline={`טיפול מקצועי לכל סוגי הרצפות והמדרגות ב${REGION_LABEL}`}
        note="כל שירות מותאם לסוג האבן ולמצב שלה, אחרי בדיקה ולא לפי הערכה בטלפון"
      />

      {/* The same opener every page carries, holding the page's h1. */}
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-4 pt-[45px] sm:px-6">
          <SectionHeading
            labelAs="h1"
            label={service.h1}
            title={service.tagline}
            description={service.description}
          />
        </div>

        {/* 1. The service in detail: words on the right, picture on the left
               and held to a smaller share of the row so the reading leads. */}
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-[50px] pt-14 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <div>
            <div className="space-y-5 text-[1.1rem] leading-[1.85] text-[#4A453F]">
              {service.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-metal arrow-link mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[1rem]"
            >
              להצעת מחיר מהירה בוואטסאפ <span className="arrow">←</span>
            </a>
          </div>

          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.3)] shadow-[0_16px_38px_rgba(0,0,0,0.1)] lg:max-w-none">
            <div className="relative aspect-[4/3]">
              <Image
                src={service.image}
                alt={service.h1}
                fill
                priority
                sizes="(max-width: 1024px) 384px, 30vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. What the treatment gives you. Five one-line promises make a lot
             of chrome as five cards, and leave an orphan in a three-column
             grid; one framed checklist reads faster and sits far shorter. */}
      <section className="bg-sand text-ink">
        <div className="mx-auto max-w-4xl px-4 py-[50px] sm:px-6">
          <BandHeading>למה לבחור בטיפול הזה</BandHeading>

          <ul className="mx-auto mt-9 grid gap-x-10 gap-y-4 rounded-2xl border border-[rgba(212,175,55,0.3)] bg-white p-7 shadow-[0_12px_32px_rgba(0,0,0,0.05)] sm:grid-cols-2 sm:p-9">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/[0.12] text-[13px] font-bold text-gold"
                >
                  ✓
                </span>
                <span className="text-[1rem] font-medium leading-relaxed text-[#2C2C2C]">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. The four steps, in the same flow the home page uses. */}
      <Process
        steps={service.steps}
        label="שלב אחרי שלב"
        title={`איך מתבצעת העבודה ב${service.title}`}
        description="ארבעה שלבים, בסדר הזה, בכל עבודה. אתם יודעים מראש מה קורה בכל שלב וכמה זמן הוא לוקח."
      />

      {/* 4. What it suits, as pills. */}
      <section className="bg-sand text-ink">
        <div className="mx-auto max-w-4xl px-4 py-[45px] sm:px-6">
          <BandHeading>מתאים ל</BandHeading>

          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {service.suitedFor.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[rgba(212,175,55,0.3)] bg-[#FDFCFA] px-6 py-2.5 text-center text-[15px] font-medium text-[#2C2C2C] shadow-[0_4px_14px_rgba(0,0,0,0.03)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Questions, one open at a time by the browser's own accordion. */}
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-3xl px-4 py-[50px] sm:px-6">
          <BandHeading>שאלות על {service.title}</BandHeading>

          <div className="mt-8 space-y-3">
            {service.faq.map((item) => (
              <details
                key={item.q}
                name={`faq-${service.slug}`}
                className="group rounded-xl border border-[#EAE5D9] bg-white px-5 shadow-[0_4px_15px_rgba(0,0,0,0.03)] transition-all open:border-gold open:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-gold/60"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-bold text-ink marker:content-none">
                  {item.q}
                  <span
                    aria-hidden
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-transform duration-300 group-open:rotate-180"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <p className="pb-4 text-[15px] leading-[1.75] text-ink-soft">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. The enquiry form, at the foot of the page rather than beside the
             opening, so the reading finishes before the asking starts. */}
      <section className="bg-sand text-ink">
        <div className="mx-auto max-w-2xl px-4 py-[50px] sm:px-6">
          <div className="rounded-2xl border border-[rgba(212,175,55,0.3)] bg-white p-6 shadow-[0_14px_38px_rgba(0,0,0,0.07)] sm:p-8">
            <h2 className="text-center font-display text-[1.5rem] font-bold text-[#1A1A1A]">
              הצעת מחיר ל{service.title}
            </h2>
            <div className="gold-rule mx-auto mt-4 w-full max-w-[220px]" />
            <p className="mx-auto mt-4 max-w-md text-center text-[15px] leading-relaxed text-[#666059]">
              משאירים שם וטלפון, או שולחים תמונה של הרצפה בוואטסאפ ומקבלים כיוון מחיר עוד באותו יום.
            </p>
            <div className="mt-6">
              <ContactForm source={`service-${service.slug}`} tone="light" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. The same service, city by city. */}
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-5xl px-4 py-[45px] sm:px-6">
          <h2 className="text-center font-display text-[1.3rem] font-bold text-[#1A1A1A]">
            {service.title} לפי אזור
          </h2>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-2.5">
            {CITIES.slice(0, 10).map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/areas/${city.slug}`}
                  className="inline-block rounded-lg border border-[#E6DFD2] bg-white px-4 py-2 text-[14px] text-[#55504A] transition-colors hover:border-gold hover:text-gold"
                >
                  {service.title} {city.inName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={`מזמינים ${service.title}`} />
    </>
  );
}
