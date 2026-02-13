"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navigation from '../_Component/Navigation/Navigaton';
import Footer from '../_Component/Footer/Footer';
import ProjectCard from '../_Component/Projects/ProjectCard';
import { projectsData } from '@/lib/projectsData';

import { useRouter } from 'next/navigation';

export default function ProjectsPage() {
    const router = useRouter();

    return (
        <main className="bg-black min-h-screen ratio">
            {/* Specialized Header */}
            <section className=" py-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-color/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                <div className=" relative z-10">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>



                    <div className="flex items-center gap-3 mb-6">
                        <LayoutGrid className="text-primary-color2" size={24} />
                        <span className="text-primary-color2 font-bold uppercase tracking-widest text-sm underline decoration-primary-color2/30">Archive</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
                        Engineering <br />
                        <span className="text-neutral-500 italic">Showcase</span>
                    </h1>

                    <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
                        A comprehensive directory of technical solutions, architectural prototypes, and production-ready applications built with a focus on scalability and performance.
                    </p>
                </div>
            </section>

            {/* Full Projects Grid */}
            <section className="pb-32">
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projectsData.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>

                    {/* Empty State if no projects (unlikely but good for safety) */}
                    {projectsData.length === 0 && (
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                            <p className="text-gray-500">No projects found in the archive.</p>
                        </div>
                    )}
                </div>
            </section>


        </main>
    );
}