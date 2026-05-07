import Link from "next/link";

type Item = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Item[] }) {
  return (
    <nav className="mb-6 text-sm text-gray-500">
      {items.map((item, i) => (
        <span key={item.label}>
          {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
          {i < items.length - 1 ? " / " : ""}
        </span>
      ))}
    </nav>
  );
}
