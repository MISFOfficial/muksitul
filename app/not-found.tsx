"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import Navigaton from "./_Component/Navigation/Navigaton";
import Footer from "./_Component/Footer/Footer";

export default function NotFound() {
  return (
    <main className="relative min-h-screen selection:bg-[#FF0055] selection:text-white">
      <div className="sticky top-0 w-full z-40 backdrop-blur-xl border-b primary-border">
        <Navigaton />
      </div>

      <div className="ratio flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden">
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* 404 text */}
          <div
            className="mt-8 mb-2"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] primary-text2">
              Error Code
            </span>
            <h1
              className="text-8xl md:text-9xl font-black text-white/[0.08] leading-none tracking-tighter"
              style={{ WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.52)" }}
            >
              404
            </h1>
          </div>

          {/* Message */}
          <div
            className="space-y-3 -mt-4"
          >
            <h2 className="text-2xl md:text-4xl font-black primary-text3 tracking-tight">
              Houston, We Have a Problem
            </h2>
            <p className="primary-text4text-sm md:text-base max-w-sm mx-auto leading-relaxed">
              This page has floated off into deep space.
              <br />
              Let&apos;s navigate you back to safety.
            </p>
          </div>

          {/* Buttons */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 primary-color2 text-white px-7 py-3.5 rounded-full text-sm font-bold hover:scale-105 transition-all"
            >
              <Home
                size={16}
                className="group-hover:rotate-12 transition-transform"
              />
              Return Home
            </Link>
            <button
              onClick={() => history.back()}
              className="group cursor-pointer inline-flex items-center gap-2.5 border primary-border text-white/70 px-7 py-3.5 rounded-full text-sm font-bold hover:text-white hover:primary-text4 hover:border-white/20 transition-all"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Go Back
            </button>
          </div>
        </div>

        {/* Bottom coordinates */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/[0.08] text-[9px] font-mono tracking-[0.3em] uppercase"
        >
          <span>SYS::LOST</span>
          <span>·</span>
          <span>COORD::NULL</span>
          <span>·</span>
          <span>SIGNAL::NONE</span>
        </div>
      </div>

      <Footer />
    </main>
  );
}
