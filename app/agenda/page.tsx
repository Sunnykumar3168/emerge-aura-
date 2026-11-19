import { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import AgendaPageContent from "@/components/agenda/AgendaPageContent";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Event Agenda — EMERGE AURO 2026",
  description:
    "Explore the two-day schedule of Bharat's First Conscious Capital Conclave at Bharat Nivas, Auroville. Dec 5–6, 2026.",
  keywords: [
    "Agenda",
    "Schedule",
    "EMERGE AURO 2026",
    "Conscious Capital Conclave",
    "Auroville",
    "Bharat Nivas",
    "Startup Showcase",
    "Ananda Vikatan Awards",
    "Rhythmic Energy",
  ],
};

export default function AgendaPage() {
  return (
    <div className="relative min-h-screen bg-[#FAFAF8] text-[#17352B] overflow-x-hidden selection:bg-[#C89B3C]/30">
      <Navbar />
      <h1 className="sr-only">EMERGE AURO 2026 Event Agenda & Schedule</h1>
      <main>
        <AgendaPageContent />
      </main>
      {/* Standard Website Multi-Column Luxury Footer */}
      <Footer />
    </div>
  );
}
