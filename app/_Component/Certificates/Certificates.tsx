"use client";

import React, { useMemo } from "react";
import { ShieldCheck, Award, Zap } from "lucide-react";
import { useGetAllCertificates } from "../../Global/data/useCertificates";

export default function Certificates() {
  const { allCertificates, isLoading } = useGetAllCertificates(100);

  const totalCertificates = useMemo(() => {
    if (!allCertificates) return 0;
    return allCertificates.pages.flatMap((page: any) => page).length;
  }, [allCertificates]);

  return (
    <section
      id="certificates"
      className="relative overflow-hidden flex flex-col items-center justify-center text-center py-24"
    >
      {/* Background Typography - Different Style */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 opacity-[0.03]">
        <h2 className="text-[20vw] font-black italic uppercase tracking-tighter text-white leading-none">
          ACCREDITED
        </h2>
        <h2 className="text-[20vw] font-black italic uppercase tracking-tighter text-white leading-none -mt-10 ml-[10vw]">
          EXPERTISE
        </h2>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center gap-8">
        {/* Header Badge */}
        <div

          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5C58]/10 border border-[#FF5C58]/20 primary-text2"
        >
          <ShieldCheck size={18} />
          <span className="text-xs font-black uppercase tracking-widest">
            Verified Credentials
          </span>
        </div>

        <div className="space-y-4">
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase"
          >
            My Professional <br />
            <span className="primary-text italic">Milestones</span>
          </h2>

          <p
            className="text-white/40 max-w-2xl text-lg font-medium"
          >
            Beyond building projects, I am committed to deep technical mastery.
            Each certificate represents hundreds of hours of focused learning
            and validation.
          </p>
        </div>

        {/* Stat Grid for uniqueness */}
        <div

          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
        >
          {[
            {
              label: "Credentials",
              val: isLoading ? "..." : totalCertificates,
              icon: Award,
            },
            { label: "Learning Hours", val: "2,500+", icon: Zap },
            { label: "Top Rated", val: "100%", icon: ShieldCheck },
            { label: "Institutions", val: "5+", icon: ShieldCheck },
          ].map((stat, i) => (
            <div
              key={i}
              className="px-6 py-4 primary-rounded bg-white/5 border primary-border flex flex-col items-center gap-1"
            >
              <stat.icon size={20} className="primary-text2 mb-2" />
              <span className="text-2xl font-black text-white">{stat.val}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
