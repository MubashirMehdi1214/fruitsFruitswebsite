const fs = require("node:fs");
const path = require("node:path");

const blogDir = path.join(process.cwd(), "content", "blog");
const imgDir = path.join(process.cwd(), "public", "images", "posts");

if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const paletteByCategory = {
  "Fruits Benefits": ["#dc2626", "#fb923c"],
  "Vegetables Benefits": ["#15803d", "#14b8a6"],
  "Home Remedies": ["#7c3aed", "#a78bfa"],
  "Healthy Recipes": ["#ea580c", "#fdba74"],
  "Vitamins & Minerals": ["#0369a1", "#60a5fa"],
  "Weight Loss Tips": ["#0f766e", "#34d399"]
};

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));

for (const file of files) {
  const fullPath = path.join(blogDir, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const title = (raw.match(/title:\s*"(.+)"/) || [])[1] || "Health Article";
  const slug = (raw.match(/slug:\s*"(.+)"/) || [])[1] || file.replace(".mdx", "");
  const category = (raw.match(/category:\s*"(.+)"/) || [])[1] || "Fruits Benefits";
  const [from, to] = paletteByCategory[category] || ["#15803d", "#86efac"];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#g)"/>
  <circle cx="1000" cy="130" r="90" fill="rgba(255,255,255,0.15)"/>
  <circle cx="150" cy="540" r="120" fill="rgba(255,255,255,0.12)"/>
  <rect x="90" y="120" width="1020" height="435" rx="28" fill="rgba(255,255,255,0.12)"/>
  <text x="130" y="230" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="700">${category}</text>
  <text x="130" y="300" fill="#ffffff" font-family="Arial, sans-serif" font-size="54" font-weight="700">${title
    .replace(/&/g, "&amp;")
    .slice(0, 46)}</text>
  <text x="130" y="360" fill="#e5e7eb" font-family="Arial, sans-serif" font-size="28">Evidence-based health guide</text>
</svg>`;

  fs.writeFileSync(path.join(imgDir, `${slug}.svg`), svg, "utf8");

  const updated = raw.replace(/featuredImage:\s*"[^"]+"/, `featuredImage: "/images/posts/${slug}.svg"`);
  fs.writeFileSync(fullPath, updated, "utf8");
}

console.log(`Generated ${files.length} featured SVGs and updated frontmatter.`);
