"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import AdUnit from "@/components/AdUnit";
import { categorySlug } from "@/lib/utils";

type HomePost = {
  title: string;
  slug: string;
  date: string;
  category: string;
  readTime: string;
  metaDescription: string;
};

type Props = { posts: HomePost[] };

type Slide = {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  gradient: string;
  art: "fruits" | "shield" | "herbs" | "vegetables" | "journey";
};

const slides: Slide[] = [
  {
    title: "Discover Nature's Best Health Secrets",
    subtitle: "Explore benefits of fruits, vegetables and natural remedies",
    cta: "Explore Articles",
    href: "/blog",
    gradient: "from-[#15803d] to-[#86efac]",
    art: "fruits"
  },
  {
    title: "10 Superfruits That Boost Your Immunity",
    subtitle: "Nature's pharmacy is closer than you think",
    cta: "Read Article",
    href: "/blog/mango-health-benefits",
    gradient: "from-[#ea580c] to-[#fed7aa]",
    art: "shield"
  },
  {
    title: "Home Remedies That Actually Work",
    subtitle: "Traditional wisdom backed by modern science",
    cta: "Explore Remedies",
    href: "/category/home-remedies",
    gradient: "from-[#7c3aed] to-[#ddd6fe]",
    art: "herbs"
  },
  {
    title: "Vegetables That Fight Disease Naturally",
    subtitle: "Add these to your diet starting today",
    cta: "See List",
    href: "/category/vegetables-benefits",
    gradient: "from-[#dc2626] to-[#fca5a5]",
    art: "vegetables"
  },
  {
    title: "Start Your Healthy Journey Today",
    subtitle: "Free guides, tips and natural remedies",
    cta: "Get Started",
    href: "/about",
    gradient: "from-[#0369a1] to-[#bae6fd]",
    art: "journey"
  }
];

const categoryVisuals: Record<string, { icon: string; tone: string }> = {
  "Fruits Benefits": { icon: "🍎", tone: "from-rose-500 to-orange-400" },
  "Vegetables Benefits": { icon: "🥦", tone: "from-green-500 to-teal-500" },
  "Home Remedies": { icon: "🌿", tone: "from-amber-400 to-orange-500" },
  "Healthy Recipes": { icon: "🍵", tone: "from-pink-500 to-red-500" },
  "Vitamins & Minerals": { icon: "💊", tone: "from-blue-500 to-purple-500" },
  "Weight Loss Tips": { icon: "🥗", tone: "from-teal-500 to-green-500" }
};

const tips = [
  "🍋 Drink lemon water every morning to boost metabolism.",
  "🍎 Eat apple with skin for maximum fiber and nutrients.",
  "🧄 Crush garlic 10 minutes before cooking to activate allicin.",
  "🫐 Blueberries are best eaten fresh for maximum antioxidants.",
  "🍵 Drink green tea between meals, not with meals.",
  "🥑 Avocado helps absorb nutrients from other vegetables.",
  "🌿 Fresh ginger is 3x more potent than dried ginger.",
  "🍊 Vitamin C doubles iron absorption when eaten together."
];

const trendingHeadlines = [
  "Benefits of Mango Daily...",
  "Why You Should Eat More Garlic...",
  "Top 10 Immunity Boosting Fruits..."
];

function SlideArt({ art }: { art: Slide["art"] }) {
  const base = "h-52 w-full md:h-64";
  if (art === "fruits") {
    return (
      <svg className={base} viewBox="0 0 360 220" aria-hidden="true">
        <circle cx="80" cy="90" r="34" fill="#f59e0b">
          <animate attributeName="cy" values="90;78;90" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="170" cy="72" r="34" fill="#ef4444">
          <animate attributeName="cy" values="72;84;72" dur="4.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="255" cy="96" r="34" fill="#fb923c">
          <animate attributeName="cy" values="96;82;96" dur="4.4s" repeatCount="indefinite" />
        </circle>
      </svg>
    );
  }
  if (art === "shield") {
    return (
      <svg className={base} viewBox="0 0 360 220" aria-hidden="true">
        <path d="M180 28l72 24v58c0 46-30 72-72 88-42-16-72-42-72-88V52l72-24z" fill="#ffffffcc" />
        <path d="M180 66v82M140 108h80" stroke="#0f766e" strokeWidth="12" strokeLinecap="round" />
      </svg>
    );
  }
  if (art === "herbs") {
    return (
      <svg className={base} viewBox="0 0 360 220" aria-hidden="true">
        <path d="M80 178c12-56 50-82 112-96-16 48-44 78-112 96z" fill="#bbf7d0" />
        <path d="M150 180c20-68 64-98 126-116-14 62-56 102-126 116z" fill="#a7f3d0" />
        <circle cx="76" cy="74" r="18" fill="#fcd34d" />
      </svg>
    );
  }
  if (art === "vegetables") {
    return (
      <svg className={base} viewBox="0 0 360 220" aria-hidden="true">
        <rect x="62" y="70" width="56" height="90" rx="20" fill="#22c55e" />
        <circle cx="168" cy="110" r="42" fill="#84cc16" />
        <rect x="236" y="72" width="48" height="86" rx="18" fill="#fb923c" />
      </svg>
    );
  }
  return (
    <svg className={base} viewBox="0 0 360 220" aria-hidden="true">
      <circle cx="88" cy="112" r="44" fill="#bfdbfe" />
      <rect x="148" y="76" width="132" height="88" rx="20" fill="#ffffffcc" />
      <path d="M172 118h84M172 138h66" stroke="#0ea5e9" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return value;
}

function AnimatedStats({ totalArticles }: { totalArticles: number }) {
  const [visible, setVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!boxRef.current) return;
    const observer = new IntersectionObserver((entries) => setVisible(entries.some((entry) => entry.isIntersecting)), { threshold: 0.3 });
    observer.observe(boxRef.current);
    return () => observer.disconnect();
  }, []);

  const countArticles = useCountUp(totalArticles, visible);
  const countCategories = useCountUp(6, visible);
  const countFree = useCountUp(100, visible);
  const countReaders = useCountUp(50, visible);

  return (
    <section ref={boxRef} className="rounded-2xl border border-slate-100 bg-white px-5 py-6 shadow-sm md:px-8">
      <div className="grid grid-cols-2 gap-5 text-center sm:grid-cols-4">
        <div><p className="text-2xl font-bold text-gray-900">{countArticles}+</p><p className="text-sm text-gray-600">Health Articles</p></div>
        <div><p className="text-2xl font-bold text-gray-900">{countCategories}</p><p className="text-sm text-gray-600">Categories</p></div>
        <div><p className="text-2xl font-bold text-gray-900">{countFree}%</p><p className="text-sm text-gray-600">Free Access</p></div>
        <div><p className="text-2xl font-bold text-gray-900">{countReaders}K+</p><p className="text-sm text-gray-600">Monthly Readers</p></div>
      </div>
    </section>
  );
}

function LatestArticles({ posts }: { posts: HomePost[] }) {
  const tabs = [
    { key: "all", label: "All" },
    { key: "fruits", label: "Fruits" },
    { key: "vegetables", label: "Vegetables" },
    { key: "remedies", label: "Remedies" },
    { key: "recipes", label: "Recipes" },
    { key: "vitamins", label: "Vitamins" },
    { key: "weight", label: "Weight Loss" }
  ] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("all");
  const [visible, setVisible] = useState(9);

  const filtered = useMemo(() => {
    if (tab === "all") return posts;
    const map: Record<string, string> = {
      fruits: "Fruits Benefits",
      vegetables: "Vegetables Benefits",
      remedies: "Home Remedies",
      recipes: "Healthy Recipes",
      vitamins: "Vitamins & Minerals",
      weight: "Weight Loss Tips"
    };
    return posts.filter((post) => post.category === map[tab]);
  }, [posts, tab]);

  const showing = filtered.slice(0, visible);
  return (
    <section className="mt-14">
      <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => {
              setTab(item.key);
              setVisible(9);
            }}
            className={`min-h-[44px] rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === item.key ? "bg-green-700 text-white" : "bg-white text-gray-700 hover:bg-green-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${tab}-${visible}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {showing.map((post) => (
            <article key={post.slug} className="rounded-xl border-l-4 border-l-green-500 border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-700">{post.category}</p>
              <h3 className="mt-2 text-lg font-bold text-gray-900">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">{post.metaDescription}</p>
              <p className="mt-3 text-xs text-gray-500">{post.readTime} • {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
              <Link href={`/blog/${post.slug}`} className="mt-3 inline-block font-semibold text-green-700">Read more →</Link>
            </article>
          ))}
        </motion.div>
      </AnimatePresence>
      {visible < filtered.length && (
        <button type="button" onClick={() => setVisible((prev) => prev + 9)} className="mt-6 min-h-[44px] rounded-full bg-green-700 px-6 py-3 font-semibold text-white">
          Load More
        </button>
      )}
    </section>
  );
}

export default function HomeSections({ posts }: Props) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const tipsRef = useRef<HTMLDivElement | null>(null);
  const featuredSlugs = [
    "mango-health-benefits",
    "apple-health-benefits",
    "garlic-immunity-benefits",
    "turmeric-health-benefits",
    "green-tea-benefits",
    "pomegranate-benefits"
  ];
  const featuredPosts = featuredSlugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is HomePost => Boolean(post))
    .slice(0, 6);

  const categories = Object.keys(categoryVisuals).map((name) => ({
    name,
    ...categoryVisuals[name],
    count: posts.filter((post) => post.category === name).length
  }));

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActiveSlide((prev) => (prev + 1) % slides.length), 4000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const featuredWide = posts.find((post) => post.slug === "pomegranate-benefits") || posts[0];

  return (
    <>
      <section
        className="relative overflow-hidden rounded-3xl text-white shadow-xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className={`grid min-h-[360px] items-center gap-8 bg-gradient-to-r p-8 md:grid-cols-2 md:p-12 ${slides[activeSlide].gradient}`}
          >
            <div>
              <h1 className="font-serif text-[1.8rem] font-bold leading-tight md:text-[2.5rem]">{slides[activeSlide].title}</h1>
              <p className="mt-3 max-w-xl text-base md:text-lg">{slides[activeSlide].subtitle}</p>
              <Link href={slides[activeSlide].href} className="mt-7 inline-block min-h-[44px] rounded-full bg-white px-6 py-3 font-semibold text-gray-900">
                {slides[activeSlide].cta}
              </Link>
            </div>
            <SlideArt art={slides[activeSlide].art} />
          </motion.div>
        </AnimatePresence>
        <button type="button" onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-gray-900">‹</button>
        <button type="button" onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-gray-900">›</button>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button key={i} type="button" onClick={() => setActiveSlide(i)} className={`h-2 w-2 rounded-full ${i === activeSlide ? "bg-white" : "bg-white/40"}`} />
          ))}
        </div>
      </section>

      <section className="mt-4 overflow-hidden rounded-xl bg-green-900 text-white">
        <div className="flex items-center gap-4 px-4 py-3">
          <span className="shrink-0 font-semibold">🔥 Trending:</span>
          <div className="whitespace-nowrap animate-[ticker_20s_linear_infinite]">
            {[...trendingHeadlines, ...trendingHeadlines].map((title, idx) => (
              <Link key={`${title}-${idx}`} href="/blog" className="mx-6 underline decoration-transparent hover:decoration-white">{title}</Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8"><AnimatedStats totalArticles={posts.length} /></div>

      <section className="mt-14">
        <h2 className="text-3xl font-bold text-gray-900">Most Popular Articles</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <article key={post.slug} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
              <div className="h-2 bg-gradient-to-r from-green-500 to-lime-400" />
              <div className="p-5">
                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">{post.category}</span>
                <h3 className="mt-3 line-clamp-2 text-xl font-bold text-gray-900 transition group-hover:text-green-700">{post.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-gray-600">{post.metaDescription}</p>
                <p className="mt-4 text-xs text-gray-500">{post.readTime} | {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} | →</p>
                <Link href={`/blog/${post.slug}`} className="mt-3 inline-block text-sm font-semibold text-green-700">Read article</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="categories" className="mt-14">
        <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${categorySlug(category.name)}`}
              className={`group rounded-2xl bg-gradient-to-r p-6 text-white transition hover:scale-[1.02] ${category.tone}`}
            >
              <p className="text-5xl">{category.icon}</p>
              <h3 className="mt-4 text-xl font-bold">{category.name}</h3>
              <p className="mt-1 text-sm text-white/90">{category.count} articles</p>
              <p className="mt-3 text-sm font-semibold opacity-0 transition group-hover:opacity-100">Explore →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-900">Quick Health Tips</h2>
        <div className="mt-4 flex items-center gap-3">
          <button type="button" onClick={() => tipsRef.current?.scrollBy({ left: -320, behavior: "smooth" })} className="hidden min-h-[44px] rounded-full border bg-white px-3 lg:inline-flex">←</button>
          <div ref={tipsRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {tips.map((tip) => (
              <article key={tip} className="min-w-[280px] snap-start rounded-xl bg-green-50 p-4">
                <p className="text-sm leading-6 text-gray-700">{tip}</p>
              </article>
            ))}
          </div>
          <button type="button" onClick={() => tipsRef.current?.scrollBy({ left: 320, behavior: "smooth" })} className="hidden min-h-[44px] rounded-full border bg-white px-3 lg:inline-flex">→</button>
        </div>
      </section>

      {featuredWide && (
        <section className="mt-14 overflow-hidden rounded-2xl border-l-4 border-l-green-600 bg-white">
          <div className="grid md:grid-cols-5">
            <div className="h-64 bg-gradient-to-br from-green-600 to-lime-400 md:col-span-2" />
            <div className="p-7 md:col-span-3">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Featured</span>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">{featuredWide.title}</h2>
              <p className="mt-3 text-gray-600">{featuredWide.metaDescription}</p>
              <p className="mt-3 text-sm text-gray-500">Editorial Team • {new Date(featuredWide.date).toLocaleDateString()} • {featuredWide.readTime}</p>
              <Link href={`/blog/${featuredWide.slug}`} className="mt-5 inline-block rounded-full bg-green-700 px-6 py-3 font-semibold text-white">Read Full Article</Link>
            </div>
          </div>
        </section>
      )}

      <AdUnit slot="between-posts" className="mx-auto max-w-[728px]" format="horizontal" />
      <LatestArticles posts={posts} />

      <section className="mt-14 rounded-3xl bg-gradient-to-r from-green-900 to-green-700 p-6 text-white md:p-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">📧 Join 50,000+ Health Readers</h2>
            <p className="mt-3 text-green-100">Get practical, evidence-focused wellness tips every week.</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>✅ Weekly fruit & vegetable guides</li>
              <li>✅ Natural remedy recipes</li>
              <li>✅ Exclusive health tips</li>
            </ul>
          </div>
          <form className="space-y-3 rounded-2xl bg-white/10 p-5">
            <input placeholder="Your name" className="min-h-[44px] w-full rounded-lg border border-white/30 bg-white px-4 text-gray-900" />
            <input type="email" placeholder="Your email" className="min-h-[44px] w-full rounded-lg border border-white/30 bg-white px-4 text-gray-900" />
            <button className="min-h-[44px] w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white">Subscribe Free</button>
          </form>
        </div>
      </section>
    </>
  );
}
