"use client";

import { useState } from "react";
import { CONSENT_KEY } from "./CookieNotice";

/** Clears the stored answer and brings the cookie notice back up. */
export default function ConsentReset() {
  const [done, setDone] = useState(false);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => {
          try {
            localStorage.removeItem(CONSENT_KEY);
          } catch {
            /* the notice still reopens for this visit */
          }
          window.dispatchEvent(new Event("goldrock:consent-reopen"));
          setDone(true);
        }}
        className="inline-flex rounded-xl border border-gold px-6 py-3 font-semibold text-gold transition-colors hover:bg-gold/10"
      >
        שינוי הבחירה בעוגיות
      </button>
      {done ? (
        <p role="status" className="mt-3 text-sm text-gold">
          הודעת העוגיות נפתחה מחדש בתחתית המסך.
        </p>
      ) : null}
    </div>
  );
}
