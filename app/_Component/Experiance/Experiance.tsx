"use client";

import { Calendar, MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGetAllExperience } from "@/app/Global/data/useExperience";
import { formatRole } from "@/app/Global/utils";

const ExperienceCard = ({ exp, index }: { exp: any; index: number }) => {
  return (
    <Link href={`/experience/${exp._id}`}>
      <div
        className="group flex flex-col xl:flex-row items-center justify-between gap-6 p-6 md:p-8 primary-rounded bg-white/5 border primary-border hover:bg-white/10 w-full mb-6 cursor-pointer"
      >
        <div className="flex items-center gap-5 md:gap-6 flex-1 min-w-0 w-full">
          <div className="w-14 h-14 md:w-16 md:h-16 primary-rounded primary-text4 relative overflow-hidden border primary-border shrink-0">
            {exp.image?.url && (
              <Image
                fill
                src={exp.image.url}
                alt={exp.company}
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-white group-hover:primary-text transition-colors leading-tight">
              {formatRole(exp.role)}
            </h3>
            <p className="text-sm md:text-base font-medium text-gray-400 mt-1 truncate">
              {exp.company}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 w-full xl:w-auto justify-between xl:justify-end border-t xl:border-t-0 pt-4 xl:pt-0 primary-border">
          <div className="flex flex-col items-start xl:items-end gap-1.5">
            <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 primary-text4 rounded-full border primary-border text-[#FF0055] text-xs md:text-sm font-bold tracking-wider whitespace-nowrap">
              <Calendar className="w-3.5 h-3.5" />
              <span>{exp.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs md:text-sm font-medium xl:pr-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{exp.location}</span>
            </div>
          </div>
          <div className="shrink-0 w-10 h-10 rounded-full border primary-border flex items-center justify-center group-hover:bg-[#FF0055] group-hover:border-[#FF0055]">
            <ArrowUpRight
              size={18}
              className="text-white"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Experiance() {


  const { allExperience, isLoading, isError } = useGetAllExperience(4);

  const experiences = allExperience?.pages.flatMap((page: any) => page) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF0055]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-gray-400 py-10">
        Failed to load experiences.
      </div>
    );
  }

  return (
    <section className=" relative overflow-hidden">
      <div className="mb-10">
        <div
          className="flex items-center gap-3 mb-4"
        >
          <Briefcase className="" size={24} />
          <span className=" font-bold uppercase tracking-widest text-sm">
            Experience
          </span>
        </div>

        <h2
          className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
        >
          Professional <br />
          <span className="primary-text4italic">Timeline</span>
        </h2>

        <p
          className="text-gray-400 max-w-2xl text-lg leading-relaxed"
        >
          Tracing the evolution of professional expertise through diverse roles
          and impactful contributions.
        </p>
      </div>

      <div className="relative ">
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-5">
          {experiences.map((exp: any, index: number) => (
            <ExperienceCard key={exp._id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
