"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BUSINESS_NAME, NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/assets/logo-mark.png"
            alt="סמל Goldrock"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="font-brand text-lg text-gold-soft sm:text-xl">
            {BUSINESS_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-cream/80 transition-colors hover:text-gold-soft"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={PHONE_HREF} className="text-sm text-gold-soft" dir="ltr">
            {PHONE_DISPLAY}
          </a>
          <Link href="/contact" className="btn-gold rounded-full px-4 py-2 text-sm">
            הזמנת שירות
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden text-cream"
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
        <div className="border-t border-gold/20 bg-obsidian/95 px-4 py-5 backdrop-blur lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg text-cream"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-gold mt-2 inline-flex justify-center rounded-full px-4 py-3"
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
