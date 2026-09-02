import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CITIES, getCity, SERVICES, SITE_URL } from "@/lib/site";
import InnerHero from "../../components/InnerHero";
import CtaBand from "../../components/CtaBand";
import ContactForm from "../../components/ContactForm";
import SectionHeading from "../../components/SectionHeading";

export function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const title = `פוליש לשיש ${city.inName} | ליטוש והברקת רצפות`;
  const description = `פוליש לשיש, חידוש מדרגות וליטוש רצפות ${city.inName}. ${city.intro} הצעת מחיר בוואטסאפ.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/areas/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/areas/${city.slug}`,
      locale: "he_IL",
      images: [{ url: "/assets/og.webp" }],
    },
  };
}

/** One heading treatment for every band, as on the service pages. */
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

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  // Every neighbourhood pill takes the width of the longest name, so the rows
  // read as a grid rather than a ragged run of different-sized tags.
  const neighbourhoodWidth = `${
    Math.max(...city.neighborhoods.map((n) => n.length)) + 5
  }ch`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `פוליש לשיש ${city.inName}`,
        areaServed: { "@type": "City", name: city.name },
        provider: { "@id": `${SITE_URL}/#business` },
        url: `${SITE_URL}/areas/${city.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "דף הבית", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "אזורי שירות", item: `${SITE_URL}/areas` },
          {
            "@type": "ListItem",
            position: 3,
            name: city.name,
            item: `${SITE_URL}/areas/${city.slug}`,
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
      {/* The hero is the areas index hero, with the city's name as the only
          thing marking which page you are on. The city names itself again in
          the heading block below, which carries the h1. */}
      <InnerHero
        headingAs="p"
        eyebrow={city.name}
        title="פוליש וליטוש בכל גוש דן"
        tagline="כל עיר עם דף משלה: שכונות, שירותים מקומיים והזמנה מהירה"
        note="מגיעים בתיאום מראש לבתים פרטיים, לדירות ולבנייני מגורים בכל האזור, ללא אבק"
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "אזורי שירות", href: "/areas" },
          { label: city.name, href: `/areas/${city.slug}` },
        ]}
      />

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-4 pt-[45px] sm:px-6">
          <SectionHeading
            labelAs="h1"
            label={`פוליש לשיש ${city.inName}`}
            title={`ליטוש, הברקה וחידוש מדרגות ${city.inName}`}
            description={`מגיעים לכל השכונות ${city.inName} ולסביבה. שולחים תמונה של הרצפה ומקבלים הצעת מחיר עוד באותו יום`}
          />
        </div>

        <div className="mx-auto max-w-[900px] px-4 pb-[50px] pt-12 text-[1.08rem] leading-[1.85] text-ink-soft sm:px-6">
          <div className="space-y-4">
            {city.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* The neighbourhoods, on their own ground. */}
      <section className="bg-sand text-ink">
        <div className="mx-auto max-w-6xl px-4 py-[50px] sm:px-6">
          <BandHeading>שכונות {city.inName}</BandHeading>
          {/* Wraps on a small screen, and holds one row from lg where the
              pills share the width between them. */}
          <ul className="mt-8 flex flex-wrap justify-center gap-3 lg:flex-nowrap">
            {city.neighborhoods.map((n) => (
              <li
                key={n}
                style={{ width: neighbourhoodWidth }}
                className="pill-mirror flex max-w-full items-center justify-center px-4 py-2.5 text-center text-[15px] font-medium lg:w-auto lg:min-w-0 lg:flex-1"
              >
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-[900px] px-4 py-[50px] sm:px-6">
          <BandHeading>שירותים {city.inName}</BandHeading>
          <ul className="mt-8 space-y-4">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="font-display text-[1.1rem] font-bold text-gold transition-colors hover:text-gold-soft"
                >
                  {service.title} {city.inName}
                </Link>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The same closing form the service pages carry. */}
      <section className="bg-white text-ink">
        <div className="mx-auto max-w-2xl px-4 py-[50px] sm:px-6">
          <div className="rounded-2xl border border-[rgba(212,175,55,0.3)] bg-white p-6 shadow-[0_14px_38px_rgba(0,0,0,0.07)] sm:p-8">
            <h2 className="text-center font-display text-[1.5rem] font-bold leading-snug text-[#1A1A1A]">
              רוצים הצעת מחיר מדויקת לפוליש {city.inName}?
            </h2>
            <div className="gold-rule mx-auto mt-4 w-full max-w-[220px]" />
            <p className="mx-auto mt-4 max-w-md text-center text-[15px] leading-relaxed text-[#666059]">
              משאירים שם וטלפון, או שולחים תמונה של הרצפה בוואטסאפ
              <br />
              ומקבלים הצעת מחיר עוד באותו יום
            </p>
            <div className="mt-6">
              <ContactForm
                source={`city-${city.slug}`}
                tone="light"
                defaultCity={city.name}
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBand title={`פוליש ${city.inName} - מתחילים בתמונה`} />
    </>
  );
}
