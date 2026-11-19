import { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import SpeakersDirectory from "@/components/sections/SpeakersDirectory";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Our Speakers — EMERGE AURO 2026",
  description:
    "Meet the distinguished speakers, visionaries, conscious leaders, and change-makers converging at EMERGE AURO 2026 in Puducherry and Auroville.",
  keywords: [
    "Speakers",
    "EMERGE AURO",
    "Conscious Capital Conclave",
    "Auroville",
    "Puducherry",
    "Leaders",
    "Visionaries",
  ],
};

export default function SpeakersPage() {
  return (
    <div className="relative min-h-screen bg-[#F4F0E6] text-[#10251D] overflow-x-hidden selection:bg-[#C89B3C]/30">
      <Navbar />
      <h1 className="sr-only">EMERGE AURO 2026 Speakers Directory</h1>
      <main>
        <SpeakersDirectory />
      </main>
      <Footer />
    </div>
  );
}
