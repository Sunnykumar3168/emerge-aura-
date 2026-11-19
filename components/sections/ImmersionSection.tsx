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

// Logo-derived light gradient color themes on hover
interface CardColorTheme {
  gradientHover: string;
  borderHover: string;
  iconBgHover: string;
  tagHover: string;
  titleHover: string;
}

const colorThemes: CardColorTheme[] = [
  // 0: Workshops (Creative - Magenta/Pink from logo #E7256B / #B11B87)
  {
    gradientHover: "hover:bg-gradient-to-br hover:from-white hover:via-[#FFF0F6] hover:to-[#FCE4EC]",
    borderHover: "hover:border-[#E7256B]/40 hover:shadow-[0_16px_40px_rgba(231,37,107,0.15)]",
    iconBgHover: "group-hover:bg-[#E7256B] group-hover:text-white group-hover:border-[#E7256B]",
    tagHover: "group-hover:bg-[#E7256B]/12 group-hover:text-[#B11B87] group-hover:border-[#E7256B]/30",
    titleHover: "group-hover:text-[#B11B87]",
  },
  // 1: Nature walks (Eco - Fresh Green from logo #028343)
  {
    gradientHover: "hover:bg-gradient-to-br hover:from-white hover:via-[#F0FDF4] hover:to-[#DCFCE7]",
    borderHover: "hover:border-[#028343]/40 hover:shadow-[0_16px_40px_rgba(2,131,67,0.15)]",
    iconBgHover: "group-hover:bg-[#028343] group-hover:text-white group-hover:border-[#028343]",
    tagHover: "group-hover:bg-[#028343]/12 group-hover:text-[#028343] group-hover:border-[#028343]/30",
    titleHover: "group-hover:text-[#028343]",
  },
  // 2: Meditation (Mindfulness - Ocean Blue from logo #0166BE)
  {
    gradientHover: "hover:bg-gradient-to-br hover:from-white hover:via-[#F0F9FF] hover:to-[#E0F2FE]",
    borderHover: "hover:border-[#0166BE]/40 hover:shadow-[0_16px_40px_rgba(1,102,190,0.15)]",
    iconBgHover: "group-hover:bg-[#0166BE] group-hover:text-white group-hover:border-[#0166BE]",
    tagHover: "group-hover:bg-[#0166BE]/12 group-hover:text-[#0166BE] group-hover:border-[#0166BE]/30",
    titleHover: "group-hover:text-[#0166BE]",
  },
  // 3: Auro tour (Heritage - Royal Purple/Violet from logo #652890)
  {
    gradientHover: "hover:bg-gradient-to-br hover:from-white hover:via-[#FAF5FF] hover:to-[#F3E8FF]",
    borderHover: "hover:border-[#652890]/40 hover:shadow-[0_16px_40px_rgba(101,40,144,0.15)]",
    iconBgHover: "group-hover:bg-[#652890] group-hover:text-white group-hover:border-[#652890]",
    tagHover: "group-hover:bg-[#652890]/12 group-hover:text-[#652890] group-hover:border-[#652890]/30",
    titleHover: "group-hover:text-[#652890]",
  },
  // 4: Yoga (Wellness - Saffron Gold from logo #E77F26)
  {
    gradientHover: "hover:bg-gradient-to-br hover:from-white hover:via-[#FFF7ED] hover:to-[#FFEDD5]",
    borderHover: "hover:border-[#E77F26]/40 hover:shadow-[0_16px_40px_rgba(231,127,38,0.15)]",
    iconBgHover: "group-hover:bg-[#E77F26] group-hover:text-white group-hover:border-[#E77F26]",
    tagHover: "group-hover:bg-[#E77F26]/12 group-hover:text-[#E77F26] group-hover:border-[#E77F26]/30",
    titleHover: "group-hover:text-[#E77F26]",
  },
];

function ImmersionCard({
  experience,
  index,
}: {
  experience: ImmersionExperience;
  index: number;
}) {
  const Icon = iconMap[experience.iconName] || Leaf;
  const theme = colorThemes[index % colorThemes.length];

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
      className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-[24px] bg-white border border-[#063522]/10 transition-all duration-400 shadow-[0_8px_30px_rgba(6,53,34,0.06)] hover:-translate-y-1.5 cursor-pointer ${theme.gradientHover} ${theme.borderHover}`}
    >
      {/* Top row: Icon and index tag */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div
            className={`w-12 h-12 rounded-2xl bg-[#063522]/5 border border-[#063522]/10 flex items-center justify-center text-[#063522] group-hover:scale-110 transition-all duration-300 ${theme.iconBgHover}`}
          >
            <Icon className="w-6 h-6 stroke-[1.75]" />
          </div>
          <span
            className={`text-[10.5px] font-sans font-bold tracking-[0.2em] text-[#063522]/80 uppercase bg-[#063522]/5 px-3 py-1 rounded-full border border-[#063522]/15 transition-all duration-300 ${theme.tagHover}`}
          >
            {experience.tag}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-editorial text-[26px] sm:text-[30px] font-medium text-[#10251D] leading-tight mb-3 transition-colors duration-300 ${theme.titleHover}`}
        >
          {experience.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-[15px] sm:text-[16px] text-[#42544A] font-normal leading-relaxed">
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
      className="relative w-full bg-[#F5CB62] text-[#063522] py-20 sm:py-28 lg:py-36 overflow-hidden select-none"
    >
      {/* Background radial gradient & subtle texture matching #F5CB62 theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#F6D378] via-[#F5CB62] to-[#E3B84A] z-0" />
      <div
        className="absolute inset-0 z-0 opacity-[0.05] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute -bottom-24 left-10 w-[450px] h-[450px] bg-[#D4A33B]/30 rounded-full blur-[120px] pointer-events-none z-0" />

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
            <span className="text-[11px] sm:text-[12px] font-sans font-bold tracking-[0.28em] text-[#6B4A16] uppercase">
              {eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-editorial text-[44px] sm:text-[62px] lg:text-[76px] font-medium leading-[0.98] tracking-tight text-[#063522] mb-5">
            {heading}
          </h2>

          {/* Subheading */}
          <p className="font-sans text-[16px] sm:text-[19px] text-[#063522]/80 font-normal leading-relaxed max-w-[620px] mx-auto">
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
