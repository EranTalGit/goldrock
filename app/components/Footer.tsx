import Image from "next/image";
import Link from "next/link";
import {
  BUSINESS_NAME,
  BUSINESS_NAME_HE,
  CITIES,
  NAV_LINKS,
  PHONE_DISPLAY,
  PHONE_HREF,
  REGION_LABEL,
  SERVICES,
  whatsappLink,
  DEFAULT_WA_MESSAGE,
} from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-obsidian">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <Image src="/assets/logo-mark.png" alt="" width={36} height={36} />
            <span className="font-brand text-gold-soft">{BUSINESS_NAME}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {BUSINESS_NAME_HE} - פוליש, ליטוש והברקת רצפות שיש ומדרגות ב{REGION_LABEL}.
          </p>
          <a href={PHONE_HREF} className="mt-4 block text-gold-soft" dir="ltr">
            {PHONE_DISPLAY}
          </a>
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            className="mt-2 inline-block text-sm text-cream/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            שיחה בוואטסאפ
          </a>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gold">ניווט</h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold-soft">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="hover:text-gold-soft">
                פרטיות
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gold-soft">
                תנאי שימוש
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gold">שירותים</h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="hover:text-gold-soft">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gold">אזורים</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-cream/75">
            {CITIES.slice(0, 10).map((city) => (
              <li key={city.slug}>
                <Link href={`/areas/${city.slug}`} className="hover:text-gold-soft">
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/10 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {BUSINESS_NAME} / {BUSINESS_NAME_HE}. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
