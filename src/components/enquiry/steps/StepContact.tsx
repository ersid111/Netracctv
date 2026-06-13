"use client";

import { useFormContext } from "react-hook-form";
import type { EnquiryFormData } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { User, Mail, Phone, Building2, MapPin } from "lucide-react";

export function StepContact() {
  const { register, formState: { errors } } = useFormContext<EnquiryFormData>();

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">Your contact details</h3>
      <p className="text-white/50 text-sm mb-6">
        Our expert will reach out to schedule your free site visit.
      </p>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name *"
            placeholder="Your name"
            icon={<User className="w-4 h-4" />}
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Phone Number *"
            placeholder="+91 98765 43210"
            icon={<Phone className="w-4 h-4" />}
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>
        <Input
          label="Email Address *"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register("email")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Company (optional)"
            placeholder="Company name"
            icon={<Building2 className="w-4 h-4" />}
            {...register("company")}
          />
          <Input
            label="Location / Area"
            placeholder="City, Area"
            icon={<MapPin className="w-4 h-4" />}
            {...register("address")}
          />
        </div>
        <Textarea
          label="Additional Message (optional)"
          placeholder="Any specific requirements or questions..."
          rows={3}
          {...register("message")}
        />
      </div>
    </div>
  );
}
