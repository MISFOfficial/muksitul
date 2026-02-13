"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "What is Reeni ? How does it work?",
        answer: "Reeni is a modern and powerful Personal Portfolio WordPress Theme. Elevate your online presence with Reeni's sleek design, lightning-fast loading speeds, and intuitive customization options. Crafted for efficiency and professionalism, Reeni empowers your Portfolio with seamless functionality and well-documented code. Build your corporate identity effortlessly and stand out in the digital landscape with Reeni."
    },
    {
        question: "How can I get the customer support?",
        answer: "We provide dedicated customer support through our support ticket system. You can open a ticket at any time, and our team will get back to you within 24 hours."
    },
    {
        question: "Can I get update regularly and For how long do I get updates?",
        answer: "Yes, we provide lifetime free updates for all our themes. You will receive a notification whenever a new update is available."
    },
    {
        question: "Can I change any Elements as I like?",
        answer: "Absolutely! Reeni is built with full customizability in mind. You can easily modify colors, fonts, layouts, and other elements using the built-in options panel or page builder."
    }
];

export default function Faq() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="">

            {/* Header */}
            <div className="text-center  space-y-4 mb-5">
                <h4 className="primary-text font-bold uppercase tracking-widest text-sm">Clients Feedback</h4>
                <h2 className="text-xl md:text-4xl font-black text-white">Have You Any Questions?</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    With a strong foundation in theme development and a keen eye for design, I specialize in creating interactive and responsive web.
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
                        <div key={index} className="bg-[#111111] rounded-md overflow-hidden border border-white/5 transition-all duration-300 ">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-6 text-left group"
                            >
                                <span className={`text-base md:text-lg  font-bold transition-colors ${activeIndex === index ? 'text-primary-color2' : 'text-gray-300 group-hover:text-white'}`}>
                                    {item.question}
                                </span>
                                <div className="text-gray-500 group-hover:text-white transition-colors">
                                    {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
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