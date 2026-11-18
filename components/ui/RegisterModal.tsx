"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Ticket, Handshake, ArrowUpRight, Sparkles, Building2 } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PASSES_STALLS_REGISTRATION_URL =
  "https://forms.zohopublic.in/infosectio1/form/ClientDetails/formperma/Ou2moWIn4JWNQPOqsPB0tHxOEBFwqaz3oXxgB1h3Sms";

export const B2B_REGISTRATION_URL =
  "https://forms.zohopublic.in/infosectio1/form/FROM/formperma/CiZNCLngp4GIMES69xsXFTyONhnzAebnN61MZRRTf9g";

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050E0B]/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-[#FAF7F0] rounded-[28px] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-[#E7DEC8] text-[#0F2D25] z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close registration modal"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#0F2D25]/5 hover:bg-[#0F2D25]/10 text-[#0F2D25] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center mb-6 pt-2">
              <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#C89B3C] uppercase block mb-1.5">
                EMERGE AURO REGISTRATION
              </span>
              <h2 className="font-editorial text-[32px] sm:text-[38px] font-semibold text-[#073B2A] tracking-tight leading-tight mb-2">
                Choose Registration
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] text-[#17352B]/70 max-w-sm mx-auto">
                Select your registration category to proceed with your booking.
              </p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {/* Option 1: Passes & Stall Registration */}
              <a
                href={PASSES_STALLS_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group relative flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E7DEC8] hover:border-[#C89B3C] hover:shadow-[0_12px_32px_rgba(7,59,42,0.08)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#073B2A]/5 border border-[#073B2A]/10 flex items-center justify-center text-[#073B2A] group-hover:bg-[#073B2A] group-hover:text-[#F7F2E8] transition-colors shrink-0">
                  <Ticket className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-editorial text-[20px] font-bold text-[#073B2A] group-hover:text-[#C89B3C] transition-colors">
                      Passes & Stall Registration
                    </h3>
                  </div>
                  <p className="text-[13px] font-sans text-[#17352B]/75 leading-relaxed">
                    Book Visitor, Delegate, Startup Passes, or open-air exhibition stalls at Bharat Nivas, Auroville.
                  </p>
                </div>
              </a>

              {/* Option 2: B2B Registration */}
              <a
                href={B2B_REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group relative flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E7DEC8] hover:border-[#C89B3C] hover:shadow-[0_12px_32px_rgba(7,59,42,0.08)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C89B3C]/10 border border-[#C89B3C]/20 flex items-center justify-center text-[#996D18] group-hover:bg-[#C89B3C] group-hover:text-white transition-colors shrink-0">
                  <Handshake className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-editorial text-[20px] font-bold text-[#073B2A] group-hover:text-[#C89B3C] transition-colors">
                      B2B Registration
                    </h3>
                    <span className="text-[10px] font-sans font-bold tracking-wider uppercase text-[#C89B3C] bg-[#C89B3C]/10 px-2 py-0.5 rounded-full">
                      Networking
                    </span>
                  </div>
                  <p className="text-[13px] font-sans text-[#17352B]/75 leading-relaxed">
                    Structured round-table rotations matching startups, MSMEs, corporates, and buyers for business partnerships.
                  </p>
                </div>
              </a>
            </div>

            {/* Bottom Note */}
            <p className="text-[11.5px] font-sans text-center text-[#17352B]/50 mt-6">
              Need assistance? Reach out to our team via the{" "}
              <a
                href="/help"
                onClick={onClose}
                className="text-[#073B2A] underline underline-offset-2 hover:text-[#C89B3C]"
              >
                Help Desk
              </a>
              .
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
