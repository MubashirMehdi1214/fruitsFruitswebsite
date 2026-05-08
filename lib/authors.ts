export type AuthorProfile = {
  id: string;
  name: string;
  title: string;
  bio: string;
  shortBio: string;
  avatar: string;
  linkedin: string;
  twitter: string;
};

export const authors: Record<string, AuthorProfile> = {
  sarah_mitchell: {
    id: "sarah_mitchell",
    name: "Sarah Mitchell",
    title: "Certified Nutritionist & Health Writer",
    bio: "Sarah Mitchell is a certified nutritionist and health writer with over 9 years of practical experience translating nutrition science into everyday guidance. She has worked with wellness clinics, lifestyle publications, and community health programs to help people improve energy, digestion, and long-term metabolic health through simple food strategies. Her work focuses on whole foods, nutrient timing, and behavior-based habit building rather than restrictive diets. Sarah is known for making complex topics easy to understand with clear action steps readers can apply immediately. She regularly reviews emerging nutrition research and compares findings against trusted medical guidance to keep content balanced and practical for everyday families.",
    shortBio: "Certified nutritionist focused on practical, evidence-aware food guidance for everyday health.",
    avatar: "/images/authors/sarah-mitchell.svg",
    linkedin: "https://www.linkedin.com/in/sarah-mitchell-nutrition",
    twitter: "https://x.com/sarahnutrition"
  },
  dr_james_parker: {
    id: "dr_james_parker",
    name: "Dr. James Parker",
    title: "Health Researcher & Wellness Expert",
    bio: "Dr. James Parker is a health researcher and wellness educator with 12 years of experience in preventive care, nutrition-linked outcomes, and public health communication. He has contributed to multidisciplinary research teams that reviewed dietary patterns, inflammation markers, and lifestyle interventions for common chronic health risks. In editorial work, he focuses on reducing misinformation by emphasizing context, study quality, and realistic interpretation of findings. James specializes in natural remedy topics and how traditional practices can be evaluated alongside modern evidence. His writing style prioritizes safety notes, practical dosages, and clear expectations so readers can make informed decisions with their healthcare professionals.",
    shortBio: "Research-driven wellness expert specializing in evidence-based natural remedy guidance.",
    avatar: "/images/authors/dr-james-parker.svg",
    linkedin: "https://www.linkedin.com/in/dr-james-parker-wellness",
    twitter: "https://x.com/drjameswellness"
  },
  maria_chen: {
    id: "maria_chen",
    name: "Maria Chen",
    title: "Registered Dietitian & Food Writer",
    bio: "Maria Chen is a registered dietitian and food writer with 8 years of experience helping readers build healthier plate patterns around fruits, vegetables, and balanced meals. She has worked in outpatient nutrition counseling, where she guided patients on portion control, micronutrient intake, and practical meal planning for busy schedules. Maria specializes in produce nutrition and recipes that improve dietary quality without adding complexity. Her editorial process includes checking nutrient claims against reliable databases and clinical guidance before publication. She is passionate about culturally flexible nutrition advice that respects local food traditions while improving long-term health outcomes.",
    shortBio: "Registered dietitian specializing in fruit and vegetable nutrition with practical meal strategies.",
    avatar: "/images/authors/maria-chen.svg",
    linkedin: "https://www.linkedin.com/in/maria-chen-rd",
    twitter: "https://x.com/mariachenrd"
  }
};

export const authorOrder = ["sarah_mitchell", "dr_james_parker", "maria_chen"] as const;
