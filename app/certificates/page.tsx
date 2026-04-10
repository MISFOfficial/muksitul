"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Award,
  GraduationCap,
  Trophy,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import CertificateCard from "@/app/_Component/Certificates/CertificateCard";
import Navigaton from "@/app/_Component/Navigation/Navigaton";
import Footer from "@/app/_Component/Footer/Footer";

import { Certificate } from "@/lib/certificatesData";
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
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF5652]/5 blur-[120px] rounded-full -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#20255e]/5 blur-[120px] rounded-full -ml-64 -mb-64" />

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-[#FF5652] mb-8"
            >
              <div className="w-12 h-[1px] bg-[#FF5652]/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                Verified Expertise
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-12 uppercase"
            >
              The <span className="primary-text italic">Vault</span> <br />
              Of <span className="text-white/20">Learning</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row gap-8 items-start md:items-center"
            >
              <p className="text-white/40 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                A curated collection of professional certifications and academic
                milestones demonstrating a commitment to continuous engineering
                excellence.
              </p>

              <div className="flex items-center gap-6 pl-0 md:pl-8 border-l-0 md:border-l primary-border">
                <div className="flex flex-col">
                  <span className="text-5xl font-black text-white">
                    {certificatesList.length}
                  </span>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    Credentials
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full primary-text4 flex items-center justify-center border primary-border">
                  <Trophy size={20} className="text-[#FF5652]" />
                </div>
              </div>
            </motion.div>
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
                className="aspect-[16/10] primary-rounded bg-white/[0.03] border primary-border animate-pulse"
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

          {/* Constant Learning Tile */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-8 primary-rounded bg-[#FF5652]/5 border border-[#FF5652]/20 flex flex-col justify-center items-center text-center gap-6 group"
          >
            <div className="w-16 h-16 rounded-full bg-[#FF5652]/10 flex items-center justify-center border border-[#FF5652]/20 group-hover:scale-110 transition-transform">
              <GraduationCap size={32} className="text-[#FF5652]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                Always Growing
              </h3>
              <p className="text-xs text-white/40 leading-relaxed max-w-[200px]">
                Currently pursuing advanced specializations in System
                Architecture and AI Security.
              </p>
            </div>
          </motion.div> */}
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
                  <span>Loading...</span>
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
        <div className="primary-rounded bg-gradient-to-br from-white/5 to-transparent border primary-border p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#FF5652] to-transparent" />

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
                <button className="px-12 py-5 bg-[#FF5652] text-white rounded-full font-black text-sm uppercase hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,86,82,0.3)]">
                  Start a Collaboration
                </button>
              </Link>
              <Link href="/">
                <button className="px-12 py-5 primary-text4 text-white border primary-border rounded-full font-black text-sm uppercase hover:bg-white/10 transition-all">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
