import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdUnit from "@/components/AdUnit";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { siteConfig } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-merriweather", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "XXXXXXXXXX"
  },
  alternates: { canonical: "/" },
  openGraph: { title: siteConfig.name, description: siteConfig.description, url: siteConfig.url, siteName: siteConfig.name, type: "website" },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable} font-sans`}>
        <Header />
        <div className="container-default">
          <AdUnit slot="header" desktopOnly className="mx-auto my-2 max-w-[728px] md:my-3" format="horizontal" />
        </div>
        <main>{children}</main>
        <div className="container-default">
          <AdUnit slot="footer" className="mx-auto my-6 max-w-[728px] md:my-8" format="horizontal" />
        </div>
        <Footer />
        <WhatsAppFloatingButton />
        <AdUnit slot="mobile-sticky" mobileOnly className="fixed bottom-0 left-0 right-0 z-50 m-0 bg-white px-2 py-1 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]" />
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            id="adsense-script"
            strategy="lazyOnload"
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          />
        )}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"}');`}
        </Script>
        <Script id="ga4-events" strategy="afterInteractive">
          {`(function () {
            if (typeof window === 'undefined' || typeof gtag !== 'function') return;
            const start = Date.now();
            let maxScroll = 0;
            const scrollHandler = function () {
              const docHeight = document.documentElement.scrollHeight - window.innerHeight;
              if (docHeight <= 0) return;
              const pct = Math.round((window.scrollY / docHeight) * 100);
              if (pct > maxScroll) maxScroll = pct;
            };
            window.addEventListener('scroll', scrollHandler, { passive: true });
            document.addEventListener('click', function (e) {
              const target = e.target;
              if (!target || !(target instanceof Element)) return;
              const el = target.closest('a,button');
              if (!el) return;
              gtag('event', 'ui_click', { label: (el.textContent || '').trim().slice(0, 60) });
            });
            window.addEventListener('beforeunload', function () {
              gtag('event', 'engagement_summary', {
                scroll_depth: maxScroll,
                time_on_page_sec: Math.round((Date.now() - start) / 1000)
              });
            });
          })();`}
        </Script>
        <Script id="org-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url
          })}
        </Script>
      </body>
    </html>
  );
}
