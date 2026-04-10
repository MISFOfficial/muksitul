"use client";

export const runtime = "edge";
export const dynamic = "force-dynamic";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetExperienceById } from "@/app/Global/data/useExperience";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Users,
  Globe,
  ExternalLink,
  Zap,
  Award,
  Building2,
} from "lucide-react";
import Link from "next/link";
import Navigaton from "@/app/_Component/Navigation/Navigaton";
import Footer from "@/app/_Component/Footer/Footer";

export default function ExperienceDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { experience, isLoading, isError } = useGetExperienceById(id as string);

  if (isLoading) {
    return (
      <main className="relative min-h-screen">

        <div className="ratio py-10">
          {/* Back Button Skeleton */}
          <div className="h-10 w-24 bg-white/5 rounded-full mb-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-8 space-y-16">
              {/* Hero Header Skeleton */}
              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 md:w-24 md:h-24 primary-rounded bg-white/5 border primary-border"></div>
                  <div className="space-y-3 flex-1">
                    <div className="h-6 w-32 bg-white/10 rounded-full"></div>
                    <div className="h-12 md:h-16 w-3/4 bg-white/5 rounded-lg"></div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="h-10 w-40 bg-white/5 rounded-full"></div>
                  <div className="h-10 w-40 bg-white/5 rounded-full"></div>
                  <div className="h-10 w-32 bg-white/5 rounded-full"></div>
                </div>

                <div className="space-y-3">
                  <div className="h-4 w-full bg-white/5 rounded-full"></div>
                  <div className="h-4 w-full bg-white/5 rounded-full"></div>
                  <div className="h-4 w-2/3 bg-white/5 rounded-full"></div>
                </div>
              </div>

              {/* Responsibilities Skeleton */}
              <div className="space-y-8">
                <div className="h-10 w-64 bg-white/5 rounded-lg"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-20 w-full bg-white/5 primary-rounded border primary-border"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-4 space-y-6">
              <div className="h-48 w-full bg-white/5 primary-rounded border primary-border"></div>
              <div className="h-64 w-full bg-white/5 primary-rounded border primary-border"></div>
              <div className="h-80 w-full bg-white/5 primary-rounded border primary-border"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !experience) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
        <Briefcase size={64} className="text-[#FF0055] mb-4" />
        <h1 className="text-3xl font-bold mb-4 uppercase tracking-tighter">
          Experience Not Found
        </h1>
        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 bg-white text-black rounded-full font-black text-xs uppercase"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen selection:bg-[#FF0055] selection:text-white">

      <div className="ratio py-10">
        {/* Back Button */}
        <div className="mb-12">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-3 cursor-pointer text-white/60 hover:text-white group"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <ArrowLeft size={18} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">
              Back
            </span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            {/* Company & Role Header */}
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 md:w-24 md:h-24 primary-rounded primary-text4 flex items-center justify-center p-4 border primary-border overflow-hidden relative">
                  {experience.image?.url && (
                    <img
                      src={experience.image.url}
                      alt={experience.company}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 primary-rounded bg-[#FF0055]/10 text-[#FF0055] border border-[#FF0055]/20 mb-3">
                    <Building2 size={14} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      {experience.company}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                    {experience.role}
                  </h1>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 primary-text4 rounded-full border primary-border text-[#FF0055] text-sm font-bold tracking-wider">
                  <Calendar className="w-4 h-4" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 primary-text4 rounded-full border primary-border text-gray-400 text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
                {experience.teamSize && (
                  <div className="flex items-center gap-2 px-4 py-2 primary-text4 rounded-full border primary-border text-gray-400 text-sm font-medium">
                    <Users className="w-4 h-4" />
                    <span>{experience.teamSize} Team</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-white/50 text-lg leading-relaxed font-medium">
                {experience.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
                <Zap size={24} className="text-[#FF0055]" />
                Key Responsibilities
                <div className="h-[2px] flex-1 max-w-[100px] bg-[#FF0055]/30 rounded-full" />
              </h2>
              <div className="space-y-4">
                {experience.responsibilities.map((item: any, idx: any) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-start group p-4 primary-rounded bg-white/[0.02] border primary-border hover:bg-white/[0.04] hover:border-[#FF0055]/20"
                  >
                    <div className="shrink-0 w-7 h-7 rounded-full border border-[#FF0055]/40 flex items-center justify-center mt-0.5 group-hover:bg-[#FF0055] group-hover:border-[#FF0055]">
                      <span className="text-[10px] font-black text-white">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="text-white/60 group-hover:text-white/80 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
                <Award size={24} className="text-[#FF0055]" />
                Achievements
                <div className="h-[2px] flex-1 max-w-[100px] bg-[#FF0055]/30 rounded-full" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experience.achievements.map((achievement: any, idx: any) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-5 primary-rounded bg-gradient-to-br from-[#FF0055]/5 to-transparent border border-[#FF0055]/10 hover:border-[#FF0055]/30 group"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-[#FF0055] flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-300 leading-relaxed text-sm">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              {/* Technologies */}
              <div className="p-8 primary-rounded bg-white/[0.03] border primary-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF0055] opacity-[0.03] blur-3xl -mr-16 -mt-16" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF0055] mb-6">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech: any, idx: any) => (
                    <span
                      key={idx}
                      className="text-sm px-4 py-2 primary-rounded primary-text4 border primary-border text-white/80 font-semibold hover:border-[#FF0055]/40 hover:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company Info */}
              {experience.companyDescription && (
                <div className="p-8 primary-rounded bg-white/[0.03] border primary-border">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF0055] mb-6 flex items-center gap-2">
                    <Building2 size={14} />
                    About {experience.company}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6">
                    {experience.companyDescription}
                  </p>
                  {experience.companyWebsite && (
                    <a
                      href={experience.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#FF0055] text-xs font-bold uppercase tracking-widest hover:underline"
                    >
                      <Globe size={14} />
                      Visit Website
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              )}

              {/* Quick Stats */}
              <div className="p-8 primary-rounded bg-gradient-to-br from-[#FF0055]/5 to-transparent border border-[#FF0055]/10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF0055] mb-6">
                  Quick Stats
                </h3>
                <div className="space-y-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase size={12} /> Role
                    </span>
                    <span className="text-lg font-bold text-white">
                      {experience.role}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                      <MapPin size={12} /> Work Mode
                    </span>
                    <span className="text-lg font-bold text-white">
                      {experience.location}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                      <Calendar size={12} /> Duration
                    </span>
                    <span className="text-lg font-bold text-white">
                      {experience.duration}
                    </span>
                  </div>
                  {experience.teamSize && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                        <Users size={12} /> Team Size
                      </span>
                      <span className="text-lg font-bold text-white">
                        {experience.teamSize} Members
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="ratio  py-20 border-t primary-border">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
            Want to Work Together?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            I&apos;m always open to discussing new opportunities and exciting
            projects.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#FF0055] text-white px-8 py-4 rounded-full font-bold shadow-xl"
          >
            Get In Touch
            <ArrowLeft size={20} className="rotate-180" />
          </Link>
        </div>
      </section>

    </main>
  );
}
