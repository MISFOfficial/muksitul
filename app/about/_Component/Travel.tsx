import { Globe } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Travel() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden z-10">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/seabeach.jpg"
                    alt="Cox's Bazar - The Longest Sea Beach"
                    fill
                    className="object-cover opacity-60 scale-105"
                />
                <div
                    className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
                />
            </div>

            <div className="relative z-10 text-center ratio px-6">
                <div
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-black italic mb-8 tracking-tight">
                        "The <span className="primary-text2">Sea</span> is always calling my name..."
                    </h2>
                    <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-12">
                        I carry a deep love for the vastness of the ocean and the thrill of discovery. Every wave tells a story I wish I had more time to hear.
                    </p>
                    <div className="relative inline-block">
                        <p className="text-lg md:text-xl text-gray-200 italic">
                            Professional life keeps me anchored, but in my soul, I am always sailing.
                        </p>
                        <div
                            className="absolute -bottom-4 left-0 w-full h-[4px] bg-[#FF0055]/50 origin-left"
                        />
                    </div>
                </div>
            </div>

            {/* Subtle Floating Drift Elements */}
            {/* <div
                className="absolute top-1/4 right-1/4 opacity-20"
            >
                <Globe size={150} className="primary-text2" />
            </div> */}
        </section>

    )
}

export default Travel