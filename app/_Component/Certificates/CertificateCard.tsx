"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, Star, ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Certificate } from "@/lib/certificatesData";

interface CertificateCardProps {
    certificate: Certificate;
    index: number;
}

export default function CertificateCard({ certificate, index }: CertificateCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative"
        >
            <Link href={`/certificates/${certificate.slug}`}>
                <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF5C58]/40 transition-all duration-500 overflow-hidden group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-px bg-gradient-to-r from-transparent via-[#FF5C58]/10 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

                    {/* Badge/Logo Section */}
                    <div className="relative shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <Image
                            src={certificate.image}
                            alt={certificate.provider}
                            fill
                            className="object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <Award size={40} className="text-[#FF5C58] opacity-80 group-hover:scale-110 transition-transform" />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 space-y-3 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div className="flex items-center justify-center md:justify-start gap-2 text-[#FF5C58]">
                                <ShieldCheck size={16} />
                                <span className="text-xs font-black uppercase tracking-widest">{certificate.provider}</span>
                            </div>
                            <div className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                <span className="font-bold">{certificate.rating} Learning Score</span>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white group-hover:text-[#FF5C58] transition-colors line-clamp-1">
                            {certificate.title}
                        </h3>

                        <p className="text-sm text-white/40 line-clamp-2 max-w-xl">
                            {certificate.description}
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                            {certificate.skillsLearned.slice(0, 4).map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-white/50 group-hover:border-white/20 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Action Section */}
                    <div className="shrink-0 flex items-center justify-center md:pl-4">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FF5C58] group-hover:border-[#FF5C58] transition-all duration-300">
                            <ArrowUpRight size={20} className="text-white group-hover:scale-110 transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
