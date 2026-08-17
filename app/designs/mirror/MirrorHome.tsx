"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CITIES,
  DEFAULT_WA_MESSAGE,
  GENERAL_FAQ,
  PHONE_DISPLAY,
  PHONE_HREF,
  PROCESS,
  SERVICES,
  whatsappLink,
} from "@/lib/site";
import ContactForm from "@/app/components/ContactForm";

const FRAMES = [
  { id: "enter", src: "/assets/hero.webp", alt: "רצפת שיש בסלון" },
  { id: "work", src: "/assets/services/marble-polish.webp", alt: "שיש אחרי ליטוש" },
  { id: "steps", src: "/assets/services/stairs.webp", alt: "מדרגות שיש" },
  { id: "ask", src: "/assets/gallery/dark-marble.webp", alt: "שיש כהה" },
  { id: "write", src: "/assets/gallery/marble-living.webp", alt: "סלון עם שיש" },
];

export default function MirrorHome() {
  const [active, setActive] = useState("enter");
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const els = Object.values(refs.current).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { threshold: [0.35, 0.55] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mirror">
      <header className="mirror-nav">
        <span>GOLDROCK</span>
        <a href={PHONE_HREF} dir="ltr" style={{ color: "#c4a05a" }}>
          {PHONE_DISPLAY}
        </a>
      </header>
      <div className="mirror-shell">
        <div className="mirror-stage" aria-hidden>
          {FRAMES.map((frame) => (
            <img
              key={frame.id}
              src={frame.src}
              alt=""
              className={active === frame.id ? "on" : ""}
            />
          ))}
        </div>
        <div className="mirror-copy">
          <section
            id="enter"
            className="mirror-chapter"
            ref={(el) => {
              refs.current.enter = el;
            }}
          >
            <p className="mirror-meta">פרק א · הכניסה</p>
            <h1 className="mirror-h1">הרצפה מחזירה מבט</h1>
            <p style={{ maxWidth: 460, fontSize: 20, lineHeight: 1.7, marginTop: 20 }}>
              האבן משקפת. האתר גם. בצד אחד התמונה נשארת. בצד השני הסיפור זז.
              פוליש לשיש בגוש דן, בלי כרטיסי שירות ובלי גריד מוכר.
            </p>
            <a className="mirror-wa" href={whatsappLink(DEFAULT_WA_MESSAGE)}>
              שלחו תמונה. נחזיר מחיר.
            </a>
          </section>

          <section
            id="work"
            className="mirror-chapter"
            ref={(el) => {
              refs.current.work = el;
            }}
          >
            <p className="mirror-meta">פרק ב · העבודה</p>
            <h2 className="mirror-h1">שמות השירותים, בגודל האבן</h2>
            <div className="mirror-service" style={{ marginTop: 28 }}>
              {SERVICES.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  {service.title}
                </Link>
              ))}
            </div>
          </section>

          <section
            id="steps"
            className="mirror-chapter"
            ref={(el) => {
              refs.current.steps = el;
            }}
          >
            <p className="mirror-meta">פרק ג · הסדר</p>
            <h2 className="mirror-h1">ארבעה צעדים, בלי אייקונים</h2>
            <ol style={{ padding: 0, marginTop: 28, listStyle: "none" }}>
              {PROCESS.map((step, i) => (
                <li key={step.title} style={{ padding: "18px 0", borderTop: "1px solid #ffffff18" }}>
                  <span className="mirror-meta">0{i + 1}</span>
                  <strong style={{ display: "block", fontSize: 28 }}>{step.title}</strong>
                  <span style={{ opacity: 0.75 }}>{step.text}</span>
                </li>
              ))}
            </ol>
          </section>

          <section
            id="ask"
            className="mirror-chapter"
            ref={(el) => {
              refs.current.ask = el;
            }}
          >
            <p className="mirror-meta">פרק ד · המפה והשאלות</p>
            <h2 className="mirror-h1">גוש דן, שורה אחת</h2>
            <p style={{ marginTop: 20, lineHeight: 2, maxWidth: 520 }}>
              {CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`/areas/${city.slug}`}
                  style={{ color: "#ece7dc", marginLeft: 12 }}
                >
                  {city.name}
                </Link>
              ))}
            </p>
            <div style={{ marginTop: 40 }}>
              {GENERAL_FAQ.slice(0, 5).map((item) => (
                <details key={item.q} style={{ padding: "14px 0", borderTop: "1px solid #ffffff18" }}>
                  <summary style={{ cursor: "pointer" }}>{item.q}</summary>
                  <p style={{ opacity: 0.75, lineHeight: 1.7 }}>{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section
            id="write"
            className="mirror-chapter"
            ref={(el) => {
              refs.current.write = el;
            }}
          >
            <p className="mirror-meta">פרק ה · ההזמנה</p>
            <h2 className="mirror-h1">כתבו. נחזור.</h2>
            <div style={{ maxWidth: 480, marginTop: 24 }}>
              <ContactForm source="design-mirror" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
