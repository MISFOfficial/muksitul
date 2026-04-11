"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import {
  useGetBackendSkills,
  useGetFrontendSkills,
  useGetSoftSkills,
} from "@/app/Global/data/useSkills";

const TagRow = ({
  items,
  loading,
  speed = 60,
  direction = "left",
}: {
  items: any[];
  loading?: boolean;
  speed?: number;
  direction?: "left" | "right";
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[52px]" />; // Spacer to avoid layout shift

  if (loading) {
    return (
      <div className="flex overflow-hidden w-full relative">
        <Marquee
          direction={direction}
          speed={speed}
          gradient={true}
          gradientColor="rgb(0, 0, 0)"
          autoFill={true}
          className="overflow-hidden py-2"
        >
          {/* Skeleton items */}
          {[1, 2, 3, 4, 5, 6].map((i, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 py-2 px-4 primary-border0 primary-rounded bg-white/5 min-w-[150px] mx-3 animate-pulse"
            >
              <div className="w-6 h-6 rounded-full bg-white/10" />
              <div className="h-3 w-20 bg-white/10 rounded" />
            </div>
          ))}
        </Marquee>
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <div className="flex overflow-hidden w-full relative">
      <Marquee
        direction={direction}
        speed={speed}
        pauseOnHover={false}
        gradient={true}
        gradientColor="rgb(0, 0, 0)" // Use RGB string for more consistent results
        autoFill={true}
        className="overflow-hidden py-2"
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 py-2 mx-3 primary-border0 primary-rounded whitespace-nowrap transition-all duration-300 group cursor-pointer"
          >
            <div className="w-6 h-6 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all transform group-hover:scale-125 duration-300">
              <img
                src={typeof item.logo === "string" ? item.logo : item.logo?.url}
                alt={item.name}
                className="w-full h-full object-contain dark:invert-[0.1]"
                loading="lazy"
              />
            </div>
            <span className="text-(--text-muted) text-sm font-bold tracking-widest uppercase group-hover:text-(--foreground) transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default function Skill() {
  const { frontendSkills, isLoading: frontLoading } = useGetFrontendSkills();
  const { backendSkills, isLoading: backLoading } = useGetBackendSkills();
  const { softSkills, isLoading: softLoading } = useGetSoftSkills();

  return (
    <section className="flex flex-col overflow-hidden">
      <TagRow
        items={frontendSkills || []}
        loading={frontLoading}
        speed={50}
        direction="left"
      />
      <TagRow
        items={backendSkills || []}
        loading={backLoading}
        speed={50}
        direction="right"
      />
      <TagRow
        items={softSkills || []}
        loading={softLoading}
        speed={50}
        direction="left"
      />
    </section>
  );
}
