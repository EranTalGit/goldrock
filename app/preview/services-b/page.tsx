import ServicesAccordion from "@/app/components/ServicesAccordion";

export const metadata = { title: "שירותים ב - אקורדיון", robots: { index: false } };

export default function PreviewServicesB() {
  return (
    <main className="pt-24">
      <ServicesAccordion />
    </main>
  );
}
