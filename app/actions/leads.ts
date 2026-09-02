"use server";

import { getDb } from "@/lib/db";
import { SERVICES } from "@/lib/site";

export type LeadState = {
  ok: boolean;
  message: string;
  /** Drives the colour of the reply under the form. */
  tone?: "success" | "warning" | "error";
};

/**
 * Israeli numbers, however they are typed: mobile 05x/07x is ten digits,
 * landline 02/03/04/08/09 is nine. A leading +972 counts as the zero.
 */
function normalisePhone(input: string): string | null {
  const digits = input.replace(/\D/g, "").replace(/^972/, "0");
  const valid = /^0(?:5\d{8}|7\d{8}|[23489]\d{7})$/.test(digits);
  return valid ? digits : null;
}

export async function submitLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const source = String(formData.get("source") ?? "contact-form").trim();

  if (!name || !phone) {
    return { ok: false, tone: "error", message: "צריך למלא שם ומספר טלפון." };
  }

  const normalisedPhone = normalisePhone(phone);
  if (!normalisedPhone) {
    return {
      ok: false,
      tone: "error",
      message: "מספר הטלפון לא תקין. הזינו מספר ישראלי, למשל 050-1234567.",
    };
  }

  const allowed = new Set(SERVICES.map((s) => s.title));
  const safeService = allowed.has(service) ? service : service || "לא צוין";

  const db = getDb();
  if (!db) {
    // Nothing is stored without a database, so do not claim the enquiry
    // was received - send them somewhere that actually reaches us.
    return {
      ok: true,
      tone: "warning",
      message: "הטופס אינו מחובר עדיין, והפנייה לא נשמרה. שלחו לנו הודעה בוואטסאפ ונחזור אליכם מיד.",
    };
  }

  try {
    await db.query(
      `insert into leads (name, phone, city, service, message, source, status)
       values ($1, $2, $3, $4, $5, $6, 'new')`,
      [name, normalisedPhone, city, safeService, message, source],
    );
  } catch {
    return {
      ok: false,
      tone: "error",
      message: "לא הצלחנו לשמור את הפנייה. נסו שוב או פנו אלינו בוואטסאפ.",
    };
  }

  return {
    ok: true,
    tone: "success",
    message: "קיבלנו. נחזור אליכם בהקדם, או המשיכו עכשיו בוואטסאפ.",
  };
}
