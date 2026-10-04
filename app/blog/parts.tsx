import { Fragment } from "react";
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
 * The phone number, wherever a guide gives it, becomes a WhatsApp link, so the
 * guides stay plain strings and the number still lives in one place.
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

function WithPhoneLink({ text }: { text: string }) {
  const parts = text.split(PHONE_DISPLAY);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) => {
        // A one-letter prefix like "ל-" travels with the number, so the line
        // never ends on "ל-" with the number alone on the next one.
        const prefix = i < parts.length - 1 ? part.match(/[א-ת]-$/)?.[0] : undefined;
        const lead = prefix ? part.slice(0, -prefix.length) : part;
        return (
          <Fragment key={i}>
            {lead}
            {i < parts.length - 1 && (
              <span className="whitespace-nowrap">
                {prefix}
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="font-semibold text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
                >
                  {PHONE_DISPLAY}
                </a>
              </span>
            )}
          </Fragment>
        );
      })}
    </>
  );
}
