"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experienceData } from "@/lib/experienceData";
import { Calendar, MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ExperienceCard = ({
  exp,
  index,
}: {
  exp: (typeof experienceData)[0];
  index: number;
}) => {
  return (
    <Link href={`/experience/${exp.id}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8 primary-rounded bg-white/[0.02] border primary-border hover:bg-white/[0.04] hover:border-[#FF0055]/20 transition-all duration-300 w-full mb-6 cursor-pointer"
      >
        <div className="flex items-center gap-5 md:gap-6">
          <div className="w-14 h-14 md:w-16 md:h-16 primary-rounded primary-text4 relative overflow-hidden border primary-border shrink-0">
            <Image
              fill
              src={exp.logo}
              alt={exp.company}
              className="object-cover transition-all duration-500"
            />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#FF0055] transition-colors leading-tight">
              {exp.role}
            </h3>
            <p className="text-sm md:text-base font-medium text-gray-400 mt-1">
              {exp.company}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:gap-3 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 primary-border">
            <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 primary-text4 rounded-full border primary-border text-[#FF0055] text-xs md:text-sm font-bold tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{exp.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs md:text-sm font-medium md:pr-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{exp.location}</span>
            </div>
          </div>
          <div className="shrink-0 w-10 h-10 rounded-full border primary-border flex items-center justify-center group-hover:bg-[#FF0055] group-hover:border-[#FF0055] transition-all duration-300">
            <ArrowUpRight
              size={18}
              className="text-white group-hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function Experiance() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className=" relative overflow-hidden">
      <div className="mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <Briefcase className="" size={24} />
          <span className=" font-bold uppercase tracking-widest text-sm">
            Experience
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
        >
          Professional <br />
          <span className="primary-text4italic">Timeline</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl text-lg leading-relaxed"
        >
          Tracing the evolution of professional expertise through diverse roles
          and impactful contributions.
        </motion.p>
      </div>

      <div className="relative ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {experienceData.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
