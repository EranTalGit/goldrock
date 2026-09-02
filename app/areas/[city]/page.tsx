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

        <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-12 pt-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="space-y-4 text-[1.08rem] leading-[1.85] text-ink-soft">
              {city.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-11 font-display text-2xl font-bold text-ink sm:text-3xl">
              שכונות {city.inName}
            </h2>
            <div className="gold-rule mt-4 w-full max-w-sm" />
            {/* The pill the service pages use for their "מתאים ל" list: one
                width for all of them, taken from the longest name. */}
            <ul className="mt-6 flex flex-wrap gap-3">
              {city.neighborhoods.map((n) => (
                <li
                  key={n}
                  style={{ width: neighbourhoodWidth }}
                  className="pill-mirror flex max-w-full items-center justify-center px-4 py-2.5 text-center text-[15px] font-medium"
                >
                  {n}
                </li>
              ))}
            </ul>

            <h2 className="mt-11 font-display text-2xl font-bold text-ink sm:text-3xl">
              שירותים {city.inName}
            </h2>
            <div className="gold-rule mt-4 w-full max-w-sm" />
            <ul className="mt-6 space-y-4">
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
          <aside className="h-fit rounded-[20px] border border-[rgba(212,175,55,0.35)] bg-white/90 p-7 shadow-[0_15px_35px_rgba(0,0,0,0.05)] backdrop-blur-[10px]">
            <h2 className="font-display text-[1.4rem] font-bold text-[#1A1A1A]">
              הזמנת שירות {city.inName}
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[#666666]">
              משאירים פרטים או שולחים תמונה בוואטסאפ להצעת מחיר מדויקת
            </p>
            <div className="gold-line mt-5 w-28" />
            <div className="mt-6">
              <ContactForm
                source={`city-${city.slug}`}
                tone="light"
                defaultCity={city.name}
              />
            </div>
          </aside>
        </div>
      </section>
      <CtaBand title={`פוליש ${city.inName} - מתחילים בתמונה`} />
    </>
  );
}
