"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import logo from '@/public/muksitul-logo-2.png';

export default function Navigaton() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "#" },
        { name: "Services", href: "#" },
        { name: "Portfolio", href: "#" },
        { name: "Bio", href: "#" },
    ];

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
                    <Image
                        src={logo}
                        alt="Profile"
                        width={400}
                        height={400}
                        className="w-16"
                    />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-10 items-center">
                    <ul className="flex gap-2 items-center justify-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-sm font-bold transition-all rounded-sm text-white/60 hover:text-white hover:scale-105"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </ul>
                    <div className="flex gap-4 items-center justify-center ml-4">
                        <Link
                            href="#"
                            className="text-sm font-bold text-white/60 hover:text-white transition-colors"
                        >
                            Bio
                        </Link>
                        <Link
                            href="/resume"
                            className="px-6 py-2 primary-color2 rounded-sm bg-white text-white text-sm font-bold hover:scale-105 transition-all shadow-lg"
                        >
                            Resume
                        </Link>
                    </div>
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
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="block border px-4 py-3 text-sm font-bold transition-all rounded-sm text-white/60 hover:text-white hover:bg-white/5"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-2 space-y-2 border-t border-white/10">
                                <Link
                                    href="#"
                                    onClick={closeMenu}
                                    className="block px-4 py-3 text-sm font-bold text-white/60 hover:text-white hover:bg-white/5 rounded-sm transition-all"
                                >
                                    Bio
                                </Link>
                                <Link
                                    href="#"
                                    onClick={closeMenu}
                                    className="block px-4 py-3 text-center rounded-sm primary-color2 text-black text-sm font-bold hover:scale-105 transition-all shadow-lg"
                                >
                                    Resume
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
