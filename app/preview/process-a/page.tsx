import ProcessTimeline from "@/app/components/ProcessTimeline";

export const metadata = { title: "תהליך א - ציר זמן", robots: { index: false } };

export default function PreviewProcessA() {
  return (
    <main className="pt-24">
      <ProcessTimeline />
    </main>
  );
}
