"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Navigaton() {
    const navLinks = [
        { name: "Home", href: "#" },
        { name: "Services", href: "#" },
        { name: "Portfolio", href: "#" },
        { name: "Bio", href: "#" },
        { name: "Resume", href: "#", isButton: true },
    ];

    return (
        <nav className=" top-0 left-0 w-full z-50 flex justify-center  text-white">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)]/40 backdrop-blur-xl shadow-2xl shadow-black/50"
            >
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className={`px-4 py-2 text-sm font-bold transition-all rounded-full ${link.isButton
                            ? "bg-[#FF5C58] text-white hover:scale-105 shadow-md shadow-[#FF5C58]/20"
                            : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
                            }`}
                    >
                        {link.name}
                    </a>
                ))}
            </motion.div>
        </nav>
    );
}
