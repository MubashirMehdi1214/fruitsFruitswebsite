import type { Metadata } from "next";
import Link from "next/link";
import { getTagCounts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "All Health Tags",
  description: "Browse all article tags across Health Fruits Tips.",
  alternates: { canonical: "/tags" }
};

export default function TagsPage() {
  const tags = getTagCounts().sort((a, b) => a.name.localeCompare(b.name));
  const maxCount = Math.max(...tags.map((tag) => tag.count), 1);

  return (
    <div className="container-default py-10">
      <h1 className="text-3xl font-bold text-gray-900">All Tags</h1>
      <p className="mt-2 text-gray-600">Explore topics by tag and discover related health articles.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {tags.map((tag) => {
          const size = 12 + Math.round((tag.count / maxCount) * 12);
          return (
            <Link
              key={tag.slug}
              href={`/tag/${tag.slug}`}
              className="rounded-full bg-green-50 px-4 py-2 text-green-700 transition hover:bg-green-100"
              style={{ fontSize: `${size}px` }}
            >
              #{tag.name} ({tag.count})
            </Link>
          );
        })}
      </div>
    </div>
  );
}

