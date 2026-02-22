"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CertificateCard from "./CertificateCard";
import { certificatesData } from "@/lib/certificatesData";

export default function AllCertificates() {
    return (
        <section id="certificates-list" className="py-12">
            {/* 1-column list to differ from Projects grid */}
            <div className="max-w-5xl mx-auto space-y-6 px-4">
                {certificatesData.slice(0, 3).map((cert, index) => (
                    <CertificateCard key={cert.id} certificate={cert} index={index} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-16 flex justify-center px-4"
            >
                <Link href="/certificates" className="w-full max-w-5xl group">
                    <button className="relative w-full py-6 bg-white/[0.02] border border-white/5 rounded-2xl text-white font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:border-[#FF5C58]/30 flex items-center justify-center gap-4">
                        <span className="relative z-10">
                            View All Professional Credentials
                        </span>
                        <ArrowRight
                            size={18}
                            className="relative z-10 group-hover:translate-x-2 transition-all duration-300 text-[#FF5C58]"
                        />
                    </button>
                </Link>
            </motion.div>
        </section>
    );
}
