import type { Metadata } from "next";
import Script from "next/script";
import BlogCard from "@/components/BlogCard";
import CategoryCard from "@/components/CategoryCard";
import Newsletter from "@/components/Newsletter";
import AdUnit from "@/components/AdUnit";
import { getAllPosts } from "@/lib/posts";
import { categories, siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Home",
  description: "Trusted fruit benefits, healthy recipes, vitamins and home remedy guides.",
  alternates: { canonical: "/" }
};

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.slice(0, 3);
  const latest = posts.slice(0, 6);
  return (
    <div className="container-default py-10">
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="font-serif text-4xl font-bold text-gray-900">Eat Better, Feel Better, Live Better</h1>
        <p className="mt-3 max-w-2xl text-gray-600">Simple science-backed guides on fruits, vegetables, remedies, and healthy lifestyle habits.</p>
        <input placeholder="Search health topics..." className="mt-6 w-full rounded-md border px-4 py-3 md:w-2/3" />
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Featured Posts</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-3">{featured.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Explore Categories</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">{categories.map((c) => <CategoryCard key={c} name={c} />)}</div>
      </section>
      <div className="md:hidden"><AdUnit slot="mobile" /></div>
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Latest Posts</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-3">{latest.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
      </section>
      <section className="mt-12"><Newsletter /></section>
      <section className="mt-10 rounded-xl border bg-white p-6">
        <h2 className="text-2xl font-bold">Why Trust Us</h2>
        <p className="mt-3 text-gray-700">Our editorial team follows evidence-based writing principles, cites reputable sources, and reviews content for medical accuracy and practical usability.</p>
      </section>
      <Script id="website-schema" type="application/ld+json">
        {JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url })}
      </Script>
    </div>
  );
}
