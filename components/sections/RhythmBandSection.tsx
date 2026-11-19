"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  Music,
  Calendar,
  Clock,
  Mic2,
  Flame,
  Volume2,
  VolumeX,
  Sparkles,
  Radio,
} from "lucide-react";

export default function RhythmBandSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  // Framer Motion viewport trigger
  const isInView = useInView(sectionRef, {
    amount: 0.25,
    once: false,
  });

  // Intersection Observer for controlling YouTube video playback (auto-play when visible, auto-pause when scrolled away)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const iframe = iframeRef.current;
          if (!iframe || !iframe.contentWindow) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            // Send command to resume / start playing
            iframe.contentWindow.postMessage(
              JSON.stringify({
                event: "command",
                func: "playVideo",
                args: "",
              }),
              "*"
            );
            setHasStarted(true);
          } else {
            // Send command to pause when scrolled away
            iframe.contentWindow.postMessage(
              JSON.stringify({
                event: "command",
                func: "pauseVideo",
                args: "",
              }),
              "*"
            );
          }
        });
      },
      {
        threshold: [0, 0.2, 0.5],
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Quick sound toggle helper
  const handleToggleSound = () => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    if (isMuted) {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "unMute",
          args: "",
        }),
        "*"
      );
      // Ensure volume is set up
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "setVolume",
          args: [100],
        }),
        "*"
      );
      setIsMuted(false);
    } else {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "mute",
          args: "",
        }),
        "*"
      );
      setIsMuted(true);
    }
  };

  const eventDetails = [
    {
      label: "Artist",
      value: "Rhythm Band",
      icon: Mic2,
      sub: "Live Musical Performance",
    },
    {
      label: "Performance",
      value: "Rhythmic Energy in Concert",
      icon: Flame,
      sub: "High-Energy Evening",
    },
    {
      label: "Date",
      value: "Saturday, 5 December 2026",
      icon: Calendar,
      sub: "Day 01 Special Event",
    },
    {
      label: "Time",
      value: "5:30 PM",
      icon: Clock,
      sub: "Conclave Main Stage",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="rhythm-band"
      className="relative w-full py-20 sm:py-28 lg:py-32 overflow-hidden bg-[#F5CB62] text-[#062B1F] transition-colors duration-700 select-none"
    >
      {/* Subtle ambient music waves and glowing accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─────────────────────────────────────────────────────────────
            1. SECTION HEADERS & INTRO
           ───────────────────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-white"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#062B1F]" />
            <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.2em] font-bold text-[#062B1F]">
              SPECIAL MUSICAL PERFORMANCE
            </span>
            <Radio className="w-3.5 h-3.5 text-[#062B1F] animate-pulse" />
          </motion.div>

          {/* Main Heading (No underline) */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#062B1F] leading-[1.12]"
          >
            FEEL THE RHYTHM. <br className="hidden sm:inline" />
            <span>EXPERIENCE THE ENERGY.</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-lg sm:text-xl font-bold text-[#111827] max-w-2xl mx-auto leading-relaxed"
          >
            An Evening of Music, Energy &amp; Celebration at EMERGE AURO 2026.
          </motion.p>

          {/* About Rhythm Band Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-sm sm:text-base text-[#111827]/90 font-medium max-w-2xl mx-auto leading-relaxed pt-2"
          >
            Get ready for an unforgettable musical experience with Rhythm Band at
            EMERGE AURO 2026. Bringing music, rhythm and vibrant live entertainment
            together, the performance promises an energetic evening filled with
            entertainment, connection and celebration.
          </motion.p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. EVENT DETAILS CARDS (Minimal visual elements & elegant typography)
           ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-10 sm:mt-14 max-w-5xl mx-auto"
        >
          {eventDetails.map((detail, idx) => {
            const Icon = detail.icon;
            return (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{
                  duration: 0.5,
                  delay: 0.35 + idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative bg-white rounded-2xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(6,43,31,0.08)] hover:shadow-[0_14px_40px_rgba(6,43,31,0.16)] transition-all duration-300 border border-white hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-[#F5CB62]/30 flex items-center justify-center text-[#062B1F] group-hover:bg-[#062B1F] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-[#111827]/75 font-semibold">
                      {detail.label}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#062B1F] leading-snug">
                      {detail.value}
                    </h3>
                    <p className="text-xs text-[#111827]/80 font-medium">
                      {detail.sub}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            3. YOUTUBE VIDEO – AUTOMATIC CONTINUOUS PLAYBACK SHOWCASE
               - 16:9 responsive aspect ratio
               - Autoplay with mute, loop with playlist ID
               - Intersection Observer auto-play/pause
               - Clean rounded borders and subtle shadow
               - Audio control toggle button
           ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.95, y: 30 }
          }
          transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 sm:mt-16 max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden bg-white p-2.5 sm:p-3.5 shadow-[0_20px_50px_rgba(6,43,31,0.22)] border-2 border-white/80">
            {/* 16:9 Aspect Ratio Container */}
            <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl lg:rounded-[24px] overflow-hidden bg-[#0A1A3A]">
              <iframe
                ref={iframeRef}
                className="w-full h-full object-cover"
                src="https://www.youtube.com/embed/luJ8RQZuF3k?autoplay=1&mute=1&loop=1&playlist=luJ8RQZuF3k&controls=1&rel=0&playsinline=1&enablejsapi=1"
                title="Rhythm Band Musical Concert - EMERGE AURO 2026"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

              {/* Sound Toggle Button (Floating in top-right corner) */}
              <button
                type="button"
                onClick={handleToggleSound}
                className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#062B1F]/90 hover:bg-[#062B1F] text-white text-xs font-semibold backdrop-blur-md shadow-lg border border-white/20 transition-all duration-200 cursor-pointer active:scale-95"
                aria-label={isMuted ? "Unmute concert video" : "Mute concert video"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-[#F5CB62]" />
                    <span className="hidden xs:inline">Click to Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#F5CB62] animate-pulse" />
                    <span className="hidden xs:inline">Sound Active</span>
                  </>
                )}
              </button>

              {/* Performance Tag Badge (Floating bottom-left) */}
              <div className="absolute bottom-4 left-4 z-20 hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#062B1F]/85 text-white text-xs font-medium backdrop-blur-md border border-white/20">
                <Music className="w-3.5 h-3.5 text-[#F5CB62]" />
                <span>Rhythm Band Live Experience</span>
              </div>
            </div>
          </div>

          {/* Bottom Audio/Playback Hint */}
          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-[#111827]/85 px-2">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#062B1F] animate-ping" />
              Continuous live playback automatically pauses when you scroll away.
            </span>
            <button
              onClick={handleToggleSound}
              className="text-[#062B1F] font-bold hover:underline cursor-pointer"
            >
              {isMuted ? "🔊 Tap to unmute audio" : "🔇 Tap to mute audio"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
