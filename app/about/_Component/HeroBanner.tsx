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

const techCards = [
  { text: "Next.js", style: { left: "calc(50% + 28%)", top: "calc(50% - 12%)" } },
  { text: "React", style: { left: "calc(50% + 35%)", top: "calc(50% + 15%)" } },
  { text: "Nest", style: { left: "calc(50% - 22%)", top: "calc(50% + 22%)" } },
  { text: "MongoDB", style: { left: "calc(50% - 18%)", top: "calc(50% - 30%)" } },
  { text: "Express", style: { left: "calc(50% + 18%)", top: "calc(50% + 32%)" } },
];

export default function HeroBanner() {
  return (
    <div>
      {/* Ambient Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#20255e]/20 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-[#FF0055]/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="text-white cursor-pointer font-bold flex items-center gap-2 hover:scale-105 transition-transform backdrop-blur-md px-6 py-3 rounded-full border primary-border group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to World
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-x-[-10%] inset-y-[-10%] z-0">
          <Image
            src={graduate}
            alt="Hero Background"
            fill
            className="object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Floating Tech Stack Cards */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {techCards.map((card, i) => (
            <div
              key={i}
              style={card.style}
              className="absolute hidden md:flex items-center gap-3 px-5 py-2.5 primary-text4 backdrop-blur-xl border primary-border primary-rounded shadow-2xl"
            >
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                {card.text}
              </span>
            </div>
          ))}
        </div>

        <div className="relative z-30 text-center px-6 pointer-events-none">
          <div>
            <div className="relative inline-block mb-12">
              <span className="absolute -inset-x-8 -bottom-2 h-[2px] primary-color2 origin-left" />
              <span className="primary-text4 font-black uppercase tracking-[0.6em] text-[10px] block">
                Life of Mine
              </span>
            </div>

            <h1 className="text-7xl md:text-[12rem] font-black mb-12 leading-[0.8] tracking-tighter">
              <div className="block overflow-hidden">
                {"MUKSITUL".split("").map((char, i) => (
                  <span key={`m-${i}`} className="inline-block text-white">
                    {char}
                  </span>
                ))}
              </div>
              <div className="block overflow-hidden">
                {"ISLAM".split("").map((char, i) => (
                  <span key={`i-${i}`} className="inline-block text-outline-red">
                    {char}
                  </span>
                ))}
              </div>
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-xl md:text-2xl font-bold tracking-widest text-white/40">
              <span className="hidden md:block w-20 h-px bg-linear-to-l from-white/20 to-transparent" />
              Known as my nick name{" "}
              <span className="text-white font-black italic">Jahin</span>
              <span className="hidden md:block w-20 h-px bg-linear-to-r from-white/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Scanlines */}
        <div className="absolute inset-0 z-40 bg-scanlines opacity-[0.03] pointer-events-none" />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <div className="w-px h-16 bg-linear-to-b from-transparent via-primary-color2 to-transparent mx-auto" />
          <span className="text-[10px] uppercase font-black tracking-[0.3em] mt-4 block primary-text2">
            Dive In
          </span>
        </div>
      </section>
    </div>
  );
}
