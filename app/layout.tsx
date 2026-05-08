import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdUnit from "@/components/AdUnit";
import { siteConfig } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-merriweather", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
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
          <AdUnit slot="header" desktopOnly className="mx-auto max-w-[728px]" format="horizontal" />
        </div>
        <main>{children}</main>
        <div className="container-default">
          <AdUnit slot="footer" className="mx-auto max-w-[728px]" format="horizontal" />
        </div>
        <Footer />
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
      </body>
    </html>
  );
}
