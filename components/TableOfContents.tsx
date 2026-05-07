type TocItem = { id: string; text: string };

export default function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <aside className="sticky top-24 rounded-lg border bg-white p-4">
      <h3 className="font-bold text-gray-900">Table of Contents</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="text-gray-600 hover:text-brand">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
