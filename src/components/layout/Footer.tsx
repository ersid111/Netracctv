import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { NetraLogo } from "@/components/ui/NetraLogo";

const footerLinks = {
  Services: [
    { label: "CCTV Installation", href: "/services#cctv-installation" },
    { label: "Smart Surveillance", href: "/services#smart-surveillance" },
    { label: "Remote Monitoring", href: "/services#remote-monitoring" },
    { label: "Access Control", href: "/services#access-control" },
    { label: "AMC Services", href: "/services#amc-services" },
  ],
  Products: [
    { label: "IP Cameras", href: "/products?category=IP_CAMERAS" },
    { label: "PTZ Cameras", href: "/products?category=PTZ_CAMERAS" },
    { label: "NVR / DVR", href: "/products?category=NVR_DVR" },
    { label: "Access Control", href: "/products?category=ACCESS_CONTROL" },
    { label: "Intercom Systems", href: "/products?category=INTERCOM" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Careers", href: "/about#careers" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappMsg = encodeURIComponent("Hi NETRA CCTV, I'd like to know more about your services.");

  return (
    <footer className="bg-navy border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <NetraLogo size="md" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-2 max-w-sm">
              Premium AI-powered CCTV installation and security solutions. Protecting homes,
              businesses, and industries with cutting-edge surveillance technology since 2014.
            </p>
            <p className="text-white/40 text-xs mb-6">Proprietor: Ashok Shedale</p>

            <div className="space-y-3">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE?.replace(/\s/g, "") || "+918329591217"}`}
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm group"
              >
                <Phone className="w-4 h-4 text-brand-blue group-hover:text-brand-blue" />
                {process.env.NEXT_PUBLIC_COMPANY_PHONE || "+91 83295 91217"}
              </a>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL || "netraelectronics9@gmail.com"}`}
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm group"
              >
                <Mail className="w-4 h-4 text-brand-blue" />
                {process.env.NEXT_PUBLIC_COMPANY_EMAIL || "netraelectronics9@gmail.com"}
              </a>
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" />
                Mumbai, Maharashtra, India
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Clock className="w-4 h-4 text-brand-blue" />
                Mon – Sat: 9:00 AM – 7:00 PM
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNum}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-colors px-4 py-2.5 rounded-xl text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-white text-sm transition-colors block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © {year} NETRA CCTV. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
