import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import AdUnit from "@/components/AdUnit";
import { getAllPosts } from "@/lib/posts";
import { categorySlug, categories, siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Home",
  description: "Trusted fruit benefits, healthy recipes, vitamins and home remedy guides.",
  alternates: { canonical: "/" }
};
export const revalidate = 3600;

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.slice(0, 3);
  const latest = posts.slice(0, 6);
  const categoryDesign = [
    { name: "Fruits Benefits", icon: "🍎", tone: "bg-rose-50 text-rose-700 ring-rose-100" },
    { name: "Vegetables Benefits", icon: "🥦", tone: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
    { name: "Home Remedies", icon: "🌿", tone: "bg-lime-50 text-lime-700 ring-lime-100" },
    { name: "Healthy Recipes", icon: "🍵", tone: "bg-amber-50 text-amber-700 ring-amber-100" },
    { name: "Vitamins & Minerals", icon: "💊", tone: "bg-sky-50 text-sky-700 ring-sky-100" },
    { name: "Weight Loss Tips", icon: "🥗", tone: "bg-teal-50 text-teal-700 ring-teal-100" }
  ];

  const categoryCounts = categories.reduce<Record<string, number>>((acc, category) => {
    acc[category] = posts.filter((post) => post.category === category).length;
    return acc;
  }, {});

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="container-default py-8 md:py-10">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#15803d] to-[#86efac] p-8 text-white shadow-lg md:p-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
              Discover Nature&apos;s Best Health Secrets
            </h1>
            <p className="mt-4 max-w-xl text-base text-emerald-50 md:text-lg">
              Explore benefits of fruits, vegetables and natural remedies for a healthier life
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="rounded-full bg-green-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-950"
              >
                Explore Articles
              </Link>
              <Link
                href="#categories"
                className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-green-700"
              >
                View Categories
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-green-900 md:text-sm">
              {["30+ Articles", "100% Natural", "Expert Reviewed"].map((badge) => (
                <span key={badge} className="rounded-full bg-white/85 px-3 py-1">
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-3xl bg-white/15 p-5 backdrop-blur-sm">
              <svg viewBox="0 0 420 300" role="img" aria-label="Fruit and wellness illustration" className="h-auto w-full">
                <rect x="0" y="0" width="420" height="300" rx="28" fill="rgba(255,255,255,0.15)" />
                <circle cx="92" cy="92" r="38" fill="#f59e0b" />
                <circle cx="172" cy="98" r="38" fill="#ef4444" />
                <circle cx="252" cy="92" r="38" fill="#84cc16" />
                <circle cx="332" cy="98" r="38" fill="#f97316" />
                <rect x="50" y="170" width="320" height="90" rx="20" fill="rgba(255,255,255,0.9)" />
                <path d="M80 220 C120 180, 170 180, 210 220 C250 260, 300 260, 340 220" stroke="#15803d" strokeWidth="10" fill="none" />
                <path d="M76 170 C90 145, 118 145, 132 170" stroke="#14532d" strokeWidth="6" fill="none" />
                <path d="M156 174 C170 149, 198 149, 212 174" stroke="#14532d" strokeWidth="6" fill="none" />
                <path d="M236 170 C250 145, 278 145, 292 170" stroke="#14532d" strokeWidth="6" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-2 rounded-2xl border border-slate-100 bg-white px-5 py-5 shadow-sm md:px-8">
        <div className="grid grid-cols-2 gap-5 text-center sm:grid-cols-4">
          {[
            { label: "Health Articles", value: "30+" },
            { label: "Categories", value: "6" },
            { label: "Free Access", value: "100%" },
            { label: "Review Status", value: "Expert Reviewed" }
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-900">Most Popular Articles</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {featured.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {post.category}
              </span>
              <h3 className="mt-4 text-xl font-bold text-gray-900">{post.title}</h3>
              <p className="mt-3 line-clamp-2 text-sm text-gray-600">{post.metaDescription}</p>
              <p className="mt-4 text-xs text-gray-500">
                {post.readTime} • {formatDate(post.date)}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-green-700 transition group-hover:text-green-800"
              >
                Read More <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="categories" className="mt-12">
        <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {categoryDesign.map((category) => (
            <Link
              key={category.name}
              href={`/category/${categorySlug(category.name)}`}
              className={`group rounded-2xl p-5 ring-1 transition duration-200 hover:-translate-y-1 hover:shadow-md ${category.tone}`}
            >
              <span className="text-3xl">{category.icon}</span>
              <h3 className="mt-3 text-lg font-semibold">{category.name}</h3>
              <p className="text-sm opacity-80">{categoryCounts[category.name] ?? 0} articles</p>
            </Link>
          ))}
        </div>
      </section>

      <AdUnit slot="between-posts" className="mx-auto max-w-[728px]" format="horizontal" />

      <div className="md:hidden"><AdUnit slot="article-inline" className="mx-auto max-w-[336px]" /></div>

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {latest.map((post) => (
            <article key={post.slug} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-700">{post.category}</p>
              <h3 className="mt-2 text-lg font-bold text-gray-900">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">{post.metaDescription}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-semibold text-green-700 hover:text-green-800">
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl bg-green-700 px-6 py-10 text-white md:px-10">
        <h2 className="text-3xl font-bold">Get Weekly Health Tips</h2>
        <p className="mt-2 text-green-100">Get practical wellness insights, fruit guides, and simple nutrition advice every week.</p>
        <form className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="w-full rounded-full border border-white/30 px-5 py-3 text-gray-900 placeholder:text-gray-500 sm:max-w-md"
          />
          <button className="rounded-full bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50">
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-xs text-green-100">We respect your privacy. No spam, unsubscribe anytime.</p>
      </section>

      <Script id="website-schema" type="application/ld+json">
        {JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url })}
      </Script>
    </div>
  );
}
