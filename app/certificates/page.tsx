"use client";

import React from "react";
import {
  ArrowLeft,
  Trophy,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import CertificateCard from "@/app/_Component/Certificates/CertificateCard";
import { useGetAllCertificates } from "../Global/data/useCertificates";


export default function CertificatesPage() {
  const limit = 10;

  const {
    allCertificates,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllCertificates(limit);

  const certificatesList = React.useMemo(() => {
    if (!allCertificates) return [];
    return allCertificates.pages.flatMap((page: any) => page);
  }, [allCertificates]);

  return (
    <main className="relative min-h-screen">


      {/* Hero Section */}
      <section className="relative py-10 overflow-hidden">

        <div className="ratio relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-[#FF5652] transition-colors group mb-12"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Return Home
            </span>
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3  mb-8">
              <div className="w-12 h-px primary-color2" />
              <span className="text-[10px] font-black primary-text2 uppercase tracking-[0.4em]">
                Verified Expertise
              </span>
            </div>

            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-12 uppercase">
              The <span className="primary-text2 italic">Vault</span> <br />
              Of <span className="primary-text4">Learning</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <p className="text-white/40 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                A curated collection of professional certifications and academic
                milestones demonstrating a commitment to continuous engineering
                excellence.
              </p>

              <div className="flex items-center gap-6 pl-0 md:pl-8 border-l-0 md:border-l primary-border">
                <div className="flex flex-col">
                  <span className="text-5xl font-black text-white">
                    {certificatesList.length || "0"}
                  </span>
                  <span className="text-[10px] font-bold primary-text2 uppercase tracking-widest">
                    Credentials
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="ratio pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Skeleton State
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-16/10 primary-rounded bg-white/5 border primary-border animate-pulse"
              />
            ))
          ) : isError ? (
            <div className="col-span-full py-20 text-center space-y-6">
              <div className="inline-flex p-6 rounded-full bg-red-500/10 border border-red-500/20 text-red-500">
                <RefreshCw size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase">
                  Failed to load certificates
                </h3>
                <p className="text-white/40 text-sm mt-2">
                  There was an error while connecting to the vault.
                </p>
              </div>
              <button
                onClick={() => refetch()}
                className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs uppercase transition-all"
              >
                Try Again
              </button>
            </div>
          ) : (
            certificatesList.map((cert: any, index: number) => (
              <CertificateCard key={cert._id || cert.id} certificate={cert} index={index} />
            ))
          )}

        </div>

        {/* See More Button */}
        {!isLoading && !isError && hasNextPage && (
          <div className="mt-20 flex items-center justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="group relative flex items-center gap-3 px-12 py-5 bg-[#FF5652]/10 border border-[#FF5652]/20 text-white rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all hover:bg-[#FF5652] hover:shadow-[0_0_40px_rgba(255,86,82,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFetchingNextPage ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Loading....</span>
                </>
              ) : (
                <>
                  <span>See More Artifacts</span>
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </div>
        )}
      </section>

      {/* Footer CTA */}
      <section className="ratio pb-32">
        <div className="primary-rounded bg-white/5 to-transparent border primary-border p-12 md:p-20 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Build with <br /> <span className="primary-text">Confidence</span>
            </h2>
            <p className="text-white/40 text-lg">
              My technical foundation is backed by rigorous training and
              industry-recognized validations. Let's apply this expertise to
              your next big idea.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href="/#contact">
                <button className="px-12 py-5 cursor-pointer primary-color2 text-white rounded-full font-black text-sm uppercase  transition-all ">
                  Start a Collaboration
                </button>
              </Link>
              <Link href="/">
                <button className="px-12 py-5 cursor-pointer primary-text4  border primary-border rounded-full font-black text-sm uppercase  transition-all">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
