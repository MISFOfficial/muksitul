"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Layout } from "lucide-react";
import Link from "next/link";
import CmsProjectCard from "./CmsProjectCard";
import CmsProjectCardSkeleton from "./CmsProjectCardSkeleton";
import CmsProjects from "./CmsProjects";
import { useGetAllCmsProjects, CmsProject } from "@/app/Global/data/useCmsProjects";

export default function AllCmsProjects() {
  const { allCmsProjects, isLoading, isError, refetch } = useGetAllCmsProjects(3);

  const projects = allCmsProjects?.pages.flatMap((page: any) => page) || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        {[1, 2, 3].map((i) => (
          <CmsProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-[400px] primary-text4">
        <p>Failed to load CMS projects.</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-6 py-2 bg-white/10 hover:bg-[#FF5652] rounded-full transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section id="cms-project-grid">
      <CmsProjects />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        {projects.map((project: CmsProject, index: number) => (
          <CmsProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 flex flex-col items-center gap-8"
      >
        <div className="flex items-center gap-4 text-white/20">
          <div className="h-px w-20 bg-white/10" />
          <Layout size={20} />
          <div className="h-px w-20 bg-white/10" />
        </div>

        <Link href="/allCMHProjects" className="group">
          <button className="relative px-12 py-5 bg-transparent border-2 primary-border rounded-full text-white font-black text-sm uppercase overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-3">
            <span className="relative z-10">Explore All CMS Work</span>
            <ArrowUpRight
              size={20}
              className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
            {/* Background Fill */}
            <div className="absolute inset-0 primary-color scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-0" />
          </button>
        </Link>
      </motion.div>
    </section>
  );
}
