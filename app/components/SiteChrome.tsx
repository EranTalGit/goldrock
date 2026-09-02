"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import MobileCtaBar from "./MobileCtaBar";
import AccessibilityWidget from "./AccessibilityWidget";
import BackToTop from "./BackToTop";
import CookieNotice from "./CookieNotice";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const studio = path.startsWith("/designs");

  if (studio) {
    return <div className="min-h-full">{children}</div>;
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[130] focus:rounded-xl focus:bg-gold focus:px-5 focus:py-3 focus:font-bold focus:text-white"
      >
        דילוג לתוכן הראשי
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileCtaBar />
      <BackToTop />
      <AccessibilityWidget />
      <CookieNotice />
    </>
  );
}
