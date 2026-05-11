export type GuideSlug =
  | "ultimate-fruit-benefits-guide"
  | "30-day-healthy-eating-challenge"
  | "home-remedies-handbook"
  | "immunity-boosting-food-bible"
  | "natural-weight-loss-guide"
  | "complete-vegetable-guide"
  | "vitamins-minerals-complete-guide"
  | "healthy-smoothie-recipe-book"
  | "detox-cleanse-complete-guide"
  | "anti-inflammatory-food-guide";

export type NutrientRow = {
  nutrient: string;
  amount: string;
  dailyValue: string;
};

export type ContentPage = {
  title: string;
  subtitle?: string;
  bullets?: string[];
  tableTitle?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
  infoBoxTitle?: string;
  infoBoxContent?: string;
  factBoxTitle?: string;
  factBoxContent?: string;
  tip?: string;
  quote?: string;
  checklist?: string[];
  tags?: string[];
};

export type GuideDefinition = {
  slug: GuideSlug;
  fileName: string;
  title: string;
  subtitle: string;
  description: string;
  pageCountLabel: string;
  approxPages: number;
  coverEmoji: string;
  coverGradient: [string, string];
  seoKeywords: string[];
  topics: string[];
  medicalDisclaimer: string;
  contents: ContentPage[];
  references: string[];
  socials: string[];
};
