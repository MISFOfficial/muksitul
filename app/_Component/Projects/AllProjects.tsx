"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import ProjectCard from './ProjectCard';

import { projectsData } from '@/lib/projectsData';

export default function AllProjects() {
    return (
        <section id="projects" className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.slice(0, 6).map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
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
                    <button className="relative px-10 py-4 bg-transparent border border-white/10 rounded-full text-white font-bold text-sm uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-[#20255e] hover:border-[#20255e] hover:scale-105 active:scale-95 flex items-center gap-3 group-hover:text-black">
                        <span className="relative z-10 transition-colors duration-300">Explore All Projects</span>
                        <ArrowUpRight size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />

                        {/* Shimmer effect / Hover background */}
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
                    </button>
                </Link>

            </motion.div>

        </section>
    )
}