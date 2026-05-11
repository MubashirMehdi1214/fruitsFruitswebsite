import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/utils";

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
  "/free-guides"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "/free-guides" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8
  }));
}
