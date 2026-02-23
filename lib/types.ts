export interface HeroData {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  resumeUrl?: string;
}

export interface AboutData {
  id?: string;
  bio: string;
  details: string[];
  imageUrl?: string;
}

export interface EducationItem {
  id?: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
  grade?: string;
  order: number;
}

export interface ExperienceItem {
  id?: string;
  company: string;
  role: string;
  period: string;
  description: string;
  techStack: string[];
  order: number;
}

export interface SkillItem {
  name: string;
  proficiency: number;
}

export interface SkillCategory {
  id?: string;
  category: string;
  items: SkillItem[];
  order: number;
}

export interface ProjectItem {
  id?: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

export interface CertificationItem {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
  order: number;
}

export interface MedalItem {
  id?: string;
  platform: string;
  achievement: string;
  description: string;
  iconUrl?: string;
  color: string;
  order: number;
}

export interface ContactData {
  id?: string;
  email: string;
  phone?: string;
  location?: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    leetcode?: string;
    codechef?: string;
    codeforces?: string;
  };
}

export interface ChatbotSettings {
  id?: string;
  contextDocument: string;
  systemPrompt: string;
  enabled: boolean;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
