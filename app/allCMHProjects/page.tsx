"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, ArrowLeft, ArrowDown } from "lucide-react";
import CmsProjectCard from "../_Component/CmsProjects/CmsProjectCard";
import CmsProjectCardSkeleton from "../_Component/CmsProjects/CmsProjectCardSkeleton";
import { useRouter } from "next/navigation";
import { useGetAllCmsProjects, CmsProject } from "@/app/Global/data/useCmsProjects";

export default function AllCMHProjectsPage() {
    const router = useRouter();
    const {
        allCmsProjects,
        isLoading,
        isError,
        refetch,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useGetAllCmsProjects(10);

    const projects = allCmsProjects?.pages.flatMap((page: any) => page) || [];

    return (
        <main className="min-h-screen ratio">
            {/* Specialized Header */}
            <section className="py-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none" />

                <div className="relative z-10">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 primary-text4 hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        Back to Home
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <Layers className="primary-text2" size={24} />
                        <span className="primary-text2 font-bold uppercase tracking-widest text-sm decoration-[#FF5652]/30">
                            CMS Showcase
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 uppercase">
                        Platform <br />
                        <span className="primary-text4 italic">Solutions</span>
                    </h1>

                    <p className="primary-text4 max-w-2xl text-lg leading-relaxed">
                        A diverse collection of dynamic websites built on various CMS platforms
                        like WordPress, Shopify, and Webflow. Focused on scalability,
                        performance, and client empowerment.
                    </p>
                </div>
            </section>

            {/* Full Projects Grid */}
            <section className="pb-32">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <CmsProjectCardSkeleton key={i} />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="flex flex-col justify-center items-center h-[200px] primary-text4">
                        <p>Failed to load CMS projects.</p>
                        <button
                            onClick={() => refetch()}
                            className="mt-4 px-6 py-2 bg-white/10 hover:bg-[#FF5652] rounded-full transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project: CmsProject, index: number) => (
                                <CmsProjectCard key={project._id} project={project} index={index} />
                            ))}
                        </div>

                        {/* Load More Button */}
                        {hasNextPage && (
                            <div className="mt-16 flex justify-center">
                                <button
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                    className="group relative px-12 py-5 bg-transparent border-2 primary-border rounded-full text-white font-black text-sm uppercase overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10">
                                        {isFetchingNextPage ? "Loading..." : "See More Platform Work"}
                                    </span>
                                    {!isFetchingNextPage && (
                                        <ArrowDown
                                            size={20}
                                            className="relative z-10 group-hover:translate-y-1 transition-transform"
                                        />
                                    )}
                                    {/* Background Fill */}
                                    <div className="absolute inset-0 primary-color scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-0" />
                                </button>
                            </div>
                        )}

                        {/* Empty State */}
                        {projects.length === 0 && (
                            <div className="text-center p-12 border border-dashed primary-border primary-rounded">
                                <p className="text-gray-500">No CMS projects found in the archive.</p>
                            </div>
                        )}
                    </>
                )}
            </section>
        </main>
    );
}