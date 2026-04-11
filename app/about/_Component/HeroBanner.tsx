"use client";

import graduate from "@/public/graduate.svg";
import Link from "next/link";
import {
  ArrowLeft,
  Zap,
  Code,
  Server,
  Compass,
  Database,
  Layers,
  Cpu,
} from "lucide-react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const techCards = [
  { text: "Next.js", style: { left: "calc(50% + 28%)", top: "calc(50% - 12%)" }, offset: 40 },
  { text: "React", style: { left: "calc(50% + 35%)", top: "calc(50% + 15%)" }, offset: -30 },
  { text: "Nest", style: { left: "calc(50% - 22%)", top: "calc(50% + 22%)" }, offset: 50 },
  { text: "MongoDB", style: { left: "calc(50% - 18%)", top: "calc(50% - 30%)" }, offset: -40 },
  { text: "Express", style: { left: "calc(50% + 18%)", top: "calc(50% + 32%)" }, offset: 25 },
];

export default function HeroBanner() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of viewport
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div>
      {/* Ambient Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#20255e]/30 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-[#FF0055]/20 blur-[120px] rounded-full"
        />
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-6 left-6 z-50 pointer-events-auto"
      >
        <Link
          href="/"
          className="text-white cursor-pointer font-bold flex items-center gap-2 hover:scale-105 transition-transform backdrop-blur-md px-6 py-3 rounded-full border primary-border group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to World
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-x-[-10%] inset-y-[-10%] z-0"
        >
          <Image
            src={graduate}
            alt="Hero Background"
            fill
            className="object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        </motion.div>

        {/* Floating Tech Stack Cards */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {techCards.map((card, i) => {
            // Create varying parallax effect per card
            const factor = (i + 1) * 0.05;
            const cardX = useTransform(springX, (val) => val * factor);
            const cardY = useTransform(springY, (val) => val * factor);

            return (
              <motion.div
                key={i}
                style={{
                  ...card.style,
                  x: cardX,
                  y: cardY,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: [0, card.offset / 10, 0],
                }}
                transition={{
                  opacity: { delay: 1 + i * 0.1, duration: 0.8 },
                  scale: { delay: 1 + i * 0.1, duration: 0.8 },
                  rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                }}
                className="absolute hidden md:flex items-center gap-3 px-5 py-2.5 primary-text4 backdrop-blur-xl border primary-border primary-rounded shadow-2xl"
              >
                <span className="text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                  {card.text}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="relative z-30 text-center px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative inline-block mb-12">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -inset-x-8 -bottom-2 h-[2px] primary-color2 origin-left"
              />
              <span className="primary-text4 font-black uppercase tracking-[0.6em] text-[10px] block">
                Life of Mine
              </span>
            </div>

            <h1 className="text-7xl md:text-[12rem] font-black mb-12 leading-[0.8] tracking-tighter">
              <div className="block overflow-hidden">
                {"MUKSITUL".split("").map((char, i) => (
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    key={`m-${i}`}
                    className="inline-block text-white"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div className="block overflow-hidden">
                {"ISLAM".split("").map((char, i) => (
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    key={`i-${i}`}
                    className="inline-block text-outline-red"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 text-xl md:text-2xl font-bold tracking-widest text-white/40"
            >
              <span className="hidden md:block w-20 h-px bg-linear-to-l from-white/20 to-transparent" />
              Known as my nick name{" "}
              <span className="text-white font-black italic">Jahin</span>
              <span className="hidden md:block w-20 h-px bg-linear-to-r from-white/20 to-transparent" />
            </motion.div>
          </motion.div>
        </div>

        {/* Scanlines */}
        <div className="absolute inset-0 z-40 bg-scanlines opacity-[0.03] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        >
          <div className="w-px h-16 bg-linear-to-b from-transparent via-primary-color2 to-transparent mx-auto" />
          <span className="text-[10px] uppercase font-black tracking-[0.3em] mt-4 block primary-text2">
            Dive In
          </span>
        </motion.div>
      </section>
    </div>
  );
}

