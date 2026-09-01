import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { POSTS } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import InnerHero from "../components/InnerHero";

const title = "מדריך פוליש לשיש";
const description =
  "מאמרים קצרים על מחיר פוליש לשיש, פוליש מול החלפת ריצוף, תחזוקת ברק וההבדל בין קריסטליזציה לפוליש.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  return (
    <>
      <InnerHero
        eyebrow="מדריך"
        title="ידע קצר לפני שמזמינים פוליש"
        tagline="בלי מילוי. תשובות לשאלות שהכי חוזרות בגוש דן."
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "מדריך", href: "/blog" },
        ]}
      />
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-2">
          {POSTS.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-2xl bg-cream">
              <div className="relative h-48">
                <Image src={post.image} alt={post.title} fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-gold">
                  לקריאה
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
