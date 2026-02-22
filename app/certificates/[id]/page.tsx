"use client";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Star, Award, CheckCircle2, AlertCircle, Copy, Share2, Shield, Zap, ShieldCheck, X, Maximize2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { getCertificateBySlug } from "@/lib/certificatesData";
import Navigaton from "@/app/_Component/Navigation/Navigaton";
import Footer from "@/app/_Component/Footer/Footer";

export default function CertificateDetail() {
    const { id } = useParams();
    const router = useRouter();
    const certificate = getCertificateBySlug(id as string);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    if (!certificate) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
                <AlertCircle size={64} className="text-[#FF5C58] mb-4" />
                <h1 className="text-3xl font-bold mb-4 uppercase tracking-tighter">Credential Not Found</h1>
                <button
                    onClick={() => router.push('/certificates')}
                    className="px-8 py-3 bg-white text-black rounded-full font-black text-xs uppercase"
                >
                    Return to Hub
                </button>
            </div>
        );
    }

    return (
        <main className="relative min-h-screen bg-black selection:bg-[#FF5C58] selection:text-white">
            <div className="sticky top-0 w-full z-40 backdrop-blur-xl border-b border-white/5">
                <Navigaton />
            </div>

            <div className="container mx-auto px-6 py-24">
                {/* Breadcrumb / Top Bar */}
                <div className="flex items-center justify-between mb-16">
                    <Link
                        href="/certificates"
                        className="inline-flex items-center gap-3 text-white/40 hover:text-white transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FF5C58]/20">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest">Back to Directory</span>
                    </Link>

                    <div className="flex gap-4">
                        <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-all">
                            <Share2 size={18} className="text-white/60" />
                        </button>
                        <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-all">
                            <Copy size={18} className="text-white/60" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-16">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF5C58]/10 text-[#FF5C58] border border-[#FF5C58]/20"
                            >
                                <Shield size={14} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{certificate.provider}</span>
                            </motion.div>

                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-7xl font-black text-white leading-tight"
                            >
                                {certificate.title}
                            </motion.h1>

                            {/* Image Container with Click for Modal */}
                            <motion.div
                                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 cursor-zoom-in group/img"
                                onClick={() => setIsImageModalOpen(true)}
                            >
                                <Image
                                    src={certificate.image}
                                    alt={certificate.title}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto group-hover/img:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity pointer-events-none" />

                                {/* Floating View Fullscreen Indicator */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover/img:opacity-100 transition-all duration-300 scale-90 group-hover/img:scale-100 pointer-events-none">
                                    <Maximize2 size={24} className="text-white" />
                                </div>

                                {/* Badge Overlay */}
                                <div className="absolute bottom-8 right-8 pointer-events-none">
                                    <div className="w-24 h-24 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                                        <Award size={40} className="text-[#FF5C58]" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white uppercase tracking-tighter flex items-center gap-3">
                                    <Zap size={20} className="text-[#FF5C58]" />
                                    Learning Narrative
                                </h3>
                                <p className="text-white/50 text-lg leading-relaxed font-medium">
                                    {certificate.fullDescription}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white uppercase tracking-tighter flex items-center gap-3">
                                    <ShieldCheck size={20} className="text-[#FF5C58]" />
                                    Skills Verified
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {certificate.skillsLearned.map((skill, idx) => (
                                        <span key={idx} className="px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-white/60 font-bold text-xs hover:border-[#FF5C58]/40 hover:text-white transition-all">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 p-10 rounded-3xl bg-white/[0.02] border border-white/5">
                            <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">Challenges Overcome</h2>
                            <div className="space-y-4">
                                {certificate.challenges.map((challenge, idx) => (
                                    <div key={idx} className="flex gap-6 items-start group">
                                        <div className="shrink-0 w-6 h-6 rounded-full border border-[#FF5C58] flex items-center justify-center mt-1 group-hover:bg-[#FF5C58] transition-all">
                                            <span className="text-[10px] font-black text-white">{idx + 1}</span>
                                        </div>
                                        <p className="text-white/60 group-hover:text-white transition-colors">{challenge}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 lg:pl-10">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="sticky top-32 space-y-8"
                        >
                            <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 relative overflow-hidden">
                                {/* Decoration */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5C58] opacity-[0.05] blur-3xl -mr-16 -mt-16" />

                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF5C58] mb-10">Credential Analytics</h4>

                                <div className="space-y-8">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                                            <Calendar size={12} /> Issuance Date
                                        </span>
                                        <span className="text-xl font-bold text-white">{certificate.certifiedAt}</span>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                                            <Clock size={12} /> Training Velocity
                                        </span>
                                        <span className="text-xl font-bold text-white">{certificate.duration} ({certificate.timeTaken})</span>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                                            <Star size={12} /> Learning Rating
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        className={`${i < Math.floor(certificate.rating) ? "text-yellow-500 fill-yellow-500" : "text-white/10"}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xl font-bold text-white">{certificate.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-16 pt-10 border-t border-white/10">
                                    <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Verification Artifact</div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/10 flex flex-col items-center gap-4">
                                        {/* Placeholder QR Aesthetic */}
                                        <div className="w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center p-2">
                                            <div className="w-full h-full border border-white/20 grid grid-cols-4 grid-rows-4 gap-1 opacity-20">
                                                {[...Array(16)].map((_, i) => <div key={i} className={`bg-white ${i % 3 === 0 ? "opacity-100" : "opacity-0"}`} />)}
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-white/20 tracking-tighter">CERT-ID: {certificate.id}-GLOBAL-VERIFIED</span>
                                    </div>
                                </div>
                            </div>

                            {/* Verified Badge */}
                            <div className="p-8 rounded-[2rem] bg-green-500/5 border border-green-500/10 flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                                    <CheckCircle2 size={24} className="text-green-500" />
                                </div>
                                <div>
                                    <h4 className="text-white font-black text-xs uppercase tracking-widest">Verified Pass</h4>
                                    <p className="text-white/30 text-[10px] mt-1 uppercase font-bold tracking-tight">Status: Active & Registered</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {isImageModalOpen && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-10">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsImageModalOpen(false)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />

                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            onClick={() => setIsImageModalOpen(false)}
                            className="absolute top-6 right-6 z-[160] w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#FF5C58] hover:border-[#FF5C58] transition-all"
                        >
                            <X size={24} />
                        </motion.button>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative z-[155] rounded-2xl overflow-hidden border border-white/10 max-h-[90vh] max-w-full"
                        >
                            <Image
                                src={certificate.image}
                                alt={certificate.title}
                                width={1600}
                                height={1200}
                                className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
                                priority
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
