"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Zap } from 'lucide-react';
import { certificatesData } from '@/lib/certificatesData';

export default function Certificates() {
    return (
        <section id="certificates" className="relative overflow-hidden flex flex-col items-center justify-center text-center py-24">
            {/* Background Typography - Different Style */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 opacity-[0.03]">
                <h2 className="text-[20vw] font-black italic uppercase tracking-tighter text-white leading-none">
                    ACCREDITED
                </h2>
                <h2 className="text-[20vw] font-black italic uppercase tracking-tighter text-white leading-none -mt-10 ml-[10vw]">
                    EXPERTISE
                </h2>
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center gap-8">
                {/* Header Badge */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5C58]/10 border border-[#FF5C58]/20 text-[#FF5C58]"
                >
                    <ShieldCheck size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">Verified Credentials</span>
                </motion.div>

                <div className="space-y-4">
                    <motion.h2
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase"
                    >
                        My Professional <br />
                        <span className="primary-text italic">Milestones</span>
                    </motion.h2>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/40 max-w-2xl text-lg font-medium"
                    >
                        Beyond building projects, I am committed to deep technical mastery.
                        Each certificate represents hundreds of hours of focused learning and validation.
                    </motion.p>
                </div>

                {/* Stat Grid for uniqueness */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
                >
                    {[
                        { label: "Credentials", val: certificatesData.length, icon: Award },
                        { label: "Learning Hours", val: "2,500+", icon: Zap },
                        { label: "Top Rated", val: "100%", icon: ShieldCheck },
                        { label: "Institutions", val: "5+", icon: ShieldCheck },
                    ].map((stat, i) => (
                        <div key={i} className="px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-1">
                            <stat.icon size={20} className="text-[#FF5C58] mb-2" />
                            <span className="text-2xl font-black text-white">{stat.val}</span>
                            <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
