// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
  subItems?: NavItem[];
}

// Lead/Contact Form Types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContactMethod: "email" | "phone";
  message: string;
  interestedIn?: string[];
  referralSource?: string;
}

export interface LeadFormData {
  email: string;
  firstName?: string;
  lastName?: string;
  interestedIn?: string[];
}

// Newsletter Subscription Types
export interface NewsletterSubscription {
  email: string;
  firstName?: string;
  lastName?: string;
  subscribedAt: Date;
}

// Service Types
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  features?: string[];
  benefits?: string[];
  icon?: string;
  image?: string;
  order?: number;
}

// Membership Types
export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: "monthly" | "annually";
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

// Blog/Resource Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  updatedAt?: Date;
  categories: string[];
  tags: string[];
  featuredImage?: string;
  readingTime?: number;
}

export interface Resource {
  id: string;
  title: string;
  type: "form" | "guide" | "video" | "document";
  description: string;
  url: string;
  downloadable?: boolean;
  category?: string;
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  initials?: string;
  content: string;
  rating?: number;
  date?: Date;
  verified?: boolean;
}

// Business Hours Types
export interface BusinessHours {
  [key: string]: {
    open: string;
    close: string;
  };
}

// Address Types
export interface Address {
  street: string;
  suite?: string;
  city: string;
  state: string;
  zip: string;
  full?: string;
}

// SEO Types
export interface SEOMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
    card?: "summary" | "summary_large_image";
  };
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

// Form Status Types
export type FormStatus = "idle" | "loading" | "success" | "error";

export interface FormState {
  status: FormStatus;
  message?: string;
}

// Page Props Types
export interface PageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}