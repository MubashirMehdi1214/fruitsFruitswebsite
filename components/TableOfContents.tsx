"use client";

import { useState } from "react";

type TocItem = { id: string; text: string };

export default function TableOfContents({ items, collapsible = false }: { items: TocItem[]; collapsible?: boolean }) {
  const [open, setOpen] = useState(!collapsible);
  if (!items.length) return null;

  return (
    <aside className="rounded-xl border bg-white p-4">
      <button
        type="button"
        onClick={() => collapsible && setOpen((prev) => !prev)}
        className="flex min-h-[44px] w-full items-center justify-between text-left"
      >
        <h3 className="font-bold text-gray-900">Table of Contents</h3>
        {collapsible && <span className={`text-green-700 transition-transform ${open ? "rotate-90" : ""}`}>▶</span>}
      </button>
      <ul className={`mt-3 space-y-2 text-sm ${open ? "block" : "hidden"}`}>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="text-gray-600 underline-offset-2 hover:text-brand hover:underline">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
