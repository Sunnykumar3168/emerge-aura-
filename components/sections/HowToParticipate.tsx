"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  X,
  Sparkles,
  Ticket,
  Store,
  ArrowUpRight,
  Info,
  Calendar,
  MapPin,
} from "lucide-react";
import {
  participateData,
  REGISTRATION_URL,
  PassItem,
  StallItem,
} from "@/data/participate";

type TabFilter = "all" | "passes" | "stalls";

export default function HowToParticipate() {
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const {
    eyebrow,
    heading,
    description,
    passesHeading,
    passesDescription,
    passes,
    stallsHeading,
    stallsDescription,
    stallsNote,
    stalls,
  } = participateData;

  const showPasses = activeTab === "all" || activeTab === "passes";
  const showStalls = activeTab === "all" || activeTab === "stalls";

  return (
    <section
      id="participate"
      aria-label="How to Participate — Conclave Passes and Stall Booking"
      className="relative w-full bg-[#032D1D] text-[#F4EFE6] py-20 sm:py-28 lg:py-36 overflow-hidden select-none border-t border-[#09422C]"
    >
      {/* Anchor alias so any legacy #featured-sessions link scrolls here */}
      <span id="featured-sessions" className="absolute -top-24 opacity-0 pointer-events-none" />

      {/* Ambient Lighting Background Accents */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(201,161,91,0.08)_0%,transparent_70%)] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(201,161,91,0.05)_0%,transparent_70%)] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* ========================================================
            HEADER: EYEBROW + EDITORIAL HEADLINE + SUBTITLE
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl lg:max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3.5 mb-4">
            <span className="text-[10.5px] sm:text-[11.5px] font-sans font-medium tracking-[0.32em] text-[#C9A15B] uppercase">
              {eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-editorial text-[44px] sm:text-[60px] md:text-[72px] lg:text-[84px] font-normal leading-[1.0] tracking-tight text-[#F4EFE6] mb-4">
            {heading.prefix}{" "}
            <span className="text-[#C9A15B]">{heading.highlight}</span>
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-[14.5px] sm:text-[16.5px] text-[#E5DED2]/85 font-normal leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex items-center justify-center gap-2 sm:gap-3">
            <div className="inline-flex p-1.5 rounded-full bg-[#06281C]/90 border border-[#C9A15B]/30 backdrop-blur-md shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-[13px] font-sans font-semibold tracking-wider transition-all duration-300 ${
                  activeTab === "all"
                    ? "bg-[#C9A15B] text-[#032D1D] shadow-md"
                    : "text-[#E5DED2]/80 hover:text-white"
                }`}
              >
                All Options (6)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("passes")}
                className={`inline-flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-[13px] font-sans font-semibold tracking-wider transition-all duration-300 ${
                  activeTab === "passes"
                    ? "bg-[#C9A15B] text-[#032D1D] shadow-md"
                    : "text-[#E5DED2]/80 hover:text-white"
                }`}
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Passes (3)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("stalls")}
                className={`inline-flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-[13px] font-sans font-semibold tracking-wider transition-all duration-300 ${
                  activeTab === "stalls"
                    ? "bg-[#C9A15B] text-[#032D1D] shadow-md"
                    : "text-[#E5DED2]/80 hover:text-white"
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Stall Booking (3)</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            CATEGORY 1: CONCLAVE PASSES (3 CARDS)
            ======================================================== */}
        <AnimatePresence mode="wait">
          {showPasses && (
            <motion.div
              key="passes-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={showStalls ? "mb-20 sm:mb-28" : "mb-8"}
            >
              {/* Category Subheading */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-[#C9A15B]/20">
                <div>
                  <div className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.2em] text-[#C9A15B] uppercase mb-1">
                    <Ticket className="w-3.5 h-3.5" />
                    <span>INDIVIDUAL &amp; DELEGATE ACCESS</span>
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4EFE6] font-normal">
                    {passesHeading}
                  </h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#E5DED2]/70 max-w-md sm:text-right">
                  {passesDescription}
                </p>
              </div>

              {/* Passes Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {passes.map((pass: PassItem, idx: number) => {
                  return (
                    <motion.div
                      key={pass.id}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className={`relative rounded-[22px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                        pass.isPopular
                          ? "bg-gradient-to-b from-[#073D29] via-[#04281A] to-[#021F14] border-2 border-[#C9A15B] shadow-[0_16px_45px_rgba(201,161,91,0.22)] scale-[1.02] md:scale-105 z-20"
                          : "bg-[#06291C]/75 hover:bg-[#06291C]/95 border border-[#C9A15B]/25 hover:border-[#C9A15B]/50 shadow-[0_12px_36px_rgba(0,0,0,0.35)]"
                      }`}
                    >
                      {/* Popular Ribbon Badge */}
                      {pass.badge && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10.5px] font-sans font-bold tracking-widest uppercase shadow-md ${
                              pass.isPopular
                                ? "bg-[#C9A15B] text-[#032D1D]"
                                : "bg-[#042015] border border-[#C9A15B]/40 text-[#C9A15B]"
                            }`}
                          >
                            {pass.isPopular && <Sparkles className="w-3 h-3" />}
                            <span>{pass.badge}</span>
                          </span>
                        </div>
                      )}

                      <div>
                        {/* Pass Title */}
                        <div className="pt-2">
                          <h4 className="font-editorial text-2xl sm:text-[28px] text-[#F4EFE6] font-normal leading-tight">
                            {pass.name}
                          </h4>
                          <span className="text-[11.5px] font-sans text-[#C9A15B] tracking-wider uppercase font-medium mt-1 block">
                            {pass.period}
                          </span>
                        </div>

                        {/* Price Block */}
                        <div className="my-5 pb-5 border-b border-white/10">
                          <div className="flex items-baseline gap-1">
                            <span className="font-editorial text-4xl sm:text-5xl text-[#F4EFE6] font-medium tracking-tight">
                              {pass.price}
                            </span>
                            {pass.price !== "Free" && (
                              <span className="text-xs text-[#E5DED2]/70 font-sans">
                                / delegate
                              </span>
                            )}
                          </div>
                          <p className="font-sans text-xs sm:text-[13px] text-[#E5DED2]/80 leading-relaxed mt-2.5">
                            {pass.description}
                          </p>
                        </div>

                        {/* Includes Feature List */}
                        <div className="space-y-3 mb-6">
                          <span className="text-[10px] font-sans font-semibold tracking-[0.18em] text-[#C9A15B] uppercase block">
                            WHAT&apos;S INCLUDED
                          </span>
                          <ul className="space-y-2.5">
                            {pass.features.map((feat, fIdx) => (
                              <li
                                key={fIdx}
                                className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-snug"
                              >
                                {feat.included ? (
                                  <div className="w-4 h-4 rounded-full bg-[#C9A15B]/20 border border-[#C9A15B]/60 flex items-center justify-center shrink-0 mt-0.5 text-[#C9A15B]">
                                    <Check className="w-2.5 h-2.5" />
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 rounded-full bg-white/5 border border-white/20 flex items-center justify-center shrink-0 mt-0.5 text-white/40">
                                    <X className="w-2.5 h-2.5" />
                                  </div>
                                )}
                                <span
                                  className={
                                    feat.included
                                      ? "text-[#F4EFE6]/90"
                                      : "text-[#E5DED2]/40 line-through"
                                  }
                                >
                                  {feat.text}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href={pass.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-sans text-xs tracking-[0.18em] uppercase font-semibold transition-all duration-300 mt-2 ${
                          pass.isPopular
                            ? "bg-[#C9A15B] text-[#032D1D] hover:bg-[#D8B56A] shadow-[0_4px_16px_rgba(201,161,91,0.3)]"
                            : "bg-transparent text-[#F4EFE6] border border-[#C9A15B]/60 hover:bg-[#C9A15B] hover:text-[#032D1D]"
                        }`}
                      >
                        <span>{pass.ctaText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================
            CATEGORY 2: STALL BOOKING (3 CARDS)
            ======================================================== */}
        <AnimatePresence mode="wait">
          {showStalls && (
            <motion.div
              key="stalls-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category Subheading */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-[#C9A15B]/20">
                <div>
                  <div className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold tracking-[0.2em] text-[#C9A15B] uppercase mb-1">
                    <Store className="w-3.5 h-3.5" />
                    <span>EXHIBITION &amp; SHOWCASE SPACES</span>
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#F4EFE6] font-normal">
                    {stallsHeading}
                  </h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#E5DED2]/70 max-w-md sm:text-right">
                  {stallsDescription}
                </p>
              </div>

              {/* Stalls Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {stalls.map((stall: StallItem, idx: number) => {
                  return (
                    <motion.div
                      key={stall.id}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className={`relative rounded-[22px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                        stall.isPopular
                          ? "bg-gradient-to-b from-[#073D29] via-[#04281A] to-[#021F14] border-2 border-[#C9A15B] shadow-[0_16px_45px_rgba(201,161,91,0.22)] scale-[1.02] md:scale-105 z-20"
                          : "bg-[#06291C]/75 hover:bg-[#06291C]/95 border border-[#C9A15B]/25 hover:border-[#C9A15B]/50 shadow-[0_12px_36px_rgba(0,0,0,0.35)]"
                      }`}
                    >
                      {/* Dimensions / Premier Badge */}
                      {stall.badge && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10.5px] font-sans font-bold tracking-widest uppercase shadow-md ${
                              stall.isPopular
                                ? "bg-[#C9A15B] text-[#032D1D]"
                                : "bg-[#042015] border border-[#C9A15B]/40 text-[#C9A15B]"
                            }`}
                          >
                            <span>{stall.badge}</span>
                          </span>
                        </div>
                      )}

                      <div>
                        {/* Stall Title & Dimensions */}
                        <div className="pt-2">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-editorial text-2xl sm:text-[28px] text-[#F4EFE6] font-normal leading-tight">
                              {stall.name}
                            </h4>
                            <span className="px-2.5 py-0.5 rounded bg-[#C9A15B]/15 border border-[#C9A15B]/30 text-[#C9A15B] text-[11px] font-mono font-medium shrink-0">
                              {stall.dimensions}
                            </span>
                          </div>
                          <span className="text-[11.5px] font-sans text-[#C9A15B] tracking-wider uppercase font-medium mt-1 block">
                            {stall.period}
                          </span>
                        </div>

                        {/* Price Block */}
                        <div className="my-5 pb-5 border-b border-white/10">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-editorial text-4xl sm:text-5xl text-[#F4EFE6] font-medium tracking-tight">
                              {stall.price}
                            </span>
                            <span className="text-xs text-[#E5DED2]/60 font-sans">
                              (exclusive of GST)
                            </span>
                          </div>
                          <p className="font-sans text-xs sm:text-[13px] text-[#E5DED2]/80 leading-relaxed mt-2.5">
                            {stall.description}
                          </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-3 mb-6">
                          <span className="text-[10px] font-sans font-semibold tracking-[0.18em] text-[#C9A15B] uppercase block">
                            STALL PROVISIONS
                          </span>
                          <ul className="space-y-2.5">
                            {stall.features.map((feat, fIdx) => (
                              <li
                                key={fIdx}
                                className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#F4EFE6]/90 leading-snug"
                              >
                                <div className="w-4 h-4 rounded-full bg-[#C9A15B]/20 border border-[#C9A15B]/60 flex items-center justify-center shrink-0 mt-0.5 text-[#C9A15B]">
                                  <Check className="w-2.5 h-2.5" />
                                </div>
                                <span>{feat.text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href={stall.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-sans text-xs tracking-[0.18em] uppercase font-semibold transition-all duration-300 mt-2 ${
                          stall.isPopular
                            ? "bg-[#C9A15B] text-[#032D1D] hover:bg-[#D8B56A] shadow-[0_4px_16px_rgba(201,161,91,0.3)]"
                            : "bg-transparent text-[#F4EFE6] border border-[#C9A15B]/60 hover:bg-[#C9A15B] hover:text-[#032D1D]"
                        }`}
                      >
                        <span>{stall.ctaText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              {/* ========================================================
                  EXHIBITION LOCATION & PRICING POLICY CALLOUT
                  ======================================================== */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-10 sm:mt-12 rounded-2xl bg-[#063321]/90 border border-[#C9A15B]/35 p-5 sm:p-7 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A15B]/20 border border-[#C9A15B]/50 flex items-center justify-center text-[#C9A15B] shrink-0 mt-0.5">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <span className="font-editorial text-lg sm:text-xl text-[#F4EFE6] font-normal">
                        Exhibition Grounds at Bharat Nivas, Auroville
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C9A15B]/15 text-[#C9A15B] text-[11px] font-sans font-semibold">
                        <Calendar className="w-3 h-3" />
                        5 &amp; 6 December 2026
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-[13.5px] text-[#E5DED2]/85 leading-relaxed max-w-3xl">
                      {stallsNote}
                    </p>
                  </div>
                </div>

                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A15B] text-[#032D1D] font-sans text-xs tracking-wider uppercase font-semibold hover:bg-[#D8B56A] transition-colors shadow-md"
                >
                  <span>Register Stall Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
