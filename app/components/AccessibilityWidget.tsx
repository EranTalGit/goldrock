"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const KEY = "goldrock_a11y";
const FONT_LEVELS = [100, 115, 130, 145, 160];

type Toggle = "readable" | "spacing" | "links" | "noanim" | "cursor" | "gray";
type Contrast = "dark" | "light" | null;

type Prefs = {
  font: number;
  contrast: Contrast;
} & Partial<Record<Toggle, boolean>>;

const TOGGLES: { key: Toggle; label: string; icon: React.ReactNode }[] = [
  {
    key: "gray",
    label: "גווני אפור",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 0 0 18" />
      </>
    ),
  },
  {
    key: "links",
    label: "הדגשת קישורים",
    icon: (
      <>
        <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
        <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
      </>
    ),
  },
  {
    key: "readable",
    label: "פונט קריא",
    icon: <path d="M4 7V5h16v2M9 20h6M12 5v15" />,
  },
  {
    key: "spacing",
    label: "ריווח שורות",
    icon: <path d="M4 6h16M4 12h16M4 18h16" />,
  },
  {
    key: "noanim",
    label: "עצירת אנימציות",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6v6H9z" />
      </>
    ),
  },
  {
    key: "cursor",
    label: "סמן גדול",
    icon: <path d="M4 3l16 9-7 1 4 8-3 1-4-8-6 5z" />,
  },
];

const DEFAULTS: Prefs = { font: 0, contrast: null };

export default function AccessibilityWidget() {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  // Read once on mount rather than during render, so the server and the
  // first client paint agree. This is the "read from an external system"
  // case: doing it during render would break hydration, and deferring it
  // would flash the unstyled defaults before the saved ones land.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setPrefs({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {
      /* storage unavailable - carry on with defaults */
    }
    setReady(true);
  }, []);

  // Push the choices onto <html> and remember them.
  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.style.fontSize = `${FONT_LEVELS[prefs.font] ?? 100}%`;
    for (const { key } of TOGGLES) {
      root.classList.toggle(`a11y-${key}`, Boolean(prefs[key]));
    }
    root.classList.toggle("a11y-contrast", prefs.contrast === "dark");
    root.classList.toggle("a11y-contrast-light", prefs.contrast === "light");
    try {
      localStorage.setItem(KEY, JSON.stringify(prefs));
    } catch {
      /* nothing to do if storage is blocked */
    }
  }, [prefs, ready]);

  // Escape closes; so does a click outside the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !fabRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const step = useCallback((by: number) => {
    setPrefs((p) => ({
      ...p,
      font: Math.max(0, Math.min(FONT_LEVELS.length - 1, p.font + by)),
    }));
  }, []);

  const btn =
    "flex flex-col items-center gap-1.5 rounded-xl border border-white/14 bg-white/[0.04] px-2 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-white/10";

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        aria-label="פתיחת תפריט נגישות"
        aria-expanded={open}
        aria-controls="a11y-panel"
        title="נגישות"
        onClick={() => setOpen((v) => !v)}
        className="fixed right-0 top-1/2 z-[95] grid h-[58px] w-[46px] -translate-y-1/2 place-items-center rounded-l-2xl border border-r-0 border-gold/50 bg-[#161616] text-gold shadow-[-6px_0_24px_-8px_rgba(0,0,0,0.7)] transition-colors hover:bg-[#1f1f1f] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-6 w-6">
          <circle cx="12" cy="3.6" r="2" />
          <path d="M20 7.2c-2.5.7-5 1-8 1s-5.5-.3-8-1a1 1 0 1 0-.5 1.9c1.9.5 3.8.8 5.7.9v3l-1.9 6.6a1 1 0 0 0 1.9.6L11 15h2l1.8 6.1a1 1 0 0 0 1.9-.6L14.8 14v-3c1.9-.1 3.8-.4 5.7-.9a1 1 0 1 0-.5-1.9z" />
        </svg>
      </button>

      {open ? (
        <aside
          ref={panelRef}
          id="a11y-panel"
          role="dialog"
          aria-label="תפריט נגישות"
          className="fixed right-[52px] top-1/2 z-[96] max-h-[calc(100vh-40px)] w-[320px] max-w-[calc(100vw-70px)] -translate-y-1/2 overflow-auto rounded-2xl border border-gold/25 bg-[#111111] p-4 text-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)]"
        >
          <h2 className="font-display text-[17px] font-bold">תפריט נגישות</h2>
          <p className="mb-3 mt-0.5 text-[12px] text-white/55">
            התאימו את האתר לצרכים שלכם
          </p>

          <div className="mb-2.5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="הקטנת גודל הטקסט"
              className="flex-1 rounded-xl border border-white/14 bg-white/[0.04] py-2.5 text-[17px] font-extrabold hover:bg-white/10"
            >
              א-
            </button>
            <span className="min-w-14 text-center text-[12px] font-semibold text-white/55">
              {FONT_LEVELS[prefs.font] ?? 100}%
            </span>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="הגדלת גודל הטקסט"
              className="flex-1 rounded-xl border border-white/14 bg-white/[0.04] py-2.5 text-[17px] font-extrabold hover:bg-white/10"
            >
              א+
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              aria-pressed={prefs.contrast === "dark"}
              onClick={() =>
                setPrefs((p) => ({
                  ...p,
                  contrast: p.contrast === "dark" ? null : "dark",
                }))
              }
              className={`${btn} ${
                prefs.contrast === "dark" ? "!border-gold !bg-gold/25" : ""
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="h-5 w-5">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v18" fill="currentColor" />
              </svg>
              ניגודיות כהה
            </button>

            <button
              type="button"
              aria-pressed={prefs.contrast === "light"}
              onClick={() =>
                setPrefs((p) => ({
                  ...p,
                  contrast: p.contrast === "light" ? null : "light",
                }))
              }
              className={`${btn} ${
                prefs.contrast === "light" ? "!border-gold !bg-gold/25" : ""
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="h-5 w-5">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v3M12 20v3M4 12H1M23 12h-3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
              </svg>
              ניגודיות בהירה
            </button>

            {TOGGLES.map(({ key, label, icon }) => (
              <button
                key={key}
                type="button"
                aria-pressed={Boolean(prefs[key])}
                onClick={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))}
                className={`${btn} ${prefs[key] ? "!border-gold !bg-gold/25" : ""}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-5 w-5"
                >
                  {icon}
                </svg>
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPrefs(DEFAULTS)}
            className="mt-3 w-full rounded-xl border border-red-400/40 py-2.5 text-[13px] font-bold text-red-300 hover:bg-red-500/10"
          >
            איפוס הגדרות נגישות
          </button>

          <p className="mt-3 text-center text-[12px]">
            <Link href="/accessibility" className="text-gold underline">
              להצהרת הנגישות המלאה
            </Link>
          </p>
        </aside>
      ) : null}
    </>
  );
}
