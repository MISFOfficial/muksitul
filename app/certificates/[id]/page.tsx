"use client";

export const runtime = 'edge';
export const dynamic = "force-dynamic";

import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Star,
  Award,
  CheckCircle2,
  AlertCircle,
  Shield,
  ShieldCheck,
  X,
  Maximize2,
  RefreshCw,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Navigaton from "@/app/_Component/Navigation/Navigaton";
import Footer from "@/app/_Component/Footer/Footer";
import { useGetCertificateById } from "@/app/Global/data/useCertificates";

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Pulse({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-white/[0.05] rounded-xl ${className}`} />;
}

function DetailSkeleton() {
  return (
    <main className="relative min-h-screen">

      <div className="ratio py-16">
        <Pulse className="h-4 w-28 mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left */}
          <div className="lg:col-span-7 space-y-8">
            <Pulse className="aspect-video w-full rounded-3xl" />
            <div className="space-y-3">
              <Pulse className="h-4 w-32" />
              {[1, 2, 3, 4].map(i => <Pulse key={i} className="h-4 w-full" />)}
            </div>
            <div className="space-y-3 p-6 rounded-2xl border primary-border">
              <Pulse className="h-4 w-36" />
              {[1, 2, 3].map(i => <Pulse key={i} className="h-14 w-full rounded-xl" />)}
            </div>
          </div>
          {/* Right */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-4">
              <Pulse className="h-5 w-28 rounded-full" />
              <Pulse className="h-16 w-full" />
              <Pulse className="h-4 w-3/4" />
            </div>
            <div className="space-y-3 pt-4">
              {[1, 2, 3].map(i => <Pulse key={i} className="h-16 w-full rounded-2xl" />)}
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map(i => <Pulse key={i} className="h-8 w-20 rounded-full" />)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CertificateDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { certificate, isLoading, isError, refetch } = useGetCertificateById(id as string);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const imageUrl =
    typeof certificate?.image === "string"
      ? certificate.image
      : (certificate?.image as any)?.url || "";

  if (isLoading) return <DetailSkeleton />;

  if (isError) {
    return (
      <main className="relative min-h-screen">

        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 p-6">
          <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20"><AlertCircle size={32} className="text-red-400" /></div>
          <div className="text-center">
            <h1 className="text-xl font-black text-white uppercase tracking-tight mb-1">Connection Failed</h1>
            <p className="text-white/40 text-sm">Could not fetch this credential.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => refetch()} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs uppercase transition-all"><RefreshCw size={12} /> Retry</button>
            <button onClick={() => router.push("/certificates")} className="px-5 py-2.5 primary-color2 text-white rounded-full font-bold text-xs uppercase">Back</button>
          </div>
        </div>
      </main>
    );
  }

  if (!certificate) {
    return (
      <main className="relative min-h-screen">

        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 p-6">
          <Award size={48} className="primary-text2" />
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Not Found</h1>
          <button onClick={() => router.push("/certificates")} className="px-6 py-2.5 primary-color2 text-white rounded-full font-bold text-xs uppercase">Return</button>
        </div>

      </main>
    );
  }

  return (
    <main className="relative min-h-screen selection:bg-[#FF5C58] selection:text-white">

      <div className="ratio py-12 md:py-20">

        {/* Back */}
        <Link
          href="/certificates"
          className="inline-flex items-center gap-2 text-white/30 hover:text-white transition-colors group mb-10 md:mb-14"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-black uppercase tracking-[0.25em]">The Vault</span>
        </Link>

        {/* ════════════════════════════════════
            2-COLUMN GRID
        ════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20">

          {/* ══════════════════════════════
              LEFT — Image + Content
          ══════════════════════════════ */}
          <div className="lg:col-span-7 space-y-10">

            {/* Certificate Image */}
            {imageUrl && (
              <div
                className="relative rounded-3xl overflow-hidden border primary-border cursor-zoom-in group/img"
                onClick={() => setIsImageModalOpen(true)}
              >
                <Image
                  src={imageUrl}
                  alt={certificate.title}
                  width={1200}
                  height={700}
                  className="w-full h-auto group-hover/img:scale-[1.02] transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-black/10 group-hover/img:bg-transparent transition-colors" />
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover/img:opacity-100 transition-all duration-300">
                  <Maximize2 size={11} className="text-white/70" />
                  <span className="text-[9px] font-black text-white/60 uppercase tracking-wider">View Full</span>
                </div>
                {/* Verified badge on image */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                  <CheckCircle2 size={10} className="text-green-400" />
                  <span className="text-[9px] font-black text-white/60 uppercase tracking-wider">Verified</span>
                </div>
              </div>
            )}

            {/* Overview */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="primary-text2" />
                <h2 className="text-sm font-black text-white/40 uppercase tracking-[0.2em]">Overview</h2>
              </div>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed font-medium">
                {certificate.fullDescription || certificate.description}
              </p>
            </section>

            {/* Challenges */}
            {certificate.challenges?.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <Award size={13} className="primary-text2" />
                  <h2 className="text-sm font-black text-white/40 uppercase tracking-[0.2em]">Challenges Overcome</h2>
                </div>
                <div className="space-y-2">
                  {certificate.challenges.map((challenge: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border primary-border hover:bg-white/[0.04] hover:border-white/10 transition-all group"
                    >
                      <span className="shrink-0 w-6 h-6 rounded-lg bg-[#FF5C58]/10 border border-[#FF5C58]/20 flex items-center justify-center text-[10px] font-black text-[#FF5C58] group-hover:bg-[#FF5C58] group-hover:text-white transition-all mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-white/60 text-base md:text-lg leading-relaxed group-hover:text-white/85 transition-colors">
                        {challenge}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ══════════════════════════════
              RIGHT — Info Panel (Sticky)
          ══════════════════════════════ */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[76px] space-y-6">

              {/* Title block */}
              <div className="space-y-4">
                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border primary-border">
                    <Shield size={11} className="primary-text2" />
                    <span className="text-xs font-black text-white/50 uppercase tracking-[0.15em]">{certificate.provider}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/[0.07] border border-green-500/20">
                    <CheckCircle2 size={11} className="text-green-400" />
                    <span className="text-xs font-black text-green-400/80 uppercase tracking-[0.15em]">Verified</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white leading-[0.92] tracking-tighter">
                  {certificate.title}
                </h1>

                {/* Short description */}
                <p className="text-white/45 text-sm md:text-base leading-relaxed font-medium">
                  {certificate.description}
                </p>

                {/* Inline meta row */}
                <div className="flex flex-wrap gap-3 pt-1 text-xs font-black text-white/30 uppercase tracking-wide">
                  {certificate.certifiedAt && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={10} className="primary-text2" />
                      {certificate.certifiedAt}
                    </span>
                  )}
                  {certificate.duration && (
                    <span className="flex items-center gap-1.5">
                      <Clock size={10} className="primary-text2" />
                      {certificate.duration}
                    </span>
                  )}
                  {certificate.rating !== undefined && (
                    <span className="flex items-center gap-1.5">
                      <Star size={10} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-yellow-400/80">{certificate.rating} / 5</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-2.5">
                {certificate.certifiedAt && (
                  <div className="p-4 rounded-2xl bg-white/[0.03] border primary-border hover:bg-white/[0.05] transition-colors col-span-2 sm:col-span-1">
                    <p className="text-xs font-black text-white/30 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <Calendar size={11} className="primary-text2" /> Issued
                    </p>
                    <p className="text-lg font-black text-white">{certificate.certifiedAt}</p>
                  </div>
                )}
                {certificate.duration && (
                  <div className="p-4 rounded-2xl bg-white/[0.03] border primary-border hover:bg-white/[0.05] transition-colors col-span-2 sm:col-span-1">
                    <p className="text-xs font-black text-white/30 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <Clock size={11} className="primary-text2" /> Duration
                    </p>
                    <p className="text-lg font-black text-white">{certificate.duration}</p>
                  </div>
                )}
                {certificate.rating !== undefined && (
                  <div className="p-4 rounded-2xl bg-yellow-500/[0.05] border border-yellow-500/15 hover:bg-yellow-500/[0.08] transition-colors col-span-2">
                    <p className="text-xs font-black text-yellow-500/60 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <Star size={11} className="text-yellow-500" /> Rating
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-black text-white">{certificate.rating}</p>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={13} className={i < Math.floor(certificate.rating) ? "text-yellow-500 fill-yellow-500" : "text-white/10"} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Skills */}
              {certificate.skillsLearned?.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={13} className="primary-text2" />
                    <h2 className="text-sm font-black text-white/40 uppercase tracking-[0.18em]">Skills</h2>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {certificate.skillsLearned.map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-full bg-white/[0.04] border primary-border text-white/55 hover:text-white hover:bg-white/[0.07] font-bold text-sm uppercase tracking-wider transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Cert ID */}
              <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.02] border border-dashed primary-border">
                <div className="min-w-0">
                  <p className="text-xs font-black text-white/25 uppercase tracking-[0.2em] mb-1">Certificate ID</p>
                  <p className="text-sm font-mono text-white/30 truncate">{certificate._id || certificate.id || "—"}</p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/[0.06] border border-green-500/15">
                  <CheckCircle2 size={10} className="text-green-400" />
                  <span className="text-xs font-black text-green-400/70 uppercase tracking-wider">Active</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/#contact"
                  className="flex items-center justify-center gap-2 py-4 rounded-2xl primary-color2 text-white text-sm font-black uppercase tracking-widest hover:opacity-90 transition-all"
                >
                  Work Together
                  <ChevronRight size={14} />
                </Link>
                <Link
                  href="/certificates"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border primary-border text-white/35 hover:text-white hover:border-white/15 hover:bg-white/[0.03] transition-all text-sm font-black uppercase tracking-widest"
                >
                  <ArrowLeft size={13} />
                  All Certificates
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Image Modal ── */}
      {isImageModalOpen && imageUrl && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-10">
          <div onClick={() => setIsImageModalOpen(false)} className="absolute inset-0 backdrop-blur-2xl bg-black/80" />
          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-5 right-5 z-[160] w-10 h-10 rounded-full bg-white/10 border primary-border flex items-center justify-center text-white hover:bg-[#FF5C58] transition-all"
          >
            <X size={18} />
          </button>
          <div className="relative z-[155] rounded-3xl overflow-hidden border primary-border max-h-[90vh] max-w-[95vw] shadow-2xl">
            <Image
              src={imageUrl}
              alt={certificate.title}
              width={1600}
              height={1200}
              className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
              priority
            />
          </div>
        </div>
      )}
    </main>
  );
}
