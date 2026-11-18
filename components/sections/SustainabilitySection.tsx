"use client";

import { motion } from "motion/react";
import {
  Bus,
  UtensilsCrossed,
  Shirt,
  Droplets,
  FileCheck2,
  TreePine,
  Flower2,
  Palette,
  Camera,
  Leaf,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import { sustainabilityData, SustainabilityItem } from "@/data/sustainability";

const iconMap: Record<SustainabilityItem["iconName"], LucideIcon> = {
  Bus,
  UtensilsCrossed,
  Shirt,
  Droplets,
  FileCheck2,
  TreePine,
  Flower2,
  Palette,
  Camera,
};

const EASE_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

function SustainabilityCard({
  item,
  index,
}: {
  item: SustainabilityItem;
  index: number;
}) {
  const Icon = iconMap[item.iconName] || Leaf;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: (index % 3) * 0.08,
        ease: EASE_CUBIC,
      }}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-[22px] bg-white border border-[#E7DEC8] hover:border-[#C89B3C] shadow-[0_4px_20px_rgba(7,59,42,0.03)] hover:shadow-[0_14px_36px_rgba(7,59,42,0.09)] hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Subtle top background highlight */}
      <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-[#F7F2E8]/60 via-transparent to-transparent pointer-events-none" />

      <div>
        {/* Header row: Icon & Tag */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-[#073B2A]/5 border border-[#073B2A]/10 flex items-center justify-center text-[#073B2A] group-hover:bg-[#073B2A] group-hover:text-[#E3B873] group-hover:scale-105 transition-all duration-300">
            <Icon className="w-5 h-5 stroke-[1.8]" />
          </div>
          <span className="text-[10px] font-sans font-bold tracking-[0.18em] text-[#C89B3C] uppercase bg-[#C89B3C]/10 px-2.5 py-1 rounded-full border border-[#C89B3C]/20">
            {item.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-editorial text-[24px] sm:text-[27px] font-medium text-[#073B2A] leading-tight mb-2.5 group-hover:text-[#C89B3C] transition-colors duration-300">
          {item.title}
        </h3>

        {/* Content */}
        <p className="font-sans text-[14.5px] sm:text-[15.5px] text-[#17352B]/75 leading-relaxed font-normal">
          {item.content}
        </p>
      </div>
    </motion.div>
  );
}

export default function SustainabilitySection() {
  const { eyebrow, heading, subheading, items } = sustainabilityData;

  return (
    <section
      id="sustainability"
      aria-label="Sustainability at EMERGE AURO"
      className="relative w-full bg-[#F7F2E8] text-[#17352B] py-20 sm:py-28 lg:py-36 overflow-hidden select-none"
    >
      {/* Decorative subtle ambient lights */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(200,155,60,0.08)_0%,transparent_70%)] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#073B2A]/5 rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: EASE_CUBIC }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.26em] text-[#C89B3C] uppercase">
              {eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-editorial text-[44px] sm:text-[60px] lg:text-[72px] font-semibold text-[#073B2A] tracking-tight leading-none mb-5">
            {heading}
          </h2>

          {/* Subheading */}
          <p className="font-sans text-[15.5px] sm:text-[17.5px] text-[#17352B]/70 max-w-[620px] mx-auto leading-relaxed">
            {subheading}
          </p>
        </motion.div>

        {/* Sustainability Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {items.map((item, index) => (
            <SustainabilityCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
