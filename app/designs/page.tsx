import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "שלושה עיצובים מלאים",
  robots: { index: false, follow: false },
};

const OPTIONS = [
  {
    href: "/designs/ledger",
    num: "01",
    name: "פנקס האבן",
    structure:
      "גיבור טיפוגרפי ענק בלי הירו מלא. שירותים כשורות פנקס, לא כרטיסים. ערים כטקסט זורם. שאלות בשני טורים כמו עיתון. סיום כקופון קרוע.",
  },
  {
    href: "/designs/mirror",
    num: "02",
    name: "השתקפות",
    structure:
      "מסך מפוצל. תמונה דביקה משמאל שמתחלפת לפי הפרק. מימין נרטיב ארוך. שירותים כשמות ענקיים, בלי גריד.",
  },
  {
    href: "/designs/rooms",
    num: "03",
    name: "חדרים",
    structure:
      "כל סקשן הוא חדר בגובה המסך. שירותים בגלילה אופקית. ניווט אנכי כמו מקרא תוכנית. גלריה בטורים שבורים. CTA על הרצפה.",
  },
];

export default function DesignsIndex() {
  return (
    <main
      style={{
        minHeight: "100svh",
        background: "#0b0b0b",
        color: "#f2eee6",
        padding: "8vh 6vw 12vh",
      }}
    >
      <p style={{ letterSpacing: "0.2em", fontSize: 12, color: "#c9a46a" }}>
        לא פלטות צבע. שלושה אתרים שלמים.
      </p>
      <h1
        style={{
          fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
          lineHeight: 1.05,
          maxWidth: 720,
          margin: "16px 0 48px",
        }}
      >
        בחרו מבנה. כל אפשרות היא דף בית מלא עם סקשנים, ניווט והמרה.
      </h1>
      <ol style={{ display: "grid", gap: 20, listStyle: "none", padding: 0, margin: 0 }}>
        {OPTIONS.map((option) => (
          <li key={option.href} style={{ borderTop: "1px solid #ffffff22", paddingTop: 20 }}>
            <Link href={option.href} style={{ color: "inherit", textDecoration: "none" }}>
              <span style={{ color: "#c9a46a" }}>{option.num}</span>
              <strong style={{ display: "block", fontSize: "clamp(2rem, 5vw, 3.4rem)", marginTop: 6 }}>
                {option.name}
              </strong>
              <p style={{ maxWidth: 640, lineHeight: 1.7, color: "#cfc8bb" }}>{option.structure}</p>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
