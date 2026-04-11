"use client";

import React from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CmsProject } from "@/app/Global/data/useCmsProjects";
import { useRouter } from "next/navigation";

interface CmsProjectCardProps {
  project: CmsProject;
  index: number;
}

export default function CmsProjectCard({
  project,
  index,
}: CmsProjectCardProps) {
  // Map platform to brand colors
  const platformColors: Record<string, string> = {
    WordPress: "bg-[#21759b]",
    Shopify: "bg-[#95bf47]",
    Webflow: "bg-[#4353ff]",
    Wix: "bg-[#000000]",
    Squarespace: "bg-[#222222]",
  };


  return (
    <div
      onClick={() => project.liveUrl && window.open(project.liveUrl, "_blank")}
      className="group w-full cursor-pointer">
      <div className="relative primary-rounded overflow-hidden transition-all duration-500 border primary-border">
        {/* Preview Image */}
        <div className="relative h-[250px] md:h-[300px] w-full overflow-hidden">
          {project.images?.[0]?.url && (
            <Image
              src={project.images[0].url}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          )}

          {/* Glass Overlay on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4 backdrop-blur-[2px]">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                className="p-4 bg-white/10 hover:primary-color rounded-full border primary-border transition-all hover:scale-110 flex items-center gap-2 group/btn"
              >
                <span className="text-white font-bold text-xs">Live Site</span>
                <ExternalLink size={18} className="text-white" />
              </Link>
            )}
            <span className="text-[10px] font-black uppercase tracking-[0.3em] primary-text4">
              {project.platform} Project
            </span>
          </div>

          {/* Platform Badge */}
          <div className="absolute top-4 left-4 z-20">
            <div
              className={`${platformColors[project.platform] || "bg-gray-700"} text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5`}
            >
              <span>{project.platform}</span>
            </div>
          </div>

          {/* Status Badge (if any) */}
          {project.badge && (
            <div
              className={`absolute top-4 right-4 ${project.badge.color} text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg`}
            >
              {project.badge.text}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 text-white border-t primary-border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg md:text-xl font-black uppercase tracking-tight group-hover:primary-text4 transition-colors">
                {project.title}
              </h3>
              <p className="primary-text4 text-[11px] font-bold uppercase tracking-widest mt-1">
                {project.year} • {project.platform}
              </p>
            </div>
            {project.liveUrl && (
              <Link href={project.liveUrl} target="_blank">
                <ArrowUpRight
                  size={20}
                  className="text-white/20  group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                />
              </Link>
            )}
          </div>

          <p className="text-sm text-white/40 leading-relaxed line-clamp-2 mb-6 font-medium">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-black px-3 py-1.5 primary-rounded primary-text4 border primary-border  transition-all uppercase tracking-tighter"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
