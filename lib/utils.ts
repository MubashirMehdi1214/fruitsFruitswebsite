export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Health Fruits Tips",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
  description: "Evidence-based health and fruits benefits blog with practical wellness guidance."
};

export const categories = [
  "Fruits Benefits",
  "Vegetables Benefits",
  "Home Remedies",
  "Healthy Recipes",
  "Vitamins & Minerals",
  "Weight Loss Tips"
];

export const categorySlug = (category: string) =>
  category.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");
