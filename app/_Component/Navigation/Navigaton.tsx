"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import logo from '@/public/muksitul-logo-2.png';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigaton() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", id: "hero" },
        { name: "Complete", id: "complete" },
        { name: "Services", id: "services" },
        { name: "Projects", id: "projects" },
        { name: "Faq", id: "faq" },
        { name: "Resume", id: "resume", href: "/resume" },
    ];

    const handleNavClick = (id: string, href?: string) => {
        const isProjectSection = ['faq', 'projects',].includes(id);
        const scrollBlock = isProjectSection ? 'start' : 'center' as ScrollLogicalPosition;

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: scrollBlock });
        }
        closeMenu();
    };



    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="flex justify-center text-white relative">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center justify-between gap-2 px-6 py-4 w-full ratio"
            >
                <div className="flex items-center gap-2">
                    <button onClick={() => handleNavClick("hero")}>

                        <Image
                            src={logo}
                            alt="Profile"
                            width={400}
                            height={400}
                            className="w-16 cursor-pointer"
                        />
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-10 items-center">
                    <ul className="flex gap-2 items-center justify-center">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link.id, link.href)}

                                className={`px-4 py-2 text-sm font-bold transition-all rounded-sm hover:scale-105 cursor-pointer ${link.name === "Resume"
                                    ? "primary-color2 bg-white text-white shadow-lg mx-2"
                                    : "text-white/60 hover:text-white"
                                    }`}
                            >
                                {link.name}
                            </button>
                        ))}
                    </ul>
                </div>


                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 text-white hover:text-white/80 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </motion.div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 shadow-2xl z-50"
                    >
                        <div className="px-6 py-4 space-y-2 text-center">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => handleNavClick(link.id, link.href)}

                                    className={`w-full block px-4 py-3 text-sm font-bold transition-all rounded-sm hover:scale-105 cursor-pointer ${link.name === "Resume"
                                        ? "primary-color2 text-black shadow-lg"
                                        : "text-white/60 hover:text-white hover:bg-white/5 border border-white/10"
                                        }`}
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

