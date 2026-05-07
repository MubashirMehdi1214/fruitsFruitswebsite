"use client";

type Props = { url: string; title: string };

export default function ShareButtons({ url, title }: Props) {
  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: "Twitter", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` }
  ];
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="rounded bg-brand px-3 py-2 text-sm text-white">
          Share on {link.label}
        </a>
      ))}
    </div>
  );
}
