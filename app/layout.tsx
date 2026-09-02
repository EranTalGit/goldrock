import type { Metadata } from "next";
import { Assistant, Cormorant_Garamond, Heebo } from "next/font/google";
import "./globals.css";
import ThemeScript from "./components/ThemeScript";
import SiteChrome from "./components/SiteChrome";
import {
  BUSINESS_NAME,
  BUSINESS_NAME_HE,
  PHONE_INTL,
  REGION_LABEL,
  SERVICE_AREAS,
  SERVICES,
  SITE_URL,
  TAGLINE,
} from "@/lib/site";

const display = Heebo({
  variable: "--font-display",
  subsets: ["hebrew", "latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const body = Assistant({
  variable: "--font-body",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const brand = Cormorant_Garamond({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const description = `${BUSINESS_NAME} / ${BUSINESS_NAME_HE} - פוליש לשיש, ליטוש, הברקה וחידוש מדרגות ב${REGION_LABEL}. עבודה נקייה, אחריות מלאה, הצעת מחיר בוואטסאפ.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS_NAME} | פוליש לשיש, ליטוש והברקת רצפות בגוש דן`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description,
  keywords: [
    "פוליש לשיש",
    "פוליש לרצפה",
    "ליטוש שיש",
    "הברקת רצפות",
    "קריסטליזציה",
    "חידוש מדרגות שיש",
    "חידוש מרצפות",
    "פוליש שיש תל אביב",
    "הברקת רצפות גוש דן",
    "Goldrock",
    "גולדרוק",
    "גולדרוק פוליש",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    title: `${BUSINESS_NAME} | פוליש לשיש וליטוש רצפות בגוש דן`,
    description,
    images: [{ url: "/assets/og.webp", width: 1536, height: 1024, alt: "רצפת שיש מבריקה אחרי פוליש של Goldrock" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_NAME} | פוליש לשיש בגוש דן`,
    description,
    images: ["/assets/og.webp"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS_NAME,
      alternateName: BUSINESS_NAME_HE,
      description,
      url: SITE_URL,
      telephone: PHONE_INTL,
      image: `${SITE_URL}/assets/og.webp`,
      logo: `${SITE_URL}/assets/logo-gr-v2.png`,
      slogan: TAGLINE,
      priceRange: "₪₪",
      areaServed: SERVICE_AREAS.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      address: {
        "@type": "PostalAddress",
        addressRegion: "תל אביב",
        addressCountry: "IL",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "19:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "שירותי פוליש וליטוש",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            url: `${SITE_URL}/services/${service.slug}`,
          },
        })),
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: PHONE_INTL,
        contactType: "customer service",
        availableLanguage: ["he"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BUSINESS_NAME,
      inLanguage: "he-IL",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${display.variable} ${body.variable} ${brand.variable} h-full`}
    >
      <body className="flex min-h-full flex-col pb-20 md:pb-0">
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
