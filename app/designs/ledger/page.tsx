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

export default function LedgerDesign() {
  return (
    <div className="ledger">
      <header className="ledger-nav">
        <div>
          <div className="display" style={{ fontSize: 28 }}>
            Goldrock
          </div>
          <div className="ledger-kicker">פנקס עבודה · גוש דן</div>
        </div>
        <a className="ledger-stamp" href={PHONE_HREF} dir="ltr">
          {PHONE_DISPLAY}
        </a>
      </header>

      <section className="ledger-hero">
        <div>
          <p className="ledger-kicker">רשומה 001</p>
          <h1 className="ledger-giant">שיש</h1>
          <p style={{ maxWidth: 460, fontSize: 18, lineHeight: 1.7, marginTop: 20 }}>
            לא עוד גריד של כרטיסים. פנקס: מה הרצפה, מה נעשה, כמה זמן, ואיך מזמינים.
            פוליש, ליטוש והברקה בגוש דן.
          </p>
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            style={{ color: "#8d6b2f", fontWeight: 600 }}
          >
            לשלוח תמונה לפנקס
          </a>
        </div>
        <figure className="ledger-polaroid">
          <img src="/assets/hero.webp" alt="רצפת שיש מבריקה" />
          <figcaption style={{ marginTop: 10, fontSize: 12 }}>
            רצפה אחרי ליטוש. לא עבודת לקוח מתועדת.
          </figcaption>
        </figure>
      </section>

      <section className="ledger-section">
        <p className="ledger-kicker">חשבון שירותים</p>
        <h2 className="display" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", margin: "8px 0 24px" }}>
          שורות, לא כרטיסים
        </h2>
        {SERVICES.map((service, i) => (
          <Link key={service.slug} href={`/services/${service.slug}`} className="ledger-row">
            <span className="ledger-num">{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span className="ledger-row-title display" style={{ fontSize: 28 }}>
                {service.title}
              </span>
              <span style={{ display: "block", opacity: 0.7, marginTop: 4 }}>
                {service.description}
              </span>
            </span>
            <span>←</span>
          </Link>
        ))}
      </section>

      <section className="ledger-section">
        <p className="ledger-kicker">סדר עבודה</p>
        <h2 className="display" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
          כמו קבלה
        </h2>
        <ol style={{ listStyle: "none", padding: 0, margin: "28px 0 0" }}>
          {PROCESS.map((step, i) => (
            <li
              key={step.title}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: 16,
                padding: "16px 0",
                borderBottom: "1px dotted #16130f55",
              }}
            >
              <span className="ledger-num">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <strong>{step.title}</strong>
                <span style={{ display: "block", opacity: 0.7 }}>{step.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="ledger-section">
        <p className="ledger-kicker">אזורי שירות</p>
        <p className="ledger-cities">
          {CITIES.map((city, i) => (
            <span key={city.slug}>
              <Link href={`/areas/${city.slug}`}>{city.name}</Link>
              {i < CITIES.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>

      <section className="ledger-section">
        <p className="ledger-kicker">הערות שוליים</p>
        <h2 className="display" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
          שאלות בעמודים
        </h2>
        <div className="ledger-faq">
          {GENERAL_FAQ.map((item) => (
            <details key={item.q}>
              <summary style={{ cursor: "pointer", fontWeight: 600 }}>{item.q}</summary>
              <p style={{ marginTop: 8, lineHeight: 1.7 }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="ledger-coupon">
        <div>
          <p className="ledger-kicker">תלישה</p>
          <h2 className="display" style={{ fontSize: 40, margin: "8px 0" }}>
            השאירו פרטים
          </h2>
          <p>או התקשרו. הפנקס נפתח בשיחה אחת.</p>
        </div>
        <ContactForm source="design-ledger" />
      </section>
    </div>
  );
}
