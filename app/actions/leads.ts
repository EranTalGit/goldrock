"use server";

import { getDb } from "@/lib/db";
import { SERVICES } from "@/lib/site";

export type LeadState = {
  ok: boolean;
  message: string;
};

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
    return { ok: false, message: "צריך שם ומספר טלפון." };
  }

  if (phone.replace(/\D/g, "").length < 9) {
    return { ok: false, message: "מספר הטלפון לא נראה תקין." };
  }

  const allowed = new Set(SERVICES.map((s) => s.title));
  const safeService = allowed.has(service) ? service : service || "לא צוין";

  const db = getDb();
  if (!db) {
    return {
      ok: true,
      message: "הפרטים התקבלו. עכשיו אפשר להמשיך בוואטסאפ לתיאום מהיר.",
    };
  }

  try {
    await db.query(
      `insert into leads (name, phone, city, service, message, source, status)
       values ($1, $2, $3, $4, $5, $6, 'new')`,
      [name, phone, city, safeService, message, source],
    );
  } catch {
    return {
      ok: false,
      message: "לא הצלחנו לשמור את הפנייה. נסו שוב או פנו בוואטסאפ.",
    };
  }

  return {
    ok: true,
    message: "קיבלנו. נחזור אליכם בהקדם, או המשיכו עכשיו בוואטסאפ.",
  };
}
