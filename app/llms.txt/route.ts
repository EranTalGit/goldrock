import { CITIES, GENERAL_FAQ, PHONE_DISPLAY, SERVICES, SITE_URL } from "@/lib/site";
import { POSTS } from "@/lib/blog";

/**
 * The file an assistant reads when it wants to know what this business
 * does. An index of links tells it where to look; what it needs is the
 * answers themselves, in the words a person would ask them - so the
 * questions from the site's own FAQ are here in full, along with the
 * things every caller asks before booking.
 *
 * Everything here is generated from the same data the pages render, so
 * it cannot drift from what a visitor is told.
 */
export function GET() {
  const body = `# Goldrock (גולדרוק)

> פוליש לשיש, ליטוש, הברקה וחידוש מדרגות בתל אביב, גוש דן והמרכז.
> טלפון / וואטסאפ: ${PHONE_DISPLAY}
> אתר: ${SITE_URL}

Goldrock הוא שירות מקומי לחידוש רצפות אבן. העיקרון: לא מחליפים ריצוף כשאפשר
להחזיר את הברק בליטוש. העבודה מתבצעת בבית הלקוח, ברטוב ועם שאיבה, ואפשר
להישאר בבית לאורך רוב התהליך.

## בקצרה
- מה עושים: פוליש וליטוש שיש, קריסטליזציה, חידוש מדרגות ולובי, חידוש מרצפות
  ואבן, טיפול בגרניט פורצלן, ניקיון יסודי לאחר שיפוץ.
- כמה זמן: רוב הדירות והבתים הפרטיים מסתיימים ביום עבודה אחד. בשטחים גדולים
  או ברצפה שדורשת יישור נדרש יום נוסף, ונאמר מראש.
- אבק: ליטוש רטוב עם שואבים תעשייתיים ומסנני HEPA. אין אבק בבית.
- אחריות: תעודת אחריות בכתב על הליטוש, הציפוי ואיכות הגימור.
- מחיר: נקבע לפי סוג המשטח, גודל השטח במ"ר ומצב האבן. הדרך המהירה לקבל
  מחיר היא לשלוח תמונה של הרצפה בוואטסאפ, ומקבלים תשובה עוד באותו יום.
- למי זה מתאים: בתים פרטיים, דירות, לובי בנייני מגורים, משרדים ושטחים מסחריים.
- מה לא עושים: לא מחליפים ריצוף ולא מוכרים אריחים.

## שירותים
${SERVICES.map((s) => `- [${s.title}](${SITE_URL}/services/${s.slug}): ${s.description}`).join("\n")}

## אזורי שירות
מגיעים לתל אביב, גוש דן, השרון והמרכז. לכל עיר יש עמוד עם השכונות והשירותים
המקומיים:
${CITIES.map((c) => `- [${c.name}](${SITE_URL}/areas/${c.slug})`).join("\n")}

## שאלות ותשובות
${GENERAL_FAQ.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## מדריכים
${POSTS.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt}`).join("\n")}

## איך מזמינים
הדרך המהירה: וואטסאפ ל-${PHONE_DISPLAY} עם תמונה של הרצפה, ומקבלים הצעת מחיר
עוד באותו יום. אפשר גם טופס באתר: ${SITE_URL}/contact
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
