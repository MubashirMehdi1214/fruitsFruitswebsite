"use client";

import { useState } from "react";

type Props = { url: string; title: string };

export default function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(17);
  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: "Twitter", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { label: "Pinterest", href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}` }
  ];

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (_error) {
      setCopied(false);
    }
  };

  return (
    <div className="mt-6 space-y-3">
      <div className="flex flex-wrap items-center gap-3 rounded-lg bg-green-50 p-3">
        <p className="text-sm font-medium text-gray-700">Did you find this helpful?</p>
        <button
          type="button"
          onClick={() => setHelpfulCount((prev) => prev + 1)}
          className="min-h-[36px] rounded-full bg-white px-3 text-sm font-semibold text-green-700"
        >
          👍 Yes ({helpfulCount})
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="min-h-[44px] rounded bg-brand px-3 py-2 text-sm text-white">
          Share on {link.label}
        </a>
      ))}
      <button
        type="button"
        onClick={onCopy}
        className="min-h-[44px] rounded border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
      </div>
    </div>
  );
}
