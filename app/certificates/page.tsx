"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Award } from "lucide-react";
import Link from "next/link";
import CertificateCard from "@/app/_Component/Certificates/CertificateCard";
import { certificatesData } from "@/lib/certificatesData";
import Navigaton from "@/app/_Component/Navigation/Navigaton";
import Footer from "@/app/_Component/Footer/Footer";

export default function CertificatesPage() {
    return (
        <main className="relative min-h-screen bg-black">
            <div className="sticky top-0 w-full z-40 backdrop-blur-xl border-b border-white/5">
                <Navigaton />
            </div>

            <div className="container mx-auto px-6 py-24">
                {/* Header Section */}
                <div className="max-w-5xl mx-auto mb-20 space-y-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-[#FF5C58] transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Return to Home</span>
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[#FF5C58]">
                                <ShieldCheck size={20} />
                                <span className="text-xs font-black uppercase tracking-[0.2em]">Verified Achievements</span>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase">
                                Professional <br />
                                <span className="primary-text italic">Directory</span>
                            </h1>
                            <p className="text-white/40 max-w-xl text-lg font-medium">
                                A structured repository of certified expertise and specialized training.
                            </p>
                        </div>

                        <div className="flex flex-col items-end">
                            <span className="text-8xl font-black text-white/[0.03] leading-none mb-2">{certificatesData.length}</span>
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Total Credentials</span>
                        </div>
                    </div>
                </div>

                {/* 1-column List Grid */}
                <div className="max-w-5xl mx-auto space-y-8">
                    {certificatesData.map((cert, index) => (
                        <CertificateCard key={cert.id} certificate={cert} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="max-w-5xl mx-auto mt-24 p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 flex flex-col items-center text-center gap-6">
                    <Award size={48} className="text-[#FF5C58]" />
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Commitment to Growth</h2>
                    <p className="text-white/40 max-w-lg">
                        I am constantly expanding my technical horizons. New certifications are added as I complete advanced specializations.
                    </p>
                    <Link href="/#contact">
                        <button className="px-10 py-4 bg-[#FF5C58] text-white rounded-full font-black text-xs uppercase hover:scale-105 transition-transform">
                            Discuss a Project
                        </button>
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    );
}
