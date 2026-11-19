"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function ConsciousChoice() {
  return (
    <section
      id="conscious-fashion"
      aria-label="Conscious by Choice — Sustainable Attire & Mindful Living"
      className="relative w-full bg-[#F7F2E8] pt-16 sm:pt-24 pb-8 sm:pb-12 overflow-hidden select-none"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-2xl sm:rounded-3xl bg-white border border-[#E7DEC8] hover:border-[#C59B4E]/60 shadow-[0_8px_32px_rgba(7,59,42,0.06)] overflow-hidden flex flex-col text-center transition-all duration-300"
        >
          {/* Top Banner: Attire Image */}
          <div className="w-full bg-[#EAE3D2] flex justify-center">
            <Image
              src="/images/indian_attire.jpeg"
              alt="Conscious Fashion - Indian Traditional Attire"
              width={1000}
              height={332}
              priority
              className="w-full max-w-[1000px] h-auto object-contain"
            />
          </div>

          {/* Bottom Section: Content */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Headline */}
              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-[#112019] tracking-tight mb-4">
                Conscious by Choice
              </h3>

              {/* Narrative Lines */}
              <div className="space-y-2 text-[#26352D] font-sans text-sm sm:text-[15px] leading-relaxed">
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
      </div>
    </section>
  );
}
