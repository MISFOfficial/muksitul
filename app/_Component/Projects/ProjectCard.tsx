"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  images: {
    url: string;
  }[];
  tags: string[];
  overlayText?: string;
  badge?: {
    text: string;
    color: string;
  } | null;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group w-full"
    >
      <Link href={`/projects/${project._id}`}>
        <div className="relative primary-rounded overflow-hidden transition-all duration-300 bg-[#121212] border primary-border cursor-pointer">
          {/* Image / Preview Area */}
          <div className="relative h-[380px] w-full overflow-hidden bg-[#1a1a1a]">
            <Image
              src={project.images[0]?.url || ""}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 duration-300 transition-transform"
            />

            {/* Coming Soon Overlay */}
            {project.overlayText && (
              <div className="absolute inset-0   backdrop-blur-[2px] z-20 flex items-center justify-center p-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/10 border primary-border px-8 py-3 rounded-full backdrop-blur-md"
                >
                  <span className="text-white font-black tracking-[0.2em] text-sm md:text-base">
                    {project.overlayText}
                  </span>
                </motion.div>
              </div>
            )}

            {/* Hover Overlay (Only if not overlayText) */}
            {!project.overlayText && (
              <div className="absolute inset-0   opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                <div className="primary-color text-white px-6 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                  View Details <ArrowUpRight size={18} />
                </div>
              </div>
            )}
          </div>

          {/* Footer Area */}
          <div className="p-5 text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{project.title}</h3>
              {project.badge && (
                <span
                  className={`${project.badge.color} text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider`}
                >
                  {project.badge.text}
                </span>
              )}
            </div>

            <div className="flex items-end flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-semibold px-3 py-1.5 rounded primary-color text-white"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-[11px] text-gray-400">
                  +{project.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
