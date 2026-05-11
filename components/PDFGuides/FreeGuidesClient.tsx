"use client";

import { useEffect, useRef, useState } from "react";
import type { GuideDefinition } from "@/components/PDFGuides/types";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function LazyGuidePreview({ guide }: { guide: GuideDefinition }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = wrapperRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="h-40 overflow-hidden rounded-xl border border-slate-200">
      {isVisible ? (
        <div
          className="flex h-full items-end p-4 text-white"
          style={{ backgroundImage: `linear-gradient(135deg, ${guide.coverGradient[0]}, ${guide.coverGradient[1]})` }}
          aria-label={`${guide.title} - free health guide PDF download preview`}
          role="img"
        >
          <div>
            <p className="text-2xl">{guide.coverEmoji}</p>
            <p className="mt-1 text-sm font-semibold leading-tight">{guide.title}</p>
          </div>
        </div>
      ) : (
        <div className="h-full animate-pulse bg-slate-100" />
      )}
    </div>
  );
}

export default function FreeGuidesClient({ guides }: { guides: GuideDefinition[] }) {
  const handleDownload = (guide: GuideDefinition) => {
    window.gtag?.("event", "guide_download", { guide_name: guide.fileName });
    window.location.href = `/api/guides/${guide.slug}`;
  };

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-r from-emerald-700 to-green-500 px-6 py-10 text-white md:px-10">
        <h1 className="text-3xl font-bold leading-tight md:text-4xl">
          Download Our Free Health Guides - Free Health Guide PDF Download Library
        </h1>
        <p className="mt-3 max-w-3xl text-sm md:text-base">
          10 professional PDF guides completely free. No signup required. Explore fruit benefits PDF free resources, home remedies handbook PDF content, healthy eating guide free download plans, and immunity boosting foods PDF guides.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {guides.map((guide) => (
          <article key={guide.slug} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
            <LazyGuidePreview guide={guide} />
            <div className="mt-4 flex items-start justify-between gap-2">
              <h2 className="text-lg font-semibold text-slate-900">{guide.title}</h2>
              <div className="flex gap-2 text-xs">
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700">FREE</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">{guide.pageCountLabel}</span>
              </div>
            </div>
            <p className="mt-2 min-h-10 text-sm text-slate-600">{guide.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {guide.topics.map((topic) => (
                <span key={topic} className="rounded-full bg-green-50 px-2.5 py-1 text-xs text-green-700">{topic}</span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleDownload(guide)}
              className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Download PDF
            </button>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-7">
        <h2 className="text-2xl font-bold text-emerald-900">Why Download Our Guides?</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-emerald-900 md:grid-cols-2">
          {[
            "100% Free Forever",
            "No Email Required",
            "Instant Download",
            "Science Backed Content",
            "Printable Format",
            "Share Freely"
          ].map((item) => (
            <p key={item} className="flex items-center gap-2">
              <span className="font-bold text-emerald-600">✓</span>
              {item}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
