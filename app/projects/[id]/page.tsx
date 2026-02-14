"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";
import { projectsData, Project } from "@/lib/projectsData";
import Image from "next/image";
import {
    ArrowLeft,
    ExternalLink,
    Github,
    Calendar,
    Tag,
    CheckCircle2,
    Database,
    Zap,
    Cpu,
    Workflow,
    AlertCircle,
    Lightbulb,
    BarChart3,
    ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectPage() {
    const { id } = useParams();
    const router = useRouter();

    // Find project by ID
    const project = projectsData.find((p) => p.id === id) as Project;

    // If project not found, show 404
    if (!project) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-black mb-4">404</h1>
                    <p className="text-gray-400 mb-8">Project not found</p>
                    <Link
                        href="/"
                        className="primary-color text-white px-6 py-3 rounded-full font-bold"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="ratio py-10">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft
                        size={20}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    Back to Projects
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Left - Project Info */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* Title & Badge */}
                        <div>
                            <div className="flex items-center gap-3 mb-4 flex-wrap">
                                <h1 className="text-4xl md:text-6xl font-black">
                                    {project.title}
                                </h1>
                                {project.badge && (
                                    <span
                                        className={`${project.badge.color} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider`}
                                    >
                                        {project.badge.text}
                                    </span>
                                )}
                            </div>
                            <div className="h-1 w-24 primary-color rounded-full mb-6"></div>
                        </div>

                        <p className="text-xl text-gray-400 leading-relaxed">
                            {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/10 hover:border-[#20255e]/50 transition-all"
                                >
                                    <Tag size={14} />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="primary-color text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-xl"
                                >
                                    <ExternalLink size={20} />
                                    Live Demo
                                </a>
                            )}
                            {project?.fgithubUrl && (
                                <a
                                    href={project?.fgithubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-2 border-white/15 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white/5 transition-all"
                                >
                                    <Github size={20} />
                                    Frontend Source Code
                                </a>
                            )}
                            {project?.bgithubUrl && (
                                <a
                                    href={project?.bgithubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-2 border-white/15 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white/5 transition-all"
                                >
                                    <Github size={20} />
                                    Backend Source Code
                                </a>
                            )}
                            {project?.githubUrl && (
                                <a
                                    href={project?.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-2 border-white/15 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white/5 transition-all"
                                >
                                    <Github size={20} />
                                    Full Source Code
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right - Project Image */}
                    <div className="lg:col-span-2 relative h-[400px] lg:h-[600px] rounded-md overflow-hidden border-2 border-white/10 group">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* Project Details */}
            <section className="ratio py-20 border-t border-white/15">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content - 2 columns */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* About Section */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black mb-6 flex items-center gap-3">
                                About This Project
                                <div className="h-1 flex-1 max-w-[100px] primary-color rounded-full"></div>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                {project.fullDescription}
                            </p>
                        </div>

                        {/* Key Features */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black mb-8 flex items-center gap-3">
                                Key Features
                                <div className="h-1 flex-1 max-w-[100px] primary-color rounded-full"></div>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.features.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 rounded-md border border-white/15 hover:borderTechnologies Used-[#20255e]/30 transition-all group"
                                    >
                                        <CheckCircle2
                                            size={20}
                                            className="text-[#20255e] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                                        />
                                        <span className="text-gray-300 leading-relaxed">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* New: Problem vs Solution */}
                        {project.problemSolution && (
                            <div className="space-y-8 pt-8 border-t border-white/15">
                                <h2 className="text-3xl font-black flex items-center gap-3 italic">
                                    Strategic Analysis
                                    <div className="h-[2px] flex-1 primary-color/30 rounded-full"></div>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 rounded-md bg-white/[0.03] border border-white/15">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#20255e] mb-4 flex items-center gap-2">
                                            <AlertCircle size={16} />
                                            The Problem
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed text-sm">
                                            {project.problemSolution.problem}
                                        </p>
                                    </div>
                                    <div className="p-6 rounded-md bg-[#20255e]/5 border border-[#20255e]/10">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#20255e] mb-4 flex items-center gap-2">
                                            <Lightbulb size={16} />
                                            The Solution
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed text-sm">
                                            {project.problemSolution.solution}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - 1 column */}
                    <div className="space-y-6">
                        {/* Technologies */}
                        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-md p-6 border border-white/15 hover:border-[#20255e]/30 transition-all">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 primary-color rounded-full"></div>
                                Technologies Used
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="text-sm px-4 py-2 rounded-full primary-color text-white font-semibold hover:scale-105 transition-transform"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-md p-6 border border-white/15 hover:border-[#20255e]/30 transition-all">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 primary-color rounded-full"></div>
                                Project Info
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-400">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                        <Calendar size={18} className="text-[#20255e]" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">Year</div>
                                        <div className="text-white font-semibold">
                                            {project.year}
                                        </div>
                                    </div>
                                </div>
                                {project.role && (
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                            <Zap size={18} className="text-[#20255e]" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">Your Role</div>
                                            <div className="text-white font-semibold flex-wrap">
                                                {project.role}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* New: Performance Metrics in Sidebar */}
                        {project.metrics && (
                            <div className="bg-gradient-to-br from-[#20255e]/5 to-transparent rounded-md p-6 border border-[#20255e]/10">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <BarChart3 size={20} className="primary-text" />
                                    Key Metrics
                                </h3>
                                <div className="space-y-6">
                                    {project.metrics.map((metric, idx) => (
                                        <div key={idx}>
                                            <div className="text-2xl font-black text-white">{metric.value}</div>
                                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#20255e]">{metric.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* New: Extended Architecture & Insights Section (Append below) */}
            {(project.architecture || project.lessons) && (
                <section className="ratio py-20 border-t border-white/15 space-y-20">
                    {/* Architecture Map */}
                    {project.architecture && (
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black mb-12 flex items-center gap-4">
                                <Workflow className="text-[#20255e]" size={32} />
                                System Architecture
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="p-8 rounded-md bg-white/[0.02] border border-white/15 hover:bg-white/[0.04] transition-all">
                                    <Cpu className="text-blue-400 mb-6" size={24} />
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Frontend</h4>
                                    <p className="text-white font-bold">{project.architecture.frontend}</p>
                                </div>
                                <div className="p-8 rounded-md bg-white/[0.02] border border-white/15 hover:bg-white/[0.04] transition-all">
                                    <Zap className="text-yellow-400 mb-6" size={24} />
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Backend</h4>
                                    <p className="text-white font-bold">{project.architecture.backend}</p>
                                </div>
                                <div className="p-8 rounded-md bg-white/[0.02] border border-white/15 hover:bg-white/[0.04] transition-all">
                                    <Database className="text-green-400 mb-6" size={24} />
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Database</h4>
                                    <p className="text-white font-bold">{project.architecture.database}</p>
                                </div>
                                <div className="p-8 rounded-md bg-white/[0.02] border border-white/15 hover:bg-white/[0.04] transition-all">
                                    <ShieldCheck className="text-purple-400 mb-6" size={24} />
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Infra</h4>
                                    <p className="text-white font-bold">{project.architecture.infrastructure.join(", ")}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Lessons Learned */}
                    {project.lessons && (
                        <div className="p-8 md:p-12 rounded-md bg-gradient-to-br from-[#20255e]/10 to-transparent border border-white/15">
                            <h2 className="text-3xl font-black mb-10 flex items-center gap-3">
                                <Lightbulb className="text-yellow-400" />
                                Key Engineering Takeaways
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {project.lessons.map((lesson, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#20255e]">
                                            0{idx + 1}
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {lesson}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            )}

            {/* CTA Section */}
            <section className="ratio py-20 border-t border-white/15">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">
                        Interested in a Similar Project?
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        Let's collaborate and bring your vision to life with cutting-edge
                        technology and creative design.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 primary-color text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-xl"
                    >
                        Get In Touch
                        <ArrowLeft size={20} className="rotate-180" />
                    </Link>
                </div>
            </section>
        </main>
    );
}


