import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { categories, categorySlug, siteConfig } from "@/lib/utils";

export default function Footer() {
  const recent = getAllPosts().slice(0, 3);
  const contact = siteConfig.contact;

  return (
    <footer className="mt-16 bg-[#0f172a] py-12 text-slate-200">
      <div className="container-default grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold">🍃 Health Fruits Tips</p>
          <p className="mt-3 text-sm text-slate-300">Trusted guides on fruits, vegetables, natural remedies, and practical wellness.</p>
          <p className="mt-3 text-xs text-slate-300">{contact.phone}</p>
          <p className="text-xs text-slate-300">{contact.email}</p>
          <div className="mt-4 flex gap-2 text-xs">
            <span className="rounded-full bg-slate-700 px-3 py-1">FB</span>
            <span className="rounded-full bg-slate-700 px-3 py-1">TW</span>
            <span className="rounded-full bg-slate-700 px-3 py-1">IG</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/category/fruits-benefits">Categories</Link></li>
            <li><Link href="/free-guides">Free Resources</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Categories</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category}><Link href={`/category/${categorySlug(category)}`}>{category}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Recent Posts</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {recent.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="line-clamp-2">{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-default mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-700 pt-5 text-xs text-slate-300 md:flex-row">
        <p>© {new Date().getFullYear()} Health Fruits Tips. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}
