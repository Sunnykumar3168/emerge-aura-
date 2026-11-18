"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { sponsorLogos } from "@/data/sponsors";

const EASE_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────────────────────────────────────
   LOGO CARD
   ───────────────────────────────────────────────────────────────────────────── */
function LogoCard({
  logo,
  index,
}: {
  logo: { src: string; alt: string; name: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: EASE_CUBIC,
      }}
      className="group relative bg-white rounded-[18px] border border-[#E7DEC8] shadow-[0_4px_20px_rgba(7,59,42,0.03)] hover:shadow-[0_12px_36px_rgba(7,59,42,0.08)] hover:border-[#C89B3C]/60 hover:-translate-y-1 transition-all duration-300 p-5 sm:p-6 flex flex-col items-center justify-center gap-3 aspect-[4/3]"
    >
      {/* Inner highlight */}
      <div className="absolute inset-0 rounded-[18px] bg-gradient-to-b from-white/60 via-transparent to-transparent pointer-events-none" />

      {/* Logo Image */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <Image
          src={logo.src}
          alt={logo.alt}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
          className="object-contain p-3 sm:p-4 transition-transform duration-300 group-hover:scale-105"
          priority={index < 4}
        />
      </div>

      {/* Logo Name */}
      <p className="relative z-10 text-[11px] sm:text-[12px] font-sans font-semibold text-[#17352B]/60 tracking-wide text-center leading-tight line-clamp-2 group-hover:text-[#C89B3C] transition-colors duration-300">
        {logo.name}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */
export default function OrganizerLogosSection() {
  return (
    <section
      id="organizer-logos"
      aria-label="Partners and Enablers"
      className="relative w-full bg-[#F7F2E8] text-[#17352B] py-20 sm:py-28 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE_CUBIC }}
          className="text-center flex flex-col items-center mb-14 sm:mb-16"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.24em] text-[#C89B3C] uppercase">
              ORGANIZED & PRESENTED BY
            </span>
          </div>

          {/* Title */}
          <h2 className="font-editorial text-[42px] sm:text-[56px] lg:text-[68px] font-semibold text-[#073B2A] tracking-tight leading-none mb-4">
            Partners & Enablers
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-[15px] sm:text-[17px] text-[#17352B]/70 max-w-[580px] mx-auto leading-relaxed">
            A collective of institutions and communities co-creating EMERGE AURO — from innovation and education to enterprise and social impact.
          </p>
        </motion.div>

        {/* ── All Organizer Logos Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {sponsorLogos.map((logo, index) => (
            <LogoCard key={logo.src} logo={logo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
