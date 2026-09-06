import { Resend } from "resend";
import { BUSINESS_NAME_HE } from "@/lib/site";

export type LeadEmailInput = {
  id: string;
  name: string;
  phone: string;
  city: string;
  service: string;
  message: string;
  source: string;
};

const DEFAULT_TO = "siyahooshani@gmail.com";
const DEFAULT_FROM = `${BUSINESS_NAME_HE} <leads@gold-rock.co.il>`;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function cell(value: string): string {
  return escapeHtml(value.trim() || "לא צוין");
}

function leadText(lead: LeadEmailInput): string {
  return [
    "פנייה חדשה מהאתר",
    `שם: ${lead.name}`,
    `טלפון: ${lead.phone}`,
    `עיר: ${lead.city || "לא צוין"}`,
    `שירות: ${lead.service}`,
    `הודעה: ${lead.message || "לא צוין"}`,
    `מקור: ${lead.source}`,
  ].join("\n");
}

export async function sendLeadNotification(lead: LeadEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.LEAD_NOTIFICATION_EMAIL?.trim() || DEFAULT_TO;
  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send(
    {
      from,
      to: [to],
      subject: `פנייה חדשה מהאתר: ${lead.name}`,
      text: leadText(lead),
      html: `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1a1a">
  <h2 style="margin:0 0 16px">פנייה חדשה מאתר גולדרוק</h2>
  <table style="border-collapse:collapse;width:100%;max-width:520px">
    <tr><td style="padding:8px 0;color:#6B655C;width:110px">שם</td><td style="padding:8px 0;font-weight:600">${cell(lead.name)}</td></tr>
    <tr><td style="padding:8px 0;color:#6B655C">טלפון</td><td style="padding:8px 0;font-weight:600;direction:ltr;text-align:right">${cell(lead.phone)}</td></tr>
    <tr><td style="padding:8px 0;color:#6B655C">עיר</td><td style="padding:8px 0;font-weight:600">${cell(lead.city)}</td></tr>
    <tr><td style="padding:8px 0;color:#6B655C">שירות</td><td style="padding:8px 0;font-weight:600">${cell(lead.service)}</td></tr>
    <tr><td style="padding:8px 0;color:#6B655C">הודעה</td><td style="padding:8px 0;font-weight:600;white-space:pre-wrap">${cell(lead.message)}</td></tr>
    <tr><td style="padding:8px 0;color:#6B655C">מקור</td><td style="padding:8px 0;font-weight:600">${cell(lead.source)}</td></tr>
  </table>
</div>`,
    },
    { idempotencyKey: `lead-notification/${lead.id}` },
  );

  return !error;
}
