"use client";

import React from "react";

export default function CmsProjectCardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="relative primary-rounded overflow-hidden bg-[#121212] border primary-border">
        {/* Preview Image Skeleton */}
        <div className="h-[250px] md:h-[300px] w-full bg-[#1a1a1a]" />

        {/* Platform Badge Overlay Skeleton */}
        <div className="absolute top-4 left-4 w-20 h-6 bg-white/10 rounded-full" />

        {/* Content Section Skeleton */}
        <div className="p-6 border-t primary-border">
          <div className="flex justify-between items-start mb-4">
            <div className="w-full">
              {/* Title */}
              <div className="h-6 bg-white/5 rounded w-3/4 mb-2" />
              {/* Year & Platform */}
              <div className="h-3 bg-white/5 rounded w-1/3" />
            </div>
            {/* Arrow Icon Placeholder */}
            <div className="w-5 h-5 bg-white/5 rounded-full" />
          </div>

          {/* Description */}
          <div className="h-4 bg-white/5 rounded w-full mb-2" />
          <div className="h-4 bg-white/5 rounded w-4/5 mb-6" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-7 w-16 bg-white/5 primary-rounded border primary-border" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
