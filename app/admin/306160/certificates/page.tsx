"use client";

import React from "react";
import {
  Award,
  Plus,
  Calendar,
  Building2,
  Star,
  Link as LinkIcon,
  Search,
  RefreshCw,
  Trash2,
  Edit,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { useGetAllCertificates, useDeleteCertificate } from "./DataHub";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

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

export default function CertificatesPage() {
  const router = useRouter();
  const {
    allCertificates,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAllCertificates();
  const { mutate: deleteCertificate } = useDeleteCertificate();

  const certificates =
    allCertificates?.pages.flatMap((page: any) => page) || [];

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteCertificate(id, {
        onSuccess: () => toast.success("Certificate deleted successfully"),
        onError: () => toast.error("Failed to delete certificate"),
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
          There was an error while trying to fetch certificates.
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
    <div className="space-y-10 ">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative group flex-1 max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#0abab5] transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search certificates..."
            className="w-full bg-transparent border primary-border primary-rounded py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#0abab5]/50 focus:ring-1 focus:ring-[#0abab5]/20 transition-all text-sm font-medium tracking-wide"
          />
        </div>
        <Link
          href="/admin/306160/certificates/create"
          className="flex items-center justify-center gap-2 px-8 py-3.5 primary-color2 hover:bg-[#0abab5]/90 text-black font-black uppercase tracking-[0.1em] primary-rounded transition-all shadow-[0_0_25px_rgba(10,186,181,0.2)] text-xs"
        >
          <Plus size={20} />
          <span>Add Certificate</span>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)
        ) : certificates && certificates.length > 0 ? (
          certificates.map((cert: any) => (
            <div
              onClick={() =>
                router.push(`/admin/306160/certificates/${cert._id}`)
              }
              key={cert._id}
              className="group primary-rounded cursor-pointer p-6 border primary-border bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04] hover:border-[#0abab5]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 primary-rounded border primary-border flex items-center justify-center overflow-hidden shrink-0 shadow-lg bg-black/40">
                  {cert.image?.url ? (
                    <Image
                      width={100}
                      height={100}
                      src={cert.image.url}
                      alt={cert.title}
                      className="w-full h-full object-cover primary-rounded transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <Award size={28} className="primary-text opacity-40" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold tracking-tight text-white primary-text transition-colors leading-tight">
                    {cert.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 group-hover:text-white/90 transition-colors">
                    <div className="flex items-center gap-1.5 text-white/50 text-sm font-semibold">
                      <Building2 size={14} />
                      {cert.provider}
                    </div>
                    <span className="hidden sm:block h-1 w-1 primary-rounded bg-white/20" />
                    <div className="flex items-center gap-1.5 text-white/30 text-xs font-medium">
                      <Clock size={14} />
                      {cert.duration}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 primary-border">
                <div className="flex flex-col items-start md:items-end gap-1.5">
                  <div className="flex items-center gap-2 px-4 py-2 primary-rounded border primary-border bg-white/[0.02] primary-text text-xs font-black uppercase tracking-widest shadow-inner">
                    <Calendar size={14} />
                    {cert.certifiedAt}
                  </div>
                  <div className="flex items-center gap-1 md:pr-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className={
                          i < cert.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-white/10"
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="primary-rounded border primary-border p-3 text-white/40 hover:text-[#0abab5] hover:border-[#0abab5]/50 hover:bg-[#0abab5]/5 transition-all active:scale-95 shadow-xl">
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(cert._id, cert.title);
                    }}
                    className="primary-rounded border primary-border p-3 text-white/40 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/5 transition-all active:scale-95 shadow-xl"
                  >
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
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#0abab5]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))
        ) : (
          <div className="   flex flex-col items-center justify-center text-center">
            <div className="p-8 primary-rounded border primary-border text-white/10 mb-6">
              <Award size={64} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">
              No certificates found
            </h3>
            <p className="text-white/30 max-w-xs mx-auto font-medium">
              Start by adding your first certificate to showcase your learning
              achievements.
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
                <span>Load More Certificates</span>
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
