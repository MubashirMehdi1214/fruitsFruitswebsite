import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPostsByCategory } from "@/lib/posts";
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
  const categoryName = categories.find((category) => categorySlug(category) === params.category);
  if (!categoryName) notFound();
  const posts = getPostsByCategory(params.category);

  return (
    <div className="container-default py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Category" }, { label: categoryName }]} />
      <section className="rounded-xl bg-white p-6">
        <h1 className="font-serif text-3xl font-bold">{categoryName}</h1>
        <p className="mt-2 text-gray-600">Evidence-informed guides and practical tips from our editorial team.</p>
      </section>
      {posts.length > 0 ? (
        <>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">Page 1 of 1</div>
        </>
      ) : (
        <section className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">No articles yet in {categoryName}</h2>
          <p className="mt-3 text-gray-600">We are preparing expert-reviewed content for this category. Please check back soon.</p>
          <Link href="/blog" className="mt-5 inline-block rounded-full bg-green-700 px-5 py-3 font-semibold text-white">
            Explore all articles
          </Link>
        </section>
      )}
    </div>
  );
}
