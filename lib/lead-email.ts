/**
 * The lead notification's wording and markup, kept apart from the sending
 * so it can be rendered and looked at without a mail going anywhere.
 */

export type LeadEmailInput = {
  id: string;
  name: string;
  phone: string;
  city: string;
  service: string;
  message: string;
  source: string;
};

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

export function leadSubject(lead: LeadEmailInput): string {
  return `פנייה חדשה מהאתר: ${lead.name}`;
}

export function leadText(lead: LeadEmailInput): string {
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

export function leadHtml(lead: LeadEmailInput): string {
  return `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.6;color:#1a1a1a">
  <h2 style="margin:0 0 16px">פנייה חדשה מאתר גולדרוק</h2>
  <table style="border-collapse:collapse;width:100%;max-width:520px">
    <tr><td style="padding:8px 0;color:#6B655C;width:110px">שם</td><td style="padding:8px 0;font-weight:600">${cell(lead.name)}</td></tr>
    <tr><td style="padding:8px 0;color:#6B655C">טלפון</td><td style="padding:8px 0;font-weight:600;direction:ltr;text-align:right">${cell(lead.phone)}</td></tr>
    <tr><td style="padding:8px 0;color:#6B655C">עיר</td><td style="padding:8px 0;font-weight:600">${cell(lead.city)}</td></tr>
    <tr><td style="padding:8px 0;color:#6B655C">שירות</td><td style="padding:8px 0;font-weight:600">${cell(lead.service)}</td></tr>
    <tr><td style="padding:8px 0;color:#6B655C">הודעה</td><td style="padding:8px 0;font-weight:600;white-space:pre-wrap">${cell(lead.message)}</td></tr>
    <tr><td style="padding:8px 0;color:#6B655C">מקור</td><td style="padding:8px 0;font-weight:600">${cell(lead.source)}</td></tr>
  </table>
</div>`;
}
