"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="חזרה לראש העמוד"
      onClick={() => {
        const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
      className={`fixed bottom-[88px] z-[70] grid h-12 w-12 place-items-center rounded-full border border-gold/50 bg-[#161616] text-gold shadow-[0_10px_26px_-8px_rgba(0,0,0,0.7)] transition-all hover:bg-gold hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-gold rtl:right-4 md:bottom-6 rtl:md:right-6 ${
        shown ? "visible opacity-100" : "invisible translate-y-2 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="h-5 w-5"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
