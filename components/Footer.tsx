import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { categories, categorySlug, siteConfig } from "@/lib/utils";

export default function Footer() {
  const allPosts = getAllPosts();
  const contact = siteConfig.contact;

  return (
    <footer className="mt-16 bg-[#0f172a] py-12 text-slate-200">
      <div className="container-default grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold">🍃 Health Fruits Tips</p>
          <p className="mt-3 text-sm text-slate-300">Trusted practical nutrition and wellness content for everyday families.</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {["Facebook", "Pinterest", "Twitter", "WhatsApp", "Instagram"].map((social) => (
              <span key={social} className="rounded-full bg-slate-700 px-3 py-1">{social}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/disclaimer">Disclaimer</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/free-guides">Free Guides</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Categories</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category} className="flex items-center justify-between gap-2">
                <Link href={`/category/${categorySlug(category)}`}>{category}</Link>
                <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs">
                  {allPosts.filter((post) => post.category === category).length}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Contact Info</h3>
          <p className="mt-3 text-sm text-slate-300">{contact.email}</p>
          <p className="mt-2 text-sm text-slate-300">{contact.whatsapp}</p>
          <p className="mt-2 text-sm text-slate-300">Pakistan</p>
          <p className="mt-2 text-sm text-slate-300">Response time: Within 24 hours</p>
        </div>
      </div>
      <div className="container-default mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-700 pt-5 text-xs text-slate-300 md:flex-row">
        <p>Copyright 2026 Health Fruits Tips. All Rights Reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>
        <p>Made with ❤️ for health lovers</p>
      </div>
    </footer>
  );
}
