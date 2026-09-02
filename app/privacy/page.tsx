import type { Metadata } from "next";
import {
  BUSINESS_NAME,
  DEFAULT_WA_MESSAGE,
  PHONE_DISPLAY,
  PHONE_HREF,
  REGION_LABEL,
  SITE_URL,
  whatsappLink,
} from "@/lib/site";
import InnerHero from "../components/InnerHero";
import ConsentReset from "../components/ConsentReset";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: `מה נאסף באתר ${BUSINESS_NAME}, למה, עם מי הוא משותף ומה אפשר לעשות בנוגע לזה.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 font-display text-xl font-bold text-ink sm:text-2xl">
      {children}
    </h2>
  );
}

export default function PrivacyPage() {
  const wa = (
    <a
      href={whatsappLink(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-gold"
    >
      וואטסאפ
    </a>
  );
  const phone = (
    <a href={PHONE_HREF} className="font-semibold text-gold" dir="ltr">
      {PHONE_DISPLAY}
    </a>
  );

  return (
    <>
      <InnerHero
        eyebrow="משפטי"
        title="מדיניות פרטיות"
        tagline="מה נאסף באתר הזה, למה, ומה אתם יכולים לעשות בנוגע לזה."
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "מדיניות פרטיות", href: "/privacy" },
        ]}
      />
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-3xl px-4 py-12 text-[1.02rem] leading-[1.95] text-ink-soft sm:px-6">
          <p className="text-sm text-ink-soft/75">עודכן בספטמבר 2026</p>

          <p className="mt-5">
            המדיניות הזו מסבירה איזה מידע נאסף כשאתם מבקרים באתר של {BUSINESS_NAME}, למה הוא נאסף, מי עוד רואה אותו, ומה אתם יכולים לעשות בנוגע אליו. כתבנו אותה בשפה פשוטה ככל שאפשר.
          </p>
          <p className="mt-4">
            <strong className="font-bold text-ink">בקצרה:</strong> המידע האישי היחיד שמגיע אלינו דרך האתר הוא מה שאתם עצמכם ממלאים בטופס הצעת המחיר, או מה שאתם כותבים לנו בוואטסאפ. אנחנו לא מוכרים מידע ולא מעבירים אותו למפרסמים.
          </p>

          <H>מי אנחנו</H>
          <p className="mt-3">
            האתר מופעל על ידי {BUSINESS_NAME}, עסק שנותן שירותי פוליש, ליטוש, קריסטליזציה וחידוש משטחי אבן ושיש ב{REGION_LABEL}. לכל שאלה בנושא פרטיות אפשר לפנות אלינו בטלפון {phone} או ב{wa}.
          </p>

          <H>מידע שאתם מוסרים לנו</H>
          <p className="mt-3">
            בטופס הצעת המחיר שבאתר נאספים <strong className="font-bold text-ink">שם וטלפון</strong> (שדות חובה), ובאופן אופציונלי גם עיר, סוג השירות המבוקש והודעה חופשית. המטרה היחידה היא לחזור אליכם עם הצעת מחיר ולתאם עבודה.
          </p>
          <p className="mt-3">
            אם אתם פונים אלינו בטלפון או בוואטסאפ, מה שתבחרו לומר או לכתוב מגיע אלינו ישירות. שיחת וואטסאפ מתנהלת בשרתי WhatsApp ובכפוף לתנאיה ולמדיניות הפרטיות שלה - היא אינה עוברת דרך האתר.
          </p>

          <H>מידע שנאסף אוטומטית</H>
          <p className="mt-3">
            <strong className="font-bold text-ink">יומני שרת.</strong> ספק האחסון שלנו רושם באופן אוטומטי כתובות IP ופרטי בקשה טכניים, כנדרש לאבטחה ולתפעול תקין של האתר.
          </p>
          <p className="mt-3">
            <strong className="font-bold text-ink">מדידת שימוש.</strong> נכון למועד עדכון המדיניות, באתר{" "}
            <strong className="font-bold text-ink">אין</strong> כלי מדידה או פרסום של צד שלישי, ולא נאספים נתונים סטטיסטיים על הגלישה. אם נוסיף מדידה בעתיד, היא תופעל רק לאחר שתאשרו זאת בהודעת העוגיות, והמדיניות הזו תעודכן בהתאם.
          </p>

          <H>העדפות שנשמרות בדפדפן שלכם</H>
          <p className="mt-3">
            אם השתמשתם בתפריט הנגישות שבצד המסך - הגדלת טקסט, ניגודיות, ביטול אנימציות וכדומה - הבחירות שלכם נשמרות בדפדפן שלכם עצמו כדי שלא תצטרכו לבחור מחדש בכל עמוד. כך גם נשמרת הבחירה שלכם בהודעת העוגיות.
          </p>
          <p className="mt-3">
            המידע הזה נשאר במכשיר שלכם ואינו נשלח אלינו. אפשר למחוק אותו בכל רגע דרך הגדרות הדפדפן.
          </p>

          <H>עוגיות</H>
          <p className="mt-3">
            עוגייה היא קובץ קטן שאתר שומר בדפדפן. באתר הזה יש שני סוגים:
          </p>
          <p className="mt-3">
            <strong className="font-bold text-ink">הכרחיות.</strong> נדרשות כדי שהאתר יעבוד ויזכור את הבחירות שלכם - כולל העדפות הנגישות והבחירה שלכם לגבי עוגיות. הן פועלות תמיד.
          </p>
          <p className="mt-3">
            <strong className="font-bold text-ink">מדידה.</strong> אינן פעילות באתר כרגע. אם יופעלו בעתיד, הן ייטענו רק לאחר אישורכם בהודעה שמופיעה בכניסה לאתר.
          </p>
          <p className="mt-4">בחרתם ורוצים לשנות? אפשר לפתוח מחדש את ההודעה ולבחור שוב:</p>
          <ConsentReset />

          <H>עם מי המידע משותף</H>
          <p className="mt-3">
            אנחנו לא מוכרים מידע ולא מעבירים אותו למפרסמים. הגורמים היחידים שרואים חלק ממנו הם ספקי השירות שמפעילים את האתר עבורנו:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5">
            <li>Vercel - החברה שמאחסנת ומגישה את האתר.</li>
            <li>ספק מסד הנתונים שבו נשמרות הפניות מהטופס.</li>
            <li>WhatsApp / Meta - רק אם בחרתם לפנות אלינו בוואטסאפ, ובכפוף למדיניות שלהם.</li>
          </ul>
          <p className="mt-3">
            מעבר לכך, מידע יימסר רק אם נידרש לכך על פי דין או על פי צו של רשות מוסמכת.
          </p>

          <H>העברת מידע אל מחוץ לישראל</H>
          <p className="mt-3">
            הספקים שלמעלה הם חברות בינלאומיות, והמידע עשוי להישמר או להיות מעובד בשרתים מחוץ לישראל. ההתקשרות איתם נעשית בתנאי השימוש הסטנדרטיים שלהם, הכוללים התחייבויות בנוגע לאבטחת מידע.
          </p>

          <H>כמה זמן המידע נשמר</H>
          <ul className="mt-3 list-inside list-disc space-y-1.5">
            <li>פרטים שמסרתם בטופס או בפנייה - למשך הזמן הדרוש למתן השירות ולתקופת האחריות, ולאחר מכן לפי הנדרש בדין.</li>
            <li>העדפות נגישות ובחירת עוגיות - עד שתמחקו אותן מהדפדפן שלכם.</li>
            <li>יומני שרת - לפי תקופות השמירה של ספק האחסון.</li>
          </ul>

          <H>הזכויות שלכם</H>
          <p className="mt-3">
            על פי חוק הגנת הפרטיות, עומדות לכם הזכויות הבאות:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5">
            <li>לדעת אם מוחזק אצלנו מידע עליכם ולעיין בו.</li>
            <li>לבקש תיקון של מידע שאינו נכון, שלם או מדויק.</li>
            <li>לבקש מחיקה של מידע שאין עוד צורך בו.</li>
            <li>לחזור בכם מהסכמה שנתתם, בכל רגע, דרך הכפתור שבפרק העוגיות שלמעלה.</li>
          </ul>
          <p className="mt-3">
            למימוש כל אחת מהן פנו אלינו בטלפון {phone} או ב{wa} ונטפל בפנייה.
          </p>

          <H>אבטחת מידע</H>
          <p className="mt-3">
            האתר מוגש בחיבור מוצפן (HTTPS), ואנחנו נוקטים אמצעים סבירים כדי להגן על המידע שברשותנו. עם זאת, אף מערכת אינה חסינה לחלוטין, ואיננו יכולים להבטיח הגנה מוחלטת.
          </p>

          <H>קטינים</H>
          <p className="mt-3">
            האתר אינו מיועד לילדים ואיננו אוספים ביודעין מידע על קטינים.
          </p>

          <H>קישורים לאתרים אחרים</H>
          <p className="mt-3">
            באתר יש קישורים לוואטסאפ ולשירותים חיצוניים. ברגע שאתם עוברים אליהם, המדיניות שלהם היא שחלה - לא זו.
          </p>

          <H>שינויים במדיניות</H>
          <p className="mt-3">
            אם נעדכן את המדיניות, התאריך שבראש העמוד ישתנה בהתאם. שינוי מהותי יוצג גם בהודעה באתר.
          </p>

          <H>יצירת קשר</H>
          <p className="mt-3">
            לכל שאלה, בקשה או תלונה בנושא פרטיות: {phone} או ב{wa}.
          </p>
        </div>
      </section>
    </>
  );
}
