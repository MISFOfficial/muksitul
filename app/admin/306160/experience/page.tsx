"use client";

import React from "react";
import {
  Briefcase as BriefcaseIcon,
  Plus,
  MapPin,
  Calendar,
  Building2,
  Users,
  Link as LinkIcon,
  Search,
  RefreshCw,
  MoreVertical,
  Trash2,
  Edit,
  ArrowUpRight,
} from "lucide-react";
import { useGetAllExperience } from "./DataHub";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Skeleton Component for compact layout
const Skeleton = () => (
  <div className="primary-rounded border primary-border animate-pulse bg-white/[0.02] p-6 flex flex-col md:flex-row items-center gap-6">
    <div className="w-16 h-16 rounded-xl bg-white/5 shrink-0" />
    <div className="flex-1 space-y-3">
      <div className="h-6 w-48 bg-white/5 rounded" />
      <div className="h-4 w-32 bg-white/5 rounded" />
    </div>
    <div className="hidden md:flex flex-col items-end gap-3 shrink-0">
      <div className="h-8 w-24 bg-white/5 primary-rounded" />
      <div className="h-4 w-20 bg-white/5 primary-rounded" />
    </div>
  </div>
);

export default function ExperiencePage() {
  const route = useRouter();

  const { allExperience, isLoading, isError, refetch } = useGetAllExperience();

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center    text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-6 primary-rounded border border-red-500/20 text-red-500 mb-6 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
          <RefreshCw size={48} className="animate-spin-slow" />
        </div>
        <h2 className="text-3xl font-bold mb-2 tracking-tight">
          Failed to load data
        </h2>
        <p className="text-white/40 max-w-md mx-auto font-medium mb-8">
          There was an error while trying to fetch the experiences. Please check
          your connection and try again.
        </p>
        <button
          onClick={() => refetch()}
          className="px-8 py-3 border primary-border hover:border-[#0abab5] primary-text primary-rounded font-bold transition-all uppercase tracking-widest text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Sub Header / Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative group flex-1 max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#0abab5] transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search experiences by company or role..."
            className="w-full bg-transparent border primary-border primary-rounded py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all text-sm font-medium tracking-wide"
          />
        </div>
        <Link
          href="/admin/306160/experience/create"
          className="flex items-center justify-center gap-2 px-8 py-3.5 primary-color2 hover:bg-[#0abab5]/90 text-black font-black uppercase tracking-[0.1em] primary-rounded transition-all shadow-[0_0_25px_rgba(10,186,181,0.2)] text-xs"
        >
          <Plus size={20} />
          <span>Add Experience</span>
        </Link>
      </div>

      {/* Main List - Compact Horizontal Design */}
      <div className="flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)
        ) : allExperience && allExperience.length > 0 ? (
          allExperience.map((exp: any) => (
            <div
              onClick={() => route.push(`/admin/306160/experience/${exp._id}`)}
              key={exp._id}
              className="group primary-rounded cursor-pointer p-6 border primary-border bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04] hover:border-[#0abab5]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
            >
              {/* Left Side: Thumbnail & Content */}
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 primary-rounded border primary-border  flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                  {exp.image?.url ? (
                    <Image
                      width={100}
                      height={100}
                      src={exp.image.url}
                      alt={exp.company}
                      className="w-full h-full object-cover primary-rounded transition-transform duration-500 group-hover:scale-110"
                      onError={(e: any) => {
                        e.target.src =
                          "https://ui-avatars.com/api/?name=" +
                          exp.company +
                          "&background=1a1a1a&color=fff";
                      }}
                    />
                  ) : (
                    <BriefcaseIcon size={28} className="text-white/20" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold tracking-tight text-white primary-text transition-colors leading-tight">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 group-hover:text-white/90 transition-colors">
                    <span className="text-base font-semibold text-white/50">
                      {exp.company}
                    </span>
                    <span className="h-1 w-1 primary-rounded bg-white/20" />
                    <div className="flex items-center gap-1.5 text-white/30 text-sm font-medium">
                      <MapPin size={14} />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Meta & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 primary-border">
                <div className="flex flex-col items-start md:items-end gap-1.5">
                  <div className="flex items-center gap-2 px-4 py-2 primary-rounded border primary-border bg-white/[0.02] primary-text text-xs font-black uppercase tracking-widest shadow-inner">
                    <Calendar size={14} />
                    {exp.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] md:pr-1">
                    <Users size={12} />
                    Team: {exp.teamSize || "N/A"}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="primary-rounded border primary-border p-3 text-white/40 hover:text-[#0abab5] hover:border-[#0abab5]/50 hover:bg-[#0abab5]/5 transition-all active:scale-95 shadow-xl">
                    <Edit size={18} />
                  </button>
                  <button className="primary-rounded border primary-border p-3 text-white/40 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/5 transition-all active:scale-95 shadow-xl">
                    <Trash2 size={18} />
                  </button>
                  <div className="hidden lg:flex w-10 h-10 primary-rounded border primary-border items-center justify-center group-hover:bg-[#0abab5] group-hover:border-[#0abab5] transition-all duration-300">
                    <ArrowUpRight
                      size={18}
                      className="text-white group-hover:scale-110 transition-transform"
                    />
                  </div>
                </div>
              </div>

              {/* Subtle hover glow */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#0abab5]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))
        ) : (
          <div className="   flex flex-col items-center justify-center text-center">
            <div className="p-8 primary-rounded border primary-border text-white/10 mb-6">
              <BriefcaseIcon size={64} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">
              No experiences found
            </h3>
            <p className="text-white/30 max-w-xs mx-auto font-medium">
              Start by adding your first professional experience to showcase
              your career journey.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
