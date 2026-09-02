import Image from "next/image";
import Link from "next/link";
import { POSTS, readMinutes } from "@/lib/blog";
import { PostMeta } from "../blog/parts";
import SectionHeading from "./SectionHeading";

/**
 * The three most recent guides, on the home page. It closes the light and
 * dark run: the testimonials band that precedes it is the dark one, and the
 * closing CTA below it is dark again.
 */
export default function BlogTeaser() {
  const latest = [...POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <section className="border-t border-[rgba(212,175,55,0.25)] bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-4 py-[50px] sm:px-6">
        <SectionHeading
          label="בלוג"
          title="מה שכדאי לדעת לפני שמזמינים"
          description="מדריכים קצרים מהניסיון בשטח: מה מתאים לאיזו רצפה, מה משפיע על המחיר, ואיך שומרים על התוצאה לאורך זמן"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.34)] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_18px_40px_rgba(212,175,55,0.2)]"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-sand">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[550ms] ease-out group-hover:scale-[1.06] motion-reduce:transform-none"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(163,127,52,0.32)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="absolute top-3.5 right-3.5 z-10 rounded-full bg-[linear-gradient(180deg,#CBA55C,#A37F34)] px-3.5 py-1.5 text-[12px] font-bold text-white shadow-[0_8px_20px_-10px_rgba(163,127,52,0.9)]">
                  {post.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2.5 p-5">
                <PostMeta date={post.date} minutes={readMinutes(post)} />
                <h3 className="font-display text-[1.1rem] font-bold leading-snug text-[#1A1A1A] transition-colors group-hover:text-gold">
                  {/* The whole card is the target, not only the words. */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="after:absolute after:inset-0"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="flex-1 text-[14px] leading-relaxed text-ink-soft">
                  {post.excerpt}
                </p>
                <span className="arrow-link self-start text-[14px] font-semibold text-gold">
                  לקריאת המדריך <span className="arrow">←</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="arrow-link text-[1.05rem] font-bold text-gold"
          >
            לכל המאמרים <span className="arrow">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
