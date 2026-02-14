"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Layers, Zap, Code2, Workflow } from "lucide-react";

const mindsetItems = [
    {
        title: "Systemic Architecture",
        description:
            "Viewing applications as living ecosystems, not just components. I architect for seamless data flow and modular resilience.",
        icon: Workflow,
        color: "from-blue-500/20 to-cyan-500/20",
        size: "md:col-span-2",
        delay: 0.1,
    },
    {
        title: "Pragmatic Tooling",
        description:
            "Choosing tools based on project-specific trade-offs, not industry hype.",
        icon: Cpu,
        color: "from-purple-500/20 to-pink-500/20",
        size: "md:col-span-1",
        delay: 0.2,
    },
    {
        title: "Performance Ethics",
        description:
            "Speed is a feature. I advocate for lean bundles and sub-second interactions.",
        icon: Zap,
        color: "from-orange-500/20 to-yellow-500/20",
        size: "md:col-span-1",
        delay: 0.3,
    },
    {
        title: "Maintainability First",
        description:
            "Writing code for the next developer. My work is self-documenting, tested, and built to survive long-term evolution.",
        icon: Layers,
        color: "from-green-500/20 to-emerald-500/20",
        size: "md:col-span-2",
        delay: 0.4,
    },
];

export default function EngineeringMindset() {
    return (
        <section id="mindset" className="relative overflow-hidden bg-black">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-color/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <Brain className="text-primary-color2" size={24} />
                        <span className="text-primary-color2 font-bold uppercase tracking-widest text-sm">
                            Philosophy
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
                    >
                        The Engineering <br />
                        <span className="text-neutral-500 italic">Mindset</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl text-lg leading-relaxed"
                    >
                        Great software isn't just about syntax—it's about mental models and
                        architectural decisions. Here is how I approach complex technical
                        challenges.
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mindsetItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: item.delay, duration: 0.5 }}
                            className={`${item.size} group relative p-8 rounded-md bg-black border border-white/15 backdrop-blur-xl overflow-hidden`}
                        >
                            {/* Gradient Background */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500`}
                            />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 transition-colors">
                                    <item.icon
                                        className="text-white/70 transition-colors"
                                        size={24}
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 transition-colors leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl transition-all duration-500" />
                        </motion.div>
                    ))}

                    {/* Meta Card: Decision Making */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="md:col-span-3 mt-4 p-8 rounded-md bg-primary-color/10 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8 group"
                    >
                        <div className="max-w-xl">
                            <h3 className="text-white text-2xl font-bold mb-2">
                                Architectural Pragmatism
                            </h3>
                            <p className="text-blue-200/60 leading-relaxed">
                                "I don't believe in the 'best' library. I believe in the 'right'
                                one for the current user burden, technical debt threshold, and
                                future scaling requirements."
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Code2
                                className="text-primary-color2 opacity-40 group-hover:opacity-100 transition-opacity"
                                size={48}
                            />
                            <div className="h-12 w-[1px] bg-white/10 hidden md:block" />
                            <span className="text-white/40 font-mono text-sm uppercase tracking-widest group-hover:text-white/60 transition-colors underline decoration-primary-color2/30">
                                Trade-off Analysis
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
