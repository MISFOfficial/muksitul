"use client";

import React from "react";
import { motion } from "framer-motion";

export const StarField = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-black">
      {/* Star field background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: i % 7 === 0 ? 2 : 1,
              height: i % 7 === 0 ? 2 : 1,
              left: `${(i * 13 + 7) % 100}%`,
              top: `${(i * 19 + 11) % 100}%`,
            }}
            animate={{
              opacity: [0.05, 0.4, 0.05],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + (i % 5),
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Orbiting rings - very subtle global background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="w-[800px] h-[800px] rounded-full border border-white/[0.03]"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-[600px] h-[600px] rounded-full border border-dashed border-[#FF0055]/[0.03]"
        />
      </div>

      {/* Ambient Glows */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-full h-full bg-[#FF0055]/10 blur-[150px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.01, 0.04, 0.01],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-[#20255e]/10 blur-[150px] rounded-full"
      />
    </div>
  );
};

export default StarField;
