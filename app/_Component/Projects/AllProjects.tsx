"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

import Projects from "./Projects";
import { useGetAllProjects } from "@/app/Global/data/useProjects";

export default function AllProjects() {
  const { allProjects, isLoading, isError } = useGetAllProjects(3);
  const projects = allProjects?.pages.flatMap((page: any) => page) || [];

  if (isLoading) {
    return (
      <section id="projects">
        <Projects />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="primary-rounded overflow-hidden bg-[#121212] border primary-border animate-pulse"
            >
              {/* Image skeleton */}
              <div className="h-[380px] w-full bg-white/[0.04]" />
              {/* Footer skeleton */}
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="h-5 w-2/3 bg-white/[0.06] rounded-lg" />
                  <div className="h-5 w-14 bg-white/[0.06] rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-7 w-20 bg-white/[0.06] rounded" />
                  <div className="h-7 w-16 bg-white/[0.06] rounded" />
                  <div className="h-7 w-24 bg-white/[0.06] rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-gray-400 py-10">
        Failed to load projects.
      </div>
    );
  }

  return (
    <section id="projects" className="">
      <Projects />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {projects.map((project: any, index: number) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 flex justify-center"
      >
        <Link href="/projects" className="group">
          <button className="relative px-10 py-4 bg-transparent border primary-border rounded-full text-white font-bold text-sm uppercase overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 group-hover:text-white">
            <span className="relative z-10 transition-colors duration-300">
              Explore All Projects
            </span>
            <ArrowUpRight
              size={18}
              className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
            />

            {/* Shimmer effect / Hover background */}
            <div className="absolute inset-0 primary-color2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
          </button>
        </Link>
      </motion.div>
    </section>
  );
}
