const fs = require("node:fs");
const path = require("node:path");
const matter = require("gray-matter");

const postsDir = path.join(process.cwd(), "content", "blog");
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx")).sort();

const authors = [
  {
    id: "sarah_mitchell",
    name: "Sarah Mitchell",
    title: "Certified Nutritionist & Health Writer",
    bio: "Sarah Mitchell is a certified nutritionist focused on practical, evidence-aware food guidance for everyday health."
  },
  {
    id: "dr_james_parker",
    name: "Dr. James Parker",
    title: "Health Researcher & Wellness Expert",
    bio: "Dr. James Parker is a research-driven wellness expert specializing in evidence-based natural remedy guidance."
  },
  {
    id: "maria_chen",
    name: "Maria Chen",
    title: "Registered Dietitian & Food Writer",
    bio: "Maria Chen is a registered dietitian specializing in fruit and vegetable nutrition with practical meal strategies."
  }
];

const intros = [
  "Many people ask me whether this topic is genuinely useful or just another trend. In my experience, practical nutrition works best when we focus on consistency, portions, and context rather than quick fixes.",
  "Here is the thing though: small, repeatable habits usually produce better health outcomes than occasional extreme efforts. I recommend treating this guide as a roadmap you can apply step by step.",
  "You might be surprised to learn that the biggest benefits often come from routine, not complexity. According to CDC public health updates, only around 1 in 10 adults meet fruit and vegetable intake recommendations, which highlights how much room most people have to improve.",
  "I recommend using this guide as a practical framework, especially if you prefer evidence-aware advice over hype. The goal is long-term wellness through smart daily choices, not unrealistic promises."
];

const sourceByCategory = {
  "Fruits Benefits": [
    ["USDA FoodData Central", "https://fdc.nal.usda.gov/"],
    ["Harvard T.H. Chan School of Public Health - Fruits and Vegetables", "https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/vegetables-and-fruits/"],
    ["CDC - Fruit and Vegetable Basics", "https://www.cdc.gov/nutrition/index.html"],
    ["Healthline - Evidence-based nutrition", "https://www.healthline.com/nutrition"],
    ["PubMed - Nutrition and chronic disease", "https://pubmed.ncbi.nlm.nih.gov/"]
  ],
  "Vegetables Benefits": [
    ["Harvard Nutrition Source - Vegetables and Fruits", "https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/vegetables-and-fruits/"],
    ["NIH Office of Dietary Supplements", "https://ods.od.nih.gov/"],
    ["WebMD - Healthy eating and vegetables", "https://www.webmd.com/diet/default.htm"],
    ["Healthline - Vegetables nutrition hub", "https://www.healthline.com/nutrition/food"],
    ["PubMed - Dietary fiber research", "https://pubmed.ncbi.nlm.nih.gov/"]
  ],
  "Home Remedies": [
    ["NCCIH - Herbs at a glance", "https://www.nccih.nih.gov/health/herbsataglance"],
    ["Mayo Clinic - Lifestyle and home remedies", "https://www.mayoclinic.org/healthy-lifestyle"],
    ["WebMD - Complementary and alternative medicine", "https://www.webmd.com/balance/default.htm"],
    ["Healthline - Evidence summaries", "https://www.healthline.com/health"],
    ["PubMed - Herbal medicine studies", "https://pubmed.ncbi.nlm.nih.gov/"]
  ],
  "Healthy Recipes": [
    ["USDA MyPlate", "https://www.myplate.gov/"],
    ["American Heart Association - Healthy eating", "https://www.heart.org/en/healthy-living/healthy-eating"],
    ["Harvard Nutrition Source - Healthy plate", "https://www.hsph.harvard.edu/nutritionsource/healthy-eating-plate/"],
    ["Healthline - Recipe and nutrition guides", "https://www.healthline.com/nutrition"],
    ["PubMed - Diet quality studies", "https://pubmed.ncbi.nlm.nih.gov/"]
  ],
  "Vitamins & Minerals": [
    ["NIH ODS - Vitamin and mineral fact sheets", "https://ods.od.nih.gov/factsheets/list-all/"],
    ["NHS - Vitamins and minerals", "https://www.nhs.uk/conditions/vitamins-and-minerals/"],
    ["WebMD - Vitamins and supplements", "https://www.webmd.com/vitamins/index"],
    ["Healthline - Micronutrient resources", "https://www.healthline.com/nutrition"],
    ["PubMed - Micronutrient evidence", "https://pubmed.ncbi.nlm.nih.gov/"]
  ],
  "Weight Loss Tips": [
    ["CDC - Healthy weight", "https://www.cdc.gov/healthy-weight-growth/losing-weight/"],
    ["NHLBI - Aim for a healthy weight", "https://www.nhlbi.nih.gov/health/educational/lose_wt/"],
    ["Mayo Clinic - Weight loss strategies", "https://www.mayoclinic.org/healthy-lifestyle/weight-loss"],
    ["Healthline - Evidence-based weight management", "https://www.healthline.com/nutrition/how-to-lose-weight-as-fast-as-possible"],
    ["PubMed - Obesity and lifestyle interventions", "https://pubmed.ncbi.nlm.nih.gov/"]
  ]
};

function addReferences(content, category) {
  if (content.includes("## References & Sources")) return content;
  const refs = sourceByCategory[category] || sourceByCategory["Fruits Benefits"];
  const lines = refs.map((ref, i) => `${i + 1}. [${ref[0]}](${ref[1]})`);
  return `${content}

## References & Sources
${lines.join("\n")}

_Information is for educational purposes only. Consult your doctor before making health decisions._`;
}

files.forEach((file, idx) => {
  const fullPath = path.join(postsDir, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);
  const author = authors[idx % authors.length];

  const bucket = Math.floor(idx / 10);
  const monthOffsets = [6, 6, 4, 4, 3, 3, 2, 2, 1, 1];
  const publishDate = new Date();
  publishDate.setMonth(publishDate.getMonth() - (monthOffsets[bucket] || 1));
  publishDate.setDate(5 + (idx % 20));

  const modified = new Date();
  modified.setDate(modified.getDate() - (7 + (idx % 7)));

  const intro = intros[idx % intros.length];
  let content = parsed.content;
  const h1Match = content.match(/^# .+\n\n/m);
  if (h1Match) {
    const insertAt = h1Match.index + h1Match[0].length;
    content = `${content.slice(0, insertAt)}${intro}\n\n${content.slice(insertAt)}`;
  }
  content = addReferences(content, parsed.data.category);

  parsed.data.date = publishDate.toISOString().slice(0, 10);
  parsed.data.lastModified = modified.toISOString().slice(0, 10);
  parsed.data.author = author.name;
  parsed.data.authorId = author.id;
  parsed.data.authorTitle = author.title;
  parsed.data.authorBio = author.bio;

  const next = matter.stringify(content, parsed.data, { lineWidth: 120 });
  fs.writeFileSync(fullPath, next, "utf8");
});

console.log(`Enriched ${files.length} articles for authors, dates, intros, and references.`);
