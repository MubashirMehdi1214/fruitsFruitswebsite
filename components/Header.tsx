"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="container-default flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold text-brand">
          Health Fruits Tips
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="min-h-[44px] py-2 hover:text-brand">
              {item.label}
            </Link>
          ))}
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
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-72 bg-white p-5 shadow-2xl transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <p className="font-semibold text-brand">Menu</p>
          <button type="button" onClick={() => setMobileOpen(false)} className="rounded-full p-2 text-gray-600" aria-label="Close menu">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="space-y-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block min-h-[44px] rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  );
}
