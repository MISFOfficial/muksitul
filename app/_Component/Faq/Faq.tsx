"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "What technical expertise do you bring to my project?",
        answer: "I specialize in building production-ready web applications using Next.js, TypeScript, and modern styling frameworks. My focus is on creating high-performance, and accessible digital experiences that scale with your business needs."
    },
    {
        question: "How do you ensure project scalability and maintainability?",
        answer: "I follow industry best practices, including clean architecture, modular component design, and rigorous testing. By using strongly typed systems like TypeScript and efficient state management, I ensure your codebase remains easy to update and evolve as your product grows."
    },
    {
        question: "What is your typical development process?",
        answer: "My process is collaborative and transparent: starting with deep discovery and architecture planning, followed by agile development with regular updates, and concluding with comprehensive testing and seamless deployment to ensure a successful launch."
    },
    {
        question: "Do you provide post-launch support and optimization?",
        answer: "Absolutely. I believe in long-term partnerships. I offer performance monitoring, security updates, and iterative feature development to ensure your application continues to deliver exceptional value post-deployment."
    }
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="">

            {/* Header */}
            <div className="text-center  space-y-4 mb-5">
                <h4 className="primary-text font-bold uppercase tracking-widest text-sm">Hire Me</h4>
                <h2 className="text-xl md:text-4xl font-black text-white">Why Hire Me?</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    With a deep expertise in modern web architectures and a passion for clean, maintainable code, I help businesses scale through robust and innovative technical solutions.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Visual Graphic - Left Side */}
                <div className="lg:col-span-4 relative flex items-center justify-center   hidden lg:block">
                    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                        {/* Main dark bubble shape */}
                        <div className="absolute inset-0 primary-color rounded-full rounded-bl-none transform rotate-[-10deg] flex items-center justify-center">
                            <span className="text-white text-[200px] font-black leading-none opacity-50 select-none">?</span>
                        </div>
                        {/* Floating red bubble with question mark */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 primary-color2 rounded-full flex items-center justify-center "
                        >
                            <span className="text-white text-4xl font-bold">?</span>
                        </motion.div>
                    </div>
                </div>

                {/* Accordion - Right Side */}
                <div className="lg:col-span-8 space-y-4">
                    {faqData.map((item, index) => (
                        <div key={index} className="bg-[#111111] rounded-md overflow-hidden border border-white/15 transition-all duration-300 ">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-6 text-left group"
                            >
                                <span className={`text-base md:text-lg  font-bold transition-colors ${openIndex === index ? 'text-primary-color2' : 'text-gray-300 group-hover:text-white'}`}>
                                    {item.question}
                                </span>
                                <div className="text-gray-500 group-hover:text-white transition-colors">
                                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (

                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-0 text-gray-400 leading-relaxed border-t border-white/15 mt-2">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}