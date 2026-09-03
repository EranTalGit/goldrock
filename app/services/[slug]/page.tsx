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

  // "קריסטליזציה (הברקה קריסטלית)" and the like only lengthen the city
  // links, which already carry the city name too.
  // "קריסטליזציה (הברקה קריסטלית)" only lengthens the city links, which
  // already carry a city name too. The heading below keeps the full title.
  const shortTitle = service.title.replace(/\s*\([^)]*\)/g, "").trim();

  // Every "מתאים ל" pill takes the width of the longest entry, so they match
  // without being stretched to an arbitrary share of the section. A ch is the
  // width of a digit, which runs wider than a Hebrew letter, so this errs on
  // the roomy side. A centred wrap then keeps a short last row on the axis.
  const suitedWidth = `${Math.max(...service.suitedFor.map((s) => s.length)) + 5}ch`;
  // Four entries fit one row. More than four are capped to three per row, so
  // five reads as three and a centred pair rather than four and a lone one.
  const suitedRowCap =
    service.suitedFor.length > 4
      ? `calc(3 * ${suitedWidth} + 1.5rem)`
      : undefined;
  // A phone has no room for a name-width pill, so every pill takes an equal
  // share of the row instead: three across where a service lists more than
  // four, two where it lists four or fewer. The wrap then centres the short
  // last row, the way the neighbourhood rows do.
  const suitedPerRow = service.suitedFor.length > 4 ? 3 : 2;
  const suitedPhoneWidth = `calc((100% - ${(suitedPerRow - 1) * 12}px) / ${suitedPerRow})`;

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
            tightLabel
            label={service.h1}
            title={service.tagline}
            description={service.description}
          />
        </div>

        {/* 1. The service in detail: words on the right, picture on the left
               and held to a smaller share of the row so the reading leads. */}
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-[50px] pt-14 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch lg:gap-12">
          <div>
            <div className="space-y-5 text-[1.1rem] leading-[1.85] text-[#4A453F]">
              {service.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-metal arrow-link inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[1rem]"
              >
                להצעת מחיר מהירה בוואטסאפ <span className="arrow">←</span>
              </a>
            </div>
          </div>

          {/* Beside the copy the picture takes the row's full height rather
              than a fixed ratio, so a longer introduction makes it taller
              and never wider. */}
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.3)] shadow-[0_16px_38px_rgba(0,0,0,0.1)] lg:max-w-none">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full">
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

      {/* 2. What the treatment gives you: one open band of five, no boxes.
             Each promise is a single line, so cards or a framed list were
             more chrome than content - and five never divided evenly. */}
      <section className="bg-sand text-ink">
        <div className="mx-auto max-w-6xl px-4 py-[50px] sm:px-6">
          <BandHeading>למה לבחור בטיפול הזה</BandHeading>

          {/* Two columns of three, the mark leading each line on the right
              and the promise beside it. */}
          <ul className="mx-auto mt-10 grid max-w-xl gap-x-6 gap-y-6 ps-3 sm:ps-0 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(197,160,89,0.4)] bg-white text-[1.15rem] font-bold text-gold shadow-[0_4px_14px_rgba(0,0,0,0.05)] sm:h-12 sm:w-12"
                >
                  ✓
                </span>
                <p className="text-[1rem] font-semibold leading-relaxed text-[#2C2C2C]">
                  {benefit}
                </p>
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
        cta={{ label: "לקבלת הצעת מחיר", href: "#quote" }}
      />

      {/* 4. What it suits, as pills. */}
      <section className="bg-sand text-ink">
        <div className="mx-auto max-w-4xl px-4 py-[45px] sm:px-6">
          <BandHeading>מתאים ל</BandHeading>

          {/* A grid rather than a wrapping row, so every pill is the same
              width, and the mirror treatment the home page uses for cities. */}
          <ul
            className="mx-auto mt-8 flex flex-wrap justify-center gap-3"
            style={{ maxWidth: suitedRowCap }}
          >
            {service.suitedFor.map((item) => (
              <li
                key={item}
                style={
                  {
                    "--suit": suitedWidth,
                    "--suit-phone": suitedPhoneWidth,
                  } as React.CSSProperties
                }
                className="pill-mirror flex min-h-[56px] w-[var(--suit-phone)] items-center justify-center px-2 py-2.5 text-center text-[13.5px] font-medium leading-tight sm:min-h-[52px] sm:w-[var(--suit)] sm:px-4 sm:py-3 sm:text-[15px] sm:leading-normal"
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
      <section id="quote" className="scroll-mt-24 bg-sand text-ink">
        <div className="mx-auto max-w-2xl px-4 py-[50px] sm:px-6">
          <div className="rounded-2xl border border-[rgba(212,175,55,0.3)] bg-white p-6 shadow-[0_14px_38px_rgba(0,0,0,0.07)] sm:p-8">
            <h2 className="text-center font-display text-[1.5rem] font-bold leading-snug text-[#1A1A1A]">
              הצעת מחיר
              <br />
              ל{service.title}
            </h2>
            <div className="gold-rule mx-auto mt-4 w-full max-w-[220px]" />
            <p className="mx-auto mt-4 max-w-md text-center text-[15px] leading-relaxed text-[#666059]">
              משאירים שם וטלפון, או שולחים תמונה של הרצפה בוואטסאפ
              <br />
              ומקבלים הצעת מחיר עוד באותו יום
            </p>
            <div className="mt-6">
              <ContactForm
                source={`service-${service.slug}`}
                tone="light"
                defaultService={service.title}
              />
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
          <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
            {CITIES.slice(0, 12).map((city) => (
              <li key={city.slug} className="flex">
                <Link
                  href={`/areas/${city.slug}`}
                  className="city-mirror flex flex-1 items-center justify-center px-2 py-2.5 text-center text-[13px] font-medium leading-tight sm:px-4 sm:py-3 sm:text-[14px]"
                >
                  {shortTitle} {city.inName}
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
