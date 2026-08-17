import Link from "next/link";

export type Crumb = { label: string; href: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="פירורי לחם" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {i === items.length - 1 ? (
              <span className="text-cream/80">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-gold-soft">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
