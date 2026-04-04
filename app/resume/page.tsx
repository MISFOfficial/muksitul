"use client";

import React from "react";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  const driveFileId = "1gdqcS1d0jb4ALWIKdPShPKQLP6NIkI2i";
  const previewUrl = `https://drive.google.com/file/d/${driveFileId}/preview`;
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${driveFileId}`;

  return (
    <main className="min-h-screen text-white relative bg-transparent overflow-x-hidden">
      {/* Navigation - Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-white/5 px-4 md:px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => window.history.back()}
            className="text-white cursor-pointer transition-all font-black flex items-center gap-2 md:gap-3 text-[12px] md:text-[14px] uppercase tracking-[0.3em] md:tracking-[0.4em] group shrink-0"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 md:group-hover:-translate-x-2 transition-transform"
            />
            Back
          </button>

          <Link
            href={downloadUrl}
            className="bg-[#0abab5] hover:bg-[#0abab5]/90 text-black px-6 md:px-10 py-2.5 md:py-3.5 primary-rounded font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-[9px] md:text-[10px] flex items-center gap-2 transition-all shadow-[0_5px_30px_rgba(10,186,181,0.15)] active:scale-95 shrink-0"
          >
            <Download size={14} className="hidden sm:block" />
            Download PDF
          </Link>
        </div>
      </div>

      {/* Responsive PDF Viewer */}
      <div className="pt-24 min-h-screen w-full flex flex-col bg-transparent items-center px-4 md:px-0 pb-10">
        <div className="w-full md:max-w-[850px] h-[75vh] md:h-[85vh] bg-transparent relative shadow-2xl overflow-hidden rounded-sm border border-white/5">
          <iframe
            src={previewUrl}
            className="w-full h-full border-none"
            allow="autoplay"
            title="Professional Resume"
          />

          {/* Minimal top cover for Drive viewer integration */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5 z-10" />
        </div>
      </div>
    </main>
  );
}
