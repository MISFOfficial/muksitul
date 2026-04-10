"use client";

import React from "react";
import { motion } from "framer-motion";
import { Palette, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navigaton from "../_Component/Navigation/Navigaton";
import Footer from "../_Component/Footer/Footer";
import DesignCard from "../_Component/Designs/DesignCard";
import { useRouter } from "next/navigation";
import { useGetAllDesigns, Design } from "@/app/Global/data/useDesigns";

export default function AllDesignPage() {
  const router = useRouter();
  const { allDesigns, isLoading, isError, refetch } = useGetAllDesigns();

  const designs = allDesigns?.pages.flatMap((page: any) => page) || [];

  return (
    <main className="min-h-screen ratio">
      <div className="sticky top-0 w-full z-40">
        <Navigaton />
      </div>

      {/* Specialized Header */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF5652]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative z-10">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Home
          </button>

          <div className="flex items-center gap-3 mb-6">
            <Palette className="text-[#FF5652]" size={24} />
            <span className="text-[#FF5652] font-bold uppercase tracking-widest text-sm underline decoration-[#FF5652]/30">
              Design Vault
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 uppercase">
            Creative <br />
            <span className="primary-text4 italic">Archive</span>
          </h1>

          <p className="primary-text4 max-w-2xl text-lg leading-relaxed">
            A curated library of user interface designs, experience prototypes,
            and visual systems focused on solving complex problems through
            aesthetic and functional excellence.
          </p>
        </div>
      </section>

      {/* Full Designs Grid */}
      <section className="pb-32">
        {isLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5652]"></div>
          </div>
        ) : isError ? (
          <div className="flex flex-col justify-center items-center h-[200px] text-white/60">
            <p>Failed to load designs.</p>
            <button
              onClick={() => refetch()}
              className="mt-4 px-6 py-2 bg-white/10 hover:bg-[#FF5652] rounded-full transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {designs.map((design: Design, index: number) => (
                <DesignCard key={design._id} design={design} index={index} />
              ))}
            </div>

            {/* Empty State */}
            {designs.length === 0 && (
              <div className="text-center p-12 border border-dashed primary-border primary-rounded">
                <p className="text-gray-500">No designs found in the vault.</p>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
