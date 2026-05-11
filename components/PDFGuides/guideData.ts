import { GuideDefinition, GuideSlug, ContentPage } from "@/components/PDFGuides/types";

const defaultDisclaimer =
  "This guide is educational only and does not replace medical advice, diagnosis, or treatment. Consult a qualified professional before making major dietary or supplement changes, especially if pregnant, nursing, taking medicines, or managing a medical condition.";

const referencesCore = [
  "World Health Organization (WHO) - Healthy diet guidance",
  "USDA FoodData Central nutrient database",
  "NIH Office of Dietary Supplements fact sheets",
  "Harvard T.H. Chan School of Public Health nutrition source",
  "Centers for Disease Control and Prevention (CDC) nutrition resources"
];

const fruitNames = [
  "Mango", "Apple", "Banana", "Orange", "Pomegranate",
  "Grapes", "Strawberry", "Pineapple", "Papaya", "Kiwi",
  "Blueberry", "Watermelon", "Avocado", "Coconut", "Lychee"
];

const fruitPages: ContentPage[] = fruitNames.map((fruit) => ({
  title: fruit,
  subtitle: "Top 5 benefits, nutrients, timing, and practical tips",
  bullets: [
    `Supports overall wellness with phytonutrients found in ${fruit.toLowerCase()}.`,
    "Provides hydration and fiber for digestive support.",
    "Contributes vitamins and antioxidants for immune resilience.",
    "Can support heart and metabolic health in balanced portions.",
    "Easy to include in breakfasts, snacks, and recovery meals."
  ],
  tableTitle: "Key Nutrients",
  tableHeaders: ["Nutrient", "Amount", "% Daily Value"],
  tableRows: [
    ["Vitamin C", "12-90 mg", "15-100%"],
    ["Fiber", "2-7 g", "7-25%"],
    ["Potassium", "150-550 mg", "3-12%"],
    ["Folate", "15-80 mcg", "4-20%"]
  ],
  infoBoxTitle: "Best Time To Eat",
  infoBoxContent: "Mid-morning or pre-workout with protein for better satiety and stable energy.",
  factBoxTitle: "Interesting Fact",
  factBoxContent: `${fruit} color compounds often indicate antioxidant diversity.`,
  tip: "Pro Tip: Pair with nuts or yogurt to improve fullness and glycemic response."
}));

const challengePages: ContentPage[] = Array.from({ length: 30 }, (_, index) => {
  const day = index + 1;
  const weekTheme = day <= 7 ? "Detox and cleanse" : day <= 14 ? "Energy boosting" : day <= 21 ? "Immunity building" : "Maintenance habits";
  return {
    title: `Day ${day}`,
    subtitle: `Week Theme: ${weekTheme}`,
    bullets: [
      "Morning ritual: lemon water + 10 minute walk.",
      "Breakfast: fruit + protein + whole grain.",
      "Lunch: half-plate vegetables, lean protein, healthy fat.",
      "Dinner: lighter meal, colorful vegetables, hydration.",
      "Snack: nuts, fruit, or yogurt."
    ],
    checklist: ["Hydration complete", "Whole foods only", "Walked 30 minutes", "7+ hours sleep"],
    tip: "Daily Health Tip: Focus on consistency over perfection.",
    quote: "Small healthy actions repeated daily create long-term transformation."
  };
});

const remediesConditions = [
  "Common Cold & Flu", "Digestive Issues", "Skin Health", "Sleep Problems",
  "Energy and Fatigue", "Immunity Boosting", "Weight Management", "Hair and Scalp"
];

const remediesPages: ContentPage[] = remediesConditions.flatMap((topic) => ([
  {
    title: `${topic} - Practical Remedies`,
    bullets: [
      "Core food-based approach and lifestyle protocol.",
      "Recipe ideas using kitchen ingredients.",
      "Timing and dosage guidance for adults.",
      "Supportive hydration and rest notes.",
      "Safety notes and interactions to review."
    ],
    infoBoxTitle: "Recipe Focus",
    infoBoxContent: "Use fresh ingredients and track response for 3-7 days.",
    factBoxTitle: "Avoid",
    factBoxContent: "Avoid self-medicating serious symptoms without evaluation."
  },
  {
    title: `${topic} - What Works Best`,
    bullets: [
      "Best evidence-backed ingredients for the condition.",
      "How to combine remedies with standard care.",
      "What to monitor and when to stop.",
      "Red flags requiring medical care.",
      "Simple printable routine."
    ],
    tip: "Pro Tip: Start with one remedy at a time so you can track effect."
  }
]));

const immunityFoods = [
  "Garlic", "Ginger", "Turmeric", "Citrus Fruits", "Spinach",
  "Broccoli", "Almonds", "Yogurt", "Green Tea", "Sunflower Seeds",
  "Papaya", "Kiwi", "Pomegranate", "Black Seed", "Mushrooms"
];

const immunityFoodPages = immunityFoods.map((food) => ({
  title: food,
  bullets: [
    `Key active compounds in ${food.toLowerCase()} and why they matter.`,
    "Daily practical serving size.",
    "Best preparation to retain nutrients.",
    "Combination ideas with other immunity foods.",
    "Evidence snapshot from nutrition literature."
  ],
  infoBoxTitle: "Research Note",
  infoBoxContent: "Prioritize whole-food patterns; single foods support but do not replace healthy routines."
}));

const vegetableNames = [
  "Spinach", "Broccoli", "Carrot", "Beetroot", "Tomato", "Cucumber",
  "Cabbage", "Cauliflower", "Onion", "Garlic", "Sweet Potato", "Peas",
  "Celery", "Kale", "Bell Pepper", "Mushroom", "Asparagus", "Zucchini"
];

const vegetablePages = vegetableNames.map((vegetable) => ({
  title: vegetable,
  bullets: [
    `Top benefits of ${vegetable.toLowerCase()} for daily health.`,
    "Nutritional density and fiber highlights.",
    "Best cooking method to preserve benefits.",
    "Pairs well with practical meal combinations.",
    "Use 3-5 times weekly in rotation."
  ],
  tableTitle: "Nutritional Highlights",
  tableHeaders: ["Nutrient", "Amount", "% Daily Value"],
  tableRows: [
    ["Fiber", "2-8 g", "8-28%"],
    ["Vitamin A/C/K", "Varies", "10-120%"],
    ["Folate", "20-190 mcg", "5-48%"],
    ["Potassium", "170-700 mg", "4-15%"]
  ],
  factBoxTitle: "Fun Fact",
  factBoxContent: `${vegetable} can fit in salads, stir-fries, soups, and roasted bowls.`
}));

const smoothieRecipes = [
  "Green Immunity Booster", "Tropical Energy Blast", "Berry Brain Power", "Mango Vitamin C Surge",
  "Banana Protein Recovery", "Detox Green Cleanse", "Anti-Inflammatory Golden", "Digestive Health Ginger",
  "Sleep Support Cherry", "Weight Loss Metabolism", "Skin Glow Collagen", "Heart Health Pomegranate",
  "Bone Strength Calcium", "Iron Rich Spinach Blend", "Mood Boost Serotonin", "Pre Workout Power",
  "Post Workout Recovery", "Kids Immunity Fun", "Senior Brain Health", "Diabetic Friendly Low GI"
];

const smoothiePages = smoothieRecipes.map((recipe) => ({
  title: recipe,
  subtitle: "Complete recipe card",
  bullets: [
    "Ingredients with practical household measurements.",
    "Step-by-step blending instructions.",
    "Nutritional highlights and key purpose.",
    "Variation tip for preference or allergy swaps.",
    "Best time to drink based on goal."
  ],
  infoBoxTitle: "Best Time",
  infoBoxContent: "Use morning/pre-workout for energy or evening options for recovery.",
  tip: "Variation: Swap dairy with unsweetened almond milk."
}));

export const guides: GuideDefinition[] = [
  {
    slug: "ultimate-fruit-benefits-guide",
    fileName: "ultimate-fruit-benefits-guide.pdf",
    title: "Ultimate Fruit Benefits Bible",
    subtitle: "A premium practical guide to fruit nutrition and smart usage",
    description: "Fruit benefits PDF free handbook with 15 fruits, nutrient tables, seasonal guidance, and smart combinations.",
    pageCountLabel: "29 Pages",
    approxPages: 29,
    coverEmoji: "🍎",
    coverGradient: ["#16a34a", "#4ade80"],
    seoKeywords: ["free health guide PDF download", "fruit benefits PDF free"],
    topics: ["Fruit benefits", "Nutrients", "Seasonal eating", "Storage tips"],
    medicalDisclaimer: defaultDisclaimer,
    contents: [
      { title: "Table of Contents", bullets: ["Introduction", "15 fruit profiles", "Seasonal fruit guide", "Storage and combinations", "References"] },
      { title: "Introduction - Why Fruits Matter", bullets: ["Fruits support fiber, hydration, micronutrients, and disease prevention patterns.", "Whole fruit beats juice for satiety and glycemic control.", "Aim for variety of colors throughout the week."] },
      ...fruitPages,
      { title: "Seasonal Fruit Guide", bullets: ["Spring: berries, kiwi, citrus", "Summer: mango, watermelon, grapes", "Autumn: apple, pomegranate, pear", "Winter: orange, guava, banana"] },
      { title: "How to Store Fruits Properly", bullets: ["Separate ethylene-producing fruits from sensitive produce.", "Refrigerate berries and cut fruit quickly.", "Keep bananas, mangoes at room temperature until ripe."] },
      { title: "Fruit Combinations to Avoid", bullets: ["Avoid very large mixed-fruit bowls after heavy meals.", "Limit fruit with sugary beverages.", "Choose simple pairings for digestion comfort."] },
      { title: "References and Sources", bullets: referencesCore }
    ],
    references: referencesCore,
    socials: ["Instagram: @healthfruitstips", "Facebook: @healthfruitstips", "X: @healthfruitstips"]
  },
  {
    slug: "30-day-healthy-eating-challenge",
    fileName: "30-day-healthy-eating-challenge.pdf",
    title: "30 Day Healthy Eating Challenge",
    subtitle: "A printable day-by-day challenge for lasting nutrition habits",
    description: "Healthy eating guide free download with 30 daily plans, checklists, shopping basics, and motivational prompts.",
    pageCountLabel: "35 Pages",
    approxPages: 35,
    coverEmoji: "🥗",
    coverGradient: ["#f97316", "#fb923c"],
    seoKeywords: ["healthy eating guide free download", "free health guide PDF download"],
    topics: ["30-day plan", "Meal structure", "Daily checklists", "Motivation"],
    medicalDisclaimer: defaultDisclaimer,
    contents: [
      { title: "How This Challenge Works", bullets: ["One day at a time with practical meals.", "Use checkboxes and weekly themes.", "Progress beats perfection."] },
      { title: "What You Need", bullets: ["Weekly grocery list basics", "Hydration bottle and meal prep boxes", "Simple kitchen tools"] },
      { title: "Rules of the Challenge", bullets: ["Whole foods first", "Hydrate consistently", "Sleep at least 7 hours", "Move daily"] },
      ...challengePages,
      { title: "Congratulations - What Next", bullets: ["Repeat with new recipes", "Keep top 5 habits", "Track bloodwork and energy changes quarterly"] }
    ],
    references: referencesCore,
    socials: ["Instagram: @healthfruitstips", "YouTube: Health Fruits Tips", "X: @healthfruitstips"]
  },
  {
    slug: "home-remedies-handbook",
    fileName: "home-remedies-handbook.pdf",
    title: "Complete Home Remedies Handbook",
    subtitle: "Safe, practical natural remedies for common concerns",
    description: "Home remedies handbook PDF with recipes, safety notes, quick reference chart, and doctor-visit guidance.",
    pageCountLabel: "28 Pages",
    approxPages: 28,
    coverEmoji: "🌿",
    coverGradient: ["#f59e0b", "#fbbf24"],
    seoKeywords: ["home remedies handbook PDF", "free health guide PDF download"],
    topics: ["Cold and flu", "Digestion", "Sleep", "Skin and hair"],
    medicalDisclaimer: defaultDisclaimer,
    contents: [
      { title: "Important Medical Disclaimer", bullets: [defaultDisclaimer] },
      { title: "Introduction to Natural Remedies", bullets: ["Natural tools can support mild symptoms.", "Use evidence-based ingredients and safe dosages.", "Escalate care for severe or persistent symptoms."] },
      { title: "Your Natural Medicine Cabinet", bullets: ["Ginger", "Turmeric", "Raw honey", "Peppermint", "Chamomile", "Garlic", "Lemon", "Aloe vera", "Coconut oil", "Apple cider vinegar"] },
      ...remediesPages,
      { title: "Remedies Quick Reference Chart", tableTitle: "Problem | Remedy", tableHeaders: ["Problem", "Primary Remedy", "Supportive Option"], tableRows: [["Cold", "Ginger honey tea", "Steam inhalation"], ["Bloating", "Peppermint tea", "Probiotic foods"], ["Sleep", "Chamomile", "Evening routine"], ["Hair fall", "Coconut oil", "Protein-rich diet"]] },
      { title: "When to See a Doctor", bullets: ["High fever >3 days", "Breathing difficulty", "Chest pain", "Persistent vomiting", "Symptoms in pregnancy or chronic disease"] }
    ],
    references: referencesCore,
    socials: ["Instagram: @healthfruitstips", "Facebook: @healthfruitstips", "Pinterest: Health Fruits Tips"]
  },
  {
    slug: "immunity-boosting-food-bible",
    fileName: "immunity-boosting-food-bible.pdf",
    title: "Immunity Boosting Food Bible",
    subtitle: "A practical food-first playbook for stronger immune support",
    description: "Immunity boosting foods PDF with 15 food profiles, nutrient science, meal plans, and smoothie recipes.",
    pageCountLabel: "22 Pages",
    approxPages: 22,
    coverEmoji: "🛡️",
    coverGradient: ["#7c3aed", "#a78bfa"],
    seoKeywords: ["immunity boosting foods PDF", "free health guide PDF download"],
    topics: ["Immune nutrients", "Top foods", "Meal plans", "Habits to avoid"],
    medicalDisclaimer: defaultDisclaimer,
    contents: [
      { title: "How Your Immune System Works", bullets: ["Innate and adaptive immunity explained simply.", "Sleep, stress, movement, and nutrition all matter.", "No single superfood replaces healthy habits."] },
      { title: "The 5 Key Nutrients for Immunity", bullets: ["Vitamin C", "Vitamin D", "Zinc", "Protein", "Omega-3 fats"] },
      ...immunityFoodPages,
      { title: "7 Day Immunity Boost Meal Plan", tableTitle: "Meal Plan", tableHeaders: ["Day", "Breakfast", "Lunch / Dinner"], tableRows: [["Mon", "Yogurt + berries", "Lentil bowl / fish + greens"], ["Tue", "Citrus + oats", "Chicken salad / veggie stir-fry"], ["Wed", "Kiwi smoothie", "Bean soup / turmeric rice"]] },
      { title: "Immunity Smoothie Recipes", bullets: ["Citrus Ginger Shield", "Green Zinc Boost", "Berry C Defense", "Turmeric Mango Shield", "Kiwi Spinach Spark"] },
      { title: "What Weakens Immunity", bullets: ["Chronic stress", "Sleep debt", "High ultra-processed food intake", "Smoking and heavy alcohol"] }
    ],
    references: referencesCore,
    socials: ["Instagram: @healthfruitstips", "X: @healthfruitstips", "YouTube: Health Fruits Tips"]
  },
  {
    slug: "natural-weight-loss-guide",
    fileName: "natural-weight-loss-guide.pdf",
    title: "Weight Loss With Natural Foods",
    subtitle: "Sustainable fat-loss strategies without extreme dieting",
    description: "Natural weight loss guide with food strategies, meal plans, workout fueling, and progress tracking templates.",
    pageCountLabel: "24 Pages",
    approxPages: 24,
    coverEmoji: "⚖️",
    coverGradient: ["#0f766e", "#14b8a6"],
    seoKeywords: ["healthy eating guide free download", "free health guide PDF download"],
    topics: ["Food strategy", "Meal plans", "Metabolism", "Tracking chart"],
    medicalDisclaimer: defaultDisclaimer,
    contents: [
      { title: "Important Disclaimer", bullets: [defaultDisclaimer] },
      { title: "Why Natural Weight Loss Works", bullets: ["Supports satiety, muscle retention, and energy balance.", "Avoids rebound from unsustainable restriction.", "Builds habits you can maintain long term."] },
      { title: "Calories vs Nutrition", bullets: ["Not all calories affect hunger equally.", "Protein and fiber improve satiety.", "Nutrient density matters for adherence and health."] },
      ...["Green tea", "Apple cider vinegar", "Lemon water", "Grapefruit", "Avocado", "Eggs", "Oats", "Legumes", "Chili pepper", "Coconut oil"].map((food) => ({
        title: food,
        bullets: ["How it supports weight goals", "How much to eat", "Best time to use", "Simple recipe idea"]
      })),
      { title: "Foods That Secretly Cause Weight Gain", bullets: ["Sugary coffee drinks", "Liquid calories", "Ultra-processed snacks", "Large portions of refined carbs"] },
      { title: "7 Day Kick-start Meal Plan", bullets: ["Realistic balanced meal pattern with snacks and hydration targets."] },
      { title: "Exercise + Food Combinations", bullets: ["Pre-workout: carbs + protein", "Post-workout: protein + produce", "Hydration timing"] },
      { title: "Metabolism Boosting Tips", bullets: ["Strength train regularly", "Increase protein", "Sleep 7-9 hours", "Manage stress", "Walk after meals"] },
      { title: "Progress Tracking Chart", tableTitle: "Weekly Weight Log", tableHeaders: ["Week", "Weight", "Notes"], tableRows: [["Week 1", "", ""], ["Week 2", "", ""], ["Week 3", "", ""], ["Week 4", "", ""]] }
    ],
    references: referencesCore,
    socials: ["Instagram: @healthfruitstips", "X: @healthfruitstips", "Facebook: @healthfruitstips"]
  },
  {
    slug: "complete-vegetable-guide",
    fileName: "complete-vegetable-guide.pdf",
    title: "Complete Vegetable Nutrition Guide",
    subtitle: "A practical, evidence-based vegetable handbook for everyday meals",
    description: "Complete vegetable nutrition guide with 18 vegetables, cooking methods, storage tips, and seasonal planning.",
    pageCountLabel: "26 Pages",
    approxPages: 26,
    coverEmoji: "🥦",
    coverGradient: ["#166534", "#22c55e"],
    seoKeywords: ["free health guide PDF download", "healthy eating guide free download"],
    topics: ["Vegetable benefits", "Cooking science", "Storage", "Seasonal calendar"],
    medicalDisclaimer: defaultDisclaimer,
    contents: [
      { title: "Why Vegetables Are Non-Negotiable", bullets: ["High nutrient density", "Fiber and gut support", "Cardiometabolic protection"] },
      { title: "Raw vs Cooked - What Science Says", bullets: ["Both forms have value", "Cooking may improve bioavailability for some nutrients", "Mix methods for best variety"] },
      ...vegetablePages,
      { title: "Seasonal Vegetable Calendar", bullets: ["Plan monthly produce rotation by climate and local market availability."] },
      { title: "How to Store Vegetables", bullets: ["Leafy greens in breathable bags", "Root vegetables cool and dry", "Herbs stem-down in water"] },
      { title: "Anti-nutrient Foods to Avoid", bullets: ["Avoid over-reliance on highly processed foods with low micronutrient density."] }
    ],
    references: referencesCore,
    socials: ["Instagram: @healthfruitstips", "Pinterest: Health Fruits Tips", "X: @healthfruitstips"]
  },
  {
    slug: "vitamins-minerals-complete-guide",
    fileName: "vitamins-minerals-complete-guide.pdf",
    title: "Vitamins and Minerals Complete Guide",
    subtitle: "Understand nutrients, deficiency signs, and practical food sources",
    description: "Vitamins and minerals complete guide covering fat-soluble, water-soluble vitamins, and key mineral charts.",
    pageCountLabel: "30 Pages",
    approxPages: 30,
    coverEmoji: "🧬",
    coverGradient: ["#2563eb", "#60a5fa"],
    seoKeywords: ["free health guide PDF download", "healthy eating guide free download"],
    topics: ["Vitamin science", "Deficiency signs", "Food sources", "Daily requirements"],
    medicalDisclaimer: defaultDisclaimer,
    contents: [
      { title: "Understanding Vitamins vs Minerals", bullets: ["Vitamins are organic compounds; minerals are inorganic elements.", "Both are essential for enzymes, hormones, and cell function."] },
      { title: "Fat Soluble vs Water Soluble", bullets: ["Fat-soluble: A, D, E, K", "Water-soluble: C and B-complex", "Storage and toxicity differ"] },
      ...["Vitamin A", "Vitamin A", "Vitamin D", "Vitamin D", "Vitamin E", "Vitamin E", "Vitamin K", "Vitamin K", "Vitamin C", "Vitamin C", "Vitamin B12", "Vitamin B12", "Vitamin B6", "Folate", "Iron", "Calcium", "Magnesium"].map((nutrient) => ({
        title: nutrient,
        bullets: ["Functions in body", "Deficiency signs", "Food sources", "Daily requirements", "Safety or toxicity note"]
      })),
      { title: "Deficiency Symptoms Chart", tableTitle: "Nutrient Deficiency Signs", tableHeaders: ["Nutrient", "Common Signs", "Action"], tableRows: [["Iron", "Fatigue, pallor", "Test ferritin/CBC"], ["B12", "Numbness, anemia", "Check B12 level"], ["Vitamin D", "Low mood, bone pain", "Check 25(OH)D"], ["Folate", "Anemia", "Diet + clinical guidance"]] }
    ],
    references: referencesCore,
    socials: ["Instagram: @healthfruitstips", "X: @healthfruitstips", "LinkedIn: Health Fruits Tips"]
  },
  {
    slug: "healthy-smoothie-recipe-book",
    fileName: "healthy-smoothie-recipe-book.pdf",
    title: "Healthy Smoothie Recipe Book",
    subtitle: "20 complete smoothies for energy, immunity, recovery, and wellness",
    description: "Healthy smoothie recipe book with 20 full recipes, prep system, and substitution chart for everyday use.",
    pageCountLabel: "28 Pages",
    approxPages: 28,
    coverEmoji: "🍓",
    coverGradient: ["#db2777", "#f472b6"],
    seoKeywords: ["healthy eating guide free download", "free health guide PDF download"],
    topics: ["Smoothie recipes", "Prep guide", "Ingredient swaps", "Nutrition highlights"],
    medicalDisclaimer: defaultDisclaimer,
    contents: [
      { title: "Smoothie Making Basics", bullets: ["Equipment checklist", "Liquid base options", "Sweetener guide", "Protein add-ins"] },
      { title: "Building the Perfect Smoothie", bullets: ["Base + Fruit + Greens + Boost + Liquid", "Balance fiber and protein", "Avoid added sugar overload"] },
      ...smoothiePages,
      { title: "Smoothie Meal Prep Guide", bullets: ["Batch prep freezer packs", "Label with date and purpose", "Use 3-day fridge safety for fresh blends"] },
      { title: "Ingredients Substitution Chart", tableTitle: "Swap Guide", tableHeaders: ["If You Don't Have", "Use Instead", "Best For"], tableRows: [["Banana", "Avocado", "Creamy texture"], ["Yogurt", "Silken tofu", "Protein"], ["Milk", "Almond milk", "Lower calories"], ["Spinach", "Kale", "Greens boost"]] }
    ],
    references: referencesCore,
    socials: ["Instagram: @healthfruitstips", "YouTube: Health Fruits Tips", "Pinterest: Health Fruits Tips"]
  },
  {
    slug: "detox-cleanse-complete-guide",
    fileName: "detox-cleanse-complete-guide.pdf",
    title: "Detox and Cleanse Complete Guide",
    subtitle: "A science-based, food-first detox framework without extreme methods",
    description: "Detox and cleanse complete guide with gentle plans, meal schedules, myths debunked, and safety protocols.",
    pageCountLabel: "20 Pages",
    approxPages: 20,
    coverEmoji: "💧",
    coverGradient: ["#06b6d4", "#5eead4"],
    seoKeywords: ["free health guide PDF download", "healthy eating guide free download"],
    topics: ["Detox science", "3-day cleanse", "Meal plan", "Safety"],
    medicalDisclaimer: defaultDisclaimer,
    contents: [
      { title: "Medical Disclaimer", bullets: [defaultDisclaimer] },
      { title: "What Detox Really Means", bullets: ["Your body already detoxifies via liver, kidneys, gut, skin, lungs.", "Food can support these systems, not replace them.", "Avoid starvation or extreme cleanses."] },
      { title: "Natural Detox Organs", bullets: ["Liver", "Kidneys", "Skin", "Lungs", "Digestive tract"] },
      ...["Lemon water", "Green tea", "Garlic", "Beets", "Leafy greens", "Turmeric", "Ginger", "Dandelion tea"].map((food) => ({
        title: `${food} Benefits`,
        bullets: ["Bioactive compounds", "How to use daily", "Best timing", "Caution notes"]
      })),
      { title: "3 Day Gentle Cleanse Plan", bullets: ["Day 1 schedule", "Day 2 schedule", "Day 3 schedule", "Food-based and realistic"] },
      { title: "7 Day Detox Meal Plan", bullets: ["Breakfast / lunch / dinner / snack framework for one week"] },
      { title: "Detox Water Recipes", bullets: ["8 recipes with ingredients and benefits"] },
      { title: "What to Avoid During Detox", bullets: ["Alcohol", "Ultra-processed foods", "High sugar intake", "Severe calorie restriction"] },
      { title: "Signs Your Body Needs Support", bullets: ["Low energy", "Poor sleep", "Digestive discomfort", "Low produce intake"] },
      { title: "After Detox Maintenance Plan", bullets: ["Keep hydration", "Daily produce", "Weekly meal prep", "Regular movement"] },
      { title: "Myths About Detox", bullets: ["Myth: Juice only is best", "Myth: Detox burns fat rapidly", "Myth: Supplements alone detoxify"] },
      { title: "When Detox Is Not Safe", bullets: ["Pregnancy", "Eating disorder history", "Chronic kidney/liver disease", "Medication interactions"] }
    ],
    references: referencesCore,
    socials: ["Instagram: @healthfruitstips", "X: @healthfruitstips", "Facebook: @healthfruitstips"]
  },
  {
    slug: "anti-inflammatory-food-guide",
    fileName: "anti-inflammatory-food-guide.pdf",
    title: "Complete Anti-Inflammatory Food Guide",
    subtitle: "Lower chronic inflammation with practical nutrition choices",
    description: "Anti-inflammatory food guide featuring top foods, meal plans, spice compounds, and inflammatory score chart.",
    pageCountLabel: "22 Pages",
    approxPages: 22,
    coverEmoji: "🔥",
    coverGradient: ["#ef4444", "#fb7185"],
    seoKeywords: ["free health guide PDF download", "immunity boosting foods PDF"],
    topics: ["Inflammation basics", "Foods to avoid", "Top anti-inflammatory foods", "Meal plans"],
    medicalDisclaimer: defaultDisclaimer,
    contents: [
      { title: "What is Chronic Inflammation", bullets: ["Low-grade persistent inflammation can damage tissues over time.", "Linked to cardiometabolic and joint health risks."] },
      { title: "Inflammation and Disease Links", bullets: ["Heart disease", "Type 2 diabetes", "Arthritis", "Certain cancers"], infoBoxTitle: "Evidence Snapshot", infoBoxContent: "Population studies show lower inflammatory patterns with whole-food diets and healthier body composition." },
      { title: "Inflammatory Foods to Avoid", bullets: ["Ultra-processed foods", "Excess added sugar", "Refined carbs", "Frequent deep-fried foods"] },
      ...["Turmeric", "Ginger", "Fatty fish and plant omega-3s", "Blueberries", "Broccoli", "Avocado", "Green tea", "Peppers", "Mushrooms", "Grapes", "Turmeric deep dive", "Dark chocolate", "Tomatoes", "Cherries"].map((food) => ({
        title: food,
        bullets: ["Bioactive compound", "How much to consume", "Best preparation", "Synergy pairings"]
      })),
      { title: "7 Day Anti-Inflammatory Meal Plan", bullets: ["Balanced week with breakfast/lunch/dinner templates"] },
      { title: "Anti-Inflammatory Spice Guide", tableTitle: "Spice Compounds", tableHeaders: ["Spice", "Compound", "Benefit"], tableRows: [["Turmeric", "Curcumin", "Inflammatory pathway support"], ["Ginger", "Gingerol", "Digestive and anti-inflammatory"], ["Garlic", "Allicin", "Immune and vascular support"]] },
      { title: "Inflammatory Score of Common Foods", tableTitle: "Food Inflammation Effect", tableHeaders: ["Food", "Effect", "Practical Note"], tableRows: [["Sugary soda", "High inflammatory load", "Replace with infused water"], ["Leafy greens", "Anti-inflammatory", "Daily inclusion"], ["Fatty fish", "Anti-inflammatory", "2 servings weekly"]] }
    ],
    references: referencesCore,
    socials: ["Instagram: @healthfruitstips", "Facebook: @healthfruitstips", "X: @healthfruitstips"]
  }
];

export function getGuideBySlug(slug: string): GuideDefinition | undefined {
  return guides.find((guide) => guide.slug === (slug as GuideSlug));
}
