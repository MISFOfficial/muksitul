"use client";

import React from "react";
import {
  Zap,
  FolderDot,
  Palette,
  BarChart3,
  Shield,
  User,
  Settings,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 ">
      {/* Stats Grid - No backgrounds, only borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Projects",
            value: "24",
            change: "+12%",
            icon: FolderDot,
          },
          { label: "Total Skills", value: "48", change: "+5", icon: Zap },
          {
            label: "Design Works",
            value: "12",
            change: "+2",
            icon: Palette,
          },
          {
            label: "Views",
            value: "1,284",
            change: "+18%",
            icon: BarChart3,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-6 primary-rounded border primary-border hover:border-[#0abab5]/50 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 primary-rounded border primary-border text-white/70 group-hover:border-[#0abab5]/50 primary-text transition-all">
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2.5 py-1 primary-rounded">
                {stat.change}
              </span>
            </div>
            <h3 className="text-white/40 text-sm font-medium uppercase tracking-wider">
              {stat.label}
            </h3>
            <p className="text-3xl font-bold mt-1 tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Profile Section & Dynamic Preview - Transparent with borders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 primary-rounded border primary-border relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-10 gap-6">
            <div className="flex items-center gap-6">
              <div className="w-28 h-28 primary-rounded overflow-hidden border primary-border p-1">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jahin"
                  alt="Profile"
                  className="w-full h-full object-cover primary-rounded"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight">
                  Muksitul Islam Jahin
                </h3>
                <p className="primary-text font-semibold text-lg">
                  Full Stack Developer & UI Designer
                </p>
                <div className="flex items-center gap-6 mt-4 text-sm text-white/50">
                  <span className="flex items-center gap-2 border primary-border px-3 py-1 primary-rounded">
                    <Shield size={14} className="primary-text" /> Admin
                  </span>
                  <span className="flex items-center gap-2 border primary-border px-3 py-1 primary-rounded">
                    <User size={14} className="primary-text" /> ID: 306160
                  </span>
                </div>
              </div>
            </div>
            <button className="self-start p-2.5 primary-rounded border primary-border hover:bg-white/5 transition-colors">
              <Settings size={22} className="primary-text4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 space-y-4 group hover:primary-border transition-all">
              <h4 className="text-sm font-bold text-white/30 uppercase tracking-widest">
                Bio Preview
              </h4>
              <p className="text-base leading-relaxed text-white/80 line-clamp-3">
                Enthusiastic Full Stack Developer with a passion for building
                beautiful, responsive, and user-friendly web applications.
                Specializing in React, Next.js, and modern UI/UX design.
              </p>
              <button className="primary-text text-sm font-bold hover:underline underline-offset-4 decoration-2">
                Edit Biography
              </button>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 space-y-4 group hover:primary-border transition-all">
              <h4 className="text-sm font-bold text-white/30 uppercase tracking-widest">
                Active Role
              </h4>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 primary-rounded bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></div>
                <span className="text-lg font-semibold">Lead Developer</span>
              </div>
              <p className="text-sm text-white/40 italic leading-relaxed">
                Managing core architecture and site deployment strategies.
              </p>
              <button className="primary-text text-sm font-bold hover:underline underline-offset-4 decoration-2">
                Change Role
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 primary-rounded border primary-border relative group overflow-hidden">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 tracking-tight">
            <BarChart3 size={24} className="primary-text" />
            Recent Activity
          </h3>
          <div className="space-y-8">
            {[
              {
                label: "Project Updated",
                time: "2h ago",
                color: "bg-blue-500",
              },
              {
                label: "New Skill Added",
                time: "5h ago",
                color: "bg-green-500",
              },
              {
                label: "Resumed Uploaded",
                time: "Yesterday",
                color: "bg-orange-500",
              },
              {
                label: "Site Deployment",
                time: "2 days ago",
                color: "bg-purple-500",
              },
            ].map((activity, i) => (
              <div key={i} className="flex gap-5">
                <div className="relative mt-1">
                  <div
                    className={`h-3.5 w-3.5 primary-rounded ${activity.color} ring-4 ring-black`}
                  ></div>
                  {i !== 3 && (
                    <div className="absolute top-4 left-1.5 w-px h-12 bg-white/10"></div>
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold leading-none mb-1.5">
                    {activity.label}
                  </p>
                  <p className="text-sm text-white/30 font-medium">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-3.5 primary-rounded border primary-border text-sm font-bold hover:bg-white/5 transition-all uppercase tracking-widest primary-text4 hover:text-white">
            View Full Logs
          </button>
        </div>
      </div>
    </div>
  );
}
