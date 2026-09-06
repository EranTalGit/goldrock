import { Resend } from "resend";
import { BUSINESS_NAME_HE } from "@/lib/site";
import { leadHtml, leadSubject, leadText, type LeadEmailInput } from "@/lib/lead-email";

export type { LeadEmailInput };

const DEFAULT_TO = "siyahooshani@gmail.com";
const DEFAULT_FROM = `${BUSINESS_NAME_HE} <leads@gold-rock.co.il>`;

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
      subject: leadSubject(lead),
      text: leadText(lead),
      html: leadHtml(lead),
    },
    { idempotencyKey: `lead-notification/${lead.id}` },
  );

  return !error;
}
