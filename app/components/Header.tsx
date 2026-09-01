"use client";

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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <LogoMark size={46} />
          <span
            className={`font-brand text-xl transition-colors sm:text-2xl ${
              solid ? "text-ink" : "text-white"
            }`}
          >
            {BUSINESS_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[17px] font-medium transition-colors hover:text-gold ${
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
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-white ${
              solid
                ? "border-gold/50 text-gold"
                : "border-white/40 text-white hover:border-gold"
            }`}
          >
            <PhoneIcon width={19} height={19} />
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
