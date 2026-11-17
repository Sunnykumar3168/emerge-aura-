"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Sparkles, CheckCircle2, XCircle } from "lucide-react";

// Conclave Date: 28 October 2026, 09:00:00 IST (Asia/Kolkata)
const CONCLAVE_TIMESTAMP = new Date("2026-10-28T09:00:00+05:30").getTime();

interface TimeValues {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isCompleted: boolean;
}

function calculateTimeLeft(): TimeValues {
  const now = Date.now();
  const diff = CONCLAVE_TIMESTAMP - now;

  if (diff <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      isCompleted: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    isCompleted: false,
  };
}

export default function EventCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeValues>({
    days: "64",
    hours: "23",
    minutes: "03",
    seconds: "49",
    isCompleted: false,
  });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setHasMounted(true);
      // Initial dynamic calculation
      setTimeLeft(calculateTimeLeft());
    }, 0);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(mountTimer);
      clearInterval(timer);
    };
  }, []);

  const countdownUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <section
      aria-label="Conclave Introduction and Countdown"
      className="relative w-full bg-[#F5F1E8] text-[#112019] py-10 overflow-hidden transition-colors"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl lg:max-w-4xl mx-auto text-center flex flex-col items-center"
        >

          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="text-[11px] sm:text-xs font-sans font-semibold tracking-[0.28em] text-[#8C733E] uppercase select-none"
          >
            THE MOMENT IS NEAR
          </motion.span>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="font-editorial font-medium text-[#112019] text-[34px] sm:text-[46px] md:text-[54px] lg:text-[62px] leading-[1.02] tracking-tight mt-5 mb-6 text-balance"
          >
            History is being made and you need to be part of the moment.
          </motion.h2>

          {/* Supporting Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="font-sans font-normal text-[#26352D] text-base sm:text-lg md:text-[18px] leading-relaxed max-w-[700px] text-balance opacity-90"
          >
            Bharat&apos;s first Conscious Capital Conclave is almost here. Be part of
            it — don&apos;t miss your chance.
          </motion.p> 

          {/* Dress Code Guidelines Section - Conscious by Choice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto mt-10 sm:mt-14 rounded-2xl sm:rounded-3xl bg-white/85 border border-[#C59B4E]/30 overflow-hidden flex flex-col text-center"
          >
            {/* Top Banner: Image (Retains exact 1000x332 ratio across all screens) */}
            <div className="w-full bg-[#EAE3D2] flex justify-center">
              <Image
                src="/images/indian_attire.jpeg"
                alt="Conscious Fashion - Indian Traditional Attire"
                width={1000}
                height={332}
                className="w-full max-w-[1000px] h-auto object-contain"
              />
            </div>

            {/* Bottom Section: Content */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>

                {/* Headline */}
                <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-[#112019] tracking-tight mb-4">
                  Conscious by Choice
                </h3>

                {/* Narrative Lines */}
                <div className="space-y-2 text-[#26352D] font-sans text-sm sm:text-[15px] leading-relaxed mb-6">
                  <p className="font-medium text-[#112019]">
                    Every choice we make shapes the world we leave behind.
                  </p>
                  <p>
                    This EMERGE AURO, embrace conscious fashion and sustainable choices.
                  </p>
                  <p>
                    Choose natural fabrics, handlooms, upcycled creations and mindful wardrobes.
                  </p>
                  <p className="italic text-[#8C733E] font-medium pt-1">
                    Because conscious capitalism begins with conscious choices.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
