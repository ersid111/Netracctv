"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { enquirySchema, type EnquiryFormData } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { StepPropertyType } from "./steps/StepPropertyType";
import { StepCameras } from "./steps/StepCameras";
import { StepBudget } from "./steps/StepBudget";
import { StepTimeline } from "./steps/StepTimeline";
import { StepRequirements } from "./steps/StepRequirements";
import { StepContact } from "./steps/StepContact";
import toast from "react-hot-toast";

const STEPS = [
  { id: 1, title: "Property Type", component: StepPropertyType },
  { id: 2, title: "Camera Needs", component: StepCameras },
  { id: 3, title: "Budget", component: StepBudget },
  { id: 4, title: "Timeline", component: StepTimeline },
  { id: 5, title: "Requirements", component: StepRequirements },
  { id: 6, title: "Your Details", component: StepContact },
];

interface Props {
  productInterest?: string;
}

export function EnquiryWizard({ productInterest }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);

  const methods = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      propertyType: "",
      propertySize: "",
      indoorCameras: 2,
      outdoorCameras: 2,
      coverageAreas: [],
      budgetRange: "",
      budgetFlexible: false,
      timeline: "",
      hasExisting: false,
      requirements: [],
      nightVision: false,
      remoteAccess: true,
      aiAnalytics: false,
      name: "",
      email: "",
      phone: "",
      preferredContact: "phone",
      productInterest: productInterest || "",
    },
  });

  const StepComponent = STEPS[currentStep].component;

  const goNext = () => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = async (data: EnquiryFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-6"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-3xl font-black text-white mb-3">Enquiry Received!</h2>
        <p className="text-white/60 text-lg mb-6 max-w-md mx-auto">
          Thank you! Our security expert will contact you within{" "}
          <strong className="text-white">2 hours</strong> to schedule your free site visit.
        </p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 inline-block text-left">
          <p className="text-white/50 text-sm mb-1">Your contact details:</p>
          <p className="text-white font-semibold">{methods.getValues("name")}</p>
          <p className="text-white/60 text-sm">{methods.getValues("phone")}</p>
          <p className="text-white/60 text-sm">{methods.getValues("email")}</p>
        </div>
        <p className="text-white/40 text-sm mt-6">
          For urgent enquiries, call{" "}
          <a href="tel:+919876543210" className="text-brand-blue hover:underline">
            +91 98765 43210
          </a>
        </p>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-2xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                    i < currentStep
                      ? "bg-emerald-500 text-white"
                      : i === currentStep
                      ? "bg-brand-blue text-white ring-2 ring-brand-blue/30 ring-offset-2 ring-offset-navy"
                      : "bg-white/10 text-white/30"
                  }`}
                >
                  {i < currentStep ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-all ${
                      i < currentStep ? "bg-emerald-500" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {STEPS.map((step, i) => (
              <span
                key={step.id}
                className={`text-xs font-medium transition-colors ${
                  i === currentStep ? "text-white" : "text-white/30"
                }`}
                style={{ width: `${100 / STEPS.length}%`, textAlign: "center" }}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 min-h-[320px] relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.25 }}
            >
              <StepComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="ghost"
            onClick={goPrev}
            disabled={currentStep === 0}
            icon={<ChevronLeft className="w-4 h-4" />}
          >
            Back
          </Button>

          <span className="text-white/30 text-sm">
            {currentStep + 1} / {STEPS.length}
          </span>

          {currentStep < STEPS.length - 1 ? (
            <Button onClick={goNext} icon={<ChevronRight className="w-4 h-4" />} iconRight>
              Continue
            </Button>
          ) : (
            <Button
              onClick={methods.handleSubmit(onSubmit)}
              loading={submitting}
              icon={<CheckCircle className="w-4 h-4" />}
              iconRight
            >
              Submit Enquiry
            </Button>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
