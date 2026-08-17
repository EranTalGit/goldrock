"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import MobileCtaBar from "./MobileCtaBar";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const studio = path.startsWith("/designs");

  if (studio) {
    return <div className="min-h-full">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileCtaBar />
    </>
  );
}
