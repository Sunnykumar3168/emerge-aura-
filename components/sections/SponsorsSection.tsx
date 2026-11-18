"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  animate,
} from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sponsorLogos, SponsorLogoItem } from "@/data/sponsors";

const EASE_CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

function SponsorCard({ logo }: { logo: SponsorLogoItem }) {
  return (
    <div className="group relative w-[240px] sm:w-[280px] h-[160px] sm:h-[180px] bg-white/95 rounded-[20px] border border-[#063522]/10 shadow-[0_8px_30px_rgba(6,53,34,0.06)] hover:shadow-[0_16px_40px_rgba(6,53,34,0.14)] hover:border-[#063522]/30 hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col items-center justify-between shrink-0 select-none backdrop-blur-sm">

      {/* Logo container */}
      <div className="relative w-full flex-1 flex items-center justify-center my-2">
        <Image
          src={logo.src}
          alt={logo.alt}
          fill
          sizes="280px"
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

export default function SponsorsSection() {
  const x = useMotionValue(0);
  const isHovered = useRef(false);
  const isAnimating = useRef(false);

  // Layout math for seamless continuous loop
  const cardWidth = 280;
  const gap = 24;
  const itemWidth = cardWidth + gap;
  const totalItems = sponsorLogos.length;
  const contentWidth = itemWidth * totalItems;
  const speed = 40; // px per second

  // Repeat logos 3 times for seamless wrapping
  const duplicatedSponsors = [...sponsorLogos, ...sponsorLogos, ...sponsorLogos];

  // Infinite scroll loop
  useAnimationFrame((_, delta) => {
    if (isHovered.current || isAnimating.current) return;

    let currentX = x.get() - speed * (delta / 1000);
    if (currentX <= -contentWidth) {
      currentX += contentWidth;
    }
    x.set(currentX);
  });

  const handlePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    let currentX = x.get();
    const jumpAmount = itemWidth * 2;

    if (currentX + jumpAmount > 0) {
      currentX -= contentWidth;
      x.set(currentX);
    }

    animate(x, currentX + jumpAmount, {
      type: "tween",
      duration: 0.65,
      ease: EASE_CUBIC,
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  };

  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    let currentX = x.get();
    const jumpAmount = itemWidth * 2;

    if (currentX - jumpAmount < -contentWidth) {
      currentX += contentWidth;
      x.set(currentX);
    }

    animate(x, currentX - jumpAmount, {
      type: "tween",
      duration: 0.65,
      ease: EASE_CUBIC,
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  };

  return (
    <section
      id="sponsors"
      aria-label="Our Sponsors & Enablers"
      className="relative w-full bg-[#F5CB62] text-[#063522] py-20 sm:py-28 overflow-hidden select-none"
    >
      {/* Background radial gradient & noise */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#F6D378] via-[#F5CB62] to-[#E3B84A] z-0" />
      <div
        className="absolute inset-0 z-0 opacity-[0.06] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-white/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D4A33B]/25 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Header Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#063522]/15">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[12px] font-sans font-bold tracking-[0.24em] text-[#6B4A16] uppercase">
                PARTNER FOR IMPACT
              </span>
            </div>
            <h2 className="font-editorial text-[48px] sm:text-[64px] lg:text-[76px] font-medium leading-[0.95] text-[#063522] tracking-tight">
              Our Enablers
            </h2>
            <p className="font-sans text-[16px] sm:text-[18px] text-[#063522]/80 font-normal mt-3 max-w-[540px]">
              Thanks to the visionary organisations and partners that make EMERGE AURO possible.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous sponsors"
              className="w-11 h-11 rounded-full border border-[#063522]/20 flex items-center justify-center text-[#063522] hover:bg-[#063522] hover:text-[#F5CB62] hover:border-[#063522] transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next sponsors"
              className="w-11 h-11 rounded-full border border-[#063522]/20 flex items-center justify-center text-[#063522] hover:bg-[#063522] hover:text-[#F5CB62] hover:border-[#063522] transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Infinite Scroll Carousel */}
      <div
        className="relative w-full z-10 cursor-grab active:cursor-grabbing overflow-hidden py-4"
        onMouseEnter={() => {
          isHovered.current = true;
        }}
        onMouseLeave={() => {
          isHovered.current = false;
        }}
      >
        {/* Soft edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F5CB62] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F5CB62] to-transparent z-20 pointer-events-none" />

        <motion.div
          style={{ x }}
          className="flex gap-6 items-center px-4"
        >
          {duplicatedSponsors.map((logo, idx) => (
            <SponsorCard key={`${logo.id}-${idx}`} logo={logo} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
