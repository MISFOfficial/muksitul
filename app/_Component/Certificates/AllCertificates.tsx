"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CertificateCard from "./CertificateCard";
import { useGetAllCertificates } from "@/app/Global/data/useCertificates";


export default function AllCertificates() {
  const { allCertificates, isLoading, isError } = useGetAllCertificates(3);

  const certificates = React.useMemo(() => {
    if (!allCertificates) return [];
    return allCertificates.pages.flatMap((page: any) => page);
  }, [allCertificates]);

  return (
    <section id="certificates-list" className="py-12">
      {/* 1-column list to differ from Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-16/10 primary-rounded bg-white/5 border primary-border animate-pulse" />
          ))
        ) : (
          certificates.map((cert: any, index: number) => (
            <CertificateCard key={cert._id || index} certificate={cert} index={index} />
          ))
        )}
      </div>

      <div

        className="mt-16 flex justify-center px-4"
      >
        <Link href="/certificates" className="w-full max-w-5xl group">
          <button className="relative w-full py-6 bg-white/2 border primary-border primary-rounded text-white font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 flex items-center justify-center gap-4">
            <span className="relative z-10">
              View All Professional Credentials
            </span>
            <ArrowRight
              size={18}
              className="relative z-10 group-hover:translate-x-2 transition-all duration-300 primary-text2"
            />
          </button>
        </Link>
      </div>
    </section>
  );
}
