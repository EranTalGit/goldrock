import Image from "next/image";
import Link from "next/link";
import {
  BUSINESS_NAME,
  CITIES,
  NAV_LINKS,
  PHONE_DISPLAY,
  PHONE_HREF,
  SERVICES,
  whatsappLink,
  DEFAULT_WA_MESSAGE,
} from "@/lib/site";
import LogoMark from "./LogoMark";
import { PhoneIcon, WhatsAppIcon } from "./icons";

// No sideways nudge now the columns are centred - it would pull each
// item off the axis it shares with the heading above it.
const linkClass =
  "inline-block text-[#D1D1D1] transition-colors duration-200 hover:text-gold";

/** Legal pages, listed under the navigation column. */
const LEGAL_LINKS = [
  { label: "מדיניות פרטיות", href: "/privacy" },
  { label: "נגישות", href: "/accessibility" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-footer">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-6 pt-12 sm:px-6 md:grid-cols-4">
        <div className="text-center md:col-span-1">
          <div className="flex items-center justify-center gap-3">
            <LogoMark size={62} />
            <Image
              src="/assets/logo-wordmark-v5.png"
              alt={`${BUSINESS_NAME} - ליטוש והברקת אבן`}
              width={1050}
              height={385}
              className="h-12 w-auto"
            />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[#A0A0A0]">
            גולדרוק - פוליש, ליטוש והברקת רצפות שיש ומדרגות בתל אביב, גוש דן והמרכז.
          </p>

          {/* Both lines share one starting edge, and the pair is centred. */}
          <div className="mt-5 inline-flex flex-col items-start gap-3 text-sm">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2.5 text-[#D1D1D1] transition-colors hover:text-gold"
            >
              <span className="text-gold">
                <PhoneIcon width={17} height={17} />
              </span>
              <span dir="ltr">{PHONE_DISPLAY}</span>
            </a>
            <a
              href={whatsappLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-[#D1D1D1] transition-colors hover:text-gold"
            >
              <span className="text-gold">
                <WhatsAppIcon width={17} height={17} />
              </span>
              שיחה בוואטסאפ
            </a>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-sm font-bold tracking-wide text-gold">ניווט</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <h2 className="text-sm font-bold tracking-wide text-gold">שירותים</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <h2 className="text-sm font-bold tracking-wide text-gold">אזורים</h2>
          <ul className="mx-auto mt-4 grid w-fit grid-cols-2 gap-x-5 gap-y-2.5 text-sm sm:grid-cols-3">
            {CITIES.map((city) => (
              <li key={city.slug}>
                <Link href={`/areas/${city.slug}`} className={linkClass}>
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-[#777777] sm:px-6">
          <p>
            © {new Date().getFullYear()} {BUSINESS_NAME}. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
