"use client";

import { useEffect, useState } from "react";
import { THEMES, type ThemeId } from "@/lib/themes";

function applyTheme(id: ThemeId) {
  document.documentElement.setAttribute("data-theme", id);
  localStorage.setItem("goldrock-theme", id);
}

export default function ThemePreview() {
  const [active, setActive] = useState<ThemeId>("night");

  useEffect(() => {
    const stored = localStorage.getItem("goldrock-theme") as ThemeId | null;
    if (stored && THEMES.some((t) => t.id === stored)) setActive(stored);
  }, []);

  function choose(id: ThemeId) {
    setActive(id);
    applyTheme(id);
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => choose(theme.id)}
            className={`rounded-full px-5 py-2 text-sm font-semibold ${
              active === theme.id ? "btn-gold" : "btn-ghost"
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => choose(theme.id)}
            className={`overflow-hidden rounded-2xl border text-right transition-transform hover:-translate-y-0.5 ${
              active === theme.id ? "border-gold" : "border-gold/20"
            }`}
          >
            <div data-theme={theme.id} className="bg-obsidian p-5 text-cream">
              <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-gold">
                <span>GOLDROCK</span>
                <span>הזמנה</span>
              </div>
              <div className="mt-6 h-24 rounded-xl bg-charcoal">
                <div className="flex h-full items-end p-3">
                  <p className="font-display text-lg leading-tight">
                    פוליש לשיש שמחזיר ברק
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-paper p-2 text-[10px] text-ink">פוליש</div>
                <div className="rounded-lg bg-paper p-2 text-[10px] text-ink">מדרגות</div>
                <div className="rounded-lg bg-paper p-2 text-[10px] text-ink">פורצלן</div>
              </div>
              <span className="btn-gold mt-4 inline-block rounded-full px-3 py-1 text-[11px]">
                שיחה בוואטסאפ
              </span>
            </div>
            <div className="bg-charcoal px-5 py-4">
              <p className="text-sm font-semibold text-gold-soft">{theme.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{theme.pitch}</p>
              {active === theme.id ? (
                <p className="mt-2 text-xs text-gold">מוחל על כל האתר עכשיו</p>
              ) : (
                <p className="mt-2 text-xs text-cream/50">לחצו להחלה</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
