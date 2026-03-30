"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Figma, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Design } from "@/lib/designsData";

interface DesignCardProps {
  design: Design;
  index: number;
}

export default function DesignCard({ design, index }: DesignCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group w-full"
    >
      <div className="relative primary-rounded overflow-hidden transition-all duration-500 bg-[#121212] border primary-border hover:border-[#FF5652]/40">
        {/* Preview Image */}
        <div className="relative h-[250px] md:h-[300px] w-full overflow-hidden bg-[#1a1a1a]">
          <Image
            src={design.image}
            alt={design.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Glass Overlay on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4 backdrop-blur-[2px]">
            <div className="flex gap-3">
              {design.figmaUrl && (
                <Link
                  href={design.figmaUrl}
                  target="_blank"
                  className="p-3 bg-white/10 hover:bg-[#FF5652] rounded-full border border-white/20 transition-all hover:scale-110"
                >
                  <Figma size={20} className="text-white" />
                </Link>
              )}
              {design.behanceUrl && (
                <Link
                  href={design.behanceUrl}
                  target="_blank"
                  className="p-3 bg-white/10 hover:bg-[#FF5652] rounded-full border border-white/20 transition-all hover:scale-110"
                >
                  <ExternalLink size={20} className="text-white" />
                </Link>
              )}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
              View Case Study
            </span>
          </div>

          {/* Badge */}
          {design.badge && (
            <div
              className={`absolute top-4 right-4 ${design.badge.color} text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg`}
            >
              {design.badge.text}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 text-white border-t primary-border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg md:text-xl font-black uppercase tracking-tight group-hover:primary-text4 transition-colors">
                {design.title}
              </h3>
              <p className="primary-text4 text-[11px] font-bold uppercase tracking-widest mt-1">
                {design.year}
              </p>
            </div>
            <ArrowUpRight
              size={20}
              className="text-white/20 group-hover:text-[#FF5652] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
            />
          </div>

          <p className="text-sm text-white/40 leading-relaxed line-clamp-2 mb-6 font-medium">
            {design.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {design.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-black px-3 py-1.5 primary-rounded primary-text4 border primary-border group-hover:border-[#FF5652]/30 transition-all uppercase tracking-tighter"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
