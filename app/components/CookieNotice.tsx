"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const KEY = "goldrock_consent";

/** Lets the privacy page reopen the choice. */
export const CONSENT_KEY = KEY;

export default function CookieNotice() {
  const [shown, setShown] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  // Everything else pinned to the bottom of the window - the floating
  // buttons and the mobile bar - reads its own offset from this, so they
  // ride above the notice while it is up and settle back when it goes.
  useEffect(() => {
    const root = document.documentElement;
    const el = box.current;

    if (!shown || !el) {
      root.style.setProperty("--cookie-h", "0px");
      root.removeAttribute("data-cookie");
      return;
    }

    root.setAttribute("data-cookie", "open");

    const publish = () =>
      root.style.setProperty("--cookie-h", `${el.offsetHeight}px`);
    publish();

    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(publish) : null;
    observer?.observe(el);

    return () => {
      observer?.disconnect();
      root.style.setProperty("--cookie-h", "0px");
      root.removeAttribute("data-cookie");
    };
  }, [shown]);

  // Same exception: the answer lives in storage, and the banner must not
  // render on the server or it would mismatch for anyone who already
  // answered.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!localStorage.getItem(KEY)) setShown(true);
    } catch {
      // Storage blocked: no way to remember an answer, so do not ask.
    }

    const reopen = () => setShown(true);
    window.addEventListener("goldrock:consent-reopen", reopen);
    return () => window.removeEventListener("goldrock:consent-reopen", reopen);
  }, []);

  function answer(all: boolean) {
    try {
      localStorage.setItem(KEY, all ? "all" : "essential");
    } catch {
      /* the banner still closes either way */
    }
    setShown(false);
  }

  if (!shown) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="הודעה על שימוש בעוגיות"
      ref={box}
      className="fixed inset-x-0 bottom-0 z-[120] border-t border-gold/25 bg-[#111111]/97 px-4 py-4 backdrop-blur-md sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center min-[760px]:flex-row min-[760px]:justify-between min-[760px]:text-right">
        <p className="text-[14px] leading-relaxed text-white/80">
          נשמח למדוד את השימוש באתר כדי לשפר אותו. מדידה תופעל רק אם תאשרו - עד אז, ובכל מקרה כרגע, שום דבר לא נמדד.{" "}
          <Link href="/privacy" className="font-semibold text-gold underline">
            מדיניות הפרטיות
          </Link>
        </p>

        <div className="flex w-full shrink-0 gap-3 min-[760px]:w-auto">
          <button
            type="button"
            onClick={() => answer(true)}
            className="flex-1 rounded-xl bg-[#D4AF37] px-6 py-3 font-bold text-white transition-colors hover:bg-[#e0bd4a] min-[760px]:flex-none"
          >
            מאשר/ת הכל
          </button>
          <button
            type="button"
            onClick={() => answer(false)}
            className="flex-1 rounded-xl border border-white/25 px-6 py-3 font-semibold text-white/85 transition-colors hover:border-white/50 hover:text-white min-[760px]:flex-none"
          >
            רק ההכרחיות
          </button>
        </div>
      </div>
    </div>
  );
}
