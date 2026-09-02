import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BUSINESS_NAME, CITIES, getService, SERVICES, SITE_URL } from "@/lib/site";
import InnerHero from "../../components/InnerHero";
import CtaBand from "../../components/CtaBand";
import ContactForm from "../../components/ContactForm";

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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

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
      <InnerHero
        eyebrow={BUSINESS_NAME}
        title={service.h1}
        tagline={service.tagline}
        note="שולחים תמונה של הרצפה ומקבלים כיוון מחיר, בלי התחייבות"
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "שירותים", href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      />
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="relative mb-8 h-72 overflow-hidden rounded-2xl">
              <Image src={service.image} alt={service.h1} fill className="object-cover" sizes="60vw" />
            </div>
            {service.intro.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-ink/80">
                {p}
              </p>
            ))}
            <h2 className="mt-12 font-display text-3xl">למה לבחור בטיפול הזה</h2>
            <ul className="mt-4 list-disc pr-5 text-ink/80">
              {service.benefits.map((b) => (
                <li key={b} className="mt-2">
                  {b}
                </li>
              ))}
            </ul>
            <h2 className="mt-12 font-display text-3xl">איך העבודה מתבצעת</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {service.steps.map((step, i) => (
                <li key={step.title} className="rounded-2xl bg-cream p-5">
                  <span className="text-sm text-gold">שלב {i + 1}</span>
                  <h3 className="mt-1 font-display text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink/70">{step.text}</p>
                </li>
              ))}
            </ol>
            <h2 className="mt-12 font-display text-3xl">מתאים ל</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.suitedFor.map((item) => (
                <span key={item} className="rounded-full bg-cream px-3 py-1 text-sm">
                  {item}
                </span>
              ))}
            </div>
            <h2 className="mt-12 font-display text-3xl">שאלות על {service.title}</h2>
            <div className="mt-4 divide-y divide-ink/10">
              {service.faq.map((item) => (
                <details key={item.q} className="py-4">
                  <summary className="cursor-pointer font-semibold">{item.q}</summary>
                  <p className="mt-2 text-ink/70">{item.a}</p>
                </details>
              ))}
            </div>
            <h2 className="mt-12 font-display text-3xl">שירות בערים</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {CITIES.slice(0, 8).map((city) => (
                <Link
                  key={city.slug}
                  href={`/areas/${city.slug}`}
                  className="text-sm text-gold hover:underline"
                >
                  {service.title} {city.inName}
                </Link>
              ))}
            </div>
          </div>
          <aside className="form-card h-fit p-6 sm:p-7">
            <h2 className="font-display text-2xl">הצעת מחיר ל{service.title}</h2>
            <p className="mt-2 text-sm text-muted">משאירים פרטים או שולחים תמונה בוואטסאפ.</p>
            <div className="mt-6">
              <ContactForm source={`service-${service.slug}`} />
            </div>
          </aside>
        </div>
      </section>
      <CtaBand title={`מזמינים ${service.title}`} />
    </>
  );
}
