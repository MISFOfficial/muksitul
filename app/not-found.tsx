"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import Navigaton from "./_Component/Navigation/Navigaton";
import Footer from "./_Component/Footer/Footer";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-black selection:bg-[#FF0055] selection:text-white">
      <div className="sticky top-0 w-full z-40 backdrop-blur-xl border-b primary-border">
        <Navigaton />
      </div>

      <div className="ratio flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden">
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* 404 text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 mb-2"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF0055]/60">
              Error Code
            </span>
            <h1
              className="text-8xl md:text-9xl font-black text-white/[0.08] leading-none tracking-tighter"
              style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.1)" }}
            >
              404
            </h1>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="space-y-3 -mt-4"
          >
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              Houston, We Have a Problem
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
              This page has floated off into deep space.
              <br />
              Let&apos;s navigate you back to safety.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 bg-[#FF0055] text-white px-7 py-3.5 rounded-full text-sm font-bold hover:scale-105 transition-all shadow-lg shadow-[#FF0055]/15 hover:shadow-[#FF0055]/30"
            >
              <Home
                size={16}
                className="group-hover:rotate-12 transition-transform"
              />
              Return Home
            </Link>
            <button
              onClick={() => history.back()}
              className="group inline-flex items-center gap-2.5 border primary-border text-white/70 px-7 py-3.5 rounded-full text-sm font-bold hover:text-white hover:bg-white/5 hover:border-white/20 transition-all"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Go Back
            </button>
          </motion.div>
        </div>

        {/* Bottom coordinates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/[0.08] text-[9px] font-mono tracking-[0.3em] uppercase"
        >
          <span>SYS::LOST</span>
          <span>·</span>
          <span>COORD::NULL</span>
          <span>·</span>
          <span>SIGNAL::NONE</span>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
