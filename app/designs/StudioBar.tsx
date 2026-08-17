"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/designs", label: "השוואה" },
  { href: "/designs/ledger", label: "1 פנקס" },
  { href: "/designs/mirror", label: "2 השתקפות" },
  { href: "/designs/rooms", label: "3 חדרים" },
];

export default function StudioBar() {
  const path = usePathname();

  return (
    <div className="studio-bar">
      <strong>סטודיו Goldrock</strong>
      <nav style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} data-on={path === link.href ? "1" : "0"}>
            {link.label}
          </Link>
        ))}
        <Link href="/">חזרה לאתר החי</Link>
      </nav>
    </div>
  );
}
