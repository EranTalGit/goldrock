import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, POSTS } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import InnerHero from "../../components/InnerHero";
import CtaBand from "../../components/CtaBand";

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
      <InnerHero
        eyebrow="מדריך"
        title={post.title}
        tagline={post.excerpt}
        crumbs={[
          { label: "דף הבית", href: "/" },
          { label: "מדריך", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <article className="bg-paper text-ink">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <div className="relative mb-10 h-72 overflow-hidden rounded-2xl">
            <Image src={post.image} alt={post.title} fill className="object-cover" sizes="800px" />
          </div>
          {post.body.map((section) => (
            <section key={section.h2} className="mt-10">
              <h2 className="font-display text-3xl">{section.h2}</h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-ink/80">
                  {p}
                </p>
              ))}
            </section>
          ))}
          <p className="mt-10 text-sm text-ink/60">
            עוד במדריך:{" "}
            {POSTS.filter((p) => p.slug !== post.slug).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="ml-3 text-gold">
                {p.title}
              </Link>
            ))}
          </p>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
