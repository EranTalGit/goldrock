"use client";

import { useActionState } from "react";
import { submitLead, type LeadState } from "@/app/actions/leads";
import { CITIES, DEFAULT_WA_MESSAGE, SERVICES, whatsappLink } from "@/lib/site";

const initial: LeadState = { ok: false, message: "" };

const field = "field-dark mt-1.5 w-full rounded-xl px-4 py-3";
const label = "block text-sm font-medium tracking-wide text-[#E8E2D4]";

export default function ContactForm({ source = "contact-form" }: { source?: string }) {
  const [state, action, pending] = useActionState(submitLead, initial);

  return (
    <form action={action} className="form-dark space-y-4">
      <input type="hidden" name="source" value={source} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>
          שם מלא
          <input name="name" required className={field} />
        </label>
        <label className={label}>
          טלפון
          <input name="phone" required inputMode="tel" className={field} dir="ltr" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
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
        <label className={label}>
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
      <label className={label}>
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
        className="btn-gold-metal arrow-link w-full rounded-xl py-4 text-base"
      >
        {pending ? "שולחים..." : <>שלחו הצעת מחיר <span className="arrow">←</span></>}
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
