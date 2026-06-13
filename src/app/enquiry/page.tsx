import { Suspense } from "react";
import { EnquiryWizard } from "@/components/enquiry/EnquiryWizard";
import { generatePageMetadata } from "@/lib/seo";
import { Shield } from "lucide-react";

export const metadata = generatePageMetadata(
  "Get Free Site Visit",
  "Book a free no-obligation CCTV consultation and site survey.",
  "/enquiry"
);

export default function EnquiryPage() {
  return (
    <div className="min-h-screen bg-navy pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-brand-blue" />
          </div>
          <h1 className="text-4xl font-black text-white mb-3">Get Your Free Site Visit</h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Complete the form below and our security expert will contact you within{" "}
            <strong className="text-white">2 hours</strong> to schedule a visit.
          </p>
        </div>
        <Suspense fallback={null}>
          <EnquiryWizard />
        </Suspense>
      </div>
    </div>
  );
}
