"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BUSINESS_NAME, NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import LogoMark from "./LogoMark";
import { PhoneIcon } from "./icons";

/** True while the link points at the page being viewed. */
function isCurrent(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent over the hero; light and solid once scrolled onto the page.
  const solid = scrolled || open;
  // Only the home page opens on a dark photograph. Everywhere else the hero
  // is cream, so the bar keeps its dark type even while it is transparent.
  const onDark = pathname === "/" && !solid;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        solid
          ? "border-b border-line bg-paper/92 shadow-[0_1px_20px_rgba(0,0,0,0.06)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-3 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <LogoMark size={46} />
          <Image
            src="/assets/logo-wordmark-v5.png"
            alt={`${BUSINESS_NAME} - ליטוש והברקת אבן`}
            width={1050}
            height={385}
            priority
            // The wordmark's pale gold highlights wash out against anything
            // light, so deepen and saturate it unless it sits on the dark hero.
            className={`h-9 w-auto transition-[filter] duration-300 sm:h-11 ${
              onDark
                ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
                : "[filter:brightness(0.95)]"
            }`}
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const current = isCurrent(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`text-[19px] transition-colors hover:text-gold ${
                  current
                    ? "font-bold text-gold"
                    : `font-medium ${onDark ? "text-white/90" : "text-ink/80"}`
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={PHONE_HREF}
            aria-label={`חיוג ל-${PHONE_DISPLAY}`}
            title={PHONE_DISPLAY}
            // A bare outline vanished against the hero photograph, so give it
            // a filled ground to sit on.
            className={`inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-white ${
              onDark
                ? "border-gold bg-black/45 text-gold-soft backdrop-blur-sm"
                : "border-gold bg-gold/10 text-gold"
            }`}
          >
            <PhoneIcon width={23} height={23} />
          </a>
          <Link href="/contact" className="btn-gold rounded-xl px-6 py-3 text-[15px]">
            הזמנת שירות
          </Link>
        </div>

        <button
          type="button"
          className={onDark ? "text-white lg:hidden" : "text-ink lg:hidden"}
          aria-expanded={open}
          aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-paper px-4 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const current = isCurrent(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={`text-lg ${
                    current ? "font-bold text-gold" : "font-medium text-ink"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 flex items-center gap-3">
              <a
                href={PHONE_HREF}
                aria-label={`חיוג ל-${PHONE_DISPLAY}`}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold"
              >
                <PhoneIcon width={20} height={20} />
              </a>
              <Link
                href="/contact"
                className="btn-gold inline-flex flex-1 justify-center rounded-xl px-4 py-3"
                onClick={() => setOpen(false)}
              >
                הזמנת שירות
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
