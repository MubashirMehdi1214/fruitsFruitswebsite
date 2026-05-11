import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPostsByTag, getTagCounts } from "@/lib/posts";

type Params = { params: { tag: string } };

export function generateStaticParams() {
  return getTagCounts().map((tag) => ({ tag: tag.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const title = params.tag.replace(/-/g, " ");
  return {
    title: `${title} Tag Articles`,
    description: `Browse all articles tagged with ${title}.`,
    alternates: { canonical: `/tag/${params.tag}` }
  };
}

export default function TagPage({ params }: Params) {
  const posts = getPostsByTag(params.tag);
  if (posts.length === 0) notFound();

  const name = params.tag.replace(/-/g, " ");
  return (
    <div className="container-default py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tags", href: "/tags" }, { label: name }]} />
      <section className="rounded-xl bg-white p-6">
        <h1 className="font-serif text-3xl font-bold capitalize">#{name}</h1>
        <p className="mt-2 text-gray-600">{posts.length} articles</p>
      </section>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

