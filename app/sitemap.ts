import type { MetadataRoute } from "next";
import { getAllPosts, getTagCounts } from "@/lib/posts";
import { categories, categorySlug, siteConfig } from "@/lib/utils";

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
  "/free-guides",
  "/search",
  "/tags"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const postRoutes = getAllPosts().map((post) => `/blog/${post.slug}`);
  const categoryRoutes = categories.map((category) => `/category/${categorySlug(category)}`);
  const tagRoutes = getTagCounts().map((tag) => `/tag/${tag.slug}`);
  const allRoutes = [...staticRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes];
  return allRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith("/blog/") || route === "/free-guides" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8
  }));
}
