"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GOOGLE_ADS_ID, reportConversion } from "@/lib/gtag";

// Loads the Google tag and reports a "contact click" conversion
// whenever a visitor clicks a tel: link or a WhatsApp link anywhere on the site.
export default function GoogleTag() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const isPhone = href.startsWith("tel:");
      const isWhatsApp = /wa\.me|api\.whatsapp\.com|whatsapp:\/\//.test(href);
      if (!isPhone && !isWhatsApp) return;
      reportConversion("contactClick", { contact_type: isPhone ? "phone" : "whatsapp" });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      <Script
        id="google-tag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  );
}
