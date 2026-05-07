"use client";

type Props = { slot: "header" | "in-content-1" | "in-content-2" | "sidebar" | "footer" | "mobile" };

const sizes: Record<Props["slot"], string> = {
  header: "728x90",
  "in-content-1": "336x280",
  "in-content-2": "336x280",
  sidebar: "300x250",
  footer: "728x90",
  mobile: "320x100"
};

export default function AdUnit({ slot }: Props) {
  const isDev = process.env.NODE_ENV !== "production";
  if (isDev) {
    return (
      <div className="my-6 flex min-h-[100px] w-full items-center justify-center rounded-md border-2 border-dashed border-brand bg-green-50 p-4 text-sm font-semibold text-brand">
        Ad Space - {sizes[slot]} ({slot})
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle block"
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-XXXXXXXXXXXXXXXX"}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
