"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Zap,
  Briefcase,
  FolderDot,
  Palette,
  Layers,
  FileText,
  User,
  HelpCircle,
  Shield,
  Menu,
  X,
  Plus,
  Search,
  Bell,
  Settings,
  MoreHorizontal,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin/306160" },
  { name: "Skills", icon: Zap, href: "/admin/306160/skills" },
  { name: "Experience", icon: Briefcase, href: "/admin/306160/experience" },
  { name: "Projects", icon: FolderDot, href: "/admin/306160/projects" },
  { name: "Design", icon: Palette, href: "/admin/306160/design" },
  { name: "Certificates", icon: Award, href: "/admin/306160/certificates" },
  { name: "CMH", icon: Layers, href: "/admin/306160/cmh" },
  { name: "Resume", icon: FileText, href: "/admin/306160/resume" },
  { name: "Bio", icon: User, href: "/admin/306160/bio" },
  { name: "FAQ", icon: HelpCircle, href: "/admin/306160/faq" },
  { name: "Role", icon: Shield, href: "/admin/306160/role" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Find active link or default to first one
  const activeLink =
    sidebarLinks.find((link) => link.href === pathname) || sidebarLinks[0];

  const visibleLinks = sidebarLinks.slice(0, 4);
  const moreLinks = sidebarLinks.slice(4);

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col lg:flex-row font-outfit relative">
      {/* Sidebar - Desktop Only */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 border-r border-white/20 hidden lg:flex flex-col sticky top-0 h-screen z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-xl font-bold primary-text"
              >
                Admin
              </motion.h1>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-2 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group border ${
                pathname === link.href
                  ? "border-[#0abab5]/50 bg-[#0abab5]/5 text-[#0abab5]"
                  : "text-white/60 border-transparent hover:border-white/10 hover:text-white"
              }`}
            >
              <link.icon
                size={22}
                className={
                  pathname === link.href
                    ? "text-[#0abab5]"
                    : "text-white/60 group-hover:text-white"
                }
              />
              {isSidebarOpen && (
                <span className="font-medium whitespace-nowrap">
                  {link.name}
                </span>
              )}
              {pathname === link.href && isSidebarOpen && (
                <motion.div
                  layoutId="activeTab"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0abab5]"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/20">
          <div
            className={`flex items-center gap-3 ${isSidebarOpen ? "px-2" : "justify-center"}`}
          >
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-bold text-white">
              J
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Jahin</p>
                <p className="text-xs text-white/50 truncate">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1  p-10">{children}</div>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-3xl border-t border-white/5 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-3 px-2 max-w-md mx-auto">
          {visibleLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMoreMenuOpen(false)}
              className={`flex flex-col items-center gap-1.5 w-full transition-colors ${
                pathname === link.href
                  ? "text-[#0abab5]"
                  : "text-white/40 hover:text-white"
              }`}
            >
              <div
                className={`relative flex items-center justify-center p-2 rounded-full transition-all ${
                  pathname === link.href
                    ? "bg-white/10 ring-1 ring-white/20"
                    : "hover:bg-white/5"
                }`}
              >
                <link.icon size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] leading-none">
                {link.name}
              </span>
            </Link>
          ))}
          <button
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            className={`flex flex-col items-center gap-1.5 w-full transition-colors ${
              isMoreMenuOpen ? "text-[#0abab5]" : "text-white/40"
            }`}
          >
            <div
              className={`relative flex items-center justify-center p-2 rounded-full transition-all ${
                isMoreMenuOpen
                  ? "bg-white/10 ring-1 ring-white/20"
                  : "hover:bg-white/5"
              }`}
            >
              <MoreHorizontal size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] leading-none">
              More
            </span>
          </button>
        </div>
      </nav>

      {/* More Menu Overlay */}
      <AnimatePresence>
        {isMoreMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoreMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-[calc(100%+8px)] left-4 right-4 mb-4 z-[60] bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl lg:hidden"
            >
              <div className="p-1 grid grid-cols-1">
                <div className="px-6 py-3 border-b border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                    Administration Modules
                  </span>
                </div>
                {moreLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMoreMenuOpen(false)}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-none group"
                  >
                    <link.icon
                      size={20}
                      className={
                        pathname === link.href
                          ? "text-[#0abab5]"
                          : "text-white/60 group-hover:text-white"
                      }
                    />
                    <span
                      className={`text-xs font-bold uppercase tracking-widest ${
                        pathname === link.href
                          ? "text-[#0abab5]"
                          : "text-white/80 group-hover:text-white"
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
