"use client";

import React, { useState } from "react";
import {
  Palette,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Search,
  ExternalLink,
  Figma,
  Globe,
  AlertCircle,
} from "lucide-react";
import {
  useGetAllDesigns,
  useDeleteDesign,
} from "@/app/Global/data/useDesigns";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DesignPage() {
  const router = useRouter();
  const {
    allDesigns,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAllDesigns();
  const { mutate: deleteDesign, isPending: isDeleting } = useDeleteDesign();

  const designs = allDesigns?.pages.flatMap((page: any) => page) || [];

  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete design "${title}"?`)) {
      deleteDesign(id, {
        onSuccess: () => toast.success("Design deleted from collection"),
        onError: (err: any) =>
          toast.error(err.response?.data?.message || "Failed to delete design"),
      });
    }
  };

  const filteredDesigns = designs?.filter(
    (d: any) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some((t: string) =>
        t.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="p-6 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 shadow-2xl shadow-red-500/10">
          <AlertCircle size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-serif text-white uppercase tracking-widest">
            Connection Interrupted
          </h2>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] max-w-xs mx-auto">
            Failed to retrieve the design collection. Please verify your
            connection or try again.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-white/10 border primary-border text-white font-black uppercase tracking-[0.2em] text-[10px] primary-rounded transition-all"
        >
          <RefreshCw size={14} />
          <span>Retry Sync</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#0abab5]/10 border border-[#0abab5]/20 rounded-2xl text-[#0abab5]">
            <Palette size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-serif text-white tracking-widest uppercase">
              Designs
            </h1>
            <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em] mt-1">
              Visual Arts Management
            </p>
          </div>
        </div>
        <Link
          href="/admin/306160/design/create"
          className="flex items-center gap-3 px-6 py-3 primary-color2 hover:bg-[#0abab5]/90 text-black font-black uppercase tracking-[0.2em] text-[10px] primary-rounded transition-all shadow-lg hover:shadow-[#0abab5]/20"
        >
          <Plus size={16} strokeWidth={3} />
          <span>New Project</span>
        </Link>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row items-center gap-4 bg-white/5 p-2 primary-rounded border primary-border">
        <div className="relative flex-1 group w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-[#0abab5] transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="SEARCH BY TITLE OR TAG..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none py-3 pl-12 pr-4 focus:outline-none text-[10px] font-black uppercase tracking-[0.2em] text-white placeholder:text-white/5"
          />
        </div>
        <button
          onClick={() => refetch()}
          className="p-3 border primary-border primary-rounded text-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Designs List */}
      <div className="grid grid-cols-1 gap-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-24 primary-rounded border primary-border animate-pulse bg-white/[0.01]"
            />
          ))
          : filteredDesigns?.map((design: any) => (
            <div
              key={design._id}
              className="group flex flex-col md:flex-row items-center gap-6 bg-[#0a0a0a]/40 border primary-border primary-rounded p-4 px-6 hover:bg-[#0f0f0f] hover:border-[#0abab5]/20 transition-all duration-300"
            >
              {/* Preview */}
              <div className="w-24 h-16 md:w-32 md:h-20 primary-rounded overflow-hidden border primary-border shrink-0 bg-black relative">
                <Image
                  src={design.images?.[0]?.url || design.image?.url}
                  alt={design.title || "Design Preview"}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase primary-text transition-colors">
                    {design.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#0abab5]/60">
                      {design.year}
                    </span>
                    {design.badge && (
                      <span
                        className={`text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full text-white ${design.badge.color}`}
                      >
                        {design.badge.text}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 max-w-[300px]">
                  {design.tags.slice(0, 3).map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="text-[8px] font-black uppercase tracking-tighter px-2 py-1 bg-white/5 border primary-border text-white/30 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {design.tags.length > 3 && (
                    <span className="text-[8px] font-black text-white/10">
                      +{design.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l primary-border pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-end">
                <Link
                  href={`/admin/306160/design/${design._id}`}
                  className="w-10 h-10 flex items-center justify-center primary-rounded border primary-border text-white/20 hover:border-[#0abab5]/30 hover:text-white transition-all bg-black/20"
                >
                  <Edit size={14} />
                </Link>
                <button
                  onClick={() => handleDelete(design._id, design.title)}
                  className="w-10 h-10 flex items-center justify-center primary-rounded border primary-border text-white/20 hover:text-red-500 hover:border-red-500/30 transition-all bg-black/20"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
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
                <span>Load More Designs</span>
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
