import type { Metadata } from "next";

const BASE_URL = process.env.NEXTAUTH_URL || "https://www.netracctv.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "NETRA CCTV — See More. Secure More. | AI-Powered Security Solutions",
    template: "%s | NETRA CCTV",
  },
  description:
    "NETRA CCTV delivers premium AI-powered CCTV installation, smart surveillance, and security solutions for homes, offices, and industries. 500+ projects. 10+ years. Free site survey.",
  keywords: [
    "CCTV installation",
    "security camera installation",
    "smart surveillance",
    "industrial CCTV",
    "IP camera",
    "NVR DVR installation",
    "CCTV near me",
    "security solutions Mumbai",
    "AI CCTV",
    "access control systems",
    "video analytics",
    "remote monitoring",
    "CCTV maintenance",
    "HD security cameras",
    "CCTV company India",
  ],
  authors: [{ name: "NETRA CCTV" }],
  creator: "NETRA CCTV",
  publisher: "NETRA CCTV",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "NETRA CCTV",
    title: "NETRA CCTV — See More. Secure More.",
    description:
      "Premium AI-powered CCTV & security solutions. 500+ installations. Free site survey.",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "NETRA CCTV" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NETRA CCTV — See More. Secure More.",
    description: "Premium AI-powered CCTV & security solutions.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
};

export function generatePageMetadata(
  title: string,
  description: string,
  path = ""
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | NETRA CCTV`,
      description,
      url: `${BASE_URL}${path}`,
    },
    alternates: {
      canonical: `${BASE_URL}${path}`,
    },
  };
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "NETRA CCTV",
  description:
    "Premium AI-powered CCTV installation, smart surveillance, and security solutions for homes, offices, and industries.",
  url: BASE_URL,
  telephone: "+91-98765-43210",
  email: "info@netracctv.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mumbai",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400001",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 19.0760, longitude: 72.8777 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "423",
  },
  priceRange: "₹₹",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "CCTV & Security Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CCTV Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Smart Surveillance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Remote Monitoring" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AMC Services" } },
    ],
  },
};
