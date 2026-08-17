import type { ServiceIconName } from "@/lib/site";

export function WhatsAppIcon({
  width = 28,
  height = 28,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function PhoneIcon({
  width = 20,
  height = 20,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3c0 1-1 2-2 2C9.5 19.5 4.5 14.5 4.5 5.5c0-1 1-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const paths: Record<ServiceIconName, string> = {
  sparkle: "M12 3l1.2 6.3L19 12l-5.8 2.7L12 21l-1.2-6.3L5 12l5.8-2.7L12 3z",
  shield: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z",
  stairs: "M4 20h6v-4h4v-4h4V8h2",
  layers: "M12 4l8 4-8 4-8-4 8-4zm-8 8l8 4 8-4M4 16l8 4 8-4",
  grid: "M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z",
  broom: "M5 20l4-9 3 1-2 8H5zm7-10l6-6m-4 2l4 4",
};

export function ServiceIcon({
  name,
  width = 28,
  height = 28,
}: {
  name: ServiceIconName;
  width?: number;
  height?: number;
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d={paths[name]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
