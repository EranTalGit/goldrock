import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CITIES, getCity, SERVICES, SITE_URL } from "@/lib/site";
import InnerHero from "../../components/InnerHero";
import CtaBand from "../../components/CtaBand";
import ContactForm from "../../components/ContactForm";
import SectionHeading from "../../components/SectionHeading";
import { ServiceIcon } from "../../components/icons";

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

/**
 * Breaks the neighbourhoods into rows that balance: up to three stay on one
 * line, four splits two and two, five goes three then two, seven goes four
 * then three. Anything longer falls back to the evenest pair of rows, the
 * larger one first.
 */
function splitRows<T>(items: T[]): T[][] {
  const shapes: Record<number, number[]> = {
    4: [2, 2],
    5: [3, 2],
    6: [3, 3],
    7: [4, 3],
  };
  const shape =
    items.length <= 3
      ? [items.length]
      : (shapes[items.length] ?? [
          Math.ceil(items.length / 2),
          Math.floor(items.length / 2),
        ]);

  const rows: T[][] = [];
  let at = 0;
  for (const size of shape) {
    rows.push(items.slice(at, at + size));
    at += size;
  }
  return rows;
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

  // Cities carry three to seven neighbourhoods, and a run of pills left to
  // wrap on its own leaves a lonely one at the end. Each count gets the
  // shape that balances: three on one line, four as two and two, five as
  // three and two, seven as four and three.
  const neighbourhoodRows = splitRows(city.neighborhoods);

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
          {/* One list, laid out row by row. A row still wraps inside itself
              on a narrow screen, so four pills become two and two there
              without a breakpoint of its own. */}
          <ul className="mt-8 space-y-3">
            {neighbourhoodRows.map((row) => (
              <li key={row.join("|")}>
                <ul className="flex flex-wrap justify-center gap-3">
                  {row.map((n) => (
                    <li
                      key={n}
                      style={{ width: neighbourhoodWidth }}
                      className="pill-mirror flex max-w-full items-center justify-center px-4 py-2.5 text-center text-[15px] font-medium"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-[1000px] px-4 py-[50px] sm:px-6">
          <BandHeading>שירותים {city.inName}</BandHeading>

          {/* auto-fit keeps two to a row wherever there is room for two, and
              folds to one without a breakpoint of its own. */}
          <ul className="mt-8 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(340px,1fr))]">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-[rgba(212,175,55,0.25)] bg-white/85 px-6 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(212,175,55,0.55)] hover:shadow-[0_15px_35px_rgba(212,175,55,0.18)]"
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(212,175,55,0.35)] bg-gold/[0.08] text-gold"
                    >
                      <ServiceIcon name={service.icon} width={18} height={18} />
                    </span>
                    <span className="flex-1 text-balance text-center font-display text-[16px] font-bold leading-snug text-[#B8860B]">
                      {service.title} {city.inName}
                    </span>
                    {/* Balances the badge, so the title centres on the card
                        rather than on what is left of it. */}
                    <span aria-hidden className="h-9 w-9 shrink-0" />
                  </span>
                  <span className="mt-3 text-center text-[14px] leading-[1.6] text-[#555555]">
                    {service.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The same closing form the service pages carry. */}
      <section className="bg-sand text-ink">
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

      {/* The form band above is already the darker ground, so this one
          closes on the light. */}
      <CtaBand light title={`פוליש ${city.inName} - מתחילים בתמונה`} />
    </>
  );
}
