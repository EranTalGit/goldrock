import Link from "next/link";
import {
  CITIES,
  DEFAULT_WA_MESSAGE,
  GALLERY,
  GENERAL_FAQ,
  PHONE_DISPLAY,
  PHONE_HREF,
  PROCESS,
  SERVICES,
  whatsappLink,
} from "@/lib/site";
import ContactForm from "@/app/components/ContactForm";

export default function RoomsDesign() {
  return (
    <div className="rooms">
      <nav className="rooms-nav" aria-label="חדרי האתר">
        <a href="#r-enter">01 כניסה</a>
        <a href="#r-slabs">02 לוחות</a>
        <a href="#r-walk">03 סדר</a>
        <a href="#r-map">04 מפה</a>
        <a href="#r-walls">05 קירות</a>
        <a href="#r-ask">06 שאלות</a>
        <a href="#r-call">07 הזמנה</a>
      </nav>

      <section className="rooms-room" id="r-enter">
        <img
          src="/assets/hero.webp"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.38 }}
        />
        <div className="rooms-hero-type">
          <p style={{ color: "#d7ff4a", letterSpacing: "0.18em", fontSize: 12 }}>GOLDROCK · חדר 01</p>
          <h1>רצפה. חדר. ברק.</h1>
          <p style={{ maxWidth: 420, marginTop: 16, lineHeight: 1.7 }}>
            כל גלילה היא מעבר חדר. לא סקשן רגיל. פוליש לשיש בגוש דן, בנוי כמו דירה שעוברים בה.
          </p>
          <a href={PHONE_HREF} dir="ltr" style={{ color: "#d7ff4a" }}>
            {PHONE_DISPLAY}
          </a>
        </div>
      </section>

      <section className="rooms-room" id="r-slabs">
        <div className="rooms-slab-track">
          {SERVICES.map((service, i) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="rooms-slab">
              <img src={service.image} alt="" />
              <div>
                <span style={{ color: "#d7ff4a" }}>0{i + 1}</span>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rooms-room rooms-stack" id="r-walk">
        <div>
          <p style={{ color: "#d7ff4a" }}>חדר 03</p>
          <h2>הולכים לפי הסדר</h2>
          {PROCESS.map((step, i) => (
            <p key={step.title} style={{ fontSize: 22, margin: "10px 0" }}>
              <span style={{ color: "#d7ff4a" }}>{i + 1} </span>
              {step.title} - {step.text}
            </p>
          ))}
        </div>
      </section>

      <section className="rooms-room rooms-stack" id="r-map">
        <div>
          <p style={{ color: "#d7ff4a" }}>חדר 04</p>
          <h2>המפה על הקיר</h2>
          <p style={{ maxWidth: 640, lineHeight: 2.1, fontSize: 20 }}>
            {CITIES.map((city) => (
              <Link key={city.slug} href={`/areas/${city.slug}`} style={{ color: "#f4f1e8", marginLeft: 14 }}>
                {city.name}
              </Link>
            ))}
          </p>
        </div>
      </section>

      <section className="rooms-room" id="r-walls" style={{ minHeight: "auto" }}>
        <div className="rooms-masonry">
          {GALLERY.map((item) => (
            <figure key={item.src}>
              <img src={item.src} alt={item.alt} />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="rooms-room rooms-stack" id="r-ask">
        <div style={{ maxWidth: 720 }}>
          <p style={{ color: "#d7ff4a" }}>חדר 06</p>
          <h2>שואלים בקול</h2>
          {GENERAL_FAQ.map((item) => (
            <details key={item.q} style={{ padding: "12px 0", borderTop: "1px solid #ffffff18" }}>
              <summary style={{ cursor: "pointer", fontSize: 22 }}>{item.q}</summary>
              <p style={{ lineHeight: 1.7 }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rooms-room rooms-cta" id="r-call">
        <div>
          <h2
            style={{
              fontFamily: "var(--font-rooms-display), Karantina, sans-serif",
              fontSize: "clamp(3.5rem, 12vw, 8rem)",
              lineHeight: 0.85,
              color: "#fff",
              margin: 0,
            }}
          >
            תיכנסו לחדר
          </h2>
          <p style={{ margin: "18px 0 28px" }}>וואטסאפ עם תמונה, או טופס קצר כאן.</p>
          <a href={whatsappLink(DEFAULT_WA_MESSAGE)}>וואטסאפ</a>
          <a href={PHONE_HREF} dir="ltr">
            {PHONE_DISPLAY}
          </a>
          <div style={{ maxWidth: 420, margin: "36px auto 0", textAlign: "right" }}>
            <ContactForm source="design-rooms" />
          </div>
        </div>
      </section>
    </div>
  );
}
