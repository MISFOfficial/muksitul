"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, Heart, BookOpen, Code, MapPin, Briefcase, GraduationCap, Coffee, Moon, Zap, Target, Globe } from 'lucide-react';
import Link from 'next/link';
import graduate from "@/public/graduate.svg";

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const journeyEvents = [
        {
            year: "The Beginning",
            title: "Roots in Kishoreganj",
            description: "Born and raised in a small, humble family in Kishoreganj, a peaceful town in the Dhaka division. Growing up in a close-knit community, I was always the curious child, restless and eager to explore the world around me.",
            icon: <MapPin className="text-[#FF0055]" size={24} />,
            image: "/home/jahin/.gemini/antigravity/brain/6267e663-0069-45e5-944f-43f66840c7fa/kishoreganj_landscape_1770898855065.png"
        },
        {
            year: "2020",
            title: "A Family's Strength",
            description: "Life took a profound turn in 2020 when we lost my eldest brother in a tragic bike accident. As the family shifted from four brothers to three, I stepped into the role of the eldest son. This moment defined my sense of responsibility and resilience.",
            icon: <Heart className="text-[#FF0055]" size={24} />,
            image: "/home/jahin/.gemini/antigravity/brain/6267e663-0069-45e5-944f-43f66840c7fa/software_engineer_professional_1770898893501.png"
        },
        {
            year: "Education",
            title: "Academic Growth",
            description: "Completed my primary education locally, followed by SSC at Azimuddin and HSC at Gurudoyal. Since my high school days, I've felt a magnetic pull toward programming, though resources were scarce at the time.",
            icon: <BookOpen className="text-[#FF0055]" size={24} />,
            image: "/home/jahin/.gemini/antigravity/brain/6267e663-0069-45e5-944f-43f66840c7fa/programming_passion_concept_1770898872621.png"
        },
        {
            year: "Present",
            title: "The Engineer's Path",
            description: "I fulfilled my dream by graduating with a Bachelor's in Computer Science and Engineering from Daffodil International University. Today, I am a professional Software Engineer, specializing in system architecture, full-stack development, and meticulous testing.",
            icon: <GraduationCap className="text-[#FF0055]" size={24} />,
            image: "/home/jahin/.gemini/antigravity/brain/6267e663-0069-45e5-944f-43f66840c7fa/software_engineer_professional_1770898893501.png"
        }
    ];

    const quickFacts = [
        { icon: <Coffee />, label: "Fuel", value: "Dark Roast Coffee" },
        { icon: <Moon />, label: "Peak", value: "Late Night Coding" },
        { icon: <Zap />, label: "Mindset", value: "Continuous Learning" },
        { icon: <Target />, label: "Focus", value: "Scalable Architecture" },
    ];

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white selection:bg-[#FF0055] selection:text-white overflow-hidden relative">

            {/* Ambient Background Blobs */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 100, -50],
                        y: [0, -100, 50],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#20255e]/20 blur-[150px] rounded-full"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 50],
                        y: [0, 100, -50],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-[#FF0055]/10 blur-[120px] rounded-full"
                />
            </div>

            {/* Navigation */}
            <div className="fixed top-6 left-6 z-50">
                <Link
                    href="/"
                    className="text-white cursor-pointer font-bold flex items-center gap-2 hover:scale-105 transition-transform bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 group shadow-2xl"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to World
                </Link>
            </div>

            {/* Premium Hero Section */}
            <section className="relative h-screen flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={graduate}
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-30 grayscale-[40%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 text-center ratio px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: "fit-content" }}
                            className="text-[#FF0055] font-black uppercase tracking-[0.5em] text-xs mb-8 block mx-auto border-b-2 border-[#FF0055] pb-2 overflow-hidden whitespace-nowrap"
                        >
                            The Journey of a Creator
                        </motion.span>
                        <h1 className="text-7xl md:text-[10rem] font-black mb-8 leading-[0.85] tracking-tighter">
                            <motion.span
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="inline-block"
                            >
                                MUKSITUL
                            </motion.span>
                            <br />
                            <motion.span
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-outline-red inline-block"
                            >
                                ISLAM
                            </motion.span>
                        </h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="flex items-center justify-center gap-4 text-xl md:text-2xl font-bold italic text-white/80"
                        >
                            <span className="h-[2px] w-12 bg-[#20255e]" />
                            Known as Jahiin
                            <span className="h-[2px] w-12 bg-[#20255e]" />
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
                >
                    <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto" />
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-4 block">Scroll to explore</span>
                </motion.div>
            </section>

            {/* Quick Facts Grid */}
            <section className="py-20 bg-black/50 backdrop-blur-sm relative z-10">
                <div className="ratio grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
                    {quickFacts.map((fact, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 transition-colors"
                        >
                            <div className="text-[#FF0055] mb-4 group-hover:scale-125 transition-transform duration-300">
                                {fact.icon}
                            </div>
                            <span className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1">{fact.label}</span>
                            <span className="text-sm font-bold text-white">{fact.value}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Journey Timeline with Parallax */}
            <section className="py-24 bg-black relative z-10">
                <div className="ratio">
                    <div className="space-y-48">
                        {journeyEvents.map((event, index) => (
                            <div
                                key={index}
                                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-32`}
                            >
                                <motion.div
                                    className="flex-1 w-full"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1 }}
                                >
                                    <div className="relative aspect-[16/10] rounded-3xl overflow-hidden group shadow-2xl">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-8 left-8">
                                            <span className="px-4 py-2 rounded-full bg-[#FF0055] text-white text-[10px] font-black uppercase tracking-widest">
                                                {event.year}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="flex-1 space-y-8"
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                                        {event.title.split(' ').map((word, i) => (
                                            <span key={i} className={i === 0 ? 'text-[#20255e]' : ''}>{word} </span>
                                        ))}
                                    </h2>
                                    <p className="text-xl text-gray-400 leading-relaxed font-medium text-justify">
                                        {event.description}
                                    </p>
                                    <div className="flex gap-4">
                                        <div className="h-[1px] w-20 bg-[#FF0055] mt-4" />
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-[#FF0055]">
                                            {event.icon}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Life Philosophy Section - Bold Unique Design */}
            <section className="py-48 bg-[#20255e]/10 relative overflow-hidden backdrop-blur-3xl border-y border-white/5">
                <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
                    <Code size={400} />
                </div>

                <div className="ratio px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="max-w-5xl mx-auto"
                    >
                        <h2 className="text-sm font-black text-[#FF0055] uppercase tracking-[0.5em] mb-12">Systemic Philosophy</h2>
                        <blockquote className="text-4xl md:text-7xl font-black italic text-white leading-tight tracking-tight mb-16">
                            "Building code is not just about logic; it's about <span className="text-outline">empathy</span> for the user and <span className="text-[#FF0055]">resilience</span> for the system."
                        </blockquote>
                        <div className="flex flex-wrap justify-center gap-12 text-left">
                            <div className="flex-1 min-w-[300px] p-8 rounded-3xl bg-black/40 border border-white/10">
                                <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                                    <Globe className="text-[#FF0055]" /> Adaptability
                                </h4>
                                <p className="text-gray-400">Growing up in changing times taught me that the only constant is evolution. I build systems that grow with the world.</p>
                            </div>
                            <div className="flex-1 min-w-[300px] p-8 rounded-3xl bg-black/40 border border-white/10">
                                <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                                    <Target className="text-[#FF0055]" /> Precision
                                </h4>
                                <p className="text-gray-400">From SSC to my Bachelor's, I've learned that attention to detail is the difference between a tool and a masterpiece.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Beyond The Screen - Hobbies Section */}
            <section className="py-32 bg-black relative z-10">
                <div className="ratio px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
                        <div className="max-w-xl">
                            <h2 className="text-6xl font-black tracking-tighter mb-6">Beyond the <span className="text-[#FF0055]">Screen</span>.</h2>
                            <p className="text-xl text-gray-400">When the IDE is closed, I seek inspiration in the rhythms of nature and the mysteries of new places.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="px-8 py-4 rounded-full border border-white/10 font-bold hover:bg-white/5 transition-colors cursor-pointer">Explorer</div>
                            <div className="px-8 py-4 rounded-full border border-white/10 font-bold hover:bg-white/5 transition-colors cursor-pointer">Thinker</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Kishoreganj Discovery", desc: "Exploring the hidden gems of my hometown.", image: "/home/jahin/.gemini/antigravity/brain/6267e663-0069-45e5-944f-43f66840c7fa/kishoreganj_landscape_1770898855065.png" },
                            { title: "Tech Reading", desc: "Diving deep into the latest in system design.", image: "/home/jahin/.gemini/antigravity/brain/6267e663-0069-45e5-944f-43f66840c7fa/programming_passion_concept_1770898872621.png" },
                            { title: "Photography", desc: "Capturing the golden moments of life.", image: "/home/jahin/.gemini/antigravity/brain/6267e663-0069-45e5-944f-43f66840c7fa/software_engineer_professional_1770898893501.png" },
                        ].map((hobby, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer"
                            >
                                <Image src={hobby.image} alt={hobby.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
                                    <h3 className="text-2xl font-bold mb-2">{hobby.title}</h3>
                                    <p className="text-sm text-gray-300 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        {hobby.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Jahiin Way - Methodology */}
            <section className="py-32 bg-black relative z-10 border-t border-white/5">
                <div className="ratio px-6">
                    <div className="text-center mb-24">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#FF0055] font-black uppercase tracking-[0.4em] text-xs mb-4 block"
                        >
                            Process
                        </motion.span>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter">The <span className="text-outline">Jahiin</span> Way.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { step: "01", title: "Discovery", desc: "Diving deep into requirements, understanding the 'why' before the 'how'.", icon: <Target size={20} /> },
                            { step: "02", title: "Architecture", desc: "Drafting scalable blueprints that balance performance and flexibility.", icon: <Briefcase size={20} /> },
                            { step: "03", title: "Sculpting", desc: "Writing clean, efficient, and well-documented code with precision.", icon: <Code size={20} /> },
                            { step: "04", title: "Refining", desc: "Rigorous testing and optimization to ensure absolute system integrity.", icon: <Zap size={20} /> },
                        ].map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-[#FF0055] transition-all duration-500 hover:-translate-y-4"
                            >
                                <span className="text-5xl font-black text-white/10 group-hover:text-white/20 transition-colors block mb-6">{m.step}</span>
                                <div className="text-[#FF0055] group-hover:text-white mb-4 transition-colors">
                                    {m.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{m.title}</h3>
                                <p className="text-gray-400 group-hover:text-white/80 transition-colors leading-relaxed">{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* A Day in the Life - Interactive Timeline */}
            <section className="py-32 bg-[#050505] relative z-10 overflow-hidden">
                <div className="ratio px-6">
                    <div className="flex flex-col md:flex-row gap-20">
                        <div className="md:w-1/3 sticky top-32 h-fit">
                            <h2 className="text-6xl font-black tracking-tighter mb-8 leading-none">Rhythm of a <span className="text-[#FF0055]">Creator</span>.</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">My day is a carefully curated sequence of rituals that fuel both technical precision and creative exploration.</p>
                            <div className="mt-12 p-8 rounded-3xl bg-[#20255e]/10 border border-[#20255e]/30">
                                <span className="text-xs font-black uppercase tracking-widest text-[#20255e] mb-2 block">Current Status</span>
                                <p className="text-white font-bold text-xl flex items-center gap-3">
                                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" /> Exploring new horizons
                                </p>
                            </div>
                        </div>

                        <div className="md:w-2/3 space-y-12">
                            {[
                                { time: "09:00 AM", task: "Mindful Reset & Planning", icon: <Globe size={18} />, detail: "Morning coffee accompanied by setting the day's architectural goals." },
                                { time: "11:00 AM", task: "Deep System Design", icon: <Briefcase size={18} />, detail: "Peak cognitive hours dedicated to complex logic and system mapping." },
                                { time: "03:00 PM", task: "Vibrant Collaboration", icon: <Heart size={18} />, detail: "Syncing with the team, code reviews, and mentoring sessions." },
                                { time: "08:00 PM", task: "The Lab & Learning", icon: <BookOpen size={18} />, detail: "Experimenting with new stacks and diving into technical literature." },
                                { time: "11:00 PM", task: "The Midnight Oil", icon: <Zap size={18} />, detail: "Pure creation. When the world goes quiet, the most brilliant code flows." },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="flex gap-8 group"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FF0055] group-hover:bg-[#FF0055] group-hover:text-white transition-all duration-300">
                                            {item.icon}
                                        </div>
                                        <div className="w-[1px] h-full bg-white/10 mt-4 group-last:hidden" />
                                    </div>
                                    <div className="pb-12">
                                        <span className="text-[#FF0055] font-black text-xs tracking-widest block mb-2">{item.time}</span>
                                        <h4 className="text-2xl font-bold mb-3">{item.task}</h4>
                                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{item.detail}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Future Vision - High Contrast Design */}
            <section className="py-48 primary-color text-black relative z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent" />

                <div className="ratio px-6">
                    <div className="max-w-4xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-7xl md:text-9xl text-white font-black tracking-tighter mb-16 leading-[0.8]"
                        >
                            THE <br /> FUTURE <br /><span className="text-[#FF0055]">BEYOND</span>.
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h4 className="text-2xl font-bold mb-6 border-l-4 border-black pl-6">Mastering AI Systems</h4>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    I am moving toward bridging the gap between traditional system architecture and autonomous AI-driven applications. The goal is predictable, resilient, and intelligent systems.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h4 className="text-2xl font-bold mb-6 border-l-4 border-black pl-6">Building Open Legacies</h4>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Contributing more to the open-source ecosystem is a priority. I want to build tools that empower the next generation of engineers in Bangladesh and beyond.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Abstract Visual for Future */}
                <div className="absolute right-0 bottom-0 p-10 opacity-5 pointer-events-none">
                    <Zap size={600} />
                </div>
            </section>

            {/* Final CTA / Footer */}
            <section className="py-48 text-center relative z-10 bg-black">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="ratio px-6"
                >
                    <h2 className="text-5xl md:text-8xl font-black mb-12 leading-none">
                        Ready to <span className="text-[#FF0055]">Collaborate?</span>
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <Link
                            href="mailto:muksitul44@gmail.com"
                            className="px-12 py-6 bg-white text-black font-black uppercase tracking-widest hover:scale-105 transition-transform rounded-sm shadow-2xl"
                        >
                            Get in Touch
                        </Link>
                        <Link
                            href="/resume"
                            className="px-12 py-6 border border-white/20 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-sm"
                        >
                            View Resume
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
