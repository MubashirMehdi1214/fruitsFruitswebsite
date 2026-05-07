import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { categories, categorySlug } from "@/lib/utils";

type Params = { params: { category: string } };

export function generateStaticParams() {
  return categories.map((category) => ({ category: categorySlug(category) }));
}

export function generateMetadata({ params }: Params): Metadata {
  return {
    title: `${params.category.replace(/-/g, " ")} Articles`,
    description: `Browse all posts in ${params.category.replace(/-/g, " ")} category.`,
    alternates: { canonical: `/category/${params.category}` }
  };
}

export default function CategoryPage({ params }: Params) {
  const posts = getPostsByCategory(params.category);
  if (!posts.length) notFound();
  return (
    <div className="container-default py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Category" }, { label: params.category.replace(/-/g, " ") }]} />
      <section className="rounded-xl bg-white p-6">
        <h1 className="font-serif text-3xl font-bold capitalize">{params.category.replace(/-/g, " ")}</h1>
        <p className="mt-2 text-gray-600">Evidence-informed guides and practical tips from our editorial team.</p>
      </section>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">Page 1 of 1</div>
    </div>
  );
}
