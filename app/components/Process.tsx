import { PROCESS } from "@/lib/site";

export default function Process() {
  return (
    <section className="bg-sand text-ink">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <p className="eyebrow">איך זה עובד</p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
          ארבעה צעדים פשוטים
        </h2>
        <ol className="mt-14 grid gap-6 md:grid-cols-4">
          {PROCESS.map((step, i) => (
            <li key={step.title} className="card-soft p-8">
              <span className="font-display text-4xl font-bold text-gold">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
