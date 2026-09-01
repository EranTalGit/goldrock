"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BUSINESS_NAME, NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

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
          ? "border-b border-ink/8 bg-paper/90 shadow-[0_1px_20px_rgba(18,18,18,0.06)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/assets/logo-mark.png"
            alt="סמל Goldrock"
            width={44}
            height={44}
            className="h-10 w-10 object-contain sm:h-11 sm:w-11"
            priority
          />
          <span
            className={`font-brand text-lg transition-colors sm:text-xl ${
              solid ? "text-ink" : "text-white"
            }`}
          >
            {BUSINESS_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-gold ${
                solid ? "text-ink/75" : "text-white/85"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={PHONE_HREF}
            className={`text-sm font-semibold transition-colors ${
              solid ? "text-ink" : "text-white"
            }`}
            dir="ltr"
          >
            {PHONE_DISPLAY}
          </a>
          <Link href="/contact" className="btn-gold rounded-xl px-5 py-2.5 text-sm">
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
        <div className="border-t border-ink/10 bg-paper px-4 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-gold mt-2 inline-flex justify-center rounded-xl px-4 py-3"
              onClick={() => setOpen(false)}
            >
              הזמנת שירות
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
