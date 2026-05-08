import type { Metadata } from "next";
import Script from "next/script";
import HomeSections from "@/components/home/HomeSections";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Home",
  description: "Trusted fruit benefits, healthy recipes, vitamins and home remedy guides.",
  alternates: { canonical: "/" }
};
export const revalidate = 3600;

export default function HomePage() {
  const posts = getAllPosts();
  const postsForClient = posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    date: post.date,
    category: post.category,
    readTime: post.readTime,
    metaDescription: post.metaDescription
  }));

  return (
    <div className="container-default py-8 md:py-10">
      <HomeSections posts={postsForClient} />

      <Script id="website-schema" type="application/ld+json">
        {JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url })}
      </Script>
    </div>
  );
}
