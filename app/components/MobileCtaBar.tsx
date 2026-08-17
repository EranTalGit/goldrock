import { DEFAULT_WA_MESSAGE, PHONE_HREF, whatsappLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";

export default function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-gold/20 bg-obsidian/95 p-2 backdrop-blur md:hidden">
      <a
        href={PHONE_HREF}
        className="btn-ghost flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold"
      >
        <PhoneIcon />
        התקשרו עכשיו
      </a>
      <a
        href={whatsappLink(DEFAULT_WA_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white"
      >
        <WhatsAppIcon width={18} height={18} />
        וואטסאפ
      </a>
    </div>
  );
}
