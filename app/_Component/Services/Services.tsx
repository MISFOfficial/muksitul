import React from 'react';
import Image from 'next/image';
import { MoveRight } from 'lucide-react';
import jahin from "@/public/profile.png";

function Services() {
    return (
        <section id="services" className="">

            <div className="primary-color rounded-2xl overflow-hidden relative min-h-[500px] flex items-center justify-between px-6 py-12 lg:px-20 lg:py-16">

                {/* Left Side - Image Placeholder (Hidden on small screens if needed, or stacked) */}
                <div className="hidden lg:flex w-1/2 justify-center items-end relative h-full">
                    {/* 
                        Note: Replacing this with a placeholder div or semantic image tag as requested. 
                        Ideally, this should be the woman with calculator image.
                        Using a colored placeholder for now to represent the image space.
                     */}
                    <div className="relative w-full h-[450px] flex items-end justify-center">
                        <Image
                            src={jahin}
                            alt="Jahin"
                            width={500}
                            height={600}
                            placeholder="blur"
                            className="w-auto h-full object-contain  drop-shadow-2xl grayscale contrast-125 brightness-110"
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
                        Encounter <br className="hidden lg:block" />
                        outstanding service <br className="hidden lg:block" />
                        excellence with us
                    </h2>
                    <p className="text-white/90 text-sm md:text-base lg:text-lg font-medium max-w-lg leading-relaxed">
                        At the heart of our company lies a commitment to excellence that drives everything we do.
                    </p>

                    <button className="bg-white text-black px-8 py-4 rounded-lg font-bold text-sm md:text-base uppercase tracking-wider hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                        Purchase Our Reeni
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Services;