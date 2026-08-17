import { DEFAULT_WA_MESSAGE, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שליחת הודעה בוואטסאפ"
      className="fixed bottom-24 left-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:bottom-6"
    >
      <WhatsAppIcon width={30} height={30} />
    </a>
  );
}
