"use client";

import React from 'react';
import { ArrowRight, Star, Code, Palette, Rocket, Mail } from 'lucide-react';

export default function HireMe() {
    return (
        <section className="ratio relative overflow-hidden">
            <div className="relative z-10">
                {/* Main Card */}
                <div className="overflow-hidden rounded-2xl border border-white/10">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                        {/* Left Sidebar - Vertical Stats */}
                        <div className="lg:col-span-2 primary-color p-8 lg:p-12 relative overflow-hidden">
                            {/* Decorative Circle */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full mb-6">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-xs text-white font-semibold">OPEN TO WORK</span>
                                    </div>

                                    <h3 className="text-4xl lg:text-5xl font-black text-white mb-4">
                                        Let's Create
                                        <span className="block text-white/80">Magic ✨</span>
                                    </h3>

                                    <p className="text-white/70 text-sm leading-relaxed">
                                        Transform your ideas into stunning digital experiences
                                    </p>
                                </div>

                                {/* Skill Icons */}
                                <div className="grid grid-cols-3 gap-4 mt-8">
                                    {[
                                        { icon: Code, label: "Code" },
                                        { icon: Palette, label: "Design" },
                                        { icon: Rocket, label: "Launch" }
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:scale-110 hover:rotate-6 transition-transform"
                                        >
                                            <item.icon className="text-white mx-auto mb-2" size={24} />
                                            <span className="text-xs text-white/80">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Content Area */}
                        <div className="lg:col-span-3 p-8 lg:p-12 ">
                            <div className="space-y-8">
                                {/* Heading */}
                                <div>
                                    <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                                        Ready to Build Something
                                        <span className="block primary-text">Extraordinary?</span>
                                    </h2>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="text-yellow-500 fill-yellow-500" size={16} />
                                        ))}
                                        <span className="text-gray-400 text-sm ml-2">5.0 Client Rating</span>
                                    </div>
                                </div>

                                {/* Benefits Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { num: "24h", label: "Response Time" },
                                        { num: "100%", label: "Satisfaction" },
                                        { num: "5+", label: "Years Exp" },
                                        { num: "50+", label: "Happy Clients" }
                                    ].map((stat, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-[#20255e]/50 transition-all"
                                        >
                                            <div className="text-2xl font-black primary-text">{stat.num}</div>
                                            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Section */}
                                <div className="space-y-4">
                                    <button className="w-full primary-color text-white py-4 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-2xl hover:shadow-[#20255e]/50 hover:scale-105 transition-all group">
                                        <Mail size={20} />
                                        <span>Start Your Project</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                    </button>

                                    <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                                        <span>or email me at</span>
                                        <a href="mailto:hello@example.com" className="text-white font-semibold hover:text-[#20255e] transition-colors">
                                            hello@example.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Tagline */}
                {/* <p className="text-center text-gray-500 mt-10 text-sm">
                    Trusted by startups and enterprises worldwide 🌍
                </p> */}
            </div>
        </section>
    );
}