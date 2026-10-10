export interface NavLink {
  label: string;
  href: string;
}

export interface Logo {
  name: string;
  src: string;
  alt: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  outcome: string;
  deliverables: string[];
  bestFor: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  outcome: string;
  accent: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatar?: string;
}

export interface SectionContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  description: string;
  monthly: number | null;
  yearly: number | null;
  cta: string;
  features: string[];
  highlighted?: boolean;
}

export type BillingInterval = "monthly" | "yearly";

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number | null;
    yearly: number | null;
  };
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface LinkGroup {
  title: string;
  links: NavLink[];
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    description: string;
  };
  navigation: NavLink[];
  logos: Logo[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    trustLine: string;
    serviceChips: Array<{ label: string; href: string }>;
  };
  servicesSection: SectionContent;
  services: Service[];
  processSection: SectionContent;
  process: ProcessStep[];
  workSection: SectionContent;
  projects: Project[];
  features: Feature[];
  featuresSection: SectionContent;
  testimonials: Testimonial[];
  testimonialsSection: SectionContent;
  plans: Plan[];
  pricing: PricingPlan[];
  faqs: Faq[];
  finalCta: {
    headline: string;
    description: string;
    primaryCta: string;
    secondaryLink?: {
      label: string;
      href: string;
    };
  };
  footer: {
    linkGroups: LinkGroup[];
    socialLinks: NavLink[];
  };
}
