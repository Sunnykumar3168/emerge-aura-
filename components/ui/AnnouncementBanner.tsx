"use client";

import { motion } from "motion/react";

export default function AnnouncementBanner() {
  const dressCodeText =
    "Participants are required to wear Bharat traditional attire. Western outfits and formal dress codes are not permitted. Only Bharat traditional clothing is allowed.";

  return (
    <aside
      aria-label="Dress Code Announcement"
      className="sticky top-0 left-0 right-0 z-50 w-full h-9 sm:h-10 bg-[#073B2A] text-[#F5F1E8] border-b border-[#D8B56A]/30 shadow-sm flex items-center overflow-hidden select-none"
    >
      <div className="relative w-full h-full flex items-center overflow-hidden">
        {/* Soft edge gradient fades for polished luxury look */}
        <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-r from-[#073B2A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-l from-[#073B2A] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
          className="flex items-center shrink-0 whitespace-nowrap will-change-transform"
        >
          {/* Segment 1 */}
          <div className="flex items-center gap-2.5 pr-8 sm:pr-12">
            <span className="text-[11px] sm:text-[12px] font-sans text-[#FAF5E6] font-medium">
              <strong className="text-[#E5C15A] font-semibold">Bharat Traditional Attire Mandatory:</strong>{" "}
              {dressCodeText}
            </span>
          </div>

          {/* Segment 2 (Duplicate for continuous loop) */}
          <div className="flex items-center gap-2.5 pr-8 sm:pr-12" aria-hidden="true">
            <span className="text-[11px] sm:text-[12px] font-sans text-[#FAF5E6] font-medium">
              <strong className="text-[#E5C15A] font-semibold">Bharat Traditional Attire Mandatory:</strong>{" "}
              {dressCodeText}
            </span>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
