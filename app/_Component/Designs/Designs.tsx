"use client";

import React from "react";
import { useGetDesignCount } from "@/app/Global/data/useDesigns";

export default function Designs() {
  const { count, isLoading } = useGetDesignCount();

  return (
    <section
      id="designs"
      className="relative overflow-hidden flex flex-col items-center justify-center text-center "
    >
      {/* Background Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 opacity-20">
        <h2 className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter text-outline leading-[0.8]">
          Design
        </h2>
        <h2 className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter text-outline leading-[0.8] ml-[20vw]">
          Studio
        </h2>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center gap-6">
        {/* Count Badge */}
        <div

          className="relative"
        >
          <span className="text-[60px] md:text-[100px] font-black leading-none primary-text2 tracking-tighter">
            {count || "0"}+
          </span>
          <span className="absolute top-2 -right-12 text-[12px] md:text-lg font-bold bg-[#FF5652] px-3 py-1 rounded-full text-white -rotate-12 uppercase tracking-widest">
            UI/UX
          </span>
        </div>

        {/* Heading */}
        <h2

          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl uppercase"
        >
          Creative <span className="primary-text4 italic">Visual</span> <br />
          Experience <span className="primary-text2">Showcase</span>
        </h2>

        {/* Description */}
        <p
          className="primary-text4 max-w-2xl text-lg leading-relaxed mt-4"
        >
          Translating complex ideas into intuitive, aesthetically pleasing
          digital products. A focus on user-centric design principles and modern
          aesthetic excellence.
        </p>
      </div>
    </section >
  );
}
