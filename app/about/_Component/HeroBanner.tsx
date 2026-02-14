import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import graduate from "@/public/graduate.svg";
import Link from 'next/link';
import { ArrowLeft, Zap, Code, Server, Compass, Database, Layers, Cpu } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
export default function HeroBanner({ ref, heroRef, handleMouseMove, parallaxY, parallaxX, springX, springY, scrollProgress }: any) {
    const bgY = useTransform(scrollProgress, [0, 1], [0, 200]);

    return (
        <div>
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
                    className="text-white cursor-pointer font-bold flex items-center gap-2 hover:scale-105 transition-transform bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 group "
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to World
                </Link>
            </div>

            {/* Ultra-Unique Interactive Hero Section */}
            <section
                ref={heroRef}
                onMouseMove={handleMouseMove}
                className="relative h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Parallax Background Layer */}
                <motion.div
                    style={{ y: useTransform([bgY, parallaxY], ([s, m]: any) => s + m), x: parallaxX }}
                    className="absolute inset-x-[-10%] inset-y-[-10%] z-0"
                >
                    <Image
                        src={graduate}
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-20 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </motion.div>

                {/* Mouse-Reactive Spotlight Overlay */}
                <motion.div
                    className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-soft-light"
                    style={{
                        background: useTransform(
                            [springX, springY],
                            ([x, y]) => `radial-gradient(600px circle at calc(50% + ${x}px) calc(50% + ${y}px), rgba(255, 0, 85, 0.4), transparent 80%)`
                        )
                    }}
                />

                {/* Floating Tech Stack Cards */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    {[
                        { text: "Next.js", x: "28%", y: "-12%", delay: 0.1 },
                        { text: "React", x: "35%", y: "15%", delay: 0.2 },
                        { text: "Nest", x: "-22%", y: "22%", delay: 0.3 },
                        { text: "MongoDB", x: "-18%", y: "-30%", delay: 0.4 },
                        { text: "Express", x: "18%", y: "32%", delay: 0.6 },
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                left: `calc(50% + ${card.x})`,
                                top: `calc(50% + ${card.y})`,
                                x: useTransform(springX, (val: any) => val * (0.015 * (i + 1))),
                                y: useTransform(springY, (val: any) => val * (0.015 * (i + 1)))
                            }}
                            transition={{ delay: 1 + card.delay, duration: 0.8 }}
                            className="absolute hidden md:flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-md shadow-2xl"
                        >

                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">{card.text}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="relative z-30 text-center px-6 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="relative inline-block mb-12">
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, ease: "circOut" }}
                                className="absolute -inset-x-8 -bottom-2 h-[2px] bg-[#FF0055] origin-left"
                            />
                            <span className="text-white/60 font-black uppercase tracking-[0.6em] text-[10px] block">
                                Life of Mine
                            </span>
                        </div>

                        <h1 className="text-7xl md:text-[12rem] font-black mb-12 leading-[0.8] tracking-tighter perspective-1000">
                            <div className="block overflow-hidden">
                                {"MUKSITUL".split("").map((char, i) => (
                                    <motion.span
                                        key={`m-${i}`}
                                        initial={{ opacity: 0, rotateX: -90, y: 50 }}
                                        animate={{ opacity: 1, rotateX: 0, y: 0 }}
                                        transition={{
                                            delay: 0.5 + (i * 0.05),
                                            duration: 0.8,
                                            ease: "backOut"
                                        }}
                                        className="inline-block text-white"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                            <div className="block overflow-hidden">
                                {"ISLAM".split("").map((char, i) => (
                                    <motion.span
                                        key={`i-${i}`}
                                        initial={{ opacity: 0, rotateX: -90, y: 50 }}
                                        animate={{ opacity: 1, rotateX: 0, y: 0 }}
                                        transition={{
                                            delay: 1 + (i * 0.05),
                                            duration: 0.8,
                                            ease: "backOut"
                                        }}
                                        className="inline-block text-outline-red"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                            className="flex flex-col md:flex-row items-center justify-center gap-6 text-xl md:text-2xl font-bold  tracking-widest text-white/40"
                        >
                            <span className="hidden md:block w-20 h-[1px] bg-gradient-to-l from-white/20 to-transparent" />
                            Known as my nick name <span className="text-white font-black italic">Jahin</span>
                            <span className="hidden md:block w-20 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Interactive Scanlines Overlay */}
                <div className="absolute inset-0 z-40 bg-scanlines opacity-[0.03] pointer-events-none" />

                <motion.div
                    animate={{ y: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
                >
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#FF0055] to-transparent mx-auto" />
                    <span className="text-[10px] uppercase font-black tracking-[0.3em] mt-4 block primary-text2">Dive In</span>
                </motion.div>
            </section>

        </div>
    );
};