"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { conclaveJourneyData } from "@/data/agenda";
import AgendaCard from "@/components/agenda/AgendaCard";
import AgendaTimeline from "@/components/agenda/AgendaTimeline";

export default function ConclaveJourney() {
  const { eyebrow, heading, description, days } = conclaveJourneyData;

  return (
    <section
      id="agenda"
      aria-label="The Conclave Journey — Three Days. One Purpose."
      className="relative w-full bg-[#032D1D] text-[#F4EFE6] py-24 sm:py-36 overflow-hidden select-none border-t border-[#09422C]"
    >

      {/* 3. Subtle Ambient Radial Light behind Heading */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(201,161,91,0.08)_0%,transparent_70%)] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* ========================================================
          MAIN CONTENT CONTAINER
          ======================================================== */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* ========================================================
            HEADER: EYEBROW + EDITORIAL HEADLINE + INTRO
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl lg:max-w-4xl mx-auto mb-16 sm:mb-20 lg:mb-24"
        >
          {/* Eyebrow: ────── THE CONCLAVE JOURNEY ────── */}
          <div className="flex items-center justify-center gap-3.5 mb-5">
            <span className="w-12 sm:w-20 h-[1px] bg-[#C9A15B]/50" />
            <span className="text-[10.5px] sm:text-[11.5px] font-sans font-medium tracking-[0.32em] text-[#C9A15B] uppercase">
              {eyebrow}
            </span>
            <span className="w-12 sm:w-20 h-[1px] bg-[#C9A15B]/50" />
          </div>

          {/* Main Heading: Three Days. One Purpose. */}
          <h2 className="font-editorial text-[48px] sm:text-[68px] md:text-[84px] lg:text-[96px] font-normal leading-[0.98] tracking-tight text-[#F4EFE6] text-balance">
            {heading.prefix}{" "}
            <span className="text-[#C9A15B] font-normal">{heading.highlight}</span>
          </h2>

          {/* Short Supporting Description */}
          <p className="font-sans text-[14.5px] sm:text-[16px] md:text-[17px] text-[#E5DED2]/85 font-normal leading-relaxed max-w-[760px] mx-auto text-balance mt-6">
            {description}
          </p>

        </motion.div>

        {/* ========================================================
            THREE CARDS IN HORIZONTAL ROW (Desktop 3 Cols, Mobile Stack)
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {days.map((day, idx) => (
            <motion.div
              key={day.dayNumber}
              initial={{ opacity: 0, y: 70, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col w-full"
            >
              <AgendaCard day={day} index={idx} />
            </motion.div>
          ))}
        </div>

        {/* ========================================================
            CONNECTED THREE-POINT TIMELINE & DAY SUMMARIES
            ======================================================== */}
        <AgendaTimeline />
      </div>

    </section>
  );
}
