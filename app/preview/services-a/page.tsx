import ServicesShowcase from "@/app/components/ServicesShowcase";

export const metadata = { title: "שירותים א - מגזין", robots: { index: false } };

export default function PreviewServicesA() {
  return (
    <main className="pt-24">
      <ServicesShowcase />
    </main>
  );
}
