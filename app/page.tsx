import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import EventCountdown from "@/components/sections/EventCountdown";
import StakeholderSection from "@/components/sections/StakeholderSection";
import AboutEmerge from "@/components/sections/AboutEmerge";
import LeadersSection from "@/components/sections/LeadersSection";
import OrganizingTeam from "@/components/sections/OrganizingTeam";
import OrganizersSection from "@/components/sections/OrganizersSection";
import VenueSection from "@/components/sections/VenueSection";
import VideoSection from "@/components/sections/VideoSection";
import ConclaveJourney from "@/components/sections/ConclaveJourney";
import RhythmBandSection from "@/components/sections/RhythmBandSection";
import SpeakersSection from "@/components/sections/SpeakersSection";
import HowToParticipate from "@/components/sections/HowToParticipate";
import ImmersionSection from "@/components/sections/ImmersionSection";
import ConsciousChoice from "@/components/sections/ConsciousChoice";
import SustainabilitySection from "@/components/sections/SustainabilitySection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050e0b] text-[#f4efe6] overflow-x-hidden selection:bg-[#e3b873]/30">
      {/* Floating & Sticky Luxury Navigation */}
      <Navbar />

      {/* Main Content: Hero Carousel -> Event Countdown -> Stakeholders -> About -> Agenda Journey -> Speakers -> How to Participate -> Sponsors */}
      <main id="main-content">
        <Hero />
        <EventCountdown />
        <StakeholderSection />
        <AboutEmerge />
        <ConclaveJourney />
        <RhythmBandSection />
        <SpeakersSection />
        <HowToParticipate />
        <ImmersionSection />
        <ConsciousChoice />
        <SustainabilitySection />
        <SponsorsSection />
        <LeadersSection />
        <OrganizingTeam />
        <OrganizersSection />
        <VenueSection />
        <VideoSection />
      </main>

      {/* Standard Multi-Column Luxury Footer */}
      <Footer />
    </div>
  );
}
