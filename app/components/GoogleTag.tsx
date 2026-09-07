"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA4_ID, GOOGLE_ADS_ID, reportConversion } from "@/lib/gtag";
import { CONSENT_EVENT, CONSENT_KEY } from "./CookieNotice";

function applyConsent() {
  if (typeof window.gtag !== "function") return;
  let choice: string | null = null;
  try {
    choice = localStorage.getItem(CONSENT_KEY);
  } catch {
    /* storage blocked: stay on the denied defaults */
  }
  const granted = choice === "all" ? "granted" : "denied";
  window.gtag("consent", "update", {
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
    analytics_storage: granted,
  });
}

// Loads the Google tag (Consent Mode v2, everything denied until the cookie
// notice is answered with "all") and reports a "contact click" conversion
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
      reportConversion(isPhone ? "phoneClick" : "whatsappClick", {
        contact_type: isPhone ? "phone" : "whatsapp",
        link_url: href,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener(CONSENT_EVENT, applyConsent);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener(CONSENT_EVENT, applyConsent);
    };
  }, []);

  return (
    <>
      <Script id="google-tag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
try {
  if (localStorage.getItem('${CONSENT_KEY}') === 'all') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');${GA4_ID ? `\ngtag('config', '${GA4_ID}');` : ""}`}
      </Script>
      <Script
        id="google-tag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
