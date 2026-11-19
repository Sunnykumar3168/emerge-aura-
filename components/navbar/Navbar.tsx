"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import SignInModal from "@/components/ui/SignInModal";
import RegisterModal from "@/components/ui/RegisterModal";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/#verticals" },
  { label: "AGENDA", href: "/agenda" },
  { label: "IMMERSION", href: "/#immersion" },
  { label: "SUSTAINABILITY", href: "/#sustainability" },
  { label: "Enabler", href: "/sponsors" },
  { label: "HELP", href: "/help" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile drawer menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Close mobile drawer on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out py-3.5 sm:py-4 bg-[#F5F1E8] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C] rounded-sm py-0.5"
            aria-label="Emerge Auro Home"
          >
            <div className="relative w-[130px] h-[52px] sm:w-[155px] sm:h-[62px] lg:w-[170px] lg:h-[68px]">
              <Image
                src="/logo.webp"
                alt="EMERGE AURO"
                fill
                priority
                sizes="(max-width: 640px) 130px, (max-width: 1024px) 155px, 170px"
                className="object-contain object-left drop-shadow-sm select-none"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[12px] xl:text-[13px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 py-1 font-sans text-[#073B2A] hover:text-[#C89B3C]"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Primary CTA: REGISTER NOW */}
            <button
              type="button"
              onClick={() => setIsRegisterModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] sm:text-[13px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 shadow-md text-white bg-[#073B2A] hover:bg-[#063522] hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#073B2A] cursor-pointer"
            >
              <span>REGISTER NOW</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-[#073B2A]/20 bg-[#073B2A]/5 text-[#073B2A] hover:bg-[#073B2A]/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#073B2A]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#073B2A]" />
              ) : (
                <Menu className="w-5 h-5 text-[#073B2A]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 lg:hidden pt-24 pb-8 px-6 flex flex-col justify-between bg-[#F7F2E8] overflow-y-auto"
          >
            <div className="flex flex-col gap-4 mt-4">
              {navItems.map((item, index) => {
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium tracking-[0.14em] uppercase transition-colors block py-2 font-sans text-[#073B2A] hover:text-[#C89B3C]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="space-y-4 pt-6 pb-2 border-t border-[#073B2A]/15 mt-6">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsRegisterModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-semibold tracking-[0.16em] uppercase shadow-md transition-all text-white bg-[#073B2A] hover:bg-[#063522] cursor-pointer"
              >
                <span>REGISTER NOW</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign In Modal */}
      <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />

      {/* Registration Choice Modal */}
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </>
  );
}
