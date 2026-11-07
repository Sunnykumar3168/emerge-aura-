"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { stakeholdersData } from "@/data/stakeholders";
import StakeholderCard from "@/components/ui/StakeholderCard";

export default function StakeholderSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax motion for gold circle & orbital elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const circleY = useTransform(scrollYProgress, [0, 1], [10, -25]);
  const circleRotate = useTransform(scrollYProgress, [0, 1], [-1, 3]);
  const ringsY = useTransform(scrollYProgress, [0, 1], [5, -12]);
  const curvesY = useTransform(scrollYProgress, [0, 1], [0, 8]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="The Emerge Ecosystem — Why Should You Be There?"
      className="relative w-full bg-[#F4F0E6] text-[#10251D] py-24 sm:py-32 lg:py-40 overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-[1260px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl lg:max-w-4xl mx-auto text-center flex flex-col items-center mb-16 sm:mb-20 lg:mb-24"
        >
          {/* Eyebrow with decorative flanking gold lines */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 sm:w-12 h-[1px] bg-[#C9A15B]/70" />
            <span className="text-[11px] sm:text-xs font-sans font-semibold tracking-[0.28em] text-[#8C733E] uppercase">
              THE EMERGE ECOSYSTEM
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#C9A15B]/70" />
          </div>

          {/* Main Headline */}
          <h2 className="font-editorial text-6xl font-semibold leading-[0.94] tracking-tight text-[#10251D] text-balance my-2">
            WHY SHOULD YOU BE THERE?
          </h2>

          {/* Supporting Text */}
          <p className="font-sans text-[14px] sm:text-[15.5px] md:text-[16.5px] text-[#2C3E35] font-normal leading-relaxed max-w-[760px] text-balance mt-6 opacity-95">
            For the first time in Bharat, EMERGE AURO brings together the people who will explore
            Conscious Capitalism — businesses that create  value not only for themselves, but for people,
            planet and the future.
          </p>
        </motion.div>

        {/* ========================================================
            SIX CARDS (3 columns × 2 rows on Desktop, 1 col on Mobile)
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {stakeholdersData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 45, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.75,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <StakeholderCard stakeholder={item} index={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
