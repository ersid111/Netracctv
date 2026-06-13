export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand?: string | null;
  model?: string | null;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  price?: number | null;
  priceOnRequest: boolean;
  imageUrl?: string | null;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  clientName?: string | null;
  clientIndustry?: string | null;
  location?: string | null;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  camerasInstalled?: number | null;
  projectDuration?: string | null;
  coverageArea?: string | null;
  beforeImageUrl?: string | null;
  afterImageUrl?: string | null;
  galleryImages: string[];
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Enquiry {
  id: string;
  propertyType: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  address?: string | null;
  budgetRange?: string | null;
  status: EnquiryStatus;
  priority: Priority;
  leadScore: number;
  createdAt: Date;
  updatedAt: Date;
  productInterest?: string | null;
  message?: string | null;
}

export type EnquiryStatus = "NEW" | "IN_REVIEW" | "QUOTED" | "WON" | "LOST" | "ARCHIVED";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
