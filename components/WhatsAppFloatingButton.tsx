import Link from "next/link";
import { siteConfig } from "@/lib/utils";

export default function WhatsAppFloatingButton() {
  const number = siteConfig.contact.whatsapp.replace(/[^\d]/g, "");
  return (
    <Link
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-20 right-4 z-50 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-[#25D366] p-3 text-white shadow-lg transition hover:scale-105 md:bottom-6"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-500" />
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M20.5 3.5A11.8 11.8 0 0012.07 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.16 1.6 5.98L0 24l6.28-1.66a11.86 11.86 0 005.78 1.48h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.47-8.42zm-8.43 18.3h-.01a9.9 9.9 0 01-5.05-1.38l-.36-.21-3.73.99 1-3.64-.23-.37a9.85 9.85 0 01-1.52-5.27c0-5.45 4.44-9.9 9.91-9.9 2.65 0 5.13 1.03 6.99 2.89a9.83 9.83 0 012.91 7c0 5.46-4.45 9.9-9.91 9.9z" />
      </svg>
      <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
        Chat with us
      </span>
    </Link>
  );
}

