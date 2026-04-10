"use client";

import React from "react";
import {
  ArrowUpRight,
  Award,
  Star,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Certificate } from "@/lib/certificatesData";

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

export default function CertificateCard({
  certificate,
  index,
}: CertificateCardProps) {
  // Safe data accessors
  const imageUrl = typeof certificate.image === "string" ? certificate.image : certificate.image?.url || "";


  return (
    <div className="group h-full">
      <Link href={`/certificates/${certificate._id}`} className="block h-full">
        <div className="relative h-full flex flex-col primary-rounded border primary-border  transition-all duration-500 overflow-hidden">
          {/* Large Image Preview Section */}
          <div className="relative aspect-16/10 overflow-hidden primary-text4 border-b primary-border">
            <Image
              src={imageUrl}
              alt={certificate.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-white/5 to-transparent text-white" />

            {/* Provider Badge on Image */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center p-1.5 overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="icon"
                  width={20}
                  height={20}
                  className="object-cover"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white drop-shadow-md">
                {certificate.provider}
              </span>
            </div>

            {/* Verified Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full primary-color2 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
              <ShieldCheck size={10} />
              Verified
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 flex-1 flex flex-col gap-4">
            <h3 className="text-xl font-black text-white leading-tight  transition-colors line-clamp-2 uppercase tracking-tighter">
              {certificate.title}
            </h3>

            <p className="text-sm text-white/40 leading-relaxed line-clamp-2 font-medium">
              {certificate.description}
            </p>

            <div className="mt-auto pt-4 flex items-center justify-between border-t primary-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                  <Star size={10} className="fill-yellow-500" />
                  <span className="text-[10px] font-black">
                    {certificate.rating}
                  </span>
                </div>
                <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                  Score
                </div>
              </div>

              <div className="w-10 h-10 rounded-full border primary-border flex items-center justify-center transition-all duration-300">
                <ArrowUpRight
                  size={18}
                  className="text-white transition-transform"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1">
              {certificate.skillsLearned.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[9px] font-bold px-2 py-0.5 primary-rounded primary-text4 border primary-border transition-colors uppercase"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
