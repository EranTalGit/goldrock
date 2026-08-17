import { CITIES, SERVICES, SITE_URL } from "@/lib/site";
import { POSTS } from "@/lib/blog";

export function GET() {
  const body = `# Goldrock

> פוליש לשיש, ליטוש, הברקה וחידוש מדרגות בתל אביב, גוש דן והמרכז.
> טלפון / וואטסאפ: 053-273-3999

Goldrock (גולדרוק) הוא שירות מקומי לחידוש רצפות אבן. לא מחליפים ריצוף כשאפשר להחזיר ברק בליטוש.

## שירותים
${SERVICES.map((s) => `- [${s.title}](${SITE_URL}/services/${s.slug}): ${s.description}`).join("\n")}

## אזורים
${CITIES.map((c) => `- [${c.name}](${SITE_URL}/areas/${c.slug})`).join("\n")}

## מדריך
${POSTS.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug})`).join("\n")}

## הזמנה
הדרך המהירה: וואטסאפ עם תמונת הרצפה. אפשר גם טופס ב-${SITE_URL}/contact
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
