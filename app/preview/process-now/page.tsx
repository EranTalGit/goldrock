import Process from "@/app/components/Process";

export const metadata = { title: "תהליך - הקיים", robots: { index: false } };

export default function PreviewProcessNow() {
  return (
    <main className="pt-24">
      <Process />
    </main>
  );
}
