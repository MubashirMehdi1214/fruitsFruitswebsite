"use client";

import { useState } from "react";

type Props = { url: string; title: string };

export default function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);
  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: "Twitter", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` }
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
    <div className="mt-6 flex flex-wrap gap-3">
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
  );
}
