import { BENEFITS, BUSINESS_NAME } from "@/lib/site";
import { ServiceIcon } from "./icons";

export default function WhyUs() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <p className="eyebrow">למה אנחנו</p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
          למה {BUSINESS_NAME}?
        </h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <article key={benefit.title} className="card-soft p-8">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <ServiceIcon name={benefit.icon} width={26} height={26} />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold">{benefit.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{benefit.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
