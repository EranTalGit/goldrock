import { PROCESS, STATS } from "@/lib/site";

export default function Process() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-8 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="border-r border-ink/10 pr-4 last:border-0">
              <p className="font-display text-3xl text-gold">{stat.value}</p>
              <p className="mt-1 text-sm text-ink/65">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-16 text-xs tracking-[0.28em] text-gold">איך זה עובד</p>
        <h2 className="mt-3 font-display text-4xl">מזמינים שירות בארבעה צעדים</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {PROCESS.map((step, i) => (
            <li key={step.title} className="rounded-2xl bg-cream p-6">
              <span className="font-brand text-gold">0{i + 1}</span>
              <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
