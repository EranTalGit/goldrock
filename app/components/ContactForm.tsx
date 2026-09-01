"use client";

import { useActionState } from "react";
import { submitLead, type LeadState } from "@/app/actions/leads";
import { CITIES, DEFAULT_WA_MESSAGE, SERVICES, whatsappLink } from "@/lib/site";

const initial: LeadState = { ok: false, message: "" };

const field =
  "mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white outline-none transition-colors placeholder:text-white/35 focus:border-gold";

export default function ContactForm({ source = "contact-form" }: { source?: string }) {
  const [state, action, pending] = useActionState(submitLead, initial);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="source" value={source} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-white/70">
          שם מלא
          <input name="name" required className={field} />
        </label>
        <label className="block text-sm text-white/70">
          טלפון
          <input name="phone" required inputMode="tel" className={field} dir="ltr" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-white/70">
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
        <label className="block text-sm text-white/70">
          סוג השירות
          <select name="service" className={field} defaultValue="">
            <option value="">בחירה</option>
            {SERVICES.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm text-white/70">
        הודעה / סוג הרצפה
        <textarea
          name="message"
          rows={4}
          className={field}
          placeholder="סוג הרצפה, גודל בערך, מתי נוח"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="btn-gold w-full rounded-2xl py-4 disabled:opacity-60"
      >
        {pending ? "שולחים..." : "שלחו הצעת מחיר ←"}
      </button>
      {state.message ? (
        <p className={state.ok ? "text-gold-soft" : "text-red-300"}>{state.message}</p>
      ) : null}
      {state.ok ? (
        <a
          href={whatsappLink(DEFAULT_WA_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-sm text-gold"
        >
          להמשיך בוואטסאפ
        </a>
      ) : null}
    </form>
  );
}
