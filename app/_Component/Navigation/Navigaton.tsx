"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Home,
  Briefcase,
  Zap,
  Award,
  HelpCircle,
  Mail,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import logo from "@/public/muksitul-logo-2.png";
import { useRouter, usePathname } from "next/navigation";

export default function Navigaton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", id: "hero", icon: <Home size={20} /> },
    { name: "Projects", id: "projects", icon: <Briefcase size={20} /> },
    { name: "Services", id: "services", icon: <Zap size={20} /> },
    {
      name: "Certificates",
      id: "certificates-list",
      href: "/certificates",
      icon: <Award size={20} />,
    },
    { name: "Faq", id: "faq", icon: <HelpCircle size={20} /> },
    { name: "Contact", id: "contact", icon: <Mail size={20} /> },
    {
      name: "Resume",
      id: "resume",
      href: "/resume",
      icon: <FileText size={20} />,
    },
  ];

  // Mobile Bottom Bar configuration
  const visibleLinks = navLinks.slice(0, 4);
  const moreLinks = navLinks.slice(4);

  const handleNavClick = (id: string, href?: string) => {
    if (href) {
      router.push(href);
      closeMenu();
      return;
    }
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    const scrollBlock = id === "hero" && isMobile ? "start" : "center";

    if (pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: scrollBlock as ScrollLogicalPosition,
        });
      }
    }
    closeMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const isMobile = window.innerWidth < 1024;
          const scrollBlock = id === "hero" && isMobile ? "start" : "center";
          element.scrollIntoView({
            behavior: "smooth",
            block: scrollBlock as ScrollLogicalPosition,
          });
        }, 400);
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Top Nav - Desktop Only */}
      <nav
        className={`fixed hidden lg:block top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="ratio flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavClick("hero")}
              className="hover:scale-105 transition-transform"
            >
              <Image
                src={logo}
                alt="Profile"
                width={80}
                height={80}
                className="w-14"
              />
            </button>
          </div>

          <div className="flex gap-2 items-center">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.id, link.href)}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all primary-rounded hover:scale-105 ${
                  link.name === "Resume"
                    ? "bg-[#FF0055] text-white shadow-[0_0_20px_rgba(255,0,85,0.3)] mx-4"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Top Header (Logo only) */}
      {/* <div className="lg:hidden fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between bg-black/40 backdrop-blur-lg border-b border-white/5">
        <Image src={logo} alt="Logo" width={40} height={40} className="w-10" />
        <button
          onClick={() => handleNavClick("contact")}
          className="bg-[#FF0055] text-white p-2 rounded-full shadow-lg"
        >
          <Mail size={18} />
        </button>
      </div> */}

      {/* Bottom Tab Navigation - Mobile Only */}
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
        <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {visibleLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.id, link.href)}
              className="flex flex-col items-center justify-center gap-1 w-full py-2 group"
            >
              <div className="p-2 rounded-2xl group-active:bg-white/10 transition-colors text-white/50 group-hover:text-[#FF0055]">
                {link.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter text-white/40 group-hover:text-white">
                {link.name}
              </span>
            </button>
          ))}

          {/* More Menu Trigger */}
          <button
            onClick={toggleMenu}
            className="flex flex-col items-center justify-center gap-1 w-full py-2 group"
          >
            <div
              className={`p-2 rounded-2xl transition-colors ${isMenuOpen ? "text-[#FF0055] bg-white/5" : "text-white/40"}`}
            >
              <MoreHorizontal size={22} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter text-white/40">
              More
            </span>
          </button>
        </div>

        {/* More Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10"
              />
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="absolute bottom-20 left-0 right-0 bg-neutral-900/90 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="p-2 grid grid-cols-1 gap-1">
                  {moreLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link.id, link.href)}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors text-left"
                    >
                      <div className="text-[#FF0055] opacity-80">
                        {link.icon}
                      </div>
                      <span className="text-sm font-black uppercase tracking-widest text-white/80">
                        {link.name}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
