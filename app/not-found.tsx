import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { categories, categorySlug } from "@/lib/utils";

export default function NotFound() {
  const posts = getAllPosts().slice(0, 4);
  const tips = [
    "Hydration improves focus and energy. Keep water nearby.",
    "Pair fruit with protein for better satiety.",
    "A 10-minute walk after meals can support glucose balance.",
    "Colorful meals often mean better nutrient diversity."
  ];
  const randomTip = tips[new Date().getDate() % tips.length];

  return (
    <div className="container-default py-16">
      <section className="rounded-2xl bg-white p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Oops! Page not found</h1>
        <p className="mt-3 text-gray-600">The page may have moved. Try searching or jump to a popular section.</p>
        <form action="/search" className="mx-auto mt-6 max-w-xl">
          <input name="q" placeholder="Search health articles..." className="h-12 w-full rounded-xl border px-4" />
        </form>
        <Link href="/" className="mt-6 inline-block rounded-full bg-green-700 px-5 py-3 font-semibold text-white">
          Back to Home
        </Link>
      </section>
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-white p-5">
          <h2 className="text-xl font-bold text-gray-900">Popular Categories</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.slice(0, 6).map((category) => (
              <Link key={category} href={`/category/${categorySlug(category)}`} className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">
                {category}
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white p-5">
          <h2 className="text-xl font-bold text-gray-900">Recent Posts</h2>
          <ul className="mt-3 space-y-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="text-sm text-green-700 hover:underline">{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
        <h3 className="font-bold text-green-900">Fun Health Tip</h3>
        <p className="mt-2 text-green-800">{randomTip}</p>
      </section>
    </div>
  );
}
