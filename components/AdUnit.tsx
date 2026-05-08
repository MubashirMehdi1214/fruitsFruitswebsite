"use client";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";

type SlotName =
  | "header"
  | "in-content-1"
  | "in-content-2"
  | "sidebar-1"
  | "sidebar-2"
  | "between-posts"
  | "footer"
  | "mobile-sticky"
  | "article-inline";

type Props = {
  slot: SlotName;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  style?: CSSProperties;
  className?: string;
  sticky?: boolean;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
};

const slotConfig: Record<SlotName, { label: string; minHeight: string; adSlot: string }> = {
  header: { label: "728x90", minHeight: "90px", adSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER || "1111111111" },
  "in-content-1": { label: "336x280", minHeight: "280px", adSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT_1 || "2222222222" },
  "in-content-2": { label: "336x280", minHeight: "280px", adSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT_2 || "3333333333" },
  "sidebar-1": { label: "300x250", minHeight: "250px", adSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR_1 || "4444444444" },
  "sidebar-2": { label: "300x250", minHeight: "250px", adSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR_2 || "5555555555" },
  "between-posts": { label: "728x90 / 320x100", minHeight: "100px", adSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BETWEEN_POSTS || "6666666666" },
  footer: { label: "728x90 / 320x100", minHeight: "100px", adSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER || "7777777777" },
  "mobile-sticky": { label: "320x50", minHeight: "50px", adSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MOBILE_STICKY || "8888888888" },
  "article-inline": { label: "responsive", minHeight: "120px", adSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_INLINE || "9999999999" }
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdUnit({
  slot,
  format = "auto",
  style,
  className = "",
  sticky = false,
  mobileOnly = false,
  desktopOnly = false
}: Props) {
  const adRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const isDev = process.env.NODE_ENV !== "production";
  const cfg = slotConfig[slot];

  useEffect(() => {
    if (!adRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setIsVisible(true);
      },
      { rootMargin: "200px" }
    );
    observer.observe(adRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isDev || !isVisible || !adRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_error) {
      // Ads might fail silently in local or blocked environments.
    }
  }, [isDev, isVisible]);

  const visibilityClass = useMemo(() => {
    if (mobileOnly) return "md:hidden";
    if (desktopOnly) return "hidden md:block";
    return "";
  }, [mobileOnly, desktopOnly]);

  if (slot === "mobile-sticky" && isClosed) return null;

  return (
    <div
      ref={adRef}
      className={`my-12 ${visibilityClass} ${sticky ? "sticky top-24" : ""} ${className}`}
      style={{ minHeight: cfg.minHeight, ...style }}
      aria-label={`Advertisement: ${slot}`}
    >
      <p className="mb-2 text-center text-xs uppercase tracking-wide text-gray-400">Advertisement</p>
      {slot === "mobile-sticky" && (
        <button
          type="button"
          onClick={() => setIsClosed(true)}
          className="absolute right-2 top-1 z-10 rounded-full bg-white px-2 py-0.5 text-xs text-gray-500 shadow"
          aria-label="Close ad"
        >
          x
        </button>
      )}
      {isDev ? (
        <div className="flex w-full items-center justify-center rounded-md border-2 border-dashed border-brand bg-green-50 p-4 text-center text-sm font-semibold text-brand">
          Ad Placeholder - {slot} ({cfg.label})
        </div>
      ) : (
        <ins
          className="adsbygoogle block w-full overflow-hidden rounded-md border border-gray-100 bg-white"
          style={{ display: "block", minHeight: cfg.minHeight }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-XXXXXXXXXXXXXXXX"}
          data-ad-slot={cfg.adSlot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
