import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, POSTS, readMinutes } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import InnerHero from "../../components/InnerHero";
import CtaBand from "../../components/CtaBand";
import { PostMeta, Rich } from "../parts";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${SITE_URL}/blog/${post.slug}`,
      locale: "he_IL",
      type: "article",
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const minutes = readMinutes(post);
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    image: `${SITE_URL}${post.image}`,
    author: { "@id": `${SITE_URL}/#business` },
    publisher: { "@id": `${SITE_URL}/#business` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The hero names the section, not the piece, so every article opens
          the way the rest of the site does. The h1 belongs to the article
          itself and sits with its own byline below. */}
      <InnerHero
        headingAs="p"
        title="בלוג"
        tagline="מדריכים על פוליש, ליטוש וחידוש רצפות"
        note="כל מדריך נכתב מתוך שאלות שחוזרות אצל לקוחות, בשפה פשוטה ומהניסיון בשטח"
      />

      <article className="bg-paper text-ink">
        <div className="mx-auto max-w-3xl px-4 py-[45px] sm:px-6">
          <header className="text-center">
            {/* The tag stays on the index cards; over the title it only
                repeated what the heading already says. */}
            <h1 className="font-display text-[1.9rem] font-bold leading-tight text-ink sm:text-[2.4rem]">
              {post.title}
            </h1>
            <div className="gold-rule mx-auto mt-6 w-full max-w-sm" />
            <p className="mt-6 text-[1.08rem] leading-relaxed text-ink-soft sm:text-[1.15rem]">
              {post.excerpt}
            </p>
            <PostMeta
              date={post.date}
              minutes={minutes}
              className="mt-6 justify-center"
            />
          </header>

          {/* A picture that sets the scene rather than filling the screen
              before the reading starts. */}
          <figure className="mx-auto mt-10 max-w-[460px] overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.34)] shadow-[0_14px_34px_rgba(0,0,0,0.08)]">
            <div className="relative aspect-[4/3]">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                priority
                sizes="460px"
                className="object-cover"
              />
            </div>
          </figure>

          <div className="mt-10 text-[1.05rem] leading-[1.92] text-ink-soft">
            {post.intro.map((paragraph) => (
              <p key={paragraph} className="mt-4 first:mt-0">
                <Rich text={paragraph} />
              </p>
            ))}

            {post.body.map((section) => (
              <section key={section.h2}>
                <h2 className="mt-11 font-display text-[1.35rem] font-bold leading-snug text-ink sm:text-[1.6rem]">
                  {section.h2}
                </h2>
                <div className="gold-line mt-3 w-16" />
                {section.blocks.map((block, i) => {
                  if (block.k === "h3") {
                    return (
                      <h3
                        key={i}
                        className="mt-7 font-display text-[1.12rem] font-bold leading-snug text-ink"
                      >
                        {block.text}
                      </h3>
                    );
                  }
                  if (block.k === "ul") {
                    return (
                      <ul
                        key={i}
                        className="mt-4 list-disc space-y-2 ps-6 marker:text-gold"
                      >
                        {block.items.map((item) => (
                          <li key={item}>
                            <Rich text={item} />
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.k === "pull") {
                    return (
                      <p
                        key={i}
                        className="mt-6 rounded-xl border border-[rgba(212,175,55,0.28)] border-s-4 border-s-gold bg-white px-6 py-5 text-[1.02rem] shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                      >
                        <Rich text={block.text} />
                      </p>
                    );
                  }
                  return (
                    <p key={i} className="mt-4">
                      <Rich text={block.text} />
                    </p>
                  );
                })}
              </section>
            ))}
          </div>
        </div>
      </article>

      {/* Where to go next: two pieces, each with its picture beside it. */}
      <section className="border-t border-[rgba(212,175,55,0.25)] bg-[#FAF6F0] text-ink">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <h2 className="text-center font-display text-xl font-bold text-ink sm:text-2xl">
            להמשך קריאה
          </h2>
          <div className="gold-rule mx-auto mt-4 w-full max-w-xs" />

          <div className="mt-8 space-y-5">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group flex items-center gap-5 rounded-2xl border border-[rgba(212,175,55,0.3)] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[0_16px_38px_rgba(212,175,55,0.18)] sm:p-5"
              >
                <span className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl bg-sand sm:w-40">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06] motion-reduce:transform-none"
                  />
                </span>
                <span className="flex flex-1 flex-col gap-2">
                  <PostMeta date={item.date} minutes={readMinutes(item)} />
                  <span className="font-display text-[1.05rem] font-bold leading-snug text-[#1A1A1A] transition-colors group-hover:text-gold sm:text-[1.15rem]">
                    {item.title}
                  </span>
                  <span className="arrow-link text-[15px] font-semibold text-gold">
                    לקריאה <span className="arrow">←</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-9 text-center">
            <Link
              href="/blog"
              className="arrow-link text-[1.05rem] font-bold text-gold"
            >
              לכל המאמרים <span className="arrow">←</span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
