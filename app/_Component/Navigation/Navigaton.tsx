"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navigaton() {
    const navLinks = [
        { name: "Home", href: "#" },
        { name: "Services", href: "#" },
        { name: "Portfolio", href: "#" },
        { name: "Bio", href: "#" },
    ];

    return (
        <nav className=" flex justify-center text-white ">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center justify-between gap-2 px-6 py-4 w-full ratio"
            >
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full primary-color flex items-center justify-center text-white font-black text-xs">J</div>
                    <span className="font-black tracking-tighter text-xl uppercase italic">Muksitul.</span>
                </div>

                <div className="flex gap-10 items-center">
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
                            href="#"
                            className="px-6 py-2 rounded-sm primary-color text-white text-sm font-bold hover:scale-105 transition-all shadow-lg"
                        >
                            Resume
                        </Link>
                    </div>
                </div>
            </motion.div>
        </nav>
    );
}
