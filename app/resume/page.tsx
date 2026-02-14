"use client";

import React, { useRef } from 'react';
import { resumeData } from '@/lib/resumeData';
import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

export default function ResumePage() {

    return (
        <main className="min-h-screen bg-black text-white relative">
            {/* Download Button - Top Right Corner */}
            <div className="fixed top-6 left-6 z-50">
                <button
                    onClick={() => window.history.back()}
                    className="text-white cursor-pointer font-bold flex items-center gap-2 hover:scale-105 transition-transform py-3 "
                >
                    <ArrowLeft size={20} />
                    Back
                </button>
            </div>
            {/* Download Button - Top Right Corner */}
            <div className="fixed top-6 right-6 z-50">
                <button
                    className="cursor-pointer bg-gradient-to-r text-xs md:text-base from-[#20255e] to-[#2a2f7e] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-2xl border border-white/10"
                >
                    <Download size={15} />
                    Download PDF
                </button>
            </div>

            {/* Resume Container - Dark Theme */}
            <div className="max-w-[210mm] mx-auto primary-color shadow-2xl  border border-white/10 ">
                <div className="p-12">
                    {/* Header */}
                    <div className="text-center border-b-2 border-white/15 pb-6 mb-6">
                        <h1 className="text-4xl font-black mb-2 text-white">{resumeData.personalInfo.name}</h1>
                        <h2 className="text-lg text-white font-semibold mb-4">{resumeData.personalInfo.title}</h2>

                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                            <span>{resumeData.personalInfo.location}</span>
                            <span className="text-white">|</span>
                            <span>{resumeData.personalInfo.phone}</span>
                            <span className="text-white">|</span>
                            <span className="text-white">{resumeData.personalInfo.email}</span>
                        </div>

                        <div className="flex justify-center gap-4 mt-3 text-sm">
                            <span className="text-white font-semibold">Portfolio</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-white font-semibold">GitHub</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-white font-semibold">LinkedIn</span>
                        </div>
                    </div>

                    {/* Professional Summary */}
                    <section className="mb-6">
                        <h3 className="text-lg font-bold uppercase border-b-2 border-white/15 pb-1 mb-3 text-white">Professional Summary</h3>
                        <p className="text-sm text-gray-300 leading-relaxed text-justify">
                            {resumeData.summary}
                        </p>
                    </section>

                    {/* Skills */}
                    <section className="mb-6">
                        <h3 className="text-lg font-bold uppercase border-b-2 border-white/15 pb-1 mb-3 text-white">Skills & Technologies</h3>

                        <div className="space-y-2 text-sm">
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                                <span className="font-bold text-white">Frontend: </span>
                                <span className="text-gray-300">{resumeData.skills.frontend.join(', ')}</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                                <span className="font-bold text-white">Backend: </span>
                                <span className="text-gray-300">{resumeData.skills.backend.join(', ')}</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                                <span className="font-bold text-white">Authentication: </span>
                                <span className="text-gray-300">{resumeData.skills.authentication.join(', ')}</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                                <span className="font-bold text-white">Payment Gateways: </span>
                                <span className="text-gray-300">{resumeData.skills.paymentGateways.join(', ')}</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                                <span className="font-bold text-white">Design Tools: </span>
                                <span className="text-gray-300">{resumeData.skills.designTools.join(', ')}</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                                <span className="font-bold text-white">Tools: </span>
                                <span className="text-gray-300">{resumeData.skills.tools.join(', ')}</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded border border-white/10">
                                <span className="font-bold text-white">Soft Skills: </span>
                                <span className="text-gray-300">{resumeData.skills.softSkills.join(', ')}</span>
                            </div>
                        </div>
                    </section>

                    {/* Experience */}
                    <section className="mb-6">
                        <h3 className="text-lg font-bold uppercase border-b-2 border-white/15 pb-1 mb-3 text-white">Experience</h3>

                        {resumeData.experience.map((exp, idx) => (
                            <div key={idx} className="mb-4 bg-white/5 p-4 rounded-lg border-l-4 border-white/15">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-base text-white">{exp.position} | <span className="text-white">{exp.company}</span></h4>
                                        <p className="text-sm text-gray-400">{exp.location}</p>
                                    </div>
                                    <span className="text-sm text-gray-400 whitespace-nowrap bg-white/5 px-3 py-1 rounded-full border border-white/10">{exp.period}</span>
                                </div>

                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                                    {exp.responsibilities.map((resp, ridx) => (
                                        <li key={ridx}>{resp}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>

                    {/* Projects */}
                    <section className="mb-6">
                        <h3 className="text-lg font-bold uppercase border-b-2 border-white/15 pb-1 mb-3 text-white">Relevant Projects</h3>

                        {resumeData.projects.map((project, idx) => (
                            <div key={idx} className="mb-4 bg-white/5 p-4 rounded-lg border-l-4 border-white/15">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-base text-white">{project.name}</h4>
                                    <Link href={project?.href || "#"} target="_blank" className="text-sm text-white font-semibold">{project.liveLink}</Link>
                                </div>

                                <p className="text-sm text-gray-300 mb-2">{project.description}</p>

                                <div className="mb-2">
                                    <span className="font-bold text-sm text-white">Key Features:</span>
                                    <ul className="list-disc list-inside text-sm text-gray-300 ml-2">
                                        {project.features.map((feature, fidx) => (
                                            <li key={fidx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <span className="font-bold text-sm text-white">Tech Stack: </span>
                                    <span className="text-sm text-gray-300">{project.techStack.join(', ')}</span>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Education */}
                    <section className="mb-6">
                        <h3 className="text-lg font-bold uppercase border-b-2 border-white/15 pb-1 mb-3 text-white">Education</h3>

                        <div className="flex justify-between items-start bg-white/5 p-4 rounded-lg border-l-4 border-white/15">
                            <div>
                                <h4 className="font-bold text-base text-white">{resumeData.education.degree}</h4>
                                <p className="text-sm text-white font-semibold">{resumeData.education.institution}</p>
                                <p className="text-sm text-gray-400">{resumeData.education.cgpa}</p>
                            </div>
                            <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">{resumeData.education.period}</span>
                        </div>
                    </section>

                    {/* Languages */}
                    <section className="mb-6">
                        <h3 className="text-lg font-bold uppercase border-b-2 border-white/15 pb-1 mb-3 text-white">Language</h3>

                        <div className="text-sm text-gray-300 bg-white/5 p-4 rounded-lg border border-white/10">
                            <p><span className="font-bold text-white">Bangla:</span> {resumeData.languages.bangla}</p>
                            <p><span className="font-bold text-white">English:</span> {resumeData.languages.english}</p>
                        </div>
                    </section>
                </div>
            </div>

            {/* Bottom Spacing */}

        </main>
    );
}
