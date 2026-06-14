"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { getWhatsAppUrl } from "@/lib/utils";

const SUBJECTS = ["General Enquiry", "CCTV Installation", "AMC Service", "Complaint", "Partnership"];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "General Enquiry" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Failed to send. Please try again or call us directly.");
    } finally {
      setSending(false);
    }
  };

  const waUrl = getWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918329591217",
    "Hi NETRA CCTV, I'd like to get in touch."
  );

  return (
    <div className="bg-navy min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4 block">Contact Us</span>
          <h1 className="text-5xl font-black text-white mb-4">Get In Touch</h1>
          <p className="text-white/60 max-w-xl mx-auto">
            We&apos;re available 24/7 for urgent security needs. Reach us via phone, email, or WhatsApp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="space-y-5 mb-8">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+91 83295 91217",
                  href: `tel:+918329591217`,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "netraelectronics9@gmail.com",
                  href: `mailto:netraelectronics9@gmail.com`,
                },
                {
                  icon: MapPin,
                  label: "Address",
                  value: "Mumbai, Maharashtra, India",
                },
                {
                  icon: Clock,
                  label: "Business Hours",
                  value: "Mon – Sat: 9:00 AM – 7:00 PM | Emergency: 24/7",
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-white font-medium hover:text-brand-blue transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-colors px-5 py-4 rounded-xl font-medium"
            >
              <MessageCircle className="w-6 h-6" />
              <div>
                <p className="font-bold">Chat on WhatsApp</p>
                <p className="text-sm opacity-70">Instant response</p>
              </div>
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {sent ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-white/60">We&apos;ll get back to you within a few hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
                <h3 className="text-white font-bold text-lg">Send a Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name *" placeholder="Your name" error={errors.name?.message} {...register("name")} />
                  <Input label="Email *" type="email" placeholder="you@example.com" error={errors.email?.message} {...register("email")} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Phone" placeholder="+91 98765 43210" {...register("phone")} />
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Subject</label>
                    <select
                      {...register("subject")}
                      className="w-full rounded-xl border bg-white/5 text-white px-4 py-3 text-sm border-white/10 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none"
                    >
                      {SUBJECTS.map((s) => <option key={s} value={s} className="bg-navy">{s}</option>)}
                    </select>
                  </div>
                </div>
                <Textarea label="Message *" placeholder="Tell us how we can help..." rows={4} error={errors.message?.message} {...register("message")} />
                <Button type="submit" loading={sending} size="lg" className="w-full" icon={<Send className="w-4 h-4" />} iconRight>
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
