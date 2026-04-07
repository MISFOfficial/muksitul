"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  useGetBackendSkills,
  useGetFrontendSkills,
  useGetSoftSkills,
} from "@/app/Global/data/useSkills";

const TagRow = ({
  items,
  loading,
  speed = 100,
  direction = "left",
}: {
  items: any[];
  loading?: boolean;
  speed?: number;
  direction?: "left" | "right";
}) => {
  if (loading) {
    return (
      <div className="flex overflow-hidden w-full relative group-mask">
        <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{
            x: direction === "left" ? [0, "-50%"] : ["-50%", 0],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-nowrap gap-6 min-w-max py-2 animate-pulse"
        >
          {/* Quadruple the skeleton items for perfect continuity */}
          {[
            1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5,
            6,
          ].map((i, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 py-2 px-4 primary-border0 primary-rounded bg-white/5 min-w-[150px]"
            >
              <div className="w-6 h-6 rounded-full bg-white/10" />
              <div className="h-3 w-20 bg-white/10 rounded" />
            </div>
          ))}
        </motion.div>
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <div className="flex overflow-hidden w-full relative group-mask">
      {/* Edge Fading Mask (Dynamic to Theme) */}
      <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{
          x: direction === "left" ? [0, "-50%"] : ["-50%", 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-nowrap gap-6 min-w-max py-2"
      >
        {/* Quadruple the items for perfect continuity */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 py-2  primary-border0 primary-rounded whitespace-nowrap  hover:shadow-lg dark:hover:shadow-[#FF5C58]/5 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-6 h-6 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all transform group-hover:scale-125 duration-300">
              <img
                src={typeof item.logo === "string" ? item.logo : item.logo?.url}
                alt={item.name}
                className="w-full h-full object-contain dark:invert-[0.1]"
                loading="lazy"
              />
            </div>
            <span className="text-[var(--text-muted)] text-sm font-bold tracking-widest uppercase group-hover:text-[var(--foreground)] transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Skill() {
  const { frontendSkills, isLoading: frontLoading } = useGetFrontendSkills();
  const { backendSkills, isLoading: backLoading } = useGetBackendSkills();
  const { softSkills, isLoading: softLoading } = useGetSoftSkills();

  return (
    <section className="  flex flex-col overflow-hidden">
      <TagRow
        items={frontendSkills || []}
        loading={frontLoading}
        speed={90}
        direction="left"
      />
      <TagRow
        items={backendSkills || []}
        loading={backLoading}
        speed={90}
        direction="right"
      />
      <TagRow
        items={softSkills || []}
        loading={softLoading}
        speed={90}
        direction="left"
      />
    </section>
  );
}
