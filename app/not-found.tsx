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
        {/* Star field background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: i % 5 === 0 ? 2 : 1,
                height: i % 5 === 0 ? 2 : 1,
                left: `${(i * 17 + 5) % 100}%`,
                top: `${(i * 23 + 3) % 100}%`,
              }}
              animate={{ opacity: [0.1, 0.6, 0.1] }}
              transition={{
                duration: 2 + (i % 4),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Orbiting ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-white/[0.04]"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-[250px] h-[250px] md:w-[380px] md:h-[380px] rounded-full border border-dashed border-[#FF0055]/[0.06]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Astronaut SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          >
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_0_30px_rgba(255,0,85,0.15)]"
              >
                {/* Helmet */}
                <circle
                  cx="60"
                  cy="45"
                  r="28"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.3"
                />
                <circle
                  cx="60"
                  cy="45"
                  r="20"
                  stroke="#FF0055"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.2"
                />
                {/* Visor */}
                <path
                  d="M45 40 Q60 55 75 40"
                  stroke="#FF0055"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.4"
                />
                {/* Body */}
                <rect
                  x="45"
                  y="70"
                  width="30"
                  height="25"
                  rx="8"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.2"
                />
                {/* Jetpack line */}
                <motion.line
                  x1="60"
                  y1="95"
                  x2="60"
                  y2="115"
                  stroke="#FF0055"
                  strokeWidth="1"
                  opacity="0.3"
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                {/* Arms */}
                <line
                  x1="45"
                  y1="78"
                  x2="30"
                  y2="68"
                  stroke="white"
                  strokeWidth="1.5"
                  opacity="0.2"
                />
                <line
                  x1="75"
                  y1="78"
                  x2="90"
                  y2="68"
                  stroke="white"
                  strokeWidth="1.5"
                  opacity="0.2"
                />
                {/* Antenna */}
                <line
                  x1="60"
                  y1="17"
                  x2="60"
                  y2="10"
                  stroke="white"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <motion.circle
                  cx="60"
                  cy="8"
                  r="3"
                  fill="#FF0055"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </svg>
            </motion.div>
          </motion.div>

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
