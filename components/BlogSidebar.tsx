import Image from "next/image";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";
import { Post, getTagCounts, getPopularPosts } from "@/lib/posts";
import { categories, categorySlug } from "@/lib/utils";

type Props = {
  allPosts: Post[];
  currentSlug: string;
};

export default function BlogSidebar({ allPosts, currentSlug }: Props) {
  const recent = allPosts.filter((post) => post.slug !== currentSlug).slice(0, 5);
  const popular = getPopularPosts(5).filter((post) => post.slug !== currentSlug).slice(0, 5);
  const tags = getTagCounts().slice(0, 30);
  const maxTag = Math.max(...tags.map((tag) => tag.count), 1);

  return (
    <div className="sticky top-24 space-y-6">
      <section className="rounded-xl border bg-white p-4">
        <h3 className="text-base font-bold text-gray-900">Search</h3>
        <form action="/search" className="mt-3">
          <input name="q" placeholder="Search posts..." className="h-10 w-full rounded-lg border px-3 text-sm" />
        </form>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h3 className="text-base font-bold text-gray-900">Recent Posts</h3>
        <div className="mt-4 space-y-3">
          {recent.map((item) => (
            <Link key={item.slug} href={`/blog/${item.slug}`} className="group flex gap-3 rounded-lg p-1 transition hover:bg-green-50">
              <Image src={item.featuredImage} alt={item.title} width={72} height={56} className="h-14 w-20 rounded-md object-cover" />
              <div>
                <p className="line-clamp-2 text-sm font-medium text-gray-700 group-hover:text-green-700">{item.title}</p>
                <p className="mt-1 text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h3 className="text-base font-bold text-gray-900">Popular Posts</h3>
        <div className="mt-3 space-y-3">
          {popular.map((item, index) => (
            <Link key={item.slug} href={`/blog/${item.slug}`} className="flex items-start gap-3 rounded-lg p-1 hover:bg-green-50">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                {index + 1}
              </span>
              <div>
                <p className="line-clamp-2 text-sm font-medium text-gray-700">{item.title}</p>
                <p className="mt-1 text-xs text-gray-500">{item.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h3 className="text-base font-bold text-gray-900">Categories</h3>
        <ul className="mt-3 space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <Link href={`/category/${categorySlug(category)}`} className="group flex items-center justify-between text-sm text-gray-700">
                <span>{category} ({allPosts.filter((post) => post.category === category).length})</span>
                <span className="text-green-700 transition group-hover:translate-x-1">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h3 className="text-base font-bold text-gray-900">Tags Cloud</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tag/${tag.slug}`}
              className="rounded-full bg-green-50 px-2.5 py-1 text-green-700"
              style={{ fontSize: `${12 + Math.round((tag.count / maxTag) * 8)}px` }}
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </section>

      <AdUnit slot="sidebar-1" format="rectangle" className="mx-auto max-w-[300px]" />

      <section className="rounded-xl border bg-white p-4">
        <h3 className="text-base font-bold text-gray-900">Get Health Tips</h3>
        <p className="mt-1 text-sm text-gray-600">Weekly practical advice in your inbox.</p>
        <form className="mt-3 space-y-2">
          <input type="email" placeholder="Your email" className="h-10 w-full rounded-lg border px-3 text-sm" />
          <button type="button" className="h-10 w-full rounded-lg bg-green-700 text-sm font-semibold text-white">Subscribe</button>
        </form>
      </section>
    </div>
  );
}

