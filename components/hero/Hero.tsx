"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { heroSlides } from "@/data/heroSlides";
import RegisterModal from "@/components/ui/RegisterModal";

const AUTOPLAY_DURATION = 6000; // 6 seconds per slide

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const progressStartTimeRef = useRef<number>(Date.now());
  const elapsedBeforePauseRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    setProgress(0);
    progressStartTimeRef.current = Date.now();
    elapsedBeforePauseRef.current = 0;
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setProgress(0);
    progressStartTimeRef.current = Date.now();
    elapsedBeforePauseRef.current = 0;
  }, []);

  const handleSelectSlide = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    setProgress(0);
    progressStartTimeRef.current = Date.now();
    elapsedBeforePauseRef.current = 0;
  };

  // 6s Autoplay Timer
  useEffect(() => {
    progressStartTimeRef.current = Date.now();
    elapsedBeforePauseRef.current = 0;

    const tick = () => {
      if (!isPausedRef.current) {
        const now = Date.now();
        const elapsed = now - progressStartTimeRef.current + elapsedBeforePauseRef.current;
        const currentProgress = (elapsed / AUTOPLAY_DURATION) * 100;

        if (currentProgress >= 100) {
          handleNext();
        } else {
          setProgress(currentProgress);
        }
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [handleNext]);

  // Pause on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
    isPausedRef.current = true;
    elapsedBeforePauseRef.current += Date.now() - progressStartTimeRef.current;
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    isPausedRef.current = false;
    progressStartTimeRef.current = Date.now();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  const currentSlide = heroSlides[currentIndex];

  return (
    <section
      id="hero"
      aria-label="Emerge Auro Conclave Hero Carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[100dvh] min-h-[100dvh] bg-[#02130C] text-[#F5F1E8] overflow-hidden select-none flex flex-col items-center justify-center"
    >
      {/* ========================================================
1. BACKGROUND IMAGES SLIDESHOW (Banyan & Matrimandir)
          ======================================================== */}
       <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              quality={92}
              className="object-cover object-center w-full h-full"
            />
          </div>
        ))}
  {/* Balanced Scrim Overlays: keeps the background image visible while giving rich contrast for text */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#021810]/90 via-[#032317]/60 to-[#021810]/50 z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,28,19,0.35)_0%,rgba(2,16,11,0.75)_100%)] z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Ambient Gold Orbital Rings in corner */}
        <div
          className="absolute -top-20 -right-20 sm:-top-28 sm:-right-28 lg:-top-32 lg:-right-32 pointer-events-none select-none z-10 opacity-50"
          aria-hidden="true"
        >

       <svg
            className="absolute -top-24 -left-24 w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] lg:w-[720px] lg:h-[720px] pointer-events-none animate-[spin_120s_linear_infinite]"
            viewBox="0 0 700 700"
            fill="none"
          >
            <circle cx="350" cy="350" r="280" stroke="rgba(229, 193, 90, 0.3)" strokeWidth="1" />
            <circle cx="350" cy="350" r="330" stroke="rgba(229, 193, 90, 0.18)" strokeWidth="1" strokeDasharray="4 6" />
          </svg>
        </div>
      </div>


      {/* ========================================================
          2. SLIDE CONTENT CONTAINER
          ======================================================== */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3 max-w-4xl"
          >
            {/* Eyebrow Pill Badge - Highlighted with gold pill border & soft dark backdrop */}
            <div className="flex items-center justify-center pt-32 sm:pt-36 mb-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-[#E5C15A]/40 backdrop-blur-md text-[11px] sm:text-[12.5px] font-sans font-bold tracking-[0.26em] text-[#E5C15A] uppercase select-none shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5C15A] animate-pulse" />
                {currentSlide.eyebrow}
              </span>
            </div>

            {/* Grand Headline - Strong drop shadow & golden highlight */}
            <h1 className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-semibold text-[#FFFFFF] tracking-tight leading-[0.93] mb-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              {currentSlide.headlineMain}{" "}
              <span className="text-[#E5C15A] font-normal italic drop-shadow-[0_2px_16px_rgba(229,193,90,0.45)]">
                {currentSlide.headlineAccent}
              </span>
            </h1>

            {/* Editorial Sub-Headline - Clean contrast & readability */}
            <p className="font-editorial text-xl sm:text-2xl md:text-3xl font-medium text-[#FAF7EE] tracking-tight leading-snug max-w-[850px] text-balance mb-2 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              {currentSlide.subHeadline}
            </p>

            {/* Narrative Description - Backed with soft readable styling */}
            <p className="font-sans text-[15px] sm:text-base md:text-lg text-[#F4EFE6]/90 leading-relaxed max-w-[720px] text-balance mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] font-normal">
              {currentSlide.narrative}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-y-3 gap-x-6 w-full max-w-[480px]">
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#E5C15A] text-[#050E0B] hover:bg-[#F0CD6D] transition-all duration-300 font-sans text-sm md:text-base font-bold tracking-[0.14em] uppercase shadow-[0_4px_24px_rgba(229,193,90,0.5)] hover:shadow-[0_6px_32px_rgba(229,193,90,0.7)] hover:-translate-y-0.5 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C15A] cursor-pointer"
              >
                <span>{currentSlide.primaryCta.label}</span>
              </button>

              <a
                href={currentSlide.secondaryCta.href}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-black/50 backdrop-blur-md border border-white/50 text-[#FFFFFF] hover:bg-white hover:text-[#050E0B] hover:border-white transition-all duration-300 font-sans text-sm md:text-base font-semibold tracking-[0.14em] uppercase shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{currentSlide.secondaryCta.label}</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================
          3. CONTROLS: ARROWS & BOTTOM PROGRESS
          ======================================================== */}
      {/* Left Chevron Button */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="group absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 rounded-full flex items-center justify-center bg-black/55 hover:bg-black/80 border border-white/35 hover:border-[#E5C15A] backdrop-blur-md text-[#F7F3E8] hover:text-[#E5C15A] transition-all duration-300 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
      </button>

      {/* Right Chevron Button */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Slide"
        className="group absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 rounded-full flex items-center justify-center bg-black/55 hover:bg-black/80 border border-white/35 hover:border-[#E5C15A] backdrop-blur-md text-[#F7F3E8] hover:text-[#E5C15A] transition-all duration-300 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>

      {/* Registration Choice Modal */}
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </section>
  );
}
