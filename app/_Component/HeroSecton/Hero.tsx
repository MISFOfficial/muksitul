"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Facebook, MoveRight } from 'lucide-react';
import jahin from "@/public/profile.png";

import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative h-fit overflow-hidden flex items-center justify-center">

            {/* 1. Background Typography Layer (The large gray outlines) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
                <h2 className="text-[12vw] font-black uppercase tracking-tighter text-outline opacity-40 leading-none">
                    Software
                </h2>
                <h2 className="text-[12vw] font-black uppercase tracking-tighter text-outline opacity-40 leading-none -mt-[2vw]">
                    Engineer
                </h2>
            </div>

            <div className="relative z-10 w-full   grid grid-cols-1 lg:grid-cols-12  items-center">
                {/* Left Column (Greeting, Name, CTA) */}
                <div className="lg:col-span-3 flex flex-col items-start text-left gap-4 order-2 lg:order-1">
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm font-bold tracking-widest uppercase text-neutral-500 "
                    >
                        Assalamualaikum/Greatings
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-7xl font-black leading-[0.9] text-black dark:text-white tracking-tighter"
                    >
                        i'm <br />
                        Muksitul <br />
                        Islam
                    </motion.h1>
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 px-10 py-5 bg-[#FF5C58] text-white rounded-full font-bold flex items-center gap-2 hover:bg-[#ff443f] transition-colors shadow-lg shadow-[#FF5C58]/20"
                    >
                        View Portfolio <MoveRight size={20} />
                    </motion.button>
                </div>

                {/* Center Column (Image & Dynamic Text Layering) */}
                <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2 ">

                    {/* 1. Software (Red Outline) - Responsive Layering (Hidden on Mobile, Behind on Desktop) */}
                    <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center pointer-events-none z-[20] lg:z-5">
                        <h2 className="text-[12vw] font-black uppercase tracking-tighter text-outline-red leading-none">
                            Software
                        </h2>
                        {/* Invisble spacer to maintain layout for Software */}
                        <h2 className="text-[12vw] font-black uppercase tracking-tighter opacity-0 leading-none -mt-[2vw]">
                            Engineer
                        </h2>
                    </div>

                    {/* 2. User Image - (z-10) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 w-full h-[80vh] flex items-end justify-center "
                    >
                        <Image
                            src={jahin}
                            alt="Jahin"
                            width={600}
                            height={800}
                            priority
                            className="h-full w-auto object-contain pointer-events-none select-none drop-shadow-[0_20px_50px_rgba(0,0,0,1)]"
                            style={{
                                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                            }}
                        />
                    </motion.div>

                    {/* 3. Engineer (Red Outline) - IN FRONT OF IMAGE (z-20) */}
                    <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center pointer-events-none z-20">
                        {/* Invisble spacer to maintain layout for Engineer */}
                        <h2 className="text-[12vw] font-black uppercase tracking-tighter opacity-0 leading-none">
                            Software
                        </h2>
                        <h2 className="text-[12vw] font-black uppercase tracking-tighter text-outline-red leading-none -mt-[2vw]">
                            Engineer
                        </h2>
                    </div>
                </div>
                {/* Right Column (About Me & Socials) */}
                <div className="lg:col-span-3 flex flex-col gap-12 text-left order-3">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <h3 className="font-bold text-lg dark:text-white">About Me.</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                            A personal <span className="text-[#FF5C58]">portfolio</span> is a collection of your work, that is achievements, and skills that <span className="text-[#FF5C58] font-bold">software development</span> highlights in your growth
                        </p>
                    </motion.div>

                    {/* Social Icons */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h3 className="font-bold text-lg dark:text-white">Find me on</h3>
                        <div className="flex gap-4">
                            {[Instagram, Linkedin, Twitter, Facebook].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-[#FF5C58] hover:text-white transition-all transform hover:scale-110">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
