"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Code, PenTool, Layout, Monitor, Smartphone, Layers, Award, Shield } from 'lucide-react';

const cards = [
    {
        title: "Web Design",
        icon: Layout,
        desc: "Interactive & Responsive",
        color: "#20255e"
    },
    {
        title: "UI/UX Design",
        icon: PenTool,
        desc: "User Centric Interfaces",
        color: "#FF0055"
    },
    {
        title: "Development",
        icon: Code,
        desc: "Clean & Modern Code",
        color: "#1a1e4d"
    },
    {
        title: "1+ Years",
        icon: Award,
        desc: "Of Experience",
        highlight: true,
        color: "#FF0055"
    },
    {
        title: "Mobile Apps",
        icon: Smartphone,
        desc: "iOS & Android",
        color: "#20255e"
    },
    {
        title: "Branding",
        icon: Layers,
        desc: "Identity & Strategy",
        color: "#1a1e4d"
    },
    {
        title: "Secure",
        icon: Shield,
        desc: "Best Practices",
        color: "#20255e"
    },
    {
        title: "Responsive",
        icon: Monitor,
        desc: "All Devices",
        color: "#FF0055"
    }
];

export default function Optical() {
    return (
        <section className="w-full  overflow-hidden bg-black relative">

            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

            {/* Marquee Container */}
            <div className="flex">
                <motion.div
                    className="flex gap-6 pr-6"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear"
                    }}
                    style={{ width: "fit-content" }}
                >
                    {/* Render cards twice for seamless loop */}
                    {[...cards, ...cards].map((card, idx) => (
                        <div
                            key={idx}
                            className={`
                                relative min-w-[280px] md:min-w-[320px] h-[200px] md:h-[240px] 
                                rounded-md p-6 flex flex-col justify-between 
                                border border-white/15 bg-[#111111] hover:border-white/15 transition-all group
                                ${card.highlight ? 'bg-gradient-to-br from-[#111111] to-[#2d0a16]' : ''}
                            `}
                        >
                            {/* Glow Effect */}
                            <div
                                className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                style={{ background: `radial-gradient(circle at center, ${card.color}, transparent 70%)` }}
                            />

                            {/* Top row: Icon */}
                            <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 text-white/80 mb-4 group-hover:scale-110 transition-transform">
                                <card.icon size={24} style={{ color: card.highlight ? '#FF0055' : 'white' }} />
                            </div>

                            {/* Bottom row: Content */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#FF0055] transition-colors">{card.title}</h3>
                                <p className="text-gray-400 text-sm">{card.desc}</p>
                            </div>

                            {/* Decor: Number or accent */}
                            {/* {card.highlight && (
                                <div className="absolute top-4 right-4 text-[#FF0055]/20 text-6xl font-black">1</div>
                            )} */}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}