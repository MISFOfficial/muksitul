"use client";

import React from "react";
import {
  FolderDot,
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
import {
  useGetAllProjects,
  useDeleteProject,
} from "@/app/Global/data/useProjects";
import Link from "next/link";
import { toast } from "sonner";
import { ROLE_OPTIONS } from "../experience/RoleOptions";

// Skeleton Component
const Skeleton = () => (
  <div className="primary-rounded border primary-border animate-pulse overflow-hidden bg-[#121212]">
    <div className="h-[280px] w-full bg-[#1a1a1a]" />
    <div className="p-5 space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-6 w-32 bg-white/5 primary-rounded" />
        <div className="h-4 w-12 bg-white/5 primary-rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-white/5 primary-rounded" />
        <div className="h-3 w-2/3 bg-white/5 primary-rounded" />
      </div>
      <div className="flex gap-2 pt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 w-16 bg-white/5 primary-rounded" />
        ))}
      </div>
    </div>
  </div>
);

export default function ProjectsPage() {
  const {
    allProjects,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAllProjects();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const projects = allProjects?.pages.flatMap((page: any) => page) || [];

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id, {
        onSuccess: () => {
          toast.success("Project deleted successfully");
          refetch();
        },
        onError: () => {
          toast.error("Failed to delete project");
        },
      });
    }
  };

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
          There was an error while trying to fetch the projects. Please check
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
            placeholder="Search projects by company or role..."
            className="w-full bg-transparent border primary-border primary-rounded py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all text-sm font-medium tracking-wide"
          />
        </div>
        <Link
          href="/admin/306160/projects/create"
          className="flex items-center justify-center gap-2 px-8 py-3.5 primary-color2 hover:bg-[#0abab5]/90 text-black font-black uppercase tracking-[0.1em] primary-rounded transition-all shadow-[0_0_25px_rgba(10,186,181,0.2)] text-xs"
        >
          <Plus size={20} />
          <span>Add New Projects</span>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)
        ) : projects && projects.length > 0 ? (
          projects.map((project: any) => (
            <div
              key={project._id}
              className="group primary-rounded border primary-border transition-all duration-300 bg-[#121212] overflow-hidden hover:shadow-2xl hover:shadow-white/5"
            >
              {/* Image Area - Exactly like main ProjectCard */}
              <div className="relative h-[280px] w-full overflow-hidden bg-[#1a1a1a]">
                {project.images && project.images.length > 0 ? (
                  <img
                    src={
                      project.images[0].url ||
                      `https://api.varaniben.com/images/${project.images[0]}`
                    }
                    alt={project.company}
                    className="w-full h-full object-cover group-hover:scale-110 duration-300 transition-transform"
                    onError={(e: any) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/5 opacity-50">
                    <FolderDot size={64} />
                  </div>
                )}

                {/* Admin Actions Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
                  <Link
                    href={`/admin/306160/projects/${project._id}/edit`}
                    className="primary-color text-white px-5 py-2.5 primary-rounded font-bold flex items-center gap-2 hover:bg-[#232c66]/90 transition-all active:scale-95 shadow-xl"
                  >
                    <Edit size={16} /> Edit Details
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id, project.title)}
                    disabled={isDeleting}
                    className="bg-red-500/10 border border-red-500/50 backdrop-blur-md text-red-500 p-2.5 primary-rounded hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-xl disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Info Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="primary-color text-white text-[10px] font-black px-3 py-1.5 primary-rounded uppercase tracking-widest shadow-xl">
                    {project.duration}
                  </div>
                </div>
              </div>

              {/* Footer Area - Exactly like main ProjectCard */}
              <div className="p-6 text-white">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:primary-text transition-colors duration-300">
                      {ROLE_OPTIONS.find((opt) => opt.value === project.role)
                        ?.label || project.role}
                    </h3>
                    <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
                      <Building2 size={12} className="primary-text" />
                      {project.company}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-white/20 group-hover:primary-text transition-all duration-300"
                  />
                </div>

                <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">
                  {project.description}
                </p>

                <div className="flex items-end flex-wrap gap-2">
                  {project.technologies
                    ?.slice(0, 3)
                    .map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="text-[11px] font-black px-3 py-1.5 primary-rounded primary-color text-white uppercase tracking-widest"
                      >
                        {tech}
                      </span>
                    ))}
                  {project.technologies?.length > 3 && (
                    <span className="text-[11px] font-bold text-white/20 uppercase tracking-widest mb-1.5 ml-1">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full    flex flex-col items-center justify-center text-center">
            <div className="p-8 primary-rounded border primary-border text-white/10 mb-6">
              <FolderDot size={64} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">
              No projects found
            </h3>
            <p className="text-white/30 max-w-xs mx-auto font-medium">
              Start by adding your first project or experience module to
              showcase your work in the main portfolio.
            </p>
          </div>
        )}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="flex items-center gap-3 px-10 py-4 border primary-border hover:border-[#0abab5] primary-text primary-rounded font-black uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_30px_rgba(10,186,181,0.15)] disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isFetchingNextPage ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Load More Projects</span>
                <Plus
                  size={20}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
