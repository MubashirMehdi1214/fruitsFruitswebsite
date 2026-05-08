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

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        ...(data as Omit<Post, "content">),
        readTime: (data.readTime as string) || readingTime(content).text,
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
