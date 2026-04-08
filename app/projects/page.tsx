"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navigation from "../_Component/Navigation/Navigaton";
import Footer from "../_Component/Footer/Footer";
import ProjectCard from "../_Component/Projects/ProjectCard";
import { useGetAllProjects } from "../Global/data/useProjects";

import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();
  const { allProjects, isLoading, isError } = useGetAllProjects(10);

  const projects = allProjects?.pages.flatMap((page: any) => page) || [];

  return (
    <main className="  min-h-screen ratio">
      {/* Specialized Header */}
      <section className=" py-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-color/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className=" relative z-10">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </button>

          <div className="flex items-center gap-3 mb-6">
            <LayoutGrid className="text-primary-color2" size={24} />
            <span className="text-primary-color2 font-bold uppercase tracking-widest text-sm underline decoration-primary-color2/30">
              Archive
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
            Engineering <br />
            <span className="primary-text4italic">Showcase</span>
          </h1>

          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            A comprehensive directory of technical solutions, architectural
            prototypes, and production-ready applications built with a focus on
            scalability and performance.
          </p>
        </div>
      </section>

      {/* Full Projects Grid */}
      <section className="pb-32">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any, index: number) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>

          {/* Empty State if no projects (unlikely but good for safety) */}
          {!isLoading && projects.length === 0 && (
            <div className="text-center    border border-dashed primary-border primary-rounded">
              <p className="text-gray-500">No projects found in the archive.</p>
            </div>
          )}

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
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
          )}
        </div>
      </section>
    </main>
  );
}
