// Google Ads conversion tracking (Google tag) + optional GA4.
// Account: GoldRock 151-995-0133. Conversion actions were created in Google Ads on 2026-09-06/07.

export const GOOGLE_ADS_ID = "AW-18427357076";

// GA4 measurement ID (G-XXXXXXX). Set NEXT_PUBLIC_GA4_ID in Vercel; when it is
// missing the site keeps working with Google Ads tracking only.
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

export const CONVERSIONS = {
  // "טופס ליד - אתר" (lead form submission)
  leadForm: { label: "_OdVCLeBve8cEJTP7NJE", value: 150, ga4Event: "generate_lead" },
  // "קליק לטלפון - אתר" (click on a tel: link)
  phoneClick: { label: "9njRCL2Bve8cEJTP7NJE", value: 100, ga4Event: "phone_click" },
  // "קליק לוואטסאפ - אתר" (click on a WhatsApp link)
  whatsappClick: { label: "IwhlCJiKvvAcEJTP7NJE", value: 100, ga4Event: "whatsapp_click" },
} as const;

export type ConversionKey = keyof typeof CONVERSIONS;

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

export function reportConversion(key: ConversionKey, extra?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const { label, value, ga4Event } = CONVERSIONS[key];
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    value,
    currency: "ILS",
    ...extra,
  });
  if (GA4_ID) {
    window.gtag("event", ga4Event, {
      send_to: GA4_ID,
      value,
      currency: "ILS",
      ...extra,
    });
  }
}
