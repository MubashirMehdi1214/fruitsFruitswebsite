import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { compileMDX } from "next-mdx-remote/rsc";
import AdUnit from "@/components/AdUnit";
import AuthorBio from "@/components/AuthorBio";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/utils";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: post.metaTitle, description: post.metaDescription, type: "article", url },
    twitter: { card: "summary_large_image", title: post.metaTitle, description: post.metaDescription }
  };
}

export default async function BlogPostPage({ params }: Params) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const related = getRelatedPosts(post.slug, post.category, 3);
  const toc = [...post.content.matchAll(/^##\s+(.+)$/gm)].map((m) => ({ id: m[1].toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-"), text: m[1] }));
  const { content } = await compileMDX({
    source: post.content.replace(/^##\s+(.+)$/gm, (_m, title) => `## <span id="${title.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-")}">${title}</span>`)
  });
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <div className="container-default py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/" }, { label: post.title }]} />
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <article className="rounded-xl bg-white p-6">
          <h1 className="font-serif text-4xl font-bold">{post.title}</h1>
          <p className="mt-3 text-sm text-gray-500">{post.date} • {post.readTime}</p>
          <div className="prose-blog mt-6">{content}</div>
          <AdUnit slot="in-content-1" />
          <AdUnit slot="in-content-2" />
          <ShareButtons url={postUrl} title={post.title} />
          <div className="mt-8">
            <AuthorBio author={post.author} bio={post.authorBio} />
          </div>
          <RelatedPosts posts={related} />
        </article>
        <div className="space-y-6">
          <TableOfContents items={toc} />
          <div className="sticky top-[320px]"><AdUnit slot="sidebar" /></div>
        </div>
      </div>
      <Script id={`schema-${post.slug}`} type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.metaDescription,
          author: { "@type": "Person", name: post.author },
          mainEntityOfPage: postUrl
        })}
      </Script>
      <Script id={`schema-breadcrumb-${post.slug}`} type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog/${post.slug}` }
          ]
        })}
      </Script>
    </div>
  );
}
