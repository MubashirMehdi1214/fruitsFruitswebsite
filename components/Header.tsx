"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, categorySlug } from "@/lib/utils";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition ${scrolled ? "shadow-md" : ""}`}>
      <div className="container-default flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold text-brand">
          <span role="img" aria-label="leaf">🍃</span> Health Fruits Tips
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <Link href="/" className="min-h-[44px] py-2 hover:text-brand">Home</Link>
          <div className="relative" onMouseEnter={() => setShowCategories(true)} onMouseLeave={() => setShowCategories(false)}>
            <button type="button" className="min-h-[44px] py-2 hover:text-brand">Categories ▾</button>
            {showCategories && (
              <div className="absolute left-0 top-full w-64 rounded-xl border bg-white p-2 shadow-lg">
                {categories.map((category) => (
                  <Link key={category} href={`/category/${categorySlug(category)}`} className="block rounded-lg px-3 py-2 text-sm hover:bg-green-50">
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/about" className="min-h-[44px] py-2 hover:text-brand">About</Link>
          <Link href="/contact" className="min-h-[44px] py-2 hover:text-brand">Contact</Link>
          <button type="button" onClick={() => setShowSearch((prev) => !prev)} className="rounded-full p-2 text-gray-600" aria-label="Toggle search">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20L16.65 16.65" />
            </svg>
          </button>
          {showSearch && <input placeholder="Search..." className="h-10 w-52 rounded-full border px-4 text-sm" />}
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <button type="button" className="rounded-full p-2 text-gray-600" aria-label="Search">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20L16.65 16.65" />
            </svg>
          </button>
          <button type="button" onClick={() => setMobileOpen(true)} className="rounded-full p-2 text-gray-600" aria-label="Open menu">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMobileOpen(false)}
      />
      <aside className={`fixed right-0 top-0 z-50 h-full w-full bg-white p-5 shadow-2xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="mb-6 flex items-center justify-between">
          <p className="font-semibold text-brand">Menu</p>
          <button type="button" onClick={() => setMobileOpen(false)} className="rounded-full p-2 text-gray-600" aria-label="Close menu">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="space-y-2">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block min-h-[44px] rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50">Home</Link>
          <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Categories</p>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${categorySlug(category)}`}
              onClick={() => setMobileOpen(false)}
              className="block min-h-[44px] rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50"
            >
              {category}
            </Link>
          ))}
          <Link href="/about" onClick={() => setMobileOpen(false)} className="block min-h-[44px] rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50">About</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="block min-h-[44px] rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50">Contact</Link>
        </nav>
      </aside>
    </header>
  );
}
