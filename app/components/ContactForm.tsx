"use client";

import { useActionState } from "react";
import { submitLead, type LeadState } from "@/app/actions/leads";
import { CITIES, DEFAULT_WA_MESSAGE, SERVICES, whatsappLink } from "@/lib/site";

const initial: LeadState = { ok: false, message: "" };

const TONE_CLASS: Record<string, string> = {
  success: "text-gold-soft",
  warning: "text-[#E8C766]",
  error: "text-red-300",
};

const TONE_CLASS_LIGHT: Record<string, string> = {
  success: "text-[#1f7a3d]",
  warning: "text-[#8a6412]",
  error: "text-[#a51f1f]",
};

/** Marks a field the form will not submit without. */
function Required() {
  return (
    <span className="text-gold" aria-hidden>
      {" "}
      *
    </span>
  );
}

export default function ContactForm({
  source = "contact-form",
  /** "dark" sits on the obsidian panel; "light" on a pearl card. */
  tone = "dark",
  /** Drops the city field, for the shorter contact-page version. */
  compact = false,
  /** Preselects the service, so a service page arrives already answered. */
  defaultService = "",
}: {
  source?: string;
  tone?: "dark" | "light";
  compact?: boolean;
  defaultService?: string;
}) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const replyTone = state.tone ?? (state.ok ? "success" : "error");
  const light = tone === "light";

  const field = `${light ? "field-light" : "field-dark"} mt-1.5 w-full rounded-xl px-4 py-2.5 text-[16px]`;
  const label = `block text-right text-[16px] tracking-wide ${
    light ? "font-semibold text-[#2C2C2C]" : "font-medium text-[#E8E2D4]"
  }`;

  return (
    <form action={action} className={`${light ? "" : "form-dark"} space-y-3`}>
      <input type="hidden" name="source" value={source} />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className={label}>
          שם מלא
          <Required />
          <input name="name" required className={field} />
        </label>
        <label className={label}>
          טלפון
          <Required />
          <input
            name="phone"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="050-1234567"
            className={field}
            dir="ltr"
          />
        </label>
      </div>

      <div className={compact ? "" : "grid gap-3 sm:grid-cols-2"}>
        {compact ? null : (
          <label className={label}>
            עיר
            <select name="city" className={field} defaultValue="">
              <option value="">בחירה</option>
              {CITIES.map((city) => (
                <option key={city.slug} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className={label}>
          סוג השירות
          <select name="service" className={field} defaultValue={defaultService}>
            <option value="">בחירה</option>
            {SERVICES.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="אחר">אחר</option>
          </select>
        </label>
      </div>

      <label className={label}>
        הודעה / סוג הרצפה
        <textarea
          name="message"
          rows={3}
          className={field}
          placeholder="סוג הרצפה, גודל בערך, מתי נוח"
        />
      </label>

      <p
        className={`text-center text-xs ${
          light ? "text-[#6B655C]" : "text-[#E8E2D4]/50"
        }`}
      >
        שדות המסומנים ב<span className="text-gold">*</span> הם חובה
      </p>

      <button
        type="submit"
        disabled={pending}
        className="btn-gold-metal arrow-link w-full rounded-xl py-3.5 text-base"
      >
        {pending ? (
          "שולחים..."
        ) : (
          <>
            שליחת בקשה להצעת מחיר <span className="arrow">←</span>
          </>
        )}
      </button>

      {state.message ? (
        <p
          role="status"
          aria-live="polite"
          className={`text-center text-sm font-medium leading-relaxed ${
            (light ? TONE_CLASS_LIGHT : TONE_CLASS)[replyTone]
          }`}
        >
          {state.message}
        </p>
      ) : null}
      {state.ok ? (
        <a
          href={whatsappLink(DEFAULT_WA_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-sm font-semibold text-gold"
        >
          להמשיך בוואטסאפ
        </a>
      ) : null}
    </form>
  );
}
