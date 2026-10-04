import { Fragment, type ReactNode } from "react";
import { formatDate } from "@/lib/blog";
import { PHONE_DISPLAY, whatsappLink } from "@/lib/site";

/** The two facts every guide carries: when it was written, how long it takes. */
export function PostMeta({
  date,
  minutes,
  className = "",
}: {
  date: string;
  minutes: number;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold text-[#6B655C] ${className}`}
    >
      <span className="inline-flex items-center gap-2">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-gold"
          aria-hidden
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
        <time dateTime={date}>{formatDate(date)}</time>
      </span>
      <span className="inline-flex items-center gap-2">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-gold"
          aria-hidden
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        {minutes} דק&apos; קריאה
      </span>
    </div>
  );
}

/**
 * Renders the **bold** spans the guide text is written with. Splitting on the
 * marker keeps the source readable without pulling in a markdown parser.
 * WhatsApp, wherever a guide mentions it, and the phone number, wherever a
 * guide gives it, become one link, so the guides stay plain strings and the
 * number still lives in one place.
 */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold text-ink">
            {part}
          </strong>
        ) : (
          <WithPhoneLink key={i} text={part} />
        ),
      )}
    </>
  );
}

const LINK_CLASS =
  "font-semibold text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold";

// "בוואטסאפ ל-054-…" as one phrase, "וואטסאפ" on its own, or the bare number
// (with a one-letter prefix such as "ל-").
const WHATSAPP_OR_PHONE = new RegExp(
  `([בל]?וואטסאפ)(?:( (?:[א-ת]-)?)${PHONE_DISPLAY})?|([א-ת]-)?${PHONE_DISPLAY}`,
  "g",
);

function WaLink({ children }: { children: ReactNode }) {
  return (
    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
      {children}
    </a>
  );
}

/** The number never splits across lines, and keeps a "ל-" prefix with it. */
function PhoneNumber({ prefix = "" }: { prefix?: string }) {
  return (
    <span className="whitespace-nowrap">
      {prefix}
      <span dir="ltr">{PHONE_DISPLAY}</span>
    </span>
  );
}

function WithPhoneLink({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(WHATSAPP_OR_PHONE)) {
    const [whole, word, gap, barePrefix] = m;
    nodes.push(text.slice(last, m.index));
    last = m.index + whole.length;
    if (word) {
      nodes.push(
        <WaLink key={m.index}>
          {word}
          {gap !== undefined && (
            <>
              {" "}
              <PhoneNumber prefix={gap.trim()} />
            </>
          )}
        </WaLink>,
      );
    } else {
      nodes.push(
        <span key={m.index} className="whitespace-nowrap">
          {barePrefix}
          <WaLink>
            <span dir="ltr">{PHONE_DISPLAY}</span>
          </WaLink>
        </span>,
      );
    }
  }
  if (last === 0) return <>{text}</>;
  nodes.push(text.slice(last));
  return <>{nodes}</>;
}
