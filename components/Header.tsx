"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { categories, categorySlug } from "@/lib/utils";

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    const next = [q, ...recentSearches.filter((item) => item.toLowerCase() !== q.toLowerCase())].slice(0, 6);
    setRecentSearches(next);
    localStorage.setItem("recent-searches", JSON.stringify(next));
    setShowSearchModal(false);
    setMobileOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("recent-searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (_error) {
        setRecentSearches([]);
      }
    }

    const keyHandler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setShowSearchModal(true);
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
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
          <Link href="/free-guides" className="min-h-[44px] py-2 hover:text-brand">Free Guides</Link>
          <Link href="/contact" className="min-h-[44px] py-2 hover:text-brand">Contact</Link>
          <button type="button" onClick={() => setShowSearchModal(true)} className="rounded-full p-2 text-gray-600" aria-label="Open search (Ctrl+K)">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20L16.65 16.65" />
            </svg>
          </button>
          <form onSubmit={submitSearch}>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles..."
              className="h-10 w-52 rounded-full border px-4 text-sm"
            />
          </form>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <button type="button" className="rounded-full p-2 text-gray-600" aria-label="Search" onClick={() => setShowSearchModal(true)}>
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
          <Link href="/free-guides" onClick={() => setMobileOpen(false)} className="block min-h-[44px] rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50">Free Guides</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="block min-h-[44px] rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50">Contact</Link>
        </nav>
      </aside>
      {showSearchModal && (
        <div className="fixed inset-0 z-[60] bg-black/40 p-4" onClick={() => setShowSearchModal(false)}>
          <div className="mx-auto mt-20 max-w-xl rounded-2xl bg-white p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-gray-800">Search Articles</p>
              <button type="button" onClick={() => setShowSearchModal(false)} className="text-sm text-gray-500">Close</button>
            </div>
            <form onSubmit={submitSearch}>
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Type title, excerpt or tag..."
                className="h-11 w-full rounded-xl border px-4 text-sm"
              />
            </form>
            {recentSearches.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase text-gray-500">Recent searches</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {recentSearches.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setQuery(item);
                        router.push(`/search?q=${encodeURIComponent(item)}`);
                        setShowSearchModal(false);
                      }}
                      className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
