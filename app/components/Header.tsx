"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BUSINESS_NAME, NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import LogoMark from "./LogoMark";
import { PhoneIcon } from "./icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent over the dark hero; light and solid once scrolled onto the page.
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        solid
          ? "border-b border-line bg-paper/92 shadow-[0_1px_20px_rgba(0,0,0,0.06)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-5">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <LogoMark size={46} />
          <Image
            src="/assets/logo-wordmark-v2.png"
            alt={`${BUSINESS_NAME} - ליטוש והברקת אבן`}
            width={1050}
            height={385}
            priority
            // The wordmark's pale gold highlights wash out once the bar turns
            // light, so deepen and saturate it against the off-white.
            className={`h-9 w-auto transition-[filter] duration-300 sm:h-11 ${
              solid
                ? "[filter:brightness(0.68)_saturate(1.6)_contrast(1.12)]"
                : "drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
            }`}
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[19px] font-medium transition-colors hover:text-gold ${
                solid ? "text-ink/80" : "text-white/90"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={PHONE_HREF}
            aria-label={`חיוג ל-${PHONE_DISPLAY}`}
            title={PHONE_DISPLAY}
            // A bare outline vanished against the hero photograph, so give it
            // a filled ground to sit on.
            className={`inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-white ${
              solid
                ? "border-gold bg-gold/10 text-gold"
                : "border-gold bg-black/45 text-gold-soft backdrop-blur-sm"
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
          className={solid ? "text-ink lg:hidden" : "text-white lg:hidden"}
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
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
