"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Facebook, MoveRight } from 'lucide-react';
import jahin from "@/public/profile.png";
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgSoftwareRef = useRef<HTMLHeadingElement>(null);
    const bgEngineerRef = useRef<HTMLHeadingElement>(null);
    const fgSoftwareRef = useRef<HTMLHeadingElement>(null);
    const fgEngineerRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Background Text Animations
            gsap.to(bgSoftwareRef.current, {
                x: -150,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });
            gsap.to(bgEngineerRef.current, {
                x: 150,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            // Foreground Text Animations - software (behind)
            gsap.to(fgSoftwareRef.current, {
                x: -100,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            // Foreground Text Animations - engineer (front)
            gsap.to(fgEngineerRef.current, {
                x: 100,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[80vh] py-20 lg:py-20 overflow-hidden flex items-center justify-center">

            {/* 1. Background Typography Layer (The large gray outlines) */}
            <div className="absolute inset-0 flex lg:hidden flex-col items-center justify-center pointer-events-none select-none z-0">
                <h2 ref={bgSoftwareRef} className="text-[60px] md:text-[100px] lg:text-[140px] xl:text-[180px] font-black uppercase tracking-tighter text-outline opacity-40 leading-none">
                    Software
                </h2>
                <h2 ref={bgEngineerRef} className="text-[60px] md:text-[100px] lg:text-[140px] xl:text-[180px] font-black uppercase tracking-tighter text-outline opacity-40 leading-none -mt-4 md:-mt-8 lg:-mt-12">
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
                    <motion.a
                        href="/resume"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover="hover"
                        className="mt-6 px-10 py-5 primary-color text-white rounded-sm font-bold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
                    >
                        View Portfolio
                        <motion.span
                            variants={{ hover: { x: 8 } }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <MoveRight size={20} />
                        </motion.span>
                    </motion.a>
                </div>

                {/* Center Column (Image & Dynamic Text Layering) */}
                <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2 ">

                    {/* 1. Software (Red Outline) - Responsive Layering (Hidden on Mobile, Behind on Desktop) */}
                    <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center pointer-events-none z-[20] lg:z-5">
                        <h2 ref={fgSoftwareRef} className="text-[60px] md:text-[100px] lg:text-[140px] xl:text-[180px] font-black uppercase tracking-tighter text-outline-red leading-none">
                            Software
                        </h2>
                        {/* Invisble spacer to maintain layout for Software */}
                        <h2 className="text-[60px] md:text-[100px] lg:text-[140px] xl:text-[180px] font-black uppercase tracking-tighter opacity-0 leading-none -mt-4 md:-mt-8 lg:-mt-12">
                            Engineer
                        </h2>
                    </div>

                    {/* Blue Glow Effect */}
                    {/* <div className="absolute hidden md:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[80px] -z-10 pointer-events-none mix-blend-screen" /> */}

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
                        <h2 className="text-[60px] md:text-[100px] lg:text-[140px] xl:text-[180px] font-black uppercase tracking-tighter opacity-0 leading-none">
                            Software
                        </h2>
                        <h2 ref={fgEngineerRef} className="text-[60px] md:text-[100px] lg:text-[140px] xl:text-[180px] font-black uppercase tracking-tighter text-outline-red leading-none -mt-4 md:-mt-8 lg:-mt-12">
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
                                <a key={idx} href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 primary-color text-neutral-600 dark:text-neutral-400 hover:text-white transition-all transform hover:scale-110">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section >
    );
}
