import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { categorySlug } from "@/lib/utils";

export type Post = {
  title: string;
  slug: string;
  date: string;
  lastModified?: string;
  category: string;
  author: string;
  authorId?: string;
  authorTitle?: string;
  authorBio: string;
  readTime: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
  tags: string[];
  content: string;
};

const postsDir = path.join(process.cwd(), "content", "blog");

function slugify(value: string) {
  return value.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
}

function normalizeTags(rawTags: unknown, title: string, category: string, slug: string): string[] {
  const existing = Array.isArray(rawTags) ? rawTags.map((tag) => String(tag).trim().toLowerCase()).filter(Boolean) : [];
  const fromTitle = title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .slice(0, 4);
  const fromCategory = category
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 2);
  const fromSlug = slug.split("-").filter((word) => word.length > 2);
  const combined = Array.from(new Set([...existing, ...fromTitle, ...fromCategory, ...fromSlug])).slice(0, 6);
  return combined.length >= 5 ? combined : [...combined, "nutrition", "wellness", "healthy-lifestyle"].slice(0, 6);
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const { data, content } = matter(raw);
      const postData = data as Omit<Post, "content">;
      const normalizedTags = normalizeTags(postData.tags, postData.title, postData.category, postData.slug);
      return {
        ...postData,
        tags: normalizedTags,
        readTime: postData.readTime || readingTime(content).text,
        content
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(categoryParam: string) {
  return getAllPosts().filter((post) => categorySlug(post.category) === categoryParam);
}

export function getRelatedPosts(slug: string, category: string, limit = 3) {
  return getAllPosts()
    .filter((post) => post.slug !== slug && post.category === category)
    .slice(0, limit);
}

export function getPostViews(slug: string): number {
  const base = 1200;
  return base + slug.length * 137;
}

export function getPopularPosts(limit = 5) {
  return getAllPosts()
    .map((post) => ({ ...post, views: getPostViews(post.slug) }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function getPostsByTag(tag: string) {
  const normalized = slugify(tag);
  return getAllPosts().filter((post) => post.tags.some((item) => slugify(item) === normalized));
}

export function getTagCounts() {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const normalized = slugify(tag);
      counts.set(normalized, (counts.get(normalized) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({ slug, name: slug.replace(/-/g, " "), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function searchPosts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getAllPosts().filter((post) => {
    const haystack = `${post.title} ${post.metaDescription} ${post.tags.join(" ")}`.toLowerCase();
    return haystack.includes(q);
  });
}
