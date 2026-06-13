import { z } from "zod";

export const enquirySchema = z.object({
  propertyType: z.string().min(1, "Please select a property type"),
  propertySize: z.string().optional(),
  indoorCameras: z.number().min(0).max(500).default(0),
  outdoorCameras: z.number().min(0).max(500).default(0),
  coverageAreas: z.array(z.string()).default([]),
  budgetRange: z.string().optional(),
  budgetFlexible: z.boolean().default(false),
  timeline: z.string().optional(),
  hasExisting: z.boolean().default(false),
  existingBrand: z.string().optional(),
  existingIssues: z.string().optional(),
  requirements: z.array(z.string()).default([]),
  resolution: z.string().optional(),
  nightVision: z.boolean().default(false),
  remoteAccess: z.boolean().default(false),
  aiAnalytics: z.boolean().default(false),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\d\s\+\-\(\)]+$/, "Invalid phone number"),
  company: z.string().optional(),
  address: z.string().optional(),
  preferredContact: z.enum(["phone", "email", "whatsapp"]).default("phone"),
  message: z.string().optional(),
  productInterest: z.string().optional(),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Please enter a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const productSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(1),
  brand: z.string().optional(),
  model: z.string().optional(),
  description: z.string().min(10),
  features: z.array(z.string()).default([]),
  specifications: z.record(z.string()).default({}),
  price: z.number().optional(),
  priceOnRequest: z.boolean().default(true),
  imageUrl: z.string().url().optional().or(z.literal("")),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});
