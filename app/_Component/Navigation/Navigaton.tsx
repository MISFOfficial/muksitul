"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Briefcase,
  Zap,
  Award,
  HelpCircle,
  Mail,
  FileText,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";
import logo from "@/public/muksitul-logo-2.png";
import { useRouter, usePathname } from "next/navigation";

export default function Navigaton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", id: "hero", icon: <Home size={20} /> },
    {
      name: "Projects",
      id: "projects",
      icon: <Briefcase size={20} />,
      subLinks: [
        { name: "Engineering", id: "projects" },
        { name: "Design", id: "designs" },
        { name: "CMS", id: "cms-projects" },
      ],
    },
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
        className={`fixed hidden lg:block top-0 py-4 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-black/60 backdrop-blur-xl " : "bg-transparent "
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
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() =>
                  link.subLinks && setIsProjectsDropdownOpen(true)
                }
                onMouseLeave={() =>
                  link.subLinks && setIsProjectsDropdownOpen(false)
                }
              >
                <button
                  onClick={() =>
                    !link.subLinks && handleNavClick(link.id, link.href)
                  }
                  className={`px-5 py-2.5 text-xs cursor-pointer font-black uppercase tracking-widest transition-all primary-rounded hover:scale-105 flex items-center gap-1 ${link.name === "Resume"
                    ? "primary-color2  mx-4"
                    : "primary-text3 text-hover"
                    }`}
                >
                  {link.name}
                  {link.subLinks && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isProjectsDropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                  )}
                </button>

                {/* Desktop Dropdown */}
                {link.subLinks && (
                  <AnimatePresence>
                    {isProjectsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 z-50"
                      >
                        <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl p-2">
                          {link.subLinks.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => {
                                handleNavClick(sub.id);
                                setIsProjectsDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest primary-text4 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Tab Navigation - Mobile Only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-3xl border-t border-white/5 pb-[env(safe-area-inset-bottom)]">
        {/* Sub Links Menu (Projects) */}
        <AnimatePresence>
          {isProjectsDropdownOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsProjectsDropdownOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full left-4 right-4 mb-4 bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="p-1 grid grid-cols-1">
                  <div className="px-6 py-3 border-b border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                      Project Categories
                    </span>
                  </div>
                  {navLinks
                    .find((l) => l.name === "Projects")
                    ?.subLinks?.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          handleNavClick(sub.id);
                          setIsProjectsDropdownOpen(false);
                        }}
                        className="flex items-center gap-4 px-6 py-4 hover:primary-text4 transition-colors text-left border-b border-white/5 last:border-none"
                      >
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                          {sub.name}
                        </span>
                      </button>
                    ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* More Menu content */}
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full left-4 right-4 mb-4 bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="p-1 grid grid-cols-1">
                  {moreLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link.id, link.href)}
                      className="flex items-center gap-4 px-6 py-4 hover:primary-text4 transition-colors text-left border-b border-white/5 last:border-none"
                    >
                      <div className="primary-text">{link.icon}</div>
                      <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                        {link.name}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-around py-3 px-2 max-w-md mx-auto">
          {visibleLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                if (link.subLinks) {
                  setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
                  setIsMenuOpen(false);
                } else {
                  handleNavClick(link.id, link.href);
                }
              }}
              className={`flex flex-col items-center gap-1.5 w-full transition-colors ${(link.subLinks && isProjectsDropdownOpen) ||
                (!link.subLinks && pathname === link.href)
                ? "primary-text"
                : "text-white/40 hover:primary-text"
                }`}
            >
              <div className="relative flex items-center justify-center p-1.5 rounded-xl transition-all group-hover:bg-white/5">
                <div className="relative">
                  {link.icon}
                  {link.subLinks && (
                    <div className="absolute -right-1.5 -bottom-0.5 primary-color rounded-full p-0.5 shadow-sm">
                      <ChevronDown
                        size={8}
                        className={`text-white transition-transform duration-300 ${isProjectsDropdownOpen ? "rotate-180" : ""
                          }`}
                      />
                    </div>
                  )}
                </div>
              </div>
              <span className="text-[10px] font-black uppercase">
                {link.name}
              </span>
            </button>
          ))}

          {/* More Trigger */}
          <button
            onClick={() => {
              toggleMenu();
              setIsProjectsDropdownOpen(false);
            }}
            className={`flex flex-col items-center gap-1 w-full transition-colors ${isMenuOpen ? "primary-text" : "text-white/40"
              }`}
          >
            <MoreHorizontal size={20} />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
