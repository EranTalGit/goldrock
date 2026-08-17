"use client";

import { useActionState } from "react";
import { submitLead, type LeadState } from "@/app/actions/leads";
import { CITIES, DEFAULT_WA_MESSAGE, SERVICES, whatsappLink } from "@/lib/site";

const initial: LeadState = { ok: false, message: "" };

export default function ContactForm({ source = "contact-form" }: { source?: string }) {
  const [state, action, pending] = useActionState(submitLead, initial);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="source" value={source} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          שם
          <input
            name="name"
            required
            className="mt-1 w-full rounded-xl border border-gold/20 bg-obsidian px-4 py-3 text-cream outline-none focus:border-gold"
          />
        </label>
        <label className="block text-sm">
          טלפון
          <input
            name="phone"
            required
            inputMode="tel"
            className="mt-1 w-full rounded-xl border border-gold/20 bg-obsidian px-4 py-3 text-cream outline-none focus:border-gold"
            dir="ltr"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          עיר
          <select
            name="city"
            className="mt-1 w-full rounded-xl border border-gold/20 bg-obsidian px-4 py-3 text-cream outline-none focus:border-gold"
            defaultValue=""
          >
            <option value="">בחירה</option>
            {CITIES.map((city) => (
              <option key={city.slug} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          שירות
          <select
            name="service"
            className="mt-1 w-full rounded-xl border border-gold/20 bg-obsidian px-4 py-3 text-cream outline-none focus:border-gold"
            defaultValue=""
          >
            <option value="">בחירה</option>
            {SERVICES.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm">
        הודעה
        <textarea
          name="message"
          rows={4}
          className="mt-1 w-full rounded-xl border border-gold/20 bg-obsidian px-4 py-3 text-cream outline-none focus:border-gold"
          placeholder="סוג הרצפה, גודל בערך, מתי נוח"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="btn-gold w-full rounded-full py-3 disabled:opacity-60"
      >
        {pending ? "שולחים..." : "שלחו הצעת מחיר"}
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
