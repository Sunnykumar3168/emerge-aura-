import { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import HelpPageContent from "@/components/sections/HelpPageContent";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Help & Travel Desk | EMERGE AURO",
  description:
    "Get assistance with travel coordination, hotel accommodation, and general inquiries for EMERGE AURO.",
  keywords: [
    "Help",
    "Travel Desk",
    "Hotels",
    "Accommodation",
    "Contact",
    "Emerge Auro",
    "Auroville",
    "Puducherry",
  ],
};

export default function HelpPage() {
  return (
    <div className="relative min-h-screen bg-[#F7F2E8] text-[#17352B] overflow-x-hidden selection:bg-[#C89B3C]/30">
      <Navbar />
      <main id="main-content">
        <HelpPageContent />
      </main>
      <Footer />
    </div>
  );
}
