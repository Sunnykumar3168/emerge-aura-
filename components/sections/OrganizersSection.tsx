"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { organizersData, OrganizerItem } from "@/data/organizers";

const EASE_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Framer Motion animation variants for polished staggered entrance
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_CUBIC,
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/* Individual Organizer Card Component */
function OrganizerCard({ item, index }: { item: OrganizerItem; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative bg-[#FFFFFF] rounded-[24px] border border-[#E7DEC8] shadow-[0_8px_30px_rgba(15,45,37,0.03)] hover:shadow-[0_20px_50px_rgba(15,45,37,0.08)] hover:border-[#C5A880] transition-all duration-400 ease-out hover:-translate-y-1.5 p-7 sm:p-8 flex flex-col h-full group overflow-hidden"
    >
      {/* Large Logo Display Frame */}
      <div className="relative w-full h-[180px] sm:h-[200px] rounded-[18px] flex items-center justify-center p-6 mb-6 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={item.logo}
            alt={item.logoAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
            className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            priority={index < 2}
          />
        </div>
      </div>

      {/* Number and Name row */}
      <div className="flex items-baseline gap-3 mb-3">
        <h3 className="font-editorial text-[22px] sm:text-[25px] font-bold text-[#0F2D25] leading-snug tracking-tight group-hover:text-[#09221C] transition-colors">
          {item.name}
        </h3>
      </div>

      {/* Description Paragraphs */}
      <div className="space-y-3 font-sans text-[13.5px] sm:text-[14px] leading-[1.7] text-[#243E33]/90 font-normal flex-1 mb-6">
        <p>{item.paragraphs}</p>
      </div>

      {/* Card Footer: Action Button */}
      {item.url && (
        <div className="pt-4 flex items-center justify-end mt-auto">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C5A880]/90 text-[#0F2D25] bg-[#FAF7F0]/60 hover:bg-[#C5A880] hover:text-[#FFFFFF] transition-all duration-300 text-[11.5px] sm:text-[12px] font-sans font-semibold tracking-[0.08em] uppercase shadow-2xs group/btn active:scale-95 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
          >
            <span>{item.buttonText || "VISIT WEBSITE"}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 text-current" />
          </a>
        </div>
      )}
    </motion.div>
  );
}

export default function OrganizersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="organizers"
      aria-label="Our Ecosystem Partners — Organizers"
      className="relative w-full bg-[#FAF7F0] text-[#0F2D25] py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* SECTION HEADER */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center flex flex-col items-center mb-16 sm:mb-20"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
            <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-[#8C733E] uppercase">
              OUR ECOSYSTEM PARTNERS
            </span>
          </div>

          <h2 className="font-editorial text-[44px] sm:text-[56px] lg:text-[68px] font-semibold text-[#0F2D25] tracking-tight leading-none mb-4">
            Organ<span className="text-[#C59A45]">izers</span>
          </h2>

          <p className="font-sans text-[15px] sm:text-[17px] text-[#2D453B]/80 max-w-[680px] mx-auto leading-relaxed">
            A collective of institutions and communities working together to shape EMERGE AURO — from innovation and education to enterprise and social impact.
          </p>
        </motion.div>

        {/* ALL ORGANIZERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-7 lg:gap-8 items-stretch">
          {organizersData.map((item, index) => (
            <OrganizerCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
