"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Send,
  CheckCircle2,
  Phone,
  Mail,
  User,
  MessageSquare,
  Car,
  Hotel,
  Clock,
  MapPin,
  HelpCircle,
} from "lucide-react";

export default function HelpPageContent() {
  const shouldReduceMotion = useReducedMotion();

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    query: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      contact: "",
      email: "",
      query: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div className="relative w-full pt-32 sm:pt-40 pb-24 sm:pb-32 overflow-hidden select-none bg-[#F7F2E8] text-[#17352B]">
      {/* Ambient background glows */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(200,155,60,0.12)_0%,transparent_70%)] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#073B2A]/5 rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.26em] text-[#C89B3C] uppercase">
              SUPPORT & ASSISTANCE
            </span>
          </div>

          <h1 className="font-editorial text-[48px] sm:text-[66px] lg:text-[80px] font-semibold text-[#073B2A] tracking-tight leading-none mb-5">
            Help & Assistance
          </h1>

          <p className="font-sans text-[16px] sm:text-[18px] text-[#17352B]/75 leading-relaxed max-w-[620px] mx-auto">
            Need travel coordination, accommodation details, or have questions about EMERGE AURO? We are here to support you.
          </p>
        </motion.div>

        {/* 2-Column or Stacked Grid: Travel & Hotels on top, Contact Form below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16 sm:mb-20">
          {/* Travel Desk Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white rounded-[26px] p-8 sm:p-10 border border-[#E7DEC8] shadow-[0_8px_30px_rgba(7,59,42,0.04)] hover:shadow-[0_16px_40px_rgba(7,59,42,0.08)] hover:border-[#C89B3C]/60 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-13 h-13 rounded-2xl bg-[#073B2A]/5 border border-[#073B2A]/10 flex items-center justify-center text-[#073B2A]">
                  <Car className="w-7 h-7 stroke-[1.8]" />
                </div>
                <span className="text-[10.5px] font-sans font-bold tracking-[0.2em] text-[#C89B3C] uppercase bg-[#C89B3C]/10 px-3 py-1 rounded-full border border-[#C89B3C]/20">
                  Concierge
                </span>
              </div>

              <h2 className="font-editorial text-[30px] sm:text-[34px] font-semibold text-[#073B2A] mb-3">
                Travel Desk
              </h2>
              <p className="font-sans text-[15px] sm:text-[16px] text-[#17352B]/70 leading-relaxed mb-8">
                For transit coordination, airport/railway station pickups, and local commute around Auroville and Puducherry:
              </p>

              {/* Contact Details Card */}
              <div className="space-y-4 bg-[#F7F2E8]/70 rounded-2xl p-5 sm:p-6 border border-[#E7DEC8]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#073B2A] shadow-xs shrink-0">
                    <User className="w-5 h-5 text-[#C89B3C]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#17352B]/50">
                      Travel Coordinator
                    </p>
                    <p className="text-[16px] sm:text-[17px] font-sans font-semibold text-[#073B2A]">
                      EMERGE Travel Desk
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#073B2A] shadow-xs shrink-0">
                    <Phone className="w-5 h-5 text-[#C89B3C]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#17352B]/50">
                      Contact Number
                    </p>
                    <a
                      href="tel:+919876543210"
                      className="text-[16px] sm:text-[17px] font-sans font-semibold text-[#073B2A] hover:text-[#C89B3C] transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#073B2A] shadow-xs shrink-0">
                    <Clock className="w-5 h-5 text-[#C89B3C]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#17352B]/50">
                      Availability
                    </p>
                    <p className="text-[14.5px] font-sans text-[#17352B]/75">
                      08:00 AM – 08:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-[12px] font-sans text-[#17352B]/50">
              * Dedicated assistance for delegates, speakers, and exhibitors.
            </p>
          </motion.div>

          {/* Hotels & Stay Placeholder Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white rounded-[26px] p-8 sm:p-10 border border-[#E7DEC8] shadow-[0_8px_30px_rgba(7,59,42,0.04)] hover:shadow-[0_16px_40px_rgba(7,59,42,0.08)] hover:border-[#C89B3C]/60 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-13 h-13 rounded-2xl bg-[#073B2A]/5 border border-[#073B2A]/10 flex items-center justify-center text-[#073B2A]">
                  <Hotel className="w-7 h-7 stroke-[1.8]" />
                </div>
                <span className="text-[10.5px] font-sans font-bold tracking-[0.2em] text-[#C89B3C] uppercase bg-[#C89B3C]/10 px-3 py-1 rounded-full border border-[#C89B3C]/20">
                  Stay & Accommodation
                </span>
              </div>

              <h2 className="font-editorial text-[30px] sm:text-[34px] font-semibold text-[#073B2A] mb-3">
                Hotels & Stay
              </h2>
              <p className="font-sans text-[15px] sm:text-[16px] text-[#17352B]/70 leading-relaxed mb-8">
                Curated list of partner guest houses, boutique eco-resorts, and hotels in Auroville and Puducherry:
              </p>

              {/* Placeholder Box */}
              <div className="bg-[#F7F2E8]/70 rounded-2xl p-8 border border-dashed border-[#C89B3C]/50 text-center flex flex-col items-center justify-center min-h-[175px]">
                <MapPin className="w-8 h-8 text-[#C89B3C] mb-3 animate-pulse" />
                <p className="font-editorial text-[20px] font-medium text-[#073B2A] mb-1.5">
                  Hotel Partners & Recommended Stays
                </p>
                <p className="font-sans text-[13.5px] text-[#17352B]/60 max-w-sm">
                  Recommended accommodations and special conclave partner rates will be published here soon.
                </p>
              </div>
            </div>

            <p className="mt-6 text-[12px] font-sans text-[#17352B]/50">
              * Need early bookings? Contact the help desk below for recommendations.
            </p>
          </motion.div>
        </div>

        {/* Contact Us Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-[28px] sm:rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0_20px_60px_rgba(7,59,42,0.08)] border border-[#E7DEC8] text-[#17352B]">
            {/* Header of Form */}
            <div className="text-center mb-10">
              <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-[#C89B3C] uppercase block mb-2">
                DIRECT INQUIRY
              </span>
              <h2 className="font-editorial text-[36px] sm:text-[44px] font-semibold text-[#073B2A] tracking-tight mb-2">
                Contact Us
              </h2>
              <p className="font-sans text-[15px] sm:text-[16px] text-[#17352B]/70">
                Have a query or need assistance? Fill out the details below.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-10 px-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-5 shadow-sm border border-emerald-100">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#073B2A] mb-3">
                  Thank you for reaching out!
                </h3>
                <p className="text-[14.5px] sm:text-[15.5px] font-sans text-[#17352B]/75 max-w-md mx-auto leading-relaxed mb-8">
                  Your message has been received. Our conclave coordination team will review your query and respond shortly.
                </p>
                <button
                  onClick={handleReset}
                  className="px-7 py-3 rounded-xl bg-[#073B2A] text-[#F7F2E8] font-sans text-[14px] font-medium hover:bg-[#063522] transition-colors shadow-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[13px] font-sans font-semibold text-[#073B2A] uppercase tracking-wider mb-2"
                  >
                    Name <span className="text-[#C89B3C]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F7F2E8]/60 border border-[#E7DEC8] focus:border-[#C89B3C] focus:bg-white text-[#17352B] placeholder:text-[#17352B]/40 focus:outline-none transition-all duration-200 text-[15px]"
                    />
                  </div>
                </div>

                {/* Two-column for Contact & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Contact Number */}
                  <div>
                    <label
                      htmlFor="contact"
                      className="block text-[13px] font-sans font-semibold text-[#073B2A] uppercase tracking-wider mb-2"
                    >
                      Contact <span className="text-[#C89B3C]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      required
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F7F2E8]/60 border border-[#E7DEC8] focus:border-[#C89B3C] focus:bg-white text-[#17352B] placeholder:text-[#17352B]/40 focus:outline-none transition-all duration-200 text-[15px]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[13px] font-sans font-semibold text-[#073B2A] uppercase tracking-wider mb-2"
                    >
                      Email <span className="text-[#C89B3C]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F7F2E8]/60 border border-[#E7DEC8] focus:border-[#C89B3C] focus:bg-white text-[#17352B] placeholder:text-[#17352B]/40 focus:outline-none transition-all duration-200 text-[15px]"
                    />
                  </div>
                </div>

                {/* Query */}
                <div>
                  <label
                    htmlFor="query"
                    className="block text-[13px] font-sans font-semibold text-[#073B2A] uppercase tracking-wider mb-2"
                  >
                    Query <span className="text-[#C89B3C]">*</span>
                  </label>
                  <textarea
                    id="query"
                    name="query"
                    rows={4}
                    required
                    value={formData.query}
                    onChange={handleChange}
                    placeholder="Tell us about your questions, delegate inquiry, travel assistance, or stall booking..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F7F2E8]/60 border border-[#E7DEC8] focus:border-[#C89B3C] focus:bg-white text-[#17352B] placeholder:text-[#17352B]/40 focus:outline-none transition-all duration-200 text-[15px] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#073B2A] text-[#F7F2E8] font-sans font-medium text-[15px] hover:bg-[#063522] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Query</span>
                        <Send className="w-4 h-4 text-[#C89B3C] group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
