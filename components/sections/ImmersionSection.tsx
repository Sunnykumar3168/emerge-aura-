"use client";

import { motion } from "motion/react";
import {
  Palette,
  Footprints,
  Sparkles,
  Compass,
  Sun,
  Leaf,
  LucideIcon,
} from "lucide-react";
import { immersionData, ImmersionExperience } from "@/data/immersion";

const iconMap: Record<ImmersionExperience["iconName"], LucideIcon> = {
  Palette,
  Footprints,
  Sparkles,
  Compass,
  Sun,
};

const EASE_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ImmersionCard({
  experience,
  index,
}: {
  experience: ImmersionExperience;
  index: number;
}) {
  const Icon = iconMap[experience.iconName] || Leaf;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: EASE_CUBIC,
      }}
      className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-[24px] bg-[#073623]/70 hover:bg-[#073623] border border-[#C9A15B]/20 hover:border-[#C9A15B]/50 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.18)] hover:shadow-[0_16px_40px_rgba(201,161,91,0.12)] hover:-translate-y-1.5 backdrop-blur-sm"
    >
      {/* Subtle gold gradient accent on hover */}
      <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-[#C9A15B]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Top row: Icon and index tag */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#C9A15B]/15 border border-[#C9A15B]/30 flex items-center justify-center text-[#E3B873] group-hover:bg-[#C9A15B] group-hover:text-[#032D1D] group-hover:scale-105 transition-all duration-300">
            <Icon className="w-6 h-6 stroke-[1.75]" />
          </div>
          <span className="text-[10.5px] font-sans font-bold tracking-[0.2em] text-[#C9A15B] uppercase bg-[#C9A15B]/10 px-3 py-1 rounded-full border border-[#C9A15B]/20">
            {experience.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-editorial text-[26px] sm:text-[30px] font-normal text-[#F4EFE6] leading-tight mb-3 group-hover:text-[#E3B873] transition-colors duration-300">
          {experience.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-[15px] sm:text-[16px] text-[#F4EFE6]/75 font-normal leading-relaxed">
          {experience.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ImmersionSection() {
  const { eyebrow, heading, subheading, experiences } = immersionData;

  return (
    <section
      id="immersion"
      aria-label="Immersion Experiences in Auroville"
      className="relative w-full bg-[#032D1D] text-[#F4EFE6] py-20 sm:py-28 lg:py-36 overflow-hidden select-none border-t border-[#09422C]"
    >
      {/* Background atmospheric glows */}
      <div
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(201,161,91,0.08)_0%,transparent_70%)] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 left-10 w-[450px] h-[450px] bg-[#C9A15B]/5 rounded-full blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: EASE_CUBIC }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3.5 mb-4">
            <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.28em] text-[#C9A15B] uppercase">
              {eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-editorial text-[44px] sm:text-[62px] lg:text-[76px] font-normal leading-[0.98] tracking-tight text-[#F4EFE6] mb-5">
            {heading}
          </h2>

          {/* Subheading */}
          <p className="font-sans text-[16px] sm:text-[19px] text-[#F4EFE6]/80 font-normal leading-relaxed max-w-[620px] mx-auto">
            {subheading}
          </p>
        </motion.div>

        {/* Cards Grid: 3 in top row, 2 centered in bottom row on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {experiences.slice(0, 3).map((exp, idx) => (
            <ImmersionCard key={exp.id} experience={exp} index={idx} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mt-6 sm:mt-8">
          {experiences.slice(3).map((exp, idx) => (
            <ImmersionCard key={exp.id} experience={exp} index={idx + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
