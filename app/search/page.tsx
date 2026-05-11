import type { Metadata } from "next";
import Link from "next/link";
import { searchPosts } from "@/lib/posts";

type SearchPageProps = {
  searchParams: {
    q?: string;
  };
};

function highlight(text: string, query: string) {
  if (!query) return text;
  const source = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const splitter = new RegExp(`(${source})`, "ig");
  const matcher = new RegExp(`^${source}$`, "i");
  return text.split(splitter).map((part, index) =>
    matcher.test(part) ? <mark key={`${part}-${index}`} className="rounded bg-yellow-100 px-0.5">{part}</mark> : <span key={`${part}-${index}`}>{part}</span>
  );
}

export const metadata: Metadata = {
  title: "Search Health Articles",
  description: "Search article titles, excerpts, and tags across Health Fruits Tips.",
  alternates: { canonical: "/search" }
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams.q || "").trim();
  const results = query ? searchPosts(query) : [];

  return (
    <div className="container-default py-8 md:py-10">
      <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
      <p className="mt-2 text-sm text-gray-600">Showing matches in titles, excerpts and tags.</p>
      <div className="mt-6 rounded-xl border bg-white p-5">
        <p className="text-sm text-gray-600">
          Query: <span className="font-semibold text-gray-900">{query || "Type something in header search."}</span>
        </p>
      </div>

      {query && results.length > 0 ? (
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {results.map((post) => (
            <article key={post.slug} className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase text-green-700">{post.category}</p>
              <h2 className="mt-2 text-lg font-bold text-gray-900">{highlight(post.title, query)}</h2>
              <p className="mt-2 text-sm text-gray-600">{highlight(post.metaDescription, query)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-green-50 px-2.5 py-1 text-xs text-green-700">{highlight(tag, query)}</span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-green-700">
                Read more →
              </Link>
            </article>
          ))}
        </div>
      ) : query ? (
        <section className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">No results found</h2>
          <p className="mt-3 text-gray-600">Try another keyword or browse categories from the menu.</p>
        </section>
      ) : null}
    </div>
  );
}

