"use client";

export const runtime = "edge";
export const dynamic = "force-dynamic";

import { useParams, useRouter } from "next/navigation";
import { useGetProjectsById } from "@/app/Global/data/useProjects";
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
import Navigaton from "@/app/_Component/Navigation/Navigaton";
import Footer from "@/app/_Component/Footer/Footer";
import ContactModal from "@/app/Global/ContactModal";
import { useState } from "react";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { formatRole } from "@/app/Global/utils";

export default function ProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch project by ID from API
  const {
    allProjects: project,
    isLoading,
    isError,
  } = useGetProjectsById(id as string);

  // If loading, show skeleton
  if (isLoading) {
    return (
      <main className="relative min-h-screen">


        <div className="ratio py-10 animate-pulse">
          {/* Back Button Skeleton */}
          <div className="h-10 w-24 bg-white/5 rounded-full mb-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left - Project Info Skeleton */}
            <div className="space-y-6 lg:col-span-1">
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="h-12 md:h-16 w-3/4 bg-white/5 rounded-lg"></div>
                  <div className="h-8 w-20 bg-white/5 rounded-full"></div>
                </div>
                <div className="h-1 w-24 bg-white/10 rounded-full"></div>
              </div>

              <div className="space-y-3">
                <div className="h-4 w-full bg-white/5 rounded-full"></div>
                <div className="h-4 w-full bg-white/5 rounded-full"></div>
                <div className="h-4 w-2/3 bg-white/5 rounded-full"></div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-20 bg-white/5 rounded-full"
                  ></div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="h-14 w-40 bg-white/5 rounded-full"></div>
                <div className="h-14 w-40 bg-white/5 rounded-full"></div>
              </div>
            </div>

            {/* Right - Project Image Skeleton */}
            <div className="lg:col-span-2 h-[400px] lg:h-[600px] bg-white/5 primary-rounded border-2 border-white/5"></div>
          </div>
        </div>
      </main>
    );
  }

  // If project not found or error, show 404
  if (isError || !project) {
    return (
      <div className="min-h-screen   text-white flex items-center justify-center">
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
    <main className="relative min-h-screen selection:primary-color2 selection:text-white">


      {/* Hero Section */}
      <section className="ratio py-10">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 group"
        >
          <ArrowLeft
            size={20}
            className=""
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
                  <div
                    style={{
                      backgroundColor: project.badge.color,
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-sm mb-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      {project.badge.text}
                    </span>
                  </div>
                )}
              </div>
              <div className="h-1 w-24 primary-color rounded-full mb-6"></div>
            </div>

            <p className="text-xl text-gray-400 leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: any, idx: any) => (
                <span
                  key={idx}
                  className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-full primary-text4  border primary-border hover:border-[#20255e]/50"
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
                  className="primary-color text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-xl"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              )}
              {project?.frontendGithubUrl && (
                <a
                  href={project?.frontendGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 primary-border text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:primary-text4"
                >
                  <Github size={20} />
                  Frontend Source Code
                </a>
              )}
              {project?.backendGithubUrl && (
                <a
                  href={project?.backendGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 primary-border text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:primary-text4"
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
                  className="border-2 primary-border text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:primary-text4"
                >
                  <Github size={20} />
                  Full Source Code
                </a>
              )}
            </div>
          </div>

          {/* Right - Project Image Gallery with Swiper */}
          <div className="lg:col-span-2 relative h-[400px] lg:h-[600px] primary-rounded overflow-hidden border-2 primary-border group project-swiper">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              // navigation
              pagination={{ clickable: true }}
              className="h-full w-full"
            >
              {project.images.map((image: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <div className="relative h-full w-full">
                    <Image
                      src={image.url || image}
                      alt={`${project.title} - image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none z-1"></div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="ratio  pt-10  border-t primary-border">
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
                {project.features.map((feature: any, idx: any) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-5 primary-rounded bg-white/5 to-transparent border primary-border "
                  >
                    <CheckCircle2
                      size={20}
                      className="primary-text shrink-0 mt-0.5"
                    />
                    <span className="text-gray-300 leading-relaxed text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* New: Problem vs Solution */}
            {project.problemSolution && (
              <div className="space-y-8 pt-8 border-t primary-border">
                <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3">
                  <Zap size={24} className="" />
                  Strategic Analysis
                  <div className="h-[2px] flex-1 max-w-[100px] primary-color rounded-full" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 primary-rounded bg-white/5 border primary-border hover:border-[#FF0055]/20">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-4 flex items-center gap-2">
                      <AlertCircle size={16} />
                      The Problem
                    </h3>
                    <p className="text-white/50 leading-relaxed text-sm">
                      {project.problemSolution.problem}
                    </p>
                  </div>
                  <div className="p-6 primary-rounded bg-white/5 border primary-border">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-4 flex items-center gap-2">
                      <Lightbulb size={16} />
                      The Solution
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm font-medium">
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
            <div className="p-8 primary-rounded bg-white/5 border primary-border relative overflow-hidden">

              <h3 className="text-xl font-bold text-white mb-6">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: any, idx: any) => (
                  <span
                    key={idx}
                    className="text-sm px-4 py-2 primary-rounded primary-color border primary-border text-white/70 hover:text-white cursor-pointer font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="p-8 primary-rounded bg-white/5 border primary-border relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-6">
                Project Details
              </h3>
              <div className="space-y-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={12} /> Year
                  </span>
                  <span className="text-lg font-bold text-white">
                    {project.year}
                  </span>
                </div>
                {project.role && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                      <Zap size={12} /> Project Role
                    </span>
                    <span className="text-lg font-bold text-white">
                      {formatRole(project.role)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Metrics in Sidebar */}
            {project.metrics &&
              project.metrics.some((m: any) => m.label && m.value) && (
                <div className="bg-linear-to-br from-[#20255e]/20 to-[#20255e]/40 primary-rounded p-6 border border-[#20255e]/10">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <BarChart3 size={20} className="primary-text2" />
                    Key Metrics
                  </h3>
                  <div className="space-y-6">
                    {project.metrics
                      .filter((m: any) => m.label && m.value)
                      .map((metric: any, idx: number) => (
                        <div key={idx}>
                          <div className="text-2xl font-black text-white">
                            {metric.value}
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-[0.2em] primary-text2">
                            {metric.label}
                          </div>
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
        <section className="ratio mt-20  pt-10  border-t primary-border space-y-20">
          {/* Architecture Map */}
          {project.architecture && (
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-12 flex items-center gap-4">
                <Workflow className="primary-text2" size={32} />
                System Architecture
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-8 primary-rounded bg-white/5 border primary-border hover:bg-white/4">
                  <Cpu className="text-blue-400 mb-6" size={24} />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Frontend
                  </h4>
                  <p className="text-white font-bold">
                    {project.architecture.frontend}
                  </p>
                </div>
                <div className="p-8 primary-rounded bg-white/5 border primary-border hover:bg-white/4">
                  <Zap className="text-yellow-400 mb-6" size={24} />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Backend
                  </h4>
                  <p className="text-white font-bold">
                    {project.architecture.backend}
                  </p>
                </div>
                <div className="p-8 primary-rounded bg-white/5 border primary-border hover:bg-white/4">
                  <Database className="text-green-400 mb-6" size={24} />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Database
                  </h4>
                  <p className="text-white font-bold">
                    {project.architecture.database}
                  </p>
                </div>
                <div className="p-8 primary-rounded bg-white/5 border primary-border hover:bg-white/4">
                  <ShieldCheck className="text-purple-400 mb-6" size={24} />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Infra
                  </h4>
                  <p className="text-white font-bold">
                    {project.architecture.infrastructure.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Lessons Learned */}
          {project.lessons && (
            <div className="p-8 md:p-12  bg-linear-to-br from-[#20255e]/20 to-[#20255e]/40 primary-rounded border border-[#20255e]/10">
              <h2 className="text-3xl font-black mb-10 flex items-center gap-3">
                <Lightbulb className="text-yellow-400" />
                Key Engineering Takeaways
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.lessons.map((lesson: any, idx: any) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full primary-color2 flex items-center justify-center shrink-0 text-xs font-bold ">
                      0{idx + 1}
                    </div>
                    <p className="text-gray-400 text-sm  leading-relaxed">
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
      <section className="ratio  my-20 ">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Interested in a Similar Project?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's collaborate and bring your vision to life with cutting-edge
            technology and creative design.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 primary-color2 text-white px-8 py-4 rounded-full font-bold shadow-xl cursor-pointer"
          >
            Get In Touch
            <ArrowLeft size={20} className="rotate-180" />
          </button>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
