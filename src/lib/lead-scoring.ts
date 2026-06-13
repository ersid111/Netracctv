interface EnquiryData {
  propertyType?: string;
  budgetRange?: string;
  timeline?: string;
  indoorCameras?: number;
  outdoorCameras?: number;
  aiAnalytics?: boolean;
  hasExisting?: boolean;
  company?: string;
  requirements?: string[];
}

export function computeLeadScore(data: EnquiryData): number {
  let score = 0;

  const budget = data.budgetRange || "";
  if (budget.includes("500000") || budget.includes("above")) score += 30;
  else if (budget.includes("200000") || budget.includes("300000")) score += 25;
  else if (budget.includes("100000") || budget.includes("150000")) score += 15;
  else if (budget.includes("50000")) score += 8;

  const property = data.propertyType?.toLowerCase() || "";
  if (property === "factory" || property === "industrial" || property === "warehouse") score += 20;
  else if (property === "office" || property === "commercial") score += 15;
  else if (property === "home" || property === "residential") score += 5;

  const timeline = data.timeline?.toLowerCase() || "";
  if (timeline === "immediate" || timeline === "asap") score += 20;
  else if (timeline === "1month" || timeline === "this_month") score += 12;
  else if (timeline === "3months") score += 6;

  const totalCameras = (data.indoorCameras || 0) + (data.outdoorCameras || 0);
  if (totalCameras >= 50) score += 15;
  else if (totalCameras >= 20) score += 10;
  else if (totalCameras >= 10) score += 5;

  if (data.aiAnalytics) score += 10;
  if (data.hasExisting) score += 5;
  if (data.company) score += 5;

  const reqs = data.requirements || [];
  if (reqs.length >= 5) score += 5;
  else if (reqs.length >= 3) score += 3;

  return Math.min(100, score);
}

export function getPriority(score: number): string {
  if (score >= 70) return "URGENT";
  if (score >= 50) return "HIGH";
  if (score >= 30) return "MEDIUM";
  return "LOW";
}

export const priorityColors: Record<string, string> = {
  URGENT: "bg-red-500",
  HIGH: "bg-orange-500",
  MEDIUM: "bg-yellow-500",
  LOW: "bg-green-500",
};

export const statusColors: Record<string, string> = {
  NEW: "bg-blue-500",
  IN_REVIEW: "bg-yellow-500",
  QUOTED: "bg-purple-500",
  WON: "bg-green-500",
  LOST: "bg-red-500",
  ARCHIVED: "bg-gray-500",
};
