import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { compileMDX } from "next-mdx-remote/rsc";
import AdUnit from "@/components/AdUnit";
import AuthorBio from "@/components/AuthorBio";
import BackToTopButton from "@/components/BackToTopButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import RelatedPosts from "@/components/RelatedPosts";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import { authors } from "@/lib/authors";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { categories, categorySlug, siteConfig } from "@/lib/utils";

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
  const popularPosts = allPosts.filter((item) => item.slug !== post.slug).slice(0, 5);
  const toSlug = (value: string) => value.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
  const toc = [...post.content.matchAll(/^##\s+(.+)$/gm)].map((m) => ({ id: toSlug(m[1]), text: m[1] }));
  const estimatedViews = 1500 + post.slug.length * 123;

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
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/" }, { label: post.title }]} />
      <div className="grid gap-8 lg:grid-cols-[70%_30%]">
        <article className="rounded-2xl bg-white p-5 md:p-8">
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
            {post.category}
          </span>
          <h1 className="mt-4 font-serif text-[1.8rem] font-bold leading-tight text-gray-900 md:text-[2.5rem]">
            {post.title}
          </h1>
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
          <section className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-5">
            <h3 className="text-xl font-bold text-gray-900">Comments</h3>
            <p className="mt-2 text-gray-600">Comments section coming soon.</p>
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
        </article>
        <aside className="space-y-6">
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents items={toc} />
              <AdUnit slot="sidebar-1" format="rectangle" className="mx-auto max-w-[300px]" />
              <section className="rounded-xl border bg-white p-4">
                <h3 className="text-base font-bold text-gray-900">Popular Posts</h3>
                <div className="mt-4 space-y-4">
                  {popularPosts.map((item) => (
                    <a key={item.slug} href={`/blog/${item.slug}`} className="flex gap-3">
                      <Image src={item.featuredImage} alt={item.title} width={88} height={66} className="h-16 w-20 rounded-md object-cover" />
                      <p className="line-clamp-2 text-sm font-medium text-gray-700 hover:text-green-700">{item.title}</p>
                    </a>
                  ))}
                </div>
              </section>
              <section className="rounded-xl border bg-white p-4">
                <h3 className="text-base font-bold text-gray-900">Categories</h3>
                <ul className="mt-3 space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <a href={`/category/${categorySlug(category)}`} className="flex items-center justify-between text-sm text-gray-700 hover:text-green-700">
                        <span>{category}</span>
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                          {allPosts.filter((item) => item.category === category).length}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
              <AdUnit slot="sidebar-2" format="rectangle" className="mx-auto max-w-[300px]" />
            </div>
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
