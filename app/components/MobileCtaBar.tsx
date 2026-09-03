import Link from "next/link";
import { PHONE_HREF } from "@/lib/site";
import { PhoneIcon } from "./icons";

/**
 * The two routes that are not already on screen. WhatsApp is not one of
 * them: it floats above this bar on every page, and putting it here too
 * spent half the bar on a button the visitor already has.
 */
export default function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-[var(--cookie-h,0px)] z-30 grid grid-cols-2 gap-2 border-t border-gold/20 bg-obsidian/95 p-2 backdrop-blur md:hidden">
      <a
        href={PHONE_HREF}
        className="btn-ghost flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold"
      >
        <PhoneIcon />
        התקשרו עכשיו
      </a>
      <Link
        href="/contact"
        className="btn-gold flex items-center justify-center rounded-full py-3 text-sm font-semibold"
      >
        הזמנת שירות
      </Link>
    </div>
  );
}
