"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Search,
  X,
  Sparkles,
  Users,
  Building2,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { speakers, Speaker } from "@/data/speaker";

export default function SpeakersDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  // Filter speakers based on search query (name or designation)
  const filteredSpeakers = useMemo(() => {
    if (!searchQuery.trim()) return speakers;
    const q = searchQuery.toLowerCase();
    return speakers.filter(
      (spk) =>
        spk.name.toLowerCase().includes(q) ||
        spk.designation.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <section
      aria-label="All Speakers Directory"
      className="relative w-full min-h-screen bg-[#F4F0E6] text-[#10251D] pt-28 sm:pt-36 pb-24 sm:pb-32 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Background Decorative Auras */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A15B]/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-1/3 -left-32 w-[450px] h-[450px] bg-[#073B2A]/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ========================================================
            1. BREADCRUMB & BACK LINK
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            href="/#speakers"
            className="group inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase text-[#8C6D34] hover:text-[#073B2A] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Home / Speakers</span>
          </Link>
        </motion.div>

        {/* ========================================================
            2. HEADER BANNER
            ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#10251D]/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A15B]" />
              <span className="text-[11px] sm:text-xs font-sans font-semibold tracking-[0.26em] text-[#C9A15B] uppercase">
                VOICES OF CHANGE • EMERGE AURO 2026
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-editorial text-[38px] sm:text-[54px] lg:text-[64px] font-normal leading-[1.08] text-[#10251D] tracking-tight mb-4">
              All <span className="text-[#C9A15B]">Speakers</span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-[15px] sm:text-[17px] text-[#3D4C43] font-normal leading-relaxed">
              Explore the complete lineup of pioneers, conscious leaders,
              visionaries, and change-makers converging to shape Bharat&apos;s
              First Conscious Capital Conclave.
            </p>

            {/* Conclave Info Pills */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#C9A15B]/30 text-xs font-medium text-[#10251D] shadow-xs">
                <Users className="w-3.5 h-3.5 text-[#8C6D34]" />
                <span>{speakers.length} Distinguished Speakers</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#C9A15B]/30 text-xs font-medium text-[#10251D] shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-[#8C6D34]" />
                <span>Auroville & Puducherry</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#C9A15B]/30 text-xs font-medium text-[#10251D] shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-[#8C6D34]" />
                <span>Emerge Auro 2026</span>
              </div>
            </div>
          </motion.div>

          {/* ========================================================
              3. SEARCH INPUT
              ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-96"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6D34]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search speaker name or role..."
                aria-label="Search speakers"
                className="w-full pl-11 pr-10 py-3 rounded-full bg-white border border-[#E3D9C3] focus:border-[#C9A15B] focus:ring-2 focus:ring-[#C9A15B]/20 text-sm text-[#10251D] placeholder:text-[#5A6D61]/60 outline-none transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#EAE2D2] hover:bg-[#C9A15B] text-[#10251D] hover:text-white flex items-center justify-center transition-colors text-xs"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between text-xs font-sans text-[#5A6D61] mt-2 px-2">
              <span>
                Showing <strong className="text-[#10251D]">{filteredSpeakers.length}</strong> of {speakers.length} speakers
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-[#8C6D34] hover:underline"
                >
                  Reset filter
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* ========================================================
            4. ALL SPEAKERS GRID (SMALL IMAGES & FULL DETAILS)
            ======================================================== */}
        <div className="mt-10">
          {filteredSpeakers.length === 0 ? (
            <div className="py-20 text-center bg-white/70 rounded-3xl border border-[#E3D9C3] p-8 max-w-lg mx-auto">
              <p className="font-editorial text-2xl text-[#10251D] mb-2">
                No speakers found
              </p>
              <p className="font-sans text-sm text-[#5A6D61] mb-6">
                No speakers matched your search &quot;{searchQuery}&quot;. Try searching for another name or designation.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="px-6 py-2.5 rounded-full bg-[#073B2A] text-[#FAF8F2] text-xs font-semibold tracking-wider uppercase hover:bg-[#05271C] transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
            >
              {filteredSpeakers.map((spk, idx) => {
                const imgSrc = spk.img.startsWith("/") ? spk.img : `/${spk.img}`;

                return (
                  <motion.div
                    layout
                    key={spk.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min(idx * 0.03, 0.4),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => setSelectedSpeaker(spk)}
                    className="group relative bg-white rounded-[20px] p-5 sm:p-5.5 border border-[#E3D9C3] hover:border-[#C9A15B] shadow-[0_4px_16px_rgba(7,59,42,0.04)] hover:shadow-[0_14px_34px_rgba(7,59,42,0.1)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-start"
                  >
                    {/* Subtle aura gradient on hover */}
                    <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-[#C9A15B]/0 via-[#C9A15B]/0 to-[#C9A15B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div>
                      {/* Top Row: Small Avatar & Speaker Badge */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        {/* Small Image Container */}
                        <div className="relative w-20 h-20 sm:w-[84px] sm:h-[84px] rounded-full overflow-hidden bg-gradient-to-b from-[#FAF6ED] to-[#ECE2D0] border-2 border-[#C9A15B]/30 group-hover:border-[#C9A15B] shadow-inner shrink-0 transition-colors duration-300">
                          <Image
                            src={imgSrc}
                            alt={spk.name}
                            fill
                            sizes="84px"
                            className="object-contain object-bottom drop-shadow-sm group-hover:scale-108 transition-transform duration-300"
                          />
                        </div>

                        {/* Speaker ID Badge */}
                        <span className="text-[10px] font-sans font-bold tracking-wider text-[#8C6D34] uppercase bg-[#F8F5EE] px-2.5 py-1 rounded-full border border-[#C9A15B]/25">
                          Speaker
                        </span>
                      </div>

                      {/* Speaker Name */}
                      <h3 className="font-editorial text-[19px] sm:text-[20px] font-semibold text-[#10251D] group-hover:text-[#8C6D34] transition-colors duration-300 leading-snug line-clamp-1 mb-1.5">
                        {spk.name}
                      </h3>

                      {/* Speaker Designation */}
                      <p className="font-sans text-[12.5px] sm:text-[13px] text-[#42544A] leading-[1.45] font-normal line-clamp-3">
                        {spk.designation}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>

      {/* ========================================================
          5. SPEAKER DETAIL MODAL
          ======================================================== */}
      <AnimatePresence>
        {selectedSpeaker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSpeaker(null)}
              className="fixed inset-0 bg-[#050E0B]/70 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg bg-[#FAF8F2] rounded-[24px] border border-[#C9A15B]/40 shadow-2xl p-6 sm:p-8 z-10 overflow-hidden text-[#10251D]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedSpeaker(null)}
                aria-label="Close dialog"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-[#C9A15B]/30 hover:border-[#C9A15B] text-[#10251D] hover:bg-[#073B2A] hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Portrait & Basic Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gradient-to-b from-[#FAF6ED] to-[#ECE2D0] border-2 border-[#C9A15B] shadow-md shrink-0">
                  <Image
                    src={
                      selectedSpeaker.img.startsWith("/")
                        ? selectedSpeaker.img
                        : `/${selectedSpeaker.img}`
                    }
                    alt={selectedSpeaker.name}
                    fill
                    sizes="128px"
                    className="object-contain object-bottom drop-shadow-md"
                  />
                </div>

                <div className="text-center sm:text-left flex-1">
                  <span className="inline-block text-[11px] font-sans font-semibold tracking-[0.2em] text-[#C9A15B] uppercase mb-1">
                    DISTINGUISHED SPEAKER
                  </span>
                  <h3 className="font-editorial text-[24px] sm:text-[28px] font-semibold text-[#10251D] leading-tight mb-2">
                    {selectedSpeaker.name}
                  </h3>
                  <p className="font-sans text-sm sm:text-[14.5px] text-[#3D4C43] leading-relaxed">
                    {selectedSpeaker.designation}
                  </p>
                </div>
              </div>

              {/* Conclave Context Card */}
              <div className="p-4 rounded-xl bg-white border border-[#E3D9C3] mb-6 text-xs text-[#5A6D61] space-y-2">
                <div className="flex items-center gap-2 text-[#10251D] font-medium">
                  <Building2 className="w-4 h-4 text-[#8C6D34]" />
                  <span>EMERGE AURO 2026 • Bharat&apos;s Conscious Capital Conclave</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8C6D34]" />
                  <span>Venue: Auroville & Puducherry, India</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSpeaker(null)}
                  className="px-5 py-2.5 rounded-full bg-[#073B2A] text-[#FAF8F2] text-xs font-semibold tracking-wider uppercase hover:bg-[#05271C] border border-[#C9A15B]/40 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
