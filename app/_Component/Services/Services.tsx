"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { MoveRight } from 'lucide-react';
import jahin from "@/public/profile.png";
import service1 from '@/public/servce-1.png';
import ProjectModal from './ProjectModal';

export default function Services() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="services" className="">
            <div className="primary-color rounded-md overflow-hidden relative min-h-[500px] flex items-center justify-between px-6 py-12 lg:px-20 lg:py-16">
                {/* Left Side - Image */}
                <div className="hidden lg:flex w-1/2 justify-center items-end relative h-full">
                    <div className="relative w-full h-[450px] flex items-end justify-center">
                        <Image
                            src={jahin}
                            alt="Jahin"
                            width={500}
                            height={600}
                            placeholder="blur"
                            className="w-auto h-full object-contain drop-shadow-2xl grayscale contrast-125 brightness-110"
                            style={{
                                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                            }}
                        />
                    </div>
                </div>

                {/* Right Side - Content */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left text-white z-10 gap-8">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                        Elevating Brands Through <br className="hidden lg:block" />
                        Technical Excellence & <br className="hidden lg:block" />
                        Strategic Development
                    </h2>
                    <p className="text-white/90 text-sm md:text-base lg:text-lg font-medium max-w-lg leading-relaxed">
                        I specialize in crafting high-performance, scalable web applications that solve complex problems and drive measurable growth for modern businesses.
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white text-black px-8 py-4 rounded-lg font-bold text-sm md:text-base uppercase tracking-wider hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                        Let's Start Your Project
                    </button>
                </div>
            </div>

            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}