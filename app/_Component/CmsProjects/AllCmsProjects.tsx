"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Layout } from "lucide-react";
import Link from "next/link";
import CmsProjectCard from "./CmsProjectCard";
import { cmsProjectsData } from "@/lib/cmsProjectsData";
import CmsProjects from "./CmsProjects";
import { useGetAllCmsProjects } from "@/app/Global/data/useCmsProjects";

export default function AllCmsProjects() {

  const { allCmsProjects, isError, isLoading, refetch } = useGetAllCmsProjects()
  console.log(allCmsProjects)

  return (
    <section id="cms-grid" className="">
      <CmsProjects />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {cmsProjectsData.slice(0, 3).map((project, index) => (
          <CmsProjectCard key={project.id} project={project} index={index} />
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

        <Link href="/projects#cms-projects" className="group">
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
