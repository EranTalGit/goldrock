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

const linkClass =
  "inline-block text-[#D1D1D1] transition-all duration-200 hover:text-gold hover:-translate-x-1";

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-footer">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <LogoMark size={62} />
            <Image
              src="/assets/logo-wordmark-v4.png"
              alt={`${BUSINESS_NAME} - ליטוש והברקת אבן`}
              width={1050}
              height={385}
              className="h-12 w-auto"
            />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[#A0A0A0]">
            גולדרוק - פוליש, ליטוש והברקת רצפות שיש ומדרגות בתל אביב, גוש דן והמרכז.
          </p>
          <div className="mt-5 space-y-3">
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
              className="flex items-center gap-2.5 text-sm text-[#D1D1D1] transition-colors hover:text-gold"
            >
              <span className="text-gold">
                <WhatsAppIcon width={17} height={17} />
              </span>
              שיחה בוואטסאפ
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold tracking-wide text-gold">ניווט</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className={linkClass}>
                פרטיות
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                תנאי שימוש
              </Link>
            </li>
          </ul>
        </div>

        <div>
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

        <div>
          <h2 className="text-sm font-bold tracking-wide text-gold">אזורים</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm">
            {CITIES.slice(0, 10).map((city) => (
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
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-[#777777] sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {BUSINESS_NAME}. כל הזכויות שמורות.
          </p>
          <p>עיצוב ופיתוח אתרים</p>
        </div>
      </div>
    </footer>
  );
}
