export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  category: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  metrics?: string;
  featured?: boolean;
  imageUrl?: string;
  isVisible?: boolean;
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  category: 'Backend' | 'Frontend' | 'Automation & DevOps' | 'Data & Cloud';
  iconName: string;
  highlight?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  description: string;
  bulletPoints: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
}

export type Language = 'es' | 'en';

export interface ServiceQuoteOption {
  id: string;
  name: string;
  description: string;
  basePriceUSD: number;
  estimatedWeeks: number;
  icon: string;
  badge?: string;
  deliverables: string[];
}

export interface QuoteAddon {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  addedWeeks: number;
}

export interface QuoteEstimate {
  selectedService: ServiceQuoteOption;
  selectedAddons: QuoteAddon[];
  urgency: 'standard' | 'fast' | 'urgent'; // 1x, 1.25x, 1.5x
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  estimatedWeeks: number;
}

export interface QuoteFormData {
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  timeline: string;
  details: string;
  honeypot?: string;
  mathAnswer?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  author: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'automation' | 'web' | 'contracts';
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  country: string;
  quote: string;
  serviceType: string;
  rating: number;
  verified: boolean;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
}

export interface VisitRecord {
  id: string;
  timestamp: number;
  dateStr: string;
  country: string;
  countryCode: string;
  city?: string;
  deviceType: 'Mobile' | 'Tablet' | 'Desktop';
  browser: string;
  path: string;
  referrer: string;
  lang: string;
}

export interface SiteAnalyticsSummary {
  totalVisits: number;
  uniqueDays: number;
  countryCounts: Record<string, number>;
  deviceCounts: Record<string, number>;
  pageViews: Record<string, number>;
  quoteInteractions: number;
  leadDownloads: number;
  lastVisitDate?: string;
}

export interface CookiePreferences {
  analytics: boolean;
  marketing: boolean;
  essential: boolean;
  acceptedAt?: number;
}
