import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { compileMDX } from "next-mdx-remote/rsc";
import AdUnit from "@/components/AdUnit";
import AuthorBio from "@/components/AuthorBio";
import BackToTopButton from "@/components/BackToTopButton";
import BlogSidebar from "@/components/BlogSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import CommentsSection from "@/components/CommentsSection";
import FAQAccordion from "@/components/FAQAccordion";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import RelatedPosts from "@/components/RelatedPosts";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import { authors } from "@/lib/authors";
import { getAllPosts, getPostBySlug, getPostViews, getRelatedPosts } from "@/lib/posts";
import { getCommentCount, getCommentsBySlug } from "@/lib/comments";
import { categorySlug, siteConfig } from "@/lib/utils";
import Link from "next/link";

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
  const allPosts = getAllPosts();
  const related = getRelatedPosts(post.slug, post.category, 3);
  const toSlug = (value: string) => value.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
  const toc = [...post.content.matchAll(/^##\s+(.+)$/gm)].map((m) => ({ id: toSlug(m[1]), text: m[1] }));
  const estimatedViews = getPostViews(post.slug);
  const commentCount = getCommentCount(post.slug);
  const comments = getCommentsBySlug(post.slug);

  const faqSectionMatch = post.content.match(/##\s+FAQ([\s\S]*?)(?=\n##\s+Conclusion|\n##\s+[^\n]+)/m);
  const faqItems = faqSectionMatch
    ? [...faqSectionMatch[1].matchAll(/###\s+(.+)\n([\s\S]*?)(?=\n###\s+|\n##\s+|$)/g)].map((item) => ({
        question: item[1].trim(),
        answer: item[2].trim()
      }))
    : [];

  const cleanedContent = post.content.replace(/##\s+FAQ[\s\S]*?(?=\n##\s+Conclusion|\n##\s+[^\n]+|$)/m, "");
  const addAnchors = (source: string) =>
    source.replace(/^##\s+(.+)$/gm, (_m, title) => `## <span id="${toSlug(title)}">${title}</span>`);

  let paragraphCount = 0;
  const { content } = await compileMDX({
    source: addAnchors(cleanedContent),
    components: {
      p: ({ children }) => {
        paragraphCount += 1;
        return (
          <>
            <p>{children}</p>
            {(paragraphCount === 2 || paragraphCount === 5) && (
              <AdUnit
                slot={paragraphCount === 2 ? "in-content-1" : "in-content-2"}
                className="mx-auto max-w-[336px]"
                format="rectangle"
              />
            )}
          </>
        );
      }
    }
  });
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const profile = post.authorId ? authors[post.authorId] : undefined;
  const publishedDate = new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const updatedDate = new Date(post.lastModified || post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="container-default max-w-[1200px] py-8 md:py-10">
      <ReadingProgressBar />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: post.category, href: `/category/${categorySlug(post.category)}` }, { label: post.title }]} />
      <div className="grid gap-8 lg:grid-cols-[70%_30%]">
        <article className="rounded-2xl bg-white p-5 md:p-8">
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
            {post.category}
          </span>
          <h1 className="mt-4 font-serif text-[1.8rem] font-bold leading-tight text-gray-900 md:text-[2.5rem]">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{commentCount} comments</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 border-y border-gray-100 py-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-green-100 font-semibold text-green-700">
                {post.author.slice(0, 1)}
              </span>
              <span className="font-medium text-gray-700">{post.author}</span>
            </div>
            <span>Published: {publishedDate}</span>
            <span>{post.readTime}</span>
            <span>{estimatedViews.toLocaleString()} views</span>
            <span>Last Updated: {updatedDate}</span>
            <span>{commentCount} comments</span>
          </div>
          <ShareButtons url={postUrl} title={post.title} />
          <div className="mt-6 overflow-hidden rounded-2xl">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1200}
              height={675}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
          {toc.length > 1 && <TableOfContents items={toc} collapsible />}
          <div className="prose-blog mt-8 text-base leading-[1.8] text-gray-700 md:text-[18px]">{content}</div>
          <FAQAccordion items={faqItems} />
          <AdUnit slot="article-inline" className="mx-auto max-w-[336px]" />
          <section className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-5">
            <h3 className="text-2xl font-bold text-gray-900">Conclusion</h3>
            <p className="mt-3 text-gray-700">
              Build healthy habits consistently, combine whole foods, and use evidence-based guidance for long-term wellness.
            </p>
          </section>
          <section className="mt-8">
            <h3 className="text-lg font-bold text-gray-900">Article Tags</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`} className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">
                  #{tag}
                </Link>
              ))}
            </div>
          </section>
          <ShareButtons url={postUrl} title={post.title} />
          <div className="mt-8">
            <AuthorBio
              author={post.author}
              bio={post.authorBio}
              title={post.authorTitle || profile?.title}
              avatar={profile?.avatar}
              linkedin={profile?.linkedin}
              lastUpdated={updatedDate}
            />
          </div>
          <AdUnit slot="between-posts" desktopOnly />
          <RelatedPosts posts={related} />
          <CommentsSection slug={post.slug} initialComments={comments} />
        </article>
        <aside className="space-y-6">
          <div className="hidden lg:block">
            <BlogSidebar allPosts={allPosts} currentSlug={post.slug} />
          </div>
        </aside>
      </div>
      <div className="lg:hidden">
        <TableOfContents items={toc} collapsible />
        <AdUnit slot="sidebar-1" format="rectangle" className="mx-auto max-w-[336px]" />
      </div>
      <BackToTopButton />
      <Script id={`schema-${post.slug}`} type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.metaDescription,
          author: { "@type": "Person", name: post.author },
          image: [`${siteConfig.url}${post.featuredImage}`],
          datePublished: post.date,
          dateModified: post.lastModified || post.date,
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
      {faqItems.length > 0 && (
        <Script id={`schema-faq-${post.slug}`} type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer }
            }))
          })}
        </Script>
      )}
    </div>
  );
}
