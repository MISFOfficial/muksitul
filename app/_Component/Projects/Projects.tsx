"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { projectsData } from '@/lib/projectsData';

export default function Projects() {
    const features = [
        "A+ Speed Test(Super Fast)",
        "Drag-and-drop Page Builders",
        "One Click Installation",
        "Fit In All Device"
    ];

    return (
        <section id="projects" className="relative   overflow-hidden flex flex-col items-center justify-center text-center">


            {/* Background Typography */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 opacity-20">
                <h2 className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter text-outline leading-[0.8]">
                    Muksitul
                </h2>
                <h2 className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter text-outline leading-[0.8] ml-[20vw]">
                    Islam
                </h2>
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center gap-6">

                {/* 44+ Badge */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <span className="text-[60px] md:text-[100px] font-black leading-none text-[#FF5C58] tracking-tighter">
                        {projectsData.length}+
                    </span>
                    <span className="absolute top-2 -right-12 text-[12px] md:text-lg font-bold bg-[#20255e] px-3 py-1 rounded-full text-white rotate-12">
                        Projects
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl"
                >
                    Featured Engineering <span className="text-neutral-500">Solutions</span> <br />
                    & Architectural <span className="text-[#20255e]">Showcase</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-neutral-400 max-w-2xl text-lg leading-relaxed mt-4"
                >
                    Explore a curated collection of high-performance applications and innovative digital experiences,
                    demonstrating my commitment to technical excellence and professional problem-solving.
                </motion.p>


                {/* Features List */}
                {/* <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-6 mt-12"
                >
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-full border border-white/10 hover:border-[#FF5C58]/50 transition-colors">
                            <CheckCircle2 className="text-[#22c55e]" size={20} fill="#22c55e" color="black" />
                            <span className="font-semibold text-sm md:text-base">{feature}</span>
                        </div>
                    ))}
                </motion.div> */}



            </div>
        </section>
    );
}