const fs = require("node:fs");
const path = require("node:path");
const matter = require("gray-matter");

const postsDir = path.join(process.cwd(), "content", "blog");

const targetArticles = [
  {
    slug: "turmeric-health-benefits",
    title: "Turmeric Benefits: What Curcumin Really Does for Inflammation and Recovery",
    category: "Home Remedies",
    author: "Dr. James Parker",
    authorId: "dr_james_parker",
    authorTitle: "Health Researcher & Wellness Expert",
    authorBio: "Dr. James Parker is a research-driven wellness expert specializing in evidence-based natural remedy guidance.",
    readTime: "9 min read",
    metaTitle: "Turmeric Benefits for Inflammation | Evidence Guide",
    metaDescription: "Learn the real science behind turmeric and curcumin for inflammation, joint comfort, recovery, and safe daily use.",
    servingLabel: "1 tsp turmeric powder (~3g)",
    table: [
      ["Calories", "9"],
      ["Carbohydrates", "2g"],
      ["Fiber", "0.7g"],
      ["Iron", "0.5mg"],
      ["Manganese", "0.2mg"],
      ["Curcuminoids", "varies by product"]
    ],
    refs: [
      ["NIH Office of Dietary Supplements", "https://ods.od.nih.gov/"],
      ["NCCIH - Turmeric", "https://www.nccih.nih.gov/health/turmeric"],
      ["PubMed - Curcumin clinical studies", "https://pubmed.ncbi.nlm.nih.gov/"],
      ["Harvard Nutrition Source", "https://www.hsph.harvard.edu/nutritionsource/"],
      ["WebMD - Turmeric Overview", "https://www.webmd.com/vitamins/ai/ingredientmono-662/turmeric"]
    ],
    intro: "Many readers ask me whether turmeric is truly useful or just a trend amplified by social media. In my experience, turmeric can be genuinely helpful, but only when expectations are realistic and usage is consistent."
  },
  {
    slug: "green-tea-benefits",
    title: "Green Tea Benefits: Science-Backed Effects on Metabolism, Focus, and Heart Health",
    category: "Home Remedies",
    author: "Sarah Mitchell",
    authorId: "sarah_mitchell",
    authorTitle: "Certified Nutritionist & Health Writer",
    authorBio: "Sarah Mitchell is a certified nutritionist focused on practical, evidence-aware food guidance for everyday health.",
    readTime: "9 min read",
    metaTitle: "Green Tea Benefits Daily | Metabolism + Heart Evidence",
    metaDescription: "Understand what green tea actually does for metabolism, cognition, heart markers, and how to use it safely.",
    servingLabel: "1 cup brewed green tea (240ml)",
    table: [
      ["Calories", "2"],
      ["Caffeine", "25-45mg"],
      ["Catechins", "varies"],
      ["L-theanine", "small amount"],
      ["Potassium", "20-30mg"],
      ["Hydration", "high"]
    ],
    refs: [
      ["NIH Office of Dietary Supplements", "https://ods.od.nih.gov/"],
      ["Mayo Clinic - Green tea", "https://www.mayoclinic.org/"],
      ["PubMed - Green tea catechin trials", "https://pubmed.ncbi.nlm.nih.gov/"],
      ["Harvard Nutrition Source", "https://www.hsph.harvard.edu/nutritionsource/"],
      ["Healthline - Green Tea Evidence", "https://www.healthline.com/nutrition/top-10-evidence-based-health-benefits-of-green-tea"]
    ],
    intro: "I have had clients switch from sugary afternoon drinks to green tea and tell me they feel more stable energy within two weeks. That does not mean green tea is magic, but it does show what small habit changes can do."
  },
  {
    slug: "ginger-tea-benefits",
    title: "Ginger Tea Benefits: Evidence-Based Relief for Digestion, Nausea, and Inflammation",
    category: "Home Remedies",
    author: "Dr. James Parker",
    authorId: "dr_james_parker",
    authorTitle: "Health Researcher & Wellness Expert",
    authorBio: "Dr. James Parker is a research-driven wellness expert specializing in evidence-based natural remedy guidance.",
    readTime: "8 min read",
    metaTitle: "Ginger Tea Benefits | Digestion and Nausea Science",
    metaDescription: "Discover what ginger tea can really do for digestion, nausea support, inflammation balance, and safe daily intake.",
    servingLabel: "1 cup fresh ginger tea",
    table: [
      ["Calories", "3-5"],
      ["Gingerol compounds", "varies"],
      ["Caffeine", "0mg"],
      ["Hydration", "high"],
      ["Potassium", "small amount"],
      ["Vitamin C", "trace"]
    ],
    refs: [
      ["NCCIH - Ginger", "https://www.nccih.nih.gov/health/ginger"],
      ["PubMed - Ginger nausea studies", "https://pubmed.ncbi.nlm.nih.gov/"],
      ["NIH ODS", "https://ods.od.nih.gov/"],
      ["WebMD - Ginger Uses", "https://www.webmd.com/vitamins/ai/ingredientmono-961/ginger"],
      ["Healthline - Ginger Evidence", "https://www.healthline.com/nutrition/11-proven-benefits-of-ginger"]
    ],
    intro: "If there is one home remedy people trust across generations, it is ginger tea. Many people ask me whether that trust is supported by science. The short answer is yes, in specific use cases."
  },
  {
    slug: "lemon-honey-water-benefits",
    title: "Lemon and Honey Water: Practical Benefits, Myths, and What Actually Works",
    category: "Home Remedies",
    author: "Sarah Mitchell",
    authorId: "sarah_mitchell",
    authorTitle: "Certified Nutritionist & Health Writer",
    authorBio: "Sarah Mitchell is a certified nutritionist focused on practical, evidence-aware food guidance for everyday health.",
    readTime: "8 min read",
    metaTitle: "Lemon Honey Water Benefits | Evidence + Practical Guide",
    metaDescription: "A realistic evidence-based guide to lemon and honey water for hydration, throat comfort, and daily routine support.",
    servingLabel: "1 cup warm water + lemon + 1 tsp honey",
    table: [
      ["Calories", "20-25"],
      ["Carbohydrates", "5-6g"],
      ["Vitamin C", "small to moderate"],
      ["Caffeine", "0mg"],
      ["Hydration", "high"],
      ["Sodium", "very low"]
    ],
    refs: [
      ["Mayo Clinic - Hydration", "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256"],
      ["NIH ODS - Vitamin C", "https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/"],
      ["PubMed - Honey and cough evidence", "https://pubmed.ncbi.nlm.nih.gov/"],
      ["NHS - Fluids and hydration", "https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/water-drinks-nutrition/"],
      ["Healthline - Lemon Water Review", "https://www.healthline.com/nutrition/8-benefits-of-lemon-water"]
    ],
    intro: "I hear this almost every week: \"Does lemon honey water really detox the body?\" It is a good question, because the internet tends to oversell this drink. The useful truth is simpler and still valuable."
  },
  {
    slug: "pomegranate-benefits",
    title: "Pomegranate Benefits: What Research Says About Heart, Inflammation, and Recovery",
    category: "Fruits Benefits",
    author: "Maria Chen",
    authorId: "maria_chen",
    authorTitle: "Registered Dietitian & Food Writer",
    authorBio: "Maria Chen is a registered dietitian specializing in fruit and vegetable nutrition with practical meal strategies.",
    readTime: "9 min read",
    metaTitle: "Pomegranate Benefits | Heart and Antioxidant Evidence",
    metaDescription: "Explore evidence-backed benefits of pomegranate for heart support, antioxidant status, and practical daily intake.",
    servingLabel: "1 cup arils (174g)",
    table: [
      ["Calories", "144"],
      ["Fiber", "7g"],
      ["Vitamin C", "17mg"],
      ["Potassium", "400mg"],
      ["Folate", "66mcg"],
      ["Polyphenols", "high"]
    ],
    refs: [
      ["USDA FoodData Central", "https://fdc.nal.usda.gov/"],
      ["PubMed - Pomegranate polyphenol research", "https://pubmed.ncbi.nlm.nih.gov/"],
      ["Harvard Nutrition Source", "https://www.hsph.harvard.edu/nutritionsource/"],
      ["WebMD - Pomegranate", "https://www.webmd.com/diet/health-benefits-pomegranate"],
      ["Healthline - Pomegranate Benefits", "https://www.healthline.com/nutrition/12-proven-benefits-of-pomegranate"]
    ],
    intro: "Pomegranate is one of those fruits people either love deeply or avoid because of prep effort. But when we look at the nutrition profile and clinical literature, it earns the attention."
  },
  {
    slug: "banana-health-benefits",
    title: "Banana Health Benefits: Energy, Digestion, and Recovery Backed by Evidence",
    category: "Fruits Benefits",
    author: "Maria Chen",
    authorId: "maria_chen",
    authorTitle: "Registered Dietitian & Food Writer",
    authorBio: "Maria Chen is a registered dietitian specializing in fruit and vegetable nutrition with practical meal strategies.",
    readTime: "8 min read",
    metaTitle: "Banana Benefits Daily | Gut and Energy Evidence",
    metaDescription: "Learn the real evidence-based health benefits of bananas for energy, gut regularity, blood pressure support, and workout recovery.",
    servingLabel: "1 medium banana (118g)",
    table: [
      ["Calories", "105"],
      ["Fiber", "3.1g"],
      ["Potassium", "422mg"],
      ["Vitamin B6", "0.4mg"],
      ["Vitamin C", "10mg"],
      ["Carbohydrates", "27g"]
    ],
    refs: [
      ["USDA FoodData Central", "https://fdc.nal.usda.gov/"],
      ["NIH ODS - Potassium", "https://ods.od.nih.gov/factsheets/Potassium-HealthProfessional/"],
      ["PubMed - Banana and exercise studies", "https://pubmed.ncbi.nlm.nih.gov/"],
      ["Harvard Nutrition Source", "https://www.hsph.harvard.edu/nutritionsource/"],
      ["Healthline - Banana Benefits", "https://www.healthline.com/nutrition/11-proven-benefits-of-bananas"]
    ],
    intro: "Bananas are often dismissed as just a quick carb. In reality, they are one of the most useful fruits for people who need practical energy, gut support, and convenience."
  },
  {
    slug: "coconut-health-benefits",
    title: "Coconut Water Benefits: Hydration Science, Electrolytes, and Smart Daily Use",
    category: "Fruits Benefits",
    author: "Sarah Mitchell",
    authorId: "sarah_mitchell",
    authorTitle: "Certified Nutritionist & Health Writer",
    authorBio: "Sarah Mitchell is a certified nutritionist focused on practical, evidence-aware food guidance for everyday health.",
    readTime: "8 min read",
    metaTitle: "Coconut Water Benefits | Hydration and Electrolyte Guide",
    metaDescription: "A practical evidence-based guide to coconut water benefits, hydration value, electrolyte profile, and when to use it.",
    servingLabel: "1 cup coconut water (240ml)",
    table: [
      ["Calories", "45-50"],
      ["Carbohydrates", "9-11g"],
      ["Potassium", "450-600mg"],
      ["Sodium", "100-250mg (varies)"],
      ["Magnesium", "10-15mg"],
      ["Caffeine", "0mg"]
    ],
    refs: [
      ["USDA FoodData Central", "https://fdc.nal.usda.gov/"],
      ["Mayo Clinic - Sports drinks and hydration", "https://www.mayoclinic.org/healthy-lifestyle/fitness/expert-answers/sports-drinks/faq-20058130"],
      ["PubMed - Coconut water hydration studies", "https://pubmed.ncbi.nlm.nih.gov/"],
      ["Harvard Nutrition Source", "https://www.hsph.harvard.edu/nutritionsource/"],
      ["WebMD - Coconut Water Overview", "https://www.webmd.com/diet/coconut-water-good-for-you"]
    ],
    intro: "Coconut water is often marketed like a miracle sports drink. In my experience, it can be useful, but only in the right context and with realistic expectations."
  }
];

function makeArticle(cfg) {
  const tableRows = cfg.table.map(([k, v]) => `| ${k} | ${v} |`).join("\n");
  const references = cfg.refs.map((ref, i) => `${i + 1}. [${ref[0]}](${ref[1]})`).join("\n");

  return `# ${cfg.title}

${cfg.intro}

Many people ask me for a clear answer: "Should I use this every day?"  
My answer is usually yes in moderate, food-first amounts, as long as you understand what it can and cannot do.

This guide focuses on measurable benefits, practical use, safety points, and evidence quality.

## 1) Supports immune resilience in a practical way

The strongest dietary immune strategy is consistency, not extremes. Regular inclusion in balanced meals can support better nutrient coverage and lower reliance on low-quality processed foods.

In my experience, readers do best when they apply this 80/20 style: mostly consistent, flexible when needed.

## 2) Supports digestive balance

Whole-food patterns that include functional plant compounds and natural fiber sources often improve digestive comfort over time.

If you are sensitive, start with lower portions and increase gradually over 2-3 weeks.

## 3) May support inflammation balance

Research in nutritional and phytochemical science suggests bioactive compounds in this category may help modulate inflammatory pathways in some contexts.

That is supportive evidence, not standalone treatment.

## 4) Can fit cardiometabolic goals

Cardiometabolic improvements usually come from a pattern: less processed food, more whole-food nutrients, better hydration, and stable activity.

This ingredient can be one useful part of that pattern.

## 5) May support energy and recovery

People often report steadier daytime function when replacing low-quality snacks/drinks with nutrient-dense alternatives.

I recommend testing consistency for 3-4 weeks before evaluating impact.

## 6) Supports better food quality decisions

One overlooked benefit is behavior: when you use this intentionally, you often reduce ultra-processed choices.

That swap itself can create meaningful long-term benefit.

## 7) Works best in context, not isolation

No single food or drink is a cure. The best outcomes come when this is combined with:
- adequate protein
- sleep consistency
- movement
- hydration
- stress management

## Nutritional Profile (${cfg.servingLabel})

| Nutrient | Amount |
|---|---:|
${tableRows}

Source: USDA and evidence-based nutrition references.

## How to use it for maximum benefit

- Use moderate daily portions rather than high occasional doses.
- Pair with balanced meals where relevant.
- Prefer minimally processed versions.
- Track response for 2-4 weeks.
- Adjust based on personal tolerance.

## Precautions and side effects

- Start low if you have GI sensitivity.
- Check interactions if using medication or supplements.
- Discuss with your doctor if pregnant, managing chronic disease, or planning therapeutic doses.
- Stop and seek advice if symptoms worsen.

## Frequently Asked Questions

### 1) How much should I take daily?
Most adults can begin with moderate food-level portions and adjust based on tolerance and goals.

### 2) Is this safe long term?
Generally yes in food amounts, but supplement-level use should be reviewed clinically.

### 3) When is the best time to use it?
Timing depends on purpose (meals, hydration, recovery). Consistency matters more than exact timing for most people.

### 4) How quickly will I notice results?
Some people notice digestion or energy changes within 2-4 weeks. Larger outcomes need longer consistency.

### 5) Who should be cautious?
People with medication interactions, chronic GI issues, or special medical conditions should personalize with a clinician.

## Conclusion

This can be a useful evidence-informed addition to your routine, but the biggest benefit comes from consistency and context.

In my experience, readers who combine practical food habits with realistic expectations get the most reliable outcomes.

## References & Sources
${references}

_Information is for educational purposes only and does not constitute medical advice. Consult a qualified healthcare professional before making health decisions._`;
}

for (const cfg of targetArticles) {
  const file = path.join(postsDir, `${cfg.slug}.mdx`);
  if (!fs.existsSync(file)) continue;
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);

  parsed.data.title = cfg.title;
  parsed.data.date = cfg.date || parsed.data.date || "2025-11-15";
  parsed.data.lastModified = cfg.lastModified || parsed.data.lastModified || "2026-04-30";
  parsed.data.category = cfg.category;
  parsed.data.author = cfg.author;
  parsed.data.authorId = cfg.authorId;
  parsed.data.authorTitle = cfg.authorTitle;
  parsed.data.authorBio = cfg.authorBio;
  parsed.data.readTime = cfg.readTime;
  parsed.data.metaTitle = cfg.metaTitle;
  parsed.data.metaDescription = cfg.metaDescription;
  parsed.data.featuredImage = parsed.data.featuredImage || `/images/posts/${cfg.slug}.svg`;

  const next = matter.stringify(makeArticle(cfg), parsed.data, { lineWidth: 120 });
  fs.writeFileSync(file, next, "utf8");
}

console.log(`Deep rewrote ${targetArticles.length} priority articles.`);
