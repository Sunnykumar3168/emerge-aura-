"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  UserCheck,
  Sparkles,
  Store,
  Users2,
  Presentation,
  Music,
  Utensils,
  Landmark,
  Trophy,
  Briefcase,
  Sprout,
  Medal,
  Flag,
  Calendar,
  MapPin,
  Clock,
  Download,
  Ticket,
  ChevronRight,
  Sparkle,
} from "lucide-react";
import {
  agendaScheduleData,
  AgendaSession,
} from "@/data/agendaSchedule";

// Map icon strings to minimal line icons
function renderSessionIcon(iconName: AgendaSession["iconName"], className = "w-5 h-5") {
  switch (iconName) {
    case "UserCheck":
      return <UserCheck className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Store":
      return <Store className={className} />;
    case "Users2":
      return <Users2 className={className} />;
    case "Presentation":
      return <Presentation className={className} />;
    case "Music":
      return <Music className={className} />;
    case "Utensils":
      return <Utensils className={className} />;
    case "Landmark":
      return <Landmark className={className} />;
    case "Trophy":
      return <Trophy className={className} />;
    case "Briefcase":
      return <Briefcase className={className} />;
    case "Sprout":
      return <Sprout className={className} />;
    case "Medal":
      return <Medal className={className} />;
    case "Flag":
      return <Flag className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export default function AgendaPageContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [activeDayId, setActiveDayId] = useState<string>("day-1");

  // GSAP ScrollTrigger setup for sequential, individual card & line transitions
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Day 1 & Day 2 active switcher detection
      ScrollTrigger.create({
        trigger: "#day-2",
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setActiveDayId("day-2"),
        onLeaveBack: () => setActiveDayId("day-1"),
      });

      // 2. Sequential Event Card Animation
      // Every event activates individually when the line reaches its dot at 48% viewport height.
      // Exactly ONE event card is active at a time.
      const allSessions: AgendaSession[] = [];
      agendaScheduleData.forEach((day) => {
        day.sessions.forEach((s) => allSessions.push(s));
      });

      allSessions.forEach((session, index) => {
        const cardEl = document.getElementById(`card-${session.id}`);
        if (!cardEl) return;

        ScrollTrigger.create({
          trigger: cardEl,
          start: "top 52%",
          end: "bottom 52%",
          onEnter: () => {
            setActiveSessionId(session.id);
          },
          onEnterBack: () => {
            setActiveSessionId(session.id);
          },
          onLeave: () => {
            // When leaving the last session going down
            if (index === allSessions.length - 1) {
              setActiveSessionId(null);
            }
          },
          onLeaveBack: () => {
            // When scrolling up past the very first session
            if (index === 0) {
              setActiveSessionId(null);
            } else {
              setActiveSessionId(allSessions[index - 1].id);
            }
          },
        });
      });

      // 3. Line progress scrub animation between dots
      agendaScheduleData.forEach((day) => {
        day.sessions.forEach((session, sIdx) => {
          const nextSession = day.sessions[sIdx + 1];
          if (!nextSession) return;

          const lineFillEl = document.getElementById(`line-fill-${session.id}`);
          const currentCard = document.getElementById(`card-${session.id}`);
          const nextCard = document.getElementById(`card-${nextSession.id}`);

          if (lineFillEl && currentCard && nextCard) {
            gsap.fromTo(
              lineFillEl,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: currentCard,
                  start: "top 52%",
                  endTrigger: nextCard,
                  end: "top 52%",
                  scrub: true,
                },
              }
            );
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToDay = (dayId: string) => {
    setActiveDayId(dayId);
    const el = document.getElementById(dayId);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#FAFAF8] text-[#17352B]">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO BANNER – NEW VISUAL (Auroville Green Landscape)
          - No Matrimandir image.
          - High-quality Auroville green landscape photograph.
          - Sophisticated dark green overlay.
          - EMERGE AURO 2026 logo.
          - Heading: EVENT AGENDA.
          - Supporting text: India's First Conscious Capital Conclave.
          - December 5–7, 2026 and Auroville metadata.
         ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center justify-center overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background Image: Auroville Green Landscape */}
        <div className="absolute inset-0">
          <Image
            src="/images/agenda/auroville-landscape.jpg"
            alt="Auroville Landscape — EMERGE AURO 2026 Event Agenda"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Sophisticated Dark Green Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#062B1F]/90 via-[#073B2A]/85 to-[#062B1F]/95 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* EMERGE AURO 2026 Logo Badge */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm">
            <Image
              src="/logo.webp"
              alt="EMERGE AURO Logo"
              width={26}
              height={26}
              className="object-contain"
            />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F5CB62] font-semibold">
              EMERGE AURO 2026
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-2">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white uppercase">
              EVENT <span className="text-[#F5CB62] italic font-serif">AGENDA</span>
            </h1>
            <p className="font-serif italic text-lg sm:text-xl lg:text-2xl text-white/90">
              India&apos;s First Conscious Capital Conclave
            </p>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs sm:text-sm font-medium text-white">
              <Calendar className="w-4 h-4 text-[#F5CB62]" />
              <span>December 5–7, 2026</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs sm:text-sm font-medium text-white">
              <MapPin className="w-4 h-4 text-[#F5CB62]" />
              <span>Bharat Nivas, Auroville</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. AGENDA SECTION – SEQUENTIAL TIMELINE & WHITE CARDS
          - Day 1 and Day 2 displayed vertically, one after another.
          - 7 exact brand colors: #ED1C24, #F7941D, #FFDE17, #8DC63F, #008BD2, #662D91, #EC008C
          - NO neon glows, NO shining lines, NO blurred shadows.
          - Only ONE card highlighted at a time.
          - Previous card smoothly returns to pure white.
         ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sticky Day Switcher Bar */}
        <div className="sticky top-20 sm:top-24 z-30 mb-12 sm:mb-16 bg-[#FAFAF8]/95 backdrop-blur-md py-3 border border-[#073B2A]/10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-[14px] px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#073B2A]/70 font-semibold">
            <Clock className="w-4 h-4 text-[#073B2A]" />
            <span className="hidden sm:inline">Timeline:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToDay("day-1")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                activeDayId === "day-1"
                  ? "bg-[#F7941D] text-white shadow-sm"
                  : "bg-white text-[#17352B]/75 hover:bg-[#073B2A]/5 border border-[#073B2A]/10"
              }`}
            >
              Day 01 · 5 Dec
            </button>
            <button
              type="button"
              onClick={() => scrollToDay("day-2")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                activeDayId === "day-2"
                  ? "bg-[#008BD2] text-white shadow-sm"
                  : "bg-white text-[#17352B]/75 hover:bg-[#073B2A]/5 border border-[#073B2A]/10"
              }`}
            >
              Day 02 · 6 Dec
            </button>
          </div>

          <Link
            href="/#participate"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#073B2A] hover:text-[#C89B3C] transition-colors"
          >
            <span>Book Passes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Days Displayed Vertically One After Another */}
        <div className="space-y-20 sm:space-y-28">
          {agendaScheduleData.map((day) => (
            <div
              key={day.dayId}
              id={day.dayId}
              className="scroll-mt-28 sm:scroll-mt-32 relative"
            >
              {/* Day Header Block */}
              <div className="mb-8 sm:mb-12">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`inline-flex items-center justify-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wider text-white uppercase shadow-sm bg-gradient-to-r ${day.dayPillColor}`}
                  >
                    {day.dayBadge}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#073B2A]/60 font-semibold">
                    {day.tag}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#073B2A] font-medium tracking-tight">
                  {day.weekday},{" "}
                  <span className="font-normal italic text-[#C89B3C]">
                    {day.date}
                  </span>
                </h2>
                <div className="h-[1px] w-full bg-[#073B2A]/15 mt-3" />
              </div>

              {/* Timeline Container */}
              <div className="relative pl-7 sm:pl-10">
                {/* Base neutral guide track */}
                <div className="absolute left-[13px] sm:left-[17px] top-6 bottom-6 w-[2px] bg-gray-200" />

                {/* Sessions List */}
                <div className="space-y-5 sm:space-y-6">
                  {day.sessions.map((session, sIdx) => {
                    const nextSession = day.sessions[sIdx + 1];
                    const isLast = sIdx === day.sessions.length - 1;
                    const isActive = activeSessionId === session.id;

                    return (
                      <div
                        key={session.id}
                        id={`session-${session.id}`}
                        className="relative"
                      >
                        {/* ── Left Timeline: Connecting Segment Line (Solid color transition, NO glow) ── */}
                        {!isLast && nextSession && (
                          <div
                            className="absolute left-[-20px] sm:left-[-24px] top-[22px] bottom-[-26px] w-[2px] overflow-hidden"
                          >
                            {/* Progressive Color Fill Track */}
                            <div
                              id={`line-fill-${session.id}`}
                              className="w-full h-full origin-top"
                              style={{
                                background: `linear-gradient(to bottom, ${session.dotColor}, ${nextSession.dotColor})`,
                                transform: "scaleY(0)",
                              }}
                            />
                          </div>
                        )}

                        {/* ── Circular Dot (Solid brand color, small white core, ZERO blur/glow) ── */}
                        <div
                          id={`dot-${session.id}`}
                          className="absolute left-[-26px] sm:left-[-30px] top-[14px] z-10 w-[14px] h-[14px] rounded-full flex items-center justify-center transition-all duration-300"
                          style={{
                            backgroundColor: session.dotColor,
                            boxShadow: "none",
                          }}
                        >
                          {/* Clean minimal inner white dot */}
                          <div className="w-[5px] h-[5px] rounded-full bg-white" />
                        </div>

                        {/* ── Event Card (White, 14px radius, subtle shadow, individual gradient on active) ── */}
                        <div
                          id={`card-${session.id}`}
                          className="relative rounded-[14px] p-4 sm:p-5 transition-all duration-300 border shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
                          style={{
                            backgroundColor: isActive ? "#FFFFFF" : "#FFFFFF",
                            backgroundImage: isActive
                              ? `linear-gradient(135deg, ${session.dotColor}14 0%, ${session.dotColor}04 35%, #FFFFFF 70%)`
                              : "none",
                            borderColor: isActive
                              ? `${session.dotColor}60`
                              : "rgba(0, 0, 0, 0.08)",
                          }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                            {/* Left Content: Time Pill + Line Icon + Title & Description */}
                            <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1">
                              {/* Time in separate small rounded container */}
                              <div
                                className="shrink-0 px-3 py-1 rounded-[10px] font-mono text-xs sm:text-sm font-semibold transition-colors duration-300"
                                style={{
                                  backgroundColor: isActive
                                    ? `${session.dotColor}15`
                                    : "#F4F1EA",
                                  color: isActive
                                    ? session.dotColor
                                    : "#073B2A",
                                  border: `1px solid ${
                                    isActive ? `${session.dotColor}40` : "transparent"
                                  }`,
                                }}
                              >
                                {session.time}
                              </div>

                              {/* Minimal Line Icon */}
                              <div
                                className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] flex items-center justify-center transition-colors duration-300"
                                style={{
                                  backgroundColor: isActive
                                    ? `${session.dotColor}15`
                                    : "#F9F8F5",
                                  color: isActive
                                    ? session.dotColor
                                    : "#073B2A",
                                  border: `1px solid ${
                                    isActive
                                      ? `${session.dotColor}35`
                                      : "rgba(0, 0, 0, 0.06)"
                                  }`,
                                }}
                              >
                                {renderSessionIcon(session.iconName, "w-4 h-4 sm:w-5 sm:h-5")}
                              </div>

                              {/* Dark Green Event Title & Grey Supporting Description */}
                              <div className="space-y-0.5">
                                <h3 className="font-sans text-sm sm:text-base font-bold text-[#073B2A] tracking-tight leading-snug">
                                  {session.title}
                                </h3>
                                <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                                  {session.subtitle}
                                </p>
                              </div>
                            </div>

                            {/* Right Status Badge */}
                            <div className="shrink-0 self-end sm:self-center">
                              {isActive ? (
                                <span
                                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase"
                                  style={{
                                    backgroundColor: `${session.dotColor}15`,
                                    color: session.dotColor,
                                    border: `1px solid ${session.dotColor}40`,
                                  }}
                                >
                                  <span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                      backgroundColor: session.dotColor,
                                    }}
                                  />
                                  Active Session
                                </span>
                              ) : (
                                <span className="text-[11px] text-gray-400 font-mono hidden sm:inline">
                                  EMERGE 2026
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. FUNCTIONAL ACTION BANNER (Brochure & Pass Booking)
           ───────────────────────────────────────────────────────────── */}
        <div className="mt-16 sm:mt-24 p-6 sm:p-8 rounded-[14px] bg-[#062B1F] text-white shadow-md border border-[#062B1F]/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-[#F5CB62]">
                <Sparkle className="w-3.5 h-3.5 text-[#F5CB62]" />
                <span>In association with Auroville Foundation</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                Join Us at Bharat Nivas, Auroville
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-lg">
                Explore the complete schedule and plan your sessions across both conclave days. *Programme subject to change.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/EMERGE AURO BROCHURE.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-colors duration-200"
              >
                <Download className="w-4 h-4 text-[#F5CB62]" />
                <span>Download Brochure</span>
              </a>
              <Link
                href="/#participate"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#C89B3C] hover:bg-[#d8a845] text-[#062B1F] text-xs sm:text-sm font-bold shadow-sm transition-colors duration-200"
              >
                <Ticket className="w-4 h-4 text-[#062B1F]" />
                <span>Book Passes</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
