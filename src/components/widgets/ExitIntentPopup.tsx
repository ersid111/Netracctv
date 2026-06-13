"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const key = "netra_exit_popup_shown";
    if (sessionStorage.getItem(key)) return;

    const timer = setTimeout(() => {
      const handler = (e: MouseEvent) => {
        if (e.clientY <= 0 && !dismissed) {
          setShow(true);
          sessionStorage.setItem(key, "1");
          document.removeEventListener("mouseleave", handler);
        }
      };
      document.addEventListener("mouseleave", handler);
      return () => document.removeEventListener("mouseleave", handler);
    }, 5000);

    return () => clearTimeout(timer);
  }, [dismissed]);

  const close = () => {
    setShow(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 bottom-4 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-8 sm:w-full sm:max-w-md z-[9999] bg-navy border border-brand-blue/30 rounded-2xl p-6 shadow-premium"
          >
            <button onClick={close} className="absolute top-4 right-4 text-white/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-brand-blue" />
              </div>
              <div>
                <p className="text-white font-bold">Wait — before you go!</p>
                <p className="text-white/50 text-xs">Get a FREE security assessment</p>
              </div>
            </div>

            <p className="text-white/60 text-sm mb-5 leading-relaxed">
              Our CCTV expert will visit your property, identify security gaps, and give you a
              detailed plan — completely free, no obligation.
            </p>

            <div className="flex gap-3">
              <Link href="/enquiry" onClick={close} className="flex-1">
                <Button className="w-full" size="md">
                  Book Free Visit
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <button onClick={close} className="text-white/40 hover:text-white text-sm px-3">
                No thanks
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
