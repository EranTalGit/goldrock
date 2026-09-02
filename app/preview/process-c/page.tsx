import ProcessCrystal from "@/app/components/ProcessCrystal";

export const metadata = { title: "תהליך ג - קריסטל", robots: { index: false } };

export default function PreviewProcessC() {
  return (
    <main className="pt-24">
      <ProcessCrystal />
    </main>
  );
}
