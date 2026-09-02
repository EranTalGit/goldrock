import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { POSTS, readMinutes } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import InnerHero from "../components/InnerHero";
import CtaBand from "../components/CtaBand";
import SectionHeading from "../components/SectionHeading";
import { PostMeta } from "./parts";

const title = "מדריך פוליש לשיש";
const description =
  "מדריכים על פוליש לשיש, סוגי ריצוף, חידוש חדר מדרגות, מחירים ותחזוקת ברק. בלי מילוי, מהניסיון בשטח.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  return (
    <>
      {/* No eyebrow here - the section below already leads with it. */}
      <InnerHero
        title="מדריך פוליש וחידוש רצפות"
        tagline="מה שכדאי לדעת לפני שמזמינים עבודה"
        note="מה מתאים לאיזו רצפה, מה משפיע על המחיר, ואיך שומרים על התוצאה לאורך זמן"
      />

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-4 py-[45px] sm:px-6">
          <SectionHeading
            label="בלוג"
            title="מה שלמדנו מהשטח, כתוב בפשטות"
            description="כל מדריך כאן נכתב מתוך שאלות שחוזרות אצל לקוחות - איזה טיפול מתאים לאיזו אבן, מה באמת משפיע על המחיר, ומה אי אפשר להבטיח. בשפה פשוטה, ובלי הבטחות שלא עומדות מאחוריהן."
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
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
                  {/* A gold wash that rises from the foot of the picture. */}
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
                  <h2 className="font-display text-[1.1rem] font-bold leading-snug text-[#1A1A1A] transition-colors group-hover:text-gold">
                    {/* The whole card is the target, not only the words. */}
                    <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  </h2>
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
        </div>
      </section>

      <CtaBand />
    </>
  );
}
