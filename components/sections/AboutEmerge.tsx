"use client";

import { motion } from "motion/react";
import { CalendarDays, Users, Landmark, Handshake, Globe2, Rocket } from "lucide-react";
import { aboutData } from "@/data/about";
import EcosystemVisual from "@/components/ui/EcosystemVisual";

const verticalIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  psa: Landmark,
  b2b: Handshake,
  "csr-consulates": Globe2,
  startups: Rocket,
};

export default function AboutEmerge() {
  return (
    <section
      id="about"
      aria-label="About Emerge Auro — Bharat's First Conscious Capital Conclave"
      className="relative w-full bg-[#F4F0E6] text-[#10251D] overflow-hidden flex items-center justify-center select-none py-10 lg:py-16"
    >
      {/* ========================================================
          3. MAIN EDITORIAL CONTENT CONTAINER
          ======================================================== */}
      <div className="relative z-20 w-full max-w-[1500px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
        {/* Mobile & Desktop Ecosystem View (Centered on smaller & medium screens) */}
        <div className="w-full flex justify-center lg:justify-start">
          <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] lg:w-[450px] lg:h-[450px] xl:w-[580px] xl:h-[580px] 2xl:w-[680px] 2xl:h-[680px] shrink-0 z-30">
            {/* Outer Thin Champagne-Gold Orbital Ring with Satellite Dot (Desktop only) */}
            <div className="hidden lg:block absolute -inset-6 xl:-inset-8 rounded-full border border-[#C9A15B]/50 pointer-events-none">
              <div className="absolute top-1/2 -right-3 xl:-right-3.5 -translate-y-1/2 w-4 h-4 xl:w-5 xl:h-5 rounded-full bg-[#C9A15B] shadow-[0_0_12px_rgba(201,161,91,0.85)] border-2 border-[#F4F0E6]" />
            </div>
            <EcosystemVisual />
          </div>
        </div>

        {/* Desktop Content Block: Anchored adjacent to the left circle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 w-full flex flex-col items-center lg:items-start text-center lg:text-left"
        >
        

          {/* Heading: About EMERGE AURO (Exact title-case typography matching Image 2) */}
          <h2 className="font-editorial text-[42px] sm:text-[54px] lg:text-[60px] xl:text-[68px] 2xl:text-[74px] font-normal leading-[1.0] text-[#10251D] tracking-tight mb-3 sm:mb-3.5 self-center lg:self-start">
              Business Beyond Business
          </h2>

          {/* Introductory Narrative */}
          <div className="space-y-3.5 sm:space-y-4 xl:space-y-4.5 max-w-[700px] xl:max-w-[760px] 2xl:max-w-[800px] text-[13.5px] sm:text-[14.5px] lg:text-[15px] xl:text-[15.5px] font-sans font-normal leading-[1.68] text-[#26352D] opacity-95">
            {aboutData.storyBlocks.map((block) => (
              <p key={block.number} className="text-balance">
                {block.paragraph}
              </p>
            ))}
          </div>

          {/* Four Key Verticals Cards (Positioned above eventInfo Section) */}
          <div id="verticals" className="w-full max-w-[700px] xl:max-w-[760px] 2xl:max-w-[800px] my-5 scroll-mt-28">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {aboutData.keyVerticals.map((vertical) => {
                const Icon = verticalIconMap[vertical.id] || Landmark;
                return (
                  <div
                    key={vertical.id}
                    className="group relative bg-white/75 hover:bg-white/95 border border-[#10251D]/10 hover:border-[#C9A15B]/50 rounded-xl p-3.5 sm:p-4 transition-all duration-300 shadow-[0_2px_8px_rgba(16,37,29,0.03)] hover:shadow-[0_6px_20px_rgba(16,37,29,0.06)] flex flex-col justify-between text-left"
                  >
                    <div>
                      {/* Card Header: Icon + Title */}
                      <div className="flex items-start gap-2.5 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-[#EADCC2]/50 border border-[#C9A15B]/40 flex items-center justify-center text-[#8C733E] shrink-0 group-hover:bg-[#C9A15B]/20 transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h3 className="font-editorial text-[17px] sm:text-[18px] font-medium text-[#10251D] leading-snug">
                          {vertical.title}
                        </h3>
                      </div>

                      {/* Description Heading: Outcome we measure */}
                      <div className="mt-2 pt-2">
                        <p className="font-sans text-[12px] sm:text-[12.5px] text-[#26352D] leading-[1.55] opacity-90 font-normal">
                          {vertical.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Event Information Row (Matching Image 2) */}
          <div className="w-full max-w-[700px] xl:max-w-[760px] 2xl:max-w-[800px] mt-6 border border-[#10251D]/15 flex flex-col sm:flex-row items-start md:items-center gap-5 sm:gap-8 bg-white/60 p-4 sm:p-5 rounded-2xl">
            {/* Left Column: Date & Venue */}
            <div className="flex items-center gap-3.5 shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#EADCC2]/60 border border-[#C9A15B]/40 flex items-center justify-center text-[#8C733E]">
                <CalendarDays className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-base font-medium text-[#3A4B42] leading-none block">
                  28 Oct, 5–6 Dec 2026
                </span>
                <span className="font-sans text-[10px] sm:text-[11px] tracking-wider uppercase text-[#8C733E] font-medium mt-1 block">
                  Pondicherry University & Auroville
                </span>
              </div>
            </div>

            {/* Subtle Vertical Divider between info blocks */}
            <div className="hidden sm:block w-[1px] h-10 bg-[#10251D]/15 shrink-0" aria-hidden="true" />

            {/* Right Column: Purpose & Commitment */}
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#EADCC2]/60 border border-[#C9A15B]/40 flex items-center justify-center text-[#8C733E] shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <p className="font-sans text-[11.5px] sm:text-[12.5px] text-[#3A4B42] font-normal leading-snug text-left opacity-90">
                Three days bringing founders, investors, institutions and student innovators together to turn conscious capital into commitments.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
