export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Health Fruits Tips",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://healthfruitstips.com",
  description: "Evidence-based health and fruits benefits blog with practical wellness guidance.",
  contact: {
    email: "munashirmehdi@mail.com",
    phone: "+92 311 518 9291",
    whatsapp: "+92 311 518 9291",
    addressLine1: "GBDRYFRUITS Headquarters",
    addressLine2: "123 Commercial Street, Block A",
    cityCountry: "Karachi, Pakistan 75000",
    hoursWeek: "Monday - Saturday: 9:00 AM - 7:00 PM",
    hoursWeekend: "Sunday: 10:00 AM - 6:00 PM"
  }
};

export const categories = [
  "Fruits Benefits",
  "Vegetables Benefits",
  "Home Remedies",
  "Healthy Recipes",
  "Vitamins & Minerals",
  "Weight Loss Tips",
  "Superfoods",
  "Nuts and Seeds",
  "Herbs and Spices",
  "Juices and Drinks",
  "Mental Health Foods",
  "Pregnancy Nutrition"
];

export const categorySlug = (category: string) =>
  category.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");
