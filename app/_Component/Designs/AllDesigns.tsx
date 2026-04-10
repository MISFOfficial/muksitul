"use client";

import React from "react";
import { ArrowUpRight, Palette } from "lucide-react";
import Link from "next/link";
import DesignCard from "./DesignCard";
import DesignCardSkeleton from "./DesignCardSkeleton";
import Designs from "./Designs";
import { useGetAllDesigns, Design } from "@/app/Global/data/useDesigns";

export default function AllDesigns() {

  const { allDesigns, isLoading, isError, refetch } = useGetAllDesigns(3);

  const designs = allDesigns?.pages.flatMap((page: any) => page) || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        {[1, 2, 3].map((i) => (
          <DesignCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-[400px] primary-text4">
        <p>Failed to load designs.</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-6 py-2 bg-white/10 hover:bg-[#FF5652] rounded-full transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section id="design-grid">
      <Designs />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {designs.map((design: Design, index: number) => (
          <DesignCard key={design._id} design={design} index={index} />
        ))}
      </div>

      <div

        className="mt-8 flex flex-col items-center gap-8"
      >
        <div className="flex items-center gap-4 text-white/20">
          <div className="h-px w-20 bg-white/10" />
          <Palette size={20} />
          <div className="h-px w-20 bg-white/10" />
        </div>

        <Link href="/allDesign" className="group">
          <button className="relative px-12 py-5 bg-transparent border-2 primary-border rounded-full text-white font-black text-sm uppercase overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-3">
            <span className="relative z-10">Browse More on Design</span>
            <ArrowUpRight
              size={20}
              className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
            {/* Background Fill */}
            <div className="absolute inset-0 primary-color scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-0" />
          </button>
        </Link>
      </div>
    </section>
  );
}
