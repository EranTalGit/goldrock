// Google Ads conversion tracking (Google tag).
// Account: GoldRock 151-995-0133. Conversion actions were created in Google Ads on 2026-09-06.

export const GOOGLE_ADS_ID = "AW-18427357076";

export const CONVERSIONS = {
  // "טופס ליד - אתר" (lead form submission)
  leadForm: { label: "_OdVCLeBve8cEJTP7NJE", value: 150 },
  // "קליק לטלפון / וואטסאפ - אתר" (click on tel: or WhatsApp link)
  contactClick: { label: "9njRCL2Bve8cEJTP7NJE", value: 100 },
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
  const { label, value } = CONVERSIONS[key];
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    value,
    currency: "ILS",
    ...extra,
  });
}
