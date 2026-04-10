"use client";

import React from "react";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import {
  useGetAllProjects,
  useGetProjectsCount,
} from "@/app/Global/data/useProjects";
export default function Projects() {
  const { count } = useGetProjectsCount();

  const features = [
    "A+ Speed Test(Super Fast)",
    "Drag-and-drop Page Builders",
    "One Click Installation",
    "Fit In All Device",
  ];

  return (
    <section
      id="projects"
      className="relative   overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Background Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 opacity-20">
        <h2 className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter text-outline leading-[0.8]">
          Projects
        </h2>
        <h2 className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter text-outline leading-[0.8] ml-[20vw]">
          Studio
        </h2>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto  flex flex-col items-center gap-6">
        {/* 44+ Badge */}
        <div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <span className="text-[60px] md:text-[100px] font-black leading-none primary-text2 tracking-tighter">
            {count?.count || "0"}+
          </span>
          <span className="absolute top-2 -right-12 text-[12px] md:text-lg font-bold bg-[#20255e] px-3 py-1 rounded-full text-white rotate-12">
            Projects
          </span>
        </div>

        {/* Heading */}
        <h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl"
        >
          Featured Engineering <span className="primary-text4">Solutions</span>{" "}
          <br />& Architectural <span className="primary-text2">Showcase</span>
        </h2>

        {/* Description */}
        <p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="primary-text4 max-w-2xl text-lg leading-relaxed mt-4"
        >
          Explore a curated collection of high-performance applications and
          innovative digital experiences, demonstrating my commitment to
          technical excellence and professional problem-solving.
        </p>

        {/* Features List */}
        {/* <div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-6 mt-12"
                >
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 primary-text4 backdrop-blur-sm px-5 py-3 rounded-full border primary-border hover:border-[#FF5C58]/50 transition-colors">
                            <CheckCircle2 className="text-[#22c55e]" size={20} fill="#22c55e" color="black" />
                            <span className="font-semibold text-sm md:text-base">{feature}</span>
                        </div>
                    ))}
                </div> */}
      </div>
    </section>
  );
}
