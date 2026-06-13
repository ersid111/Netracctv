import { HeroSection } from "@/components/home/HeroSection";
import { StatsCounter } from "@/components/home/StatsCounter";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyNetraSection } from "@/components/home/WhyNetraSection";
import { CostCalculator } from "@/components/home/CostCalculator";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata(
  "NETRA CCTV — See More. Secure More.",
  "Premium AI-powered CCTV installation and security solutions. 500+ projects. Free site survey.",
  "/"
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsCounter />
      <ServicesSection />
      <WhyNetraSection />
      <CostCalculator />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
