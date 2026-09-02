import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CITIES, getCity, SERVICES, SITE_URL } from "@/lib/site";
import InnerHero from "../../components/InnerHero";
import CtaBand from "../../components/CtaBand";
import ContactForm from "../../components/ContactForm";

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
      <InnerHero
        eyebrow={city.name}
        title={`פוליש לשיש ${city.inName}`}
        tagline={`ליטוש, הברקה וחידוש מדרגות ${city.inName} ובשכונות הסמוכות.`}
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "אזורי שירות", href: "/areas" },
          { label: city.name, href: `/areas/${city.slug}` },
        ]}
      />
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="leading-relaxed text-ink/80">{city.intro}</p>
            <p className="mt-4 leading-relaxed text-ink/80">{city.note}</p>
            <h2 className="mt-10 font-display text-3xl">שכונות {city.inName}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {city.neighborhoods.map((n) => (
                <li key={n} className="rounded-full bg-cream px-3 py-1 text-sm">
                  {n}
                </li>
              ))}
            </ul>
            <h2 className="mt-10 font-display text-3xl">שירותים {city.inName}</h2>
            <ul className="mt-4 space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="font-semibold text-gold">
                    {service.title} {city.inName}
                  </Link>
                  <p className="text-sm text-ink/70">{service.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="form-card h-fit p-6 sm:p-7">
            <h2 className="font-display text-2xl">הזמנה {city.toName}</h2>
            <div className="mt-6">
              <ContactForm source={`city-${city.slug}`} />
            </div>
          </aside>
        </div>
      </section>
      <CtaBand title={`פוליש ${city.inName} - מתחילים בתמונה`} />
    </>
  );
}
