"use client";

import { useState } from "react";

type FAQItem = { question: string; answer: string };

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items.length) return null;

  return (
    <section className="mt-10">
      <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
      <div className="mt-4 space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <article key={item.question} className="overflow-hidden rounded-xl border border-green-100 bg-white">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex min-h-[44px] w-full items-center justify-between px-4 py-4 text-left"
              >
                <span className="font-semibold text-gray-900">{item.question}</span>
                <span className={`text-green-700 transition-transform ${isOpen ? "rotate-90" : ""}`}>▶</span>
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden px-4">
                  <p className="pb-4 text-gray-700">{item.answer}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
